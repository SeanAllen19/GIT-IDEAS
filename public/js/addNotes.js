const saveNote = async (event) => {

    event.preventDefault();
    // object containing the targeted search-result's relevent information for creating a note with
    const repoObject = JSON.parse(event.target.dataset.repoinfo);
    const comment = event.target.querySelector("#comment-textbox").value.trim();
    const newTag = event.target.querySelector("#newTag").value.trim();
    const chosenTag = event.target.querySelector("#chooseTag").value.trim();

    repoObject.comment = comment;

    console.log(repoObject);
    
    // creates a new tag, then creates a new note containing the new tag
    if (newTag) {
        let newTagBody = { title: newTag };
        let createTagRes = await axios.post('/api/tags', newTagBody);

        repoObject.tag_id = createTagRes.data.id;
        let createNoteRes = await axios.post(`/api/notes`, repoObject);

        if (createNoteRes.statusText = 'OK') {
        document.location.replace('/results');
        } else {
        alert(createNoteRes.statusText);
        };
    // uses tag chosen from dropdown list to create the new note with
    } else {
        // if the tag chosen in the dropdown list is the default item with a "null" value, the note is created without a tag_id
        if (chosenTag !== "null") {
            repoObject.tag_id = chosenTag;
        }
            
        var createNoteRes = await axios.post(`/api/notes`, repoObject);

        if (createNoteRes.statusText = 'OK') {
          document.location.replace('/results');
        } else {
          alert(createNoteRes.statusText);
        };
    };

};

const saveBtns = document.querySelectorAll(".result-card")
saveBtns.forEach((button) => button.addEventListener("submit", saveNote))