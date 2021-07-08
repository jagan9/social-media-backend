import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    RootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store;