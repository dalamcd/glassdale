import { getCriminals, useCriminals } from "./CriminalsProvider.js";
import { criminalCard } from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionProvider.js";

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
    render(filteredCriminals);
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

    render(matchingCriminals);
});

eventHub.addEventListener("associatesButton", e => {
    const criminalTarget = document.querySelector(`#criminal--${e.detail.criminalID}`)
    if (previousCriminal) {
        const preCrimObj = findCriminal(previousCriminal)
        const previousTarget = document.querySelector(`#criminal--${preCrimObj.id}`)
        previousTarget.innerHTML = criminalCard(preCrimObj, true);
    }

    const criminalAssociates = findCriminal(e.detail.criminalID).known_associates;
    criminalTarget.innerHTML += criminalAssociates.map(crim => {
        return `<p>Name: ${crim.name}</p>
        <p>Alibi: ${crim.alibi}`;
    });

    previousCriminal = e.detail.criminalID;
});

const findCriminal = id => useCriminals().find(crim => crim.id === id);

const render = (criminalArray) => {
    let criminalHTML = "";
    criminalArray.forEach(crimObj => {
        criminalHTML += criminalCard(crimObj);
    });
    contentElement.innerHTML = criminalHTML;
}

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            render(useCriminals());
        });
}