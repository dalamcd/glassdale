const contentTarget = document.querySelector(".noteFormContainer")

const render = () => {
    contentTarget.innerHTML = `
        Put some input fields and prompts here
        <p><input type="date" id="note-date"></p>
        <input type="text" id="note-author">
        <input type="text" id="note-subject">
        <textarea placeholder="Enter note" id="note-text"></textarea>
        <button id="saveNote">Save Note</button>`
}

export const NoteForm = () => {
    render()
}