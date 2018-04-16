import { push } from 'react-router-redux';
import { authService, accountServices } from '../../../services';
import { getminiCartData } from '../../sections/Header/actions';
import { setDeliveryLocation, deliverySlotSession } from '../deliveryDetails/actions';
import * as types from '../../../types';

export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const SET_CURRENT_USER_SHOPPING_URL = 'SET_CURRENT_USER_SHOPPING_URL';

function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(message = '') {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message
  };
}

function loginError(message = '') {
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
  return { type: types.LOGOUT_USER };
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function setUserName(userName = '') {
  return { type: types.SET_USERNAME, userName };
}
export function toggleLoginMode(isLoggedIn = true) {
  return { type: types.TOGGLE_LOGIN_MODE, isLoggedIn };
}

export function manualLogin(data, redirectUrl = '/') {
  return (dispatch) => {
    const doNotAllowRedirect = ['/reset-password-thanks', '/reset-password', '/registration'];    
    if (doNotAllowRedirect.includes(redirectUrl)) {
      console.log('hereee change redirect url')
      redirectUrl = '/';
    }
    dispatch(beginLogin());
    return authService().login(data)
      .then((res) => {
        if (res && res.body.errorMessage) throw new Error(res.body.errorMessage);
        dispatch(loginSuccess('You have been successfully logged in'));
        dispatch(push(redirectUrl));
        dispatch(setUserSession());
        localStorage.setItem('emailValue', data.login)
      })
      .catch((err) => {
        let message = 'Something went wrong. Please try again';
        if (err.message) message = err.message;
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
        if (response && response.body && response.body.loggedOut === true) {
          localStorage.removeItem('logout');
          localStorage.removeItem('SelectedOption');
          dispatch(logoutSuccess());
        }
        dispatch(getminiCartData());
        dispatch(push('/'));
        dispatch(setUserSession());
      })
      .catch((err) => {
        dispatch(logoutError());
      });
  };
}

export function setUserSession(currentUrl = '/') {
  return (dispatch) => {
    dispatch(beginLogin());
    return authService().isLoggedIn()
      .then((response) => {
        if (!response.body) return null;
        dispatch(getCurrentUserSuccess(response.body));
        const suburbData = response.body.suburb;
        const region = response.body.region;

        if (region && suburbData) {
          const dataObj = {
            suburbId: suburbData.id,
            provinceId: region.id,
            postalCode: suburbData.zipCode ? suburbData.zipCode : '',
            suburbName: suburbData.displayName,
            regionName: region.displayName
          };
          dispatch(setDeliveryLocation(dataObj));
        }

        if (response.body.firstName) {
          const userName = `${response.body.firstName} ${response.body.lastName}`;
          dispatch(toggleLoginMode(true));
          dispatch(setUserName(userName));
          dispatch(loginSuccess('A user is logged In'));
        } else {
          dispatch(loginError());
        }
        dispatch(setCurrentUserShoppingUrl(currentUrl));
        return null;
      })
      // .then(() => {
      //   //return dispatch(deliverySlotSession());
      // })
      .catch(err => {
        // dispatch(toggleLoginMode(true));
        // dispatch(setUserName('Guest User'));
      });
  };
}

export function redirect(url = '/') {
  return dispatch => dispatch(push(url));
}

export function setCurrentUserShoppingUrl(currentUrl = '/') {
  return { type: SET_CURRENT_USER_SHOPPING_URL, data: { backToShoppingURL: currentUrl } }
}

export function getCurrentUserSuccess(data) {
  return { type: GET_CURRENT_USER_SUCCESS, data }
}
