const saveNote = async (event) => {
    event.preventDefault();
    console.log(event.target.dataset.noteid);
    const repoObject = JSON.parse(event.target.dataset.repoinfo);
    const comment = event.target.querySelector("#comment-textbox").value.trim();
    const newTag = event.target.querySelector("#newTag").value.trim();
    const chosenTag = event.target.querySelector("#chooseTag").value.trim();

    repoObject.comment = comment;

    console.log(repoObject);
    
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

    } else {
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