import { accountServices } from '../../../services';
import * as types from '../../../types';
import { push } from 'react-router-redux';

function setOrderHistory(orders = []) {
    console.log(orders);
    return {type: types.SET_USER_ORDERS, orders};
} 

export function getOrderHistory(num) {
    return (dispatch) => {
      return accountServices().getOrderHistory(num)
      .then((response) => {
        const orderHistory = response && response.body && response.body.orders ? response.body.orders : [];
        console.log(response, response.orders, orderHistory);
        dispatch(setOrderHistory(orderHistory));
      });
    };
}

export function getOrderDetails(orderId='') {
    return (dispatch) => {
      return accountServices().getOrderDetails(orderId)
      .then((response) => {
        return dispatch({ type: types.SET_ORDER_DETAILS, orderDetails: response.body });
      });
    };
}

export function resetOrderDetails() {
    return (dispatch) => {
        return dispatch({ type: types.RESET_ORDER_DETAILS });
    }
}

export function cancelOrder(orderId='') {
    return (dispatch) => {
      return accountServices().cancelOrder(orderId)
      .then((response) => {
        return dispatch(getOrderHistory(-1));
      });
    };
}

export function addItemsToOrder(orderId = '', commerceItemType = '') {
    return (dispatch) => {
      return accountServices().addItemsToOrder(orderId, commerceItemType)
      .then((response) => {
        return dispatch(push('/checkout/cart'));
      });
    };
}

export function redirectToLogin(url) {
    return (dispatch) => {
        if(url) {
            return dispatch(push(url));
        }
        return dispatch(push('/login'));
    };    
}