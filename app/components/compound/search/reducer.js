import {
  GET_SEARCH_JSON_SUCCESS,
  GET_SEARCH_DATA_FAILURE
} from './actions';


export default function search(state = {
  searchData: []
}, action) {
  switch (action.type) {
    case GET_SEARCH_JSON_SUCCESS:
      return Object.assign({}, state, {searchData: action.data.data.contentItem.contents});
    case GET_SEARCH_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
