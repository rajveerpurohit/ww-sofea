import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_CLP_JSON_SUCCESS = 'GET_CLP_JSON_SUCCESS';
export const GET_CLP_DATA_FAILURE = 'GET_CLP_DATA_FAILURE';

export const clpJSONSuccessAction = (data) => {
  return {
    type: GET_CLP_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const clpJSONFailureAction = () => {
  return {
    type: GET_CLP_DATA_FAILURE
  };
};
function getParameterByName(name, url) {
  if (typeof window !== 'undefined' && window) {
    if (!url) url = window.location.pathname;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return results[2].replace(/\+/g, ' ');
}
export const getCLPPageData = (params, reqUrl, reqHeaders) => {
 
    let url = '';
    if (params.splat) {
      url = '/cat/' + params.splat;
    } else if (params.pageURL) {
      url = params.pageURL;
    } else if (typeof window !== 'undefined' && window) {
      url = window.location.pathname;
    }
    const No = getParameterByName('No', reqUrl);
    const Nr = getParameterByName('Nr', reqUrl);
    const Nrpp = getParameterByName('Nrpp', reqUrl);
    const Ns = getParameterByName('Ns', reqUrl);
   const clpParams = {
          pageURL: params ? url : reqUrl,
          No: params && params.No ? params.No : No,
          Nr: params && params.Nr ? params.Nr : Nr,
          Nrpp: params && params.Nrpp ? params.Nrpp : Nrpp,
          Ns: params && params.Ns ? params.Ns : Ns
      };

  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.landingpages, params: { ...clpParams } }).then((value) => {
      if (value.body) {
	  return Promise.all([
                dispatch(clpJSONSuccessAction({ data: value.body }))
                ]);
      }
    }, (error) => {
      return Promise.all([
      dispatch(clpJSONFailureAction(error.value))
    ]);
    });
  };
};
