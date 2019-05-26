/**
 * @param {string} type
 * @returns {string}
 */
export const getTypeColor = (type) => {
    switch (type) {
        case 'poison':
            return 'purple';
        case 'fire':
            return 'red';
        case 'grass':
            return 'green';
        case 'flying':
            return 'blue';
        case 'water':
            return 'aqua';
        case 'bug':
            return 'darkgreen';
        case 'normal':
            return 'gray';
        case 'electric':
            return 'gold';
        case 'ground':
            return 'brown';
        case 'psychic':
            return 'fuchsia';
        case 'fairy':
            return 'yellow';
        case 'fighting':
            return 'darkred';
        case 'ice':
            return 'aliceblue';
        case 'ghost':
            return 'darkgray';
        case 'rock':
            return 'lightslategray';
        case 'steel':
            return 'lightsteelblue';
        case 'dragon':
            return 'orange';
        case 'dark':
            return 'black';
        default:
            throw Error('unknown pokemon type: ' + type);
    }
};