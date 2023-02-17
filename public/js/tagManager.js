// edit tag functionality
const updateTag = async (event) => {
  event.preventDefault();
  const editTagText = event.target.previousElementSibling.value.trim();
  const putTagBody = { title: editTagText };

  const response = await axios.put(
    `/api/tags/${event.target.dataset.tagid}`,
    putTagBody
  );

  if ((response.statustext = "OK")) {
    document.location.replace("/tagmanager");
  } else {
    alert(response.statusText);
  }
};

// delete tag functionality
const deleteTag = async (event) => {
  const response = await axios.delete(
    `/api/tags/${event.target.dataset.tagid}`
  );
  if ((response.statustext = "OK")) {
    document.location.replace("/tagmanager");
  } else {
    alert(response.statusText);
  }
};

// create new tag functionality
const createTag = async (event) => {
  event.preventDefault();
  const newTagText = event.target.previousElementSibling.value.trim();
  const postTagBody = { title: newTagText };

  console.log(postTagBody)

  const response = await axios.post('/api/tags/', postTagBody);
  if ((response.statustext = "OK")) {
    document.location.replace("/tagmanager");
  } else {
    alert(response.statusText);
  }
};

// Add event listener to create button
const createBtn = document.querySelector(".btn-createTag");
createBtn.addEventListener("click", createTag)

// Add event listener to update buttons
const updateBtns = document.querySelectorAll(".btn-updateTag");
updateBtns.forEach((button) => button.addEventListener("click", updateTag));

// Add event listener to delete buttons
const deleteBtns = document.querySelectorAll(".btn-deleteTag");
deleteBtns.forEach((button) => button.addEventListener("click", deleteTag));
