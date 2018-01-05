import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_LEFTNAV_JSON_SUCCESS = 'GET_LEFTNAV_JSON_SUCCESS';
export const GET_LEFTNAV_JSON_FALIURE = 'GET_LEFTNAV_JSON_FALIURE';
export const GET_FAQ_JSON_SUCCESS = 'GET_FAQ_JSON_SUCCESS';
export const GET_FAQ_FAILURE = 'GET_FAQ_FAILURE';
export const GET_FAQDETAIL_JSON_SUCCESS = 'GET_FAQDETAIL_JSON_SUCCESS';
export const GET_FAQDETAIL_JSON_FALIURE = 'GET_FAQDETAIL_JSON_FALIURE';


export const faqSuccessAction = (data) => {
  return {
    type: GET_FAQ_JSON_SUCCESS,
    data
  };
};

export const faqFailureAction = () => {
  return {
    type: GET_FAQ_FAILURE
  };
};

export const faqDetailSuccessAction = (data) => {
  return {
    type: GET_FAQDETAIL_JSON_SUCCESS,
    data
  };
};

export const faqDetailFailureAction = () => {
  return {
    type: GET_FAQDETAIL_JSON_FALIURE
  };
};

export const leftNavSuccessAction = (data) => {
  return {
    type: GET_LEFTNAV_JSON_SUCCESS,
    data
  };
};

export const leftNavFailureAction = () => {
  return {
    type: GET_LEFTNAV_JSON_FALIURE
  };
};

export const getLeftNav = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.leftnav}).then((value) => {
        dispatch(leftNavSuccessAction({data: value.body}));
    },
    (error) => { console.log(error); }
  );
  };
};

export const getFAQ = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.faq}).then((value) => {
        dispatch(faqSuccessAction({data: value.body}));
    },
    (error) => { console.log(error); }
  );
  };
};

export const getFaqDetails = (contentId) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.faqDetails, params: { contentId: contentId }}).then((value) => {
        dispatch(faqDetailSuccessAction({data: value.body}));
    },
    (error) => { console.log(error); }
  );
  };
}

