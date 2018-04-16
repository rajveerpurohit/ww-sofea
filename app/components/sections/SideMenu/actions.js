import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import { serverUrls } from '../../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_ACCOUNT_LEFTNAV_JSON_SUCCESS = 'GET_ACCOUNT_LEFTNAV_JSON_SUCCESS';
export const GET_LEFTNAV_DATA_FAILURE = 'GET_LEFTNAV_DATA_FAILURE';
export const GET_FINANCIALLEFTNAV_JSON_SUCCESS = 'GET_FINANCIALLEFTNAV_JSON_SUCCESS';
export const GET_FINANCIALLEFTNAV_JSON_FALIURE = 'GET_FINANCIALLEFTNAV_JSON_FALIURE';
export const GET_WREWARDS_LEFTNAV_JSON_SUCCESS = 'GET_WREWARDS_LEFTNAV_JSON_SUCCESS';
export const GET_WREWARDS_LEFTNAV_JSON_FALIURE = 'GET_WREWARDS_LEFTNAV_JSON_FALIURE';

/* Contact info actions starts*/
export const leftNavJSONSuccessAction = (data) => {
  return {
    type: GET_ACCOUNT_LEFTNAV_JSON_SUCCESS,
    data
  };
};

export const leftNavJSONFailureAction = (data) => {
  return {
    type: GET_LEFTNAV_DATA_FAILURE,
    data
  };
};
export const leftNavSuccessAction = (data) => {
  return {
    type: GET_FINANCIALLEFTNAV_JSON_SUCCESS,
    data
  };
};

export const leftNavFailureAction = () => {
  return {
    type: GET_FINANCIALLEFTNAV_JSON_FALIURE
  };
};

export const wrewardsLeftNavSuccessAction = (data) => {
  return {
    type: GET_WREWARDS_LEFTNAV_JSON_SUCCESS,
    data
  };
};

export const wrewardsLeftNavFailureAction = () => {
  return {
    type: GET_WREWARDS_LEFTNAV_JSON_FALIURE
  };
};

export const getleftNavPageData = (p, r, reqHeaders) => {
  return (dispatch, getState) => {
    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.getleftNav,
    }).then((value) => {
      dispatch(leftNavJSONSuccessAction({ data: value.body }));
    });
  };
};
export const getwfsLeftNav = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.wfsLeftNav }).then((value) => {
      dispatch(leftNavSuccessAction({ data: value.body }));
    },
        (error) => { dispatch(leftNavFailureAction({ data: error.body })); }
      );
  };
};

export const getWrewardsLeftNav = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.wrewardsLeftNav }).then((value) => {
      dispatch(wrewardsLeftNavSuccessAction({ data: value.body }));
    },
      (error) => { console.log(error); }
    );
  };
};
