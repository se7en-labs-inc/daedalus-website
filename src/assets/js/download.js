document.addEventListener('DOMContentLoaded', () => {
  initPkgTabs()

  document.querySelectorAll('[data-download-channel]').forEach(loadDownload)
})

async function loadDownload(root) {
  const endpoints = [root.dataset.endpoint]
  if (root.dataset.downloadChannel === 'mainnet' && root.dataset.fallbackEndpoint) {
    endpoints.push(root.dataset.fallbackEndpoint)
  }
  for (const endpoint of new Set(endpoints)) {
    try {
      const resp = await fetch(endpoint)
      if (!resp.ok) throw new Error(resp.status)
      if (renderDownload(root, await resp.json())) return
    } catch {
      // Mainnet can still use the legacy manifest while the new one is unpublished.
    }
  }
  renderUnavailable(root)
}

function renderUnavailable(root) {
  root.innerHTML = `<p class="download-error">${escapeHtml(root.dataset.unavailable || 'Could not load download information.')}</p>`
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c])
}

function initPkgTabs() {
  document.querySelectorAll('.pkg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pkg-tab').forEach(t => t.classList.remove('active'))
      document.querySelectorAll('.pkg-panel').forEach(p => { p.hidden = true })
      tab.classList.add('active')
      const panel = document.getElementById('panel-' + tab.dataset.target)
      if (panel) panel.hidden = false
    })
  })
}

// Normalise old flat schema and new nested schema into a common shape.
//
// Old format: platforms.{linux, darwin-arm, darwin, windows} are leaf objects.
// New format: platforms.{linux, macos, windows} are objects of sub-format keys.
function normalizeManifest(data) {
  const p = data.platforms || {}
  const linuxObj = p.linux ?? null
  const isNew = 'macos' in p ||
    (p.windows !== null && typeof p.windows === 'object' && 'exe' in p.windows) ||
    (linuxObj !== null && typeof linuxObj === 'object' &&
     ('bin' in linuxObj || 'deb' in linuxObj || 'rpm' in linuxObj || 'arch' in linuxObj))

  if (isNew) {
    return {
      isNewFormat: true,
      windows:   p.windows?.exe   ?? null,
      darwinArm: p.macos?.aarch64 ?? null,
      darwin:    p.macos?.x86_64  ?? null,
      linuxBin:  linuxObj?.bin    ?? null,
      linuxDeb:  linuxObj?.deb    ?? null,
      linuxRpm:  linuxObj?.rpm    ?? null,
      linuxArch: linuxObj?.arch   ?? null,
    }
  }

  // Old flat format — package repo formats not yet published.
  return {
    isNewFormat: false,
    windows:   p['windows']    ?? null,
    darwinArm: p['darwin-arm'] ?? null,
    darwin:    p['darwin']     ?? null,
    linuxBin:  linuxObj,
    linuxDeb:  null,
    linuxRpm:  null,
    linuxArch: null,
  }
}

function renderDownload(root, data) {
  const norm = normalizeManifest(data)
  // Ignore incomplete entries rather than offering a broken installer link.
  for (const key of Object.keys(norm)) {
    if (key === 'isNewFormat') continue
    const entry = norm[key]
    if (!entry || typeof entry.URL !== 'string' || !/^https?:\/\//.test(entry.URL)) {
      norm[key] = null
    }
  }
  const base = (root.dataset.base || '/').replace(/\/$/, '')
  const isMainnet = root.dataset.downloadChannel === 'mainnet'

  const labels = {
    pgpLabel:        root.dataset.pgpLabel        || 'PGP signature',
    pgpDownload:     root.dataset.pgpDownload      || 'Get Signature',
    verifySig:       root.dataset.verifySig        || 'Verify signature instructions',
    shaLabel:        root.dataset.shaLabel         || 'SHA256 checksum',
    verifyChecksum:  root.dataset.verifyChecksum   || 'Verify checksum instructions',
    versionString:   root.dataset.versionString    || 'Version',
    linuxDeprecated: root.dataset.linuxDeprecated  || 'Legacy installer — use a package manager instead',
    download:        root.dataset.downloadLabel    || 'Download Daedalus',
  }
  Object.keys(labels).forEach(key => { labels[key] = escapeHtml(labels[key]) })

  // Linux .bin is only marked deprecated once the package-manager alternatives exist
  const linuxHasPackages = !!(norm.linuxDeb || norm.linuxRpm || norm.linuxArch)

  // Order: Windows, macOS Apple Silicon, macOS Intel, Linux (last)
  const gridPlatforms = [
    norm.windows   && { key: 'windows',    label: 'Windows',             icon: `${base}/images/windows.svg`, data: norm.windows,   deprecated: false           },
    norm.darwinArm && { key: 'darwin-arm', label: 'macOS Apple Silicon', icon: `${base}/images/darwin.svg`,  data: norm.darwinArm, deprecated: false           },
    norm.darwin    && { key: 'darwin',     label: 'macOS (Intel)',        icon: `${base}/images/darwin.svg`,  data: norm.darwin,    deprecated: false           },
    norm.linuxBin  && { key: 'linux',      label: 'Linux',               icon: `${base}/images/linux.svg`,   data: norm.linuxBin,  deprecated: isMainnet && linuxHasPackages },
    ...(!isMainnet ? [
      norm.linuxDeb  && { key: 'linux', label: 'Linux (.deb)',         icon: `${base}/images/linux.svg`, data: norm.linuxDeb },
      norm.linuxRpm  && { key: 'linux', label: 'Linux (.rpm)',         icon: `${base}/images/linux.svg`, data: norm.linuxRpm },
      norm.linuxArch && { key: 'linux', label: 'Linux (.pkg.tar.zst)', icon: `${base}/images/linux.svg`, data: norm.linuxArch },
    ] : []),
  ].filter(Boolean)

  if (gridPlatforms.length === 0 && !(isMainnet && linuxHasPackages)) {
    return false
  }

  root.innerHTML = `
    <div class="download-grid">
      ${gridPlatforms.map(({ key, label, icon, data: p, deprecated }) => {
        const modalOs = key === 'darwin-arm' ? 'darwin' : key
        const sigBlob = window.Blob ? new Blob([p.signature || ''], { type: 'text/plain' }) : null
        const sigHref = sigBlob ? URL.createObjectURL(sigBlob) : '#'
        const sigFilename = (p.URL || '').split('/').pop() + '.asc'

        return `
          <div class="platform-col${deprecated ? ' platform-col--deprecated' : ''}">
            <img class="os-icon" src="${escapeHtml(icon)}" alt="${label}">
            <strong class="os-name">${label}</strong>
            <span class="version">${labels.versionString}: ${escapeHtml(p.version)}</span>
            <a class="download-btn" href="${escapeHtml(p.URL)}">${labels.download}</a>
            ${deprecated ? `<span class="deprecated-notice">${labels.linuxDeprecated}</span>` : ''}

            <div class="verify-group">
              <span class="verify-label">${labels.pgpLabel}</span>
              <a class="pgp-btn" href="${sigHref}" download="${escapeHtml(sigFilename)}">${labels.pgpDownload}</a>
              <a class="verify-link" href="#" data-modal="${modalOs}-signature">${labels.verifySig}</a>
            </div>

            <div class="verify-group">
              <span class="verify-label">${labels.shaLabel}</span>
              <code class="checksum-text">${escapeHtml(p.SHA256)}</code>
              <a class="verify-link" href="#" data-modal="${modalOs}-checksum">${labels.verifyChecksum}</a>
            </div>
          </div>`
      }).join('')}
    </div>`

  if (isMainnet) initLinuxSection(norm, labels.versionString)
  return true
}

function initLinuxSection(norm, versionString) {
  const { linuxDeb, linuxRpm, linuxArch, linuxBin } = norm
  const hasPackages = linuxDeb || linuxRpm || linuxArch
  if (!hasPackages) return

  const section = document.getElementById('linux-section')
  if (section) section.hidden = false

  // Inject the release version tag into the NixOS snippet
  const refEntry = linuxDeb || linuxRpm || linuxArch || linuxBin
  const version = refEntry?.version || ''
  if (version) {
    const tag = document.getElementById('nixos-version-tag')
    if (tag) tag.textContent = 'v' + version
  }

  // Populate direct download buttons
  const container = document.getElementById('linux-pkg-links')
  if (!container) return

  const btns = [
    linuxDeb  ? `<a class="pkg-dl-btn" href="${escapeHtml(linuxDeb.URL)}">.deb</a>`          : '',
    linuxRpm  ? `<a class="pkg-dl-btn" href="${escapeHtml(linuxRpm.URL)}">.rpm</a>`          : '',
    linuxArch ? `<a class="pkg-dl-btn" href="${escapeHtml(linuxArch.URL)}">.pkg.tar.zst</a>` : '',
  ].filter(Boolean).join('')

  if (btns) {
    container.innerHTML = `
      <div class="linux-direct">
        <span class="version">${versionString}: ${escapeHtml(version)}</span>
        <div class="linux-direct-btns">${btns}</div>
      </div>`
  }
}
