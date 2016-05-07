//Weather App JS File

/*jslint browser: true*/
/*global $, jQuery, alert*/

function getLocation() {
    'use strict';
    $.get("http://ipinfo.io", function (location) {
        console.log(location);

        $('.location')
            .append(location.city + ", ")
            .append(location.region);

        //var units = getUnits(location.country);
        //getWeather(location.loc, units);

        //return weather;

    }, "jsonp");

}


$(document).ready(function () {
    'use strict';

    getLocation();

});