import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
    collapsed : true
    // ...options
});
const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
        applyMiddleware(thunk,logger)
    )
);

export default configureStore
