import { noteCard } from "./Note.js";
import { getNotes, useNotes } from "./NoteDataProvider.js"

const eventHub = document.querySelector(".container")
const contentElement = document.querySelector(".notesContainer");

export const NoteList = () => {
    let notes;
    getNotes()
    .then(() => {
        notes = useNotes();
        render(notes);
    });
}

const render = (notes) => {
    let noteHTML = "";
    notes.forEach(note => {
        noteHTML += noteCard(note);
    });
    contentElement.innerHTML = noteHTML;
}

eventHub.addEventListener("noteStateChanged", NoteList)