// Hash-based modal: #modal=darwin-checksum
function getModalName() {
  const m = location.hash.match(/modal=([^&]+)/)
  return m ? m[1] : null
}
function syncModals() {
  const name = getModalName()
  document.querySelectorAll('.modal-overlay').forEach(el => {
    const isTarget = el.id === 'modal-' + name
    el.classList.toggle('open', isTarget)
  })
}
document.addEventListener('DOMContentLoaded', () => {
  syncModals()
  window.addEventListener('hashchange', syncModals)
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close-modal]')) {
      e.preventDefault()
      history.pushState('', '', location.pathname + location.search)
      syncModals()
    }
    const trigger = e.target.closest('[data-modal]')
    if (trigger) {
      e.preventDefault()
      location.hash = 'modal=' + trigger.dataset.modal
    }
  })
})
