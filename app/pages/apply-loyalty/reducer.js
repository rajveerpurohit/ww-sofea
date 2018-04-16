import {
    GET_APPLY_LOYALTY_JSON_SUCCESS,
    GET_APPLY_LOYALTY_FAILURE
} from './actions';


export default function applyLoyaltyReducer(state = { applyLoyaltyData: {}
}, action) {
  switch (action.type) {
    case GET_APPLY_LOYALTY_JSON_SUCCESS:
      return Object.assign({}, state, {
        applyLoyaltyData: action.data.data,
      });
    case GET_APPLY_LOYALTY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
