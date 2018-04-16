import {
  GET_TERMSNCODITIONS_JSON_SUCCESS,
  GET_TERMSNCODITIONS_FAILURE
} from './actions';


export default function footerTermsdReducer(state = {
}, action) {
  switch (action.type) {
    case GET_TERMSNCODITIONS_JSON_SUCCESS:
      return Object.assign({}, state, {
        termsData: action.data.data.termsandconditions.Legal,
        contentAside:
        action.data.data.termsandconditions.LeftNav
      });
    case GET_TERMSNCODITIONS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
