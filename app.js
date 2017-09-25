// Initialize Firebase
var config = {
    apiKey: "AIzaSyAs9hfBa3Xti4KPFTqeRnDSTHRJje4FkiQ",
    authDomain: "traintimer-3ad2a.firebaseapp.com",
    databaseURL: "https://traintimer-3ad2a.firebaseio.com",
    projectId: "traintimer-3ad2a",
    storageBucket: "traintimer-3ad2a.appspot.com",
    messagingSenderId: "386134055353"
};
firebase.initializeApp(config);


var trainName = "";
var destination = "";
var firstTrainTime = 0;
var frequency = 0;
var minutesAway = 0;
var arrivalHumanize = 0;
var trainArrival = 0;

$('#newTrain').on('click',function(eventObject){
    eventObject.preventDefault();
    trainName = $('#trainName').val().trim();
    destination = $('#destination').val().trim();
    frequency = $('#frequency').val().trim();

    firebase.database().ref().push({
        trainName:trainName,
        destination:destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,

        dateAdded:firebase.database.ServerValue.TIMESTAMP
    });

    $('#form').trigger('reset');
});

firebase.database().ref().on('child_added', function(snapshot){
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency = snapshot.val().frequency;
    var firstTrainTimeHumanize = moment(firstTrainTime, "hh:mm").subtract( 1, "years");
    var firstTrainTimeMinutes = moment().diff(moment(firstTrainTimeHumanize),'minutes');
    var firstTrainTimeLeft = firstTrainTimeMinutes % frequency;
    var minutesAway = frequency - firstTrainTimeLeft;
    var trainArrival = moment().add(minutesAway, 'minutes');
    var arrivalHumanize = moment(trainArrival).format('hh:mm');
    console.log(arrivalHumanize);
    console.log(minutesAway);

    $('#added-train').append('<tr><td>' + trainName + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + arrivalHumanize + '</td><td>' + minutesAway +'</td></tr>');




});