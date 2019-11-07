import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root'
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore'
import App from './App';
const store = configureStore();

// ReactDOM.render(
//     <Router>
//         <Root store={store} />
//     </Router>, document.getElementById('root'));
//
// ReactDOM.render(
//         <App store={store} />);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
