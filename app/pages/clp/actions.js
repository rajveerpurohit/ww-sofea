import { polyfill } from 'es6-promise';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import localeInfoUtil from '../../services/localeInfoUtil';
import { loader, setSEOInformation, resetSEOInformation } from '../../actions/common';


import { tagProductImpressions } from '../../gtm/gtmActions';

polyfill();

/*
 * CONSTANTS
*/
export const GET_CLP_JSON_SUCCESS = 'GET_CLP_JSON_SUCCESS';
export const GET_CLP_DATA_FAILURE = 'GET_CLP_DATA_FAILURE';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';
export const GET_SLP_JSON_SUCCESS = 'GET_SLP_JSON_SUCCESS';
export const GET_SLP_DATA_FAILURE = 'GET_SLP_DATA_FAILURE';
export const SET_CURRENT_USER_SHOPPING_URL = 'SET_CURRENT_USER_SHOPPING_URL';

export const clpJSONSuccessAction = data => ({
  type: GET_CLP_JSON_SUCCESS,
  data
});

export const SLPJSONSuccessAction = data => ({
  type: GET_SLP_JSON_SUCCESS,
  data
});
export const setCurrentUserBackToShoppingURLAction = data => ({
  type: SET_CURRENT_USER_SHOPPING_URL,
  data
});

export const getCurrentUserSuccessAction = data => ({
  type: GET_CURRENT_USER_SUCCESS,
  data
});
const getProductCategory = (product) => {
  const splat = _.get(product, 'detailPageURL', '');
  const category = splat.split('/').slice(2, -3);

  return category.join('/');
};

const getProductPricesNVariant = (records, currentUser, skuId) => {
  const prod = _.find(records, ({ attributes }) => (attributes.p_SKU === skuId)) || {};
  const prices = _.compact([
    _.get(prod, `attributes.p_pl${currentUser.priceListZoneId}_wp`, null),
    _.get(prod, `attributes.p_pl${currentUser.priceListZoneId}`, null)
  ]);

  return {
    variant: _.get(prod, 'attributes.p_swatchColour', null),
    price: prices.join(' ')
  };
};

const trackSLPProductImpressions = (slpResp, store) => {
  const products = _.get(slpResp, 'contents[0].mainContent[0].contents[0].records', []);
  const currentUser = _.get(store, 'clp.currentUser', {});

  if (_.isEmpty(currentUser)) return null;

  return _.map(products, (product, position) => {
    const attr = product.attributes;
    const { price, variant } = getProductPricesNVariant(product.records, currentUser, attr.p_SKU);

    return {
      name: attr.p_displayName,
      brand: attr.Brands,
      category: getProductCategory(product),
      list: 'Search Results',

      id: attr.p_productid,
      sku: attr.p_SKU,
      position,
      variant,
      price
    };
  });
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const clpJSONFailureAction = () => ({ type: GET_CLP_DATA_FAILURE });
export const SLPJSONFailureAction = () => ({ type: GET_SLP_DATA_FAILURE });

export const getSLPPageData = (params, reqUrl, reqHeaders) => {
  let path = '';
  let slpParams = {};
  if (reqUrl) {
    if (reqUrl.indexOf('?') !== -1) {
      path = reqUrl.substring(0, reqUrl.indexOf('?'));
    } else {
      path = reqUrl;
    }
  } else if (params.splat) {
    path = '/cat/' + params.splat;
  } else if (params.pageURL) {
    path = params.pageURL;
  } else if (typeof window !== 'undefined' && window) {
    path = window.location.pathname;
  }
  // path = path.replace('/search', '/cat');
  const getNttValue = localeInfoUtil.getParameterByName('Ntt', reqUrl);
  const getDyValue = localeInfoUtil.getParameterByName('Dy', reqUrl);
  const getNoValue = localeInfoUtil.getParameterByName('No', reqUrl);
  const getNrValue = localeInfoUtil.getParameterByName('Nr', reqUrl);
  const getNrppValue = localeInfoUtil.getParameterByName('Nrpp', reqUrl);
  const getNsValue = localeInfoUtil.getParameterByName('Ns', reqUrl);
  slpParams = {
    pageURL: path,
    No: params && params.No ? params.No : getNoValue ? getNoValue : '0',
    Nr: params && params.Nr ? params.Nr : getNrValue,
    Nrpp: params && params.Nrpp ? params.Nrpp : getNrppValue,
    Ns: params && params.Ns ? params.Ns : getNsValue,
    Ntt: params && params.Ntt ? params.Ntt : getNttValue
  };
  if (getDyValue !== null) {
    slpParams = {
      pageURL: path,
      Ntt: getNttValue,
      Dy: getDyValue
    };
  }

  return (dispatch, getStore) => {
    dispatch(loader(true));
    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.searchCategory,
      params: { ...slpParams }
    }).then((response) => {
      dispatch(loader(false));
      if (response.body) {
        if (response.body.contents['@type'] === 'Redirect') {
          browserHistory.push({
            pathname: response.body.contents.redirectURL,
          });
        }
        dispatch(setCurrentUserBackToShoppingURLAction());
        dispatch(setSEOInformation({
          clp: {
            title: response.body.contents[0].title,
            metaKeywords: response.body.contents[0].metaKeywords,
            metaDescription: response.body.contents[0].metaDescription
          }
        }));

        if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined') {
          dispatch(tagProductImpressions(trackSLPProductImpressions(response.body, getStore())));
        }

        return Promise.all([
          dispatch(SLPJSONSuccessAction({ data: response.body }))
        ]);
      }
    }, (error) => {
      dispatch(loader(false));
      if (error.body.statusCode === 500 || error.body.statusCode === 503) {
        browserHistory.push({
          pathname: '/500',
        });
      }
      if (error.body.statusCode === 400) {
        browserHistory.push({
          pathname: '/400',
        });
      }
      return Promise.all([
        dispatch(SLPJSONFailureAction({ data: error.body }))
      ]);
    });
  };
};

export const getCLPPageData = (params, reqUrl, reqHeaders) => {
  let url = '';
  if (params.splat) {
    url = '/cat/' + params.splat;
  } else if (params.pageURL) {
    url = params.pageURL;
  } else if (typeof window !== 'undefined' && window) {
    url = window.location.pathname;
  }
  const No = localeInfoUtil.getParameterByName('No', reqUrl);
  const Nr = localeInfoUtil.getParameterByName('Nr', reqUrl);
  const Nrpp = localeInfoUtil.getParameterByName('Nrpp', reqUrl);
  const Ns = localeInfoUtil.getParameterByName('Ns', reqUrl);
  const clpParams = {
    pageURL: params ? url : reqUrl,
    No: params && params.No ? params.No : No,
    Nr: params && params.Nr ? params.Nr : Nr,
    Nrpp: params && params.Nrpp ? params.Nrpp : Nrpp,
    Ns: params && params.Ns ? params.Ns : Ns
  };

  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.landingpages,
      params: { ...clpParams }
    }).then((value) => {
      if (value.body) {
        return Promise.all([
          dispatch(clpJSONSuccessAction({ data: value.body }))
        ]);
      }
    }, (error) => {
      return Promise.all([
        dispatch(clpJSONFailureAction({ data: error.body }))
      ]);
    });
  };
};

export const getCurrentUserFailureAction = () => ({ type: GET_CURRENT_USER_FAILURE });

export const getCurrentUser = (params, reqUrl, reqHeaders) => {
  return (dispatch) => {
    // console.log('clp current user', params);
    // return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.currentUser, params }).then((response) => {
    //   dispatch(getCurrentUserSuccessAction(response.body));
    //   dispatch(setCurrentUserBackToShoppingURLAction({
    //     backToShoppingURL: params
    //   }));
    // }, error => dispatch(getCurrentUserFailureAction(error)));
  };
};
