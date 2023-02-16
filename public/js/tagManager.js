const deleteTag = async (event) => {

  const response = await axios.delete(
    `/api/tags/${event.target.dataset.tagid}`
  );
  if (response.statustext = "OK") {
    document.location.replace('/tagmanager');
  } else {
    alert(response.statusText);
  }
};

const deleteBtns = document.querySelectorAll(".btn-deleteTag");

deleteBtns.forEach((button) => button.addEventListener("click", deleteTag));
