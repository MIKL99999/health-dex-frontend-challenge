import React from 'react';
import PokemonTypeFilter from './PokemonTypeFilter';
import PokemonList from './PokemonList';
import '../styles/main-page.scss';

export default function MainPage() {
    return (
        <div className="main-page">
            <PokemonTypeFilter/>
            <PokemonList/>
        </div>
    )
}
