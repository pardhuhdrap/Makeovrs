// service-worker.js

const CACHE_NAME = 'makeovrs-static-v1';
const ASSETS_TO_CACHE = [
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// Install – cache only icons & manifest
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate – remove old caches if we change CACHE_NAME later
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch – we do NOT intercept normal requests like index.html
// Everything else goes straight to network; browser handles it.
// (No event.respondWith here on purpose for safety.)
