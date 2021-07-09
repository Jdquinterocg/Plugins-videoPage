const cacheName = 'Cache1';
const files = [
    './',
    './index.html',
    './assets/index.js',
    './assets/MediaPlayer.js',
    './assets/plugins/AutoPlay.js',
    './assets/plugins/AutoPause.js',
    './assets/index.css',
    './assets/BigBuckBunny.mp4',
];

self.addEventListener('install', event => {
    console.log('Installing')
    event.waitUntil(cacheReady())
});

const cacheReady = async () => {
    const cache = await caches.open(cacheName); // Create a cache name
    return cache.addAll(files); // Files to charge
};

self.addEventListener('fetch', event => {
    const request = event.request;
    // Only response fetch with GET
    if (request.method !== "GET") {
        return;
    }

    //Here we know that the fetch is a GET petition
    event.respondWith(cacheResponse(request));

    // Update the cache
    event.waitUntil(cacheUpdated(request));
});

const cacheResponse = async (request) => {
    const cache = await caches.open(cacheName);
    const response = await cache.match(request); // Cache, Do you have the answer of this petition?

    return response || fetch(request); // Yes || NO, look for it in another place
}

const cacheUpdated = async (request) => {
    const cache = await caches.open(cacheName);
    const response = await fetch(request);
    return cache.put(request, response);
}