/**
* This looks at static needs parameter in components
* and waits for the promise to be fullfilled.
*
* It is used to make sure server side rendered pages
* wait for APIs to resolve before returning res.end().
*
* As seen in: https://github.com/caljrimmer/isomorphic-redux-app
*/

const preRenderMiddleware = (dispatch, components, params, req, res) => {
  return Promise.all(
    components.reduce((previous, current) => {
      return ((current && current.need) || []).concat(previous);
    }, []).map((need) => {
      return dispatch(need(params, req.url, req.headers, res));
    })
  );
};

export default preRenderMiddleware;
