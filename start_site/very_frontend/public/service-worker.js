const CACHE_NAME = 'verycodedly-v3'; 

const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/fonts/geist-mono-v3-latin-900.woff2',
  '/fonts/poppins-v23-latin-900.woff2',
  '/fonts/roboto-mono-v30-latin-regular.woff2',
  '/images/community-img.svg',
  '/images/bg-404.jpg',
  '/images/bg-1.svg',
  '/icons/icon.svg',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        PRECACHE_URLS.map((url) =>
          fetch(url)
            .then((resp) => resp.ok && cache.put(url, resp))
            .catch(() => {
              console.warn('Failed to precache:', url);
            })
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const request = e.request;

  if (request.method !== 'GET' || request.url.includes('/api/')) {
    return;
  }

  if (request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(request, copy));
            return res;
          })
          .catch(() => caches.match('/offline.html'))
      );
    })
  );
});