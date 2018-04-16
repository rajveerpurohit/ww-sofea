import { combineReducers } from 'redux';
import { GET_ACCOUNT_LEFTNAV_JSON_SUCCESS, GET_LEFTNAV_DATA_FAILURE, GET_FINANCIALLEFTNAV_JSON_SUCCESS, GET_FINANCIALLEFTNAV_JSON_FAILURE, GET_WREWARDS_LEFTNAV_JSON_SUCCESS, GET_WREWARDS_LEFTNAV_JSON_FAILURE } from './actions';

const leftNavData = (state = { leftNavLinks: {} }, action) => {
  switch (action.type) {
    case GET_ACCOUNT_LEFTNAV_JSON_SUCCESS:
      return Object.assign({}, state, { leftNavLinks: action.data.data.leftNavMyAccount });
    case GET_LEFTNAV_DATA_FAILURE:
      return state;
    case GET_FINANCIALLEFTNAV_JSON_SUCCESS:
      return Object.assign({}, state, { leftNavLinks: action.data.data.wfsLeftNav });
    case GET_FINANCIALLEFTNAV_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_WREWARDS_LEFTNAV_JSON_SUCCESS:
      return Object.assign({}, state, { leftNavLinks: action.data.data.wrewardsLeftNav });
    case GET_WREWARDS_LEFTNAV_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const leftNavReducer = combineReducers({
  leftNavData
});

export default leftNavReducer;
