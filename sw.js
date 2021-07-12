var CACHE_NAME = 'sw-test.v0.stoneon';
var urlsToCache = [
    '/notice.html',
    '/jquery.min.js',
    '/site.css'
];

self.addEventListener('install', function(event) {
    console.log('install');
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache' ,cache);
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', function(event) {
    console.log('fetch()');
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    console.log('response ', response);
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});

self.addEventListener('activate', function(event) {
    console.log('activate');
});
