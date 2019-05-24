import React from 'react';
import PropTypes from "prop-types";
import PokemonIcon from './PokemonIcon';
import PokemonInfo from './PokemonInfo';
import PokemonStats from './PokemonStats';
import '../styles/pokemon-list-item.scss';


/**
 * @returns {React.Element|null}
 */
export default function PokemonListItem({pokemon}) {
    if (!pokemon.info) {
        return null;
    }

    return (
        <li className="pokemon-list-item">
            <div className="pokemon-list-item__container">
                <PokemonIcon pokemon={pokemon}/>
                <PokemonInfo pokemon={pokemon}/>
            </div>

            <PokemonStats stats={pokemon.info.stats}/>
        </li>
    );
}

PokemonListItem.propTypes = {
    pokemon: PropTypes.object.isRequired,
};
