//Weather App JS File

/*jslint browser: true*/
/*global $, jQuery, alert*/
/*jslint devel: true */

var unit = "si";

function toTitleCase(str) {
    'use strict';
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

}

function removeDec(num) {
    'use strict';
    return parseFloat((num).toFixed(0));
}

function getLocation(unit) {
    'use strict';

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
            forecast = "http://crossorigin.me/https://api.forecast.io/forecast/de58b48418b7a1930004d32486ff7c93/" + (latitude).toString() + "," + (longitude).toString() + "?units=" + unit;
        console.log(unit);
        //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=400x200&sensor=false";

        //output.appendChild(img);

        $.getJSON(forecast, function (data) {
            console.log(data);
            console.log(data.timezone);

            var city = data.timezone.substr(data.timezone.indexOf("/") + 1).replace("-", " "),
                temperature = data.currently.temperature,
                feels = data.currently.apparentTemperature,
                conditions = toTitleCase(data.currently.summary),
                icon = $('#icon'),
                dataicon = data.daily.icon;


            console.log(icon.attr("data-icon"));


            $('h1').html(city);

            switch (dataicon) {
            case "clear-day":
                icon.attr("data-icon", "B");
                icon.css("color", "#ffff66");
                break;
            case "clear-night":
                icon.attr("data-icon", "C");
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

            console.log(icon.attr("data-icon"));

            //if (conditions === "Clear")

            $('#minmax').html(removeDec(data.daily.data[0].temperatureMax) + "\xB0 | " + removeDec(data.daily.data[0].temperatureMin) + "\xB0");
            if (unit == "si") {
                $('#temp').html(removeDec(temperature) + "\xB0 C" + '<span id="convert"> F</span>');
                $('#feelslike').html("Feels like " + removeDec(feels) + "\xB0 C");
            } else {
                $('#temp').html(removeDec(temperature) + "\xB0 F" + '<span id="convert"> C</span>');
                $('#feelslike').html("Feels like " + removeDec(feels) + "\xB0 F");
            }
            $('#conditions').html(conditions);
            $('#humidity').html("Humidity - " + (data.currently.humidity * 100) + "%");

        });

    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    navigator.geolocation.getCurrentPosition(success, error);

}


$(document).ready(function () {
    'use strict';

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