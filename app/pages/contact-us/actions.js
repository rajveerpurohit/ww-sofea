import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_CONTACTUS_JSON_SUCCESS = 'GET_CONTACTUS_JSON_SUCCESS';
export const GET_CONTACTUS_DATA_FAILURE = 'GET_CONTACTUS_DATA_FAILURE';
export const GET_CONTACTINFO_JSON_SUCCESS = 'GET_CONTACTINFO_JSON_SUCCESS';
export const GET_CONTACTINFO_DATA_FAILURE = 'GET_CONTACTINFO_DATA_FAILURE';

export const contactUsJSONSuccessAction = (data) => {
  return {
    type: GET_CONTACTUS_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const contactUsJSONFailureAction = () => {
  return {
    type: GET_CONTACTUS_DATA_FAILURE
  };
};

/*Contact info actions starts*/
export const contactInfoJSONSuccessAction = (data) => {
  return {
    type: GET_CONTACTINFO_JSON_SUCCESS,
    data
  };
};

export const contactInfoJSONFailureAction = (data) => {
  return {
    type: GET_CONTACTINFO_DATA_FAILURE,
    data
  };
};
/*Contact info actions ends*/


export const getContactUsPageData = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.contactUs}).then((value) => {
      return Promise.all([
        dispatch(contactUsJSONSuccessAction({data: value.body}))
        ]);
    });
  };
};

export const getContactInfoPageData = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.contactInfo}).then((value) => {
      return Promise.all([
        dispatch(contactInfoJSONSuccessAction({data: value.body}))
        ]);
    });
  };
};

