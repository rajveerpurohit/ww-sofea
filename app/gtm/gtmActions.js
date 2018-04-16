import _ from 'lodash';

import {
  TAG_ADD_TO_CART,
  TAG_REMOVE_FROM_CART,
  TAG_VIRTUAL_PAGE_VIEW,
  TAG_PRODUCT_IMPRESSIONS,
  TAG_PRODUCT_CLICKS
} from './gtmActionTypes';

export const tagAddToCart = productDetails => dispatch => dispatch({
  type: TAG_ADD_TO_CART,
  payload: productDetails,
});

export const tagRemoveFromCart = productDetails => dispatch => dispatch({
  type: TAG_REMOVE_FROM_CART,
  payload: productDetails,
});

export const tagProductImpressions = products => dispatch => dispatch({
  type: TAG_PRODUCT_IMPRESSIONS,
  payload: products,
});

export const tagProductClicks = (products, isFromRecentlyViewedMenu) => (dispatch, getStore) => {
  if (isFromRecentlyViewedMenu) {
    return dispatch({
      type: TAG_PRODUCT_CLICKS,
      payload: { products, actionField: 'Recently Viewed' }
    });
  }

  const records = _.get(getStore(), 'clp.SLPData[0].mainContent[0].contents[0].records', []);
  const position = _.findIndex(records, ({ attributes }) => (attributes.p_productid === products[0].id));

  return dispatch({
    type: TAG_PRODUCT_CLICKS,
    payload: [_.assign({}, products[0], { position })]
  });
};
