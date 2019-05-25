import React, {Component} from 'react';
import {connect} from 'react-redux';
import pokeapi from '../fetch/pokeapi';
import getPokemonsByUrls from '../redux/actions/getPokemonsByUrls';
import {setPokemonsFilter} from '../redux/actions';


class PokemonTypes extends Component {
    state = {
        typesList: [],
    };

    static defaultFilterValue = 'Choose pokemon type';

    async componentDidMount() {
        const res = await pokeapi.getTypesList();
        this.setState({typesList: res.results});
    }

    /**
     * @param {Event} event
     */
    handleTypeChange = async (event) => {
        const type = event.target.value;

        const {getPokemonsByUrls, setPokemonsFilter} = this.props;

        if (type === PokemonTypes.defaultFilterValue) {
            setPokemonsFilter({currentType: null, filteredPokemonNames: []});
        } else {
            const typeData = await pokeapi.getTypeByName(type);

            const {pokemonUrls, pokemonNames} = typeData.pokemon.reduce((acc, pokemon) => {
                acc.pokemonUrls.push(pokemon.pokemon.url);
                acc.pokemonNames.push(pokemon.pokemon.name);
                return acc;
            }, {pokemonUrls: [], pokemonNames: []});

            await getPokemonsByUrls(pokemonUrls);
            setPokemonsFilter({currentType: type, filteredPokemonNames: pokemonNames});

        }
    };

    render() {
        return (
            <select onChange={this.handleTypeChange}>
                <option>{PokemonTypes.defaultFilterValue}</option>
                {this.state.typesList.map(({name}) => <option key={name}>{name}</option>)}
            </select>
        );
    }
}

export default connect(null, {getPokemonsByUrls, setPokemonsFilter})(PokemonTypes);
