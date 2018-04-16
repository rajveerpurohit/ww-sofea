/**
 * Checkout Reducer
 */

// import { combineReducers } from 'redux';

import { SET_CHECKOUT_ACTIVE_STEP, UPDATE_SHIPPING_INFO, UPDATE_SHIPPING_INSTRUCTION, FETCH_PAY_AND_CHECKOUT_FORM, ORDER_COMPLETED } from '../../types';

export default function checkout(state = { activeStep: null, deliveryOption: null }, action) {
  switch (action.type) {
    case SET_CHECKOUT_ACTIVE_STEP:
      return Object.assign({}, state, { activeStep: action.data });
    case UPDATE_SHIPPING_INFO:
      return Object.assign({}, state, { deliveryOption: action.data });
    case UPDATE_SHIPPING_INSTRUCTION:
      return Object.assign({}, state, { payAndCheckout: action.data });
    case FETCH_PAY_AND_CHECKOUT_FORM:
      return Object.assign({}, state, { payAndCheckout: action.data });
    case ORDER_COMPLETED:
      return Object.assign({}, state, { orderConfirmation: action.data });
    default:
      return state;
  }
}


// export default combineReducers({ checkoutCurrentStep });
