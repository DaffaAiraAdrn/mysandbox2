const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  "/mysandbox2/2411531006_TugasDesainWeb/index.html",
  "/mysandbox2/2411531006_TugasDesainWeb/about.html",
  "/mysandbox2/2411531006_TugasDesainWeb/contact.html",
  "/mysandbox2/2411531006_TugasDesainWeb/offline.html",
  "/mysandbox2/2411531006_TugasDesainWeb/global_style.css",
  "/mysandbox2/2411531006_TugasDesainWeb/icons/icon-192.png",
  "/mysandbox2/2411531006_TugasDesainWeb/icons/icon-512.png"
  


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