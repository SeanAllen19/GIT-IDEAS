async function getRepoInfo(event) {
event.preventDefault();

// If searchbox data is entered, the query is fed to the GitHub Rest api. If no data entered and the 
// search button is clicked, the results will be for a general javascript search query.
  const query = document.querySelector('#repo-search-input').value
  console.log(query)

    if (!query) {
    document.location.replace(`/search/javascript`)
    }
    else {
    document.location.replace(`/search/${query}`);
    }
};
document
  .querySelector('#repo-search-form')
  .addEventListener('submit', getRepoInfo);


