const CACHE_NAME = 'verycodedly-v7';

const PRECACHE_URLS = [
  '/offline.html',
  '/favicon.ico',
  '/images/mascot.svg'
];

// INSTALL: precache offline assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// FETCH: navigation + serve cached offline assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Navigation requests → network first, fallback to offline.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Offline assets → serve if available
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});


// const CACHE_NAME = 'verycodedly-v6';

// const PRECACHE_URLS = [
//   '/offline.html',
//   '/favicon.ico',
//   '/images/mascot.svg'
// ];

// // INSTALL
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
//   );
//   self.skipWaiting();
// });

// // ACTIVATE
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((keys) =>
//       Promise.all(
//         keys
//           .filter((key) => key !== CACHE_NAME)
//           .map((key) => caches.delete(key))
//       )
//     )
//   );
//   self.clients.claim();
// });

// // FETCH
// self.addEventListener('fetch', (event) => {
//   if (event.request.method !== 'GET') return;

//   const url = new URL(event.request.url);

//   // Navigation: network-first, offline fallback ONLY
//   if (event.request.mode === 'navigate') {
//     event.respondWith(
//       fetch(event.request).catch(() => caches.match('/offline.html'))
//     );
//     return;
//   }

//   // Ignore Next.js internals & APIs
//   if (
//     url.pathname.startsWith('/_next') ||
//     url.pathname.startsWith('/api')
//   ) {
//     return;
//   }

//   // Static assets only
//   event.respondWith(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);

//       const cached = await cache.match(event.request);
//       if (cached) return cached;

//       const response = await fetch(event.request);

//       if (response?.ok) {
//         cache.put(event.request, response.clone());
//       }

//       return response;
//     })()
//   );
// });
