import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import {serverUrls} from '../../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_DELIVERY_MODAL_SUBURBS_SUCCESS = 'GET_DELIVERY_MODAL_SUBURBS_SUCCESS';
export const GET_DELIVERY_MODAL_SUBURBS_FAILURE = 'GET_DELIVERY_MODAL_SUBURBS_FAILURE';

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

export const postDeliveryArea = (data) => {
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.suburb, method: 'POST', data})
    .then(response => {
      if (response.body) {
        console.log("777777777777777#######",response.body);
        // Capture omni tags on lightBox subscription
        //loggerHandler.debug('submitJoinnowForm Action :::loyaltySignup', JSON.stringify(response.body));
       dispatch(deliverModalsuburbSuccessAction(response.body));
      }
    }, (error) => {
      console.log("777777777777777#######",error.body);
      dispatch(deliverModalsuburbFailureAction(error.body));
    });
  };
  // return (dispatch) => {
  //   return ServiceUtil.triggerServerRequest({url: serverUrls.suburb, method: 'POST', data}).then((value) => {
  //       dispatch(deliverModalsuburbSuccessAction({data: value.body}))
  //   });
  // };
};

