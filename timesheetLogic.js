// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new Trains - then update the html + update the database
// 3. Create a way to retrieve Trains from the Train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCGRzvTzk3D5wHcyo7i2CB7x99M4NfpSyE",
  authDomain: "sharpcoconutisdangerous.firebaseapp.com",
  databaseURL: "https://sharpcoconutisdangerous.firebaseio.com",
  projectId: "sharpcoconutisdangerous",
  storageBucket: "sharpcoconutisdangerous.appspot.com",
  messagingSenderId: "644050106732"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var chchName = $("#train-name-input").val().trim();
  var chchDestination = $("#destination-input").val().trim();
  var chchStart = ($("#start-input").val().trim(), 'HH:mm');
  console.log('train start time', chchStart);
  var chchFrequency = $("#frequency-input").val().trim();
  console.log(chchStart);

  // Creates local "temporary" object for holding Train data
  var newChch = {
    name: chchName,
    destination: chchDestination,
    start: chchStart,
    frequency: chchFrequency
  };

  // Uploads Train data to the database
  database.ref().push(newChch);

  // Logs everything to console
  console.log(newChch.name);
  console.log(newChch.destination);
  console.log(newChch.start);
  console.log(newChch.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var chchName = childSnapshot.val().name;
  var chchDestination = childSnapshot.val().destination;
  var chchStart = childSnapshot.val().start;
  var chchFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(chchName);
  console.log(chchDestination);
  console.log(chchStart);
  console.log(chchFrequency);

  // Prettify the Train start
  var chchStartPretty = moment.unix(chchStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var chchMonths = moment().diff(moment(chchStart, "X"), "months");
  console.log(chchMonths);

  // Calculate the total billed frequency
  var chchBilled = chchMonths * chchFrequency;
  console.log(chchBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(chchName),
    $("<td>").text(chchDestination),
    $("<td>").text(chchFrequency),
    $("<td>").text(chchStartPretty),
    $("<td>").text(chchMonths),
    $("<td>").text(chchBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
