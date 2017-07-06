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
var currentTime = "";
var trainName = "";
var trainDest = "";
var trainTime = "";
var trainFreq = 0;
var timeDiff = 0;
var timeRemainder = 0;
var nextArrival = 0;
var minAway = 0;
var newTrain = {
    name: trainName,
    dest: trainDest,
    freq: trainFreq,
    firstTrain: trainTime,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
}

$("#add-train-data").on("click", function (event) {
    event.preventDefault();

    // Grabs values from textboxes
    newTrain.name = $("#train-name").val().trim();
    newTrain.dest = $("#train-destination").val().trim();
    newTrain.firstTrain = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm");
    newTrain.freq = $("#train-freq").val().trim();

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.firstTrain);
    console.log(newTrain.freq);

    // Code for handling the push
    database.ref().push(newTrain);

    // Clears all input boxes
    clearInput();
})

// Function that clears all input boxes
function clearInput() {
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-freq").val("");
}


database.ref().on("child_added", function (snapshot) {
    trainName = snapshot.val().name;
    trainDest = snapshot.val().dest;
    trainTime = moment(snapshot.val().firstTrain, "HH:mm");
    trainFreq = snapshot.val().freq;

    currentTime = moment().format("HH:mm");
    console.log("Current Time: " + currentTime);

    timeDiff = moment().diff(moment(trainTime), "minutes");
    console.log("Time remaining: " + timeDiff);

    timeRemainder = timeDiff % trainFreq;
    console.log("Remaining Time: " + timeRemainder);

    minAway = trainFreq - timeRemainder;
    console.log(minAway);

    nextArrival = moment().add(minAway, "minutes").format("HH:mm");

    $("#trainData").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});