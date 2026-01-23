const CACHE_NAME = 'verycodedly-v8';

const OFFLINE_ASSETS = [
  '/offline.html',
  '/favicon.ico',
  '/images/mascot.svg'
];

// INSTALL: cache offline page + required images
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH: navigation only → offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match('/offline.html'))
  );
});

// const CACHE_NAME = 'verycodedly-v7';

// const PRECACHE_URLS = [
//   '/offline.html',
//   '/favicon.ico',
//   '/images/mascot.svg'
// ];

// // INSTALL: precache offline assets
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
//   );
//   self.skipWaiting();
// });

// // ACTIVATE
// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim());
// });

// // FETCH: navigation + serve cached offline assets
// self.addEventListener('fetch', (event) => {
//   const { request } = event;

//   // Navigation requests → network first, fallback to offline.html
//   if (request.mode === 'navigate') {
//     event.respondWith(
//       fetch(request).catch(() => caches.match('/offline.html'))
//     );
//     return;
//   }

//   // Offline assets → serve if available
//   event.respondWith(
//     caches.match(request).then((cached) => cached || fetch(request))
//   );
// });
