import {SET_UI} from '../actions/uiActions';

const ui = (
    state = {isLoading: false},
    action
) => {
    switch (action.type) {
        case SET_UI:
            return action.ui;
        default:
            return state;
    }
};

export default ui;
