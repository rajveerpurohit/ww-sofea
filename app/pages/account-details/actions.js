import { polyfill } from 'es6-promise';
import { push } from 'react-router-redux';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import { getminiCartData } from '../../components/sections/Header/actions';
import { logOut, logoutSuccess } from '../../components/compound/signin/actions';

polyfill();

/*
 * CONSTANTS
 */
export const GET_USERDETAILS_JSON_SUCCESS = 'GET_USERDETAILS_JSON_SUCCESS';
export const GET_USERDETAILS_DATA_FAILURE = 'GET_USERDETAILS_DATA_FAILURE';

export const GET_DELETEUSER_JSON_SUCCESS = 'GET_DELETEUSER_JSON_SUCCESS';
export const GET_DELETEUSER_DATA_FAILURE = 'GET_DELETEUSER_DATA_FAILURE';

export const GET_UPDATEDETAILS_JSON_SUCCESS = 'GET_UPDATEDETAILS_JSON_SUCCESS';
export const GET_UPDATEDETAILS_JSON_FAILURE = 'GET_UPDATEDETAILS_JSON_FAILURE';

export const GET_CHANGEPASSWORD_JSON_SUCCESS = 'GET_CHANGEPASSWORD_JSON_SUCCESS';
export const GET_CHANGEPASSWORD_JSON_FAILURE = 'GET_CHANGEPASSWORD_JSON_FAILURE';

export const GET_UPDATEEMAILADDRESSES_DATA_SUCCESS = 'GET_UPDATEEMAILADDRESSES_DATA_SUCCESS';
export const GET_UPDATEEMAIL_DATA_FAILURE = 'GET_UPDATEEMAIL_DATA_FAILURE';

export const GET_UPDATEEMAILADDRESSES_JSON_SUCCESS = 'GET_UPDATEEMAILADDRESSES_JSON_SUCCESS';
export const GET_UPDATEEMAILADDRESSES_DATA_FAILURE = 'GET_UPDATEEMAILADDRESSES_DATA_FAILURE';

export const GET_UPDATECONTACTNUMBERS_JSON_SUCCESS = 'GET_UPDATECONTACTNUMBERS_JSON_SUCCESS';
export const GET_UPDATECONTACTNUMBERS_JSON_FAILURE = 'GET_UPDATECONTACTNUMBERS_JSON_FAILURE';


/* Contact info actions starts*/
export const accountDetailsJSONSuccessAction = (data) => {
  return {
    type: GET_USERDETAILS_JSON_SUCCESS,
    data
  };
};

export const accountDetailsJSONFailureAction = (data) => {
  return {
    type: GET_USERDETAILS_DATA_FAILURE,
    data
  };
};

export const getaccountDetailsPageData = () => {
  return (dispatch, getState) => {
    const currentUser = getState().clp.currentUser;
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.getAccountDetails,
      params: {
        profileId: currentUser && currentUser.id
      }
    }).then((value) => {
      dispatch(accountDetailsJSONSuccessAction({
        data: value.body
      }));
    });
  };
};

export const deleteUserJSONSuccessAction = (data) => {
  return {
    type: GET_DELETEUSER_JSON_SUCCESS,
    data
  };
};

export const deleteUserJSONFailureAction = (data) => {
  return {
    type: GET_DELETEUSER_DATA_FAILURE,
    data
  };
};

export const deleteUser = (data) => {
  return (dispatch, getState) => {
    return ServiceUtil.triggerServerRequest({
      method: 'DELETE',
      url: serverUrls.deleteUser,
    }).then((value) => {
      localStorage.setItem('emailValue', '');
      dispatch(logOut());
      dispatch(logoutSuccess());
    });
  };
};

export const updateDetailsSuccessAction = (data) => {
  return {
    type: GET_UPDATEDETAILS_JSON_SUCCESS,
    data
  };
};

export const updateDetailsFailureAction = (data) => {
  return {
    type: GET_UPDATEDETAILS_JSON_FAILURE,
    data
  };
};

export const updateUserDetails = (data, setError) => {
  return (dispatch, getState) => {
    return ServiceUtil.triggerServerRequest({
      method: 'PATCH',
      url: serverUrls.updateUserDetails,
      data
    }).then((value) => {
      if (value.body.formexceptions) {
        dispatch(updateDetailsFailureAction({ data: value.body }));
        setError();
      } else {
        dispatch(updateDetailsSuccessAction({
          data
        }));
      }
    });
  };
};

export const changePasswordJSONSuccessAction = (data) => {
  return {
    type: GET_CHANGEPASSWORD_JSON_SUCCESS,
    data
  };
};

export const changePasswordJSONFailureAction = (data) => {
  return {
    type: GET_CHANGEPASSWORD_JSON_FAILURE,
    data
  };
};

export const changePassword = (data, setError) => {
  return (dispatch, getState) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.changePassword,
      method: 'PATCH',
      data
    }).then((value) => {
      if (value.body.formexceptions) {
        dispatch(changePasswordJSONFailureAction({ data: value.body }));
        setError();
      } else {
        dispatch(changePasswordJSONSuccessAction({ data: data.passwordHint }));
      }
    });
  };
};
export const updateUserEmailJSONSuccessAction = (data) => {
  return {
    type: GET_UPDATEEMAILADDRESSES_DATA_SUCCESS,
    data
  };
};

export const updateUserEmailJSONFailureAction = (data) => {
  return {
    type: GET_UPDATEEMAIL_DATA_FAILURE,
    data
  };
};

export const updateUserEmail = (data, setError) => {
  return (dispatch, getState) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.updateUserEmailAddresses,
      method: 'PATCH',
      data
    }).then((value) => {
      if (value.body.formexceptions) {
        dispatch(updateUserEmailJSONSuccessAction({ data: value.body }));
        setError();
      } else {
        dispatch(updateUserEmailJSONSuccessAction({ data }));
      }
    });
  };
};

export const updateUserEmailAddressesJSONSuccessAction = (data) => {
  return {
    type: GET_UPDATEEMAILADDRESSES_JSON_SUCCESS,
    data
  };
};

export const updateUserEmailAddressesJSONFailureAction = (data) => {
  return {
    type: GET_UPDATEEMAILADDRESSES_DATA_FAILURE,
    data
  };
};

export const updateUserEmailAddresses = (data, setError) => {
  return (dispatch, getState) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.updateUserEmailAddresses,
      method: 'PATCH',
      data
    }).then((value) => {
      if (value.body.formexceptions) {
        dispatch(updateUserEmailJSONSuccessAction({ data: value.body }));
        setError();
      } else {
        dispatch(updateUserEmailJSONSuccessAction({ data }));
      }
    });
  };
};

export const updateContactNumbersJSONSuccessAction = (data) => {
  return {
    type: GET_UPDATECONTACTNUMBERS_JSON_SUCCESS,
    data
  };
};

export const updateContactNumbersJSONFailureAction = (data) => {
  return {
    type: GET_UPDATECONTACTNUMBERS_JSON_FAILURE,
    data
  };
};

export const updateContactNumbers = (formData, synchronizeStatus, setError) => {
  const { contactNumber, alternateContactNumber, primaryCountryDiallingCode, primaryDiallingCode, primaryNumbers,
            secondaryCountryDiallingCode, secondaryDiallingCode, secondaryNumbers,
            homeCountryDiallingCode, homeDiallingCode, homeNumbers,
            workCountryDiallingCode, workDiallingCode, workNumbers } = formData;
  const formtedData = {
    primaryContactNo: contactNumber,
    secondaryContactNo: alternateContactNumber,
    homeLandlineNo: '',
    workLandlineNo: ''
  };
  const data = synchronizeStatus ? {
    primaryCountryDiallingCode,
    primaryDiallingCode,
    primaryNumbers,
    secondaryCountryDiallingCode,
    secondaryDiallingCode,
    secondaryNumbers,
    homeCountryDiallingCode,
    homeDiallingCode,
    homeNumbers,
    workCountryDiallingCode,
    workDiallingCode,
    workNumbers
  } : formtedData;
  return (dispatch, getState) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.updateContactNumbers,
      method: 'PATCH',
      data
    }).then((value) => {
      if (value.body.formexceptions) {
        dispatch(updateContactNumbersJSONSuccessAction({ data: value.body }));
        setError();
      } else {
        dispatch(updateContactNumbersJSONSuccessAction({ data: value.body }));
      }
    });
  };
};
