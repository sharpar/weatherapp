//Weather App JS File

/*jslint browser: true*/
/*global $, jQuery, alert*/

function getLocation() {
    'use strict';

    var output = document.getElementById("demo");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude,
            longitude = position.coords.longitude,
            img = new Image(),
            appid = "&APPID=c0e613d7638b0b5e8fc7d54e1d673a86",
            apiURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + (latitude).toString() + "&lon=" + (longitude).toString() + "&units=metric" + appid;

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

        output.appendChild(img);
        console.log(apiURL);
        console.log("api.openweathermap.org/data/2.5/weather?lat=35&lon=139");

        $.get(apiURL, function (weather) {
            //var windDir = convertWindDirection(weather.wind.deg);
            var temperature = weather.main.temp;
            temperature = parseFloat((temperature).toFixed(0));
            console.log(temperature);
            //var unitLabel;

            //temperature = parseFloat((temperature).toFixed(1));

            console.log(weather);

        }, "jsonp");


    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);

}


$(document).ready(function () {
    'use strict';
    getLocation();

});