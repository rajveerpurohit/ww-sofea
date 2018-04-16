import {
  GET_SUBURBSEARCH_JSON_SUCCESS,
  GET_APPLYNOW_JSON_SUCCESS,
  GET_APPLYNOW_FAILURE,
  GET_SUBURBSEARCH_JSON_FAILURE,
  GET_PERSONALINFO_JSON_SUCCESS,
  GET_PERSONALINFO_FAILURE,
  GET_INCOMEEXPENSES_JSON_SUCCESS,
  GET_INCOMEEXPENSES_FAILURE,
  GET_SELECTOFFERS_JSON_FAILURE,
  GET_SELECTOFFERS_JSON_SUCCESS,
  GET_CLEARWFSSESSION_JSON_SUCCESS,
  GET_CLEARWFSSESSION_JSON_FAILURE
} from './actions';

export default function applyNowReducer(state = {}, action) {
  switch (action.type) {
    case GET_APPLYNOW_JSON_SUCCESS:
      return Object.assign({}, state, { content: action.data.data });
    case GET_APPLYNOW_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_PERSONALINFO_JSON_SUCCESS:
      return Object.assign({}, state, { perosnalInfo: action.data.data });
    case GET_PERSONALINFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_INCOMEEXPENSES_JSON_SUCCESS:
      return Object.assign({}, state, { incomeExpenses: action.data.data });
    case GET_INCOMEEXPENSES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_SUBURBSEARCH_JSON_SUCCESS:
      return Object.assign({}, state, { wfsSuburb: action.data.data });
    case GET_SUBURBSEARCH_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_SELECTOFFERS_JSON_SUCCESS:
      return Object.assign({}, state, { selectOffers: action.data.data });
    case GET_SELECTOFFERS_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_CLEARWFSSESSION_JSON_SUCCESS:
      return Object.assign({}, state, { clearWFSSession: action.data.data });
    case GET_CLEARWFSSESSION_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case '@@router/LOCATION_CHANGE':
      return Object.assign({}, state, {
        routeChanged: true
      });
    default:
      return state;
  }
}

