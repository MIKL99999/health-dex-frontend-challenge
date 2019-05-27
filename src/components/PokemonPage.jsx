import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {OrderedMap} from 'immutable';
import {withRouter} from 'react-router';
import {MoonLoader} from 'react-spinners';
import pokeapi from '../fetch/pokeapi';
import MovesList from './MovesList';
import PokemonsEvolutionTree from './PokemonsEvolutionTree';
import getPokemonsByNames from '../redux/actions/getPokemonsByNames';
import '../styles/pokemon-page.scss';


class PokemonPage extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        pokemons: PropTypes.instanceOf(OrderedMap).isRequired,
        getPokemonsByNames: PropTypes.func.isRequired,
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

    /**
     * @param {string} pokemonName
     */
    async setPokemonMoves(pokemonName) {
        const pokemon = this.props.pokemons.get(pokemonName);
        if (pokemon) {
            this.setState({moves: pokemon.info.moves});
        } else {
            const pokemon = await pokeapi.getPokemonByName(pokemonName);
            this.setState({moves: pokemon.moves});
        }
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
        const {evolutionChain, moves} = this.state;

        return (
            <div className="pokemon-page">
                <button
                    className="pokemon-page__home-button"
                    onClick={() => this.props.history.push('')}
                >
                    Home
                </button>
                <div className="pokemon-page__container">
                    {
                        evolutionChain ?
                            (
                                <PokemonsEvolutionTree
                                    evolutionChain={evolutionChain}
                                />)
                            :
                            (
                                <MoonLoader/>
                            )
                    }

                    <MovesList moves={moves}/>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(({pokemons}) => ({pokemons}), {getPokemonsByNames})(PokemonPage));
