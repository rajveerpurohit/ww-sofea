import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_HOME_JSON_SUCCESS = 'GET_HOME_JSON_SUCCESS';
export const GET_HOME_DATA_FAILURE = 'GET_HOME_DATA_FAILURE';

export const homeJSONSuccessAction = (data) => {
  return {
    type: GET_HOME_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const homeJSONFailureAction = () => {
  return {
    type: GET_HOME_DATA_FAILURE
  };
};

export const getHomePageData = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.home}).then((value) => {
      return Promise.all([
        dispatch(homeJSONSuccessAction({data: value.body}))
        ]);
    });
  };
};

