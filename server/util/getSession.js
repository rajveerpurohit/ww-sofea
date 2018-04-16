

// var logger = require('../../lib/serverLoggerHandler');
// var loggerHandler = logger.getBunyanInstance('getSession');

let cookiesHandler = require('./cookiesHandler');
let API_AGGRIGATOR_URL = require('../config/appConfig').API_AGGRIGATOR_URL;
let axios = require('axios');
let APITimeout = require('../config/appConfig').APITimeout;

const apiHost = API_AGGRIGATOR_URL + '/api/';

const getSession = function (req, res, locales, next) {
  // loggerHandler.debug({req: req}, "getSession.js - getSession - req.headers: ");

  // Below code will work only for page load request and not ajax (JSON) requests
  const urlRegex = new RegExp(/\/server\/|\/headerComponent|\/footerComponent/);

  if (urlRegex.test(req.url) === false) {
    // loggerHandler.debug({req: req}, 'getSession:::Triggering getSession Call for :' + apiHost + req.url );

    const config = {
      method: 'GET',
      baseURL: apiHost,
      url: 'session/confirmationnumber',
      headers: req.headers,
      timeout: APITimeout
    };

    // loggerHandler.debug({req: req}, ':::: Making hearbeat call for URL ::::', req.url);

    let startTime = new Date().getTime();
    axios(config)
      .then((response) => {
        let endTime = new Date().getTime();
        let delta = endTime - startTime;
        // loggerHandler.debug({req: req}, 'ALERT!!! Get Session: EA To AA call for : ', config.url , ' took : ' , delta , ' milliseconds');
        if (response.status === 200) {
          cookiesHandler.setResponseCookies(req, res, response, true);
          if (!response || !response.data || !response.data.confirmationNumber) {
            console.log('\n\nError:::: Application cannot start, No DynSessConf Confirmation number recieved from AA API::::');
            // loggerHandler.error({res: response}, ':::: Application cannot start, No DynSessConf Confirmation number recieved from AA API::::', req.url);
          }
          // setting the DynsessConf for client side which will be available with Store.
          req.headers['temp-dynsessconf'] = response.data.confirmationNumber;

          next(null, req);
        }
      }).catch((error) => {
        // loggerHandler.error({req: req, err: error}, "getSession.js - getSession - Error: ");
        // loggerHandler.debug({req: req}, "getSession.js - getSession - req.url: ", req.url);
        // loggerHandler.debug({req: req}, "getSession.js - getSession - req.headers: ", req.headers);
        // Make sure to resolve the Request with error.
        res.status(500).send('EA: session/confirmation number api failed, Please check if backend system ATG or AA went down after EA was up!' + error);
      });
  } else {
    next();
  }
};

module.exports = getSession;
