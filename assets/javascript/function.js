var config = {
    apiKey: "AIzaSyDzhsEFNzXjQ0YhOkdS3YWIdzrxOG4HHX0",
    authDomain: "pistachio-4a3df.firebaseapp.com",
    databaseURL: "https://pistachio-4a3df.firebaseio.com",
    projectId: "pistachio-4a3df",
    storageBucket: "pistachio-4a3df.appspot.com",
    messagingSenderId: "1062361334522"
  };
    firebase.initializeApp(config);

var database = firebase.database();

//grabbing input and then uploading to firebase
$("#submitInfo-btn").on("click",function(event){
    event.preventDefault();
    var name = $("#name-input").val().trim();
    var location = $("#Location-input").val().trim();
    var departing = $("#departing-input").val().trim();
    var returning = $("#returning-input").val().trim();

    var key = {
        name: name,
        location: location,
        departing: departing,
        returning: returning,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    database.ref().push(key);

    console.log(key.name);
    console.log(key.location);
    console.log(key.departing);
    console.log(key.returning);

//clears the inputs - might not need it if changes the page
    $("#name-input").val("")
    $("#Location-input").val("")
    $("#departing-input").val("")
    $("#returning-input").val("")
});

//grabbing data from firebase and then appending to agenda html
database.ref().on("child_added", function(snapshot) {
    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var location = childSnapshot.val().location;
    var departing = childSnapshot.val().departing;
    var returning = childSnapshot.val().returning;

    $("#name").append(name + "'s")
    $("#city").append(location + "agenda")
    $("#departing").append(departing)
    $("#returning").append(returning)

});


// function addInput(){
    //adding into agenda.html//

    // $("").append(name)
    // $("").append(location)
    // $("").append(departing)
    // $("").append(returning)
// };

// function addItinerary() {}
