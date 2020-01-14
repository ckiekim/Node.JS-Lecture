module.exports = {
    apiKey: '9e9e4eefc93b5af91c70bd666c346dc8',
    apiURI: 'http://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&units=metric&appid=',

    getWeather: function(callback) {
        var request = require('request');
        var weatherURI = this.apiURI + this.apiKey;
        request(weatherURI, function(error, response, data) {
            if (error) {
                throw error;
            }
            var result = JSON.parse(data);
            let weatherInfo = `도시명: ${result.name}, 기온: ${result.main.temp.toFixed(1)}&deg;, 체감: ${result.main.feels_like.toFixed(1)}&deg; `;
            weatherInfo += `<img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" height="30" width="30">`;
            callback(weatherInfo);
        });
    }
}
