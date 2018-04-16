import {
  GET_SHOPPING_LIST_ITEMS_SUCCESS,
  GET_SHOPPING_LIST_ITEMS_FAILURE
} from './actions';
import { GET_DELIVERY_MODAL_SUBURBS_SUCCESS } from '../../components/basic/delevery-model/actions';


export default function currentShopingListItems(state = {
  items: []
}, action) {
  switch (action.type) {
    case GET_SHOPPING_LIST_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        items: action.data.woolworthsGiftItemBean,
        currentShopingListName: action.data.description,
        suburbChanged: false
      });
    case GET_SHOPPING_LIST_ITEMS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        suburbChanged: false
      });
    case GET_DELIVERY_MODAL_SUBURBS_SUCCESS:
      return Object.assign({}, state, {
        suburbChanged: true
      });
    default:
      return state;
  }
}
