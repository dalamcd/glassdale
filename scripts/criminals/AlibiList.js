const eventHub = document.querySelector(".container");

export const AlibiList = () => {
    eventHub.addEventListener("click", e => {

        if (e.target.id.startsWith("associates--")) {
            const [temp, criminalID] = e.target.id.split("--");

            const customEvent = new CustomEvent("associatesButton", { detail: { criminalID: parseInt(criminalID) } });
            eventHub.dispatchEvent(customEvent);
        }
    })
}