import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PokemonTypesGroup from './PokemonTypesGroup';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import convertKgToLbs from '../utils/convertKgToLbs';
import '../styles/pokemon-info.scss';


const PokemonInfo = ({pokemon}) => {
    const {
        id,
        types,
        height,
        weight,
        abilities,
    } = pokemon.info;

    // by default weight in hectograms
    const weightInKg = weight / 10;

    return (
        <div className="pokemon-info">
            <Link to={`/pokemon/${pokemon.name}`} className="pokemon-info__name">
                {capitalizeFirstLetter(pokemon.name)}
            </Link>

            <div className="pokemon-info__item">
                <span className="pokemon-info__item-name">National №</span>
                <span className="pokemon-info__item-data">{id}</span>
            </div>

            <div className="pokemon-info__item">
                <span className="pokemon-info__item-name">Types</span>
                <PokemonTypesGroup types={types}/>
            </div>

            <div className="pokemon-info__item">
                <span className="pokemon-info__item-name">Height</span>
                <span className="pokemon-info__item-data">{height / 10} m</span>
            </div>

            <div className="pokemon-info__item">
                <span className="pokemon-info__item-name">Weight</span>
                <span className="pokemon-info__item-data">
                    {convertKgToLbs(weightInKg).toFixed(1)} lbs ({weightInKg} kg)
                </span>
            </div>


            <div className="pokemon-info__item">
                <span className="pokemon-info__item-name">Abilities</span>
                <div>
                    {abilities.map(({ability, is_hidden}) =>
                        <div key={ability.name}>
                            <span className="pokemon-info__item-data">{capitalizeFirstLetter(ability.name)}</span>
                            {is_hidden ? <span> (hidden)</span> : null}
                        </div>)}
                </div>
            </div>

        </div>
    );
};

PokemonInfo.propTypes = {
    pokemon: PropTypes.object.isRequired,
};


export default PokemonInfo;
