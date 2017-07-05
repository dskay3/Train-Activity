// Initialize Firebase
var config = {
    apiKey: "AIzaSyDGPV_2V0cMf8EQbXr2-cw2-SLbT4djRaY",
    authDomain: "uncbootcamp-train-scheduler.firebaseapp.com",
    databaseURL: "https://uncbootcamp-train-scheduler.firebaseio.com",
    projectId: "uncbootcamp-train-scheduler",
    storageBucket: "",
    messagingSenderId: "1011696375884"
};
firebase.initializeApp(config);

// Reference to the database service
var database = firebase.database();

// Initial values
var trainName = "";
var trainDest = "";
var trainTime = "";
var trainFreq = 0;

$("#add-train-data").on("click", function (event) {
    event.preventDefault();

    // Grabs values from textboxes
    trainName = $("#train-name").val().trim();
    trainDest = $("#train-destination").val().trim();
    trainTime = $("#train-time").val().trim();
    trainFreq = $("#train-freq").val().trim();

    // Code for handling the push
    database.ref().push ({
        trainName: trainName,
        trainDest: trainDest,
        trainTime: trainTime,
        trainFreq: trainFreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
})

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().trainDest);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().trainFreq);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot){
    var trainData = $("<td>");
    $("#trainData").append(trainData);
})