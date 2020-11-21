
self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
  });

const filesToCache = [
    'index.html',
    'cities.html',
    'forecast.html',
    'searchForecast.html',
    'styles/styles.css', 
    'js/cityWeather.js', 
    'js/forecast.js', 
    'js/recentLocations.js', 
    'js/searchForecast.js', 
    'js/searchWeatherApp.js', 
    'js/weatherApp.js', 
    '/images/WeatherIcons/01d.png', 
    '/images/WeatherIcons/01n.png', 
    '/images/WeatherIcons/02d.png', 
    '/images/WeatherIcons/02n.png', 
    '/images/WeatherIcons/03d.png', 
    '/images/WeatherIcons/03n.png', 
    '/images/WeatherIcons/04d.png', 
    '/images/WeatherIcons/04n.png', 
    '/images/WeatherIcons/09d.png', 
    '/images/WeatherIcons/09n.png', 
    '/images/WeatherIcons/010d.png', 
    '/images/WeatherIcons/010n.png', 
    '/images/WeatherIcons/011d.png', 
    '/images/WeatherIcons/011n.png', 
    '/images/WeatherIcons/013d.png', 
    '/images/WeatherIcons/013n.png', 
    '/images/WeatherIcons/050d.png', 
    '/images/WeatherIcons/050n.png', 
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