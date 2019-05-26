import {OrderedMap} from 'immutable';
import {SET_POKEMONS} from '../actions/pokemonsActions';

const pokemons = (
    state = OrderedMap(),
    action,
) => {
    switch (action.type) {
        case SET_POKEMONS:
            return action.pokemons;
        default:
            return state;
    }
};

export default pokemons;
