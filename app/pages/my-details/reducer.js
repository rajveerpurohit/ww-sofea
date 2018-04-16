import { combineReducers } from 'redux';
import {
  GET_ADDPAYMENTETAILS_JSON_SUCCESS,
  GET_ADDPAYMENTDETAILS_DATA_FAILURE,
  GET_GETPAYMENTETAILS_JSON_SUCCESS,
  GET_GETPAYMENTDETAILS_DATA_FAILURE

} from './actions';


const paymentDetailsReducer = (
  state = { },
  action
) => {
  switch (action.type) {
    case GET_ADDPAYMENTETAILS_JSON_SUCCESS:
      return Object.assign({}, state, {
        addPaymentDetails: action.data.data
      });
    case GET_ADDPAYMENTDETAILS_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_GETPAYMENTETAILS_JSON_SUCCESS:
      return Object.assign({}, state, {
        getPaymentDetails: action.data.data
      });
    case GET_GETPAYMENTDETAILS_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const myDetailReducer = combineReducers({
  paymentDetailsReducer
});

export default myDetailReducer;
