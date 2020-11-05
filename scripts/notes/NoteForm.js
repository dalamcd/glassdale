import { getCriminals, useCriminals } from "../criminals/CriminalsProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")

const render = () => {
    getCriminals().then(() => {
        contentTarget.innerHTML = `
            Put some input fields and prompts here
            <p><input type="date" id="note-date"></p>
            <input type="text" id="note-author">
            <select id="note-subject">
            ${
                useCriminals().map(criminal =>
                    `<option value=${criminal.id}>${criminal.name}</option>`
                )
            }
            </select>
            <textarea placeholder="Enter note" id="note-text"></textarea>
            <button id="saveNote">Save Note</button>`
    });
}

export const NoteForm = () => {
    render()
}