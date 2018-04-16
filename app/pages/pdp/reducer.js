import _ from 'lodash';

import {
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_REQUEST,
  GET_PRODUCT_INFO_FAILURE,
  GET_PRODUCT_PRICE_INFO_SUCCESS,
  GET_PRODUCT_PRICE_INFO_REQUEST,
  GET_PRODUCT_PRICE_INFO_FAILURE,
  GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
  GET_RECENTLY_VIEWED_PRODUCTS_REQUEST,
  GET_RECENTLY_VIEWED_PRODUCTS_FAILURE,
  GET_DELIVERY_AND_RETURNS_DETAILS_SUCCESS,
  GET_DELIVERY_AND_RETURNS_DETAILS_REQUEST,
  GET_DELIVERY_AND_RETURNS_DETAILS_FAILURE,
  GET_PRODUCT_INVENTORY_DETAILS_SUCCESS,
  GET_PRODUCT_INVENTORY_DETAILS_REQUEST,
  GET_PRODUCT_INVENTORY_DETAILS_FAILURE,
  SET_RECENTLY_VIEWED_PRODUCT_URL_SUCCESS,
  SET_RECENTLY_VIEWED_PRODUCT_URL_FAILURE,
  PERFORM_INVENTORY_CHECK_SUCCESS,
  PERFORM_INVENTORY_CHECK_FAILURE,
  RESET_THE_COMPONENT_STATE,
  GET_PRODUCT_INVENTORY_FAILURE,
  GET_PRODUCT_INVENTORY_SUCCESS,
  GET_FAVOURITE_PRODUCT_INVENTORY_SUCCESS,
  GET_FAVOURITE_PRODUCT_INVENTORY_FAILURE,
  DISABLE_NEW_SUBURB_FLAG
} from './actions';

import {
  GET_DELIVERY_MODAL_SUBURBS_SUCCESS
} from '../../components/basic/delevery-model/actions';

const initialState = {
  productInfo: {},
  productInfoInProgress: false,
  // productPrices: {},
  productPricesInProgress: false,
  productInventory: {},
  productInventoryInProgress: false,
  // recentlyViewedProducts: {},
  recentlyViewedProductsInProgress: false,
  hasProductInventory: false,
  nonDelieverable: '',
  newSuburb: false
};

export default function pdp(state = initialState, action) {
  switch (action.type) {
    case RESET_THE_COMPONENT_STATE:
      return Object.assign({}, state, initialState);
    case '@@router/LOCATION_CHANGE':
      return Object.assign({}, state, { routeChanged: true });
    case GET_PRODUCT_INFO_REQUEST:
      return Object.assign({}, state, { productInfoInProgress: true });
    case GET_PRODUCT_INFO_SUCCESS: {
      const { productVariant, styleIdSizeSKUsMap, defaultStyleId, colourSKUs, productId, productType } = action.data.resp;
      let sku = {};

      if (productVariant) {
        if (productVariant === 'noVariant') {
          sku = _.get(styleIdSizeSKUsMap, `${defaultStyleId}[0]`, {});
        } else {
          sku = _.find(colourSKUs, ({ styleId }) => styleId === defaultStyleId) || {};
        }
      }

      let recentlyViewedItems = _.get(state, 'recentlyViewedProducts.recentlyViewedItems', []);
      if (sku.id && recentlyViewedItems) {
        recentlyViewedItems = _.compact(_.uniqBy([
          ...recentlyViewedItems,
          {
            productId,
            productType,
            displayName: sku.displayName,
            externalImage: sku.externalLargeImage,
            internalImage: sku.internalLargeImage,
            productURL: action.data.productURL,
            skuId: sku.id
          }
        ], 'skuId'));
      }

      return Object.assign({}, state, {
        productInfo: action.data.resp,
        productInfoInProgress: false,
        recentlyViewedProducts: { recentlyViewedItems }
      });
    }
    case GET_PRODUCT_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        productInfoInProgress: false
      });
    case GET_PRODUCT_PRICE_INFO_REQUEST:
      return Object.assign({}, state, { productPricesInProgress: true });
    case GET_PRODUCT_PRICE_INFO_SUCCESS:
      return Object.assign({}, state, {
        productPrices: Object.assign(state.productPrices || {}, action.data),
        newSuburb: false,
        productPricesInProgress: false
      });
    case GET_PRODUCT_PRICE_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        newSuburb: false,
        productPricesInProgress: false
      });
    case GET_RECENTLY_VIEWED_PRODUCTS_REQUEST:
      return Object.assign({}, state, { recentlyViewedProductsInProgress: true });
    case GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS:
      return Object.assign({}, state, { recentlyViewedProducts: action.data, recentlyViewedProductsInProgress: false });
    case SET_RECENTLY_VIEWED_PRODUCT_URL_SUCCESS: {
      const { skuId, productURL } = action.data;
      const products = _.get(state, 'recentlyViewedProducts.recentlyViewedItems', {});
      const recentlyViewedItems = _.map(products, (product) => {
        const _product = Object.assign({}, product);
        if (_product.skuId === skuId && _.isEmpty(_product.productURL)) {
          _product.productURL = productURL;
        }

        return _product;
      });

      return Object.assign({}, state, { recentlyViewedProducts: { recentlyViewedItems } });
    }
    case GET_RECENTLY_VIEWED_PRODUCTS_FAILURE:
    case SET_RECENTLY_VIEWED_PRODUCT_URL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        recentlyViewedProductsInProgress: false
      });
    case GET_DELIVERY_AND_RETURNS_DETAILS_SUCCESS:
      return Object.assign({}, state, { deliveryAndReturnsDetails: _.get(action, 'data.contents.FAQs', {}) });
    case GET_PRODUCT_INVENTORY_DETAILS_REQUEST:
      return Object.assign({}, state, { productInventoryInProgress: true });
    case GET_PRODUCT_INVENTORY_DETAILS_SUCCESS:
      if (!_.isEmpty(action.data) && !action.data.message) {
        return Object.assign({}, state, {
          productInventory: action.data,
          newSuburb: false,
          productInventoryInProgress: false,
          hasProductInventory: true
        });
      }

      return Object.assign({}, state, { productInventoryInProgress: false, hasProductInventory: true });
    case GET_PRODUCT_INVENTORY_DETAILS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        productInventoryInProgress: false,
        hasProductInventory: true
      });
    case GET_DELIVERY_AND_RETURNS_DETAILS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_PRODUCT_INVENTORY_SUCCESS:
      if (!_.isEmpty(action.data) && !action.data.message) {
        return Object.assign({}, state, {
          inventories: action.data,
          newSuburb: false
        });
      }

      return state;
    case GET_PRODUCT_INVENTORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_FAVOURITE_PRODUCT_INVENTORY_SUCCESS:
      if (!_.isEmpty(action.data) && !action.data.message) {
        return Object.assign({}, state, {
          favouriteProdctinventories: action.data,
          newSuburb: false
        });
      }

      return state;
    case GET_FAVOURITE_PRODUCT_INVENTORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
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

    case GET_DELIVERY_MODAL_SUBURBS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        nonDelieverable: undefined,
        newSuburb: true
      });
    case DISABLE_NEW_SUBURB_FLAG:
      return Object.assign({}, state, {
        isFetching: false,
        nonDelieverable: undefined,
        newSuburb: false
      });
    default:
      return state;
  }
}
