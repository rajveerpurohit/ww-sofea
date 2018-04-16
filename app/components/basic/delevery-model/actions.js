import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import { serverUrls } from '../../../../server/controllers/apiAggregatorEndPoints';
import { setUserSession } from '../../compound/signin/actions';

import { HIDE_LOADER } from '../../../types';

polyfill();

export const GET_DELIVERY_MODAL_SUBURBS_SUCCESS = 'GET_DELIVERY_MODAL_SUBURBS_SUCCESS';
export const GET_DELIVERY_MODAL_SUBURBS_FAILURE = 'GET_DELIVERY_MODAL_SUBURBS_FAILURE';
export const GET_SUBURBS_SUCCESS = 'GET_SUBURBS_SUCCESS';
export const GET_SUBURBS_FAILURE = 'GET_SUBURBS_FAILURE';


export const deliverModalsuburbSuccessAction = (data) => {
  return {
    type: GET_DELIVERY_MODAL_SUBURBS_SUCCESS,
    data
  };
};

export const deliverModalsuburbFailureAction = () => {
  return {
    type: GET_DELIVERY_MODAL_SUBURBS_FAILURE
  };
};

export const suburbSuccessAction = (data) => {
  return {
    type: GET_SUBURBS_SUCCESS,
    data
  };
};

export const suburbFailureAction = () => {
  return {
    type: GET_SUBURBS_FAILURE
  };
};

export const getSuburbArea = (params, suburbData) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.selectedsuburb, params: { suburbid: params } }).then((value) => {
      suburbData(value.body);
      dispatch(suburbSuccessAction({ data: value.body }));
    });
  };
};
export const postDeliveryArea = (data) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.suburb, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          // Capture omni tags on lightBox subscription
          // loggerHandler.debug('submitJoinnowForm Action :::loyaltySignup', JSON.stringify(response.body));
          dispatch(deliverModalsuburbSuccessAction(response.body));
          dispatch({ type: HIDE_LOADER });
          return dispatch(setUserSession());
        }
      }, (error) => {
        dispatch(deliverModalsuburbFailureAction(error.body));
        return dispatch({ type: HIDE_LOADER });
      })
      .catch((e) => {
        return false;
      });
  };
  // return (dispatch) => {
  //   return ServiceUtil.triggerServerRequest({url: serverUrls.suburb, method: 'POST', data}).then((value) => {
  //       dispatch(deliverModalsuburbSuccessAction({data: value.body}))
  //   });
  // };
};
