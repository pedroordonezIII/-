//const key2 = "431b45917c54f45c9821d34e4a34c843"; 

//search.addEventListener("keypress", setEvent); 

// function setEvent(){
//     console.log(search.value);
// }

// $("#search").click(searchWeather);

// let city = "London"; 

// let api = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${key}`;
// console.log(api); 

//will be set to the value for the search 
const search = document.getElementById("search"); 

//will add an event to the form input 
document.querySelector('form.formInput').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault()
    
    //called to display the current weather
    searchWeather(search.value); 
    //function called to display the forecast
    searchWeatherForecast(search.value);
    //$.getJSON(api, searchWeather());
});  

//an object to store the values fetched from the api for the current weather
const weatherByLocation = {};

weatherByLocation.temperature = {unit: "fahrenheit"}

//an object to hold the values fetched from the api for the forecast
const weatherForecastByLocation = {}; 

//an object inside the weatherForecastByLocation objecto to hold the current forecast day data
weatherForecastByLocation.dayOne = {}
weatherForecastByLocation.dayTwo = {}
weatherForecastByLocation.dayThree = {}
weatherForecastByLocation.dayFour = {}


// let button = document.querySelector(".btn");
// button.addEventListener("click", setCity); 

// function setCity(){
//     console.log(button.value); 
// }

//This array will hold all the searched locations during the session
const searchedLocations = []; 

/*
This function will take a city as an input to store in the api and will fetch the api 
to get the data associated with the city. The data fetched from the api will be stored
in an object.  
The function will then call the corresponding function to dispay the data on the page.  
*/
function searchWeather(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
    //let api2 = `http://api.openweathermap.org/data/2.5/weather?q=${akjf}&appid=${431b45917c54f45c9821d34e4a34c843}`; 
   console.log(api); 
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        //update the values in the object of objects for each object
        weatherByLocation.temperature.value = Math.round(data.main.temp);
        weatherByLocation.description = data.weather[0].description;
        weatherByLocation.iconId = data.weather[0].icon;
        weatherByLocation.feelsLike =  Math.round(data.main.feels_like);
        weatherByLocation.city = data.name;
        weatherByLocation.country = data.sys.country;
        weatherByLocation.windSpeed = Math.round(data.wind.speed);
        weatherByLocation.humidity = data.main.humidity; 
        weatherByLocation.time = localTime(data.dt); 
        weatherByLocation.date = currentDate(data.dt); 
        searchedLocations.push(
             {city: `${data.name}`,
              country: `${data.sys.country}`
        }); 
        // searchedLocations.city = `${data.name}`;
        // searchedLocations.country = `${data.sys.country}`; 
        //toLocalStorage(searchedLocations); 
        $("#notificationOne").html(`<p></p>`);
    })
    .then(function(){
        displaySearchedWeather();
        //searchWeatherForecast(search.value);
    })
    .catch(function(e){
        if(search.value == ""){
            $("#notificationOne").html(`<p> Provide a location input. </p>`);
            // $("#showCurrentWeatherIcon").html(`<img src="Icons/unknown.png" class="img-fluid"/>`);
            // $("#showCurrentTemperature p").html(`- °<span>F</span>`);
            // $("#showCurrentWeather p").html(`-`);
            // $("#showLocation p").html(`-`);
            // $("#showCurrentWind").html(`- <span>mph</span>`);
            // $("#showCurrentHumidity").html(`- <span>%</span>`);
            // $("#showDate p").html(`-`); 
            // $("#showTime p").html(`-`); 
        }
        else{
        $("#notificationOne").html(`<p> Location not available. </p>`);
        //$("#notificationOne").html(`<p> ${e.name} </p>`);
        }
    });
};
/*
*input: the city that will be searched for by the user 
* This function will fetch the api data and store the data in an object of objects 
* A function to display the forecast will be called at the end 
*/
function searchWeatherForecast(city){
    // let api = `https://api.openweathermap.org/data/2.5/find?q=${city}&cnt=${5}&units=imperial&appid=${key}`; 
    let api = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${"6"}&units=imperial&appid=${key}`; 
    console.log(api); 
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            //console.log(currentDate(data.list[0].dt));
            //add all the values to the object of objects based on the day 
            weatherForecastByLocation.dayOne.date = (currentDate(data.list[1].dt)); 
            weatherForecastByLocation.dayOne.iconId = data.list[1].weather[0].icon; 
            weatherForecastByLocation.dayOne.description = data.list[1].weather[0].description; 
            weatherForecastByLocation.dayOne.HI = Math.round(data.list[1].temp.max);
            weatherForecastByLocation.dayOne.LO = Math.round(data.list[1].temp.min);
            weatherForecastByLocation.dayOne.precip = Math.round(100 * (data.list[1].pop));
            weatherForecastByLocation.dayTwo.date = (currentDate(data.list[2].dt)); 
            weatherForecastByLocation.dayTwo.iconId= data.list[2].weather[0].icon; 
            weatherForecastByLocation.dayTwo.description = data.list[2].weather[0].description; 
            weatherForecastByLocation.dayTwo.HI = Math.round(data.list[2].temp.max);
            weatherForecastByLocation.dayTwo.LO = Math.round(data.list[2].temp.min);
            weatherForecastByLocation.dayTwo.precip = Math.round(100 * (data.list[2].pop));
            weatherForecastByLocation.dayThree.date = (currentDate(data.list[3].dt)); 
            weatherForecastByLocation.dayThree.iconId = data.list[3].weather[0].icon; 
            weatherForecastByLocation.dayThree.description = data.list[3].weather[0].description; 
            weatherForecastByLocation.dayThree.HI = Math.round(data.list[3].temp.max);
            weatherForecastByLocation.dayThree.LO = Math.round(data.list[3].temp.min);
            weatherForecastByLocation.dayThree.precip = Math.round(100 * (data.list[3].pop));
            weatherForecastByLocation.dayFour.date = (currentDate(data.list[4].dt)); 
            weatherForecastByLocation.dayFour.iconId = data.list[4].weather[0].icon; 
            weatherForecastByLocation.dayFour.description = data.list[4].weather[0].description; 
            weatherForecastByLocation.dayFour.HI = Math.round(data.list[4].temp.max);
            weatherForecastByLocation.dayFour.LO = Math.round(data.list[4].temp.min);
            weatherForecastByLocation.dayFour.precip = Math.round(100 * (data.list[4].pop));
            weatherByLocation.temperatureHi = Math.round(data.list[0].temp.max);
            weatherByLocation.temperatureLo = Math.round(data.list[0].temp.min);
            // weatherForecast[0].dayOne.date = currentDate(data.daily[1].dt);
         // weatherForecast.dayTwo
        })
        .then(function(){
            displaySearchWeatherForecast();
    });
};

/*
*This function will display the current weather for the searched location that is stored in the 
weatherBylocation object of object.  The key value pairs of each will be used to access 
the correct value to display on the page.  
*/
function displaySearchedWeather(){
    $("#showCurrentWeatherIcon").html(`<img src="src/images/WeatherIcons/${weatherByLocation.iconId}.png" class="img-fluid"/>`);
    $("#showCurrentTemperature p").html(`${weatherByLocation.temperature.value}°<span>F</span>`);
    $("#showCurrentWeather p").html(weatherByLocation.description);
    $("#showLocation p").html(`${weatherByLocation.city}, ${weatherByLocation.country}`);
    $("#showCurrentWind").html(`${weatherByLocation.windSpeed} <span>mph</span>`);
    $("#showCurrentHumidity").html(`${weatherByLocation.humidity} <span>%</span>`);
    $("#showDate p").html(`${weatherByLocation.date}`); 
    $("#showTime p").html(`${weatherByLocation.time}`); 
    $("#feelsLikeTemp").html(`${weatherByLocation.feelsLike}<span>°F</span>`)
    console.log(weatherByLocation);
    console.log(searchedLocations); 
}

/*
*This function will display the forecast by getting the values from the key value pairs
of each object in the object of objects for the four days
*The ids related to the spot on the HTML document will be use to display it
*/
function displaySearchWeatherForecast(){
    $("#showDayOne").html(`${weatherForecastByLocation.dayOne.date}`); 
    $("#showWeatherIconOne").html(`<img src="src/images/WeatherIcons/${weatherForecastByLocation.dayOne.iconId}.png" class="img-fluid"/>`); 
    $("#showWeatherTypeOne").html(`${weatherForecastByLocation.dayOne.description}`);
    $("#showTemperatureHiOne").html(`Hi: ${weatherForecastByLocation.dayOne.HI}°<span>F</span>`);
    $("#showTemperatureLoOne").html(`Lo: ${weatherForecastByLocation.dayOne.LO}°<span>F</span>`);
    $("#showPrecipitationOne").html(`Precip: ${weatherForecastByLocation.dayOne.precip}<span>%</span>`)
    $("#showDayTwo").html(`${weatherForecastByLocation.dayTwo.date}`); 
    $("#showWeatherIconTwo").html(`<img src="src/images/WeatherIcons/${weatherForecastByLocation.dayTwo.iconId}.png" class="img-fluid"/>`); 
    $("#showWeatherTypeTwo").html(`${weatherForecastByLocation.dayTwo.description}`);
    $("#showTemperatureHiTwo").html(`Hi: ${weatherForecastByLocation.dayTwo.HI}°<span>F</span>`);
    $("#showTemperatureLoTwo").html(`Lo: ${weatherForecastByLocation.dayTwo.LO}°<span>F</span>`);
    $("#showPrecipitationTwo").html(`Precip: ${weatherForecastByLocation.dayTwo.precip}<span>%</span>`)
    $("#showDayThree").html(`${weatherForecastByLocation.dayThree.date}`); 
    $("#showWeatherIconThree").html(`<img src="src/images/WeatherIcons/${weatherForecastByLocation.dayThree.iconId}.png" class="img-fluid"/>`); 
    $("#showWeatherTypeThree").html(`${weatherForecastByLocation.dayThree.description}`);
    $("#showTemperatureHiThree").html(`Hi: ${weatherForecastByLocation.dayThree.HI}°<span>F</span>`);
    $("#showTemperatureLoThree").html(`Lo: ${weatherForecastByLocation.dayThree.LO}°<span>F</span>`);
    $("#showPrecipitationThree").html(`Precip: ${weatherForecastByLocation.dayThree.precip}<span>%</span>`)
    $("#showDayFour").html(`${weatherForecastByLocation.dayFour.date}`); 
    $("#showWeatherIconFour").html(`<img src="src/images/WeatherIcons/${weatherForecastByLocation.dayFour.iconId}.png" class="img-fluid"/>`); 
    $("#showWeatherTypeFour").html(`${weatherForecastByLocation.dayFour.description}`);
    $("#showTemperatureHiFour").html(`Hi: ${weatherForecastByLocation.dayFour.HI}°<span>F</span>`);
    $("#showTemperatureLoFour").html(`Lo: ${weatherForecastByLocation.dayFour.LO}°<span>F</span>`);
    $("#showPrecipitationFour").html(`Precip: ${weatherForecastByLocation.dayFour.precip}<span>%</span>`);
    $("#temperatureValues").html(`Hi:${weatherByLocation.temperatureHi}<span>°F</span> Lo:${weatherByLocation.temperatureLo}<span>°F</span>`);
    console.log(weatherForecastByLocation);
}

// function toLocalStorage(objectItem){
//     // if(!localStorage.getItem("locations") || JSON.parse(localStorage.getItem("locations")).length === 0){
//     //     window.localStorage.setItem("locations", JSON.stringify(item));
//     // }
//     // let retrievedData = JSON.parse(window.localStorage.getItem("locations")); 
//     // let sortedType = "city"; 

//     //store the object in localStorage
//     //window.localStorage.setItem(["locations"], item); 
//     //to store the object, convert it to a string by serialization
//     //let newData = document.getElementById("data").value;
//     //let newData = item; 

//     let myObjectSerialized = JSON.stringify(objectItem);
//     //let myArray = []; 
//     if(localStorage.getItem("locations") == null){
//         localStorage.setItem("locations", "[]"); 
//     }

//     //this will be the data already present in the array and also make data readable
//     let oldData = JSON.parse(window.localStorage.getItem("locations"));
//     //Add the new data to the already present old data
//     oldData.push(myObjectSerialized); 

//     localStorage.setItem("locations", oldData); 
//     //sconsole.log(localStorage); 

//     // let myObject_Serialized = JSON.stringify(item); 
//     // window.localStorage.setItem(["locations"], myObject_Serialized);  
//     // console.log(localStorage); 
// }

// let jsonString = JSON.stringify(weatherByLocation); 
// console.log(jsonString); 


