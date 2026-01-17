import { MESSAGES } from './lang/messages/en/user.js';

//Check if local storage is supported on page load
window.onload = () => {
    if (typeof(Storage) === "undefined") {
        alert(MESSAGES.localStorageUnsupported);
        return;
    }
    loadNotesFromLocalStorage();
}

class Note {
    constructor(content, container) {
        this.content = content;
        this.container = container; //Div where the notes will be added
        this.element = null;    //The actual note textarea
        this.removeBtn = null; 
        this.createNote();
    }

    createNote() {
        // Create textarea element
        this.element = document.createElement('textarea');
        this.element.value = this.content;

        //Create remove button
        this.removeBtn = document.createElement('button');
        this.removeBtn.innerHTML = MESSAGES.removeBtn;
        this.removeBtn.onclick = () => this.remove();

        // Append textarea and button to container
        this.container.appendChild(this.element);
        this.container.appendChild(this.removeBtn);
    }

    remove() {
        this.container.removeChild(this.element);
        this.container.removeChild(this.removeBtn);

        //Remove from notesList
        notesList = notesList.filter(note => note !== this);
        saveNotesToLocalStorage();
    }

}

//Keeps track of all notes within a 2 second interval
let notesList = [];

document.getElementById('addNoteBtn').onclick = () => {
    //Loop through local storage and create new notes
    const notesContainer = document.getElementById('notesContainer');
    const newNote = new Note('', notesContainer);
    notesList.push(newNote);
    saveNotesToLocalStorage();
}

function saveNotesToLocalStorage() {
    //Creates a new array with the content only of each note
    const notesContent = notesList.map(note => note.element.value);

    //Converts the array to a JSON string and saves it to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesContent));

    updateTimestamp(MESSAGES.lastSaved);
}

function updateTimestamp(message) {
    const now = new Date().toLocaleTimeString();
    document.getElementById('timestamp').innerText = `${message} ${now}`;
}

function loadNotesFromLocalStorage() {
    const notesContainer = document.getElementById('notesContainer');

    //Retrieve notes from local storage and parse the JSON string back to an array
    const savedNotes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    savedNotes.forEach(content => {
        const note = new Note(content, notesContainer);
        notesList.push(note);
    });
}

//Save notes to local storage every 2 seconds
setInterval(saveNotesToLocalStorage, 2000);
