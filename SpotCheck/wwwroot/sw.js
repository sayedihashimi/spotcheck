
const staticAssets = [
    './',
    './sw.js',
    './css/site.css',
    './css/site.min.css',
    './js/site.js',
    './js/site.min.js',
];

const mainCacheName = 'spotcheck-01';

// // https://stackoverflow.com/questions/38168276/navigator-serviceworker-controller-is-null-until-page-refresh
self.addEventListener('install', async event => {
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim()); // Become available to all pages
});


self.addEventListener('fetch', async event => {
    handleFetch(event);
});



async function handleFetch(event) {
    event.respondWith(cacheFirst(event.request));
}

async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse
        }
    }
    catch (error) {
        console.debug('error in cacheFirst():'+error);
    }

    var response = await fetch(request);
    const cache = await caches.open(mainCacheName);
    cache.put(request, response.clone());

    return response;
}

async function networkFirst(request) {
    console.log('networkFirst');
    const cache = await caches.open(mainCacheName);

    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    }
    catch (error) {
        return cache.match(request);
    }
}

self.addEventListener('message', async function (event) {
    console.log("SW Received Message: " + event.data);
    UpdateApp();
});

async function UpdateApp() {
    const cache = await caches.open(mainCacheName);

    try {
        staticAssets.forEach(function (asset) {
            cache.delete(asset, {
                'ignoreSearch': true,
                'ignoreMethod': true,
                'ignoreVary': true
            });
        });
    }
    catch (error) {
        console.log('error: ' + error);
    }
    console.log('removed assets');

    cache.addAll(staticAssets);
}
/*
 * response.forEach(function(element, index, array) {
      cache.delete(element);
    });
 */


