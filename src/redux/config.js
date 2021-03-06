import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";


export const store = createStore(
    rootReducer,
    {},
    compose(
        applyMiddleware(thunk),
        process.env.NODE_ENV !== 'production'? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(): compose,
    ),
);
