import { combineReducers } from 'redux';
import * as types from '../../../types';

const isLoggedIn = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return action.isLoggedIn;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const showDeliverySlotHeader = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.SHOW_DELIVERY_SLOT:
      return true;
    case types.HIDE_DELIVERY_SLOT:
      return false;
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};
const pricelistZoneId = (state = '', action) => {
  if (state !== action.priceListZoneId && action.type === types.SET_PRICELISTZONEID) return state = action.priceListZoneId;
  return state;
};

const userName = (state = '', action) => {
  if (state !== action.userName && action.type === types.SET_USERNAME) return state = action.userName;
  return state;
};

const orders = (state = [], action) => {
  if (action.type === types.SET_USER_ORDERS) {
    return action.orders;
  }
  return state;
};

const orderDetails = (state = null, action) => {
  if (action.type === types.SET_ORDER_DETAILS) {
    return action.orderDetails;
  }
  if (action.type === types.RESET_ORDER_DETAILS) {
    return null;
  }
  return state;
};

const addresses = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_CURRENT_USER_ADDRESSES_SUCCESS:
      return action.data.data;
    case types.FETCH_CURRENT_USER_ADDRESSES_FAILURE:
      return null;
    default:
      return state;
  }
};
const userReducer = combineReducers({
  isLoggedIn,
  isWaiting,
  message,
  userName,
  pricelistZoneId,
  showDeliverySlotHeader,
  orders,
  orderDetails,
  addresses
});

export default userReducer;
