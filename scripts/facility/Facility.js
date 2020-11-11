import { useCriminals } from "../criminals/CriminalsProvider.js"
import { useCriminalFacilities } from "./CriminalFacilityProvider.js"
import { useFacilities } from "./FacilityProvider.js"

export const facilityCard = facility => {
    return `<div class="facility">
    <p>${facility.facilityName}</p>
    <p>Security Level: ${facility.securityLevel}</p>
    <p>Capacity: $${facility.capacity}</p>
    <p>Criminals:</p>
    ${useCriminalFacilities().map(fac => {
        if (fac.facilityId === facility.id) {
            return `${useCriminals().find(crim => crim.id === fac.criminalId).name}<br>`
        }
    }).join("")}
    </div>`
}