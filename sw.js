const CACHE_NAME = 'mostatrip-v1';

// Fichiers à mettre en cache pour le mode hors ligne
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './places.js',
  './booking.js',
  './manifest.json',
  './images/placeholder.jpg',
  './images/icon-192.png',
  './images/icon-512.png'
];

// Installation : mise en cache des ressources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});

// Stratégie Cache First : on sert le cache si dispo, sinon réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});