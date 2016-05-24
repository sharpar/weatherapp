//Weather App JS File

/*jslint browser: true*/
/*global $, jQuery, alert*/
/*jslint devel: true */

var unit = "si";

function removeDec(num) {
    'use strict';
    return parseFloat((num).toFixed(0));
}

function getLocation(unit) {
    'use strict';

    if (!navigator.geolocation) {
        $('#minmax').html("Geolocation is not supported by your browser");
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude,
            longitude = position.coords.longitude,
            //img = new Image(),
            forecast = "http://crossorigin.me/https://api.forecast.io/forecast/de58b48418b7a1930004d32486ff7c93/" + (latitude).toString() + "," + (longitude).toString() + "?units=" + unit;

        //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=400x200&sensor=false";

        $.getJSON(forecast, function (data) {

            var city = data.timezone.substr(data.timezone.indexOf("/") + 1).replace("-", " "),
                temperature = data.currently.temperature,
                feels = data.currently.apparentTemperature,
                icon = $('#icon');

            console.log(data);

            $('h1').html(city);

            switch (data.currently.icon) {
            case "clear-day":
                icon.attr("data-icon", "B");
                icon.css("color", "#ffff66");
                break;
            case "clear-night":
                icon.attr("data-icon", "C");
                icon.css("color", "#bdc3c7");
                break;
            case "rain":
                icon.attr("data-icon", "R");
                icon.css("color", "#1aa3ff");
                break;
            case "snow":
                icon.attr("data-icon", "V");
                icon.css("color", "#cceeff");
                break;
            case "sleet":
                icon.attr("data-icon", "W");
                break;
            case "wind":
                icon.attr("data-icon", "F");
                break;
            case "fog":
                icon.attr("data-icon", "L");
                icon.css("color", "#e6e6e6");
                break;
            case "cloudy":
                icon.attr("data-icon", "Y");
                break;
            case "partly-cloudy-day":
                icon.attr("data-icon", "H");
                icon.css("color", "#ffffcc");
                break;
            case "partly-cloudy-night":
                icon.attr("data-icon", "I");
                break;
            case "hail":
                icon.attr("data-icon", "X");
                break;
            case "thunderstorm":
                icon.attr("data-icon", "0");
                icon.css("color", "#d9d9d9");
                break;
            case "tornado":
                icon.attr("data-icon", "T");
                break;
            default:
                icon.attr("data-icon", "");
            }

            $('#minmax').html(removeDec(data.daily.data[0].temperatureMax) + "\xB0 | " + removeDec(data.daily.data[0].temperatureMin) + "\xB0");
            if (unit === "si") {
                $('#temp').html(removeDec(temperature) + "\xB0 C" + '<span id="convert"> F</span>');
            } else {
                $('#temp').html(removeDec(temperature) + "\xB0 F" + '<span id="convert"> C</span>');
            }
            $('#feelslike').html("Feels like " + removeDec(feels) + "\xB0");
            $('#conditions').html(data.currently.summary.replace('-', ' '));
            $('#humidity').html("Humidity: " + (removeDec(data.currently.humidity * 100)) + "%");

        });

    }

    function error() {
        $('#minmax').html("Unable to retrieve your location");
    }

    navigator.geolocation.getCurrentPosition(success, error);
}


$(document).ready(function () {
    'use strict';

    $('#minmax').html("Loading...");

    getLocation("si");

    $("#temp").on('click', function () {
        if (unit === "si") {
            unit = "us";
            getLocation("us");
        } else {
            unit = "si";
            getLocation("si");
        }
    });

});