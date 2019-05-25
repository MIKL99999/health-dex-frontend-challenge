import React, {Component} from 'react';
import {connect} from 'react-redux';
import {OrderedMap} from 'immutable';
import {MoonLoader} from 'react-spinners';
import PokemonListItem from './PokemonListItem';
import pokeapi from '../fetch/pokeapi';
import {setPokemons} from '../redux/actions';
import {Pagination} from './Pagination';
import getPokemonsByUrls from '../redux/actions/getPokemonsByUrls';
import '../styles/pokemon-list.scss';


class PokemonList extends Component {
    state = {
        offset: 0,
        pageCount: 0,
        itemsOnPage: 12,
        pokemonsOnPage: OrderedMap(),
    };

    async componentDidMount() {
        const pokemonsList = await pokeapi.getPokemonsList();

        const {offset, itemsOnPage} = this.state;

        this.setState({pageCount: this.getPageCount(pokemonsList.count)});

        const {pokemons, setPokemons} = this.props;

        const fetchedPokemons = pokemons.withMutations((pokemonsMut) => {
            pokemonsList.results.forEach((pokemon) => {
                pokemon.info = null;
                pokemonsMut.set(pokemon.name, pokemon);
            });
        });

        setPokemons(fetchedPokemons);

        await this.getPokemonsInfo(fetchedPokemons.slice(offset, offset + itemsOnPage));

        const pokemonsOnPage = this.filterPokemons();
        this.setState({pokemonsOnPage});
    }

    async componentDidUpdate(prevProps, prevState) {
        const {offset} = this.state;
        const {pokemonsFilter} = this.props;

        if (offset !== prevState.offset) {
            await this.getPokemonsInfo(this.filterPokemons());

            const newPokemonsOnPage = this.filterPokemons();

            this.setState({pokemonsOnPage: newPokemonsOnPage});
        }

        if (pokemonsFilter.currentType !== prevProps.pokemonsFilter.currentType) {
            const newPokemonsOnPage = this.filterPokemons();

            this.setState({
                offset: 0,
                pokemonsOnPage: newPokemonsOnPage,
                pageCount: this.getPageCount(pokemonsFilter.filteredPokemonNames.length),
            })
        }
    }

    async getPokemonsInfo(pokemons) {
        const pokemonsUrls = pokemons.reduce((arr, pokemon) => {
            arr.push(pokemon.url);
            return arr;
        }, []);

        await this.props.getPokemonsByUrls(pokemonsUrls);
    };

    handlePageClick = ({selected}) => {
        const offset = Math.ceil(selected * this.state.itemsOnPage);
        this.setState({offset});
    };

    filterPokemons() {
        const {pokemons, pokemonsFilter} = this.props;

        if (!pokemonsFilter.filteredPokemonNames.length) {
            return this.getPokemonsForCurrentPage(pokemons);
        }

        const pokemonsFilteredByName = OrderedMap().withMutations((map) => {
            pokemonsFilter.filteredPokemonNames.reduce((acc, name) => {
                acc.set(name, pokemons.get(name));
                return acc;
            }, map);
        });

        return this.getPokemonsForCurrentPage(pokemonsFilteredByName);
    }

    /**
     * @param {number} itemsCount
     * @returns {number}
     */
    getPageCount(itemsCount) {
        return Math.ceil(itemsCount / this.state.itemsOnPage)
    }

    /**
     * @param {this} pokemons
     * @returns {OrderedMap}
     */
    getPokemonsForCurrentPage(pokemons) {
        const {offset, itemsOnPage} = this.state;
        return pokemons.slice(offset, offset + itemsOnPage);
    }


    render() {
        const {
            pageCount,
            pokemonsOnPage,
        } = this.state;

        if (!pokemonsOnPage.size) {
            return (
                <div className="center">
                    <MoonLoader/>
                </div>);
        }

        return (
            <div>
                <ul className="pokemon-list">
                    {
                        pokemonsOnPage.valueSeq().map((pokemon) =>
                            <PokemonListItem
                                key={pokemon.name}
                                pokemon={pokemon}
                            />)
                    }
                </ul>
                <Pagination
                    pageCount={pageCount}
                    onPageChange={this.handlePageClick}
                />
            </div>
        );
    }
}

export default connect(({pokemons, pokemonsFilter}) => ({pokemons, pokemonsFilter}), {
    setPokemons,
    getPokemonsByUrls,
})(PokemonList);
