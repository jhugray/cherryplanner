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
  const startHour = document.querySelector('#startHour').innerHTML;
  const body = document.querySelector('#todo').value.trim();
  const dateContainer = document.getElementById("currentDay");
  date = dayjs.unix(dateContainer.getAttribute("data-time")).format('YYYY-MM-DD');
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

document.querySelector('.input-group').addEventListener('submit', saveTodoHandler);
