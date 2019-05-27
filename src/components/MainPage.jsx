import React, {Fragment} from 'react';
import PokemonTypeFilter from './PokemonTypeFilter';
import PokemonList from './PokemonList';

export default function MainPage() {
    return (
        <Fragment>
            <PokemonTypeFilter/>
            <PokemonList/>
        </Fragment>
    )
}
