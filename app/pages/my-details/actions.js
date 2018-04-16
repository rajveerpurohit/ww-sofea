import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_ADDPAYMENTETAILS_JSON_SUCCESS = 'GET_ADDPAYMENTETAILS_JSON_SUCCESS';
export const GET_ADDPAYMENTDETAILS_DATA_FAILURE = 'GET_ADDPAYMENTDETAILS_DATA_FAILURE';
export const GET_GETPAYMENTETAILS_JSON_SUCCESS = 'GET_GETPAYMENTETAILS_JSON_SUCCESS';
export const GET_GETPAYMENTDETAILS_DATA_FAILURE = 'GET_GETPAYMENTDETAILS_DATA_FAILURE';

export const addpaymentDetailsJSONSuccessAction = (data) => {
  return {
    type: GET_ADDPAYMENTETAILS_JSON_SUCCESS,
    data
  };
};

export const addpaymentDetailsJSONFailureAction = (data) => {
  return {
    type: GET_ADDPAYMENTDETAILS_DATA_FAILURE,
    data
  };
};

export const getpaymentDetailsJSONSuccessAction = (data) => {
  return {
    type: GET_GETPAYMENTETAILS_JSON_SUCCESS,
    data
  };
};

export const getpaymentDetailsJSONFailureAction = (data) => {
  return {
    type: GET_GETPAYMENTDETAILS_DATA_FAILURE,
    data
  };
};
export const getPaymentDetailsData = () => {
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.getcreditcarddetails })
      .then((response) => {
        if (response.body) {
          dispatch(getpaymentDetailsJSONSuccessAction({ data: response.body }));
        }
      }, (error) => {
        dispatch(getpaymentDetailsJSONFailureAction(error.body));
      });
  };
};
export const postPaymentDetailsData = (formData, fetchDetails) => {
  const data = {
    creditCardNumber: formData.fldCardNumber,
    creditCardType: formData.fldCardType,
    expirationYear: formData.fldCardExpiryYear,
    expirationMonth: formData.fldCardExpiryMonth,
    useExistingAddress: 'false',
    nickname: formData.fldCardNickName,
    cardHolderName: formData.fldCardHolderName
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.addcreditcarddetails, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          dispatch(addpaymentDetailsJSONSuccessAction({ data: response.body }));
          fetchDetails();
        }
      }, (error) => {
        dispatch(addpaymentDetailsJSONFailureAction(error.body));
      });
  };
};

export const deletePaymentDetailsData = (itemId) => {
  const params = {
    cardId: itemId
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ method: 'DELETE', url: serverUrls.deletecreditcarddetails, params })
      .then((response) => {
        if (response.body) {
          // getPaymentDetailsData();
        }
      }, (error) => {
        // dispatch(addpaymentDetailsJSONFailureAction(error.body));
      });
  };
};
