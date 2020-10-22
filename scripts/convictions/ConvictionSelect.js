/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { getConvictions, useConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container");

export const ConvictionSelect = () => {
    // Get all convictions from application state
    getConvictions().then(() => {
        const convictions = useConvictions()
        render(convictions)
    });
}

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {
    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: parseInt(event.target.value)
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

const render = convictionsCollection => {
    /*
        Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${convictionsCollection.map(convObj => `<option value="${convObj.id}">${convObj.name}</option>`).join("")}
        </select>
    `
}