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
    const userComment = document.querySelector("#comment-textarea").value.trim();
    const newTag = document.querySelector("#newTag").value.trim();
    const chosenTag = document.querySelector("#chooseTag").value.trim();

    if (userComment && newTag) {
        let newTagBody = { title: newTag };
        let createTagRes = await axios.post('/api/tags', newTagBody);

        let noteBody = { comment: userComment, tag_id: createTagRes.data.id };
        let updateNoteRes = await axios.put(`/api/notes/${event.target.dataset.noteid}`, noteBody);

        console.log(updateNoteRes.statusText);

    } else if (userComment && chosenTag) {
        let noteBody = { comment: userComment, tag_id: chosenTag };
        let updateNoteRes = await axios.put(`/api/notes/${event.target.dataset.noteid}`, noteBody);

        console.log(updateNoteRes.statusText);
    } else {
        let noteBody = { comment: '', tag_id: chosenTag };
        let updateNoteRes = await axios.put(`/api/notes/${event.target.dataset.noteid}`, noteBody);

        console.log(updateNoteRes.statusText);
    }
};

const deleteBtns = document.querySelectorAll(".btn-deleteNote")
deleteBtns.forEach((button) => button.addEventListener("click", deleteNote))

const saveBtns = document.querySelectorAll(".editNote-form")
saveBtns.forEach((button) => button.addEventListener("submit", saveNote))