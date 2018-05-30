var lon = -117.8282121;
var lat = 33.658895099999995;

// var resp1 = getForecastByLatLon(lat, lon).done(function(resp) {return resp;});
// var resp2 = getForecastByCity('New York').done(function(resp) {return resp;});

// setTimeout(function() {
//     console.log(resp1.responseJSON);
//     console.log(resp2.responseJSON);
// },3000 );


// var resp1 = getCityGeolocation('Augusta', 'Maine').done(function(resp) {return resp;});
// var resp2 = getCityGeolocation('Augusta').done(function(resp) {return resp;});
// var resp3 = getCityGeolocation().done(function(resp) {return resp;});  // throws exception

// setTimeout(function() {
//     console.log(resp1.responseJSON);
//     console.log(resp2.responseJSON);
// },3000 );

// var aeroResp;
// getNearestAirport(lat, lon)
//     .done(function(resp) {
//         console.log(resp);
//         var cleanResp =  cleanAeroResponse(resp);
//         aeroResp = {'code': cleanResp.airports[0].code,
//                     'name': cleanResp.airports[0].name,
//                     'city': cleanResp.airports[0].city
//         };
//         console.log(aeroResp);
//     });

// setTimeout(function() {
//     console.log(aeroResp);
// },1000);

// var faaResp;
// getAirportInfo('LAX')
//     .done(function (resp) {
//         console.log(resp);
//         faaResp = resp;
//     });

// setTimeout(function () {
//     console.log(faaResp);
// }, 500);

// console.log(makeAEQueryString('SNA', 'arrival'));

// var departures = '';
// getTimeTable('ONT', 'departure')
//     .done(function(resp) {
//         departures = resp;
//     });

// var arrivals ='';
// getTimeTable('ONT', 'arrival')
//     .done(function(resp) {
//         arrivals = resp;
//     });

// setTimeout(function () {
//     console.log(selectTableEntries(departures, 10));
//     console.log(selectTableEntries(arrivals, 10));
// }, 2500);

// var departures = new TimeTable('ONT', 'departure');
// var arrivals = new TimeTable('ONT', 'arrival');

// setTimeout(function () {
//     console.log(departures.selections);
//     console.log(arrivals.selections);
// }, 500);

var forecast1 = new WeatherForecast();
var resp1 = forecast1.getForecastByCity('New York');
var forecast2 = new WeatherForecast()
var resp2 = forecast2.getForecastByLatLon(lat, lon);

setTimeout(function() {
    console.log(resp1.responseJSON);
    console.log(resp2.responseJSON);
},1500 );

// var resp1 = new CityLocation('Paris');
// var resp2 = new CityLocation('Augusta', 'Maine');

// setTimeout(function() {
//     console.log(resp1);
//     console.log(resp1.jsonResp);
//     console.log(resp2.jsonResp);
// },1000 );

// var airport = '';
// airport = new GetNearestAirport(lat, lon);
// setTimeout(function() {
//     console.log(airport.jsonResp);
// },2000 );

// var airportInfo = new AirportInfo('SNA');
// setTimeout(function() {
//     console.log(airportInfo.jsonResp);
// },1000);