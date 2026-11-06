const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const { execFileSync } = require('node:child_process')
const { setImmediate } = require('node:timers/promises')

const source = fs.readFileSync('src/assets/js/download.js', 'utf8')
function artifact(channel, ext) {
  return {
    URL: `https://downloads.example/${channel}/daedalus.${ext}`,
    version: channel === 'pilot' ? '9.0.0' : '8.0.0',
    SHA256: `${channel}-${ext}-checksum`,
    signature: `${channel}-${ext}-signature`,
  }
}
function flat(channel) {
  return { platforms: Object.fromEntries([
    ['windows', 'exe'], ['darwin', 'dmg'], ['darwin-arm', 'arm.dmg'], ['linux', 'bin'],
  ].map(([key, ext]) => [key, artifact(channel, ext)])) }
}
function nested(channel, packagesOnly = false) {
  return { platforms: {
    ...(packagesOnly ? {} : {
      windows: { exe: artifact(channel, 'exe') },
      macos: { aarch64: artifact(channel, 'arm.dmg'), x86_64: artifact(channel, 'dmg') },
    }),
    linux: Object.fromEntries((packagesOnly ? ['deb', 'rpm', 'arch'] : ['bin', 'deb', 'rpm', 'arch'])
      .map(ext => [ext, artifact(channel, ext)])),
  } }
}
function browser(responses) {
  const roots = ['mainnet', 'pilot'].map(channel => ({
    dataset: {
      downloadChannel: channel, endpoint: channel, base: '/daedalus/site/',
      downloadLabel: `Get ${channel}`, unavailable: `Unavailable ${channel}`,
    }, innerHTML: 'Loading',
  }))
  const elements = {
    'linux-section': { hidden: true }, 'linux-pkg-links': { innerHTML: '' },
    'nixos-version-tag': { textContent: '' },
  }
  const blobs = []
  const requests = []
  let ready
  const context = vm.createContext({
    document: {
      addEventListener: (name, callback) => { if (name === 'DOMContentLoaded') ready = callback },
      querySelectorAll: selector => selector === '[data-download-channel]' ? roots : [],
      getElementById: id => elements[id],
    },
    fetch: async endpoint => {
      requests.push(endpoint)
      const value = await responses[endpoint]
      if (value instanceof Error) throw value
      return { ok: value !== 'http-error', status: 404, json: async () => {
        if (value === 'bad-json') throw new SyntaxError('Invalid JSON')
        return value
      } }
    },
    window: { Blob }, Blob,
    URL: { createObjectURL: blob => { blobs.push(blob); return `blob:signature-${blobs.length}` } },
  })
  vm.runInContext(source, context)
  return { roots, elements, blobs, requests, ready }
}

test('both manifest formats render both channels with isolated links and verification', async () => {
  for (const manifest of [flat, nested]) {
    const b = browser({ mainnet: manifest('mainnet'), pilot: manifest('pilot') })
    b.ready()
    await setImmediate()
    for (const [index, channel] of ['mainnet', 'pilot'].entries()) {
      const html = b.roots[index].innerHTML
      assert.match(html, new RegExp(`https://downloads.example/${channel}/daedalus.exe`))
      assert.match(html, new RegExp(`Get ${channel}`))
      assert.match(html, new RegExp(`${channel}-exe-checksum`))
      assert.match(html, /download="daedalus.exe.asc"/)
      assert.match(html, /data-modal="darwin-signature"/)
      assert.match(html, /data-modal="windows-checksum"/)
      assert.match(html, /src="\/daedalus\/site\/images\/windows.svg"/)
      assert.doesNotMatch(html, new RegExp(`downloads.example/${index ? 'mainnet' : 'pilot'}/`))
    }
    const signatures = await Promise.all(b.blobs.map(blob => blob.text()))
    assert.ok(signatures.includes('pilot-exe-signature'))
    assert.ok(signatures.includes('mainnet-exe-signature'))
    assert.equal(b.elements['linux-section'].hidden, manifest === flat)
    if (manifest === nested) {
      assert.match(b.roots[1].innerHTML, /pilot-deb-checksum/)
      assert.match(b.roots[1].innerHTML, /data-modal="linux-signature"/)
      assert.doesNotMatch(b.roots[1].innerHTML, /platform-col--deprecated/)
      assert.match(b.elements['linux-pkg-links'].innerHTML, /mainnet\/daedalus.deb/)
      assert.doesNotMatch(b.elements['linux-pkg-links'].innerHTML, /pilot/)
      assert.equal(b.elements['nixos-version-tag'].textContent, 'v8.0.0')
    }
  }
})

test('a pending channel does not delay the other channel', async () => {
  let resolvePilot
  const b = browser({ mainnet: flat('mainnet'), pilot: new Promise(resolve => { resolvePilot = resolve }) })
  b.ready()
  assert.deepEqual(b.requests, ['mainnet', 'pilot'])
  await setImmediate()
  assert.match(b.roots[0].innerHTML, /mainnet\/daedalus.exe/)
  assert.equal(b.roots[1].innerHTML, 'Loading')
  resolvePilot(flat('pilot'))
  await setImmediate()
  assert.match(b.roots[1].innerHTML, /pilot\/daedalus.exe/)
})

test('channel failures and malformed manifests are localized and isolated in either direction', async () => {
  for (const bad of [new Error('Network'), 'http-error', 'bad-json', null, {}, { platforms: {} },
    { platforms: 'invalid' }, { platforms: { windows: {} } }]) {
    for (const channel of ['mainnet', 'pilot']) {
      const b = browser({ mainnet: flat('mainnet'), pilot: flat('pilot'), [channel]: bad })
      b.ready()
      await setImmediate()
      const index = channel === 'mainnet' ? 0 : 1
      assert.match(b.roots[index].innerHTML, new RegExp(`Unavailable ${channel}`))
      assert.match(b.roots[1 - index].innerHTML, /class="download-btn"/)
    }
  }
})

test('package-only Linux releases remain available and Pilot cannot overwrite Mainnet repository details', async () => {
  const b = browser({ mainnet: nested('mainnet', true), pilot: nested('pilot', true) })
  b.ready()
  await setImmediate()
  assert.equal(b.elements['linux-section'].hidden, false)
  assert.match(b.elements['linux-pkg-links'].innerHTML, /mainnet\/daedalus.deb/)
  for (const ext of ['deb', 'rpm', 'arch']) {
    assert.match(b.roots[1].innerHTML, new RegExp(`pilot/daedalus.${ext}`))
    assert.match(b.roots[1].innerHTML, new RegExp(`pilot-${ext}-checksum`))
  }
  assert.doesNotMatch(b.roots[0].innerHTML + b.roots[1].innerHTML, /download-error/)
})

test('partial nested Windows manifests and unsafe entries are handled', async () => {
  const b = browser({
    mainnet: { platforms: { windows: { exe: artifact('mainnet', 'exe') } } },
    pilot: { platforms: { windows: { URL: 'javascript:alert(1)' }, darwin: artifact('pilot', 'dmg') } },
  })
  b.ready()
  await setImmediate()
  assert.match(b.roots[0].innerHTML, /mainnet\/daedalus.exe/)
  assert.match(b.roots[1].innerHTML, /pilot\/daedalus.dmg/)
  assert.doesNotMatch(b.roots[1].innerHTML, /javascript:/)
})

test('Mainnet falls back to the legacy manifest when the primary cannot provide installers', async () => {
  for (const bad of [new Error('Network'), 'http-error', 'bad-json', null, {}, { platforms: {} }]) {
    const b = browser({ mainnet: bad, legacy: flat('mainnet'), pilot: flat('pilot') })
    b.roots[0].dataset.fallbackEndpoint = 'legacy'
    b.ready()
    await setImmediate()
    assert.deepEqual(b.requests, ['mainnet', 'pilot', 'legacy'])
    assert.match(b.roots[0].innerHTML, /mainnet\/daedalus.exe/)
    assert.match(b.roots[1].innerHTML, /pilot\/daedalus.exe/)
    assert.ok((await Promise.all(b.blobs.map(blob => blob.text()))).includes('mainnet-exe-signature'))
  }
})

test('a usable primary skips fallback, including Linux package-only releases; Pilot never falls back', async () => {
  for (const mainnet of [flat('mainnet'), nested('mainnet', true)]) {
    const b = browser({ mainnet, pilot: 'http-error', legacy: flat('mainnet') })
    for (const root of b.roots) root.dataset.fallbackEndpoint = 'legacy'
    b.ready()
    await setImmediate()
    assert.deepEqual(b.requests, ['mainnet', 'pilot'])
    assert.doesNotMatch(b.roots[0].innerHTML, /download-error/)
    assert.match(b.roots[1].innerHTML, /Unavailable pilot/)
  }
})

test('failure of both Mainnet sources leaves Pilot available', async () => {
  const b = browser({ mainnet: 'http-error', legacy: 'bad-json', pilot: flat('pilot') })
  b.roots[0].dataset.fallbackEndpoint = 'legacy'
  b.ready()
  await setImmediate()
  assert.match(b.roots[0].innerHTML, /Unavailable mainnet/)
  assert.match(b.roots[1].innerHTML, /pilot\/daedalus.exe/)
})

test('built EN/JA pages include both configured channels, storage explanations and prefixed assets', () => {
  execFileSync(process.execPath, ['node_modules/@11ty/eleventy/cmd.cjs', '--quiet'], {
    env: { ...process.env, PATH_PREFIX: '/daedalus/site/',
      DOWNLOAD_ENDPOINT: 'https://mainnet.example/manifest.json',
      DOWNLOAD_FALLBACK_ENDPOINT: 'https://mainnet.example/legacy.json',
      PILOT_DOWNLOAD_ENDPOINT: 'https://pilot.example/manifest.json' },
  })
  for (const lang of ['', 'ja/']) {
    const html = fs.readFileSync(`_site/${lang}download/index.html`, 'utf8')
    assert.match(html, /data-download-channel="mainnet"/)
    assert.match(html, /data-download-channel="pilot"/)
    assert.match(html, /data-endpoint="https:\/\/mainnet.example\/manifest.json"/)
    assert.match(html, /data-endpoint="https:\/\/pilot.example\/manifest.json"/)
    assert.match(html, /data-fallback-endpoint="https:\/\/mainnet.example\/legacy.json"/)
    assert.equal([...html.matchAll(/data-fallback-endpoint=/g)].length, 1)
    assert.match(html, /Preview.*Preprod.*Mainnet Flight/)
    assert.match(html, lang ? /通常のDaedalus Mainnetとストレージを共有しません/ : /does not share storage with standard Daedalus Mainnet/)
    assert.match(html, /data-base="\/daedalus\/site\/"/)
    assert.match(html, /src="\/daedalus\/site\/assets\/js\/download.js"/)
    assert.match(html, /id="modal-linux-signature"/)
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
    assert.equal(ids.length, new Set(ids).size)
  }
})
