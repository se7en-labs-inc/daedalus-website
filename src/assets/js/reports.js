document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('reports-root')
  if (!root) return

  const endpoint  = root.dataset.endpoint
  const comingSoon = root.dataset.comingSoon || 'Monthly reports are coming soon.'
  const viewLabel  = root.dataset.viewLabel  || 'View PDF'

  try {
    const resp = await fetch(endpoint)
    if (!resp.ok) throw new Error(resp.status)
    const reports = await resp.json()
    if (!Array.isArray(reports) || reports.length === 0) throw new Error('empty')
    renderReports(root, reports, viewLabel)
  } catch {
    root.innerHTML = `<p class="reports-coming-soon">${comingSoon}</p>`
  }
})

function renderReports(root, reports, viewLabel) {
  const sorted = [...reports].sort((a, b) => new Date(b.date) - new Date(a.date))

  root.innerHTML = `
    <ul class="reports-list">
      ${sorted.map(r => `
        <li class="report-item">
          <span class="report-title">${r.title}</span>
          <a class="report-link" href="${r.url}" target="_blank" rel="noopener">${viewLabel}</a>
        </li>
      `).join('')}
    </ul>`
}
