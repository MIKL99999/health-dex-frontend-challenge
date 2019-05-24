import React, {PureComponent} from 'react';
import PokemonTypes from "./PokemonTypes";
import PokemonList from "./PokemonList";

export default class Main extends PureComponent {
    render() {
        return(
            <div>
                <PokemonTypes/>
                <PokemonList/>
            </div>
        )
    }
}
