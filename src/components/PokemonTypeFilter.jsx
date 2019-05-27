import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import pokeapi from '../fetch/pokeapi';
import getPokemonsByNames from '../redux/actions/getPokemonsByNames';
import {setPokemonsFilter} from '../redux/actions/pokemonsFilterActions';
import {setUI} from '../redux/actions/uiActions';
import '../styles/pokemon-type-filter.scss';


class PokemonTypeFilter extends Component {
    static propTypes = {
        setUI: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        setPokemonsFilter: PropTypes.func.isRequired,
        getPokemonsByNames: PropTypes.func.isRequired,
    };

    state = {
        typesList: [],
    };

    static defaultFilterValue = 'Choose pokemon type';

    async componentDidMount() {
        try {
            const res = await pokeapi.getTypesList();
            this.setState({typesList: res.results});
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * @param {Event} event
     */
    handleTypeChange = async (event) => {
        const type = event.target.value;

        const {getPokemonsByNames, setPokemonsFilter, setUI} = this.props;

        setUI({isLoading: true});

        if (type === PokemonTypeFilter.defaultFilterValue) {
            setPokemonsFilter({currentType: null, filteredPokemonNames: []});
        } else {
            try {
                const typeData = await pokeapi.getTypeByName(type);

                const pokemonNames = typeData.pokemon.map(pokemon => pokemon.pokemon.name);

                await getPokemonsByNames(pokemonNames);
                setPokemonsFilter({currentType: type, filteredPokemonNames: pokemonNames});
            } catch (e) {
                console.error(e);
            }
        }

        setUI({isLoading: false});
    };

    render() {
        return (
            <select
                className={classnames('pokemon-type-filter', {
                    'pokemon-type-filter_hidden': this.props.isLoading,
                })}
                onChange={this.handleTypeChange}
            >
                <option>{PokemonTypeFilter.defaultFilterValue}</option>
                {this.state.typesList.map(({name}) =>
                    <option key={name}>{name}</option>
                )}
            </select>
        );
    }
}

export default connect(
    ({ui}) => ({isLoading: ui.isLoading}),
    {getPokemonsByNames, setPokemonsFilter, setUI},
)(PokemonTypeFilter);
