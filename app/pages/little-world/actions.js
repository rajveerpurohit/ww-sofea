import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import { push } from 'react-router-redux';

polyfill();

/*
 * CONSTANTS
 */
export const GET_CHILDDETAILS_JSON_SUCCESS = 'GET_CHILDDETAILS_JSON_SUCCESS';
export const GET_CHILDDETAILS_DATA_FAILURE = 'GET_CHILDDETAILS_DATA_FAILURE';

export const UPDATE_CHILDDETAILS_JSON_SUCCESS = 'UPDATE_CHILDDETAILS_JSON_SUCCESS';
export const UPDATE_CHILDDETAILS_DATA_FAILURE = 'UPDATE_CHILDDETAILS_DATA_FAILURE';

export const DELETE_CHILDDETAILS_JSON_SUCCESS = 'DELETE_CHILDDETAILS_JSON_SUCCESS';
export const DELETE_CHILDDETAILS_DATA_FAILURE = 'DELETE_CHILDDETAILS_DATA_FAILURE';

export const ADD_CHILDDETAILS_JSON_SUCCESS = 'ADD_CHILDDETAILS_JSON_SUCCESS';
export const ADD_CHILDDETAILS_DATA_FAILURE = 'ADD_CHILDDETAILS_DATA_FAILURE';

/* Contact info actions starts*/
export const getchildDetailsJSONSuccessAction = (data) => {
  return {
    type: GET_CHILDDETAILS_JSON_SUCCESS,
    data
  };
};

export const getchildDetailsJSONFailureAction = (data) => {
  return {
    type: GET_CHILDDETAILS_DATA_FAILURE,
    data
  };
};

export const getchildDetailsPageData = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.getchildDetails,
    }).then((value) => {
      dispatch(getchildDetailsJSONSuccessAction({
        data: value.body
      }));
    });
  };
};

export const updatechildDetailsJSONSuccessAction = (data) => {
  return {
    type: UPDATE_CHILDDETAILS_JSON_SUCCESS,
    data
  };
};

export const updatechildDetailsJSONFailureAction = (data) => {
  return {
    type: UPDATE_CHILDDETAILS_DATA_FAILURE,
    data
  };
};

export const updatechildDetailsPageData = (data) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.updatechildDetails,
      method: 'PATCH',
      data
    }).then((value) => {
      dispatch(updatechildDetailsJSONSuccessAction({
        data: value.body
      }));
    });
  };
};

export const deletechildDetailsJSONSuccessAction = (data) => {
  return {
    type: DELETE_CHILDDETAILS_JSON_SUCCESS,
    data
  };
};

export const deletechildDetailsJSONFailureAction = (data) => {
  return {
    type: DELETE_CHILDDETAILS_DATA_FAILURE,
    data
  };
};

export const deletechildDetailsPageData = (formData) => {
  const data = {
    childFirstName: formData.childFirstName,
    childLastName: formData.childLastName,
    childDateOfBirth: formData.childDateOfBirth,
    childGender: formData.childGender,
    parentGuardian: 'Yes',
    childId: formData.childId && formData.childId.toString(),
    removeChild: 'Yes',
  };
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.deletechildDetails,
      method: 'DELETE',
      params: JSON.parse(JSON.stringify(data)),
    }).then((value) => {
      dispatch(deletechildDetailsJSONSuccessAction({
        data: value.body
      }));
    });
  };
};


export const addchildDetailsJSONSuccessAction = (data) => {
  return {
    type: ADD_CHILDDETAILS_JSON_SUCCESS,
    data
  };
};

export const addchildDetailsJSONFailureAction = (data) => {
  return {
    type: ADD_CHILDDETAILS_DATA_FAILURE,
    data
  };
};

export const addchildDetailsPageData = (data, setError) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.addchildDetails,
      method: 'POST',
      data: JSON.parse(JSON.stringify(data))
    }).then((value) => {
      if (value.body.formexceptions) {
        dispatch(addchildDetailsJSONSuccessAction({ data: value.body }));
        setError();
      } else {
        dispatch(addchildDetailsJSONSuccessAction({
          data: value.body
        }));
        dispatch(push('/dashboard/littleworld/details'));
      }
    });
  };
};
