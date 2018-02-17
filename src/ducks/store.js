import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer.js';
import challenge_reducer from './challenge_reducer';
import promiseMiddleware from 'redux-promise-middleware';

export default createStore(reducer, applyMiddleware(promiseMiddleware()));