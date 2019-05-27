import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import pokeapi from '../fetch/pokeapi';
import MovesList from './MovesList';
import PokemonsEvolutionTree from './PokemonsEvolutionTree';
import getPokemonsByNames from '../redux/actions/getPokemonsByNames';


class PokemonPage extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    state = {
        moves: [],
        evolutionChain: null,
    };

    componentDidMount() {
        const pokemonName = this.props.match.params.pokemon;

        this.setPokemonMoves(pokemonName);

        this.setPokemonEvolutionChain(pokemonName);
    }

    setPokemonMoves(pokemonName) {
        const pokemon = this.props.pokemons.get(pokemonName);
        const moves = pokemon.info.moves;

        this.setState({moves});
    }

    async setPokemonEvolutionChain(pokemonName) {
        try {
            const pokemonSpecies = await pokeapi.getPokemonSpeciesByName(pokemonName);

            const evolutionChain = await pokeapi.resource(pokemonSpecies.evolution_chain.url);

            evolutionChain.chain = await this.addPokemonsInfoInEvolutionChain(evolutionChain.chain);

            this.setState({evolutionChain});
        } catch (e) {
            console.error(e);
        }
    }

    addPokemonsInfoInEvolutionChain = async (chain) => {
        try {
            const name = chain.species.name;

            chain.info = await pokeapi.getPokemonByName(name);

            const promises = chain.evolves_to.map((c) => this.addPokemonsInfoInEvolutionChain(c));
            await Promise.all(promises);

            return chain;
        } catch (e) {
            console.error(e);
        }
    };


    render() {
        const {evolutionChain} = this.state;

        return (
            <div>
                {
                    evolutionChain && (
                        <PokemonsEvolutionTree
                            evolutionChain={evolutionChain}
                        />)
                }

                <MovesList moves={this.state.moves}/>
            </div>
        );
    }
}

export default withRouter(connect(({pokemons}) => ({pokemons}), {getPokemonsByNames})(PokemonPage));
