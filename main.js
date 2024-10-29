let notesListRootElement=document.querySelector(".notesList")
let notes=[]
function renderElementsToScreen(){
  if(localStorage.getItem('notes')){
    notes=JSON.parse(localStorage.getItem('notes'))
   notes.forEach(note=>{
      renderNoteToList(note,note.unquieID)
    })
  }
}

document.querySelector('#deleteAllNotes').addEventListener("click",()=>{
  document.querySelectorAll(".note").forEach(note => {
    note.remove()
  });
  localStorage.clear()
})
document.querySelector("#createNoteButton").addEventListener('click',()=>{
  let unquieID='note'+Math.floor(Math.random()*1000)
  let note={
    title:document.querySelector("#createNoteTitle").value,
    content:document.querySelector('#createNoteContent').value
  }
  addNoteToLocalStorage(note,unquieID)
  renderNoteToList(note,unquieID)
})
function renderNoteToList(note,unquieID){
 if(((note.title.length )>0) && ((note.content.length)>0)){
 
  let noteDiv=document.createElement('div')
  noteDiv.classList.add('note',unquieID)
  let noteTitle=document.createElement('h4')
  let noteContent=document.createElement('p')
  let noteButtonDiv=document.createElement('div')
  noteButtonDiv.className='button'
  let noteEditButton=document.createElement('button')
  let noteDeleteButton=document.createElement('button')
  noteTitle.innerText=note.title;
  noteContent.innerText=note.content
  noteEditButton.innerText='Edit Note'
  noteDeleteButton.innerText='Delete Note'

  noteEditButton.addEventListener('click',()=>{
    document.querySelector("#createNoteTitle").value=noteTitle.innerText
    document.querySelector('#createNoteContent').value=noteContent.innerText
    removeElementFromTheList(unquieID)
   })
  noteDeleteButton.addEventListener('click',()=>{
   removeElementFromTheList(unquieID)
  })
  noteButtonDiv.appendChild(noteEditButton)
  noteButtonDiv.appendChild(noteDeleteButton)
  noteDiv.appendChild(noteTitle)
  noteDiv.appendChild(noteContent)
  noteDiv.appendChild(noteButtonDiv)
  
  notesListRootElement.appendChild(noteDiv)
  document.querySelector("#createNoteTitle").value=''
  document.querySelector('#createNoteContent').value=''

  
 }
 else{
  alert('Please enter the required feilds to create a note')
 }


}

function addNoteToLocalStorage(note,unquieID){
  if(((note.title.length )>0) && ((note.content.length)>0))
 { 
  note={...note,unquieID}
   notes.push(note)
  localStorage.setItem('notes',JSON.stringify(notes))}
}

function removeElementFromTheList(id){
document.querySelector("."+id).remove()
notes=JSON.parse(localStorage.getItem('notes'))

let index=notes.findIndex(note=>note.unquieID == id)
notes.splice(index,1)
localStorage.setItem('notes',JSON.stringify(notes))
}



renderElementsToScreen()