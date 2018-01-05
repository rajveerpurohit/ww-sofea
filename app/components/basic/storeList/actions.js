import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import {serverUrls} from '../../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_STORELIST_JSON_SUCCESS = 'GET_STORELIST_JSON_SUCCESS';
export const GET_LOCATION_STORELIST_JSON_SUCCESS = 'GET_LOCATION_STORELIST_JSON_SUCCESS';
export const GET_EMPTY_STORELIST_JSON_SUCCESS = 'GET_EMPTY_STORELIST_JSON_SUCCESS';
export const GET_DAYLIST_JSON_SUCCESS = 'GET_DAYLIST_JSON_SUCCESS';
export const GET_STORELIST_JSON_FAILURE = 'GET_STORELIST_JSON_FAILURE';

export const storeListSuccessAction = (data) => {
  return {
    type: GET_STORELIST_JSON_SUCCESS,
    data
  };
};

export const storeLocationListSuccessAction = (data) => {
  return {
    type: GET_LOCATION_STORELIST_JSON_SUCCESS,
    data
  };
};

export const storeEmptySuccessAction = (data) => {
  return {
    type: GET_EMPTY_STORELIST_JSON_SUCCESS,
    data
  };
};
export const dayListSuccessAction = (data) => {
  return {
    type: GET_DAYLIST_JSON_SUCCESS,
    data
  };
};

export const storeListFailureAction = () => {
  return {
    type: GET_STORELIST_JSON_FAILURE
  };
};

export const getStoreList= (suburbParams) => {
 // console.log('serverUrls.getStoreList---'+ serverUrls.storelocatorByArea);
 // console.log('serverUrls.getStoreList---suburbParams='+JSON.stringify(suburbParams));
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.storelocatorByArea, params:{...suburbParams}}).then((value) => {
	//console.log('Inside getStoreList...........value='+JSON.stringify(value));
        dispatch(storeListSuccessAction({data: value.body}));
    }).catch(function (err) {
        return storeListFailureAction()
    })
  };
};


export const getLocationStoreList= (geoLocationParams) => {
 // console.log('serverUrls.getLocationStoreList---'+ serverUrls.storelocatorByGeoLocation);
 // console.log('serverUrls.getStoreList---geoLocationParams='+JSON.stringify(geoLocationParams));
  return (dispatch) => {

    return ServiceUtil.triggerServerRequest({url: serverUrls.storelocatorByGeoLocation, params: {...geoLocationParams}}).then((value) => {
        dispatch(storeLocationListSuccessAction({data: value.body}));
    }).catch(function (err) {
        return storeListFailureAction()
    })
  };
};

export const getEmptyStoreList= () => {
  //console.log('serverUrls.getEmptyStoreList---');
  return (dispatch) => {

	//console.log('Inside getEmptyStoreList...........');
        dispatch(storeEmptySuccessAction({data: null}));

  };
};


export const getDayList= (storeList) => {
  //console.log('serverUrls.getDayList---'+ JSON.stringify(storeList));
  return (dispatch) => {

//	console.log('Inside getDayList...........');
		const value = storeList;
        dispatch(dayListSuccessAction({data: value}));

  };
};









