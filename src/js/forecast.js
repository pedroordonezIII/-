let key = "431b45917c54f45c9821d34e4a34c843"; 

/**
Upon having the document load, the browser will check if the 
gelocation services are prosent in the browser and will either 
display an error message or get the users gelocation with 
built in getCurrentPosition functionality which takes a 
callback to a setPosition function and an error.  
**/
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

//SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    $("#notificationOne").css("block");
    $("#notificationOne").html(`<p> ${error.message} </p>`);
}

/*
This function will take the users location and set it equal to 
its corresponding latitude and longitude. Upon setting the latitude
and longitude, the displayLocation and displayData functions will be 
called with the latitude and longitude passed to the function. 
*/
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    displayLocation(latitude, longitude); 
    displayData(latitude, longitude); 
}

//function that sets the current date and returns the current date in month, day, and year
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
The function will take the corresponding latitude and longitude and 
display the current location onto the user interface.  It will first fetch the api
and set the data equal to the json response from the api.  The data returned will then
be used to display the city and country of the corresponding latitude and longitude
*/
function displayLocation(lat,lon){
    //set the api equal to its corresponding link 
    let api = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
    console.log(api);
    //fetch the api and use promises
    fetch(api)
    //after fetching, get the response
    .then(function(response){
        //set the data variable equal to the JSON response
        let data = response.json();
        return data;
    })
    //use the returned data from above in the function call
    .then(function(data){
        //using the json data, set the html equal to the city and country data
        $("#showLocation p").html(`${data.city.name}, ${data.city.country}`);
    })
}

/*
function that will take the latitude and longitude to pass to the API.  This function will 
contain an ajax request that will 
*/
function displayData(lat,lon) {
    $.ajax({
    //post request
    type: "POST",
    url: `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${10}&units=imperial&appid=${key}`,
    log: console.log("http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${10}&units=imperial&appid=${key}"),
    dataType: "json",
    success: function (result, status, xhr) {
    res = CreateWeatherJson(result);
    $("#weatherTable1").append("<thead><th>Date</th><th>Temp °F</th><th>Min Temp °F</th><th>Max Temp °F</th><th>Humidity %</th><th>Wind mph</th><th>Rain %</th></thead></table>"),
    $('#weatherTable1').DataTable({
    data: JSON.parse(res),
    columns: [
    { data: 'date' },
    { data: 'temp' },
    { data: 'tempMin' },
    { data: 'tempMax' },
    { data: 'humidity' },
    { data: 'wind' },
    { data: 'rain' }
    ],
    "pageLength": 10
    });
    },
    error: function (xhr, status, error) {
    console.log("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    }
    });
    };

    /*
    This function will take a JSON result and get all the corresponding 
    data to display on the user interface.  The corresponding data, temp,
    temp minimum, temp max, humidity, wind, and rain will all be obtained from 
    the JSON result.  After obtaining the data, it will be displayed on the user
    interface.    */
    function CreateWeatherJson(json) {
    var newJson = "";
    for (i = 0; i < json.list.length; i++) {
    //cityId = json.list[i].id;
    //cityName = json.list[i].name;
    date = currentDate(json.list[i].dt)
    temp = Math.round(json.list[i].temp.day)
    tempMin = Math.round(json.list[i].temp.min)
    tempMax = Math.round(json.list[i].temp.max)
    humidity = json.list[i].humidity
    wind = Math.round((json.list[i].speed))
    rain = Math.round(100 *(json.list[i].pop))
    newJson = newJson + "{";
    //newJson = newJson + "\"cityId\"" + ": " + cityId + ","
    newJson = newJson + "\"date\"" + ": " + "\"" + date + "\"" + ","
    newJson = newJson + "\"temp\"" + ": " + temp + ","
    newJson = newJson + "\"tempMin\"" + ": " + tempMin + ","
    newJson = newJson + "\"tempMax\"" + ": " + tempMax + ","
    newJson = newJson + "\"humidity\"" + ": " + humidity + ","
    newJson = newJson + "\"wind\"" + ": " + wind + ","
    newJson = newJson + "\"rain\"" + ": " + rain
    newJson = newJson + "},";
    }
    return "[" + newJson.slice(0, newJson.length - 1) + "]"
};