const Pokeapi = require('pokeapi-js-wrapper');
const options = {
    protocol: 'https',
};
const pokeapi = new Pokeapi.Pokedex(options);

export default pokeapi;
