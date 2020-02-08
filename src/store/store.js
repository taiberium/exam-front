import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware'
import {asyncReducer} from 'redux-promise-middleware-actions';
import {sendDataActionCreator} from "./dataActionCreator";


//const reducer = asyncReducer(searchAction);
const rootReducer = combineReducers({
    data: asyncReducer(sendDataActionCreator),
});

let middleware = [
    promiseMiddleware,
];

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;