const CACHE_NAME = 'verycodedly-v5';

const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/favicon.ico',
  '/images/mascot.svg'
];

// ---------- INSTALL ----------
self.addEventListener('install', (event) => {
  // console.log('[SW] Install');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );

  self.skipWaiting();
});

// ---------- ACTIVATE ----------
self.addEventListener('activate', (event) => {
  // console.log('[SW] Activate');

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

/// ---------- FETCH ----------
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignore APIs & Next internals
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/_next/image')) return;

  // Navigation requests — FIXED
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful pages
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => 
          caches.match('/offline.html') // fallback for all navigation requests
        )
    );
    return;
  }

  // Static assets (runtime cache) — no changes
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, copy);
          });
        }
        return response;
      });
    })
  );
});
