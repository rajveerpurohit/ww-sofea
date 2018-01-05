const Promise = require('bluebird');
const axios = require('axios');

const APITimeout = require('../../config/app').APITimeout;

const ServiceFacade = {
  sendRequest(config, resolve, reject) {
    const startTime = new Date().getTime();
    // TODO: loggerHandler need to implement
    // loggerHandler.debug({req: config}, '\n\nService-Facade ::: Hitting AA Service: URL::', config.url);
    // config.headers.correlationId = Math.floor(Math.random() * 200000);
    // loggerHandler.info({ req: config }, '\n\nService-Facade ::: Hitting AA Service: URL::', config.url);

    // loggerHandler.debug('\nService-Facade ::: Printing Request headers sent to AA ::\n', JSON.stringify(config.headers));

    // Make sure to add Timeout for all AXIOS calls.

    config.timeout = APITimeout;
    axios(config)
      .then((response) => {
        const endTime = new Date().getTime();
        const delta = endTime - startTime;
        const responseRegex = new RegExp(/password/g);
        if (delta > 500) {
          // loggerHandler.error({ req: config }, 'ALERT!!! Service Facade: EA To AA call for : ' + config.url + ' took : ' + delta + ' milliseconds');
        }
        if (response.data && response.status === 200) {
          if (responseRegex.test(JSON.stringify(config)) === true) {
            // let responseData = JSON.parse(JSON.stringify(response));
            // const responseData = null;
            // loggerHandler.debug({ req: config, res: response }, 'Service Facade: Printing Modified Response from AA to null as it contain sensitive information for URL: ' + config.url + '  below : \n', { response: responseData });
          } else {
            // loggerHandler.debug({ req: config, res: response }, 'Service-Facade ::: Printing Response from AA for URL: ' + config.url + '  below : \n', { response });
          }
          return resolve(response);
        }

        // loggerHandler.error({ req: config, err: response }, "Service-Facade ::: AA Response neither had status nor data properties.", config.url);
        return reject(response);
      }, (e) => {
        // loggerHandler.error({ req: config, err: e }, "Service-Facade ::: AA Request failed failed ", config.url);
        return reject(e);
      });
  },

  triggerGetRequest(opts, callback) {
    opts.method = 'GET';
    return new Promise((resolve, reject) => {
      ServiceFacade.sendRequest(opts, resolve, reject);
    }).then((response) => {
      callback(response);
    }, (error) => {
      ServiceFacade.handlerRequestError(error, opts);
      callback(error);
    });
  },

  triggerPostRequest(opts, callback) {
    opts.method = 'POST';
    // opts.url
    // opts.data
    return new Promise((resolve, reject) => {
      ServiceFacade.sendRequest(opts, resolve, reject);
    }).then((response) => {
      callback(response);
    }, (error) => {
      ServiceFacade.handlerRequestError(error, opts);
      callback(error);
    });
  },

  handlerRequestError(error, opts) {
    // loggerHandler.error({ req: opts, err: error }, 'Service Facade: Error in AA Service call for :', opts.url);
    let errorString = '';
    if (error && error.data && error.data.error && error.data.error.name && error.data.error.statusMessage) {
      errorString += error.data.error.name + ' : ' + error.data.error.statusMessage;
    }
    console.log('Error:', errorString);
    console.log(opts);
    // loggerHandler.error({ req: opts, err: error }, 'Service Facade::: Error Details from AA server' + errorString);
  }
};

module.exports = ServiceFacade;
