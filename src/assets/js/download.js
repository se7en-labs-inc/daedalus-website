document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('download-root')
  if (!root) return
  const endpoint = root.dataset.endpoint

  try {
    const resp = await fetch(endpoint)
    if (!resp.ok) throw new Error(resp.status)
    const data = await resp.json()
    renderDownload(root, data)
  } catch {
    root.innerHTML = '<p class="download-error">Could not load download information.</p>'
  }
})

function renderDownload(root, data) {
  const { platforms } = data
  if (!platforms) {
    root.innerHTML = '<p class="download-error">Could not load download information.</p>'
    return
  }

  const base = (root.dataset.base || '/').replace(/\/$/, '')

  const labels = {
    pgpLabel:        root.dataset.pgpLabel        || 'PGP signature',
    pgpDownload:     root.dataset.pgpDownload      || 'Get Signature',
    verifySig:       root.dataset.verifySig        || 'Verify signature instructions',
    shaLabel:        root.dataset.shaLabel         || 'SHA256 checksum',
    verifyChecksum:  root.dataset.verifyChecksum   || 'Verify checksum instructions',
    versionString:   root.dataset.versionString    || 'Version',
  }

  const order = ['darwin-arm', 'darwin', 'linux', 'windows'].filter(k => platforms[k])

  const osLabels = {
    'darwin-arm': 'macOS Apple Silicon',
    darwin:        'macOS (Intel)',
    linux:         'Linux',
    windows:       'Windows',
  }
  const osIcons = {
    'darwin-arm': `${base}/images/darwin.svg`,
    darwin:        `${base}/images/darwin.svg`,
    linux:         `${base}/images/linux.svg`,
    windows:       `${base}/images/windows.svg`,
  }

  root.innerHTML = `
    <div class="download-grid">
      ${order.map(key => {
        const p = platforms[key]
        const modalOs = key === 'darwin-arm' ? 'darwin' : key

        // Build a Blob URL so the .asc is downloaded directly (signature is text content)
        const sigBlob = window.Blob
          ? new Blob([p.signature || ''], { type: 'text/plain' })
          : null
        const sigHref = sigBlob ? URL.createObjectURL(sigBlob) : '#'
        const sigFilename = (p.URL || '').split('/').pop() + '.asc'

        return `
          <div class="platform-col">
            <img class="os-icon" src="${osIcons[key]}" alt="${osLabels[key]}">
            <strong>${osLabels[key]}</strong>
            <span class="version">${labels.versionString}: ${p.version}</span>
            <a class="download-btn" href="${p.URL}">Download Daedalus</a>

            <p class="pgp-label">${labels.pgpLabel}</p>
            <a class="pgp-btn" href="${sigHref}" download="${sigFilename}">${labels.pgpDownload}</a>
            <a class="pgp-verify" href="#" data-modal="${modalOs}-signature">(${labels.verifySig})</a>

            <p class="sha-label">${labels.shaLabel}</p>
            <code class="checksum-text">${p.SHA256}</code>
            <a class="checksum-verify" href="#" data-modal="${modalOs}-checksum">(${labels.verifyChecksum})</a>
          </div>`
      }).join('')}
    </div>`
}
