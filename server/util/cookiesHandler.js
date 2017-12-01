

// Abhijeet's proposed changes..... don't delete for cookiesHandler.js
const cookie = require('cookie');
// const logger = require('../../lib/serverLoggerHandler');

// const loggerHandler = logger.getBunyanInstance('cookiesHandler');

// This method sets the cookies for the proper cookie responses for every browser.
const cookieConfigLoader = function (cookieObj, cookieElement) {
  const cookieConfig = {};
  if (cookieObj) {
    if (typeof cookieObj.expires !== 'undefined' || typeof cookieObj.Expires !== 'undefined') {
      cookieConfig.expires = new Date(cookieObj.expires || cookieObj.Expires);
    }

    cookieConfig.httpOnly = cookieElement.indexOf('httpOnly') > -1 || cookieElement.indexOf('HttpOnly') > -1;
    cookieConfig.path = cookieObj.path || cookieObj.Path;
    cookieConfig.secure = cookieElement.indexOf('secure') > -1 || cookieElement.indexOf('Secure') > -1;
    cookieConfig.encode = String;
    cookieConfig.signed = cookieElement.indexOf('signed') > -1 || cookieElement.indexOf('Signed') > -1;
    cookieConfig.domain = cookieObj.domain || cookieObj.Domain;
    cookieConfig.maxAge = cookieObj.maxAge || cookieObj.MaxAge;

    Object.keys(cookieConfig).forEach((key) => {
      if (typeof cookieConfig[key] === 'undefined') {
        delete cookieConfig[key];
      }
    });
  }
  return cookieConfig;
};

exports.setResponseCookies = function (eaReq, eaRes, aaResponse, setRequest) {
  const headerCookie = aaResponse.headers['set-cookie'];
  if (typeof headerCookie !== 'undefined' && headerCookie.length) {
    headerCookie.forEach((cookieElement) => {
      const parsedCookie = cookie.parse(cookieElement);
      // loggerHandler.debug({req: eaReq, res: aaResponse}, "\nCookieHandler::: Response Header Parsed Cookies from AA response are ::: ", parsedCookie);
      const cookieConfig = cookieConfigLoader(parsedCookie, cookieElement);
      eaRes.cookie(Object.keys(parsedCookie)[0], parsedCookie[Object.keys(parsedCookie)[0]], cookieConfig);

      /**
        * Check if Request Header Cookie is different then AA Response Cookie
        * If found different then set the Browser Response Cookie which will be used by browser to refresh the browser request.
        */
      if (typeof eaReq.headers.cookie !== "undefined" && typeof cookie.parse(eaReq.headers.cookie).JSESSIONID !== "undefined" && parsedCookie !== null && typeof parsedCookie.JSESSIONID !== "undefined") {
        if (parsedCookie.JSESSIONID !== cookie.parse(eaReq.headers.cookie).JSESSIONID) {
          // loggerHandler.info({req: eaReq}, 'CookieHandler:: JSESSIONID from EA Req Header : ' + cookie.parse(eaReq.headers.cookie).JSESSIONID);
          // loggerHandler.info({req: eaReq, res: aaResponse}, 'CookieHandler:: JSESSIONID from AA Res  : ' + parsedCookie.JSESSIONID);
          // loggerHandler.info({req: eaReq, res: aaResponse}, 'CookieHandler:: Session Timeout Check :::: JSESSIONID got Mismatched between Browser cookie and AA Response for : ' + eaReq.url);
          eaRes.cookie("sessionTimeoutRedirect", "sessionTimedOut", {});
        }
      }
    });

    if (setRequest) {
      // This will be called only from getSession.js
      // If get getSession API response contains cookie named JSESSIONID override the cookie with new JSESSIONID cookieElement,else skip

      let sessionAvailable = true;
      headerCookie.forEach((cookieElement) => {
         sessionAvailable = cookieElement.indexOf('JSESSIONID') > -1;
         if (sessionAvailable) {
           if (eaReq.headers.cookie !== undefined) {
            eaReq.headers.cookie = eaReq.headers.cookie + ';' + cookieElement;
          } else {
            eaReq.headers.cookie = cookieElement;
          }
        }
       });
    }
  } else {
    // loggerHandler.debug({req: eaReq, res: aaResponse}, 'Cookie Handler: Headers Cookies are not available from AA for EA Service : ', eaReq.url);
  }
};
