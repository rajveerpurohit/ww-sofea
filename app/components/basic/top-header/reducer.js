import {
  GET_TOPHEADER_JSON_SUCCESS,
  GET_TOPHEADER_DATA_FAILURE
} from './actions';


export default function utilityReducer(state = {
}, action) {
  switch (action.type) {
    case GET_TOPHEADER_JSON_SUCCESS:
      return Object.assign({}, state, {utilityData: action.data.data});
    case GET_TOPHEADER_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
