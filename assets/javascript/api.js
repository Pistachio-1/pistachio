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

    $.ajax({
        url: qstring,
        method: 'GET'
    }).then(function(resp) {
        // console.log(resp);
        func(resp);
    });
}

var getForecastByCity = function(city, func) {
    var qparams = WUFORECASTPARMS;
    qparams.q = city;
    var qstring = makeQueryString(WUURL, qparams);
    var resp ='';

    $.ajax({
        url: qstring,
        method: 'GET'
    }).then(function(r) {
        // console.log(r);
        func(r);
    });
}

// test stuff remove later
var lon = -117.8282121;
var lat = 33.658895099999995;

var resp='';
getForecastByLatLon(lat, lon, function(resp) {
    console.log(resp);
});

getForecastByCity('New York', function(resp) {
    console.log(resp);
});

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

