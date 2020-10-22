import { officerCard } from "./Officer.js";
import { getOfficers, useOfficers } from "./OfficerProvider.js";

const contentElement = document.querySelector(".officersContainer")

const render = (officerList) => {
    let officerHTML = "";
    officerList.forEach(officerObj => {
        officerHTML += officerCard(officerObj)
    });
    contentElement.innerHTML += officerHTML;
}

export const OfficerList = () => {

    getOfficers().then(() => {
        render(useOfficers());
    })
}