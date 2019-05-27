import React from 'react';
import PropTypes from 'prop-types';
import {getTypeColor} from '../utils/getTypeColor';
import '../styles/pokemon-type.scss';

const PokemonType = ({type}) => {
    return (
        <div
            style={{backgroundColor: getTypeColor(type)}}
            className="pokemon-type"
        >
            {type.toUpperCase()}
        </div>
    );
};

PokemonType.propTypes = {
    type: PropTypes.string.isRequired,
};

export default PokemonType;
