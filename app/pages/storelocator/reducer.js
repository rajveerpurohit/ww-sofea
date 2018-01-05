import {
    GET_STORELOCATOR_JSON_SUCCESS,
    GET_STORELOCATOR_FAILURE
} from './actions';

export default function storeLocatorReducer(state = {}, action) {
  switch (action.type) {
    case GET_STORELOCATOR_JSON_SUCCESS:
      return Object.assign({}, state, {contentAside : action.data.data.leftNav.LeftNav});
    case GET_STORELOCATOR_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}



