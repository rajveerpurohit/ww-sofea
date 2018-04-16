import express from 'express';
import webpack from 'webpack';
import axios from 'axios';
import { isDebug, API_AGGRIGATOR_URL } from '../config/app';
import initExpress from './init/express';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';

const app = express();
const reqHost = null;

if (isDebug) {
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config');
  const devBrowserConfig = webpackConfig({ browser: true });
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

/* To allow cross origin access from old architecture set up on port 7003 to new architecture
 set up on port 3333 */

app.use((req, res, next) => {
  // Website you wish to allow to connect
  // To set header "Access-Control-Allow-Origin" in Dev Environment only
  if (reqHost !== null && reqHost.indexOf('localhost') !== -1) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  }
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */


const _home = { homeData: {} };
const _headerReducer = { miniCartReducer: {}, headerDetailsReducer: {} };
const _labels = { labelsAndErrorMessages: {} };
const _common = { seo: { SEOTags: {} } };

Promise.all([
  axios.get(API_AGGRIGATOR_URL + '/api/headers/megamenu'),
  axios.get(API_AGGRIGATOR_URL + '/api/headers/headerdetails'),
  axios.get(API_AGGRIGATOR_URL + '/api/cart/details'),
  axios.get(API_AGGRIGATOR_URL + '/api/label'),
  axios.get(API_AGGRIGATOR_URL + '/api/static/content/home'),
  axios.get(API_AGGRIGATOR_URL + '/api/label/seo'),
]).then((response) => {
  console.log('::::Promises Resolved For Meganav, Logo, Cartdetails, Footer, Labels, seoTags and regions::::');
  _headerReducer.meganavReducer = response[0].data;
  _headerReducer.headerDetailsReducer.headerDetailsData = response[1].data;
  _headerReducer.miniCartReducer.miniCartData = response[2].data;
  _labels.labelsAndErrorMessages = response[3].data.labelsAndErrorMessages;
  _home.homeData = response[4].data.contents;
  _common.seo.SEOTags = response[5].data.SEOTags;
  _common.seo.SEOTags.home = {
    title: response[4].data.contents[0].title,
    metaKeywords: response[4].data.contents[0].metaKeywords,
    metaDescription: response[4].data.contents[0].metaDescription
  };
  /*
  * Bootstrap application settings
  */
  initExpress(app);

  /*
  * REMOVE if you do not need any routes
  *
  * Note: Some of these routes have passport and database model dependencies
  */
  initRoutes(app);
  app.listen(app.get('port'));
  app.get('*', renderMiddleware);
})
  .catch((error) => {
    console.log(' !!!!******* EA SERVER STARTUP HALTED ******!!!!\nError--', error);
  });

export const headerReducer = _headerReducer;
export const home = _home;
export const labels = _labels;
export const common = _common;
