// Github API Repository Search ---------------------------------------------------------------
// var fetchButton = document.getElementById('fetch-button');

// WORKING CODE DO NOT DELETE
// const axios = require('axios');

// async function getRepoInfo() {

//   let res = await axios.get('https://api.github.com/search/repositories?q={hangman+game}{&per_page=10}');
  
//   let repoName = res.data.items[0].name;
//   let repoURL = res.data.items[0].html_url;
//   let repoDescription = res.data.items[0].description;
//   let language = res.data.items[0].language;

//   console.log(`Repo Name: ${repoName}`)
//   console.log(`Repo URL: ${repoURL}`)
//   console.log(`Repo Description: ${repoDescription}`)
//   console.log(`Language: ${language}`)
// }

// getRepoInfo();

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

  let res = await axios.get('https://api.github.com/search/repositories?q={hangman+game}&per_page=10');

    console.log (res)
  
  let repoName = res.data.items[0].name;
  let repoURL = res.data.items[0].html_url;
  let repoDescription = res.data.items[0].description;
  let language = res.data.items[0].language;
  let resultObject = [];
  res.data.items.forEach((item) => {
    resultObject.push(item.name);
console.log(resultObject)
  });
  console.table(resultObject)
  console.log(`Repo Name: ${repoName}`)
  console.log(`Repo URL: ${repoURL}`)
  console.log(`Repo Description: ${repoDescription}`)
  console.log(`Language: ${language}`)
}

getRepoInfo();



