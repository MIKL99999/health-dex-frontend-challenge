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


        const evolutionChains = await this.getEvolutionChains();
        const evolutionChain = this.findEvolutionChainByPokemonName(evolutionChains, pokemonName);
        console.log(evolutionChain);

        this.setState({evolutionChain});
    }


    findEvolutionChainByPokemonName = (evolutionChains, pokemonName) => {
        return evolutionChains.find((evolutionChain) => {
            const chain = evolutionChain.chain;

            return this.searchPokemonNameInChain(chain, pokemonName);
        });
    };

    searchPokemonNameInChain = (chain, pokemonName) => {
        if (chain.species.name === pokemonName) {
            return true;
        }

        return chain.evolves_to.find((c) => this.searchPokemonNameInChain(c, pokemonName));
    };

    /**
     * @returns {Array}
     */
    getEvolutionChains = async () => {
        const evolutionChainsUrls = await pokeapi.getEvolutionChainsList();

        const promises = evolutionChainsUrls.results.map(({url}) => {
            const str = '/evolution-chain/';
            const index = url.indexOf(str);
            const id = url.slice(index + str.length, -1);

            return pokeapi.getEvolutionChainById(id);
        });

        return Promise.all(promises);
    };

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
