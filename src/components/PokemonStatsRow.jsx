import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import '../styles/pokemon-stats-row.scss';


/**
 * @param {number} base_stat
 * @returns {string}
 */
const getFillerColor = (base_stat) => {
    if (base_stat <= 25) {
        return 'red';
    } else if (base_stat <= 75) {
        return 'orange';
    } else {
        return 'green';
    }
};

/**
 * 255 - is a max value of state.
 * 0 - is a min value of state.
 *
 * @param {number} base_stat
 * @returns {number}
 */
const calcFillerPercent = (base_stat) => base_stat * 100 / 255;


const PokemonStatsRow = ({base_stat, stat}) => {
    return (
        <div key={stat.name} className="pokemon-stats-row">
            <span className="pokemon-stats-row__name">{capitalizeFirstLetter(stat.name)}</span>
            <span className="pokemon-stats-row__base-stat">{base_stat}</span>

            <div className="pokemon-stats-row__line">
                <div
                    className="pokemon-stats-row__line-filler"
                    style={{
                        width: `${calcFillerPercent(base_stat)}%`,
                        backgroundColor: getFillerColor(base_stat),
                    }}
                />
            </div>
        </div>
    );
};

PokemonStatsRow.propTypes = {
    stat: PropTypes.object.isRequired,
    base_stat: PropTypes.number.isRequired,
};

export default PokemonStatsRow;
