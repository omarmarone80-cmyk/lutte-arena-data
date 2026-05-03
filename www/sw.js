const CACHE_NAME = 'lutte-arena-v2';
const urlsToCache = [
  '/lutte-arena-data/',
  '/lutte-arena-data/index.html',
  '/lutte-arena-data/data/combats.json',
  '/lutte-arena-data/data/lutteurs.json',
  '/lutte-arena-data/data/mbapatt.json',
  '/lutte-arena-data/data/news.json',
  '/lutte-arena-data/images/lutteurs/ada_fass.jpg',
  '/lutte-arena-data/images/lutteurs/eumeu_sene.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache ouvert');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        if (!event.request.url.includes('?t=')) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        }
        return fetchResponse;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});