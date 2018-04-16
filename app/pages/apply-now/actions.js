import { polyfill } from 'es6-promise';
import { browserHistory } from 'react-router';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';


polyfill();

export const GET_APPLYNOW_JSON_SUCCESS = 'GET_APPLYNOW_JSON_SUCCESS';
export const GET_APPLYNOW_FAILURE = 'GET_APPLYNOW_FAILURE';
export const GET_PERSONALINFO_JSON_SUCCESS = 'GET_PERSONALINFO_JSON_SUCCESS';
export const GET_PERSONALINFO_FAILURE = 'GET_PERSONALINFO_FAILURE';
export const GET_INCOMEEXPENSES_JSON_SUCCESS = 'GET_INCOMEEXPENSES_JSON_SUCCESS';
export const GET_INCOMEEXPENSES_FAILURE = 'GET_INCOMEEXPENSES_FAILURE';
export const GET_SUBURBSEARCH_JSON_SUCCESS = 'GET_SUBURBSEARCH_JSON_SUCCESS';
export const GET_SUBURBSEARCH_JSON_FAILURE = 'GET_SUBURBSEARCH_JSON_FAILURE';
export const GET_SELECTOFFERS_JSON_SUCCESS = 'GET_SELECTOFFERS_JSON_SUCCESS';
export const GET_SELECTOFFERS_JSON_FAILURE = 'GET_SELECTOFFERS_JSON_FAILURE';
export const GET_CLEARWFSSESSION_JSON_SUCCESS = 'GET_CLEARWFSSESSION_JSON_SUCCESS';
export const GET_CLEARWFSSESSION_JSON_FAILURE = 'GET_CLEARWFSSESSION_JSON_FAILURE';

export const applyNowSuccessAction = (data) => {
  return {
    type: GET_APPLYNOW_JSON_SUCCESS,
    data
  };
};

export const applyNowFailureAction = () => {
  return {
    type: GET_APPLYNOW_FAILURE
  };
};
export const personalInfoSuccessAction = (data) => {
  return {
    type: GET_PERSONALINFO_JSON_SUCCESS,
    data
  };
};

export const personalInfoFailureAction = () => {
  return {
    type: GET_PERSONALINFO_FAILURE
  };
};
export const incomeExpensesSuccessAction = (data) => {
  return {
    type: GET_INCOMEEXPENSES_JSON_SUCCESS,
    data
  };
};

export const incomeExpensesFailureAction = () => {
  return {
    type: GET_INCOMEEXPENSES_FAILURE
  };
};
export const suburbSearchSuccessAction = (data) => {
  return {
    type: GET_SUBURBSEARCH_JSON_SUCCESS,
    data
  };
};
export const suburbSearchFailureAction = () => {
  return {
    type: GET_SUBURBSEARCH_JSON_FAILURE
  };
};
export const selectOffersSuccessAction = (data) => {
  return {
    type: GET_SELECTOFFERS_JSON_SUCCESS,
    data
  };
};
export const selectOffersFailureAction = () => {
  return {
    type: GET_SELECTOFFERS_JSON_FAILURE
  };
};
export const clearWfsSessionSuccessAction = (data) => {
  return {
    type: GET_CLEARWFSSESSION_JSON_SUCCESS,
    data
  };
};
export const clearWfsSessionFailureAction = () => {
  return {
    type: GET_CLEARWFSSESSION_JSON_FAILURE
  };
};

// check for post parameters
export const postSelectOffers = (formData) => {
  const data = {
    buttonClicked: formData.buttonClicked
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.selectOffers, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          if (response.body.formexceptions.id === 'faultErrorMessage') {
            browserHistory.push({ pathname: '/wfs/wfs-results', state: 'faultErrorMessage' });
            dispatch(selectOffersSuccessAction({ data: response.body }));
          } else if (response.body.formexceptions.id === 'errorSelectProduct') {
            browserHistory.push({ pathname: '/wfs/wfs-results', state: 'errorSelectProduct' });
            dispatch(selectOffersSuccessAction({ data: response.body }));
          } else {
            browserHistory.push({ pathname: '/wfs/wfs-results', state: formData.buttonClicked });
            dispatch(selectOffersSuccessAction({ data: response.body }));
            return ServiceUtil.triggerServerRequest({ url: serverUrls.clearWfsSession }).then((value) => {
              dispatch(clearWfsSessionSuccessAction({ data: value.body }));
            }, (error) => {
              dispatch(clearWfsSessionFailureAction(error.body));
            });
          }
        }
      }, (error) => {
        dispatch(selectOffersFailureAction(error.body));
      });
  };
};

// check for post parameters
export const postApplyNowData = (formData, updateOnLoaderReceived) => {
  const data = {
    product: formData.wfscardgroup,
    fullName: formData.fullName,
    surname: formData.surName,
    idNumber: formData.idNumber,
    cellPhoneNumber: formData.cellPhoneNumber,
    emailAddress: formData.email,
    debtCounseling: formData.debtCounseling,
    bureauConsent: formData.bureauConsent,
    channel: 'web',
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.postApplyNow, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          if (response.body.responseMessage === 'Oops') {
            browserHistory.push({ pathname: '/wfs/wfs-results', state: 'Oops' });
          } else if (response.body.responseMessage === 'provOfferDecline') {
            browserHistory.push({ pathname: '/wfs/wfs-results', state: 'provOfferDecline' });
          } else if (response.body.responseMessage === 'errorHurdle05') {
            browserHistory.push({ pathname: '/' });
          } else if (response.body.responseMessage === 'whatHappensNext') {
            browserHistory.push({ pathname: '/wfs/wfs-results' });
          } else {
            browserHistory.push({ pathname: '/wfs/wfs-personal-info' });
          }
          dispatch(applyNowSuccessAction({ data: response.body }));
          if (updateOnLoaderReceived) {
            updateOnLoaderReceived();
          }
        }
      }, (error) => {
        dispatch(applyNowFailureAction(error.body));
      });
  };
};
export const getSuburbSearch = (params) => {
  const suburbInput = params;
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.searchSuburb, params: { suburbInput } }).then((response) => {
      if (response.body) {
        dispatch(suburbSearchSuccessAction({ data: response.body }));
      }
    }, (error) => {
      dispatch(suburbSearchFailureAction(error.body));
    });
  };
};

// check for post parameters
export const postPersonalInfoData = (formData) => {
  const data = {
    title: formData.title,
    initial: formData.initial,
    fullName: formData.applyCardData.firstName,
    surname: formData.applyCardData.lastName,
    idNumber: formData.applyCardData.idNumber,
    dateOfBirth: formData.applyCardData.dateOfBirth,
    gender: formData.applyCardData.gender,
    dependent: formData.dependent,
    maritalStatus: formData.maritalStatus,
    suburb: formData.suburb,
    postalCode: formData.postalCode,
    work: formData.work,
    home: formData.home,
    cellPhoneNumber: formData.applyCardData.primaryContact,
    emailAddress: formData.applyCardData.emailAddress,
    woolworthsStaffMebmer: formData.woolworthsStaffMebmer,
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.postPersonalInfo, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          dispatch(personalInfoSuccessAction({ data: response.body }));
        }
      }, (error) => {
        dispatch(personalInfoFailureAction(error.body));
      });
  };
};

// check for post parameters
export const postIncomeExpensesData = (formData) => {
  const data = {
    employmentStatus: formData.employmentStatus,
    industry: formData.industry,
    sourceOfIncome: formData.sourceOfIncome,
    grossMonthly: formData.grossMonthly,
    netMonthly: formData.netMonthly,
    additionalIncome: formData.additionalIncome,
    homeOwnerStatus: formData.homeOwnerStatus,
    monthlyBond: formData.monthlyBond,
    maritalStatus: formData.maritalStatus,
    monthlyRental: formData.monthlyRental,
    maintenance: formData.maintenance,
    totalCreditPayments: formData.totalCreditPayments,
    other: formData.otherExpenses,
    woolworthsPromotionalInformation: formData.woolworthsPromotionalInformation,
    wfsPromotionalInformation: formData.wfsPromotionalInformation,
    termsAndCondtions: formData.termsAndCondtions,
    applicantConfirmedDetails: formData.applicantConfirmedDetails
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.postIncomeExpenses, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          if (response.body.responseMessage === 'preApprovedScreen') {
            browserHistory.push({ pathname: '/wfs/wfs-results', state: 'preApprovedScreen' });
          } else if (response.body.responseMessage === 'Declined Hurdle One') {
            browserHistory.push({ pathname: '/wfs/wfs-results', state: 'Declined Hurdle One' });
          } else if (response.body.responseMessage === 'Application Already Exists Hurdle One') {
            browserHistory.push({ pathname: '/', state: 'Application Already Exists Hurdle One' });
          } else if (response.body.responseMessage === 'Referred Hurdle One') {
            browserHistory.push({ pathname: '/wfs/wfs-results', state: 'Referred Hurdle One' });
          } else {
            browserHistory.push({ pathname: '/wfs/wfs-results' });
          }
          dispatch(applyNowSuccessAction({ data: response.body }));
        }
      }, (error) => {
        dispatch(incomeExpensesFailureAction(error.body));
      });
  };
};
