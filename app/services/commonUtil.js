import axios from 'axios';
// import checkDefined from 'check-defined';
/* eslint-disable */
// import { getBrowserBunyanInstance } from '../../lib/clientLoggerHandler';
// const loggerHandler = getBrowserBunyanInstance('commonUtil');
/* eslint-enable */
import { API_AGGRIGATOR_URL } from '../../config/app';
import { serverUrls } from '../../server/controllers/apiAggregatorEndPoints';

const CommonUtil = {
  // [VD] Do a global search for non-whitespace characters in a string
  blankRegEx: /([^\s])/,
  /**
   * Add script tags to the provided div
   * @param {[type]} scriptDiv [description]
   * @param {[type]} scriptObj [description]
   */
  addScripts(scriptContainer, scriptObj) {
    /* istanbul ignore next */
    const js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = scriptObj.src;
    js.id = scriptObj.id;
    scriptContainer.appendChild(js);
  },
  checkRectLeft(rect) {
    /* istanbul ignore next */
    return rect.left >= 0 && rect.left <= rect.width;
  },
  checkHeight(html) {
    /* istanbul ignore next */
    return window.innerHeight || html.clientHeight;
  },
  checkWidth(html) {
    /* istanbul ignore next */
    return window.innerWidth || html.clientWidth;
  },
  elementInViewport(el) {
    if (!el) {
      return false;
    }
    /* istanbul ignore next */
    const rect = el.getBoundingClientRect();
    const html = document.documentElement;

    let top = rect.top;
    let bottom = rect.bottom;

    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
      top -= headerContainer.offsetHeight;
      bottom -= headerContainer.offsetHeight;
    }

    return (
      top >= 0 && CommonUtil.checkRectLeft(rect) &&
      bottom <= CommonUtil.checkHeight(html) &&
      rect.right <= CommonUtil.checkWidth(html)
    );
  },
  someAreaOfElementInViewport(el) {
    if (!el) {
      return false;
    }
    /* istanbul ignore next */
    const rect = el.getBoundingClientRect();
    const html = document.documentElement;

    const top = rect.top;
    let bottom = rect.bottom;
    const height = bottom - top;

    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
      // top = top - headerContainer.offsetHeight;
      bottom -= headerContainer.offsetHeight;
    }
    /* istanbul ignore next */
    return (
      bottom >= 0 && CommonUtil.checkRectLeft(rect) &&
      rect.right <= CommonUtil.checkWidth(html) &&
      (rect.bottom - height) <= CommonUtil.checkHeight(html)
    );
  },
  closestElement(el, sel) {
    if (el !== null) {
      return el.matches && el.matches(sel) ? el : (el.querySelector(sel) || this.closestElement(el.parentNode, sel));
    }
    return null;
  },
  scrollToProduct(e, identifier, noAnimation) {
    if (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      /* istanbul ignore next */
      const targetElement = document.querySelectorAll("[data-productid= '" + identifier + "']");
      const element = targetElement && targetElement[0];
      if (!element) {
        return;
      }
      let elementTopPadding = getComputedStyle(element).getPropertyValue('padding-top');
      elementTopPadding = parseInt(elementTopPadding, 10);
      let targetPosition = element.getBoundingClientRect().top;
      targetPosition = targetPosition + (window.scrollY || window.pageYOffset) - elementTopPadding;
      /* istanbul ignore next */
      if (targetPosition) {
        if (noAnimation) {
          window.scroll(0, targetPosition);
        } else {
          CommonUtil.scrollPageTo(5, targetPosition);
        }
      }
    }
  },
  /**
   * Scroll the page to the top, scrollDuration is actually scrollSteps
   * @param  {[type]} scrollDuration [description]
   * @param  {[type]} top            [description]
   * @return {[type]}                [description]
   */
  scrollPageTo(scrollDuration, top) {
    top = top || 0;
    scrollDuration = scrollDuration || 5;
    const scrollStep = 100;
    /* istanbul ignore next */
    const scrollInterval = setInterval(() => {
      const scrollPositionByStep = window.scrollY || window.pageYOffset;
      if (scrollPositionByStep > (top - scrollStep) && scrollPositionByStep < top) {
        window.scroll(0, top);
        clearInterval(scrollInterval);
      } else if (scrollPositionByStep < top) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, scrollDuration);
  },
  /**
   * Animation for page scroll
   * @param  {[type]} scrollDuration [description]
   * @param  {[type]} top            [description]
   * @return {[type]}                [description]
   */
  scrollPageToTop(scrollDuration, top) {
    top = top || 0;
    /* istanbul ignore next */
    scrollDuration = scrollDuration || 500;
    const scrollPosition = window.scrollY || window.pageYOffset;
    const scrollStep = -scrollPosition / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
      const scrollPositionByStep = window.scrollY || window.pageYOffset;
      if (scrollPositionByStep > top) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  },
  /**
   * Scroll only on click , on page reload dont scroll.
   * @param  {[type]} page [description]
   * @return {[type]}      [description]
   */
  manageScrollOnUpdate(page) {
    /* istanbul ignore if */
    if (!page.pageScrolled && window) {
      if (!page.pageLoadScrolled) {
        setTimeout(() => {
          window.scrollBy(0, 0);
        }, 500);
        page.pageLoadScrolled = true;
      } else {
        CommonUtil.scrollPageToTop();
      }
      page.pageScrolled = true;
    }
  },
  createCustomEvent(eventName) {
    const event = document.createEvent('Event');
    event.initEvent(eventName, false, true);
    // args: string type, boolean bubbles, boolean cancelable
    return event;
  },
  capitalize(text) {
    return text.split(' ').map((t) => {
      return t.substring(0, 1).toUpperCase() + t.substring(1).toLowerCase();
    }).join(' ');
  },
  /**
   * If obj={} , returns true
   * @param  {[type]}  obj [description]
   * @return {Boolean}     [description]
   */
  isEmptyObject(obj) {
    let isEmpty = false;
    if (typeof obj === 'undefined' || !obj) {
      isEmpty = true;
    } else if (typeof obj === 'object' && Object.keys(obj).length === 0 && obj.constructor === Object) {
      isEmpty = true;
    }
    return isEmpty;
  },
  isStateCode(name) {
    let code = name;
    if (typeof name === 'string' && name.length === 2) {
      code = name.toUpperCase();
    }
    return code;
  },
  convertToTitleCase(str) {
    if (!str) {
      return str;
    }
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
  /**
   * Update the Page Title in case of SPA transition
   * @param  {[type]} titleString [description]
   * @return {[type]}             [description]
   */
  updatePageTitle(titleString, noCaseChange) {
    titleString = titleString || 'Woolworths';
    if (typeof document !== 'undefined') {
      if (noCaseChange) {
        document.title = titleString;
      } else {
        document.title = CommonUtil.convertToTitleCase(titleString);
      }
    }
  },
  /**
   * @method: typeOf
   * @usage: this.typeOf("{}/[]/any string or dataType")
   * @param obj: Variable to be tested for it's data type
   * @returns String: Data Type String of the given variable.
   * @useCase: Find out the True Type for any given variable for example typeOf for Array will return the "array" and not the "Object".
   */
  typeOf(obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  },
  /**
   * @method: parseQuerystring
   * @usage: CommonUtil.parseQuerystring("a=hello&b=hi");
   * @param doNotDecode: Boolean: If Value has to be decoded for special characters or not
   * @param sBaseStringParam: String: String in form of Querystring which needs to be converted into an Object. If not passed then location.search will be used.
   * @returns Object Literal - Oject Literal with key pair value where key will be with query string parameter name and value will be set as value of given parameter.
   * @useCase: Method can be used to create an Object of all the Query String Parameters/String into URL.
   */
  parseQuerystring(doNotDecode, sBaseStringParam) {
    const sBaseString = ((sBaseStringParam || location.search).replace('?', '')).trim();
    let querystring = [];
    if (sBaseString.length > 0) {
      querystring = sBaseString.split('&');
    }
    // we may have data in the query string
    const queryObj = {};
    let i;
    let name;
    let value;

    const iLen = querystring.length;

    // loop through each name-value pair and populate object
    for (i = 0; i < iLen; i++) {
      // get name and value
      name = querystring[i].split('=')[0];
      value = (doNotDecode) ? querystring[i].split('=')[1] : decodeURIComponent(querystring[i].split('=')[1]);
      // populate object
      if (queryObj[name]) {
        if (this.typeOf(queryObj[name]) === 'array') {
          if (queryObj[name].indexOf(value) === -1) {
            queryObj[name].push(value);
          }
        } else {
          queryObj[name] = [queryObj[name]].concat([value]);
        }
      } else {
        queryObj[name] = value;
      }
    }
    return queryObj;
  },
  /**
   * Returns the current page url
   * like http://www-win-dev.woolworths.co.za/login
   * @return {[type]} [description]
   */
  getCurrentUrl() {
    /* istanbul ignore next */
    if (typeof window !== 'undefined' && typeof window.currentUrl !== 'undefined') {
      return window.currentUrl;
    } else if (typeof global !== 'undefined' && typeof global.currentUrl !== 'undefined') {
      return global.currentUrl;
    }
    return '';
  },
  /**
   * Method to pop bad request response element and return updated response
   * @param  {[Array]} recommendeddata [Array that contains the data for either YMAL, STL or RVP]
   * @return {[Array]} [updated recommendeddata response]
   */
  popBadRequestElement(recommendeddata) {
    if (Array.isArray(recommendeddata) && recommendeddata.length > 0) {
      const updatedRecommendedResponse = recommendeddata.filter((value) => {
        return value.status !== 400;
      });
      return updatedRecommendedResponse;
    }
    return recommendeddata;
  },
  /**
   * returns the product id from the url
   * like US_441PKG144A or MSTR100016
   * @return {[string]} [product identifier]
   */
  getProductId(urlPath) {
    // check for product whether its a standard one 'R-' or master 'L-'
    if (!urlPath) {
      return null;
    }
    const productPrefix = '_/R-';
    const masterPrefix = '_/L-';
    const productType = (urlPath.indexOf(productPrefix) !== -1) ? productPrefix : masterPrefix;
    const productTypeIndex = urlPath.indexOf(productType);
    if (productTypeIndex !== -1) {
      let productIdPart = urlPath.substring(productTypeIndex + 4);
      productIdPart = productIdPart.split('?')[0];
      // additional check for '/' as it could have a part of URL as well along with query param
      productIdPart = productIdPart.split('/')[0];
      return productIdPart;
    }
    return null;
  },
  /**
   * Common Method to get the Vendor specific configuraiton object
   * @return {[type]} [description]
   */
  /* istanbul ignore next */
  getVendorConfig() {
    let vConfig = null;
    if (typeof window !== 'undefined' && window.vendorConfig) {
      vConfig = window.vendorConfig;
    }
    if (!vConfig && typeof global !== 'undefined' && global.vendorConfig) {
      vConfig = global.vendorConfig;
    }
    return vConfig || {};
  },
  findParentNode(eventElement, parentNodeclassName) {
    /* istanbul ignore next */
    while (eventElement.className.match(new RegExp(parentNodeclassName)) === null) {
      eventElement = eventElement.parentNode;
    }
    return eventElement;
  },
  /**
   * Convert price like 1,233 to 1233
   * @param  {[type]} numString [description]
   * @return {[type]}           [description]
   */
  convertToNumber(numString) {
    let tempNum = numString;
    if (numString) {
      tempNum = numString.replace(',', '').replace(' ', '');
    }
    if (!isNaN(tempNum)) {
      return tempNum;
    }
    return numString;
  },
  /**
   * Being used by server.jsx and client.jsx
   * populate the common additionalData object which has blob and other data.
   * @param  {[type]} store [description]
   * @return {[type]}       [description]
   */
  createAdditionalDataFromStore(store, additionalData) {
    additionalData.experience = store.getState().experience;
    additionalData.blob = store.getState().blob;
    if (!additionalData.locales) {
      additionalData.locales = store.getState().locales;
    }
    return additionalData;
  },
  /**
   * Get Query Parameter value from the URL or String
   * @param  {[type]} name [description]
   * @param  {[type]} url  [description]
   * @return {[type]}      [description]
   */
  getParameterByName(name, url) {
    let val;
    if (url) {
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
      const results = regex.exec(url);
      if (!results) {
        return null;
      }
      if (!results[2]) {
        return '';
      }
      val = decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    return val;
  },
  addScriptToHead(scriptUrl) {
    /* istanbul ignore if */
    if (typeof document !== 'undefined') {
      const script1 = document.createElement('script');
      script1.src = scriptUrl;
      script1.async = false;
      document.getElementsByTagName('body')[0].appendChild(script1);
    }
  },
  getBVScriptUrl() {
    const vConfig = CommonUtil.getVendorConfig();
    let bazaarVoiceUrl = '';
    /* istanbul ignore if */
    if (vConfig && vConfig.bazaarVoice) {
      bazaarVoiceUrl = vConfig.bazaarVoice.url;
    }
    return bazaarVoiceUrl;
  },
  /* istanbul ignore next */
  getAllowCustomizableFlag() {
    const vConfig = CommonUtil.getVendorConfig();
    let allowCustomizable = false;
    if (vConfig && vConfig.allowCustomizable) {
      allowCustomizable = vConfig.allowCustomizable;
    }
    return allowCustomizable;
  },
  /* istanbul ignore next */
  getFluidConfiguratorScriptUrl() {
    const vConfig = CommonUtil.getVendorConfig();
    let fluidConfiguratorUrl = '';
    if (vConfig && vConfig.fluidConfigurator) {
      fluidConfiguratorUrl = vConfig.fluidConfigurator.url;
    }
    return fluidConfiguratorUrl;
  },
  /**
   * Remove a parameter from URL
   * @param  {[type]} url       [description]
   * @param  {[type]} parameter [description]
   * @return {[type]}           [description]
   */
  removeURLParameter(url, parameter) {
    const urlparts = url.split('?');
    if (urlparts.length >= 2) {
      const prefix = encodeURIComponent(parameter) + '=';
      const pars = urlparts[1].split(/[&;]/g);
      // reverse iteration as may be destructive
      for (let i = pars.length; i-- > 0;) {
        // idiom for string.startsWith
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1);
        }
      }

      url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
      return url;
    }
    return url;
  },

  /**
   * Update url query param
   * @param  {[type]} uri   [description]
   * @param  {[type]} key   [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  updateQueryStringParameter(uri, key, value) {
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + '=' + value + '$2');
    }
    return uri + separator + key + '=' + value;
  },
  getQueryString(field, url) {
    if (typeof window !== 'undefined') {
      const href = url || window.location.href;
      const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
      const string = reg.exec(href);
      return string ? string[1] : null;
    }
    return null;
  },
  getSessionId(str) {
    let SessionId;
    if (str && str.indexOf('JSESSIONID') !== -1) {
      const sessionString = str.substring(str.indexOf('JSESSIONID'));
      const jString = sessionString.split(';')[0];
      SessionId = jString.split('=')[1];
      return SessionId;
    }
    return null;
  },
  getSizeGuideLocaleDetails() {
    return {
      selectedCountry: 'US',
      defaultMeasurement: 'INCH'
    };
  },
  getBazaarVoiceConfig() {
    return {
      bvEnabled: true
    };
  },
  /**
   * Get any random id to be used for creating version id
   * @return {[type]} [description]
   */
  getRandomId() {
    return new Date().valueOf();
  },
  getGiftCardLink(selectedCountry) {
    const countryCode = (selectedCountry && selectedCountry.code) ? selectedCountry.code : 'US';
    return 'gift-card/_/R-' + countryCode + '_GIFTCARD1';
  },
  /**
   * create URL from lat long using google geocode for store/search page
   * @param  {object} point        [lat lng pbject]
   * @param  {function} callback   [callback function]
   */
  getURLfromLatLong(point, callback) {
    /* istanbul ignore next */
    axios.get(StoreLocatorConfig.geocoderURL + StoreLocatorConfig.googleMapKey, {
      params: {
        latlng: point
      }
    })
      .then((response) => {
        const zip = response.data.results[0].address_components.find(x => x.types[0] === 'postal_code');
        const country = response.data.results[0].address_components.find(x => x.types[0] === 'country');
        // loggerHandler.info('got address', zip, country, response);
        if (zip && country) {
          const url = StoreLocatorConfig.searchString + '/' + country.long_name + '/' + StoreLocatorConfig.defaultDistance + '/' + zip.long_name; // need to see where to put search & 25
          // loggerHandler.info('position found', url);
          callback(true, url);
        } else {
          callback(false, null);
        }
      })
      .catch(() => {
        callback(false, null);
      });
  },
  /**
   * capture user location
   * @param  {function} callback   [callback function]
   */
  getUserLocation(callback) {
    /* istanbul ignore if */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const position = '' + pos.coords.latitude + ',' + pos.coords.longitude; // to string
        this.getURLfromLatLong(position, callback);
      }, () => {
        callback(false, null);
      });
    } else {
      callback(false, null);
    }
  },
  /**
   * create lat long address from address using google geocode for store/search/click&collect page
   * @param  {string} point        [lat lng pbject]
   * @param  {function} callback   [callback function]
   */
  getLatLongFromAddress(addr, callback) {
    /* istanbul ignore next */
    axios.get(StoreLocatorConfig.geocoderURL + StoreLocatorConfig.googleMapKey, {
      params: {
        address: addr
      }
    })
      .then((response) => {
        callback(true, response.data.results[0].geometry.location);
      })
      .catch(() => {
        callback(false, null);
      });
  },
  contactBannerContentId() {
    // This is targeter id for fetching Top content for contact us page
    return 'contactUsTop';
  },
  contactRightContentId() {
    // This is targeter id for fetching left content for contact us page
    // But right now content inside this slot is set as right content
    return 'contactUsLeft';
  },
  getNavTop(el) {
    /* istanbul ignore next */
    if (!el) {
      return false;
    }
    const rect = el.getBoundingClientRect();
    return parseInt(rect.top + (document.body.scrollTop || document.documentElement.scrollTop), 10);
  },
  getGiftCardDenominationMinMax(arr) {
    let minMax = [0, 0];
    if (arr && arr.length !== 0) {
      const firstElement = arr[0];
      const lastElement = arr[arr.length - 1];
      minMax = [firstElement, lastElement];
    }
    return minMax;
  },
  /**
   * TODO not handeled for checkbox and radio button
   * works similar to the .serialize() of jquery
   * @param  {string} formName
   */
  serializeForm(formName) {
    let formData = '';
    /* istanbul ignore if */
    if (document) {
      const form = document.forms[formName];
      const formElements = form ? form.elements : [];
      const length = formElements ? formElements.length : 0;
      for (let i = 0; i < length; i++) {
        const elem = formElements[i];
        const type = elem.type;
        switch (type) {
          case 'hidden':
          case 'text':
          case 'textarea':
          case 'password':
            formData += elem.name + '=' + elem.value + '&';
            break;
          default:
            break;
        }
      }
      formData = formData.slice(0, -1);
    }
    return formData;
  },
  resetForm(formName) {
    /* istanbul ignore if */
    if (document) {
      const form = document.forms[formName];
      const formElements = form ? form.elements : [];
      const length = formElements ? formElements.length : 0;
      for (let i = 0; i < length; i++) {
        const elem = formElements[i];
        const type = elem.type || 'text';
        switch (type) {
          case 'text':
          case 'textarea':
          case 'password':
            elem.value = '';
            break;
          case 'radio':
          case 'checkbox':
            if (elem.checked) {
              elem.checked = false;
            }
            break;
          default:
            break;
        }
      }
    }
  },
  liveAnnounce(text, delay, node) {
    node = node || null;
    const timeOut = delay || 500;
    let target = null;
    /* istanbul ignore if */
    if (node) {
      target = node;
    } else {
      target = document ? document.querySelector('#liveAnnounce') : undefined;
    }
    /* istanbul ignore if */
    if (typeof (text) !== 'undefined' && target) {
      target.innerHTML = text || '';
      setTimeout(() => {
        target.innerHTML = '';
      }, timeOut);
    }
  },
  /**
   * Add Aria Check in Form elements, called on change
   */
  addAriaCheckInForm(ev, delay) {
    delay = delay || 150;
    if (!ev || !ev.target) {
      return;
    }
    if (ev.target.type === 'hidden') {
      return;
    }
    const name = ev.target.name + '-error';
    const targetElm = ev.target;
    /* istanbul ignore if */
    if (targetElm.getAttribute('data-label-id')) {
      targetElm.setAttribute('aria-labelledby', targetElm.getAttribute('data-label-id') + ' ' + name);
    } else {
      targetElm.setAttribute('aria-labelledby', name);
    }
    targetElm.setAttribute('aria-invalid', false);
    /* istanbul ignore next */
    setTimeout(() => {
      if (targetElm.parentNode.getElementsByClassName('errorMsg') && targetElm.parentNode.getElementsByClassName('errorMsg')[0]) {
        targetElm.parentNode.getElementsByClassName('errorMsg')[0].setAttribute('id', name);
        targetElm.setAttribute('aria-invalid', true);
      }
    }, delay);
  },
  /**
   * Create a new cookie or update an existing cookie
   * @param  {[string]} name    [cookie name]
   * @param  {[string]} value   [cookie value]
   * @param  {[number]} days    [expiry time in days(optional): if not passed, then this method will create a session cookie]
   * @param  {[string]} path    [cookie path(optional): default path will be "/", if not passed explicitly]
   * @param  {[string]} domain  [cookie domain(optional): default domain will be current domain, if not passed explicitly]
   */
  createCookie(name, value, days, path, domain) {
    /* istanbul ignore if */
    if (typeof document === 'undefined' || name.length === 0) {
      return;
    }
    const cookieArray = [];
    /* istanbul ignore if */
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      cookieArray.push('expires=' + date.toGMTString());
    }

    cookieArray.push('path=' + ((typeof path !== 'undefined') ? path : '/'));
    if (typeof domain !== 'undefined') {
      cookieArray.push('domain=' + domain);
    }

    document.cookie = name + '=' + value + '; ' + cookieArray.join('; ');
  },
  /**
   * Return locale specific switch flag to turn off/on functionality
   * @param  {[string]} name    [cookie name]
   * @return {[string]} domain  [returns the value of a cookie. If cookies doesn't exist, returns null.]
   */
  getLocaleSwitches(localeData, siteConfigData, switchRequired) {
    let flag = false;
    if (localeData && localeData.selectedCountry && localeData.selectedCountry.code && siteConfigData) {
      const currentsiteConfig = siteConfigData[localeData.selectedCountry.code];
      flag = currentsiteConfig.switches[switchRequired];
    }
    return flag;
  },
  /**
   * Read the value of an existing cookie
   * @param  {[string]} name    [cookie name]
   * @return {[string]} domain  [returns the value of a cookie. If cookies doesn't exist, returns null.]
   */
  readCookie(name) {
    /* istanbul ignore if */
    if (typeof document === 'undefined') {
      return null;
    }
    if (name.length === 0) {
      return null;
    }
    const cName = name + '=';
    const cArray = document.cookie.split(';');
    let cACount = cArray.length;
    /* istanbul ignore next */
    while (cACount) {
      cACount--;
      let c = cArray[cACount];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(cName) === 0) {
        return c.substring(cName.length, c.length);
      }
    }

    return null;
  },
  /**
   * Delete an existing cookie
   * @param  {[string]} name    [cookie name]
   * @param  {[string]} domain    [domain for which the cookie is to be deleted]
   */
  deleteCookie(name, domain) {
    if (name.length === 0) {
      return;
    }
    this.createCookie(name, '', -1, '/', domain);
  },
  setAnonymousUserToken() {
    // if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    return axios.get(window.location.origin + serverUrls.getConfNumber)
      .then((response) => {
        
      });
    // }
  },
  // Implementation of the Luhn algorithm
  isValidCardNumber(cardNumber) {
    let sum = 0;
    let alt = false;
    let i = cardNumber.length - 1;
    let num;

    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return false;
    }
    while (i >= 0) {
      // get the next digit
      num = parseInt(cardNumber.charAt(i), 10);

      // if it's not a valid number, abort
      if (isNaN(num)) {
        return false;
      }
      // if it's an alternate number...
      if (alt) {
        num *= 2;
        if (num > 9) {
          num = (num % 10) + 1;
        }
      }

      // flip the alternate bit
      alt = !alt;

      // add to the rest of the sum
      sum += num;

      // go to next digit
      i--;
    }

  // determine if it's valid
    return (sum % 10 == 0);
  },
  radioBtnVal(inputElm) {
    for (let i = 0; i < inputElm.length; i++) {
      if (inputElm[i].checked === true) {
        return inputElm[i].value;
      }
    }
    // elem.forEach((inputElm, i) => {     
    // });
    return null;
  },
  getMobileOperatingSystem() {
    /* istanbul ignore if */
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
        return this.WINDOWS;
      }

      if (/android/i.test(userAgent)) {
        return this.ANDROID;
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return this.IOS;
      }

      return null;
    }
    return null;
  },

  ifDeviceisIpad() {
    /* istanbul ignore if */
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor;
      if (/iPad/i.test(userAgent) && !window.MSStream && this.isTouchDevice()) {
        return true;
      }

      return false;
    }
    return false;
  },

  getBrowserName() {
    /* istanbul ignore if */
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isIE11 = (userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0);
      if (isIE11) {
        return 'IE';
      }
      if (userAgent.indexOf('Firefox') !== -1) {
        return this.FIREFOX;
      }
      return null;
    }
    return null;
  },
  /**
   * setSessionStorage method to save value from session storage
   * [key and value]
   */
  setSessionStorage(key, value) {
    /* istanbul ignore if */
    if (typeof (Storage) !== 'undefined' && typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
  },
  /**
   * getSessionStorage method to get saved key's value from session storage
   * [key]
   */
  getSessionStorage(key) {
    /* istanbul ignore if */
    if (typeof (Storage) !== 'undefined' && typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  },
  /**
   * removeSessionStorageItem method to delete particular key from session storage
   * [key]
   */
  removeSessionStorageItem(key) {
    /* istanbul ignore if */
    if (typeof (Storage) !== 'undefined' && typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  },
  /**
   * isStorageUsable() method checks if localstorage is usable in current browser (ie. Safari Private Mode)
   */
  isStorageUsable() {
    const storage = window.sessionStorage;
    /* istanbul ignore next */
    try {
      storage.setItem('testkey', 'test');
      storage.removeItem('testkey');
    } catch (e) {
      if (e.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
        return false;
      }
    }
    return true;
  },
  /**
   * ifStringHasScript method to check string has script or javascript.
   * [string]
   */
  ifStringHasScript(string) {
    string = string || '';
    const regExp = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
    const isScriptFound = regExp.test(string);
    if (isScriptFound || (string.indexOf('javascript') !== -1)) {
      return true;
    }
    return false;
  },
  /**
   * This method add dynamic attribute based on the condition (true/false)
   * [attribute, value and condition]
   */
  addDynamicAttribute(attribute, value, condition) {
    const opts = {};
    if (typeof value !== 'undefined' && value !== null && condition) {
      opts[attribute] = value;
      return opts;
    }
    return false;
  },
  /**
   * This method remove child element
   */
  removeChildById(_id) {
    /* istanbul ignore next */
    try {
      const elem = document.getElementById(_id);
      if (elem) {
        elem.parentElement.removeChild(elem);
      }
    } catch (err) {
      // loggerHandler.error("error while removing child from dom with ID: ", _id);
    }
  },
  appendSelectBoxLabel(delay) {
    const timeOut = delay || 500;
    /* istanbul ignore if */
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const selectEl = document.getElementsByClassName('Select-control');
        const selectElCount = selectEl ? selectEl.length : 0;
        for (let i = 0; i < selectElCount; i++) {
          if (!selectEl[i] || !selectEl[i].parentNode || !selectEl[i].parentNode.previousSibling) {
            return;
          }
          const ariaName = 'selectControlLabel' + i;
          const selectInput = selectEl[i].querySelector('.Select-input');
          const selectLabel = selectEl[i].parentNode.previousSibling;
          selectLabel.setAttribute('id', ariaName);
          selectInput.setAttribute('aria-labelledby', ariaName);
        }
      }, timeOut);
    }
  },
  setVoiceOverFocus(element, role) {
    const focusInterval = 10; // ms, time between function calls
    const focusTotalRepetitions = 3; // number of repetitions
    if (typeof element !== 'undefined' && element !== null) {
      const previousTabIndex = element.getAttribute('tabindex');
      if (role) {
        element.setAttribute('role', role);
      } else {
        element.setAttribute('role', 'button');
      }
      element.setAttribute('tabindex', '-1');
      element.blur();
      let focusRepetitions = 0;
      const interval = window.setInterval(() => {
        element.focus();
        focusRepetitions++;
        if (focusRepetitions >= focusTotalRepetitions) {
          window.clearInterval(interval);
          if (previousTabIndex) {
            element.setAttribute('tabindex', previousTabIndex);
          } else {
            element.removeAttribute('tabindex');
          }
          if (role) {
            element.setAttribute('role', role);
          } else {
            element.removeAttribute('role');
          }
        }
      }, focusInterval);
    }
  },
  /**
   * Apply Focus to the required element
   * @param {string or dom element} element [it should be a css selector, in case of class selector
   * then use .some-class:0 to send focus to the first occurence of .some-class]
   * @param {number} delay [set the time out delay]
   */
  moveFocusTo(selector, delay, role) {
    role = role || null;
    /* istanbul ignore if */
    if (typeof (selector) !== 'undefined') {
      let str;
      let target;
      if (typeof (selector) === 'string') {
        selector = selector.replace(/ /g, '');
        str = selector.substring(0, 1);
      } else {
        str = '';
      }
      switch (str) {
        case '#':
          target = document.querySelector(selector);
          break;
        case '.': {
          const arr = selector.split(':');
          const elm = arr[0];
          const index = arr[1];
          if (arr.length > 1) {
            target = document.querySelectorAll(elm)[index];
          } else {
            target = document.querySelector(elm);
          }
          break;
        }
        default:
          target = selector;
      }
      this.setVoiceOverFocus(target, role);
    }
  },
  focusToNextTarget(target, nextTarget, addClass) {
    /* istanbul ignore if */
    if (typeof document !== 'undefined') {
      target.classList.add(addClass);
      this.moveFocusTo(nextTarget);
    }
  },
  focusToPrevTarget(prevTarget, removeClass) {
    /* istanbul ignore if */
    if (typeof document !== 'undefined') {
      this.moveFocusTo(prevTarget);
      prevTarget.classList.remove(removeClass);
    }
  },
  toggleElements(currentElementList, display) {
    if (currentElementList && currentElementList.length) {
      const currentElementArray = [...currentElementList]; // convert to array
      currentElementArray.map((element) => {
        if (display === 'show') {
          element.style.display = 'block';
          return element;
        }
        element.style.display = 'none';
        return element;
      });
    }
    return null;
  },
  /*
   * This method calculate screen width and return label [small, smedium, medium, large, xlarge, xxlarge] according to breakpoints
   * @return {[string]}   responsiveView  [screen width according to breakpoints]
   */
  getResponsiveView() {
    let responsiveView = 'large';
    /* istanbul ignore if */
    if (typeof window !== 'undefined') {
      const windowInnerWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      switch (true) {
        case (windowInnerWidth < 640):
          responsiveView = 'small';
          break;
        case (windowInnerWidth < 768):
          responsiveView = 'smedium';
          break;
        case (windowInnerWidth < 1024):
          responsiveView = 'medium';
          break;
        case (windowInnerWidth < 1440):
          responsiveView = 'large';
          break;
        case (windowInnerWidth < 1900):
          responsiveView = 'xlarge';
          break;
        default:
          responsiveView = 'xxlarge';
          break;
      }
    }
    return responsiveView;
  },
  /**
   * [isDefined Checks if object and its properties path is defined.]
   * @param  {[Object]}  obj  [Object to check]
   * @param  {[String]}  path [String path that needs to be validated agains undefined]
   * @return {Boolean}
   */
  // isDefined(obj, path) {
  //   return checkDefined(obj, path);
  // },
  /*
   * This method returns if the device is touch enabled
   * @return {[bool]}
   */
  isTouchDevice() {
    /* istanbul ignore next */
    return document.querySelector('body').classList.contains('touchDevice');
  },
  /*
   * This method returns if the device is touch enabled and mobile
   * @return {[bool]}
   */
  isMobileTouchDevice() {
    /* istanbul ignore next */
    return this.isTouchDevice() && window.screen.width < 768;
  },
  /**
   * This is replacement to node.closest('.class name')
   * findClosetElement find the closeset parent of an element
   * @param {el obj} current html element
   * @param {cls string} class of current element
   */
  findClosestElement(el, cls) {
    /* istanbul ignore next */
    while (el.parentElement) {
      if (el.parentElement.className.indexOf(cls) !== -1) {
        el = el.parentElement;
        break;
      }
      el = el.parentElement;
    }
    return el;
  },
  /**
   * executeANDcondition: It executes the AND codition. It takes the param obj array type
   * which have values either true or false. If it finds any false value.
   * It returns true
   * @param {obj array} Array of values true and false
   */
  executeANDcondition(obj) {
    let i;
    let returnValue = true;
    for (i = 0; i < obj.length; i++) {
      if (!obj[i]) {
        returnValue = false;
      }
    }
    return returnValue;
  },
  /**
   * executeORcondition: It executes the AND codition. It takes the param obj array type
   * which have values either true or false. If it finds any true value.
   * It returns true
   * @param {obj array} Array of values true and false
   */
  executeORcondition(obj) {
    let i;
    let returnValue = false;
    for (i = 0; i < obj.length; i++) {
      if (obj[i]) {
        returnValue = true;
      }
    }
    return returnValue;
  },
  /**
   * isDesktop checks if window width is greater than 2014px
   */
  isDektop() {
    let isDesktop = false;
    if (window && window.outerWidth > 1024) {
      isDesktop = true;
    }
    return isDesktop;
  },
  getKorsVipBreakpoints() {
    let breakpointView = 'largeView';
    /* istanbul ignore if */
    if (typeof window !== 'undefined') {
      const windowInnerWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      switch (true) {
        case (windowInnerWidth < 1025):
          breakpointView = 'smallView';
          break;
        case (windowInnerWidth < 1140):
          breakpointView = 'mediumView';
          break;
        case (windowInnerWidth < 1440):
          breakpointView = 'largeView';
          break;
        case (windowInnerWidth > 1440):
          breakpointView = 'xlargeView';
          break;
        default:
          breakpointView = 'largeView';
          break;
      }
    }
    return breakpointView;
  },
  trimTextToLength(text, size) {
    if (text && size) {
      if (isNaN(size)) {
        return text;
      }
      if (text.length > size) {
        return text.trim().substring(0, (size - 3)) + '...';
      }
    }
    return text;
  },
  /**
   * isMobileAutoSearch property for configuring auto search functionality in mobile
   * [true or false to apply auto search functionality for mobile]
   */
  WINDOWS: 'Windows Phone',
  ANDROID: 'Android',
  IOS: 'iOS',
  isMobileAutoSearch: false,
  searchURLPath: '_/N-0/Ntt-',
  promoLightBoxTimer: 60000
};

export default CommonUtil;
