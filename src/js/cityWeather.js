


/*

*/
$(document).ready(function () {
    let key = "431b45917c54f45c9821d34e4a34c843"; 
    $.ajax({
    type: "POST",
    url: `https://api.openweathermap.org/data/2.5/group?id=2643741,5419384,4684904,2654675,2988507,5454711,5516233,2925535,5308655,3120501,3128760,5128581,4140963,4930956,5106834,5391959,5368361,5809844,4099974,4164138&appid=${key}&units=imperial`,
    dataType: "json",
    success: function (result, status, xhr) {
    res = CreateWeatherJson(result);
    $("#weatherTable").append("<thead><th>City Name</th><th>Temp °F</th><th>Min Temp °F</th><th>Max Temp °F</th><th>Humidity %</th><th>Pressure</th></thead></table>"),
    $('#weatherTable').DataTable({
    data: JSON.parse(res),
    columns: [
    //{ data: 'cityId' },
    { data: 'cityName' },
    { data: 'temp' },
    { data: 'tempMin' },
    { data: 'tempMax' },
    { data: 'pressure' },
    { data: 'humidity' }
    ],
    "pageLength": 10
    });
    },
    error: function (xhr, status, error) {
    console.log("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    }
    });
    });

    /*
    this function will take in the returned response data from the api call if successful and access
    the data for the values needed.  It will then build the columns of a table based on the corresponding
    heading specified by the user.  
    */
    function CreateWeatherJson(json) {
    var newJson = "";
    for (i = 0; i < json.list.length; i++) {
    //cityId = json.list[i].id;
    cityName = json.list[i].name;
    temp = Math.round(json.list[i].main.temp);
    pressure = json.list[i].main.pressure
    humidity = json.list[i].main.humidity
    tempmin = Math.round(json.list[i].main.temp_min)
    tempmax = Math.round(json.list[i].main.temp_max)
    newJson = newJson + "{";
    //newJson = newJson + "\"cityId\"" + ": " + cityId + ","
    newJson = newJson + "\"cityName\"" + ": " + "\"" + cityName + "\"" + ","
    newJson = newJson + "\"temp\"" + ": " + temp + ","
    newJson = newJson + "\"pressure\"" + ": " + humidity + ","
    newJson = newJson + "\"humidity\"" + ": " + pressure + ","
    newJson = newJson + "\"tempMin\"" + ": " + tempmin + ","
    newJson = newJson + "\"tempMax\"" + ": " + tempmax
    newJson = newJson + "},";
    }
    return "[" + newJson.slice(0, newJson.length - 1) + "]"
};

// $(function() {
//     $("#weatherTable").tableShrinker();
// }); 