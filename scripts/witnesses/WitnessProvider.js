let witnesses = [];

export const getWitnesses = () => {
    return fetch("https://criminals.glassdale.us/witnesses")
    .then( response => response.json() )
    .then( parsedWitnesses => {
        witnesses = parsedWitnesses;
    });
}

export const useWitnesses = () => witnesses.slice();