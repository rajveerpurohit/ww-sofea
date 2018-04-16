import {
  GET_SEARCH_JSON_SUCCESS,
  GET_SEARCH_DATA_FAILURE,
  CLEAR_SEARCH_JSON,
  RESET_SUGGETION_INDEX
} from './actions';

export default function search(state = {
  searchData: [],
  activeSuggetionIndex: 0
}, action) {
  switch (action.type) {
    case GET_SEARCH_JSON_SUCCESS:
      return Object.assign({}, state, { searchData: action.data.data.contents, activeSuggetionIndex: 0 });
    case 'INCREAMENT_SUGGETION_INDEX':

      return Object.assign({}, state, { activeSuggetionIndex: state.activeSuggetionIndex + 1 });
    case 'DECREAMENT_SUGGETION_INDEX':
      return Object.assign({}, state, { activeSuggetionIndex: state.activeSuggetionIndex - 1 });
    case 'RESET_SUGGETION_INDEX':
      return Object.assign({}, state, { activeSuggetionIndex: action.keyIndex });
    case GET_SEARCH_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case CLEAR_SEARCH_JSON:
      return Object.assign({}, state, { searchData: [], activeSuggetionIndex: 0 });
    default:
      return state;
  }
}
