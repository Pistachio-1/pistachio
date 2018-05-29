// contains functions to work with aviation edge apis

var AEURL = 'https://aviation-edge.com/api/public/timetable?';
var AEKEY = '8ab3ab-ceccc5-6b1b2c-8ca17c-7835cf';
var queryParams = {
    key: AEKEY
};

function makeAEQueryString(code, type) {
    qparams = queryParams;
    qparams.iataCode = code;
    qparams.type = type;
    return AEURL + $.param(queryParams);
}

function getTimeTable(code, type) {
    qstring = makeAEQueryString(code, type);

    return $.get(qstring)
        .done(function (resp) {
            // console.log(resp);
        });
}

// a lot of info can come from this api. We limit ourselves to the first
// 10 arrivals and departures that are "status" : "scheduled"
function selectTableEntries(resp, cnt) {
    var selections = [];

    jsonTimeTable = JSON.parse(resp);

    for (let i = 0; i < cnt;) {
        if (jsonTimeTable[i].status === 'scheduled') {
            selections.push(jsonTimeTable[i]);
            ++i;
        }
    }
    return selections;
}