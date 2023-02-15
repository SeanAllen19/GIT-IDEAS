const deleteNote = async (event) => {
    // deletes the note by id
    const response = await axios.delete(`/api/notes/${event.target.dataset.noteid}`);

  if (response.statusText = 'OK') {
    console.log('Note deleted!')
  } else {
    alert(response.statusText);
  }
};

const editNote = async (event) => {

    event.preventDefault();
    const userComment = event.target.querySelector("#comment-textarea").value.trim();
    const newTag = event.target.querySelector("#newTag").value.trim();
    const chosenTag = event.target.querySelector("#chooseTag").value.trim();

    // posts new tag and updates the note with a comment and the new tag 
    if (userComment && newTag) {
        let newTagBody = { title: newTag };
        let createTagRes = await axios.post('/api/tags', newTagBody);

        let noteBody = { comment: userComment, tag_id: createTagRes.data.id };
        let updateNoteRes = await axios.put(`/api/notes/${event.target.dataset.noteid}`, noteBody);

        if (updateNoteRes.statusText = 'OK') {
          document.location.replace('/saved');
        } else {
          alert(updateNoteRes.statusText);
        };
    // updates the note with a comment and an existing tag selected from dropdown
    } else if (userComment && chosenTag) {
        let noteBody = { comment: userComment, tag_id: chosenTag };
        let updateNoteRes = await axios.put(`/api/notes/${event.target.dataset.noteid}`, noteBody);

        if (updateNoteRes.statusText = 'OK') {
          document.location.replace('/saved');
        } else {
          alert(updateNoteRes.statusText);
        };
    // creates a new tag and updates the note with the new tag and an empty string in place of an empty/undefined comment
    } else if (newTag){
      let newTagBody = { title: newTag };
      let createTagRes = await axios.post('/api/tags', newTagBody);

      let noteBody = { comment: '', tag_id: createTagRes.data.id };
      let updateNoteRes = await axios.put(`/api/notes/${event.target.dataset.noteid}`, noteBody);

      if (updateNoteRes.statusText = 'OK') {
        document.location.replace('/saved');
      } else {
        alert(updateNoteRes.statusText);
      };
    // updates the note with a selected tag from dropdown and an empty string in place of an empty/undefined comment
    } else {
        let noteBody = { comment: '', tag_id: chosenTag };
        let updateNoteRes = await axios.put(`/api/notes/${event.target.dataset.noteid}`, noteBody);

        if (updateNoteRes.statusText = 'OK') {
          document.location.replace('/saved');
        } else {
          alert(updateNoteRes.statusText);
        };
    };
};

const deleteBtns = document.querySelectorAll(".btn-deleteNote")
deleteBtns.forEach((button) => button.addEventListener("click", deleteNote))

const saveBtns = document.querySelectorAll(".editNote-form")
saveBtns.forEach((button) => button.addEventListener("submit", editNote))