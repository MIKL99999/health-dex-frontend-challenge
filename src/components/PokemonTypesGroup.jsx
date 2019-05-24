import React from "react";
import PokemonType from "./PokemonType";
import '../styles/pokemon-types-group.scss';


const PokemonTypesGroup = ({types}) => {
    return (
        <div className="pokemon-types-group">
            {types.map(({type}) =>
                <PokemonType key={type.name} type={type.name}/>
            )}
        </div>
    );
};

export default PokemonTypesGroup;
