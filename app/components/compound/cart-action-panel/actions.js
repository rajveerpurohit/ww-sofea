import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import { serverUrls } from '../../../../server/controllers/apiAggregatorEndPoints';
import { deliveryServices } from '../../../services';
import {
  UPDATE_PRODUCT_ITEM_COUNT,
  HIDE_LOADER
} from '../../../types';

polyfill();

export const SET_USER_ADDRESSES = 'SET_USER_ADDRESSES';
export const SHOW_ADDRESS_FORM = 'SHOW_ADDRESS_FORM';
export const HIDE_ADDRESS_FORM = 'HIDE_ADDRESS_FORM';
export const SET_DELIVERY_SLOTS = 'SET_DELIVERY_SLOTS';
export const SET_CURRENT_ADDRESS = 'SET_CURRENT_ADDRESS';
export const RESET_CURRENT_ADDRESS = 'RESET_CURRENT_ADDRESS';

const setUserAddresses = addresses => ({
  type: SET_USER_ADDRESSES,
  addresses
});

export const showAddressForm = (state = false) => {
  return (dispatch) => {
    if (state) {
      return dispatch({
        type: SHOW_ADDRESS_FORM
      });
    }
    return dispatch({
      type: HIDE_ADDRESS_FORM
    });
  };
};

export const getDeliverySlots = () => {
  return (dispatch) => {
    return deliveryServices().getDeliverySlots()
      .then((response) => {
        if (!(response.status === 200 && response.data)) return null;
        return dispatch({ type: SET_DELIVERY_SLOTS, data: response.data });
      });
  };
};

export const setCurrentAddress = (address) => {
  return (dispatch) => {
    if (address) {
      return dispatch({
        type: SET_CURRENT_ADDRESS,
        address
      });
    }

    return dispatch({ type: RESET_CURRENT_ADDRESS });
  };
};

export const getUserAddresses = () => {
  return (dispatch) => {
    return deliveryServices().getAddresses()
      .then((response) => {
        if (!(response.status === 200 && response.data)) throw new Error('error occured in request');
        const userAddresses = response.data;
        delete userAddresses.links;
        delete userAddresses._links;
        dispatch(setUserAddresses(userAddresses));
        if (Object.keys(userAddresses).length === 0) {
          dispatch(showAddressForm(true));
        } else {
          dispatch(showAddressForm(false));
        }
        return userAddresses;
      })
      .then((userAddresses) => {
        if (Object.keys(userAddresses).length) {
          dispatch(getDeliverySlots());
          dispatch(setCurrentAddress(userAddresses[Object.keys(userAddresses)[0]]));
        }
      })
      .catch((e) => {
        console.log('error address', e);
      });
  };
};

export const ADD_ITEM_TO_CART_SUCCESS = 'ADD_ITEM_TO_CART_SUCCESS';
export const ADD_ITEM_TO_CART_FAILURE = 'ADD_ITEM_TO_CART_FAILURE';
export const REMOVE_ITEM_FROM_CART_SUCCESS = 'REMOVE_ITEM_FROM_CART_SUCCESS';
export const REMOVE_ITEM_FROM_CART_FAILURE = 'REMOVE_ITEM_FROM_CART_FAILURE';
export const CREATE_NEW_SHOPPING_LIST_SUCCESS = 'CREATE_NEW_SHOPPING_LIST_SUCCESS';
export const REMOVE_COMMERCE_ITEM_FROM_CART_SUCCESS = 'REMOVE_COMMERCE_ITEM_FROM_CART_SUCCESS';
export const REMOVE_COMMERCE_ITEM_FROM_CART_FAILURE = 'REMOVE_COMMERCE_ITEM_FROM_CART_FAILURE';
export const CREATE_NEW_SHOPPING_LIST_FAILURE = 'CREATE_NEW_SHOPPING_LIST_FAILURE';
export const ADD_ITEM_TO_SHOPPING_LIST_SUCCESS = 'ADD_ITEM_TO_SHOPPING_LIST_SUCCESS';
export const ADD_GROUP_OF_ITEMS_TO_SHOPPING_LIST_SUCCESS = 'ADD_GROUP_OF_ITEMS_TO_SHOPPING_LIST_SUCCESS';
export const ADD_GROUP_OF_ITEMS_TO_SHOPPING_LIST_FAILURE = 'ADD_GROUP_OF_ITEMS_TO_SHOPPING_LIST_FAILURE';
export const ADD_ORDERED_ITEMS_TO_SHOPPING_LIST_SUCCESS = 'ADD_ORDERED_ITEMS_TO_SHOPPING_LIST_SUCCESS';
export const ADD_ORDERED_ITEMS_TO_SHOPPING_LIST_FAILURE = 'ADD_ORDERED_ITEMS_TO_SHOPPING_LIST_FAILURE';

export const ADD_ITEM_TO_SHOPPING_LIST_FAILURE = 'ADD_ITEM_TO_SHOPPING_LIST_FAILURE';
export const REMOVE_GROUP_ITEMS_FROM_CART_SUCCESS = 'REMOVE_GROUP_ITEMS_FROM_CART_SUCCESS';
export const REMOVE_ALL_ITEMS_FROM_CART_SUCCESS = 'REMOVE_ALL_ITEMS_FROM_CART_SUCCESS';
export const DELETE_SHOPPING_LIST_SUCCESS = 'DELETE_SHOPPING_LIST_SUCCESS';
export const DELETE_SHOPPING_LIST_FAILURE = 'DELETE_SHOPPING_LIST_FAILURE';
export const UPDATE_ITEM_QTY_CART_SUCCESS = 'UPDATE_ITEM_QTY_CART_SUCCESS';
export const UPDATE_ITEM_QTY_CART_FAILURE = 'UPDATE_ITEM_QTY_CART_FAILURE';

export const APPLY_VOUCHER_SUCCESS = 'APPLY_VOUCHER_SUCCESS';
export const APPLY_VOUCHER_FAILURE = 'APPLY_VOUCHER_FAILURE';
export const REVOKE_VOUCHER_SUCCESS = 'REVOKE_VOUCHER_SUCCESS';
export const REVOKE_VOUCHER_FAILURE = 'REVOKE_VOUCHER_FAILURE';

export const SELECT_GIFT_WITH_PURCHASE_SUCCESS = 'SELECT_GIFT_WITH_PURCHASE_SUCCESS';
export const SELECT_GIFT_WITH_PURCHASE_FAILURE = 'SELECT_GIFT_WITH_PURCHASE_FAILURE';


const hideLoader = () => ({ type: HIDE_LOADER });

export const addItemToCartSuccessAction = data => ({
  type: ADD_ITEM_TO_CART_SUCCESS,
  data
});

export const addItemToCartFailureAction = () => ({ type: ADD_ITEM_TO_CART_FAILURE });

export const addItemToCart = (data) => {
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.cartAddItems, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          dispatch(addItemToCartSuccessAction(response.body));
          dispatch({
            type: UPDATE_PRODUCT_ITEM_COUNT,
            data: response.body
          });
        }
        dispatch(hideLoader());
      }, (error) => {
        dispatch(hideLoader());
        dispatch(addItemToCartFailureAction(error));
      });
  };
};
export const updateItemQtyCartSuccessAction = data => ({
  type: UPDATE_ITEM_QTY_CART_SUCCESS,
  data
});
export const updateItemQtyCartFailureAction = () => ({ type: UPDATE_ITEM_QTY_CART_FAILURE });

export const updateItemQty = (params) => {
  const { data, commerceItemId } = params;
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.cartUpdateItemQty, method: 'PATCH', params: { data, commerceItemId } })
      .then((response) => {
        if (response.body) {
          dispatch(updateItemQtyCartSuccessAction(response.body));
          dispatch({
            type: UPDATE_PRODUCT_ITEM_COUNT,
            data: response.body
          });
        }
        dispatch(hideLoader());
      }, (error) => {
        dispatch(hideLoader());
        dispatch(updateItemQtyCartFailureAction(error));
      });
  };
};


export const removeItemFromCartSuccessAction = data => ({
  type: REMOVE_ITEM_FROM_CART_SUCCESS,
  data
});

export const removeItemFromCartFailureAction = () => ({ type: REMOVE_ITEM_FROM_CART_FAILURE });

export const removeItemFromCart = (params) => {
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.cartRemoveItems, method: 'DELETE', params })
      .then((response) => {
        if (response.body) {
          dispatch(removeItemFromCartSuccessAction(response.body));
          dispatch({
            type: 'UPDATE_PRODUCT_ITEM_COUNT',
            data: response.body
          });
        }
      }, (error) => {
        dispatch(removeItemFromCartFailureAction(error));
      });
  };
};

export const removeCommerceItemFromCartSuccessAction = data => ({
  type: REMOVE_COMMERCE_ITEM_FROM_CART_SUCCESS,
  data
});

export const removeCommerceItemFromCartFailureAction = () => ({ type: REMOVE_COMMERCE_ITEM_FROM_CART_FAILURE });

export const removeCommerceItemFromCart = (params) => {
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.cartRemoveCommerceItems, method: 'DELETE', params })
      .then((response) => {
        if (response.body) {
          dispatch(removeCommerceItemFromCartSuccessAction(response.body));
          dispatch({
            type: 'UPDATE_PRODUCT_ITEM_COUNT',
            data: response.body
          });
        }
      }, (error) => {
        dispatch(removeCommerceItemFromCartFailureAction(error));
      });
  };
};

export const removeGroupItemsFromCart = (params) => {
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.cartRemoveGroupItems, method: 'DELETE', params })
      .then((response) => {
        if (response.body) {
          dispatch(removeItemFromCartSuccessAction(response.body));
          dispatch({
            type: 'UPDATE_PRODUCT_ITEM_COUNT',
            data: response.body
          });
        }
      }, (error) => {
        dispatch(removeItemFromCartFailureAction(error));
      });
  };
};

export const removeAllItemsFromCart = () => {
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.cartRemoveAllItems, method: 'DELETE' })
      .then((response) => {
        if (response.body) {
          dispatch(removeItemFromCartSuccessAction(response.body));
          dispatch({
            type: 'UPDATE_PRODUCT_ITEM_COUNT',
            data: response.body
          });
        }
      }, (error) => {
        dispatch(removeItemFromCartFailureAction(error));
      });
  };
};

export const createNewShoppingListSuccessAction = data => ({
  type: CREATE_NEW_SHOPPING_LIST_SUCCESS,
  data
});

export const createNewShoppingListFailureAction = () => ({ type: CREATE_NEW_SHOPPING_LIST_FAILURE });

export const createNewShoppingList = (listName) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.createGiftList, data: { shoppinglistname: listName } }).then((response) => {
      dispatch(hideLoader());
      dispatch(createNewShoppingListSuccessAction(response.body));
    }, (error) => {
      dispatch(hideLoader());
      dispatch(createNewShoppingListFailureAction(error));
    });
  };
};

export const addItemToShoppingListSuccessAction = data => ({
  type: ADD_ITEM_TO_SHOPPING_LIST_SUCCESS,
  data
});

export const addItemToShoppingListFailureAction = () => ({ type: ADD_ITEM_TO_SHOPPING_LIST_FAILURE });

export const addItemToShoppingList = (item) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.addItemToGiftList, data: item }).then((response) => {
      dispatch(hideLoader());
      dispatch(addItemToShoppingListSuccessAction(response.body));
    }, (error) => {
      dispatch(hideLoader());
      dispatch(addItemToShoppingListFailureAction(error));
    });
  };
};

export const addGroupOfItemsToShoppingListSuccessAction = data => ({
  type: ADD_GROUP_OF_ITEMS_TO_SHOPPING_LIST_SUCCESS,
  data
});

export const addGroupOfItemsToShoppingListFailureAction = () => ({ type: ADD_GROUP_OF_ITEMS_TO_SHOPPING_LIST_FAILURE });

export const addGroupOfItemsToShoppingList = (groupItems) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.addGroupOfItemsToShoppingList, data: groupItems }).then((response) => {
      dispatch(hideLoader());
      dispatch(addGroupOfItemsToShoppingListSuccessAction(response.body));
    }, (error) => {
      dispatch(hideLoader());
      dispatch(addGroupOfItemsToShoppingListFailureAction(error));
    });
  };
};
export const addOrderedItemsToShoppingListSuccessAction = data => ({
  type: ADD_ORDERED_ITEMS_TO_SHOPPING_LIST_SUCCESS,
  data
});

export const addOrderedItemsToShoppingListFailureAction = () => ({ type: ADD_ORDERED_ITEMS_TO_SHOPPING_LIST_FAILURE });

export const addOrderedItemsToShoppingList = (orderDetails) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.addOrderedItemsToShoppingList, data: orderDetails }).then((response) => {
      dispatch(hideLoader());
      dispatch(addOrderedItemsToShoppingListSuccessAction(response.body));
    }, (error) => {
      dispatch(hideLoader());
      dispatch(addOrderedItemsToShoppingListFailureAction(error));
    });
  };
};

export const deleteShoppingListSuccessAction = data => ({
  type: DELETE_SHOPPING_LIST_SUCCESS,
  data
});

export const deleteShoppingListFailureAction = () => ({ type: DELETE_SHOPPING_LIST_FAILURE });

export const deleteShoppingList = (groupItems) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'DELETE', url: serverUrls.addGroupOfItemsToShoppingList, data: groupItems }).then((response) => {
      dispatch(hideLoader());
      dispatch(deleteShoppingListSuccessAction(response.body));
    }, (error) => {
      dispatch(hideLoader());
      dispatch(deleteShoppingListFailureAction(error));
    });
  };
};
/* Gift With Purchase Start */

export const selectGiftWithPurchaseSuccessAction = data => ({
  type: SELECT_GIFT_WITH_PURCHASE_SUCCESS,
  data
});

export const selectGiftWithPurchaseFailureAction = () => ({ type: SELECT_GIFT_WITH_PURCHASE_FAILURE });

export const selectGiftWithPurchase = (product) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.selectGiftWithPurchase, data: { ...product } }).then((response) => {
      dispatch(hideLoader());
      dispatch(selectGiftWithPurchaseSuccessAction(response.body));
    }, (error) => {
      dispatch(hideLoader());
      dispatch(selectGiftWithPurchaseFailureAction(error));
    });
  };
};

/* Gift With Purchase End */

// Vouchers
export const applyVoucherSuccessAction = data => ({
  type: APPLY_VOUCHER_SUCCESS,
  data
});

export const applyVoucherFailureAction = data => ({
  type: APPLY_VOUCHER_FAILURE,
  data
});

export const applyVoucher = (data) => {
  const { couponClaimCode, barcode } = data;
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.applyVoucher, data }).then((response) => {
      //  dispatch(hideLoader());
      // dispatch(applyVoucherSuccessAction(response.body));
      if (!response.body.formexceptions) {
        dispatch({
          type: 'UPDATE_PRODUCT_ITEM_COUNT',
          data: response.body
        });
      } else {
        dispatch({
          type: APPLY_VOUCHER_FAILURE,
          data: { couponClaimCode, barcode, ...response.body }
        });
      }
    }, (error) => {
      // dispatch(hideLoader());
      dispatch(applyVoucherFailureAction(error));
    });
  };
};

export const revokeVoucherSuccessAction = data => ({
  type: REVOKE_VOUCHER_SUCCESS,
  data
});

export const revokeVoucherFailureAction = () => ({ type: REVOKE_VOUCHER_FAILURE });

export const revokeVoucher = (data) => {
  const { couponClaimCode, barcode } = data;
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.revokeVoucher, data }).then((response) => {
      //  dispatch(hideLoader());
      dispatch(revokeVoucherSuccessAction({ couponClaimCode, barcode, ...response.body }));
      if (!response.body.formexceptions) {
        dispatch({
          type: 'UPDATE_PRODUCT_ITEM_COUNT',
          data: response.body
        });
      } else {
        dispatch({
          type: APPLY_VOUCHER_FAILURE,
          data: { couponClaimCode, barcode, ...response.body }
        });
      }
    }, (error) => {
      // dispatch(hideLoader());
      dispatch(revokeVoucherFailureAction(error));
    });
  };
};

