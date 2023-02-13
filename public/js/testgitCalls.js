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

// const axios = require('axios');
// import axios from 'axios';

async function getRepoInfo(event) {
event.preventDefault();
try{
console.log('search button pressed')
  const result = await axios.get('https://api.github.com/search/repositories?q={hangman+game}&per_page=10')

    // console.log (result)
  
  let repoName = result.data.items[0].name;
  let repoURL = result.data.items[0].html_url;
  let repoDescription = result.data.items[0].description;
  let language = result.data.items[0].language;
  let resultObject = [];
  result.data.items.forEach((item) => {
    resultObject.push({name: item.name});
  });
  console.log(...resultObject)
  // console.table(resultObject)
  // console.log(`Repo Name: ${repoName}`)
  // console.log(`Repo URL: ${repoURL}`)
  // console.log(`Repo Description: ${repoDescription}`)
  // console.log(`Language: ${language}`)

 const response = await axios.post('/', { name: repoName });

//  if (response.ok) {
//   document.location.replace('/search');
// } else {
//   alert('Failed to create project');
// }
} catch (err) {
  console.log(err);
}
}

  // document.location.replace('/homepage');



document
  .querySelector('#repo-search-form')
  .addEventListener('submit', getRepoInfo);


console.log('ahhhhhhhh')