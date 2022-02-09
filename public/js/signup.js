async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#floatingUsername').value.trim();
  const email = document.querySelector('#floatingEmail').value.trim();
  const password = document.querySelector('#floatingPassword').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
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

document.querySelector('.form-signup').addEventListener('submit', signupFormHandler);