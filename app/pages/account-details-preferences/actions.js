import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_PREFERENCES_JSON_SUCCESS = 'GET_PREFERENCES_JSON_SUCCESS';
export const GET_PREFERENCES_DATA_FAILURE = 'GET_PREFERENCES_DATA_FAILURE';
export const GET_PREFERENCESINFO_JSON_SUCCESS = 'GET_PREFERENCESINFO_JSON_SUCCESS';
export const GET_PREFERENCESINFO_DATA_FAILURE = 'GET_PREFERENCESINFO_DATA_FAILURE';
export const POST_PREFERENCES_QUERY_SUCCESS = 'POST_PREFERENCES_QUERY_SUCCESS';
export const POST_PREFERENCES_QUERY_FAILURE = 'POST_PREFERENCES_QUERY_FAILURE';


export const preferencesJSONSuccessAction = (data) => {
  return {
    type: GET_PREFERENCES_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const preferencesJSONFailureAction = () => {
  return {
    type: GET_PREFERENCES_DATA_FAILURE
  };
};

/* PREFERENCES info actions starts*/
export const preferencesInfoJSONSuccessAction = (data) => {
  return {
    type: GET_PREFERENCESINFO_JSON_SUCCESS,
    data
  };
};

export const preferencesInfoJSONFailureAction = (data) => {
  return {
    type: GET_PREFERENCESINFO_DATA_FAILURE,
    data
  };
};
/* PREFERENCES info actions ends*/

export const preferencesQuerySuccessAction = (data) => {
  return {
    type: POST_PREFERENCES_QUERY_SUCCESS,
    data
  };
};

export const preferencesQueryFailureAction = (data) => {
  return {
    type: POST_PREFERENCES_QUERY_FAILURE,
    data
  };
};


export const getpreferencesPageData = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.userconsent }).then((value) => {
      return Promise.all([
        dispatch(preferencesJSONSuccessAction({ data: value.body }))
      ]);
    });
  };
};

// export const getpreferencesInfoPageData = (reqHeaders) => {
//   return (dispatch) => {
//     return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.PREFERENCESInfo }).then((value) => {
//       return Promise.all([
//         dispatch(preferencesInfoJSONSuccessAction({ data: value.body }))
//       ]);
//     });
//   };
// };

export const postpreferencesData = (data) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.postuserConsent, data: data }).then((value) => {
      return Promise.all([
        dispatch(preferencesQuerySuccessAction({ data: value.body }))
      ]);
    });
  };
};

