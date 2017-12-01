import { combineReducers } from 'redux';
import * as types from '../types';

const deliveryLocation = (
    state = { 'province':  'Eastern Cape', 'suburb': 'Alice' }
) => state;

const deliveryDetailsReducer = combineReducers({
    deliveryLocation
});

export default deliveryDetailsReducer;