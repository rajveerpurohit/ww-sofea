import {
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAILURE,
  REMOVE_GROUP_ITEMS_FROM_CART_SUCCESS,
  REMOVE_ALL_ITEMS_FROM_CART_SUCCESS
} from './actions';

import {
  PERFORM_INVENTORY_CHECK_SUCCESS,
  PERFORM_INVENTORY_CHECK_FAILURE
} from '../../../pages/pdp/actions';

export default function addItemToCartReducer(state = {}, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART_SUCCESS:
      if (action.data.orderSummary) {
        return Object.assign({}, state, ...action.data, { nonDelieverable: undefined });
      }

      return Object.assign({}, state, { nonDelieverable: undefined });
    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return Object.assign({}, state, { nonDelieverable: undefined });
    case REMOVE_GROUP_ITEMS_FROM_CART_SUCCESS:
      return Object.assign({}, state, { nonDelieverable: undefined });
    case REMOVE_ALL_ITEMS_FROM_CART_SUCCESS:
      return Object.assign({}, state, { nonDelieverable: undefined });
    case ADD_ITEM_TO_CART_FAILURE:
    case REMOVE_ITEM_FROM_CART_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        nonDelieverable: undefined
      });
    case PERFORM_INVENTORY_CHECK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        nonDelieverable: action.data.isSuccess ? undefined : action.data.deliveryMessage
      });
    case PERFORM_INVENTORY_CHECK_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        nonDelieverable: undefined
      });
    default:
      return state;
  }
}
