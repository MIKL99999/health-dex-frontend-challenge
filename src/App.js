import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {store} from './redux/config';
import MainPage from './components/MainPage';
import PokemonPage from './components/PokemonPage';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Route render={({history}) => (
                    <header className="header">
                        <button className="header__home" onClick={() => history.push('')}>
                            Home
                        </button>
                    </header>
                )}/>

                <Switch>
                    <Route path="/pokemon/:pokemon" component={PokemonPage}/>
                    <Route path="/" component={MainPage}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
