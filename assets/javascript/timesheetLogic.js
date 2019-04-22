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
function   playAudio(){
  var audio = new Audio('Train_Honk_Horn_2x-Mike_Koenig-157974048.mp3');
  audio.play();
}

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  $("#train-name-input, #destination-input, #frequency-input").removeClass("is-valid is-invalid")
  var chchName = $("#train-name-input").val().trim();
  var chchDestination = $("#destination-input").val().trim();
  var chchStart = ($("#start-input-hour").val() + ":" + $("#start-input-minute").val() + $("#start-input-ampm").val());
  console.log('train start time', chchStart);
  var chchFrequency = $("#frequency-input").val().trim();
  if (chchName === "") {
    $("#train-name-input").addClass("is-invalid")
    alert("Please Name the train you're adding to the schedule.");
  }else if(chchDestination === "") {
    $("#destination-input").addClass("is-invalid")
    alert("Please add a destination for the train you're adding to the schedule.");
  }else if(chchFrequency === "") {
    $("#frequency-input").addClass("is-invalid")
    alert("Please enter the train's frequency (in minutes).")
  }else if(isNaN(chchFrequency)) {
    $("#frequency-input").addClass("is-invalid")
    alert("Please enter only a number for the train's frequency, ya dingus.");
  }else{
    playAudio()
    var newChch = {
      name: chchName,
      destination: chchDestination,
      start: chchStart,
      frequency: chchFrequency
  };

  database.ref().push(newChch);
  alert("It looks like everything is on track");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
  };
});

database.ref().on("child_added", function(childSnapshot) {
  var chchName = childSnapshot.val().name;
  var chchDestination = childSnapshot.val().destination;
  var chchStart = moment(childSnapshot.val().start, "LT a");
  var chchFrequency = childSnapshot.val().frequency;
  var timePassed = moment().diff(moment(chchStart, 'm'), "minutes");
  var tRemainder = timePassed % chchFrequency;
  var timeLeft = chchFrequency - tRemainder;
  var nextArrival = moment().add(timeLeft, 'm');
  var expectedArrival;
  var expectedWait;
  if (moment().isBefore(chchStart)) {
    expectedArrival = chchStart;
    expectedWait = moment(chchStart, 'm').diff(moment(), 'm');
  } else {
    expectedArrival = nextArrival;
    expectedWait = moment(nextArrival, 'm').diff(moment(), 'm');
  };


  var newRow = $("<tr>").append(
    $("<td>").text(chchName),
    $("<td>").text(chchDestination),
    $("<td>").text(chchFrequency),
    $("<td>").text(moment(expectedArrival).format("h:mm A")),
    $("<td>").text(expectedWait + " minutes"),
  );

  $("#train-table > tbody").append(newRow);
});