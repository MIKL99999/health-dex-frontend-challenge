import React from 'react';
import PropTypes from 'prop-types';
import PokemonStatsRow from './PokemonStatsRow';
import '../styles/pokemon-stats.scss';


const PokemonStats = ({stats}) => {
    return (
        <div className="pokemon-stats">
            <span className="pokemon-stats__text">Base stats</span>

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

PokemonStats.propTypes = {
    stats: PropTypes.array.isRequired,
};

export default PokemonStats;
