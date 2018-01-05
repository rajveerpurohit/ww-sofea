import { push } from 'react-router-redux';
import { authService } from '../../../services';
import { setDeliveryLocation } from '../deliveryDetails/actions';

import * as types from '../../../types';

function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(message) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

function setUserName(userName = '') {
  return { type: types.SET_USERNAME, userName};
}
export function toggleLoginMode(isLoggedIn = true) {
  return { type: types.TOGGLE_LOGIN_MODE, isLoggedIn };
}

export function manualLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());

    return authService().login(data)
      .then((response) => {
          dispatch(loginSuccess('You have been successfully logged in'));
          dispatch(push('/'));
          dispatch(setUserSession());
      })
      .catch((err) => {
        let message = 'Something went wrong. Please try again';
        if(err.response && err.response.data && err.response.data.title) message = err.response.data.title; 
        dispatch(loginError(message));
      });
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return authService().signUp(data)
      .then((response) => {
          dispatch(signUpSuccess('You have successfully registered an account!'));
          dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(signUpError('Oops! Something went wrong when signing up'));
      });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());

    return authService().logOut()
      .then((response) => {
          if (response.status === 200) {
             dispatch(logoutSuccess()) 
          } else {
             throw new Error('something went wrong');
          }
          dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(logoutError());
      });
  };
}

export function setUserSession() {
  return (dispatch) => {
    return authService().isLoggedIn()
      .then((response) => {
        if (!response.body) return null;
        const suburbData = response.body.suburb;
        const region = response.body.region;

        if (region && suburbData) {
          const dataObj = {
            suburbId: suburbData.id,
            provinceId: region.id,
            postalCode: suburbData.zipCode ? suburbData.zipCode.postalCode : '',
            suburbName: suburbData.displayName,
            regionName: region.displayName
          };
          dispatch(setDeliveryLocation(dataObj));
        }

        if (response.body.firstName) {        
          const userName = `${response.body.firstName} ${response.body.lastName}`;
          dispatch(toggleLoginMode(true));
          dispatch(setUserName(userName));
        }
        return null;
      })
      .catch(err => {
        // dispatch(toggleLoginMode(true));
        // dispatch(setUserName('Guest User'));
      })
    } 
}

export function redirect(url = '/') {
  return dispatch => dispatch(push(url));
}

