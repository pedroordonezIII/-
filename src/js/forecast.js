let key = "431b45917c54f45c9821d34e4a34c843"; 

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

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    displayLocation(latitude, longitude); 
    displayData(latitude, longitude); 
}

//function current date
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

function displayLocation(lat,lon){
    let api = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
    console.log(api);
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        $("#showLocation p").html(`${data.city.name}, ${data.city.country}`);
    })
}

function displayData(lat,lon) {
    $.ajax({
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
    rain = 100 *(json.list[i].pop)
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