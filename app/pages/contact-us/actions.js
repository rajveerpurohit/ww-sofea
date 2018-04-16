import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_CONTACTUS_JSON_SUCCESS = 'GET_CONTACTUS_JSON_SUCCESS';
export const GET_CONTACTUS_DATA_FAILURE = 'GET_CONTACTUS_DATA_FAILURE';
export const GET_CONTACTINFO_JSON_SUCCESS = 'GET_CONTACTINFO_JSON_SUCCESS';
export const GET_CONTACTINFO_DATA_FAILURE = 'GET_CONTACTINFO_DATA_FAILURE';
export const POST_CONTACT_QUERY_SUCCESS = 'POST_CONTACT_QUERY_SUCCESS';
export const POST_CONTACT_QUERY_FAILURE = 'POST_CONTACT_QUERY_FAILURE';


export const contactUsJSONSuccessAction = data => ({
  type: GET_CONTACTUS_JSON_SUCCESS,
  data
});

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const contactUsJSONFailureAction = () => ({ type: GET_CONTACTUS_DATA_FAILURE });

/* Contact info actions starts*/
export const contactInfoJSONSuccessAction = data => ({
  type: GET_CONTACTINFO_JSON_SUCCESS,
  data
});

export const contactInfoJSONFailureAction = data => ({
  type: GET_CONTACTINFO_DATA_FAILURE,
  data
});
/* Contact info actions ends*/

export const contactQuerySuccessAction = data => ({
  type: POST_CONTACT_QUERY_SUCCESS,
  data
});

export const contactQueryFailureAction = data => ({
  type: POST_CONTACT_QUERY_FAILURE,
  data
});

export const getContactUsPageData = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.contactUs
    }).then(
      value => dispatch(contactUsJSONSuccessAction({ data: value.body })),
      error => dispatch(contactUsJSONFailureAction(error))
    );
  };
};

export const getContactInfoPageData = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.contactInfo
    }).then(
      value => dispatch(contactInfoJSONSuccessAction({ data: value.body })),
      error => dispatch(contactInfoJSONFailureAction(error))
    );
  };
};

export const postContactQuery = (contactQueryData) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      method: 'POST',
      url: serverUrls.contactUsPost,
      data: contactQueryData
    }).then(
      value => dispatch(contactQuerySuccessAction({ data: value.body })),
      error => dispatch(contactQueryFailureAction(error))
    );
  };
};
