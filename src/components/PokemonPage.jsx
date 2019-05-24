import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import pokeapi from '../fetch/pokeapi';


class PokemonPage extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    async componentDidMount() {
        // TODO id
        const res = await pokeapi.getEvolutionChainsList(this.props.match.params.pokemon);

        console.log(res);
    }

    render() {
        // const {match, location, history} = this.props;

        return (
            <div>
                PokemonInfo
            </div>
        );
    }
}

export default withRouter(PokemonPage);
