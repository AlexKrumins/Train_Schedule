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

for (i=1;i<=12;i++){
  $("#start-input-hour").append($('<option></option>').val(i).html(i))
}
for (i=00;i<=59;i++){
  if (i<10) {
    $("#start-input-minute").append($('<option></option>').val("0"+i).html("0"+i))
  }else{
  $("#start-input-minute").append($('<option></option>').val(i).html(i))
  };
}

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var chchName = $("#train-name-input").val().trim();
  var chchDestination = $("#destination-input").val().trim();
  var chchStart = ($("#start-input-hour").val() + ":" + $("#start-input-minute").val() + $("#start-input-ampm").val());
  console.log('train start time', chchStart);
  var chchFrequency = $("#frequency-input").val().trim();
  var newChch = {
    name: chchName,
    destination: chchDestination,
    start: chchStart,
    frequency: chchFrequency
  };

  database.ref().push(newChch);

  alert("It looks like everything is on track");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var chchName = childSnapshot.val().name;
  var chchDestination = childSnapshot.val().destination;
  var chchStart = childSnapshot.val().start;
  var chchFrequency = childSnapshot.val().frequency;
  var now = moment();

  var newRow = $("<tr>").append(
    $("<td>").text(chchName),
    $("<td>").text(chchDestination),
    $("<td>").text(chchFrequency),
  );

  $("#train-table > tbody").append(newRow);
});