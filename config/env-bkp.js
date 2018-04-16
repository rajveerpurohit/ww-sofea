

export const ENV = process.env.NODE_ENV || 'development';

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;


/**
 * INFRA TEAM , please update this file for any env change , please follow the format as below
 * DONT Put a Comma (,) after last entry
 * @type {Object}
 * API_AGGRIGATOR_URL = The Loopback API AGGRIGATOR URL
 * APP_PORT = The Port on which you want to run WW application on your local machine.
 * ATG_URL = Domain URL for the images to reflect in different environments.
 */

export const ENV_MAP = {

  ENV_LOCAL: {
    API_AGGRIGATOR_URL: 'http://10.102.28.152:3000',
    APITimeout: 60000,
    APP_PORT: 3333,
    EXTERNAL_IMAGE_URL: 'http://images.woolworthsstatic.co.za/',
    INTERNAL_IMAGE_URL: 'http://www-win-qa.woolworths.co.za/',
    USE_CDN: true
  },

  ENV_SIT: {
    API_AGGRIGATOR_URL: 'http://atgnodedev01:3000',
    APITimeout: 60000,
    APP_PORT: 3333,
    EXTERNAL_IMAGE_URL: 'http://images.woolworthsstatic.co.za/',
    INTERNAL_IMAGE_URL: 'http://www-win-dev.woolworths.co.za/',
    USE_CDN: true
  },

  ENV_DEV: {
    API_AGGRIGATOR_URL: 'http://172.21.40.23:3000',
    APITimeout: 60000,
    APP_PORT: 3333,
    EXTERNAL_IMAGE_URL: 'http://images.woolworthsstatic.co.za/',
    // INTERNAL_IMAGE_URL: 'http://www-win-dev.woolworths.co.za/',
    INTERNAL_IMAGE_URL: 'http://165.4.7.137/',
    USE_CDN: true
  },

  ENV_QA: {
    API_AGGRIGATOR_URL: 'http://atgnodeqa01:3000',
    APITimeout: 60000,
    APP_PORT: 3333,
    EXTERNAL_IMAGE_URL: 'http://images.woolworthsstatic.co.za/',
    INTERNAL_IMAGE_URL: 'http://www-win-qa.woolworths.co.za/',
    USE_CDN: true
  }
};
