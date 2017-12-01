import { combineReducers } from 'redux';
import {
  GET_MEGANAV_JSON_SUCCESS,
  GET_MEGANAV_DATA_FAILURE,
  GET_LOGO_JSON_SUCCESS,
  GET_LOGO_DATA_FAILURE
} from './actions';


const meganavReducer = (state = {
  rootCategories: []
}, action) => {
  switch (action.type) {
    case GET_MEGANAV_JSON_SUCCESS:
      return Object.assign({}, state, {rootCategories: action.data.data.rootCategories});
    case GET_MEGANAV_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const logoReducer = (state = {
  logoData: {}
}, action) => {
  switch (action.type) {
    case GET_LOGO_JSON_SUCCESS:
      return Object.assign({}, state, {logoData: action.data.data});
    case GET_LOGO_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const headerReducer = combineReducers({
  meganavReducer,
  logoReducer
});

export default headerReducer;

