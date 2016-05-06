//Weather App JS File

/*jslint browser: true*/
/*global $, jQuery, alert*/

var x = document.getElementById("demo");

function showPosition(position) {
    'use strict';
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

function getLocation() {
    'use strict';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


$(document).ready(function () {
    'use strict';

    $("#getlocation").on('click', function () {
        getLocation();

    });

});