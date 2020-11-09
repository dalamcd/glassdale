import { getCriminals, useCriminals } from "../criminals/CriminalsProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container");

const render = (criminalsArray) => {

    contentTarget.innerHTML = `
        <p><input type="date" id="note-date"></p>
        <input type="text" id="note-author">
        <select id="note-subject">
        ${criminalsArray.map(criminal =>
            `<option value=${criminal.id}>${criminal.name}</option>`
        )}
        </select>
        <textarea placeholder="Enter note" id="note-text"></textarea>
        <button id="saveNote">Save Note</button>`
}

export const NoteForm = () => {
    getCriminals().then(() => {
        render(useCriminals())
    });
}


eventHub.addEventListener("click", e => {
    if(e.target.id.startsWith("delete--")) {
        eventHub.dispatchEvent(new CustomEvent("deleteButtonClicked", {
            detail: {
                id: e.target.id
            }
        }));
    }
});