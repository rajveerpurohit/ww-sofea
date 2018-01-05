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

    if (componentName === 'landingpages') {
      if (req.query.Nr && req.query.Ns && req.query.No && req.query.Nrpp) {
        url += `?pageURL=${req.query.pageURL}&No=${req.query.No}&Nrpp=${req.query.Nrpp}&Nr=${req.query.Nr}&Ns=${req.query.Ns}`;
      } else if (req.query.Nr && req.query.No && req.query.Nrpp) {
        url += `?pageURL=${req.query.pageURL}&No=${req.query.No}&Nrpp=${req.query.Nrpp}&Nr=${req.query.Nr}`;
      } else if (req.query.No && req.query.Nrpp) {
        url += `?pageURL=${req.query.pageURL}&No=${req.query.No}&Nrpp=${req.query.Nrpp}`;
      } else {
        url += `?pageURL=${req.query.pageURL}`;
      }
    }

    if (componentName === 'storelocatorByGeoLocation') {
      url += `?latitude=${req.query.latitude}&longitude=${req.query.longitude}&distance=${req.query.distance}`;
    } else if (componentName === 'storelocatorByArea') {
      url += `${req.query.suburbId}?distance=${req.query.distance}`;
    }

    if (componentName === 'faqDetails') {
      url += `?contentId=${req.query.contentId}`;
    }

    if (componentName === 'search') {
      url += `?Ntt=${req.query.searchQuery}&Dy=1`;
    }
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

    setupData.config.data = req.body;
    setupData.config.json = true;
    ServiceFacade.triggerPostRequest(setupData.config, setupData.cb);
  },

  get(req, res, componentName) {
    const setupData = components.setup(req, res, componentName);

    ServiceFacade.triggerGetRequest(setupData.config, setupData.cb);
  }
};

module.exports = components;
