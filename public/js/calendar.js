//set the current date using day.js and set inner html to the date
let now = dayjs();
console.log(now);
var dateContainer = document.getElementById("currentDay");
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
  var dateContainer = document.getElementById("currentDay");
  date = dayjs.unix(dateContainer.getAttribute("data-time"));
  newDate = date.add(1, 'day');
  setDate(newDate);
};

function dateBackward() {
  var dateContainer = document.getElementById("currentDay");
  date = dayjs.unix(dateContainer.getAttribute("data-time"));
  newDate = date.add(1, 'day');
  setDate(newDate);
}

async function saveTodoHandler(event) {
  event.preventDefault();

  const todo = document.querySelector('#todo').value.trim();
  const date = //add rest....

  if (todo && //add others) {
    const response = await fetch('/api/calendar', {
      method: 'post',
      body: JSON.stringify({
        todo, 
        date etc ect ///add more
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.input-group').addEventListener('submit', saveTodoHandler);
