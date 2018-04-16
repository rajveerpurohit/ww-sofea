import { combineReducers } from 'redux';
import {
    GET_LEFTNAV_JSON_SUCCESS,
    GET_LEFTNAV_JSON_FAILURE,
    GET_CORPOARATE_JSON_SUCCESS,
    GET_CORPOARATE_JSON_FAILURE
} from './actions';

const LeftNavReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_LEFTNAV_JSON_SUCCESS:
      return Object.assign({}, state, { leftNav: action.data.data && action.data.data.leftNav && action.data.data.leftNav.LeftNav });
    case GET_LEFTNAV_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const corporateContentReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_CORPOARATE_JSON_SUCCESS:
      return Object.assign({}, state, { corporateData: action.data.data });
    case GET_CORPOARATE_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const corporateReducer = combineReducers({
  LeftNavReducer,
  corporateContentReducer
});

export default corporateReducer;
