const CACHE_NAME = 'komva-v1';
const assets = [
  '/',
  '/index.html',
  '/login.html',
  '/signup.html',
  '/app.html',
  '/css/variables.css',
  '/css/global.css',
  '/css/auth.css',
  '/css/dashboard.css',
  '/js/app.js',
  '/js/mock-data.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
