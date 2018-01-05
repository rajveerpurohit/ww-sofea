import {
  GET_LABELS_JSON_SUCCESS,
  GET_LABELS_DATA_FAILURE
} from '../actions/labelActions';


export default function labels(state = {}, action) {
  switch (action.type) {
    case GET_LABELS_JSON_SUCCESS:
      return Object.assign({}, state, {labels: action.data.data.labels});
    case GET_LABELS_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
