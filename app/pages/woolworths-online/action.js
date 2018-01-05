import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_WOOLWORTHONLINE_JSON_SUCCESS = 'GET_WOOLWORTHONLINE_JSON_SUCCESS';
export const GET_WOOLWORTHONLINE_FAILURE = 'GET_WOOLWORTHONLINE_FAILURE';

export const woolWorthOnlineSuccessAction = (data) => {
  return {
    type: GET_WOOLWORTHONLINE_JSON_SUCCESS,
    data
  };
};

export const woolWorthOnlineFailureAction = () => {
  return {
    type: GET_WOOLWORTHONLINE_FAILURE
  };
};

export const getUsingWoolworthsOnline = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.woolWorthOnline}).then((value) => {
        dispatch(woolWorthOnlineSuccessAction({data: value.body}));
    });
  };
};

