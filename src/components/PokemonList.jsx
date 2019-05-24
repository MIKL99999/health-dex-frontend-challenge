import React, {PureComponent} from 'react';
import {OrderedMap} from "immutable";
import ReactPaginate from 'react-paginate';
import PokemonListItem from './PokemonListItem';

import pokeapi from '../fetch/pokeapi';

import '../styles/react-paginate-style.scss';
import '../styles/pokemon-list.scss';


export default class PokemonList extends PureComponent {
    state = {
        count: 0,
        offset: 0,
        pageCount: 0,
        itemsOnPage: 30,
        pokemons: OrderedMap(),
    };

    async componentDidMount() {
        const pokemonsList = await pokeapi.getPokemonsList();

        const {pokemons, offset, itemsOnPage} = this.state;

        this.setState({
            count: pokemonsList.count,
            pageCount: Math.ceil(pokemonsList.count / itemsOnPage),
        });

        const fetchedPokemons = pokemons.withMutations((pokemonsMut) => {
            pokemonsList.results.forEach((pokemon) => {
                pokemon.info = null;
                pokemonsMut.set(pokemon.name, pokemon);
            });
        });

        this.getPokemonsInfo(fetchedPokemons, offset, 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {offset, itemsOnPage, pokemons} = this.state;
        if (offset !== prevState.offset) {
            this.getPokemonsInfo(pokemons, offset, itemsOnPage);
        }
    }


    async getPokemonsInfo(pokemons, offset, amount) {
        const pokemonsUrls = pokemons.slice(offset, offset + amount).reduce((arr, pokemon) => {
            arr.push(pokemon.url);
            return arr;
        }, []);

        const pokemonsInfoList = await pokeapi.resource(pokemonsUrls);

        console.log(pokemonsInfoList);

        const pokemonsWithInfo = pokemons.withMutations((pokemonsMut) => {
            pokemonsInfoList.forEach((pokemonsInfo) => {
                pokemonsMut.setIn([pokemonsInfo.name, 'info'], pokemonsInfo);
            })
        });

        this.setState({pokemons: pokemonsWithInfo});
    };

    handlePageClick = ({selected}) => {
        const offset = Math.ceil(selected * this.state.itemsOnPage);

        this.setState({offset});
    };

    render() {
        const {
            offset,
            pokemons,
            pageCount,
            itemsOnPage,
        } = this.state;
        if (!pokemons.size) {
            // TODO Loader comp
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <ul className="pokemon-list" >
                    {
                        pokemons.slice(offset, offset + itemsOnPage).valueSeq().map((pokemon) =>
                            <PokemonListItem
                                key={pokemon.name}
                                pokemon={pokemon}
                            />)
                    }
                </ul>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        );
    }
}