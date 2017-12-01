import { createMemoryHistory, match } from 'react-router';
import createRoutes from '../../app/routes';
import configureStore from '../../app/store/configureStore';
import * as types from '../../app/types';
import pageRenderer from './pageRenderer';

import preRenderMiddleware from './preRenderMiddleware';

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const history = createMemoryHistory();
  const store = configureStore({
    user: {
      isLoggedIn: false,
      isWaiting: false,
      message: '',
      userName: ''
    }
  }, history);
  const routes = createRoutes(store);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(err, redirect, props)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructed
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - err:       A javascript Error object if an error occurred, `undefined` otherwise.
   * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
   * - props:     The props you should pass to the routing context if the route matched,
   *              `undefined` otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */
  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      // This method waits for all render component
      // promises to resolve before returning to browser
      store.dispatch({ type: types.CREATE_REQUEST });

        preRenderMiddleware(
          store.dispatch,
          props.components,
          props.params,
          req,
          res
        )
        .then((data) => {
          store.dispatch({ type: types.REQUEST_SUCCESS, data });
          const html = pageRenderer(store, props);
          res.status(200).send(html);
        })
        .catch((error) => {
          console.log('Error in Server Side Rendering :::', error);
          res.status(500).json(error);
        });
    } else {
      res.sendStatus(404);
    }
  });
}
