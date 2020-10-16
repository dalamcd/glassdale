import { getCriminals, useCriminals } from "./CriminalsProvider.js";
import { criminalCard } from "./Criminal.js"


export const CriminalList = () => {

    let criminalHTML = "";

    getCriminals()
        .then( () => {
            useCriminals().forEach( criminal => {
                criminalHTML += criminalCard(criminal)
            });
            const contentElement = document.querySelector(".criminalsContainer");

            contentElement.innerHTML = criminalHTML;
        });
}