document.getElementById('readerPage').innerText = MESSAGES.readerPage;
document.getElementById('homeBtn').innerText = MESSAGES.homeBtn;
document.getElementById('readerPageHeader').innerText = MESSAGES.readerPage;

function displayNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = ''; //Clear existing notes

    const data = localStorage.getItem(STORAGE_KEY);
    const notes = JSON.parse(data) || [];

    notes.forEach(content => {
        const textarea = document.createElement('textarea');
        textarea.value = content;
        textarea.readOnly = true; //Make it read-only
        notesContainer.appendChild(textarea);
    });

    updateTimestamp(MESSAGES.lastRetrieved);
}

function updateTimestamp(message) {
    const now = new Date().toLocaleTimeString();
    document.getElementById('timeStamp').innerText = `${message} ${now}`;
}

setInterval(displayNotes, 2000);