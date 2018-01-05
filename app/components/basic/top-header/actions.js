import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import {serverUrls} from '../../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_TOPHEADER_JSON_SUCCESS = 'GET_TOPHEADER_JSON_SUCCESS';
export const GET_TOPHEADER_DATA_FAILURE = 'GET_TOPHEADER_DATA_FAILURE';

export const topHeaderSuccessAction = (data) => {
  return {
    type: GET_TOPHEADER_JSON_SUCCESS,
    data
  };
};

export const topHeaderFailureAction = () => {
  return {
    type: GET_TOPHEADER_DATA_FAILURE
  };
};

export const getUtility = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({headers: reqHeaders, url: serverUrls.topheader}).then((value) => {
        dispatch(topHeaderSuccessAction({data: value.body}));
    });
  };
};

