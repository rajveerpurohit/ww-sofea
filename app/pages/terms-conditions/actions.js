import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_TERMSNCODITIONS_JSON_SUCCESS = 'GET_TERMSNCODITIONS_JSON_SUCCESS';
export const GET_TERMSNCODITIONS_FAILURE = 'GET_PRESSNEWS_FAILURE';

export const termsnConditionsSuccessAction = (data) => {
  return {
    type: GET_TERMSNCODITIONS_JSON_SUCCESS,
    data
  };
};

export const termsnConditionsFailureAction = () => {
  return {
    type: GET_TERMSNCODITIONS_FAILURE
  };
};

export const getTermsNCondtions = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.footerterms}).then((value) => {
        dispatch(termsnConditionsSuccessAction({data: value.body}))
    });
  };
};

