import {
  GET_DLP_JSON_SUCCESS,
  GET_DLP_DATA_FAILURE
} from './actions';


export default function dlp(state = {
  dlpData: []
}, action) {
  switch (action.type) {
    case GET_DLP_JSON_SUCCESS:
      return Object.assign({}, state, {dlpData: action.data.data.contents});
    case GET_DLP_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
