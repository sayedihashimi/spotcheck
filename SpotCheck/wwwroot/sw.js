
self.addEventListener('install', async event => {
    handleInstall(event);
});

self.addEventListener('fetch', async event => {
    handleFetch(event);
});


async function handleInstall(event) {

}

async function handleFetch(event) {
    event.respondWith(networkFirst(event.request));
}

async function networkFirst(request) {
    console.log('networkFirst');
    const cache = await caches.open('spotcheck-01');
    // const request = event.request;

    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    }
    catch (error) {
        return cache.match(request);
    }
}