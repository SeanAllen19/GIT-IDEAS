const deleteTag = async (event) => {
    console.log(event.target.dataset.tagid)
    console.log('Deleting tag....')
    const response = await fetch(`/api/tags/${event.target.dataset.tagid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

const deleteBtns = document.querySelectorAll(".btn-deleteTag")

deleteBtns.forEach(button => button.addEventListener("click", deleteTag))



