//Weather App JS File

/*jslint browser: true*/
/*global $, jQuery, alert*/

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
            apiURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + (latitude).toString() + "&lon=" + (longitude).toString() + "&units=metric" + appid;

        //output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=400x200&sensor=false";

        output.appendChild(img);
        console.log(apiURL);
        console.log("api.openweathermap.org/data/2.5/weather?lat=35&lon=139");

        $.get(apiURL, function (weather) {
            var windDir = convertWindDirection(weather.wind.deg),
                temperature = weather.main.temp,
                unitLabel;

            temperature = parseFloat((temperature).toFixed(0));
            console.log(temperature);

            console.log(weather);

            $('h1').append(weather.name + ", " + weather.sys.country);
            $('#temp').append(temperature + " C");
            $('#conditions').append(toTitleCase(weather.weather[0].description));
            $('#humidity').append("Humidity: " + weather.main.humidity + "%");
            $('#wind').append(windDir + " " + weather.wind.speed + " knots");

        }, "jsonp");


    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    navigator.geolocation.getCurrentPosition(success, error);

}


$(document).ready(function () {
    'use strict';
    //initialize();
    getLocation();

});