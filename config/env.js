import { DB_TYPES } from './dbTypes';

export const ENV = process.env.NODE_ENV || 'development';

export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.NONE;

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;


/**
 * INFRA TEAM , please update this file for any env change , please follow the format as below
 * DONT Put a Comma (,) after last entry
 * @type {Object}
 * API_AGGRIGATOR_URL = The Loopback API AGGRIGATOR URL
 * APP_PORT = The Port on which you want to run WW application on your local machine.
 */

export const ENV_MAP = {

  ENV_DEV: {
    API_AGGRIGATOR_URL: 'http://172.21.40.23:3000',
    APITimeout: 60000,
    APP_PORT: 4040
  },
  ENV_SIT: {
    API_AGGRIGATOR_URL: 'http://172.21.40.23:3000',
    APITimeout: 60000,
    APP_PORT: 5555
  }

};
