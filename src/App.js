import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {store} from './redux/config';
import Main from './components/Main';
import PokemonInfo from './components/PokemonInfo';
import './App.css';



function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/pokemon/:pokemon" component={PokemonInfo}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
