import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_DLP_JSON_SUCCESS = 'GET_DLP_JSON_SUCCESS';
export const GET_DLP_DATA_FAILURE = 'GET_DLP_DATA_FAILURE';

export const dlpJSONSuccessAction = (data) => {
  return {
    type: GET_DLP_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const dlpJSONFailureAction = () => {
  return {
    type: GET_DLP_DATA_FAILURE
  };
};

export const getDLPPageData = (params, reqUrl, reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.landingpages, params: { pageURL: reqUrl }}).then((value) => {
      return Promise.all([
        dispatch(dlpJSONSuccessAction({data: value.body}))
        ]);
    });
  };
};

