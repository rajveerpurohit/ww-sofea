import { polyfill } from 'es6-promise';
import { push } from 'react-router-redux';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import { toggleLoginMode, setUserName, setCurrentUserShoppingUrl, getCurrentUserSuccess } from '../../components/compound/signin/actions';

polyfill();

/*
 * CONSTANTS
 */
export const CREATE_CURRENT_USER_SUCCESS = 'CREATE_CURRENT_USER_SUCCESS';
export const CREATE_CURRENT_USER_FAILURE = 'CREATE_CURRENT_USER_FAILURE';

export const GET_USER_CARD_DETAILS_SUCCESS = 'GET_USER_CARD_DETAILS_SUCCESS';
export const GET_USER_CARD_DETAILS_FAILURE = 'GET_USER_CARD_DETAILS_FAILURE';

export const CONFIRM_USER_USER_SUCCESS = 'CONFIRM_USER_USER_SUCCESS';
export const CONFIRM_USER_USER_FAILURE = 'CONFIRM_USER_USER_FAILURE';

export const GET_USER_CARD_DETAILS_REQUEST = 'GET_USER_CARD_DETAILS_REQUEST';
export const CONFIRM_FINANCE_USER_USER_SUCCESS = 'CONFIRM_FINANCE_USER_USER_SUCCESS';

/* actions starts*/
export const createUserSuccessAction = (data) => {
  return {
    type: CREATE_CURRENT_USER_SUCCESS,
    data
  };
};

export const createUserFailureAction = (data) => {
  return {
    type: CREATE_CURRENT_USER_FAILURE,
    data
  };
};
export const createUser = (data, setError) => {
  return (dispatch, getState) => {
    return ServiceUtil.triggerServerRequest({
      method: 'POST',
      url: serverUrls.createUser,
      data
    }).then((value) => {
      dispatch(createUserSuccessAction({
        data: value.body
      }));
      if (!value.body.formexceptions) {
        if (value.body.firstName) {
          dispatch(getCurrentUserSuccess(value.body));
          const suburbData = value.body.suburb;
          const region = value.body.region;

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
          const userName = `${value.body.firstName} ${value.body.lastName}`;
          dispatch(toggleLoginMode(true));
          dispatch(setUserName(userName));
          dispatch(setCurrentUserShoppingUrl());
        }
        dispatch(push('/dashboard'));
      }
    }, (error) => {
      dispatch(createUserFailureAction({ data: error.body }));
      setError();
    });
  };
};

export const getUserCardDetailsSuccessAction = (data) => {
  return {
    type: GET_USER_CARD_DETAILS_SUCCESS,
    data
  };
};

export const getUserCardDetailsFailureAction = (data) => {
  return {
    type: GET_USER_CARD_DETAILS_FAILURE,
    data
  };
};
export const getUserCardDetailsRequestAction = (data) => {
  return {
    type: GET_USER_CARD_DETAILS_REQUEST,
    data
  };
};
export const getUserCardDetails = (data) => {
  return (dispatch, getState) => {
    dispatch(getUserCardDetailsRequestAction({
      data
    }));
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.fetchcustomer,
      params: { idenificationNumber: data }
    }).then((value) => {
      dispatch(getUserCardDetailsSuccessAction({
        data: value.body
      }));
    });
  };
};

export const confirmUserLoginSuccessAction = (data) => {
  return {
    type: CONFIRM_USER_USER_SUCCESS,
    data
  };
};
export const confirmUserwfsLoginSuccessAction = (data) => {
  return {
    type: CONFIRM_FINANCE_USER_USER_SUCCESS,
    data
  };
};
export const confirmUserLoginFailureAction = (data) => {
  return {
    type: CONFIRM_USER_USER_FAILURE,
    data
  };
};
export const confirmUserLogin = (data, url, pagetype) => {
  return (dispatch, getState) => {
    return ServiceUtil.triggerServerRequest({
      method: 'POST',
      url: serverUrls[url], // resendotp ? serverUrls.confirmcustomerlogin : serverUrls.resendotp,//
      data
    }).then((value) => {
      if (!url === 'resendotp') {
        dispatch(confirmUserLoginSuccessAction({
          data: value.body
        }));
      }
      if (url === 'confirmcustomerlogin' && (pagetype === 'wfs' || pagetype === 'cart' || pagetype === 'reward')) {
        dispatch(confirmUserwfsLoginSuccessAction({
          data: value.body
        }));
      } else if (url === 'confirmcustomerlogin' && (value.body && value.body.customerId)) {
        dispatch(confirmUserLoginSuccessAction({
          data: value.body
        }));
        dispatch(push('/registration'));
      } else if (url === 'forgotpassword' && (value.body && value.body.message === 'Email Sent Successfully')) {
        dispatch(push('/reset-password-thanks'));
      }
    });
  };
};

