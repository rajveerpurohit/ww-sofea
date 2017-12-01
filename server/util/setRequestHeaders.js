

const API_AGGRIGATOR_URL = require('../config/appConfig').API_AGGRIGATOR_URL;
// var headers = require('../config/appConfig').headers;
// var logger = require('../../lib/serverLoggerHandler');
// var loggerHandler = logger.getBunyanInstance('setRequestHeaders');

const cookie = require('cookie');

const apiHost = API_AGGRIGATOR_URL + '/api/';

/**
 * @method: setAcceptLanguageHeader
 * @usage: setAcceptLanguageHeader(req, locales);
 * @param req: Object: Browser Request Object
 * @param locales: Object: Locales Object which gets loaded before server start-up. This gets used to set the Accept Language Request Header for AA > ATG usage.
 */

const setAcceptLanguageHeader = (req, res, locales) => {
  if (locales && locales.regions) {
    let parsedCookies;
    if (req.headers.cookie) {
      parsedCookies = cookie.parse(req.headers.cookie);
    }

    const urlMatches = req.url.match(/^\/\b[a-z]{2}_[A-Z]{2}\b/); // boolean. matches /en_GB
    const acceptLangQualityValue = ",en;q=0.8";
    const urlRegex = new RegExp(/\/server\/|\/headerComponent|\/footerComponent/);

    let matchedCountry = null;

    const hostName = req.headers.host; // "http://www.michaelkors.ca";
    let countryMatched = false;

    for (let regionIndex = 0, regionsLength = locales.regions.length; regionIndex < regionsLength; regionIndex++) {
      for (let countryIndex = 0, countriesLength = locales.regions[regionIndex].countries.length; countryIndex < countriesLength; countryIndex++) {
        if (locales.regions[regionIndex].countries[countryIndex].siteURL.indexOf(hostName) !== -1) {
          matchedCountry = locales.regions[regionIndex].countries[countryIndex];
          countryMatched = true;
          break;
        }
      }
      if (countryMatched) {
        break;
      }
    }

    if (matchedCountry) {
      let matchedLngWithURL = [];
      let matchedLanguage = [];
      if (urlMatches && urlMatches[0]) {
        matchedLngWithURL = matchedCountry.languages.filter((language) => {
          return (language.locale === req.url.substring(1, 6)); // match the locale
        });
      }

      if (parsedCookies && parsedCookies.cookieLanguage) {
        matchedLanguage = matchedCountry.languages.filter((language) => {
          return (language.locale === parsedCookies.cookieLanguage); // match the locale
        });
      }
      /* Added condition to handle redirection to country website
      * incase user enters website address including country default locale in browser */
      if (matchedLngWithURL[0] && urlMatches && urlMatches[0]) {
        /* Added check to match default Locale */
        if (req.url.substring(1, 6) === matchedCountry.defaultLanguage.locale) {
          const reqURL = req.url.split("/").slice(2).join("/");
          // loggerHandler.debug('setResquestHeaders ::: Default Language in Locale Matched with Language available in Request URL so Redirecting to domain without Language parameter in URL');
          res.redirect(302, matchedCountry.siteURL + "/" + reqURL);
        } else {
          // loggerHandler.debug('setResquestHeaders ::: Matched Language found in Locale with Language available in Request URL.');

          req.headers['accept-language'] = matchedLngWithURL[0].locale.replace("_", "-") + acceptLangQualityValue.replace("en", matchedLngWithURL[0].code);
        }
      } else if (matchedLngWithURL.length === 0 && urlMatches && urlMatches[0]) {
        // loggerHandler.debug('setResquestHeaders ::: Language found in URL but no labguage found in requested country/domain URL');
        res.redirect(404, matchedCountry.siteURL);
      } else if (matchedLanguage[0] && parsedCookies && parsedCookies.cookieLanguage) {
        // loggerHandler.debug('setResquestHeaders ::: Cookie found with one of the locale in selected country/domain');

        if (urlMatches === null && req.headers.accept && req.headers.accept.includes('text/html') && urlRegex.test(req.url) === false && parsedCookies.cookieLanguage !== matchedCountry.defaultLanguage.locale) {
          // loggerHandler.debug('setResquestHeaders ::: Cookie found but did not match with default language locale so Redirecting to URL with Language');
          res.redirect(302, matchedCountry.siteURL + "/" + parsedCookies.cookieLanguage + req.url);
        } else {
          // loggerHandler.debug('setResquestHeaders ::: accept-language === parsedCookies');
          req.headers['accept-language'] = parsedCookies.cookieLanguage.replace("_", "-") + acceptLangQualityValue.replace("en", parsedCookies.cookieLanguage.split("_")[0].toLowerCase());
        }
      } else {
        // loggerHandler.debug('setResquestHeaders ::: accept-language === Matched Country with country default Locale');
        req.headers['accept-language'] = matchedCountry.defaultLanguage.locale.replace("_", "-") + acceptLangQualityValue.replace("en", matchedCountry.defaultLanguage.code);
      }
    } else {
      // loggerHandler.debug('No Matched Country Found in Locale so Accept language could not set.Setting the Accept Language from environment config for localhost');

      if (typeof headers["accept-language"] !== "undefined") {
        if (req.headers.host.indexOf('localhost') !== -1) {
          req.headers['accept-language'] = headers["accept-language"].replace("_", "-") + acceptLangQualityValue;
        } else {
          req.headers['accept-language'] = headers["accept-language"].replace("_", "-") + acceptLangQualityValue;
        }
      } else {
        // loggerHandler.debug('setResquestHeaders ::: No accept-language found for the given Environment so setting up en-GB,en;q=0.8 as default.');
        req.headers['accept-language'] = "en-US,en;q=0.8";
      }
    }
  }
};

/**
 * Manually set Header "Host" for local development, as ATG has a dependency for env specific
 * host names. like mkqares.sapient.com, host like localhost or ipaddress are denied by ATG.
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
const overrideHeaderForLocalDevelopment = function (req) {
  if (req.headers && req.headers.host && (req.headers.host.indexOf('10.203.') !== -1 || req.headers.host.indexOf('localhost') !== -1) && headers) {
    req.headers.host = headers.host;
  }
};

const setRequestHeaders = function (req, res, locales) {
  setAcceptLanguageHeader(req, res, locales);
  overrideHeaderForLocalDevelopment(req);
};

module.exports = setRequestHeaders;
