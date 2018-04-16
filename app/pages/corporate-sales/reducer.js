import {
    GET_CORPOARATE_SALES_JSON_SUCCESS,
    GET_CORPOARATE_SALES_FAILURE
} from './actions';


export default function corporateSalesReducer(state = {
  corporateSalesData: {}
}, action) {
  switch (action.type) {
    case GET_CORPOARATE_SALES_JSON_SUCCESS:
      return Object.assign({}, state, {
          corporateSalesData: action.data.data.corporatesales
    });
    case GET_CORPOARATE_SALES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
