import React from 'react';
import PropTypes from 'prop-types';
import PokemonInfo from './PokemonInfo';
import PokemonStatsRow from './PokemonStatsRow';
import '../styles/pokemon-stats.scss';


const PokemonStats = ({stats}) => {
    return (
        <div className="pokemon-stats">
            <span>Base stats</span>

            <div>
                {stats.reverse().map(({stat, base_stat}) => (
                    <PokemonStatsRow
                        key={stat.name}
                        stat={stat}
                        base_stat={base_stat}
                    />
                ))}
            </div>
        </div>
    );
};

PokemonInfo.propTypes = {
    stats: PropTypes.array.isRequired,
};

export default PokemonStats;
