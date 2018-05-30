/* Functions to return city informaiton and weather forecasts. Functions using Ajax should be called with the done
    method and may optionally be called with the fail method chained to them.
    i.e. getForecastByCity('New York').done(function(resp) {console.log(resp)}).fail(function() {console.log("something went wrong")});

    Here is an example of how to return values
    var lon = -117.8282121;
    var lat = 33.658895099999995;

    var resp1 = getForecastByLatLon(lat, lon);
    var resp2 = getForecastByCity('New York');

    // now wait 3 seconds for the async calls to complete
    setTimeout(function() {
        console.log(resp1.responseJSON);
        console.log(resp2.responseJSON);
    },3000 );
*/

function WeatherForecast() {
    this.OWAPIKEY = 'e04dc2a2ae502b3bb7f9ee699ba2a841';
    this.OWURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?';

    this.OWFORECASTPARMS = {
        appid: this.OWAPIKEY,
        cnt: 5
    };

    this.makeQueryString = function (params) {
        return this.OWURL + $.param(params);
    };

    this.getForecastByLatLon = function (lat, lon) {
        var qparams = this.OWFORECASTPARMS;
        qparams.lat = lat;
        qparams.lon = lon;
        var qstring = this.makeQueryString(qparams);

        return $.get(qstring);
    };

    this.getForecastByCity = function (city) {
        var qparams = this.OWFORECASTPARMS;
        qparams.q = city;
        var qstring = this.makeQueryString(qparams);

        return $.get(qstring);
    }
}

/* 
 * get the lat/lon for a city. City name is required. State/Province is optional but results will be better with it
 *   The calls below will return different locations for Augusta Maine and Augusta Georgia
 *   var resp1 = getCityGeolocation('Augusta', 'Maine');
 *   var resp2 = getCityGeolocation('Augusta'));
 */
function CityLocation(city, st) {
    var GOOGLEAPIKEY = 'AIzaSyA7fYWzc8eCBfNRbGVQ5V__CadS5B939_s';
    var GOOGLEURL = 'https://maps.googleapis.com/maps/api/geocode/json?';

    var GOOGLEAPIPARAMS = {
        key: GOOGLEAPIKEY,
        address: ''
    }

    this.qstring = GOOGLEAPIPARAMS;
    this.cityLocation = {};

    this.makeQueryString = function (url, params) {
        return url + $.param(params);
    };

    this.getCityLocation = function (url, params, citylocation) {
        var qstring = this.makeQueryString(url, params);

        return $.get(qstring)
            .done(function (resp) {
                var components = resp.results[0].address_components[0];
                var location = resp.results[0].geometry.location;
                citylocation.city = components.short_name;
                citylocation.address = resp.results[0].formatted_address;
                citylocation.lat = location.lat;
                citylocation.lon = location.lng;
            }).fail(function (resp) {
                console.log('CityLocation lookup failed');
            });
    };

    if (arguments.length === 2) {
        this.qstring.address = city + '+' + st;
    } else if (arguments.length === 1) {
        this.qstring.address = city;
    } else {
        throw 'Invalid number of arguments';
    }

    this.getCityLocation(GOOGLEURL, this.qstring, this.cityLocation);
}

/*
 * get the nearest airport to a given lat/lon.
*/

function GetNearestAirport(lat, lon) {
    this.AEROAPIKEY = 'be776e50de631b22ee12cb993e1f06bf';
    this.AEROURL = 'https://airport.api.aero/airport/nearest/';
    this.jsonResp = {};

    this.getNearestAirport = function (lat, lon, nearestairport) {
        // aero accept lat/lon in url, not in query parameters
        var qstring = this.AEROURL + lat + '/' + lon + '?user_key=' + this.AEROAPIKEY;
        return $.get(qstring)
            .done(function (resp) {
                console.log(nearestairport);
                // the returned json isn't is really javascript so the
                // next few lines edit it so it can be parsed as json
                var respString = JSON.parse(JSON.stringify(resp.trim()));
                console.log(respString);
                respString = respString.substr(9);
                respString = respString.substr(0, respString.length - 1);
                console.log(respString);
                var parsedJSON = JSON.parse(respString);

                // resp parsed, copy it to our response object
                var airport = parsedJSON.airports[0];
                console.log(airport);
                nearestairport.city     = airport.city;
                nearestairport.code     = airport.code;
                nearestairport.country  = airport.country;
                nearestairport.lat      = airport.lat;
                nearestairport.lng      = airport.lng;
                nearestairport.name     = airport.name;
                nearestairport.timezone = airport.timezone
                console.log(nearestairport);
            })
            .fail(function (resp) {
                console.log('Nearest Airport lookup failed');
            });
    };

    if (arguments.length != 2) {
        throw 'Invalid number of arguments';
    }
    this.getNearestAirport(lat, lon, this.jsonResp);
}

/*
 * Get airport info from the FAA
 * for airport status: https://services.faa.gov/airport/status/sfo?format=application/json
 * Construct with var airportData = new AirportInfo('SFO');
 * Then extract with airportData.airportInfo.
 */

function AirportInfo(code) {
    this.FAAURL = 'https://services.faa.gov/airport/status/';
    this.FAAFORMAT = '?format=application/json';
    this.jsonResp = {};

    // get current airport info from the FAA using iata code (i.e. LAX)
    this.getAirportInfo = function(code, returnedJSON) {
        var qstring = this.FAAURL + code + this.FAAFORMAT;
        return $.get(qstring)
            .done(function(resp) {
                returnedJSON.IATA   = resp.IATA;
                returnedJSON.IACO   = resp.IACO;
                returnedJSON.city   = resp.city;
                returnedJSON.delay  = resp.delay;
                returnedJSON.state  = resp.state;
                returnedJSON.name   = resp.name;
                returnedJSON.status = resp.status;
                returnedJSON.weather = resp.weather;
            })
            .fail(function (resp) {
                console.log("GetAirportInfo failed.")
            });
    };

    this.getAirportInfo(code, this.jsonResp);
}


// keep this
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight) + "px";
}

