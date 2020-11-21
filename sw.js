
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
    '/src/js/weatherApp.js', 
    '/src/images/WeatherIcons/01d.png', 
    '/src/images/WeatherIcons/01n.png', 
    '/src/images/WeatherIcons/02d.png', 
    '/src/images/WeatherIcons/02n.png', 
    '/src/images/WeatherIcons/03d.png', 
    '/src/images/WeatherIcons/03n.png', 
    '/src/images/WeatherIcons/04d.png', 
    '/src/images/WeatherIcons/04n.png', 
    '/src/images/WeatherIcons/09d.png', 
    '/src/images/WeatherIcons/09n.png', 
    '/src/images/WeatherIcons/010d.png', 
    '/src/images/WeatherIcons/010n.png', 
    '/src/images/WeatherIcons/011d.png', 
    '/src/images/WeatherIcons/011n.png', 
    '/src/images/WeatherIcons/013d.png', 
    '/src/images/WeatherIcons/013n.png', 
    '/src/images/WeatherIcons/050d.png', 
    '/src/images/WeatherIcons/050n.png', 
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