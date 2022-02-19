//set the current date using day.js and set inner html to the date
let now = dayjs();
console.log(now);
const dateContainer = document.getElementById("currentDay");
setDate(now);

// //update date on page
// function setDate(day) {
//   dateContainer.innerText = day.format('dddd, MMMM D, YYYY');
//   dateContainer.setAttribute("data-time", day.unix());
// };

function dateURL(day) {
  window.location.href="/" + (day.format('YYYY-MM-DD'));
};

//event listeners for forward and backward date buttons 
document.getElementById("forward").addEventListener("click", dateForward);
document.getElementById("backward").addEventListener("click", dateBackward);

function dateForward() {
  const dateContainer = document.getElementById("currentDay");
  date = dayjs.unix(dateContainer.getAttribute("data-time"));
  newDate = date.add(1, 'day');
  setDate(newDate);
  dateURL(newDate);
};

function dateBackward() {
  const dateContainer = document.getElementById("currentDay");
  date = dayjs.unix(dateContainer.getAttribute("data-time"));
  newDate = date.subtract(1, 'day');
  setDate(newDate);
  dateURL(newDate);
}

//save calendar items
async function saveTodoHandler(event) {
  event.preventDefault();
  const startHour = event.target.id;
  const body = document.querySelector('#todo-' + event.target.id).value.trim();
  const dateContainer = document.getElementById("currentDay");
  const date = dayjs.unix(dateContainer.getAttribute("data-time")).format('YYYY-MM-DD');
  console.log(body);
  console.log(date);
  console.log(startHour);

  if (body && date && startHour) {
    const response = await fetch('/api/calendar', {
      method: 'post',
      body: JSON.stringify({
        body, 
        date,
        startHour
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

//attempt 1 - only listened to first click
// document.querySelector('.input-group').addEventListener('submit', saveTodoHandler);

//attempt 2 - had to wrap HBS function in a container w/an ID of calItems, but then event.target did not work
// var calItems = document.querySelector('#calItems').getElementsByTagName('button');

// for (var i = 0; i < calItems.length; i++) {
//   var calItem= calItems[i];
//   calItem.onclick = saveTodoHandler;
// }

//attempt 3 - yay it works 
document.querySelectorAll('.input-group').forEach(function(el) {el.addEventListener('submit', saveTodoHandler)});

