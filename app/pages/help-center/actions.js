import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_LEFTNAV_JSON_SUCCESS = 'GET_LEFTNAV_JSON_SUCCESS';
export const GET_LEFTNAV_JSON_FALIURE = 'GET_LEFTNAV_JSON_FALIURE';
export const GET_HELP_JSON_SUCCESS = 'GET_HELP_JSON_SUCCESS';
export const GET_HELP_FAILURE = 'GET_HELP_FAILURE';

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

export const helpSuccessAction = (data) => {
  return {
    type: GET_HELP_JSON_SUCCESS,
    data
  };
};

export const helpFailureAction = () => {
  return {
    type: GET_HELP_FAILURE
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

export const getHelpAction = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.helpcenter}).then((value) => {
        dispatch(helpSuccessAction({data: value.body}));
    });
  };
};

