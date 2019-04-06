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
  var empName = $("#train-name-input").val().trim();
  var empdestination = $("#destination-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY");
  console.log('train start date', empStart);
  var empfrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding Train data
  var newEmp = {
    name: empName,
    destination: empdestination,
    start: empStart,
    frequency: empfrequency
  };

  // Uploads Train data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.destination);
  console.log(newEmp.start);
  console.log(newEmp.frequency);

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
  var empName = childSnapshot.val().name;
  var empdestination = childSnapshot.val().destination;
  var empStart = childSnapshot.val().start;
  var empfrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(empName);
  console.log(empdestination);
  console.log(empStart);
  console.log(empfrequency);

  // Prettify the Train start
  var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed frequency
  var empBilled = empMonths * empfrequency;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empdestination),
    $("<td>").text(empStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(empfrequency),
    $("<td>").text(empBilled)
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
