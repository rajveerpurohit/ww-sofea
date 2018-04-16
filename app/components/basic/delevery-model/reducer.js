import {
  GET_DELIVERY_MODAL_SUBURBS_SUCCESS,
  GET_DELIVERY_MODAL_SUBURBS_FAILURE,
  GET_SUBURBS_SUCCESS,
  GET_SUBURBS_FAILURE,
} from './actions';

export default function deliveryAreaReducer(state = {
}, action) {
  switch (action.type) {
    case GET_DELIVERY_MODAL_SUBURBS_SUCCESS:
      return Object.assign({}, state, { deliveryAreaData: action.data.data });
    case GET_DELIVERY_MODAL_SUBURBS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_SUBURBS_SUCCESS:
      return Object.assign({}, state, {suburbData: action.data.data});
    case GET_SUBURBS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
