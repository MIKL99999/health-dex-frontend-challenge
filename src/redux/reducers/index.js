import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import ui from './ui';
import pokemons from './pokemons';
import pokemonsFilter from './pokemonsFilter';


export default combineReducers({
    pokemons,
    pokemonsFilter,
    ui,
    routing: routerReducer
});
