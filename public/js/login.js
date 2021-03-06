async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#floatingEmail').value.trim();
  const password = document.querySelector('#floatingPassword').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
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

document.querySelector('.form-login').addEventListener('submit', loginFormHandler);