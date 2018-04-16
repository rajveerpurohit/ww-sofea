import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import staticAssets from './static-assets';

import { ATG_URL, EXTERNAL_IMAGE_URL, INTERNAL_IMAGE_URL, USE_CDN } from '../../config/app';

global.INTERNAL_IMAGE_URL = INTERNAL_IMAGE_URL;

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
    ${staticAssets.createGTMScript()}
  </head>
  <body>
    ${staticAssets.createGTMNoScript()}
    <div id="app"><div class="app">${componentHTML}</div></div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    ${staticAssets.createAppScript()}
  <script>
  if (typeof window !== 'undefined' && !window.ATG_URL) {
    switch(true) {
      case !window.ATG_URL:
        Object.defineProperty(window, 'ATG_URL', {
          value: '${ATG_URL}'
        });
      case !window.EXTERNAL_IMAGE_URL:
        Object.defineProperty(window, 'EXTERNAL_IMAGE_URL', {
          value: '${EXTERNAL_IMAGE_URL}'
        });
      case !window.INTERNAL_IMAGE_URL:
        Object.defineProperty(window, 'INTERNAL_IMAGE_URL', {
          value: '${INTERNAL_IMAGE_URL}'
        });
      case !window.USE_CDN:
        Object.defineProperty(window, 'USE_CDN', {
          value: ${USE_CDN}
        });
    }
  }
  </script>
  </body>
</html>`;
};

export default (store, props) => {
  const initialState = store.getState();
  const componentHTML = createApp(store, props);
  const headAssets = Helmet.renderStatic();
  return buildPage({ componentHTML, initialState, headAssets });
};
