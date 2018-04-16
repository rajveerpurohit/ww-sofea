import {
  GET_STORELIST_JSON_SUCCESS,
  GET_LOCATION_STORELIST_JSON_SUCCESS,
  GET_EMPTY_STORELIST_JSON_SUCCESS,
  GET_DAYLIST_JSON_SUCCESS,
  GET_STORELIST_JSON_FAILURE
} from './actions';

export default function storeListReducer(state = {}, action) {
  switch (action.type) {
    case GET_STORELIST_JSON_SUCCESS:
      return Object.assign({}, state, { stateStoreList: action.data.data });
    case GET_LOCATION_STORELIST_JSON_SUCCESS:
      return Object.assign({}, state, { stateStoreList: action.data.data });
    case GET_DAYLIST_JSON_SUCCESS:
      return Object.assign({}, state, { stateDayList: action.data.data });
    case GET_EMPTY_STORELIST_JSON_SUCCESS:
      return Object.assign({}, state, { stateStoreList: null });
    case GET_STORELIST_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
