
export const noteCard = note => {

    return `<div class="note"><h3>${note.author}</h3>
    <p>Subject: ${note.subject}</p>
    <p>Date: ${new Date(note.date).toLocaleDateString('en-US')}</p>
    <p>Note: ${note.text}<p></div>`
}