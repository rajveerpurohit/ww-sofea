import { combineReducers } from 'redux';

import { GET_LEFTNAV_JSON_SUCCESS, GET_LEFTNAV_JSON_FAILURE } from './actions';

const LeftNavReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LEFTNAV_JSON_SUCCESS:
      return Object.assign({}, state, {
        leftNav: action.data.data.leftNav.LeftNav
      });
    case GET_LEFTNAV_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const sizeGuideReducer = combineReducers({
  LeftNavReducer
});

export default sizeGuideReducer;
