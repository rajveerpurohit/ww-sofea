import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import {serverUrls} from '../../../../server/controllers/apiAggregatorEndPoints';
import { setUserSession } from '../../compound/signin/actions';

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
        
        // Capture omni tags on lightBox subscription
        //loggerHandler.debug('submitJoinnowForm Action :::loyaltySignup', JSON.stringify(response.body));
       dispatch(deliverModalsuburbSuccessAction(response.body));
       dispatch(setUserSession());
      }
    }, (error) => {
      dispatch(deliverModalsuburbFailureAction(error.body));
    })
    .catch(e => {
      return false;
    });
  };
  // return (dispatch) => {
  //   return ServiceUtil.triggerServerRequest({url: serverUrls.suburb, method: 'POST', data}).then((value) => {
  //       dispatch(deliverModalsuburbSuccessAction({data: value.body}))
  //   });
  // };
};

