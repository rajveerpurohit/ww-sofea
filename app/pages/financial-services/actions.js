import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_FINANCIALSERVICES_JSON_SUCCESS = 'GET_FINANCIALSERVICES_JSON_SUCCESS';
export const GET_FINANCIALSERVICES_FAILURE = 'GET_FINANCIALSERVICES_FAILURE';
export const GET_STORECARDSUMMARY_JSON_SUCCESS = 'GET_STORECARDSUMMARY_JSON_SUCCESS';
export const GET_TRANSACTIONHISTORY_JSON_SUCCESS = 'GET_TRANSACTIONHISTORY_JSON_SUCCESS';
export const GET_TRANSACTIONHISTORY_FAILURE = 'GET_TRANSACTIONHISTORY_FAILURE';
export const GET_SWITCHSTATEMENTDETAILS_JSON_SUCCESS = 'GET_SWITCHSTATEMENTDETAILS_JSON_SUCCESS';
export const GET_SWITCHSTATEMENTDETAILS_FAILURE = 'GET_SWITCHSTATEMENTDETAILS_FAILURE';
export const GET_UPDATESTATEMENT_JSON_SUCCESS = 'GET_UPDATESTATEMENT_JSON_SUCCESS';
export const GET_UPDATESTATEMENT_FAILURE = 'GET_UPDATESTATEMENT_FAILURE';
export const GET_CARDDETAILS_JSON_SUCCESS = 'GET_CARDDETAILS_JSON_SUCCESS';
export const GET_CARDDETAILS_FAILURE = 'GET_CARDDETAILS_FAILURE';

export const financialServicesSuccessAction = (data) => {
  return {
    type: GET_FINANCIALSERVICES_JSON_SUCCESS,
    data
  };
};

export const financialServicesFailureAction = () => {
  return {
    type: GET_FINANCIALSERVICES_FAILURE
  };
};

export const storeCardSummarySuccessAction = (data) => {
  return {
    type: GET_STORECARDSUMMARY_JSON_SUCCESS,
    data
  };
};

export const transactionHistorySuccessAction = (data) => {
  return {
    type: GET_TRANSACTIONHISTORY_JSON_SUCCESS,
    data
  };
};
export const transactionHistoryFailureAction = () => {
  return {
    type: GET_TRANSACTIONHISTORY_FAILURE
  };
};
export const switchStatementDetailsSuccessAction = (data) => {
  return {
    type: GET_SWITCHSTATEMENTDETAILS_JSON_SUCCESS,
    data
  };
};
export const switchStatementDetailsFailureAction = () => {
  return {
    type: GET_SWITCHSTATEMENTDETAILS_FAILURE
  };
};
export const updateStatementPreferencesSuccessAction = (data) => {
  return {
    type: GET_UPDATESTATEMENT_JSON_SUCCESS,
    data
  };
};
export const updateStatementPreferencesFailureAction = () => {
  return {
    type: GET_UPDATESTATEMENT_FAILURE
  };
};
export const cardDetailsSuccessAction = (data) => {
  return {
    type: GET_CARDDETAILS_JSON_SUCCESS,
    data
  };
};
export const cardDetailsFailureAction = () => {
  return {
    type: GET_CARDDETAILS_FAILURE
  };
};
export const getLandingPageData = (params, reqUrl) => {
  let contentId = '';
  if (reqUrl) {
    const url = reqUrl.indexOf('contentId=') > -1 ? reqUrl.split('=')[1] : reqUrl.split('/');
    if (!(reqUrl.indexOf('contentId=') > -1) && url.length > 2) {
      contentId = url[url.length - 1];
    } else {
      contentId = reqUrl.split('=')[1];
    }
  } else if (params) {
    contentId = params;
  }
  // if (contentId) {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.financialServicesLandingPage, params: { contentId } }).then((value) => {
      dispatch(financialServicesSuccessAction({ data: value.body }));
    });
  };
  // } else {
  //   return (dispatch) => {
  //     return ServiceUtil.triggerServerRequest({ url: serverUrls.financialServicesLandingPage }).then((value) => {
  //       dispatch(financialServicesSuccessAction({ data: value.body }));
  //     }
  //   );
  //   };
  // }
};

export const getStoreCardSummary = (reqUrl, reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.storeCardSummary }).then((response) => {
      dispatch(storeCardSummarySuccessAction({ data: response.body }));
    });
  };
};
export const getTransactionHistory = (formData) => {
  const data = {
    accountNumber: formData.accountNumber,
    startDate: formData.startDate,
    endDate: formData.endDate
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.transactionHistory, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          dispatch(transactionHistorySuccessAction({ data: response.body }));
        }
      }, (error) => {
        dispatch(transactionHistoryFailureAction(error.body));
      });
  };
};

export const getSwitchStatementDetails = () => {
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.switchStatementDetails })
      .then((response) => {
        if (response.body) {
          dispatch(switchStatementDetailsSuccessAction({ data: response.body }));
        }
      }, (error) => {
        dispatch(switchStatementDetailsFailureAction(error.body));
      });
  };
};

export const getCardDetails = (formData) => {
  const data = {
    accountNumber: formData.accountNumber,
    creditCard: formData.creditCard,
    corporateNumber: formData.corporateNumber
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.cardDetails, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          dispatch(cardDetailsSuccessAction({ data: response.body }));
        }
      }, (error) => {
        dispatch(cardDetailsFailureAction(error.body));
      });
  };
};
export const updateStatementPreferences = (formData) => {
  const data = {
    emailID: formData.emailID,
    customerID: formData.customerID,
    recieveEstatements: formData.recieveEstatements,
    storeCardStatus: formData.storeCardStatus,
    personalLoanStatus: formData.personalLoanStatus
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.updatestatementpreferences, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          dispatch(updateStatementPreferencesSuccessAction({ data: response.body }));
        }
      }, (error) => {
        dispatch(updateStatementPreferencesFailureAction(error.body));
      });
  };
};
