import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();


export const GET_SAFE_SECURE_JSON_SUCCESS = 'GET_SAFE_SECURE_JSON_SUCCESS';
export const GET_SAFE_SECURE_FAILURE = 'GET_SAFE_SECURE_FAILURE';

export const safenSecureSuccessAction = (data) => {
  return {
    type: GET_SAFE_SECURE_JSON_SUCCESS,
    data
  };
};

export const safeSecureFailureAction = () => {
  return {
    type: GET_SAFE_SECURE_FAILURE
  };
};

export const getUsingSafenSecure = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.safenseure}).then((value) => {
        dispatch(safenSecureSuccessAction({data: value.body}))
    });
  };
};

