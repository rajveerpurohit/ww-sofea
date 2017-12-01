import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_ABOUTUS_JSON_SUCCESS = 'GET_ABOUTUS_JSON_SUCCESS';
export const GET_ABOUTUS_FAILURE = 'GET_ABOUTUS_FAILURE';

export const aboutUsSuccessAction = (data) => {
  return {
    type: GET_ABOUTUS_JSON_SUCCESS,
    data
  };
};

export const aboutUsFailureAction = () => {
  return {
    type: GET_ABOUTUS_FAILURE
  };
};

export const getUsingAboutUs = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.aboutUs}).then((value) => {
        dispatch(aboutUsSuccessAction({data: value.body}))
    });
  };
};

