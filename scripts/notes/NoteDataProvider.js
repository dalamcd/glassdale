const eventHub = document.querySelector(".container")
let notes = [];

const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged")

    eventHub.dispatchEvent(noteStateChangedEvent)
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        // Make a new object representation of a note
        const newNote = {
            date: document.querySelector("#note-date").value,
            author: document.querySelector("#note-author").value,
            timestamp: Date.now(),
            criminalId: document.querySelector("#note-subject").value,
            text: document.querySelector("#note-text").value
        }

        // Change API state and application state
        saveNote(newNote)
    }
})

eventHub.addEventListener("deleteButtonClicked", e => {
    const [temp, id] = e.detail.id.split("--");
    fetch(`http://localhost:8088/notes/${id}`, {
        method: "DELETE"
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
})

export const useNotes = () => notes.slice();

export const getNotes = () => {

    return fetch('http://localhost:8088/notes')
        .then(response => response.json())
        .then(parsedNotes => {
            notes = parsedNotes
        })
}

export const saveNote = note => {
    return fetch('http://localhost:8088/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}