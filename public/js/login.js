const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#exampleInputEmail1').value.trim();
  const password = document.querySelector('#exampleInputPassword1').value.trim();

  if (email && password) {
    const response = await axios.post(`/api/users/login`,{email, password});

    if (response.statusText == 'OK') {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#exampleInputUsername2').value.trim();
  const email = document.querySelector('#exampleInputEmail2').value.trim();
  const password = document.querySelector('#exampleInputPassword2').value.trim();

  if (username && email && password) {
    const response = await axios.post('/api/users',{username, email, password});

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
