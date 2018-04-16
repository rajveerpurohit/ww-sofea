import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_STORELOCATOR_JSON_SUCCESS = 'GET_STORELOCATOR_JSON_SUCCESS';
export const GET_STORELOCATOR_FAILURE = 'GET_STORELOCATOR_FAILURE';

export const storeLocatorSuccessAction = data => ({
  type: GET_STORELOCATOR_JSON_SUCCESS,
  data
});

export const storeLocatorFailureAction = () => ({ type: GET_STORELOCATOR_FAILURE });

export const getStoreLocator = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.leftNav
    }).then(value => dispatch(storeLocatorSuccessAction({ data: value.body })));
  };
};
