//when a save button is clicked, the text input is saved to localstorage
$("#btn9").click(function(event) {
  event.preventDefault();
  var textInput = $("#09").val(); 
  console.log(textInput);
  localStorage.setItem("savedCalEntry9", JSON.stringify(textInput));
});

$("#btn10").click(function(event) {
  event.preventDefault();
  var textInput = $("#10").val(); 
  console.log(textInput);
  localStorage.setItem("savedCalEntry10", JSON.stringify(textInput));
});

$("#btn11").click(function(event) {
  event.preventDefault();
  var textInput = $("#11").val(); 
  console.log(textInput);
  localStorage.setItem("savedCalEntry11", JSON.stringify(textInput));
});

$("#btn12").click(function(event) {
  event.preventDefault();
  var textInput = $("#12").val(); 
  console.log(textInput);
  localStorage.setItem("savedCalEntry12", JSON.stringify(textInput));
});

$("#btn13").click(function(event) {
  event.preventDefault();
  var textInput = $("#13").val(); 
  console.log(textInput);
  localStorage.setItem("savedCalEntry13", JSON.stringify(textInput));
});

$("#btn14").click(function(event) {
  event.preventDefault();
  var textInput = $("#14").val(); 
  console.log(textInput);
  localStorage.setItem("savedCalEntry14", JSON.stringify(textInput));
});

$("#btn15").click(function(event) {
  event.preventDefault();
  var textInput = $("#15").val(); 
  console.log(textInput);
  localStorage.setItem("savedCalEntry15", JSON.stringify(textInput));
});

$("#btn16").click(function(event) {
  event.preventDefault();
  var textInput = $("#16").val(); 
  console.log(textInput);
  localStorage.setItem("savedCalEntry16", JSON.stringify(textInput));
});

$("#btn17").click(function(event) {
  event.preventDefault();
  var textInput = $("#17").val(); 
  console.log(textInput);
  localStorage.setItem("savedCalEntry17", JSON.stringify(textInput));
});

// retrieves the info from localstorage and loads it on the page

$("#09").val(JSON.parse(localStorage.getItem("savedCalEntry9")));
$("#10").val(JSON.parse(localStorage.getItem("savedCalEntry10")));
$("#11").val(JSON.parse(localStorage.getItem("savedCalEntry11")));
$("#12").val(JSON.parse(localStorage.getItem("savedCalEntry12")));
$("#13").val(JSON.parse(localStorage.getItem("savedCalEntry13")));
$("#14").val(JSON.parse(localStorage.getItem("savedCalEntry14")));
$("#15").val(JSON.parse(localStorage.getItem("savedCalEntry15")));
$("#16").val(JSON.parse(localStorage.getItem("savedCalEntry16")));
$("#17").val(JSON.parse(localStorage.getItem("savedCalEntry17")));


var now = moment();
console.log(now);

//function to check the time, and update the css as needed based on the time
var confirmTime = function () {

  //gets the current date and appends it to the html
  var currentDate = moment().format('LL');
  console.log(currentDate);
  var dateContainer = document.getElementById("currentDay")
  dateContainer.innerText = currentDate;

  //defines the current time using moment.js, HH= 09, 10...17 format
  var currentTime = moment().format('HH');
  console.log(currentTime);

  //selects the element with the class of textarea (the rows)
  var calendarEl = $(".textarea");
  console.log(calendarEl)

  //for loop to go through each calendarEL row until the end, comparing the currentTime to the time in the calendar/schedule
  for (var i = 0 ; i < calendarEl.length ; i++) {

    //each calendarEL has an ID with the time for that calendar position, this identifies them
      var timeID = calendarEl[i].id;
      console.log(timeID)

      //selects the element by ID that we will later update based on the time
      var calID = document.getElementById(calendarEl[i].id)
      console.log(calID)

      //as the function will be repeated to update, this is needed to remove outdated past/present/future classes
      $(calendarEl[i].id).removeClass(".present .past .future");

     // loops through updating the css class based on the time
      if (timeID < currentTime) {
          $(calID).addClass("past");
      } else if (timeID > currentTime) {
          $(calID).addClass("future");
      } else {
          $(calID).addClass("present");
      }
  }
}

// reruns the confirmTime function to update the calendar without the need for the user to refresh the page
setInterval(confirmTime(), 50000);