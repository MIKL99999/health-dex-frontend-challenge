import React from 'react';
import {Link} from "react-router-dom";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import '../styles/pokemon-list-item.scss';


const getFillerColor = (base_stat) => {
    if (base_stat <= 25) {
        return 'red';
    } else if (base_stat <= 75) {
        return 'orange';
    } else {
        return 'green';
    }
};

/**
 * 255 - is a max value of state.
 *
 * @param {number} base_stat
 * @returns {number}
 */
const calcFillerPercent = (base_stat) => base_stat * 100 / 255;


/**
 * @returns {null}
 */
export default function PokemonListItem({pokemon}) {
    return pokemon.info ? (
        <li className="pokemon-list-item">
            <div className="pokemon-list-item__container">
                <img src={pokemon.info.sprites.front_default}/>

                <div className="pokemon-list-item__info">
                    <Link to={`/pokemon/${pokemon.name}`}>{capitalizeFirstLetter(pokemon.name)}</Link>

                    <div className="pokemon-list-item__info-item">
                        <span>National №</span>
                        <span>{pokemon.info.id}</span>
                    </div>

                    <div className="pokemon-list-item__info-item">
                        <span>Types</span>
                        <div>
                            {pokemon.info.types.map((type) => type.type.name)}
                        </div>
                    </div>

                    <div className="pokemon-list-item__info-item">
                        <span>Height</span>
                        <span>{pokemon.info.height / 10} m</span>
                    </div>

                    <div className="pokemon-list-item__info-item">
                        <span>Weight</span>
                        <span>{pokemon.info.weight / 10} kg</span>
                    </div>


                    <div className="pokemon-list-item__info-item">
                        <span>Abilities</span>

                        <div>
                            {pokemon.info.abilities.map(({ability, is_hidden}) =>
                                <div>
                                    <span>{ability.name}</span>
                                    {is_hidden ? <span>(hidden)</span> : null}
                                </div>)}
                        </div>
                    </div>

                </div>
            </div>


            <div className="pokemon-list-item__stats">
                <span>Base stats</span>

                <div className="pokemon-list-item__stats-table">
                    {pokemon.info.stats.reverse().map(({base_stat, stat}) => (
                        <div className="pokemon-list-item__stats-item">
                            <span>{capitalizeFirstLetter(stat.name)}</span>
                            <span>{base_stat}</span>

                            <div className="pokemon-list-item__stats-item__line">
                                <div
                                    className="pokemon-list-item__stats-item__line-filler"
                                    style={{
                                        width: `${calcFillerPercent(base_stat)}%`,
                                        backgroundColor: getFillerColor(base_stat),
                                    }}
                                />
                            </div>
                        </div>))}
                </div>
            </div>
        </li>
    ) : null;
}