import {
  GET_DLP_JSON_SUCCESS,
  GET_DLP_DATA_FAILURE
} from './actions';

const initialState = {
  dlpData: []
};

export default function dlp(state = {
  dlpData: []
}, action) {
  switch (action.type) {
    case GET_DLP_JSON_SUCCESS:
      return Object.assign({}, state, { dlpData: action.data.data.contents });
    case GET_DLP_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case '@@router/LOCATION_CHANGE':
      return action.pathname ? Object.assign({}, state, initialState) : state;
    default:
      return state;
  }
}
