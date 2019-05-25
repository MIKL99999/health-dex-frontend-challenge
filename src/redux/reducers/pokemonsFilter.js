import {SET_POKEMONS_FILTER} from "../actions";

const pokemonsFilter = (
    state = {currentType: null, filteredPokemonNames: []},
    action
) => {
    switch (action.type) {
        case SET_POKEMONS_FILTER:
            return action.pokemonsFilter;
        default:
            return state;
    }
};

export default pokemonsFilter;
