import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createRoutes from './routes';
import * as types from './types';
import configureStore from './store/configureStore';

import { ATG_URL, EXTERNAL_IMAGE_URL, INTERNAL_IMAGE_URL, USE_CDN } from '../config/app';

import preRenderMiddleware from '../server/render/preRenderMiddleware';

import CommonUtil from './services/commonUtil';
// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

let store;
// let store = configureStore(initialState, browserHistory);
// let history = syncHistoryWithStore(browserHistory, store);
// let routes = createRoutes(store);

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  if (typeof window !== 'undefined' && !window.ATG_URL) {
    switch (true) {
      case !window.ATG_URL:
        Object.defineProperty(window, 'ATG_URL', {
          value: ATG_URL
        });
        break;
      case !window.EXTERNAL_IMAGE_URL:
        Object.defineProperty(window, 'EXTERNAL_IMAGE_URL', {
          value: EXTERNAL_IMAGE_URL
        });
        break;
      case !window.INTERNAL_IMAGE_URL:
        Object.defineProperty(window, 'INTERNAL_IMAGE_URL', {
          value: INTERNAL_IMAGE_URL
        });
        break;
      case !window.USE_CDN:
        Object.defineProperty(window, 'USE_CDN', {
          value: USE_CDN
        });
        break;
      /* no default */
    }
  }

  store.dispatch({ type: types.CREATE_REQUEST });

  const { components, params } = this.state;
  // URL with query param.
  const reqLoc = window.location.pathname + window.location.search;
  preRenderMiddleware(
    store.dispatch,
    components,
    params,
    {
      url: reqLoc,
      headers: {}
    }

  );
}

Promise.resolve()
      .then(() => CommonUtil.setAnonymousUserToken()) // resolve func[0]
      .then(() => {
        store = configureStore(initialState, browserHistory);
        let history = syncHistoryWithStore(browserHistory, store);
        let routes = createRoutes(store);
        // Router converts <Route> element hierarchy to a route config:
        // Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
        render(
          <Provider store={store}>
            <Router history={history} onUpdate={onUpdate}>
              <div>{routes}</div>
            </Router>
          </Provider>, document.getElementById('app')
        );
      });
