const addBtn = document.getElementById("addBtn")
const removeBtn = document.getElementById("removeBtn")
const main = document.getElementById('main')


const saveNote = () =>{
    const notes = document.querySelectorAll('.note textarea');
    const data= [];
    notes.forEach((note)=>{
        data.push(note.value)
    })
    // console.log(data)

    if(data.length===0){
        localStorage.removeItem("notes")
    }else{
        localStorage.setItem('notes',JSON.stringify(data))
    }

   
}






addBtn.addEventListener("click",()=>{
    addNote();

})


const addNote = (text="") => {
    const note = document.createElement('div');
    note.classList.add('note')
    note.innerHTML=`
   
    <div class="tool">
        <button class="saveBtn">Save</button>
        <button class="removeBtn">Delete</button>
    </div>
    <div class="area">
        <textarea name="note" id="note" cols="30" rows="10">${text}</textarea>
    </div>

    
    `
   
    note.querySelector('.removeBtn').addEventListener('click',()=>{
        note.remove()
        saveNote()
    })
    note.querySelector('.saveBtn').addEventListener('click',()=>{
        
        saveNote()

    })
    note.querySelector("textarea").addEventListener("focusout",()=>{
       saveNote() 
    })
    main.appendChild(note);
    saveNote()
}

(
    function(){
        const lsnotes =  JSON.parse(localStorage.getItem("notes"))
        if(lsnotes == null){
            addNote()
        }else{
            lsnotes.forEach((lsnote)=>{
                addNote(lsnote)
            }) 
        }
        
       
    }


)()