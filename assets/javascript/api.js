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

// test stuff remove later
// var lon = -117.8282121;
// var lat = 33.658895099999995;

// var resp1 = getForecastByLatLon(lat, lon).done(function(resp) {return resp;});
// var resp2 = getForecastByCity('New York').done(function(resp) {return resp;});

// setTimeout(function() {
//     console.log(resp1.responseJSON);
//     console.log(resp2.responseJSON);
// },3000 );



// keep this
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

