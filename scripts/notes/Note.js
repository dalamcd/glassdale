import { useCriminals } from "../criminals/CriminalsProvider.js"

export const noteCard = (note, criminals) => {
    return `<div class="note"><h3>${note.author}</h3>
    <p>Subject: ${criminals.find(criminal => parseInt(note.criminalId) === criminal.id).name}</p>
    <p>Date: ${new Date(note.date).toLocaleDateString('en-US')}</p>
    <p>Note: ${note.text}</p>
    <button id="delete--${note.id}">Delete</button>
    </div>`
}