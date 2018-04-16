import { polyfill } from 'es6-promise';
import _split from 'lodash/split';
import _last from 'lodash/last';
import _isArray from 'lodash/isArray';
import _uniq from 'lodash/uniq';
import url from 'url';
import qs from 'qs';

import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import { loader, setSEOInformation, resetSEOInformation } from '../../actions/common';

import { DELIVERY_AND_RETURN_FAQ_CONTENT_ID } from '../../Constants';

import { HIDE_LOADER } from '../../types';

polyfill();

export const GET_PRODUCT_INFO_SUCCESS = 'GET_PRODUCT_INFO_SUCCESS';
export const GET_PRODUCT_INFO_REQUEST = 'GET_PRODUCT_INFO_REQUEST';
export const GET_PRODUCT_INFO_FAILURE = 'GET_PRODUCT_INFO_FAILURE';

export const GET_PRODUCT_PRICE_INFO_SUCCESS = 'GET_PRODUCT_PRICE_INFO_SUCCESS';
export const GET_PRODUCT_PRICE_INFO_REQUEST = 'GET_PRODUCT_PRICE_INFO_REQUEST';
export const GET_PRODUCT_PRICE_INFO_FAILURE = 'GET_PRODUCT_PRICE_INFO_FAILURE';

export const GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS = 'GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS';
export const GET_RECENTLY_VIEWED_PRODUCTS_REQUEST = 'GET_RECENTLY_VIEWED_PRODUCTS_REQUEST';
export const GET_RECENTLY_VIEWED_PRODUCTS_FAILURE = 'GET_RECENTLY_VIEWED_PRODUCTS_FAILURE';

export const GET_DELIVERY_AND_RETURNS_DETAILS_SUCCESS = 'GET_DELIVERY_AND_RETURNS_DETAILS_SUCCESS';
export const GET_DELIVERY_AND_RETURNS_DETAILS_REQUEST = 'GET_DELIVERY_AND_RETURNS_DETAILS_REQUEST';
export const GET_DELIVERY_AND_RETURNS_DETAILS_FAILURE = 'GET_DELIVERY_AND_RETURNS_DETAILS_FAILURE';

export const GET_PRODUCT_INVENTORY_DETAILS_SUCCESS = 'GET_PRODUCT_INVENTORY_DETAILS_SUCCESS';
export const GET_PRODUCT_INVENTORY_DETAILS_REQUEST = 'GET_PRODUCT_INVENTORY_DETAILS_REQUEST';
export const GET_PRODUCT_INVENTORY_DETAILS_FAILURE = 'GET_PRODUCT_INVENTORY_DETAILS_FAILURE';

export const SET_RECENTLY_VIEWED_PRODUCT_URL_SUCCESS = 'SET_RECENTLY_VIEWED_PRODUCT_URL_SUCCESS';
export const SET_RECENTLY_VIEWED_PRODUCT_URL_FAILURE = 'SET_RECENTLY_VIEWED_PRODUCT_URL_FAILURE';
export const PERFORM_INVENTORY_CHECK_SUCCESS = 'PERFORM_INVENTORY_CHECK_SUCCESS';
export const PERFORM_INVENTORY_CHECK_FAILURE = 'PERFORM_INVENTORY_CHECK_FAILURE';
export const RESET_THE_COMPONENT_STATE = 'RESET_THE_COMPONENT_STATE';
export const GET_PRODUCT_INVENTORY_SUCCESS = 'GET_PRODUCT_INVENTORY_SUCCESS';
export const GET_PRODUCT_INVENTORY_FAILURE = 'GET_PRODUCT_INVENTORY_FAILURE';
export const DISABLE_NEW_SUBURB_FLAG = 'DISABLE_NEW_SUBURB_FLAG';

export const GET_FAVOURITE_PRODUCT_INVENTORY_SUCCESS = 'GET_FAVOURITE_PRODUCT_INVENTORY_SUCCESS';
export const GET_FAVOURITE_PRODUCT_INVENTORY_FAILURE = 'GET_FAVOURITE_PRODUCT_INVENTORY_FAILURE';

const hideLoder = () => ({ type: HIDE_LOADER });

export const resetComponentState = () => dispatch => dispatch({ type: RESET_THE_COMPONENT_STATE });

export const getProductPriceInfoSuccessAction = data => ({
  type: GET_PRODUCT_PRICE_INFO_SUCCESS,
  data
});
export const getProductPriceInfoInProgress = () => dispatch => dispatch({ type: GET_PRODUCT_PRICE_INFO_REQUEST });
export const getProductPriceInfoFailureAction = () => ({ type: GET_PRODUCT_PRICE_INFO_FAILURE });
export const getProductPriceInfo = (params, reqUrl, reqHeaders) => {
  return (dispatch) => {
    let productIds = [];
    if (params.splat) {
      const pUrl = url.parse(params.splat);
      productIds = [_last(_split(pUrl.pathname, '-'))];
    } else if (_isArray(params)) {
      productIds = _uniq(params);
    }

    dispatch(getProductPriceInfoInProgress());

    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.getProductPrice,
      params: { productIds: productIds.join(',') }
    }).then(
      value => dispatch(getProductPriceInfoSuccessAction(value.body)),
      error => dispatch(getProductPriceInfoFailureAction(error))
    );
  };
};

export const getProductInventoryDetailsSuccessAction = data => ({
  type: GET_PRODUCT_INVENTORY_DETAILS_SUCCESS,
  data
});
export const getProductInventoryDetailsInProgress = () => dispatch => dispatch({ type: GET_PRODUCT_INVENTORY_DETAILS_REQUEST });
export const getProductInventoryDetailsFailureAction = () => ({ type: GET_PRODUCT_INVENTORY_DETAILS_FAILURE });
export const getProductInventoryDetails = (storeId, inventoryIds) => {
  return (dispatch) => {
    dispatch(getProductInventoryDetailsInProgress());

    return ServiceUtil.triggerServerRequest({
      url: serverUrls.getProductInventoryByStoreId,
      params: { storeId, inventoryIds: inventoryIds.join('-') }
    })
      .then(
        (value) => {
          dispatch(hideLoder());
          dispatch(getProductInventoryDetailsSuccessAction(value.body));
        },
        (error) => {
          dispatch(hideLoder());
          dispatch(getProductInventoryDetailsFailureAction(error));
        }
      );
  };
};

export const getProductInfoSuccessAction = data => ({
  type: GET_PRODUCT_INFO_SUCCESS,
  data
});
export const getProductInfoInProgress = () => dispatch => dispatch({ type: GET_PRODUCT_INFO_REQUEST });
export const getProductInfoFailureAction = () => ({ type: GET_PRODUCT_INFO_FAILURE });
export const getProductInfo = (params, reqUrl, reqHeaders) => {
  return (dispatch) => {
    const pUrl = reqUrl ? url.parse(reqUrl) : url.parse(params.splat);
    const { colourSKUId } = qs.parse(pUrl.query);
    const productURL = '/' + pUrl.pathname.replace(/^\//, '');
    const query = {
      productURL
    };

    if (colourSKUId) {
      query.colourSKUId = colourSKUId;
    }

    dispatch(getProductInfoInProgress());

    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.getProductInfo,
      params: query
    }).then(
      (value) => {
        dispatch(getProductInfoSuccessAction({ resp: value.body, productURL }));
        dispatch(setSEOInformation({
          pdp: {
            title: value.body.description,
            metaKeywords: value.body.seoMetaKeyWords,
            metaDescription: value.body.seoMetaDescription
          }
        }));
      },
      error => dispatch(getProductInfoFailureAction(error))
    );
  };
};

export const getRecentlyViewedProductsSuccessAction = data => ({
  type: GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
  data
});
export const getRecentlyViewedProductsInProgress = () => dispatch => dispatch({ type: GET_RECENTLY_VIEWED_PRODUCTS_REQUEST });
export const getRecentlyViewedProductsFailureAction = () => ({ type: GET_RECENTLY_VIEWED_PRODUCTS_FAILURE });
export const getRecentlyViewedProducts = (params, reqUrl, reqHeaders) => {
  return (dispatch) => {
    let productIds = [];
    if (params.splat) {
      const pUrl = url.parse(params.splat);
      productIds = [_last(_split(pUrl.pathname, '-'))];
    } else if (_isArray(params)) {
      productIds = _uniq(params);
    }

    dispatch(getRecentlyViewedProductsInProgress());

    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.getRecentlyViewedProducts,
      params: { productId: productIds.join('-') }
    }).then(
      value => dispatch(getRecentlyViewedProductsSuccessAction(value.body)),
      error => dispatch(getRecentlyViewedProductsFailureAction(error))
    );
  };
};

export const getDeliveryAndReturnsDetailsSuccessAction = data => ({
  type: GET_DELIVERY_AND_RETURNS_DETAILS_SUCCESS,
  data
});
export const getDeliveryAndReturnsDetailsInProgress = () => dispatch => dispatch({ type: GET_DELIVERY_AND_RETURNS_DETAILS_REQUEST });
export const getDeliveryAndReturnsDetailsFailureAction = () => ({ type: GET_DELIVERY_AND_RETURNS_DETAILS_FAILURE });
export const getDeliveryAndReturnsDetails = (params, reqUrl, reqHeaders) => {
  return (dispatch) => {
    dispatch(getDeliveryAndReturnsDetailsInProgress());

    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.faqDetails,
      params: { faqId: DELIVERY_AND_RETURN_FAQ_CONTENT_ID }
    })
      .then(
        value => dispatch(getDeliveryAndReturnsDetailsSuccessAction(value.body)),
        error => dispatch(getDeliveryAndReturnsDetailsFailureAction(error))
      );
  };
};

export const getProductInventorySuccessAction = data => ({
  type: GET_PRODUCT_INVENTORY_SUCCESS,
  data
});
export const getProductInventoryFailureAction = () => ({ type: GET_PRODUCT_INVENTORY_FAILURE });
export const getProductInventory = (inventoryIds, inventoryStores) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.getProductInventoryByStoreId,
      params: { inventoryIds: inventoryIds.join('-'), storeId: inventoryStores.join('-') }
      // params: { inventoryIds: inventoryIds.join('-') }
    })
      .then(
        (value) => {
          dispatch(hideLoder());
          dispatch(getProductInventorySuccessAction(value.body));
        },
        (error) => {
          dispatch(hideLoder());
          dispatch(getProductInventoryFailureAction(error));
        }
      );
  };
};

export const getFavouriteProductInventorySuccessAction = data => ({
  type: GET_FAVOURITE_PRODUCT_INVENTORY_SUCCESS,
  data
});
export const getFavouriteProductInventoryFailureAction = () => ({ type: GET_FAVOURITE_PRODUCT_INVENTORY_FAILURE });
export const getFavouriteProductInventory = (inventoryIds, inventoryStores) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.getProductInventoryByStoreId,
      params: { inventoryIds: inventoryIds.join('-'), storeId: inventoryStores.join('-') }
    })
      .then(
        (value) => {
          dispatch(hideLoder());
          dispatch(getFavouriteProductInventorySuccessAction(value.body));
        },
        (error) => {
          dispatch(hideLoder());
          dispatch(getFavouriteProductInventoryFailureAction(error));
        }
      );
  };
};

export const setRecentlyViewedProductURLSuccessAction = data => ({
  type: SET_RECENTLY_VIEWED_PRODUCT_URL_SUCCESS,
  data
});
export const setRecentlyViewedProductURLFailureAction = () => ({ type: SET_RECENTLY_VIEWED_PRODUCT_URL_FAILURE });
export const setRecentlyViewedProductURL = (skuId, productURL) => dispatch => dispatch(setRecentlyViewedProductURLSuccessAction({ skuId, productURL }));


export const performInventoryCheckSuccessAction = data => ({
  type: PERFORM_INVENTORY_CHECK_SUCCESS,
  data
});
export const performInventoryCheckFailureAction = data => ({
  type: PERFORM_INVENTORY_CHECK_FAILURE,
  data
});
export const performInventoryCheck = (data) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      method: 'POST',
      url: serverUrls.performInventoryCheck,
      data
    })
      .then(
        (value) => {
          dispatch(hideLoder());
          dispatch(performInventoryCheckSuccessAction(value.body));
        },
        (error) => {
          dispatch(hideLoder());
          dispatch(performInventoryCheckFailureAction(error));
        }
      );
  };
};

export const disableNewSuburbFlag = () => ({ type: DISABLE_NEW_SUBURB_FLAG });
