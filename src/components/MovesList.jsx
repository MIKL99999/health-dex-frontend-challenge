import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

function MovesList({moves}) {
    return (
        <ul>
            {moves.map(({move}) =>
                <li key={move.name}>{capitalizeFirstLetter(move.name)}</li>
            )}
        </ul>
    );
}

MovesList.propTypes = {
    moves: PropTypes.array.isRequired,
};

export default MovesList;
