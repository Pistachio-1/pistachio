//opening text animation

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight) + "px";
}


//to do adding/subtracting


$(".dayOneButton").click(function () {
    event.preventDefault();
    var dayOneTask = $("#dayOneInput").val().trim();
    $("#dayOneInput").val("");
    $("#dayOneList").append("<span><br><button class='toDoButton'>✓</button>" + " " + dayOneTask + "</span");
    $(".toDoButton").click(function () {
        $(this).parent().remove();
    });
});

$(".dayTwoButton").click(function () {
    event.preventDefault();
    var dayTwoTask = $("#dayTwoInput").val().trim();
    $("#dayTwoInput").val("");
    $("#dayTwoList").append("<span><br><button class='toDoButton'>✓</button>" + " " + dayTwoTask + "</span>");
    $(".toDoButton").click(function () {
        $(this).parent().remove();
    });
});

$(".dayThreeButton").click(function () {
    event.preventDefault();
    var dayThreeTask = $("#dayThreeInput").val().trim();
    $("#dayThreeInput").val("");
    $("#dayThreeList").append("<span><br><button class='toDoButton'>✓</button>" + " " + dayThreeTask + "</span>");
    $(".toDoButton").click(function () {
        $(this).parent().remove();
    });
});

$(".dayFourButton").click(function () {
    event.preventDefault();
    var dayFourTask = $("#dayFourInput").val().trim();
    $("#dayFourInput").val("");
    $("#dayFourList").append("<span><br><button class='toDoButton'>✓</button>" + " " + dayFourTask + "</span>");
    $(".toDoButton").click(function () {
        $(this).parent().remove();
    });
});

$(".dayFiveButton").click(function () {
    event.preventDefault();
    var dayFiveTask = $("#dayFiveInput").val().trim();
    $("#dayFiveInput").val("");
    $("#dayFiveList").append("<span><br><button class='toDoButton'>✓</button>" + " " + dayFiveTask + "</span>");
    $(".toDoButton").click(function () {
        $(this).parent().remove();
    });
});


// get the nearest major airport for the city. this requires
// daisy chaining some api calls
var cityGeoLocation = '';
var cityAirportInfo = '';
var airportInfo = '';
var airportLat = '';
var airportLon = '';

// first get city lat/lon.
cityGeoLocation = new CityLocation('San Francisco');
setTimeout(function () {
    var cityInfo = cityGeoLocation.responseJSON;
    // console.log(cityAirportInfo);
    airportLat = cityInfo.lat;
    airportLon = cityInfo.lon;
    // console.log(airportLat, airportLon);

    // get the nearest major airport to that city. We want the IATA code.
    var nearestAirport = '';
    var iataCode = '';
    nearestAirport = new GetNearestAirport(airportLat, airportLon);
    setTimeout(function () {
        console.log(nearestAirport.responseJSON);
        iataCode = nearestAirport.responseJSON.code;
        console.log(iataCode);
    }, 500);

}, 2000);

airportInfo = new AirportInfo('SFO');
setTimeout(function () {
    var resp = airportInfo.respJSON;
    var delay = resp.name + ' ';
    if (resp.delay) {
        if (resp.status.avgDelay.length > 0) {
            delay += 'average delay ' + resp.status.avgDelay
                + ' reason ' + resp.status.reason;
        } else {
            delay += 'min. delay ' + resp.status.minDelay
                + ' max. delay ' + resp.status.maxDelay
                + ' reason ' + resp.status.reason;
        }
    } else {
        delay += 'no delays';
    };
    $("#airport").text(delay);
}, 1200);

