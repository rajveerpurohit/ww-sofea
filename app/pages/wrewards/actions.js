import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_WREWARDS_LEFTNAV_JSON_SUCCESS = 'GET_WREWARDS_LEFTNAV_JSON_SUCCESS';
export const GET_WREWARDS_LEFTNAV_JSON_FALIURE = 'GET_WREWARDS_LEFTNAV_JSON_FALIURE';
export const GET_WREWARDS_JSON_SUCCESS = 'GET_WREWARDS_JSON_SUCCESS';
export const GET_WREWARDS_JSON_FAILURE = 'GET_WREWARDS_JSON_FAILURE';
export const GET_WREWARDS_TIER_STATUS_JSON_SUCCESS = 'GET_WREWARDS_TIER_STATUS_JSON_SUCCESS';
export const GET_WREWARDS_TIER_STATUS_JSON_FAILURE = 'GET_WREWARDS_TIER_STATUS_JSON_FAILURE';
export const GET_WREWARDS_MAINTAIN_CARDS_JSON_SUCCESS = 'GET_WREWARDS_MAINTAIN_CARDS_JSON_SUCCESS';
export const GET_WREWARDS_MAINTAIN_CARDS_JSON_FAILURE = 'GET_WREWARDS_MAINTAIN_CARDS_JSON_FAILURE';
export const GET_DASHBOARD_TIER_STATUS_JSON_SUCCESS = 'GET_DASHBOARD_TIER_STATUS_JSON_SUCCESS';
export const GET_DASHBOARD_TIER_STATUS_JSON_FAILURE = 'GET_DASHBOARD_TIER_STATUS_JSON_FAILURE';
export const SET_WREWARDS_SAVING_DETAILS = 'SET_WREWARDS_SAVING_DETAILS';
export const UNSET_WREWARDS_SAVING_DETAILS = 'UNSET_WREWARDS_SAVING_DETAILS';
export const UNSET_VOUCHERS = 'UNSET_VOUCHERS';
export const SET_VOUCHERS = 'SET_VOUCHERS';
export const VALIDATEAPPLIEDREWARDS_JSON_SUCCESS = 'VALIDATEAPPLIEDREWARDS_JSON_SUCCESS';
export const VALIDATEAPPLIEDREWARDS_JSON_FAILURE = 'VALIDATEAPPLIEDREWARDS_JSON_FAILURE';
export const REGISTERFORWREWARDS_JSON_SUCCESS = 'REGISTERFORWREWARDS_JSON_SUCCESS';
export const REGISTERFORWREWARDS_JSON_FAILURE = 'REGISTERFORWREWARDS_JSON_FAILURE';
export const GET_SCHOOL_CONTRIBUTION_JSON_SUCCESS = 'GET_SCHOOL_CONTRIBUTION_JSON_SUCCESS';
export const GET_SCHOOL_CONTRIBUTION_JSON_FAILURE = 'GET_SCHOOL_CONTRIBUTION_JSON_FAILURE';

export const schoolContributionSuccessAction = (data) => {
  return {
    type: GET_SCHOOL_CONTRIBUTION_JSON_SUCCESS,
    data
  };
};

export const schoolContributionFailureAction = () => {
  return {
    type: GET_SCHOOL_CONTRIBUTION_JSON_FAILURE
  };
};

export const wrewardsLeftNavSuccessAction = (data) => {
  return {
    type: GET_WREWARDS_LEFTNAV_JSON_SUCCESS,
    data
  };
};

export const wrewardsLeftNavFailureAction = () => {
  return {
    type: GET_WREWARDS_LEFTNAV_JSON_FALIURE
  };
};

export const wrewardsSuccessAction = (data) => {
  return {
    type: GET_WREWARDS_JSON_SUCCESS,
    data
  };
};

export const wrewardsFailureAction = () => {
  return {
    type: GET_WREWARDS_JSON_FAILURE
  };
};

export const tierStatusSuccessAction = (data) => {
  return {
    type: GET_WREWARDS_TIER_STATUS_JSON_SUCCESS,
    data
  };
};

export const tierStatusFailureAction = () => {
  return {
    type: GET_WREWARDS_TIER_STATUS_JSON_FAILURE
  };
};
export const validateAppliedRewardsJSONSuccessAction = (data) => {
  return {
    type: VALIDATEAPPLIEDREWARDS_JSON_SUCCESS,
    data
  };
};

export const validateAppliedRewardsJSONFailureAction = () => {
  return {
    type: VALIDATEAPPLIEDREWARDS_JSON_FAILURE
  };
};
export const registerForWrewardsJSONSuccessAction = (data) => {
  return {
    type: REGISTERFORWREWARDS_JSON_SUCCESS,
    data
  };
};

export const registerForWrewardsJSONFailureAction = () => {
  return {
    type: REGISTERFORWREWARDS_JSON_FAILURE
  };
};

export const dashboardTierStatusSuccessAction = (data) => {
  return {
    type: GET_DASHBOARD_TIER_STATUS_JSON_SUCCESS,
    data
  };
};

export const dashboardTierStatusFailureAction = () => {
  return {
    type: GET_DASHBOARD_TIER_STATUS_JSON_FAILURE
  };
};

export const maintainCardsSuccessAction = (data) => {
  return {
    type: GET_WREWARDS_MAINTAIN_CARDS_JSON_SUCCESS,
    data
  };
};

export const maintainCardsFailureAction = () => {
  return {
    type: GET_WREWARDS_MAINTAIN_CARDS_JSON_FAILURE
  };
};

export const getWrewardsLeftNav = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.wrewardsLeftNav }).then((value) => {
      dispatch(wrewardsLeftNavSuccessAction({ data: value.body }));
    },
      (error) => { console.log(error); }
    );
  };
};

export const schoolContributions = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.schoolContribution })
    .then((value) => {
      dispatch(schoolContributionSuccessAction({ data: value.body }));
    });
  };
};

export const getWrewardsTierStatus = (identificationNumber) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.wrewardsTierStatus, params: { identificationNumber } }).then((value) => {
      dispatch(tierStatusSuccessAction({ data: value.body }));
    },
      (error) => { console.log(error); }
    );
  };
};

export const getDashbordTierStatus = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.wrewardsTierStatus }).then((value) => {
      dispatch(dashboardTierStatusSuccessAction({ data: value.body }));
    },
      (error) => { console.log(error); }
    );
  };
};

export const getMaintainCards = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.maintainCards }).then((value) => {
      dispatch(maintainCardsSuccessAction({ data: value.body }));
    },
      (error) => { console.log(error); }
    );
  };
};

const setSavingDetails = (data) => {
  if (!data) return { type: UNSET_WREWARDS_SAVING_DETAILS };
  return { type: SET_WREWARDS_SAVING_DETAILS, data };
};

export const getSavingDetails = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.wrewardsSavingDetails })
    .then(res => dispatch(setSavingDetails(res.body)))
    .catch((e) => { console.log(e); });
  };
};

const setVouchers = (data) => {
  if (!data) return { type: UNSET_VOUCHERS };
  return { type: SET_VOUCHERS, data };
};

export const getVouchers = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.myVouchers })
    .then((res) => {
      if (res && res.body && res.body.vouchers) dispatch(setVouchers(res.body.vouchers));
    });
  };
};

export const getWrewards = (params, reqUrl) => {
  let contentId = '';
  if (reqUrl) {
    const url = reqUrl.split('/');
    if (url.length > 2) {
      contentId = url[url.length - 1];
    }
  } else if (params) {
    contentId = params;
  }

  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.wrewards, params: { contentId: contentId || null } }).then((value) => {
      dispatch(wrewardsSuccessAction({ data: value.body }));
    },
        (error) => { console.log(error); }
    );
  };
};
export const validateAppliedRewards = (formData, fillFormData) => {
  const data = {
    identificationNumber: formData.fldIDNumber,
    emailId: formData.fldEmail,
    dateOfBirth: formData.fldDOB
  };
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.wrewardsValidateAppliedRewards, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          dispatch(validateAppliedRewardsJSONSuccessAction({ data: response.body }));
          fillFormData();
        }
      }, (error) => {
        dispatch(validateAppliedRewardsJSONFailureAction(error.body));
      });
  };
};
export const registerForWrewards = (data) => {
  return (dispatch) => {
    ServiceUtil.triggerServerRequest({ url: serverUrls.wrewardsRegisterForWrewards, method: 'POST', data })
      .then((response) => {
        if (response.body) {
          dispatch(registerForWrewardsJSONSuccessAction({ data: response.body }));
        }
      }, (error) => {
        dispatch(registerForWrewardsJSONFailureAction(error.body));
      });
  };
};

