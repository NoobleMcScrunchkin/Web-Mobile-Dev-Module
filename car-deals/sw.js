self.importScripts('data/car-deals.js');

var cacheName = 'car-deals-v1';
var appShellFiles = [
    './',
    'data/car-deals.js',
    'index.html',
    'app.js',
    'style.css',
    'favicon.ico',
    'img/car-deals.png',
    'img/bg.png',
    'resources/material-design-lite/material.min.js.map',
    'resources/material-design-lite/material.red-indigo.min.css',
];

var carsImages = [];
for (let i = 0; i < cars.length; i++) {
    carsImages.push('data/img/' + cars[i].slug + '.jpg');
}

var contentToCache = appShellFiles.concat(carsImages);

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then((res) => {
                return caches.open(cacheName).then((cache) => {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, res.clone());
                    return res;
                });
            });
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheName.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});