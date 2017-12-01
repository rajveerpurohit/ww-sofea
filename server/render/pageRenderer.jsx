import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import staticAssets from './static-assets';

const createApp = (store, props) => renderToString(
  <Provider store={store}>
    <RouterContext {...props} />
  </Provider>
);

const buildPage = ({ componentHTML, initialState, headAssets }) => {
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${staticAssets.createStylesheets()}
    ${staticAssets.createTrackingScript()}
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-sham.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-shim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-sham.min.js"></script>
    <script src="https://wzrd.in/standalone/es7-shim@latest"></script>
  </head>
  <body>
  
    <div id="app">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    ${staticAssets.createAppScript()}
    <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  </body>
</html>`;
};

export default (store, props) => {
  const initialState = store.getState();
  const componentHTML = createApp(store, props);
  const headAssets = Helmet.renderStatic();
  return buildPage({ componentHTML, initialState, headAssets });
};

