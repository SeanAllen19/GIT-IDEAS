const deleteTag = async (event) => {
  console.log(event.target.dataset.tagid);
  console.log("Deleting tag....");
  const response = await axios.delete(
    `/api/tags/${event.target.dataset.tagid}`
  );
  if ((response.statustext = "ok")) {
    console.log("Tag removed");
  } else {
    alert(response.statusText);
  }
};

// const updateTag = async (event) => {
   
//   event.preventDefault();
// //   console.log(event.target.dataset);
// console.log("Updating tag....");
//   const newTag = document.querySelector("#newTag-textarea").value.trim();
//   console.log(newTag);

//   const response = await axios.put(
//     `/api/tags/${event.target.dataset.update_id}`,
//     { title: newTag }
//   );

//   if ((response.statustext = "ok")) {
//     console.log("Tag updated");
//   } else {
//     alert(response.statusText);
//   }
// };

const deleteBtns = document.querySelectorAll(".btn-deleteTag");
// const updateBtns = document.querySelectorAll(".form-updateTag");

deleteBtns.forEach((button) => button.addEventListener("click", deleteTag));
// updateBtns.forEach((button) => button.addEventListener("submit", updateTag));
