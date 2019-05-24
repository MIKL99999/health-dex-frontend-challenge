import PropTypes from "prop-types";
import React from "react";

const PokemonIcon = ({pokemon}) => {
    const {name, sprites} = pokemon.info;
    return (
        <img
            alt={name}
            src={sprites.front_default}
            className="pokemon-list-item__img"
        />
    );
};

PokemonIcon.propTypes = {
    pokemon: PropTypes.object.isRequired,
};

export default PokemonIcon;
