import { getCriminals, useCriminals } from "./CriminalsProvider.js";
import { criminalCard } from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionProvider.js";

const eventHub = document.querySelector(".container")
const contentElement = document.querySelector(".criminalsContainer");

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

    const matchingCriminals = useCriminals().filter( (crimObj) => {
        return crimObj.conviction === chosenConviction.name;
    });

    render(matchingCriminals);
})

const render = (criminalArray) => {
    let criminalHTML = "";
    criminalArray.forEach(crimObj => {
        criminalHTML += criminalCard(crimObj);
    });
    contentElement.innerHTML = criminalHTML;
}

export const CriminalList = () => {

    getCriminals()
        .then( () => {
            render(useCriminals());
        });
}