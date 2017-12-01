import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import {serverUrls} from '../../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/

export const GET_MEGANAV_JSON_SUCCESS = 'GET_MEGANAV_JSON_SUCCESS';
export const GET_MEGANAV_DATA_FAILURE = 'GET_MEGANAV_DATA_FAILURE';
export const GET_LOGO_JSON_SUCCESS = 'GET_LOGO_JSON_SUCCESS';
export const GET_LOGO_DATA_FAILURE = 'GET_LOGO_DATA_FAILURE';

export const megaNavJSONSuccessAction = (data) => {
  return {
    type: GET_MEGANAV_JSON_SUCCESS,
    data
  };
};
export const megaNavJSONFailureAction = () => {
  return {
    type: GET_MEGANAV_DATA_FAILURE
  };
};

export const logoJSONSuccessAction = (data) => {
  return {
    type: GET_LOGO_JSON_SUCCESS,
    data
  };
};
export const logoJSONFailureAction = () => {
  return {
    type: GET_LOGO_DATA_FAILURE
  };
};

export const getMegaNavData = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.megamenu}).then((value) => {
      return Promise.all([
        dispatch(megaNavJSONSuccessAction({data: value.body}))
        ]);
    });
  };
};
export const getLogo = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.logo}).then((value) => {
      return Promise.all([
        dispatch(logoJSONSuccessAction({data: value.body}))
        ]);
    });
  };
};

