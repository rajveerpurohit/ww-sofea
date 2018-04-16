import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import { serverUrls } from '../../../../server/controllers/apiAggregatorEndPoints';
import {
  UPDATE_FAVORITE_LIST,
  UPDATE_FAVORITE_LIST_REMOVE,
  HIDE_LOADER,
  SHOW_LOADER
} from '../../../types';


polyfill();

export const ADD_ITEM_TO_FAVORITE_LIST_SUCCESS = 'ADD_ITEM_TO_FAVORITE_LIST_SUCCESS';
export const ADD_ITEM_TO_FAVORITE_LIST_FAILURE = 'ADD_ITEM_TO_FAVORITE_LIST_FAILURE';
export const REMOVE_ITEM_FROM_FAVORITE_LIST_SUCCESS = 'REMOVE_ITEM_FROM_FAVORITE_LIST_SUCCESS';
export const REMOVE_ITEM_FROM_FAVORITE_LIST_FAILURE = 'REMOVE_ITEM_FROM_FAVORITE_LIST_FAILURE';
export const GET_ALL_ITEMS_IN_WISHLIST_SUCCESS = 'GET_ALL_ITEMS_IN_WISHLIST_SUCCESS';
export const GET_ALL_ITEMS_IN_WISHLIST_FAILURE = 'GET_ALL_ITEMS_IN_WISHLIST_FAILURE';

const hideLoader = () => ({ type: HIDE_LOADER });
const loader = () => ({ type: SHOW_LOADER });

export const getAllItemsInWishListSuccessAction = data => ({
  type: GET_ALL_ITEMS_IN_WISHLIST_SUCCESS,
  data
});

export const getAllItemsInWishListFailureAction = () => ({ type: GET_ALL_ITEMS_IN_WISHLIST_FAILURE });

export const getAllItemsInWishList = (params, reqUrl, reqHeaders) => {
  return (dispatch) => {
    if (reqUrl === '/accountdetails/favourites') dispatch(loader(true));
    return ServiceUtil.triggerServerRequest({ method: 'GET', url: serverUrls.getAllItemsInWishList }).then((value) => {
      dispatch(getAllItemsInWishListSuccessAction(value.body));
      if (reqUrl === '/accountdetails/favourites') dispatch(hideLoader());
    }, (error) => {
      dispatch(getAllItemsInWishListFailureAction(error));
      if (reqUrl === '/accountdetails/favourites') dispatch(hideLoader());
    });
  };
};

export const addItemToFavoriteListSuccessAction = data => ({
  type: ADD_ITEM_TO_FAVORITE_LIST_SUCCESS,
  data
});

export const addItemToFavoriteListFailureAction = () => ({ type: ADD_ITEM_TO_FAVORITE_LIST_FAILURE });

export const addItemToFavoriteList = (data) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.addItemToWishList, data }).then((value) => {
      dispatch(addItemToFavoriteListSuccessAction(value.body));
      dispatch({
        type: UPDATE_FAVORITE_LIST,
        data: value.body
      });
    }, (error) => {
      dispatch(addItemToFavoriteListFailureAction(error));
    });
  };
};

export const removeItemFromFavoriteListSuccessAction = data => ({
  type: REMOVE_ITEM_FROM_FAVORITE_LIST_SUCCESS,
  data
});

export const removeItemFromFavoriteListFailureAction = () => ({ type: REMOVE_ITEM_FROM_FAVORITE_LIST_FAILURE });

export const removeItemFromFavoriteList = (params) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'DELETE', url: serverUrls.removeItemFromWishList, params }).then((resp) => {
      dispatch(removeItemFromFavoriteListSuccessAction(resp.body));
      // dispatch({
      //   type: UPDATE_FAVORITE_LIST_REMOVE,
      //   data: params
      // });
      // dispatch(getAllItemsInWishList());
      dispatch(getAllItemsInWishListSuccessAction(resp.body));
    }, (error) => {
      dispatch(removeItemFromFavoriteListFailureAction(error));
    });
  };
};
