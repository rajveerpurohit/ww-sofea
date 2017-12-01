import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_WOOLWORTHONLINE_JSON_SUCCESS = 'GET_WOOLWORTHONLINE_JSON_SUCCESS';
export const GET_WOOLWORTHONLINE_FAILURE = 'GET_WOOLWORTHONLINE_FAILURE';

export const woolWorthOnlineSuccessAction = (data) => {
  return {
    type: GET_WOOLWORTHONLINE_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const woolWorthOnlineFailureAction = () => {
  return {
    type: GET_WOOLWORTHONLINE_FAILURE
  };
};

export const getUsingWoolworthsOnline = () => {
  return (dispatch) => {
      console.log("serverUrls : " + serverUrls.woolWorthOnline)
    return ServiceUtil.triggerServerRequest({url: serverUrls.woolWorthOnline}).then((value) => {
        dispatch(woolWorthOnlineSuccessAction({data: value.body}))
    });
  };
};

