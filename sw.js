
self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
  });

const filesToCache = [
    '/index.html',
    '/cities.html',
    '/forecast.html',
    '/searchForecast.html',
    '/src/styles/styles.css', 
    '/src/js/cityWeather.js', 
    '/src/js/forecast.js', 
    '/src/js/recentLocations.js', 
    '/src/js/searchForecast.js', 
    '/src/js/searchWeatherApp.js', 
    '/src/js/weatherApp.js' 
  ];
  
  const staticCacheName = 'pages-cache-v1';
  
  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
      	console.log("Opened cache")
        return cache.addAll(filesToCache);
      })
    );
  });