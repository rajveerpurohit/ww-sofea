import _ from 'lodash';
import { API_AGGRIGATOR_URL } from '../../config/app';

const ServiceFacade = require('./service-facade');
const cookiesHandler = require('../util/cookiesHandler');

const apiaggregatorEndpoints = require('../controllers/apiAggregatorEndPoints');
// const logger = require('../../lib/serverLoggerHandler');

// const loggerHandler = logger.getBunyanInstance('components');

const endpoints = apiaggregatorEndpoints.endpoints;
// const endpointsUrlKeys = apiaggregatorEndpoints.endpointsUrlKeys;
// const headers = require('../../config/appConfig').headers;

// let _API_AGGRIGATOR_URL = require('../../config/app')._API_AGGRIGATOR_URL;

// const OCCStoreURL = require('../../config/appConfig').OCCStoreURL;

// const XSSFilters = require('xss-filters');

const _API_AGGRIGATOR_URL = API_AGGRIGATOR_URL + '/api';


const components = {
  setRequestHeader(req, config) {
    // Set the Request Header for "accept-language, Host and Cookie"
    // config.headers['accept-language'] = req.headers['accept-language'];
    // config.headers.host = req.headers.host;

    const reqHeaderCookie = req.get('cookie');
    if (reqHeaderCookie) {
      config.headers.cookie = reqHeaderCookie;
    }
    return config;
  },

  sanitizeHTML(queryFragment) {
    const dirty = queryFragment;
    const clean = XSSFilters.inHTMLData(dirty);
    return clean;
  },

  setup(req, res, componentName) {
    const cb = function (response) {
      // console.log('response', response);
      if (typeof response.headers !== 'undefined' && typeof response.data !== 'undefined') {
        // loggerHandler.debug({ req }, 'Component AA Call Setup :::Response Header Cookie received in components from AA ::::', req.url);

        res.headers = response.headers;
        res.append('Cache-Control', 'no-cache'); // This code disables GET request caching for IE

        cookiesHandler.setResponseCookies(req, res, response, false);

        if (response.status !== 200) {
          res.status(response.status);
        }

        if (typeof response.data === 'string') {
          res.json(JSON.parse(response.data));
        } else {
          res.json(response.data);
        }
      } else if (typeof response.timeout !== 'undefined') {
        // loggerHandler.error({ req }, 'Component AA Call Setup ::: Timeout happened for AA Call ::::', req.url, response);

        res.status(500).send({
          err: 'Timeout happened for AA Call',
          code: 500
        });
      } else {
        // loggerHandler.error({ req }, 'Component AA Call Setup ::: Error happened for AA Call ::::', req.url, response);

        res.status(500).send({
          err: 'Error happened for AA Call',
          code: 500
        });
      }
    };

    let url = '';
    url = _API_AGGRIGATOR_URL + endpoints[componentName];
    if (componentName === 'searchDepartment') {
      url += `?pageURL=${req.query.pageURL}`;
    }
    if (componentName === 'cartDetails') {
      const { isCartPage } = req.query;
      if (isCartPage) {
        url += `?isCartPage=${isCartPage}`;
      }
    }
    if (componentName === 'getAccountDetails') {
      url = url.replace(':profileId', req.query.profileId);
    }
    if (componentName === 'storelocatorByGeoLocation') {
      url += `?latitude=${req.query.latitude}&longitude=${req.query.longitude}&distance=${req.query.distance}`;
    } else if (componentName === 'storelocatorByArea') {
      url += `${req.query.suburbId}?distance=${req.query.distance}`;
    }

    if (componentName === 'faqDetails') {
      url += `?contentId=${req.query.faqId}`;
    }
    if (componentName === 'getAllItemsInShoppingList') {
      url = url.replace(':shopingListId', req.query.shopingListId);
    }

    if (componentName === 'corporate') {
      if (req.query.contentId) {
        url += `?contentId=${req.query.contentId}`;
      }
    }

    if (componentName === 'wrewards') {
      if (req.query.contentId) {
        switch (req.query.contentId) {
          case 'about-littleworld': url += '?contentid=/rewards/about-littleworld'; break;
          case 'about-rewards': url += '?contentid=/rewards/about-rewards'; break;
          case 'about-myschool': url += '?contentid=/rewards/about-myschool'; break;
          default: url += `?contentid=/${req.query.contentId}`; break;
        }
      }
    }

    if (componentName === 'wrewardsTierStatus') {
      if (req.query.identificationNumber) {
        url += `?identificationNumber=${req.query.identificationNumber}`;
      }
    }

    if (componentName === 'selectedsuburb') {
      url += `?suburbid=${req.query.suburbid}`;
    }
    if (componentName === 'recipe') {
      url += `?contentId=${req.query.contentId}`;
    }

    if (componentName === 'search') {
      url += `?Ntt=${req.query.searchQuery}&Dy=1`;
    }
    if (componentName === 'faqDetails') {
      url += `?contentId=${req.query.faqId}`;
    }
    if (componentName === 'searchSuburb') {
      if (req.query.suburbInput) {
        url += `/${req.query.suburbInput}`;
      }
    }
    if (componentName === 'financialServicesLandingPage') {
      if (req.query.contentId) {
        switch (req.query.contentId) {
          case 'credit-card': url += '/wfscontent/credit-card'; break;
          case 'store-card-benefits': url += '/wfscontent/store-card-benefits'; break;
          case 'personal-loans': url += '/wfscontent/personal-loans'; break;
          case 'insurance': url += '/wfscontent/insurance'; break;
          case 'about-wfs': url += '/wfscontent/about-wfs'; break;
          case 'black-card-benefits': url += '/wfscontent/black-card-benefits'; break;
          case 'gold-card-benefits': url += '/wfscontent/gold-card-benefits'; break;
          case 'silver-card-benefits': url += '/wfscontent/silver-card-benefits'; break;
          case 'balance-protection-insurance': url += '/wfscontent/balance-protection-insurance'; break;
          case 'travel-insurance': url += '/wfscontent/travel-insurance'; break;
          case 'black-card-pricing': url += '/wfscontent/black-card-pricing'; break;
          case 'gold-card-pricing': url += '/wfscontent/gold-card-pricing'; break;
          case 'silver-card-pricing': url += '/wfscontent/silver-card-pricing'; break;
          case 'store-card-pricing': url += '/wfscontent/store-card-pricing'; break;
          case 'shopping-tips': url += '/wfscontent/shopping-tips'; break;
          case 'about-credit-card-banking': url += '/wfscontent/about-credit-card-banking'; break;
          case 'personal-loans-pricing': url += '/wfscontent/personal-loans-pricing'; break;
          case 'personal-loans-payment-options': url += '/wfscontent/personal-loans-payment-options'; break;
          case 'credit-card-payment-options': url += '/wfscontent/credit-card-payment-options'; break;
          default: break;
        }
      }
    }
    if (componentName === 'searchCategory') {
      if (req.query.Dy) {
        url += `?pageURL=${req.query.pageURL}&Ntt=${req.query.Ntt}&Dy=1`;
      } else if (req.query.Ntt) {
        if (req.query.Nr && req.query.Ns && req.query.No && req.query.Nrpp) {
          url += `?pageURL=${req.query.pageURL}&No=${req.query.No}&Nrpp=${req.query.Nrpp}&Nr=${req.query.Nr}&Ns=${req.query.Ns}&Ntt=${req.query.Ntt}`;
        } else if (req.query.Nr && req.query.No && req.query.Nrpp) {
          url += `?pageURL=${req.query.pageURL}&No=${req.query.No}&Nrpp=${req.query.Nrpp}&Nr=${req.query.Nr}&Ntt=${req.query.Ntt}`;
        } else if (req.query.Nr && req.query.Ns) {
          url += `?pageURL=${req.query.pageURL}&Nr=${req.query.Nr}&Ns=${req.query.Ns}&Ntt=${req.query.Ntt}`;
        } else if (req.query.Nr && req.query.Nrpp) {
          url += `?pageURL=${req.query.pageURL}&Nr=${req.query.Nr}&Nrpp=${req.query.Nrpp}&Ntt=${req.query.Ntt}`;
        } else if (req.query.No && req.query.Nrpp) {
          url += `?pageURL=${req.query.pageURL}&No=${req.query.No}&Nrpp=${req.query.Nrpp}&Ntt=${req.query.Ntt}`;
        } else if (req.query.Nr) {
          url += `?pageURL=${req.query.pageURL}&Nr=${req.query.Nr}&Ntt=${req.query.Ntt}`;
        } else {
          url += `?pageURL=${req.query.pageURL}&Ntt=${req.query.Ntt}`;
        }
      } else if (req.query.Nr && req.query.Ns && req.query.No && req.query.Nrpp) {
        url += `?pageURL=${req.query.pageURL}&No=${req.query.No}&Nrpp=${req.query.Nrpp}&Nr=${req.query.Nr}&Ns=${req.query.Ns}`;
      } else if (req.query.Nr && req.query.No && req.query.Nrpp) {
        url += `?pageURL=${req.query.pageURL}&No=${req.query.No}&Nrpp=${req.query.Nrpp}&Nr=${req.query.Nr}`;
      } else if (req.query.Nr && req.query.Ns) {
        url += `?pageURL=${req.query.pageURL}&Nr=${req.query.Nr}&Ns=${req.query.Ns}`;
      } else if (req.query.Nr && req.query.Nrpp) {
        url += `?pageURL=${req.query.pageURL}&Nr=${req.query.Nr}&Nrpp=${req.query.Nrpp}`;
      } else if (req.query.No && req.query.Nrpp) {
        url += `?pageURL=${req.query.pageURL}&No=${req.query.No}&Nrpp=${req.query.Nrpp}`;
      } else if (req.query.Nr) {
        url += `?pageURL=${req.query.pageURL}&Nr=${req.query.Nr}`;
      } else {
        url += `?pageURL=${req.query.pageURL}`;
      }
    }
    if (componentName === 'deletecreditcarddetails') {
      if (req.query.cardId) {
        url += `/${req.query.cardId}`;
      }
    }
    if (componentName === 'removeItemFromWishList') {
      url = url.replace(':wishlistId', req.query.giftlistId);
    }
    if (componentName === 'cartUpdateItemQty') {
      url = url.replace(':commerceItemId', req.query.commerceItemId);
    }
    if (componentName === 'getChangedAddress') {
      url = url.replace(':changedAddress', req.query.changedAddress);
    }

    if (componentName === 'getProductInfo') {
      const { productURL, colourSKUId } = req.query;

      url += `?productURL=${productURL}${colourSKUId ? '&colourSKUId=' + colourSKUId : ''}`;
    }

    if (componentName === 'orderhistory') {
      url += `?numOfOrders=${req.query.numOfOrders}&numOfDays=${req.query.numOfDays}&sortBy=${req.query.sortBy}`;
    }

    if (componentName === 'orderDetails') {
      url = url.replace(':orderId', req.query.orderId);
    }

    if (componentName === 'cancelOrder') {
      url += `?orderId=${req.query.orderId}`;
    }

    if (componentName === 'addItemsToOrder') {
      url += `?orderIdForBE=${req.query.orderIdForBE}&commerceItemType=${req.query.commerceItemType}`;
    }

    if (componentName === 'getProductPrice') {
      url += `?productIds=${req.query.productIds}`;
    }

    if (componentName === 'getRecentlyViewedProducts') {
      url = url.replace(':productId', req.query.productId);
    }

    if (componentName === 'getProductInventoryByStoreId') {
      url = url.replace(':storeId', req.query.storeId).replace(':inventoryIds', req.query.inventoryIds);
    }
    if (componentName === 'getProductInventory') {
      url = url.replace(':inventoryIds', req.query.inventoryIds);
    }
    if (componentName === 'updateaddress') {
      url = url.replace('/:addressId', `/${req.body.id}`);
    }
    if (componentName === 'fetchcustomer') {
      url = url.replace('/:idenificationNumber', `?idenificationNumber=${req.query.idenificationNumber}`);
    }
    if (componentName === 'deleteaddress') {
      url = url.replace('/:addressId', `/?addressId=${req.body.addressId}`);
    }
    if (componentName === 'fetchaddress') {
      url = url.replace('/:customerId', `?customerId=${req.query.customerId}`);
    }
    if (componentName === 'editcustomeraddress') {
      url = url.replace('/:addressID', `?addressID=${req.query.addressID}`);
    }
    // TODO: Replace with generic code

    /* hot fix to convert | in sanitized string, for PLP filters */
    url = url.replace('%7C', '|');

    let config = {
      url,
      headers: {
        cookie: '',
        'accept-language': ''
        // host: ''
      }
    };
    config = components.setRequestHeader(req, config);
    return {
      cb,
      config
    };
  },

  post(req, res, componentName) {
    const setupData = components.setup(req, res, componentName);
    if (componentName === 'removeItemFromWishList') {
      setupData.config.data = req.query;
    } else {
      setupData.config.data = req.body;
    }
    setupData.config.json = true;
    ServiceFacade.triggerPostRequest(setupData.config, setupData.cb);
  },

  get(req, res, componentName) {
    const setupData = components.setup(req, res, componentName);
    ServiceFacade.triggerGetRequest(setupData.config, setupData.cb);
  },
  patch(req, res, componentName) {
    const setupData = components.setup(req, res, componentName);
    if (componentName === 'updateaddress' || componentName === 'updateUserDetails' || componentName === 'changePassword'
    || componentName === 'updateUserEmailAddresses' || componentName === 'updateContactNumbers' || componentName === 'updatechildDetails') {
      setupData.config.data = req.body;
    } else {
      setupData.config.data = JSON.parse(req.query.data);
    }
    setupData.config.json = true;
    ServiceFacade.triggerPatchRequest(setupData.config, setupData.cb);
  },

  delete(req, res, componentName) {
    const setupData = components.setup(req, res, componentName);
    if (componentName === 'removeItemFromWishList' || componentName === 'removeItemFromGiftList' || componentName === 'deletechildDetails' || componentName === 'deletecreditcarddetails') {
      setupData.config.data = req.query;
    } else if (componentName === 'removeGiftCard') {
      setupData.config.data = req.body;
    } else {
      setupData.config.params = req.query;
    }
    setupData.config.json = true;
    ServiceFacade.triggerDeleteRequest(setupData.config, setupData.cb);
  }
};

module.exports = components;
