import { witnessCard } from "./Witness.js";
import { getWitnesses, useWitnesses } from "./WitnessProvider.js";

const eventHub = document.querySelector(".container");

eventHub.addEventListener("click", e => {
    if (e.target.id === "listWitnesses") {
        WitnessList();
    }
});

export const WitnessButton = () => {
    const contentTarget = document.querySelector(".filters")
    contentTarget.insertAdjacentHTML("beforeend", `<button id="listWitnesses">List Witnesses</button>`);
}

const render = htmlString => {
    const contentTarget = document.querySelector(".criminalsContainer");
    contentTarget.innerHTML = htmlString;
}

export const WitnessList = () => {

    getWitnesses().then(() => {
        const witnessList = useWitnesses();
        if (witnessList.length) {
            let witnessHTML = "";
            witnessHTML += witnessList.map(witness => witnessCard(witness)).join("");
            render(witnessHTML);
        }
    })
}