const loginFormHandler = async (event) => {
  try {
    event.preventDefault();

    // Login variables

  const email = document.querySelector('#exampleInputEmail1').value.trim();
  const password = document.querySelector('#exampleInputPassword1').value.trim();

  // user email and password entry. Checks for valid login and returns to the homepage if valid. Throws error
  // message if not valid
  if (email && password) {
    const response = await axios.post(`/api/users/login`,{email, password});

    if (response.statusText == 'OK') {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
} catch (err) {
  console.log(err);
  alert('Login failed')
}
};

const signupFormHandler = async (event) => {
  try {
    event.preventDefault();

    // Sign up variables

  const username = document.querySelector('#exampleInputUsername2').value.trim();
  const email = document.querySelector('#exampleInputEmail2').value.trim();
  const password = document.querySelector('#exampleInputPassword2').value.trim();

  // username, email, and password entry. Checks for valid signup parameters and returns to the homepage if valid. Throws error
  // message if not valid

  if (username && email && password) {
    const response = await axios.post('/api/users',{username, email, password});

    if (response.statusText == 'OK') {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
} catch (err) {
  console.log(err);
  alert('Signup failed')
}
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


  