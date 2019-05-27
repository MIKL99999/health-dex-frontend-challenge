import React from 'react';
import PropTypes from 'prop-types';
import PokemonType from './PokemonType';
import '../styles/pokemon-types-group.scss';


const PokemonTypesGroup = ({types}) => {
    return (
        <div className="pokemon-types-group">
            {types.map(({type}) =>
                <PokemonType
                    key={type.name}
                    type={type.name}
                />
            )}
        </div>
    );
};

PokemonTypesGroup.propTypes = {
    types: PropTypes.array.isRequired,
};

export default PokemonTypesGroup;
