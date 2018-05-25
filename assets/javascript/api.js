var WUAPIKEY = 'e04dc2a2ae502b3bb7f9ee699ba2a841';
var WUURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?';

var WUFORECASTPARMS = {
    appid: WUAPIKEY,
    cnt: 5
}

function makeQueryString(url, params) {
    return url + $.param(params);
}


function getForecastByLatLon(lat, lon) {
    var qparams = WUFORECASTPARMS;
    qparams.lat = lat;
    qparams.lon = lon;
    var qstring = makeQueryString(WUURL, qparams);

    $.ajax({
        url: qstring,
        method: 'GET'
    }).then(function(resp) {
        console.log(resp);
    });
}

function getForecastByCity(city) {
    var qparams = WUFORECASTPARMS;
    qparams.q = city;
    var qstring = makeQueryString(WUURL, qparams);

    $.ajax({
        url: qstring,
        method: 'GET'
    }).then(function(resp) {
        console.log(resp);
    });
}

// test stuff remove later
var lon = -117.8282121;
var lat = 33.658895099999995;
 
resp = getForecastByLatLon(lat, lon);
resp = getForecastByCity('Milan');


function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

