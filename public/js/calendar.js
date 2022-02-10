//set the current date using day.js and set inner html to the date
let now = dayjs();
console.log(now);
const dateContainer = document.getElementById("currentDay");
setDate(now);

//update date
function setDate(day) {
  dateContainer.innerText = day.format('dddd, MMMM D, YYYY');
  dateContainer.setAttribute("data-time", day.unix());
};

//event listeners for forward and backward date buttons 
document.getElementById("forward").addEventListener("click", dateForward);
document.getElementById("backward").addEventListener("click", dateBackward);

function dateForward() {
  const dateContainer = document.getElementById("currentDay");
  date = dayjs.unix(dateContainer.getAttribute("data-time"));
  newDate = date.add(1, 'day');
  setDate(newDate);
};

function dateBackward() {
  const dateContainer = document.getElementById("currentDay");
  date = dayjs.unix(dateContainer.getAttribute("data-time"));
  newDate = date.add(1, 'day');
  setDate(newDate);
}


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

// document.querySelector('.input-group').addEventListener('submit', saveTodoHandler);
var calItems = document.querySelector('#calItems').getElementsByTagName('button');

// For each <li> inside #links
for (var i = 0; i < calItems.length; i++) {
  var calItem= calItems[i];
  calItem.onclick = saveTodoHandler;
}