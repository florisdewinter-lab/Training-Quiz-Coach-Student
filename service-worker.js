const CACHE_NAME = 'quiz-student-v4';
const ASSETS = [
  '/Training-Quiz-Coach-Student/',
  '/Training-Quiz-Coach-Student/index.html',
  '/Training-Quiz-Coach-Student/manifest.json',
  '/Training-Quiz-Coach-Student/icons/icon-192.png',
  '/Training-Quiz-Coach-Student/icons/icon-512.png',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
