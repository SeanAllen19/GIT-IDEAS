const deleteNote = async (event) => {

    console.log('Deleting note....')
    const response = await axios.delete(`/api/notes/${event.target.dataset.noteid}`);

  if (response.statusText = 'OK') {
    console.log('Note deleted!')
  } else {
    alert(response.statusText);
  }
};

const saveNote = async (event) => {
    event.preventDefault();
    console.log(event.target.dataset.noteid);
    const comment = document.querySelector("#comment-textarea").value.trim();
    const newTag = document.querySelector("#newTag").value.trim();
    var chosenTag = document.querySelector("#chooseTag").value.trim();

    console.log('comment:', comment);

    if (!newTag) {
        console.log('No tag')
    } else {
    console.log('newTag:', newTag);
    };

    // if (tagChoice) {
    //     console.log('selected another tag')
    // } else {
    // console.log('tagChoice:', tagChoice);
    // };

    if (chosenTag === 'null') {
        console.log('no chosen tag')
    } else {
      console.log(chosenTag)
    };

    // const response = await axios.put(`/api/notes/${event.target.dataset.noteid}`, );
//   if (response.ok) {
//     console.log('Note deleted!')
//     // document.location.replace("/");
//   } else {
//     alert(response.statusText);
//   }
};

const deleteBtns = document.querySelectorAll(".btn-deleteNote")
deleteBtns.forEach((button) => button.addEventListener("click", deleteNote))

const saveBtns = document.querySelectorAll(".editNote-form")
saveBtns.forEach((button) => button.addEventListener("submit", saveNote))