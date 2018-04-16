import { ENV, ENV_MAP } from './env';

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
let _EXTERNAL_IMAGE_URL = null;
let _INTERNAL_IMAGE_URL = null;
let _USE_CDN = null;

if (process && process.argv[2] && _API_AGGRIGATOR_URL === '') {
  APP_ENV = process.argv[2];
} else if (process.env.APP_ENV) {
  APP_ENV = process.env.APP_ENV;
}

if (APP_ENV) {
  _API_AGGRIGATOR_URL = ENV_MAP[APP_ENV].API_AGGRIGATOR_URL;
  _APP_PORT = ENV_MAP[APP_ENV].APP_PORT;
  _APITimeout = ENV_MAP[APP_ENV].APITimeout;
  _ATG_URL = ENV_MAP[APP_ENV].ATG_URL;
  _EXTERNAL_IMAGE_URL = ENV_MAP[APP_ENV].EXTERNAL_IMAGE_URL;
  _INTERNAL_IMAGE_URL = ENV_MAP[APP_ENV].INTERNAL_IMAGE_URL;
  _USE_CDN = ENV_MAP[APP_ENV].USE_CDN;
}

export const APP_PORT = _APP_PORT;
export const API_AGGRIGATOR_URL = _API_AGGRIGATOR_URL;
export const APITimeout = _APITimeout;
export const ATG_URL = _ATG_URL;
export const USE_CDN = _USE_CDN;
export const EXTERNAL_IMAGE_URL = _EXTERNAL_IMAGE_URL;
export const INTERNAL_IMAGE_URL = _INTERNAL_IMAGE_URL;
