import React, {Component} from 'react';
import {connect} from 'react-redux';
import {OrderedMap} from 'immutable';
import {MoonLoader} from 'react-spinners';
import pokeapi from '../fetch/pokeapi';
import {Pagination} from './Pagination';
import PokemonListItem from './PokemonListItem';
import {setUI} from '../redux/actions/uiActions';
import {setPokemons} from '../redux/actions/pokemonsActions';
import getPokemonsByNames from '../redux/actions/getPokemonsByNames';
import '../styles/pokemon-list.scss';


class PokemonList extends Component {
    state = {
        offset: 0,
        pageCount: 0,
        currentPage: 0,
        itemsOnPage: 12,
        pokemonsOnPage: OrderedMap(),
    };

    async componentDidMount() {
        try {
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
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.offset !== prevState.offset) {
            try {
                await this.getPokemonsInfo(this.filterPokemons());

                this.setState({pokemonsOnPage: this.filterPokemons()});
            } catch (e) {
                console.error(e);
            }
        }

        if (this.props.pokemonsFilter.currentType !== prevProps.pokemonsFilter.currentType) {
            this.setState({
                offset: 0,
                currentPage: 0,
                pokemonsOnPage: this.filterPokemons(),
                pageCount: this.getPageCount(this.getCountOfFilteredPokemons()),
            });
        }
    }

    async getPokemonsInfo(pokemons) {
        const pokemonNames = pokemons.reduce((arr, pokemon) => {
            arr.push(pokemon.name);
            return arr;
        }, []);

        const {setUI} = this.props;

        setUI({isLoading: true});

        try {
            await this.props.getPokemonsByNames(pokemonNames);
        } catch (e) {
            console.error(e);
        }

        setUI({isLoading: false});
    };

    getCountOfFilteredPokemons = () => {
        const {pokemons, pokemonsFilter} = this.props;
        const length = pokemonsFilter.filteredPokemonNames.length;
        return length ? length : pokemons.size;
    };

    /**
     * @param {number} selected
     */
    handlePageClick = ({selected}) => {
        const offset = Math.ceil(selected * this.state.itemsOnPage);
        this.setState({offset, currentPage: selected});
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
            currentPage,
            pokemonsOnPage,
        } = this.state;
        const {isLoading} = this.props;

        if (!pokemonsOnPage.size || isLoading) {
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
                    currentPage={currentPage}
                    onPageChange={this.handlePageClick}
                />
            </div>
        );
    }
}

export default connect(({pokemons, pokemonsFilter, ui}) => ({pokemons, pokemonsFilter, isLoading: ui.isLoading}), {
    setUI,
    setPokemons,
    getPokemonsByNames,
})(PokemonList);
