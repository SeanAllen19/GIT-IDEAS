async function getRepoInfo(event) {
event.preventDefault();

  const query = document.querySelector('#repo-search-input').value
  console.log(query)

  document.location.replace(`/search/${query}`);
}

document
  .querySelector('#repo-search-form')
  .addEventListener('submit', getRepoInfo);


console.log('ahhhhhhhh')