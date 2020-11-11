export const criminalCard = (criminal, facilities, replaceCard = false) => {
    return `${replaceCard ? `` : `<div class="criminal__scum" id="criminal--${criminal.id}">`}
                <p>${criminal.name}</p>
                <p>Age: ${criminal.age}</p>
                <p>Crime: ${criminal.conviction}</p>
                <p>Term start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</p>
                <p>Term end: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}</p>
                <button id="associates--${criminal.id}">Associate Alibis</button>
            <div>
                <h2>Facilities</h2>
                <ul>
                    ${facilities.map(fc => `<li>${fc.facilityName}</li>`).join("")}
                </ul>
            </div>
            ${replaceCard ? `` : `</div>`}`

}