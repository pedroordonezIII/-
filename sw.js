// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function(response) {
//           // Cache hit - return response
//           if (response) {
//             return response;
//           }
//           return fetch(event.request);
//         }
//       )
//     );
//   });

/*
dynamic caching
*/
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.open('mysite-dynamic').then(function(cache) {
//         return cache.match(event.request).then(function (response) {
//           return response || fetch(event.request).then(function(response) {
//             cache.put(event.request, response.clone());
//             return response;
//           });
//         });
//       })
//     );
//   });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function(cache) {
//       return fetch(event.request).then(function(response) {
//         cache.put(event.request, response.clone());
//         return response;
//       })
//     })
//   );
// });

// self.addEventListener('fetch', event => {
//   if (event.request.mode === 'navigate') {
//     // See /web/fundamentals/getting-started/primers/async-functions
//     // for an async/await primer.
//     event.respondWith(async function() {
//       // Optional: Normalize the incoming URL by removing query parameters.
//       // Instead of https://example.com/page?key=value,
//       // use https://example.com/page when reading and writing to the cache.
//       // For static HTML documents, it's unlikely your query parameters will
//       // affect the HTML returned. But if you do use query parameters that
//       // uniquely determine your HTML, modify this code to retain them.
//       const normalizedUrl = new URL(event.request.url);
//       normalizedUrl.search = '';

//       // Create promises for both the network response,
//       // and a copy of the response that can be used in the cache.
//       const fetchResponseP = fetch(normalizedUrl);
//       const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

//       // event.waitUntil() ensures that the service worker is kept alive
//       // long enough to complete the cache update.
//       event.waitUntil(async function() {
//         const cache = await caches.open('my-cache-name');
//         await cache.put(normalizedUrl, await fetchResponseCloneP);
//       }());

//       // Prefer the cached response, falling back to the fetch response.
//       return (await caches.match(normalizedUrl)) || fetchResponseP;
//     }());
//   }
// });

self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
  });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(fetch(event.request));
//   });



// const filesToCache = [
// 	'/',
//     'index.html',
//     'cities.html',
//     'forecast.html',
//     'searchForecast.html',
//     'src/styles/styles.css', 
//     'src/js/cityWeather.js', 
//     'src/js/forecast.js', 
//     'src/js/recentLocations.js', 
//     'src/js/searchForecast.js', 
//     'src/js/searchWeatherApp.js', 
//     'src/js/weatherApp.js' 
//   ];
  
//   const staticCacheName = 'pages-cache-v1';
  
//   self.addEventListener('install', event => {
//     console.log('Attempting to install service worker and cache static assets');
//     event.waitUntil(
//       caches.open(staticCacheName)
//       .then(cache => {
//       	console.log("Opened cache")
//         cache.addAll(filesToCache.map(function(filesToCache) {
// 	    return new Request(filesToCache, { mode: 'no-cors' });
// 	    })).then(function() {
// 	    console.log('All resources have been fetched and cached.');
// 	    });
//       })
//     );
//   });

//  const staticCacheName = 'pages-cache-v1';

// self.addEventListener('install', event => {
//   console.log('Attempting to install service worker and cache static assets');
//   event.waitUntil(
//     caches.open(staticCacheName)
//     .then(cache => {
//       return cache.addAll(filesToCache);
//     })
//   );
// });


/*
Specifeid files to be cached 
*/
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    'index.html',
    'cities.html',
    'forecast.html',
    'searchForecast.html',
    'src/styles/styles.css', 
    'src/js/cityWeather.js', 
    'src/js/forecast.js', 
    'src/js/recentLocations.js', 
    'src/js/searchForecast.js', 
    'src/js/searchWeatherApp.js', 
    'src/js/weatherApp.js'

];

/*
*/

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('now ready to handle fetches!');
    })
  );
});
