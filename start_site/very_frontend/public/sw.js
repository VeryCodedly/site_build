const CACHE_NAME = 'verycodedly-v3';

const OFFLINE_ASSETS = [
  '/offline.html',
  '/favicon.ico',
  '/images/shelly-off.svg'
];

// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle navigation or offline assets
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Serve offline assets if network fails
  if (OFFLINE_ASSETS.includes(new URL(request.url).pathname)) {
    event.respondWith(
      caches.match(request).catch(() => fetch(request))
    );
  }
});
