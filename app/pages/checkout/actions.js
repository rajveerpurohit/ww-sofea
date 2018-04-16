/**
 * Checkout Actions
 */
import { polyfill } from 'es6-promise';

import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import { SET_CHECKOUT_ACTIVE_STEP, UPDATE_SHIPPING_INFO, UPDATE_SHIPPING_INSTRUCTION, FETCH_PAY_AND_CHECKOUT_FORM, ORDER_COMPLETED } from '../../types';

polyfill();

/*
 * CONSTANTS
*/
// export const FETCH_CURRENT_USER_ADDRESSES_SUCCESS = 'FETCH_CURRENT_USER_ADDRESSES_SUCCESS ';
// export const FETCH_PAY_AND_CHECKOUT_FORM = 'FETCH_PAY_AND_CHECKOUT_FORM';


export function setCheckoutActiveStep(step) {
  return (dispatch) => {
    dispatch({ type: SET_CHECKOUT_ACTIVE_STEP, data: step });
  };
}

export const updateShippingInfoAction = data => ({
  type: UPDATE_SHIPPING_INFO,
  data
});

export function updateShippingInfo(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.updateshippinginfo, method: 'POST', data }).then((value) => {
      dispatch(updateShippingInfoAction(value.body));
      return value.body;
    },
    (error) => { 
      return error.body;
    }
    );
  };
}

export function updateshippinginstructions(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.updateshippinginstructions, method: 'POST', data }).then((value) => {
      if (value.body.success === true) {
        dispatch({ type: UPDATE_SHIPPING_INSTRUCTION, data: value.body.paymentDetails });
      }
      return value.body;
    });
  };
}// 
export function backtoShippingInstructions(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.backtoShippingInstructions, method: 'GET', data }).then((value) => {
      dispatch(updateShippingInfoAction(value.body));
      return value.body;
    });
  };
}

export function redeemGiftCard(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.redeemGiftCard, method: 'POST', data }).then((value) => {
      return value.body;
    });
  };
}

export function removeGiftCard(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.removeGiftCard, method: 'DELETE', data }).then((value) => {
      return value.body;
    });
  };
}

export function getUtilityServiceforPayment() {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.getUtilityServiceforPayment, method: 'GET' }).then((value) => {
      dispatch({ type: FETCH_PAY_AND_CHECKOUT_FORM, data: value.body });
    });
  };
}

export function existingstoreorcreditcard(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.existingstoreorcreditcard, method: 'POST', data }).then((value) => {
      dispatch({ type: ORDER_COMPLETED, data: value.body });
      return value.body;
      // setCheckoutActiveStep('orderConfirmation');
    });
  };
}

export function newcreditcard(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.newcreditcard, method: 'POST', data }).then((value) => {
      dispatch({ type: ORDER_COMPLETED, data: value.body });
      return value.body;
      // setCheckoutActiveStep('orderConfirmation');
    });
  };
}

export function newstorecard(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.newstorecard, method: 'POST', data }).then((value) => {
      dispatch({ type: ORDER_COMPLETED, data: value.body });
      return value.body;
      // setCheckoutActiveStep('orderConfirmation');
    });
  };
}

export function checkout(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.checkout, method: 'POST', data }).then((value) => {
      dispatch({ type: ORDER_COMPLETED, data: value.body });
      return value.body;
    });
  };
}

export function reprice(data) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.reprice, method: 'POST', data }).then((value) => {
      return value.body;
    });
  };
}
