import {
  GET_DELIVERY_MODAL_SUBURBS_SUCCESS,
  GET_DELIVERY_MODAL_SUBURBS_FAILURE
} from './actions';


export default function deliveryAreaReducer(state = {
}, action) {
   
  switch (action.type) {
    case GET_DELIVERY_MODAL_SUBURBS_SUCCESS:
      return Object.assign({}, state, {deliveryAreaData: action.data.data.regions});
    case GET_DELIVERY_MODAL_SUBURBS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
