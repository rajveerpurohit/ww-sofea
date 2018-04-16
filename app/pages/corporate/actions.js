import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_LEFTNAV_JSON_SUCCESS = 'GET_LEFTNAV_JSON_SUCCESS';
export const GET_LEFTNAV_JSON_FALIURE = 'GET_LEFTNAV_JSON_FALIURE';
export const GET_CORPOARATE_JSON_SUCCESS = 'GET_CORPOARATE_JSON_SUCCESS';
export const GET_CORPOARATE_JSON_FAILURE = 'GET_CORPOARATE_JSON_FAILURE';

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

export const corporateSuccessAction = (data) => {
  return {
    type: GET_CORPOARATE_JSON_SUCCESS,
    data
  };
};

export const corporateFailureAction = () => {
  return {
    type: GET_CORPOARATE_JSON_FAILURE
  };
};

export const getLeftNav = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.leftnav }).then((value) => {
      dispatch(leftNavSuccessAction({ data: value.body }));
    },
      (error) => { console.log(error); }
    );
  };
};

export const getCorporate = (params, reqUrl) => {
  const url = reqUrl.split('/');
  let contentId = '';
  if (url.length > 2) {
    contentId = url[url.length - 1];
  }
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.corporate, params: { contentId: contentId ? contentId : null } }).then((value) => {
      dispatch(corporateSuccessAction({ data: value.body }));
    });
  };
};

