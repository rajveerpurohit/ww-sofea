import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_PRESSNEWS_JSON_SUCCESS = 'GET_PRESSNEWS_JSON_SUCCESS';
export const GET_PRESSNEWS_FAILURE = 'GET_PRESSNEWS_FAILURE';

export const pressNewsSuccessAction = (data) => {
  return {
    type: GET_PRESSNEWS_JSON_SUCCESS,
    data
  };
};

export const pressNewsFailureAction = () => {
  return {
    type: GET_PRESSNEWS_FAILURE
  };
};

export const getPressNews = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.pressnews}).then((value) => {
        console.log("pressNews "+serverUrls.pressnews + "value" + value.body);
        dispatch(pressNewsSuccessAction({data: value.body}))
    });
  };
};

