import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import { HIDE_LOADER } from '../../types';

polyfill();

export const DELETE_SHOPPING_LIST_SUCCESS = 'DELETE_SHOPPING_LIST_SUCCESS';
export const DELETE_SHOPPING_LIST_FAILURE = 'DELETE_SHOPPING_LIST_FAILURE';

export const GET_USER_SHOPPING_LIST_SUCCESS = 'GET_USER_SHOPPING_LIST_SUCCESS';
export const GET_USER_SHOPPING_LIST_FAILURE = 'GET_USER_SHOPPING_LIST_FAILURE';

export const GET_SHOPPING_LIST_ITEMS_SUCCESS = 'GET_SHOPPING_LIST_ITEMS_SUCCESS';
export const GET_SHOPPING_LIST_ITEMS_FAILURE = 'GET_SHOPPING_LIST_ITEMS_FAILURE';

export const REMOVE_ITEM_FROM_SHOPPING_LIST_SUCCESS = 'REMOVE_ITEM_FROM_SHOPPING_LIST_SUCCESS';
export const REMOVE_ITEM_FROM_SHOPPING_LIST_FAILURE = 'REMOVE_ITEM_FROM_SHOPPING_LIST_FAILURE';


const hideLoader = () => ({ type: HIDE_LOADER });


export const deleteShoppingListSuccessAction = data => ({
  type: DELETE_SHOPPING_LIST_SUCCESS,
  data
});

export const deleteShoppingListFailureAction = () => ({ type: DELETE_SHOPPING_LIST_FAILURE });

export const deleteShoppingList = (list) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'DELETE', url: serverUrls.deleteShoppingList, params: list }).then((response) => {
      dispatch(hideLoader());
      dispatch(deleteShoppingListSuccessAction(response.body));
    }, (error) => {
      dispatch(hideLoader());
      dispatch(deleteShoppingListFailureAction(error));
    });
  };
};

export const getUserShoppingListSuccessAction = data => ({
  type: GET_USER_SHOPPING_LIST_SUCCESS,
  data
});

export const getUserShoppingListFailureAction = () => ({ type: GET_USER_SHOPPING_LIST_FAILURE });

export const getUserShoppingList = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'GET', url: serverUrls.getAllGiftLists }).then((response) => {
      dispatch(getUserShoppingListSuccessAction(response.body));
    }, (error) => {
      dispatch(getUserShoppingListFailureAction(error));
    });
  };
};

export const getShoppingListItemsSuccessAction = data => ({
  type: GET_SHOPPING_LIST_ITEMS_SUCCESS,
  data
});

export const getShoppingListItemsFailureAction = () => ({ type: GET_SHOPPING_LIST_ITEMS_FAILURE });

export const getshoppingListItems = (params) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      method: 'GET',
      url: serverUrls.getAllItemsInShoppingList,
      params: { shopingListId: params }
    }).then((response) => {
      dispatch(getShoppingListItemsSuccessAction(response.body));
    }, (error) => {
      dispatch(getShoppingListItemsFailureAction(error));
    });
  };
};

export const removeItemFromShoppingListSuccessAction = data => ({
  type: REMOVE_ITEM_FROM_SHOPPING_LIST_SUCCESS,
  data
});

export const removeItemFromShoppingListFailureAction = () => ({ type: REMOVE_ITEM_FROM_SHOPPING_LIST_FAILURE });

export const removeItemFromShoppingList = (data) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'DELETE', url: serverUrls.removeItemFromGiftList, params: data }).then((resp) => {
      dispatch(removeItemFromShoppingListSuccessAction(resp.body));
    }, (error) => {
      dispatch(removeItemFromShoppingListFailureAction(error));
    });
  };
};

