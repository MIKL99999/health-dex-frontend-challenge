import React, {Component} from 'react';
import pokeapi from "../fetch/pokeapi";

export default class PokemonTypes extends Component {
    state = {
        typesList: null,
    };

    async componentDidMount() {
        const res = await pokeapi.getTypesList();

        this.setState({typesList: res.results});
    }

    render() {
        const {typesList} = this.state;

        if (!typesList) {
            return (<div>Loading...</div>);
        }

        return (
            <select>
                <option>Choose pokemon type</option>
                {typesList.map(({name}) => <option key={name}>{name}</option>)}
            </select>
        );
    }
}