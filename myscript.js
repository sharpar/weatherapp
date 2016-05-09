//Weather App JS File

/*jslint browser: true*/
/*global $, jQuery, alert*/

function toTitleCase(str) {
    'use strict';
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/*var geocoder;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction() {
    alert("Geocoder failed");
}

function initialize() {
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
        'latLng': latlng
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[1]) {
                //formatted address
                alert(results[0].formatted_address)
                    //find country name
                for (var i = 0; i < results[0].address_components.length; i++) {
                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            city = results[0].address_components[i];
                            break;
                        }
                    }
                }
                //city data
                alert(city.short_name + " " + city.long_name)


            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}
*/

function displayLocation(latitude, longitude) {
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
            console.log(address.formatted_address);
        }
    };
    request.send();
};

var successCallback = function (position) {
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    displayLocation(x, y);
};

var errorCallback = function (error) {
    var errorMessage = 'Unknown error';
    switch (error.code) {
    case 1:
        errorMessage = 'Permission denied';
        break;
    case 2:
        errorMessage = 'Position unavailable';
        break;
    case 3:
        errorMessage = 'Timeout';
        break;
    }
    document.write(errorMessage);
};

var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

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

        //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

        //output.appendChild(img);
        console.log(apiURL);
        console.log("api.openweathermap.org/data/2.5/weather?lat=35&lon=139");

        $.get(apiURL, function (weather) {
            var windDir = convertWindDirection(weather.wind.deg),
                temperature = weather.main.temp,
                unitLabel;

            temperature = parseFloat((temperature).toFixed(0));
            console.log(temperature);

            console.log(weather);

            $('.location').append(weather.name + ", " + weather.sys.country);
            $('#conditions').append(toTitleCase(weather.weather[0].description));
            $('#humidity').append("Humidity: " + weather.main.humidity + "%");
            $('#wind').append(windDir + " " + weather.wind.speed + " knots");

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
    //initialize();
    getLocation();

});