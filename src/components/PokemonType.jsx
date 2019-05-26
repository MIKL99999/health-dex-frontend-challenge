import React from 'react';
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


export default PokemonType;
