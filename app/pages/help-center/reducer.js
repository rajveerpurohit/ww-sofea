import { combineReducers } from 'redux';

import {
  GET_HELP_JSON_SUCCESS,
  GET_HELP_FAILURE,
  GET_LEFTNAV_JSON_SUCCESS,
  GET_LEFTNAV_JSON_FAILURE
} from './actions';

const LeftNavReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LEFTNAV_JSON_SUCCESS:
      return Object.assign({}, state, {
        leftNav:
          action.data.data &&
          action.data.data.leftNav &&
          action.data.data.leftNav.LeftNav
      });
    // return Object.assign({}, state, { leftNav: action.data.data && action.data.data.leftNavMyAccount && action.data.data.leftNavMyAccount.LeftNav });
    case GET_LEFTNAV_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const helpCenterReducer = (
  state = {
    helpCenterData: {}
  },
  action
) => {
  switch (action.type) {
    case GET_HELP_JSON_SUCCESS:
      return Object.assign({}, state, {
        helpCenterData: action.data.data.help.contents
      });
    case GET_HELP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const helpReducer = combineReducers({
  LeftNavReducer,
  helpCenterReducer
});

export default helpReducer;
