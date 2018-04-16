import {
    GET_FINANCIALSERVICES_JSON_SUCCESS,
    GET_FINANCIALSERVICES_FAILURE,
    GET_STORECARDSUMMARY_JSON_SUCCESS,
    GET_TRANSACTIONHISTORY_JSON_SUCCESS,
    GET_TRANSACTIONHISTORY_FAILURE,
    GET_SWITCHSTATEMENTDETAILS_JSON_SUCCESS,
    GET_SWITCHSTATEMENTDETAILS_FAILURE,
    GET_UPDATESTATEMENT_JSON_SUCCESS,
    GET_UPDATESTATEMENT_FAILURE,
    GET_CARDDETAILS_JSON_SUCCESS,
    GET_CARDDETAILS_FAILURE
} from './actions';

export default function financialServicesReducer(state = { wfsData: [], cardSummary: [], transactionHistory: [], switchStatementDetails: [], updateStatement: [], cardDetails: [] }, action) {
  switch (action.type) {
    case GET_FINANCIALSERVICES_JSON_SUCCESS:
      return Object.assign({}, state, { wfsData: action.data.data });
    case GET_FINANCIALSERVICES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_STORECARDSUMMARY_JSON_SUCCESS:
      return Object.assign({}, state, { cardSummary: action.data.data });
    case GET_TRANSACTIONHISTORY_JSON_SUCCESS:
      return Object.assign({}, state, { transactionHistory: action.data.data });
    case GET_TRANSACTIONHISTORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_SWITCHSTATEMENTDETAILS_JSON_SUCCESS:
      return Object.assign({}, state, { switchStatementDetails: action.data.data });
    case GET_SWITCHSTATEMENTDETAILS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_UPDATESTATEMENT_JSON_SUCCESS:
      return Object.assign({}, state, { updateStatement: action.data.data });
    case GET_UPDATESTATEMENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_CARDDETAILS_JSON_SUCCESS:
      return Object.assign({}, state, { cardDetails: action.data.data });
    case GET_CARDDETAILS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
