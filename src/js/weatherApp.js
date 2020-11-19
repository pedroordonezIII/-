// App data stored in weather object 
const weather = {}; 
//set the initial temeprature to fahernheit
weather.temperature = {unit : "fahrenheit"}
//object to hold the weathe forecast 
const weatherForecast = {} 

// weatherForecast.temperature = {
//     unit: "fahrenheit" 
// }
//objects to hold forecast data for each day 
weatherForecast.dayOne = {}
weatherForecast.dayTwo = {}
weatherForecast.dayThree = {}
weatherForecast.dayFour = {}

// APP CONSTS AND VARS
//const KELVIN = 273;
// API KEY
const key = "431b45917c54f45c9821d34e4a34c843"; 
// const key2 = "831dd386c068fb861e4f3966989d95e3";

// CHECK IF BROWSER SUPPORTS GEOLOCATION by using browser built in GeoLocation
/*
CHECK IF BROWSER SUPPORTS GEOLOCATION by using browser built in GeoLocation
This will load upon the page being ready and will check if the browser 
has a built in gelocation.  
*/
$(document).ready(function (){
    if('geolocation' in navigator){
        //will get geolocation, but needs a call back function and an error function in case of an error
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }else{
        //error
        $("#notificationOne").css("block");
        $("#notificationOne").html("<p>Browser doesn't Support Geolocation</p>");
    }
})
/*
This function will take a position and use that position to latitude and longitude
*/
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    //call functions to use geolocation for the current weather
    getWeather(latitude, longitude);
    //call the forecast function to display the forecast for the 
    //current location
    getForecast(latitude, longitude);
}

//SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    $("#notificationOne").css("block");
    $("#notificationOne").html(`<p> ${error.message} </p>`);
}

/*
This function will get the weather from the api provider and store the data in objects to later call
The function will then call a function to display the elements currentluy stored in the object for the
current weather. 
*/
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`;
    //let api2 =  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${CurrentWeatherKey}`;
    
    console.log(api);
    //console.log(api2);
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            // weather.temperature.value = Math.round(data.main.temp);
            weather.temperature.value = Math.round(data.main.temp);
            // weather.description = data.weather[0].description;
            weather.description = data.weather[0].description;
            // weather.iconId = data.weather[0].icon;
            weather.iconId = data.weather[0].icon;
            // weather.city = data.name;
            weather.city = data.name;
            // weather.country = data.sys.country;
            weather.country = data.sys.country;
            // weather.windSpeed = Math.round(data.wind.speed * 2.237);
            weather.windSpeed = Math.round(data.wind.speed);
            // weather.humidity = data.main.humidity; 
            weather.humidity = data.main.humidity; 
            // weather.time = localTime(data.dt); 
            weather.time = localTime(data.dt); 
            // weather.date = currentDate(data.dt); 
            weather.date = currentDate(data.dt);
            // weather.feelsTemp = Math.round(data.main.feels_like); 
            weather.feelsTemp = Math.round(data.main.feels_like); 
            // weather.sunrise = localTime(data.sys.sunrise); 
            weather.sunrise = localTime(data.sys.sunrise); 
            $("#notificationOne").html(`<p></p>`);
        })
        .then(function(){
            displayWeather();
        });
}

/*
This function will take a latitude and a longitude and use those values to call the api. 
The api will then be fetched and the corresponding values will be accessed and stored 
in a weatherForecast object.  This object will later be accessed upon the end of this 
function by calling the displayForecast function to display the data on the HTML page. 
*/
function getForecast(latitude, longitude){
    let api =  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=${key}`;
    console.log(api); 
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weatherForecast.dayOne.date = currentDate(data.daily[1].dt); 
            weatherForecast.dayOne.iconId = data.daily[1].weather[0].icon; 
            weatherForecast.dayOne.description = data.daily[1].weather[0].description; 
            weatherForecast.dayOne.HI = Math.round(data.daily[1].temp.max);
            weatherForecast.dayOne.LO = Math.round(data.daily[1].temp.min);
            weatherForecast.dayOne.precip = Math.round(100 * (data.daily[1].pop));
            weatherForecast.dayOne.humidity = (data.daily[1].humidity);
            weatherForecast.dayTwo.date = currentDate(data.daily[2].dt); 
            weatherForecast.dayTwo.iconId = data.daily[2].weather[0].icon; 
            weatherForecast.dayTwo.description = data.daily[2].weather[0].description; 
            weatherForecast.dayTwo.HI = Math.round(data.daily[2].temp.max);
            weatherForecast.dayTwo.LO = Math.round(data.daily[2].temp.min);
            weatherForecast.dayTwo.precip = Math.round(100 * (data.daily[2].pop));
            weatherForecast.dayTwo.humidity = (data.daily[2].humidity);
            weatherForecast.dayThree.date = currentDate(data.daily[3].dt); 
            weatherForecast.dayThree.iconId = data.daily[3].weather[0].icon; 
            weatherForecast.dayThree.description = data.daily[3].weather[0].description; 
            weatherForecast.dayThree.HI = Math.round(data.daily[3].temp.max);
            weatherForecast.dayThree.LO = Math.round(data.daily[3].temp.min);
            weatherForecast.dayThree.precip = Math.round(100 * (data.daily[3].pop));
            weatherForecast.dayThree.humidity = (data.daily[3].humidity);
            weatherForecast.dayFour.date = currentDate(data.daily[4].dt); 
            weatherForecast.dayFour.iconId = data.daily[4].weather[0].icon; 
            weatherForecast.dayFour.description = data.daily[4].weather[0].description; 
            weatherForecast.dayFour.HI = Math.round(data.daily[4].temp.max);
            weatherForecast.dayFour.LO = Math.round(data.daily[4].temp.min);
            weatherForecast.dayFour.precip = Math.round(100*(data.daily[4].pop));
            weatherForecast.dayFour.humidity = (data.daily[4].humidity);
            weather.temperatureHi = Math.round(data.daily[0].temp.max);
            weather.temperatureLo = Math.round(data.daily[0].temp.min);
            // weatherForecast[0].dayOne.date = currentDate(data.daily[1].dt);
            // weatherForecast.dayTwo
        })
        .then(function(){
            displayForecast();
        });
}
/*
This fucntion will be called from the getWeather function to display the values stored in the 
weather object.  This object will hold all the data fetched from the api for the current weather.  
Each data value will be displayed on the corresponding id element in the HTML page.  
*/
function displayWeather(){
    $("#showCurrentWeatherIcon").html(`<img src="src/images/WeatherIcons/${weather.iconId}.png" class="img-fluid"/>`);
    $("#showCurrentTemperature p").html(`${weather.temperature.value}°<span>F</span>`);
    $("#showCurrentWeather p").html(weather.description);
    $("#showLocation p").html(`${weather.city}, ${weather.country}`);
    $("#showCurrentWind").html(`${weather.windSpeed} <span>mph</span>`);
    $("#showCurrentHumidity").html(`${weather.humidity} <span>%</span>`);
    $("#showDate p").html(`${weather.date}`); 
    $("#showTime p").html(`${weather.time}`); 
    $("#feelsLikeTemp").html(`${weather.feelsTemp}°<span>F</span>`); 
    $("#sunrise").html(`${weather.sunrise}`);
}
/*
This function will be called from the getForecast function to display the forecast on the 
screen for the user.  The data will all be stored in the weatherForecast object and the data
will be accessed from one of the object corresponding to the days in the forecast.  
*/
function displayForecast(){
    $("#showDayOne").html(`${weatherForecast.dayOne.date}`); 
    $("#showWeatherIconOne").html(`<img src="src/images/WeatherIcons/${weatherForecast.dayOne.iconId}.png" class="img-fluid"/>`); 
    $("#showWeatherTypeOne").html(`${weatherForecast.dayOne.description}`);
    $("#showTemperatureHiOne").html(`Hi: ${weatherForecast.dayOne.HI}°<span>F</span>`);
    $("#showTemperatureLoOne").html(`Lo: ${weatherForecast.dayOne.LO}°<span>F</span>`);
    $("#showPrecipitationOne").html(`Precip: ${weatherForecast.dayOne.precip}<span>%</span>`);
    $("#showHumidityOne").html(`Humidity: ${weatherForecast.dayOne.humidity}<span>%</span>`);
    $("#showDayTwo").html(`${weatherForecast.dayTwo.date}`); 
    $("#showWeatherIconTwo").html(`<img src="src/images/WeatherIcons/${weatherForecast.dayTwo.iconId}.png" class="img-fluid"/>`); 
    $("#showWeatherTypeTwo").html(`${weatherForecast.dayTwo.description}`);
    $("#showTemperatureHiTwo").html(`Hi: ${weatherForecast.dayTwo.HI}°<span>F</span>`);
    $("#showTemperatureLoTwo").html(`Lo: ${weatherForecast.dayTwo.LO}°<span>F</span>`);
    $("#showPrecipitationTwo").html(`Precip: ${weatherForecast.dayTwo.precip}<span>%</span>`);
    $("#showHumidityTwo").html(`Humidity: ${weatherForecast.dayTwo.humidity}<span>%</span>`);
    $("#showDayThree").html(`${weatherForecast.dayThree.date}`); 
    $("#showWeatherIconThree").html(`<img src="src/images/WeatherIcons/${weatherForecast.dayThree.iconId}.png" class="img-fluid"/>`); 
    $("#showWeatherTypeThree").html(`${weatherForecast.dayThree.description}`);
    $("#showTemperatureHiThree").html(`Hi: ${weatherForecast.dayThree.HI}°<span>F</span>`);
    $("#showTemperatureLoThree").html(`Lo: ${weatherForecast.dayThree.LO}°<span>F</span>`);
    $("#showPrecipitationThree").html(`Precip: ${weatherForecast.dayThree.precip}<span>%</span>`);
    $("#showHumidityThree").html(`Humidity: ${weatherForecast.dayThree.humidity}<span>%</span>`);
    $("#showDayFour").html(`${weatherForecast.dayFour.date}`); 
    $("#showWeatherIconFour").html(`<img src="src/images/WeatherIcons/${weatherForecast.dayFour.iconId}.png" class="img-fluid"/>`); 
    $("#showWeatherTypeFour").html(`${weatherForecast.dayFour.description}`);
    $("#showTemperatureHiFour").html(`Hi: ${weatherForecast.dayFour.HI}°<span>F</span>`);
    $("#showTemperatureLoFour").html(`Lo: ${weatherForecast.dayFour.LO}°<span>F</span>`);
    $("#showPrecipitationFour").html(`Precip: ${weatherForecast.dayFour.precip}<span>%</span>`);
    $("#showHumidityFour").html(`Humidity: ${weatherForecast.dayFour.humidity}<span>%</span>`);
    $("#temperatureValues").html(`Hi:${weather.temperatureHi}<span>°F</span> Lo:${weather.temperatureLo}<span>°F</span>`);
    console.log(weatherForecast);
}
/*
This function will take a unix time stamp and convert it to the current time at the users location
*/
function localTime(UNIX_timestamp){
    return new Date(UNIX_timestamp*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); 
    // let date = new Date(UNIX_timestamp * 1000); 
    // let hours = date.getHours();
    // let minutes = "0" + date.getMinutes();
    // return hours + ":" + minutes.substr(-2); 
}
/*
This function will take a unix time stamp and convert it to the current date using some 
built in javascript methods. 
*return: This function will return the current data  
*/
function currentDate(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug',
    'Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let currentDate = month + ' ' + date + ', ' + year 
    return currentDate; 
}
/*
This function will convert a temperature in fahrenheit to kelvin
*input: temperature in kelvin
*output: the temperature converted to the nearest degree 
*/
function kelvinToFahrenheit(temperature){
    return Math.round(((temperature - 273.15) * 9.0/5.0) + 32)
}

// C to F conversion
function fahrenheitToCelsius(temperature){
    return (temperature - 32) / 1.8;
}
/*
This will set a click event to the current temperature and allow the user to 
click the temperature displayed to switch to celsius.  If the value is in degrees 
fahrenheit, then the click event will make the temeprature show in celsius.  
*/
$("#showCurrentTemperature p").click(function() {
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "fahrenheit"){
        let celsius = fahrenheitToCelsius(weather.temperature.value);
        celsius = Math.ceil(celsius);
        
        $("#showCurrentTemperature p").html(`${celsius}°<span>C</span>`);
        weather.temperature.unit = "celsius";
    }else{
        $("#showCurrentTemperature p").html(`${weather.temperature.value}°<span>F</span>`);
        weather.temperature.unit = "fahrenheit"
    }
});
