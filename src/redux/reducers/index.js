import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux'
import pokemons from './pokemons';
import pokemonsFilter from './pokemonsFilter';

export default combineReducers({
  pokemons,
  pokemonsFilter,
  routing: routerReducer
});
