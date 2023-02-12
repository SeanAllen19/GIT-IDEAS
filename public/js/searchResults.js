const axios = require('axios');

const newFormHandler = async (event) => {
    event.preventDefault();

    const response = await axios({
        url: 'https://api.github.com/search/repositories?q=hangman+game&per_page=10',
        headers: {'Accept': 'application/vnd.github+json'},
    });
  
    console.log(response);
};

document
.querySelector('.new-search-form')
.addEventListener('submit', newFormHandler);