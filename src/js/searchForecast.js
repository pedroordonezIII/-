let key = "431b45917c54f45c9821d34e4a34c843"; 

const search = document.getElementById("search"); 

//will add an event to the form input 
document.querySelector('form.formInput').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault()

    console.log(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${search.value}&cnt=${10}&units=imperial&appid=${key}`)
    
    //called to display the current weather
    //searchWeather(search.value); 
    //function called to display the forecast
    //will pass the search calue to this function to display the location
    displayCityForecast(search.value);
    //will pass it to this function to render the city data from the API
    displaySearchedLocation(search.value);
    //$.getJSON(api, searchWeather());
    return false; 
});  

/*
Function that takes the unix time stamp to convert the 
number to a current month, day, and year.  
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
function that takes in the input value from the form and passes that value to the api.
The api is then used to render information such as the city name and country.  The function
will also check for errors based on user input. 
*/
function displaySearchedLocation(city){
    let api = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=imperial&appid=${key}`;
    console.log(api);
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        $("#showLocation p").html(`${data.city.name}, ${data.city.country}`);
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
}

/*
function that takes in the city search value submitted by the form and gets
all the data based on that city.  This function will Post a data table based 
on the api results. 
*/
function displayCityForecast(city) {
    $.ajax({
    type: "POST",
    url: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${10}&units=imperial&appid=${key}`,
    log: console.log(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${10}&units=imperial&appid=${key}`),
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
    function that takes the json result and gets all the values and sets 
    them to variable.  These values will then be displayed in the table 
    for the corresponding column.  
    */
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

