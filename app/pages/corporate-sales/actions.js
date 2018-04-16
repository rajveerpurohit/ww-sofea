import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();


export const GET_CORPOARATE_SALES_JSON_SUCCESS = 'GET_CORPOARATE_SALES_JSON_SUCCESS';
export const GET_CORPOARATE_SALES_FAILURE = 'GET_CORPOARATE_SALES_FAILURE';

export const corporateSalesSuccessAction = (data) => {
  return {
    type: GET_CORPOARATE_SALES_JSON_SUCCESS,
    data
  };
};

export const corporateSalesFailureAction = () => {
  return {
    type: GET_CORPOARATE_SALES_FAILURE
  };
};

export const getCorporateSales = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.corporateSales}).then((value) => {
        dispatch(corporateSalesSuccessAction({data: value.body}));
    });
  };
};

