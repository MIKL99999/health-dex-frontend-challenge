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

    const weightInKg = weight / 10;

    return (
        <div className="pokemon-info">
            <Link to={`/pokemon/${pokemon.name}`}>
                {capitalizeFirstLetter(pokemon.name)}
            </Link>

            <div className="pokemon-info__item">
                <span>National №</span>
                <span>{id}</span>
            </div>

            <div className="pokemon-info__item">
                <span>Types</span>
                <PokemonTypesGroup types={types}/>
            </div>

            <div className="pokemon-info__item">
                <span>Height</span>
                <span>{height / 10} m</span>
            </div>

            <div className="pokemon-info__item">
                <span>Weight</span>
                <span>{convertKgToLbs(weightInKg)} lbs ({weightInKg} kg)</span>
            </div>


            <div className="pokemon-info__item">
                <span>Abilities</span>

                <div>
                    {abilities.map(({ability, is_hidden}) =>
                        <div key={ability.name}>
                            <span>{ability.name}</span>
                            {is_hidden ? <span>(hidden)</span> : null}
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
