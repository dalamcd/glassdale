import { getWitnesses } from "../witnesses/WitnessProvider.js";
import { facilityCard } from "./Facility.js";
import { useFacilities } from "./FacilityProvider.js";

const eventHub = document.querySelector(".container");

eventHub.addEventListener("click", e => {
    if(e.target.id === "listFacilities")
        FacilityList();
})

export const FacilityButton = () => {
        const contentTarget = document.querySelector(".filters")
        contentTarget.insertAdjacentHTML("beforeend", `<button id="listFacilities">List Facilities</button>`);
}

const render = htmlString => {
    const contentTarget = document.querySelector(".criminalsContainer");
    contentTarget.innerHTML = htmlString;
}

export const FacilityList = () => {

    getWitnesses().then(() => {
        const facilityList = useFacilities();
        if (facilityList.length) {
            let facilityHTML = "";
            facilityHTML += facilityList.map(facility => facilityCard(facility)).join("");
            render(facilityHTML);
        }
    })
}