import { getCriminals, useCriminals } from "./CriminalsProvider.js";


export const CriminalList = () => {

    let criminalHTML = "";

    getCriminals()
        .then( () => {
            useCriminals().forEach( criminal => {
                criminalHTML += `<div class="criminal__scum">
                    <p>${criminal.name}</p>
                    <p>Age: ${criminal.age}</p>
                    <p>Crime: ${criminal.conviction}</p>
                    <p>Term start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</p>
                    <p>Term end: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}</p>
                </div>`
            });
            const contentElement = document.querySelector(".criminalsContainer");

            contentElement.innerHTML = criminalHTML;
        });
}