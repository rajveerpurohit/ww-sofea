import { polyfill } from 'es6-promise';
import ServiceUtil from '../services/serviceUtil';
import { serverUrls } from '../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_LABELS_JSON_SUCCESS = 'GET_LABELS_JSON_SUCCESS';
export const GET_LABELS_DATA_FAILURE = 'GET_LABELS_DATA_FAILURE';

export const labelsJSONSuccessAction = (data) => {
  return {
    type: GET_LABELS_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const labelsJSONFailureAction = () => {
  return {
    type: GET_LABELS_DATA_FAILURE
  };
};

export const getLabelsData = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.labels }).then((value) => {
      return Promise.all([
        dispatch(labelsJSONSuccessAction({ data: value.body }))
      ]);
    });
  };
};

