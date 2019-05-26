import {setPokemons} from './pokemonsActions';
import pokeapi from '../../fetch/pokeapi';


/**
 * @param {Array<String>} pokemonNames
 * @returns {function}
 */
const getPokemonsByNames = (pokemonNames) => async (dispatch, getState) => {
    try {
        const promises = pokemonNames.map((name) => pokeapi.getPokemonByName(name));
        const pokemonsInfoList = await Promise.all(promises);
        const {pokemons} = getState();

        const pokemonsWithInfo = pokemons.withMutations((pokemonsMut) => {
            pokemonsInfoList.forEach((pokemonsInfo) => {
                pokemonsInfo.abilities.sort((a, b) => a.slot - b.slot);

                pokemonsMut.setIn([pokemonsInfo.name, 'info'], pokemonsInfo);
            })
        });

        dispatch(setPokemons(pokemonsWithInfo));

        return pokemonsInfoList;
    } catch (e) {
        console.error(e);
    }
};

export default getPokemonsByNames;
