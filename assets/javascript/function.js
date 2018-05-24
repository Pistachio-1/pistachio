var config = {
    apiKey: "AIzaSyDzhsEFNzXjQ0YhOkdS3YWIdzrxOG4HHX0",
    authDomain: "pistachio-4a3df.firebaseapp.com",
    databaseURL: "https://pistachio-4a3df.firebaseio.com",
    projectId: "pistachio-4a3df",
    storageBucket: "",
    messagingSenderId: "1062361334522"
  };
firebase.initializeApp(config);
var database = firebase.database();

var name = [];
var location = [];
var departing = [];
var returning = [];
var firebasekey = [];

$(".btn").on("click",function(event){
    event.preventDefault();
    var key = database.ref().push({
        name: name,
        location: location,
        departing: departing,
        returning: returning,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    firebasekey.push(key);
    localStorage.clear();
    localStorage.setItem(name, key)
});

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().location);
    console.log(snapshot.val().departing);
    console.log(snapshot.val().returning);
});

function addInput(){
    //adding into agenda.html//
    name = $("#name").val().trim();
    location = $('#city').val().trim();
    deaprting = $('#departing').val().trim();
    returning = $('#returning').val().trim();

    $("").append(name)
    $("").append(location)
    $("").append(departing)
    $("").append(returning)
}

function addItinerary() {
    
}