const apiKey = '9e9e4eefc93b5af91c70bd666c346dc8';
const apiURI = 'http://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&units=metric&appid=';

var request = require('request');
var weatherURI = apiURI + apiKey;
request(weatherURI, function(error, response, data) {
    if (error) {
        throw error;
    }
    //console.log(response);
    //console.log(data);
    //console.log(typeof data);
    var result = JSON.parse(data);
    //console.log(result);
    /* for (var item in result) {
        console.log(item.toString(), result[item]);
    } */
    let summary = `도시명: ${result.name}, 기온: ${result.main.temp} &deg; 체감: ${result.main.feels_like} &deg;`;
    let icon = `<img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" height="50" width="50">`;
    console.log(summary);
    console.log(icon);
});
