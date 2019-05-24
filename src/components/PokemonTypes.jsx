import React, {PureComponent} from 'react';
import pokeapi from '../fetch/pokeapi';


export default class PokemonTypes extends PureComponent {
    state = {
        typesList: null,
    };

    async componentDidMount() {
        const res = await pokeapi.getTypesList();

        this.setState({typesList: res.results});
    }

    /**
     * @param {Event} event
     */
    handleTypeChange = async (event) => {
        const typeData = await pokeapi.getTypeByName(event.target.value);
        console.log(typeData);

        // TODO Add filtration
        //typeData.pokemon
    };

    render() {
        const {typesList} = this.state;

        if (!typesList) {
            return (<div>Loading...</div>);
        }

        return (
            <select onChange={this.handleTypeChange}>
                <option>Choose pokemon type</option>
                {typesList.map(({name}) => <option key={name}>{name}</option>)}
            </select>
        );
    }
}