const saveNote = async (event) => {
    // event.preventDefault();
    console.log(event.target.dataset.noteid);
    const userComment = event.target.querySelector("#comment-textarea").value.trim();
    const newTag = event.target.querySelector("#newTag").value.trim();
    const chosenTag = event.target.querySelector("#chooseTag").value.trim();

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
    };

};

const saveBtns = document.querySelectorAll(".editNote-form")
saveBtns.forEach((button) => button.addEventListener("submit", saveNote))