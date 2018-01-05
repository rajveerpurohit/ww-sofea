import axios from 'axios';
import cookie from 'cookie';
import CommonUtil from './commonUtil';
import localeInfoUtil from './localeInfoUtil';
import {API_AGGRIGATOR_URL} from '../../config/app';
import {endpoints} from '../../server/controllers/apiAggregatorEndPoints';

/* eslint-disable */
// import {getBrowserBunyanInstance} from '../../lib/clientLoggerHandler';
// const loggerHandler = getBrowserBunyanInstance('serviceUtil');
// import * as XSS from './security';
/* eslint-enable */

/**
 * Utiltity file containing some common methods
 * @type {Object}
 */
const ServiceUtil = {
  userId: '',
  tokenId: '',
  countryCode: '',
  /* set and get user id */
  setUserId(val) {
    this.userId = val;
  },
  /**
   * Replace something like "You have added {0} items in cart" to "You have added 3 items in cart"
   * @param  {[type]} labelStr          [description]
   * @param  {[type]} placeholderValues [description]
   * @return {[type]}                   [description]
   */
  replacePlaceholderValues(labelStr, placeholderValues) {
    for (let x = 0; x < placeholderValues.length; x++) {
      const placeholder = '{' + x + '}';
      if (labelStr.indexOf(placeholder) !== -1) {
        labelStr = labelStr.replace(placeholder, placeholderValues[x]);
      }
    }
    return labelStr;
  },
  /**
   * Method to return the label value for a key from the state
   * If the label is not present ,return the key itself
   * @param  {[type]} labelState [description]
   * @param  {[type]} labelKey   [description]
   * @return {[type]}            [description]
   */
  getLabel(labelState, labelKey, placeholderValues) {
    let labelValue = labelKey;
    if (labelState && labelState[labelKey] && typeof labelState[labelKey] === 'string') {
      labelValue = labelState[labelKey];
    }
    if (placeholderValues && placeholderValues.length) {
      labelValue = ServiceUtil.replacePlaceholderValues(labelValue, placeholderValues);
    }
    return labelValue || '';
  },
  getUserId() {
    return this.userId;
  },
  /* set and get token id */
  setTokenId(val) {
    this.tokenId = val;
  },
  getTokenId() {
    return this.tokenId;
  },
  /* set and get country code */
  setCountryCode(val) {
    this.countryCode = val;
  },
  getCountryCode() {
    return this.countryCode;
  },
  uniqueArrayPrototype() {
    // check if an element exists in array using a comprator function
    /* eslint-disable */
    if (typeof Array.inArray !== 'undefined') {
      return;
    }
    Array.prototype.inArray = function (comprator) {
      for (let i = 0; i < this.length; i++) {
        if (comprator(this[i])) {
          return true;
        }
      }
      return false;
    };

    // adds an element to the array if it does not already exist using a comprator
    // function
    Array.prototype.pushIfNotExist = function (element, comprator) {
      if (!this.inArray(comprator)) {
        this.push(element);
      }
    };
    /* eslint-enable */
  },

  /**
   * @method: ServiceUtil.setResponseCookie
   * @usage: ServiceUtil.setResponseCookie(res, response);
   * @param res: response object which needs to be set for new cookies
   * @param response: response object from which new cookies needs to be taken.
   * @param config: Options sent for API Calls.
   */
  setResponseCookie(res, response, config) {
    const headerCookie = response.headers['set-cookie'];
    if (typeof headerCookie !== 'undefined' && headerCookie.length) {
      headerCookie.forEach((cookieElement) => {
        const parsedCookie = cookie.parse(cookieElement);

        Object.keys(parsedCookie).forEach((cookie) => {
          res.cookie(cookie, parsedCookie[cookie]);
        });
      });
    } else {
      // loggerHandler.info({req: config}, 'ServiceUtil.setResponseCookie: Headers Cookies are not available from AA for EA Service : ', config.apiURL);
    }
  },

  /**
   * @method: ServiceUtil.handleSessionTimeout
   * @usage: ServiceUtil.handleSessionTimeout();
   * This Method is used to reload the page in case Session Time out happens.
   * This is working based on one Cookie which gets set in cookiesHandler file that sets
   * a new Cookie when Browser Req JSSSIONID is different then API response JSESSIONID.
   * Browser Refresh will reset the JESSIONID
   * @param: from: String: To handle page reload functionality while switching locale as logged user.
   */
  handleSessionTimeout(from) {
    const documentCookies = (typeof document !== 'undefined') ? CommonUtil.readCookie('sessionTimeoutRedirect') : null;

    if (typeof window !== 'undefined' && documentCookies !== null && documentCookies !== 'pageRefreshed') {
      // loggerHandler.info('serviceUtil::: Session Timeout Happened for Browser so refreshing the page.');

      // clear profile data in local storage on timeout
      // LocalStorageUtil.clearProfileData();
      // LocalStorageUtil.clearMiniCartData();

      CommonUtil.createCookie('sessionTimeoutRedirect', 'pageRefreshed', 1);

      // Reload the Browser in case the cookie sessionTimeoutRedirect found because JESSIONID got different for browser request.
      // 'from' param value i.e. 'frmCountrySelectr' if user gets log out while using Country Selector Component
      // otherwise 'from'param value will be null.
      if (from === null) {
        window.location.reload(true);
      }
    }
  },
  /**
   * @method: ServiceUtil.sanitizeParams
   * @usage: ServiceUtil.sanitizeParams({
        params: { pageUrl: '/' }
      });
   * @param obj: Object: object of parameters for the request
   */
  // sanitizeParams(obj) {
  //   const params = obj;
  //   Object.keys(params).forEach((param) => {
  //     params[param] = XSS.sanitizeQuery(params[param]);
  //   });
  //   return params;
  // },
  /**
   * @method: ServiceUtil.trimResponseData
   * @usage: Service.trimResponse( {response} )
   * @param obj: response data
   * Will remove unneeded data from fetch response
   * includes:
   *  - prepended smartling codes (only needed for proxy not for client)
   */
  trimResponseData(response) {
    if (response) {
      delete response.sl_path;
      delete response.sl_path_notranslate;
    }
    return response;
  },
  /**
   * @method: ServiceUtil.triggerServerRequest
   * @usage: ServiceUtil.triggerServerRequest({
        headers: reqHeaders,
        url: serverUrls.experience,
        params: { pageUrl: '/' }
      },
      res);
   * @param options: Object: Options for AXIOS configuration to trigger the AA API call through Express Route
   * @param res: Browser Response Object which can be passed from react actions. This can be used for setting up the AA response cookies back to browser response object.
    This 'res' parameter in actions can be accessed as 5th parameter in actions which is passed from preRenderMiddleware.
   * @param from: String: this third parameter is to handle page reload functionality while changing locale to other as logged user.
   */
  triggerServerRequest(options, res, from = null) {
    const startTime = new Date().getTime();
    // options.url = XSS.sanitizeQuery(options.url);
    // if (typeof options.params !== "undefined") {
    //   options.params = ServiceUtil.sanitizeParams(options.params);
    // }

    const localPath = localeInfoUtil.getLocaleContextPath();

    if (!localPath && typeof window === 'undefined') {
      const endpointURL = options.url.split('/');
      options.url = API_AGGRIGATOR_URL + '/api' + endpoints[endpointURL[endpointURL.length - 1]];
    } else {
      options.url = window.location.origin + options.url;
    }
    return new Promise((resolve, reject) => {
      const config = {
        method: 'GET',
        url: '/',
        json: true,
        headers: {
        }
      };
      if (!options.headers) {
        delete options.headers;
      }

      Object.assign(config, options);
      axios(config)
        .then((response) => {
          // Set the Browser Response cookies if API response is sending any new cookie.
          if (res) {
            ServiceUtil.setResponseCookie(res, response, config);
          }
          const endTime = new Date().getTime();
          const delta = endTime - startTime;
          if (delta > 500) {
            // loggerHandler.info({ req: config }, 'ALERT!!! ServiceUtil call for ', config.url, ' params : ', JSON.stringify(config.params), ' took : ', (endTime - startTime), ' milliseconds');
          }
          // Reload the current page in case of Session Timeout.
          // ServiceUtil.handleSessionTimeout(from);
          if (response.data) {
            return resolve({
              body: ServiceUtil.trimResponseData(response.data)
            });
          }
          return reject({
            body: response.error
          });
        }, (e) => {
          if (e.status) {
            return reject({
              body: e.data.error
            });
          }
          return reject({
            body: {}
          });
        });
    });
  }
};
export default ServiceUtil;
