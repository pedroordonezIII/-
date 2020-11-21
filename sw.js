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

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open('mysite-dynamic').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       fetch(event.request).catch(function() {
//         return caches.match(event.request);
//       })
//     );
//   });

self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
  });



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