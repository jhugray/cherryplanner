
let now = dayjs();
console.log(now);

var dateContainer = document.getElementById("currentDay");
setDate(now);

function setDate(day) {
  dateContainer.innerText = day.format('dddd, MMMM D, YYYY');
  dateContainer.setAttribute("data-time", day.unix());
};

document.getElementById("forward").addEventListener("click", dateForward);

function dateForward() {
  var dateContainer = document.getElementById("currentDay");
  date = dayjs.unix(dateContainer.getAttribute("data-time"));
  newDate = date.add(1, 'day');
  setDate(newDate);
};

document.getElementById("backward").addEventListener("click", dateBackward);

function dateBackward() {
  var dateContainer = document.getElementById("currentDay");
  date = dayjs.unix(dateContainer.getAttribute("data-time"));
  newDate = date.add(1, 'day');
  setDate(newDate);
}

// const now = moment();
// console.log(now);

// //function to check the time, and update the css as needed based on the time
// const confirmTime = function () {

//   //gets the current date and appends it to the html
//   var currentDate = moment().format('LL');
//   console.log(currentDate);
//   var dateContainer = document.getElementById("currentDay")
//   dateContainer.innerText = currentDate;

//   //defines the current time using moment.js, HH= 09, 10...17 format
//   var currentTime = moment().format('HH');
//   console.log(currentTime);

//   //selects the element with the class of textarea (the rows)
//   var calendarEl = $(".textarea");
//   console.log(calendarEl)

//   //for loop to go through each calendarEL row until the end, comparing the currentTime to the time in the calendar/schedule
//   for (var i = 0 ; i < calendarEl.length ; i++) {

//     //each calendarEL has an ID with the time for that calendar position, this identifies them
//       var timeID = calendarEl[i].id;
//       console.log(timeID)

//       //selects the element by ID that we will later update based on the time
//       var calID = document.getElementById(calendarEl[i].id)
//       console.log(calID)

//       //as the function will be repeated to update, this is needed to remove outdated past/present/future classes
//       $(calendarEl[i].id).removeClass(".present .past .future");

//      // loops through updating the css class based on the time
//       if (timeID < currentTime) {
//           $(calID).addClass("past");
//       } else if (timeID > currentTime) {
//           $(calID).addClass("future");
//       } else {
//           $(calID).addClass("present");
//       }
//   }
// }

// // reruns the confirmTime function to update the calendar without the need for the user to refresh the page
// setInterval(confirmTime(), 50000);