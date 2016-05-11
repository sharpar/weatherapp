//Weather App JS File

/*jslint browser: true*/
/*global $, jQuery, alert*/
/*jslint devel: true */


function toTitleCase(str) {
    'use strict';
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

}

function getLocation() {
    'use strict';

    var output = document.getElementById("demo");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function convertWindDirection(dir) {
        var rose = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
            eightPoint = Math.floor(dir / 45);
        return rose[eightPoint];
    }

    function success(position) {
        var latitude = position.coords.latitude,
            longitude = position.coords.longitude,
            img = new Image(),
            appid = "&APPID=c0e613d7638b0b5e8fc7d54e1d673a86",
            //apiURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + (latitude).toString() + "&lon=" + (longitude).toString() + "&units=metric" + appid,
            forecast = "http://crossorigin.me/https://api.forecast.io/forecast/de58b48418b7a1930004d32486ff7c93/" + (latitude).toString() + "," + (longitude).toString() + "?units=si";

        //output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=400x200&sensor=false";

        output.appendChild(img);
        console.log("api.openweathermap.org/data/2.5/weather?lat=35&lon=139");

        $.getJSON(forecast, function (data) {
            console.log(data);
            console.log(data.timezone);

            var city = data.timezone.substr(data.timezone.indexOf("/") + 1).replace("-", " "),
                temperature = data.currently.temperature,
                feels = data.currently.apparentTemperature;

            temperature = parseFloat((temperature).toFixed(0));
            feels = parseFloat((feels).toFixed(0));

            console.log(temperature);

            $('h1').append(city);
            $('#temp').append(temperature + " C" + '\xB0');
            $('#feelslike').append("Feels like " + feels + " C" + '\xB0');
            $('#conditions').append(toTitleCase(data.currently.summary));
            $('#humidity').append("Humidity: " + (data.currently.humidity * 100) + "%");

        });

        /*$.get(apiURL, function (weather) {
            var windDir = convertWindDirection(weather.wind.deg),
                temperature = weather.main.temp,
                unitLabel;

            temperature = parseFloat((temperature).toFixed(0));
            console.log(temperature);

            console.log(weather);

            $('#wind').append(windDir + " " + weather.wind.speed + " knots");

        }, "jsonp");*/


    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    navigator.geolocation.getCurrentPosition(success, error);

}


$(document).ready(function () {
    'use strict';
    getLocation();

});