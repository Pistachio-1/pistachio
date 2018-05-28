/* Functions to return city informaiton and weather forecasts. Functions using Ajax should be called with the done
    method and may optionally be called with the fail method chained to them.
    i.e. getForecastByCity('New York').done(function(resp) {console.log(resp)}).fail(function() {console.log("something went wrong")});

    Here is an example of how to return values
    var lon = -117.8282121;
    var lat = 33.658895099999995;

    var resp1 = getForecastByLatLon(lat, lon).done(function(resp) {return resp;});
    var resp2 = getForecastByCity('New York').done(function(resp) {return resp;});

    // now wait 3 seconds for the async calls to complete
    setTimeout(function() {
        console.log(resp1.responseJSON);
        console.log(resp2.responseJSON);
    },3000 );
*/

var WUAPIKEY = 'e04dc2a2ae502b3bb7f9ee699ba2a841';
var WUURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?';

var WUFORECASTPARMS = {
    appid: WUAPIKEY,
    cnt: 5
}

function makeQueryString(url, params) {
    return url + $.param(params);
}


function getForecastByLatLon(lat, lon, func) {
    var qparams = WUFORECASTPARMS;
    qparams.lat = lat;
    qparams.lon = lon;
    var qstring = makeQueryString(WUURL, qparams);

   return $.get(qstring);
}

var getForecastByCity = function(city) {
    var qparams = WUFORECASTPARMS;
    qparams.q = city;
    var qstring = makeQueryString(WUURL, qparams);
    var resp ='';

    return $.get(qstring);
}

/* 
 *   Geolocation functions
 */

var GOOGLEAPIKEY = 'AIzaSyA7fYWzc8eCBfNRbGVQ5V__CadS5B939_s';
var GOOGLEURL = 'https://maps.googleapis.com/maps/api/geocode/json?';

var GOOGLEAPIPARAMS = {
    key: GOOGLEAPIKEY,
    address: ''
}

/* get the lat/lon for a city. City name is required. State/Province is optional but results will be better with it
 *   The calls below will return different locations for Augusta Maine and Augusta Georgia
 *   var resp1 = getCityGeolocation('Augusta', 'Maine').done(function(resp) {return resp;});
 *   var resp2 = getCityGeolocation('Augusta').done(function(resp) {return resp;});
 */
function getCityGeolocation(city, st) {
    var qstring = GOOGLEAPIPARAMS;

    if (arguments.length === 2) {
        qstring.address = city + '+' + st;
    } else if (arguments.length === 1) {
        qstring.address = city;
    } else {
        throw 'Invalid number of arguments';
    }

    var qstring = makeQueryString(GOOGLEURL, qstring);
    console.log(qstring);
    return $.get(qstring);
}

/*
 * get the nearest airport to a given lat/lon.
*/
var AEROAPIKEY = 'be776e50de631b22ee12cb993e1f06bf';
var AEROURL = 'https://airport.api.aero/airport/nearest/';

function getNearestAirport(lat,lon) {
    if (arguments.length != 2) {
        throw 'Invalid number of arguments';
    }
    // aero accept lat/lon in url, not in query parameters
    var qstring = AEROURL + lat + '/' + lon + '?user_key=' + AEROAPIKEY;
    return $.get(qstring)
        .done(function(resp) {
            // done is empty. another done block will be chained by the caller
        });
}

// the aero json isn't json. It needs to be cleaned up
function cleanAeroResponse(resp) {
    console.log(resp);
    var respString = JSON.parse(JSON.stringify(resp.trim()));
    respString = respString.substr(9);
    respString = respString.substr(0, respString.length-1);
    console.log(respString);
    jsonResp = JSON.parse(respString);
    console.log(jsonResp);
    return jsonResp;
}

/*
 * Get airport info from the FAA
 * for airport status: https://services.faa.gov/airport/status/sfo?format=application/json
 */
var FAAURL = 'https://services.faa.gov/airport/status/';
var FAAFORMAT = '?format=application/json';

// get current airport info from the FAA using iata code (i.e. LAX)
function getAirportInfo(code) {
    var qstring = FAAURL + code + FAAFORMAT;
    return $.get(qstring);
}

// keep this
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

