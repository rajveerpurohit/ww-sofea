import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_STORELOCATOR_JSON_SUCCESS = 'GET_STORELOCATOR_JSON_SUCCESS';
export const GET_STORELOCATOR_FAILURE = 'GET_STORELOCATOR_FAILURE';

export const storeLocatorSuccessAction = (data) => {
  return {
    type: GET_STORELOCATOR_JSON_SUCCESS,
    data
  };
};

export const storeLocatorFailureAction = () => {
  return {
    type: GET_STORELOCATOR_FAILURE
  };
};

export const getStoreLocator= (reqHeaders) => {
 // console.log('serverUrls.getStoreLocator---', serverUrls.leftNav);
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({headers: reqHeaders, url: serverUrls.leftNav}).then((value) => {
	//console.log('Inside getStoreLocator...........value='+JSON.stringify(value));
        dispatch(storeLocatorSuccessAction({data: value.body}));
    });
  };
};


