## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Deployment

This Project was deployment by [@aws-amplify/cli](https://aws-amplify.github.io/docs/js/react).
 
## Code walk-through
 
### Libs

#### [Redux](https://redux.js.org/)

For managing application state.

#### [redux-thunk](https://github.com/reduxjs/redux-thunk)

With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extend the store's abilities, and let you write async logic that interacts with the store.

#### [react-router](https://github.com/reactjs/react-router-redux)

For application routing.
 
#### [pokeapi-js-wrapper](https://github.com/PokeAPI/pokeapi-js-wrapper)
 
A PokeAPI wrapper intended for browsers only. Comes fully asynchronous (with localForage) and built-in cache.
 
#### [D3.js](https://d3js.org/)

D3.js was used to create pokemons evolution tree.

#### [prop-types](https://github.com/facebook/prop-types)

Runtime type checking for React props.

#### [classnames](https://github.com/JedWatson/classnames)

A simple JavaScript utility for conditionally joining classNames together.

#### [immutable](https://github.com/immutable-js/immutable-js)

Immutable data cannot be changed once created, leading to much simpler application development, no defensive copying, and enabling advanced memoization and change detection techniques with simple logic.

#### [uuid](https://github.com/kelektiv/node-uuid)

Simple, fast generation of RFC4122 UUIDS.

#### [normalize.css](https://github.com/necolas/normalize.css)

Normalizes styles.

#### [node-sass](https://github.com/sass/node-sass)

Used to build SCSS files.

#### [react-spinners](https://github.com/davidhu2000/react-spinners)

A collection of loading spinners.

#### [react-paginate](https://github.com/AdeleD/react-paginate)

A ReactJS component to render a pagination.


### Project structure

#### index.js - application entry point

#### App.js - main component.

#### components

Contains next React components:

    MainPage - render PokemonTypeFilter and PokemonList.
    MovesList - render list of pokemon moves.
    Pagination - wrapper on ReactPaginate component.
    PokemonIcon - render pokemon icon.
    PokemonInfo - render pokemon info.
    PokemonList - render list of pokemons.
    PokemonListItem - render item of pokemons list.
    PokemonPage - render pokemon page.
    PokemonsEvolutionTree - render pokemons evolution tree.  
    PokemonStats - render stats of specific pokemon.
    PokemonStatsRow - render specific pokemon state.
    PokemonType - render pokemon type.
    PokemonTypeFilter - render pokemon type filter.  
    PokemonTypesGroup - render group of PokemonTypes. 
    

#### fetch

Contains pokeapi-js-wrapper set up.

#### redux

##### actions

    pokemonsActions
    pokemonsFilterActions
    uiActions
    getPokemonsByNames

##### reducers

    pokemons - store pokemons.
    pokemonsFilter - store pokemons filter dat. 
    ui - store ui info.
    index - combine above described reducers and routerReducer.

##### config

Redux config file. Create store with reducers and apply middleware.

#### styles

Contains SCSS styles.

#### utils

Contains common utils.
