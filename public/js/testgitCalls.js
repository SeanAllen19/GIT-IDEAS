async function getRepoInfo(event) {
event.preventDefault();

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


console.log('ahhhhhhhh')