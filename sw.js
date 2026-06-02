/*
 * Service Worker – MostaTrip
 * Gère le cache pour le mode hors‑ligne
 */

const CACHE_NAME = 'mostatrip-v4';

// Liste des fichiers à mettre en cache
const FILES_TO_CACHE = [
  './app.html',
  './style.css',
  './main.js',
  './places.js',
  './booking.js',
  './manifest.json'
];

// Installation : mise en cache
self.addEventListener('install', event => {
  console.log('[SW] Installation');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Mise en cache des fichiers');
      return Promise.allSettled(
        FILES_TO_CACHE.map(url =>
          cache.add(url).catch(err => {
            console.warn('[SW] Impossible de mettre en cache :', url, err);
          })
        )
      );
    })
  );
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activation');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Suppression ancien cache :', name);
            return caches.delete(name);
          })
      );
    })
  );
});

// Stratégie : Cache d'abord, puis réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Si le réseau échoue, renvoyer la page d'accueil en cache
        return caches.match('./app.html');
      });
    })
  );
});
