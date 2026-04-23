// Show Medusa iframe only if WebGL is available (matches original isMedusaSupported logic)
;(function () {
  let supported = false
  try {
    const canvas = document.createElement('canvas')
    supported = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch (e) {}
  if (supported) {
    const iframe = document.querySelector('.medusa-container iframe')
    if (iframe) iframe.style.display = 'block'
  }
})()

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const burger = document.getElementById('burger-btn')
  const nav = document.getElementById('mobile-nav')
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('hidden'))
  }

  // Active nav link: highlight item whose href matches current path
  const path = location.pathname
  document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href')
    const isHome = href === '/' || href === '/ja/'
    const active = isHome ? path === href : path.startsWith(href)
    if (active) a.classList.add('active')
  })
})
