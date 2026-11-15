// The retired Gatsby site registered a caching service worker at this URL.
// Browsers that visited it keep that worker until a script at this URL
// replaces it, so this worker stays in place permanently: it removes itself,
// the caches and the IndexedDB database the old worker filled, then reloads
// the pages it controlled. It has no fetch handler, so it never answers a
// request.
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map((key) => caches.delete(key)))
      } catch {}

      try {
        indexedDB.deleteDatabase('keyval-store')
      } catch {}

      await self.registration.unregister()

      const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      await Promise.all(
        clients.map((client) => client.navigate(client.url).catch(() => {})),
      )
    })(),
  )
})
