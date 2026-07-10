const notesBox = document.getElementById('notes-box');
const saveNotes = document.getElementById('save-notes');
const clearNotes = document.getElementById('clear-notes');

// Load saved notes from localStorage when the page loads

notesBox.value = localStorage.getItem('notes') || '';

// Save notes to localStorage when the save button is clicked

saveNotes.addEventListener('click', () => {
    localStorage.setItem('notes', notesBox.value);
    alert('Notes saved!');
});

// Clear notes from localStorage and the textarea when the clear button is clicked
clearNotes.addEventListener('click', () => {
    notesBox.value = "";
    localStorage.removeItem('notes');
    alert('Notes cleared!');
});

