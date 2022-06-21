async function saveTodoHandler(event) {
  event.preventDefault();
  const form = event.target.form || event.target;
  const startHour = form.id;
  const body = document.getElementById('todo-' + startHour).value.trim();
  const dateContainer = document.getElementById('dateContainer-' + startHour);
  const date = dateContainer.value;
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

document.querySelectorAll('.input-group').forEach(function(el) {el.addEventListener('submit', saveTodoHandler)});

document.querySelectorAll('.form-control').forEach(function(input) {
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      saveTodoHandler(event);
    }
  });
});