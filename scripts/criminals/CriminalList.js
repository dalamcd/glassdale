import { getCriminals, useCriminals } from "./CriminalsProvider.js";
import { criminalCard } from "./Criminal.js"

export const CriminalList = () => {

    getCriminals()
        .then( () => {
            let criminalHTML = "";
            useCriminals().forEach( criminal => {
                criminalHTML += criminalCard(criminal)
            });
            const contentElement = document.querySelector(".criminalsContainer");

            contentElement.innerHTML = criminalHTML;
        });
}