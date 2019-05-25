import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import pokeapi from '../fetch/pokeapi';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';


class PokemonPage extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    state = {
        movesList: [],
        evolutionChain: null,
    };

    async componentDidMount() {
        const {pokemons, match} = this.props;

        const pokemonName = match.params.pokemon;
        const pokemon = pokemons.get(pokemonName);
        const movesList = pokemon.info.moves;

        this.setState({movesList});

        const pokemonSpecies = await pokeapi.getPokemonSpeciesByName(pokemonName);
        const chainUrl = pokemonSpecies.evolution_chain.url;
        const evolutionChain = await pokeapi.resource(chainUrl);

        console.log(evolutionChain);

        // TODO Add info to each pokemon is chan

        this.setState({evolutionChain});
    }

    render() {

        return (
            <div>
                <ul>
                    {this.state.movesList.map(({move}) =>
                        <li key={move.name}>{capitalizeFirstLetter(move.name)}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default withRouter(connect(({pokemons}) => ({pokemons}))(PokemonPage));
