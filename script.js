const addBtn = document.getElementById('add-btn')
const title = document.getElementById('title')
const desc = document.getElementById('desc')
const alert = document.getElementById('alert')
const alertEdit = document.getElementById('alertEdit')
const box = document.getElementById('box')
const editTitle = document.getElementById('editTitle')
const editDesc = document.getElementById('editDesc')
const editSave = document.getElementById('editSave')
const search = document.getElementById('search');
const heading = document.getElementById('heading')





addBtn.addEventListener("click", () => {

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (title.value == "") {
        alert.innerHTML = "Title is empty !!"
    } else if (desc.value == "") {
        alert.innerHTML = "Description is empty !!"
    } else {

        let note = {
            title: title.value,
            desc: desc.value,
        }

        notes.push(note)
        localStorage.setItem("notes", JSON.stringify(notes));

        alert.innerHTML = "Note added !"
        title.value = ""
        desc.value = ""
        heading.style.display = "none"
        displayNotes();
    }

    setTimeout(() => {
        if (alert.innerHTML == "Note added !") {
            alert.innerHTML = "Add another note.";
        } else {
            alert.innerHTML = "";
        }

    }, 1000)
})

function displayNotes() {

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    if(notes.length==0){
        heading.style.display="block"
    }else{
        heading.style.display="none"
    }

    box.innerHTML = "";

    notes.forEach(function (note, index) {

        const noteElement = document.createElement("div");

        noteElement.classList.add('col-md-5', 'p-4', 'bg-light', 'rounded', 'shadow')

        const titleElement = document.createElement("h2");
        titleElement.textContent = note.title;
        titleElement.classList.add('text-success', 'fw-bold')
        noteElement.appendChild(titleElement);


        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = note.desc;
        noteElement.appendChild(descriptionElement);


        const editButton = document.createElement("button");
        editButton.classList.add("btn", 'btn-info', 'mx-2');
        editButton.innerHTML = `
        <i class="fa-solid fa-pen-to-square text-light"></i>
        `;
        editButton.setAttribute('data-bs-toggle', 'modal')
        editButton.setAttribute('data-bs-target', '#staticBackdrop')

        editButton.addEventListener("click", function () {

            editNote(index);

        });

        noteElement.appendChild(editButton);


        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.innerHTML = `
        <i class="fa-solid fa-trash"></i>
        
        `;

        deleteButton.addEventListener("click", function () {
            deleteNote(index);
        });

        noteElement.appendChild(deleteButton);

        // Add the new note element to the notes container
        box.appendChild(noteElement);
    });
}


function editNote(index) {

    let notes = JSON.parse(localStorage.getItem("notes")) || [];


    editTitle.value = notes[index].title;
    editDesc.value = notes[index].desc;

    editSave.addEventListener('click', () => {

        if (editTitle.value == "") {
            alertEdit.innerHTML = "Title is empty !!"
        } else if (editDesc.value == "") {
            alertEdit.innerHTML = "Description is empty !!"
        } else {
            notes[index].title = editTitle.value;
            notes[index].desc = editDesc.value;
            localStorage.setItem("notes", JSON.stringify(notes));
            displayNotes();
            alertEdit.innerHTML = "Note Saved !!"
        }
        setTimeout(() => {
            alertEdit.innerHTML = ""
        }, 1000)

    })


    // Refresh the notes display

}


function deleteNote(index) {

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

// Call the displayNotes function to initially display any existing notes
displayNotes();




search.addEventListener('input', () => {
    let searchTerm = search.value.toUpperCase()
    let allTitle = document.querySelectorAll('h2');

    allTitle.forEach(title => {
        if (title.innerText.toUpperCase().indexOf(searchTerm) > -1) {
            title.parentElement.style.display = ""
        } else {
            title.parentElement.style.display = "none"
        }
    })



})









