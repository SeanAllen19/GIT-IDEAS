// Github API Repository Search ---------------------------------------------------------------
// var fetchButton = document.getElementById('fetch-button');

// const axios = require('axios');
// axios.get(`https://api.github.com/search/repositories?q=hangman+game&per_page=10`)
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .finally(function () {
//   });

const axios = require('axios');

async function getRepoInfo() {

  let res = await axios.get('https://api.github.com/search/repositories?q={hangman+game}{&per_page=10}');

  let repoName = res.data.name;
  let repoDescription = res.data.description
  let language = res.data.language;

  console.log(`Repo Name: ${repoName}`)
  console.log(`Repo Description: ${repoDescription}`)
  console.log(`Language: ${language}`)

}

getRepoInfo();