import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import '../styles/moves-list.scss';


function MovesList({moves}) {
    return (
        <div className="moves-list">
            <span className="moves-list__header">Moves List</span>
            <ul className="moves-list__list">
                {moves.map(({move}) =>
                    <li key={move.name}>{capitalizeFirstLetter(move.name)}</li>
                )}
            </ul>
        </div>
    );
}

MovesList.propTypes = {
    moves: PropTypes.array.isRequired,
};

export default MovesList;
