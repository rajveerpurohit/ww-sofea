import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_HELP_JSON_SUCCESS = 'GET_HELP_JSON_SUCCESS';
export const GET_HELP_FAILURE = 'GET_HELP_FAILURE';

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

export const getHelpAction = (reqHeaders) => {

  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({headers: reqHeaders, url: serverUrls.helpcenter}).then((value) => {
        dispatch(helpSuccessAction({data: value.body}));
    });
  };
};

