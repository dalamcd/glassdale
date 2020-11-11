import { getCriminals, useCriminals } from "./CriminalsProvider.js";
import { criminalCard } from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { getCriminalFacilities, useCriminalFacilities } from "../facility/CriminalFacilityProvider.js";
import { getFacilities, useFacilities } from "../facility/FacilityProvider.js";

const eventHub = document.querySelector(".container")
const contentElement = document.querySelector(".criminalsContainer");
let previousCriminal = 0;

eventHub.addEventListener("officerSelected", event => {
    // How can you access the officer name that was selected by the user?
    const officerName = event.detail.officer;

    // How can you get the criminals that were arrested by that officer?
    const criminals = useCriminals()
    const filteredCriminals = criminals.filter(criminalObject => {
        if (criminalObject.arrestingOfficer === officerName) {
            return true;
        }
    });
    render(filteredCriminals, useCriminalFacilities(), useFacilities());
});

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {
    // Use the property you added to the event detail.
    if (!event.detail.crimeThatWasChosen) {
        CriminalList();
        return;
    }
    const convictionsArray = useConvictions();
    const chosenConviction = convictionsArray.find(convObj => convObj.id === event.detail.crimeThatWasChosen);

    const matchingCriminals = useCriminals().filter((crimObj) => {
        return crimObj.conviction === chosenConviction.name;
    });

    render(matchingCriminals, useCriminalFacilities(), useFacilities());
});

eventHub.addEventListener("associatesButton", e => {
    const criminalTarget = document.querySelector(`#criminal--${e.detail.criminalID}`)
    if (previousCriminal) {
        const preCrimObj = findCriminal(previousCriminal)
        const facilitiesList = useCriminalFacilities().filter(fc => fc.criminalId === preCrimObj.id);
        const facilities = facilitiesList.map(fac => useFacilities().find(fc => fc.id === fac.facilityId));
        const previousTarget = document.querySelector(`#criminal--${preCrimObj.id}`)
        if(previousTarget)
            previousTarget.innerHTML = criminalCard(preCrimObj, facilities, true);
    }

    const criminalAssociates = findCriminal(e.detail.criminalID).known_associates;
    criminalTarget.innerHTML += criminalAssociates.map(crim => {
        return `<p>Name: ${crim.name}</p>
        <p>Alibi: ${crim.alibi}`;
    });

    previousCriminal = e.detail.criminalID;
});

eventHub.addEventListener("click", e => {
    if(e.target.id === "listCriminal")
        CriminalList();
});

const findCriminal = id => useCriminals().find(crim => crim.id === id);

const render = (criminalArray, crimFacArray, facArray) => {
    let criminalHTML = "";
    criminalArray.forEach(crimObj => {
        const facilitiesList = crimFacArray.filter(fc => fc.criminalId === crimObj.id);
        const facilities = facilitiesList.map(fac => facArray.find(fc => fc.id === fac.facilityId));
        criminalHTML += criminalCard(crimObj, facilities);
    });
    contentElement.innerHTML = criminalHTML;
}

export const CriminalButton = () => {

        const contentTarget = document.querySelector(".filters")
        contentTarget.insertAdjacentHTML("beforeend", `<button id="listCriminal">List Criminals</button>`);
}

export const CriminalList = () => {

    getCriminals()
        .then(getCriminalFacilities)
        .then(getFacilities)
        .then(() => {
            render(useCriminals(), useCriminalFacilities(), useFacilities());
        });
}