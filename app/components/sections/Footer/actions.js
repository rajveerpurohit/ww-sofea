import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import {serverUrls} from '../../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_FOOTER_JSON_SUCCESS = 'GET_FOOTER_JSON_SUCCESS';
export const GET_FOOTER_DATA_FAILURE = 'GET_FOOTER_DATA_FAILURE';

export const footerJSONSuccessAction = (data) => {
  return {
    type: GET_FOOTER_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const footerJSONFailureAction = () => {
  return {
    type: GET_FOOTER_DATA_FAILURE
  };
};

export const getFooterData = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.footer}).then((value) => {
      return Promise.all([
        dispatch(footerJSONSuccessAction({data: value.body}))
        ]);
    });
  };
};

