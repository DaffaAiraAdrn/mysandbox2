const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  "./index.html",
  "./about.html",
  "./contact.html",
  "./offline.html",
  "./global_style.css",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
  


];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            Promise.all(
                cacheNames.map((cache) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request)
    )
    );
})