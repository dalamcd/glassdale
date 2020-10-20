import { getCriminals, useCriminals } from "./CriminalsProvider.js";
import { criminalCard } from "./Criminal.js"

const eventHub = document.querySelector(".container")
const contentElement = document.querySelector(".criminalsContainer");

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {
    // Use the property you added to the event detail.
    if (event.detail.crimeThatWasChosen !== "0"){
        /*
            Filter the criminals application state down to the people that committed the crime
        */
        const matchingCriminals = useCriminals().filter( (crimObj) => {
            return crimObj.conviction === event.detail.crimeThatWasChosen
        }); 

        let criminalHTML = "";
        matchingCriminals.forEach( criminal => {
            criminalHTML += criminalCard(criminal)
        });

        render(criminalHTML);
    }
})

const render = (criminalHTML) => {
    contentElement.innerHTML = criminalHTML;
}

export const CriminalList = () => {

    getCriminals()
        .then( () => {
            let criminalHTML = "";
            useCriminals().forEach( criminal => {
                criminalHTML += criminalCard(criminal)
            });
        render(criminalHTML);
        });
}