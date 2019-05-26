import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {store} from './redux/config';
import Main from './components/Main';
import PokemonPage from './components/PokemonPage';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/pokemon/:pokemon" component={PokemonPage}/>
                    <Route path="/" component={Main}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
