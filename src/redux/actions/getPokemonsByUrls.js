import {setPokemons} from './index';
import pokeapi from '../../fetch/pokeapi';


const getPokemonsByUrls = (pokemonsUrls) => async (dispatch, getState) => {
    const pokemonsInfoList = await pokeapi.resource(pokemonsUrls);

    const {pokemons} = getState();

    const pokemonsWithInfo = pokemons.withMutations((pokemonsMut) => {
        pokemonsInfoList.forEach((pokemonsInfo) => {
            pokemonsInfo.abilities.sort((a, b) => a.slot - b.slot);

            pokemonsMut.setIn([pokemonsInfo.name, 'info'], pokemonsInfo);
        })
    });

    return dispatch(setPokemons(pokemonsWithInfo));
};

export default getPokemonsByUrls;
