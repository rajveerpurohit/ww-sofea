import { ENV, ENV_MAP} from './env';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const apiEndpoint = isDebug ? 'http://172.21.40.151:8180' : '';
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;

let APP_ENV = '';
let _API_AGGRIGATOR_URL = '';
let _ATG_URL = '';
let _APP_PORT = '';
let _APITimeout = '';

if (process && process.argv[2] && _API_AGGRIGATOR_URL === '') {
  APP_ENV = process.argv[2];
  _API_AGGRIGATOR_URL = ENV_MAP[APP_ENV].API_AGGRIGATOR_URL;
  if (ENV_MAP[APP_ENV].APP_PORT) {
    _APP_PORT = ENV_MAP[APP_ENV].APP_PORT;
  }
  _APITimeout = ENV_MAP[APP_ENV].APITimeout;
  _ATG_URL = ENV_MAP[APP_ENV].ATG_URL;
} else if (process.env.APP_ENV) {
  APP_ENV = process.env.APP_ENV;
  _API_AGGRIGATOR_URL = ENV_MAP[APP_ENV].API_AGGRIGATOR_URL;
  if (process.env.APP_PORT) {
    _APP_PORT = ENV_MAP[APP_ENV].APP_PORT;
  }
  _APITimeout = ENV_MAP[APP_ENV].APITimeout;
  _ATG_URL = ENV_MAP[APP_ENV].ATG_URL;
}

export const APP_PORT = _APP_PORT;
export const API_AGGRIGATOR_URL = _API_AGGRIGATOR_URL;
export const APITimeout = _APITimeout;
export const ATG_URL = _ATG_URL;
