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

$("#submit-button").on("click", function (event) {
    e.preventDefault();

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

database.ref().on("value", function (childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDest);
    console.log(childSnapshot.val().trainTime);
    console.log(childSnapshot.val().trainFreq);

    // var trainRow = $("<tr>");
    var trainData = $("<td>");
    // trainRow.append(trainData);
    $("#trainData").append(trainData);
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});