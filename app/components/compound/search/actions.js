import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import { serverUrls } from '../../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_SEARCH_JSON_SUCCESS = 'GET_SEARCH_JSON_SUCCESS';
export const GET_SEARCH_DATA_FAILURE = 'GET_SEARCH_DATA_FAILURE';
export const CLEAR_SEARCH_JSON = 'CLEAR_SEARCH_JSON';
export const RESET_SUGGETION_INDEX = 'RESET_SUGGETION_INDEX';
export const searchJSONSuccessAction = (data) => {
  return {
    type: GET_SEARCH_JSON_SUCCESS,
    data
  };
};
export const clearSearchData = () => {
  return {
    type: CLEAR_SEARCH_JSON
  };
};

export const incrementSuggetionIndex = () => ({ type: 'INCREAMENT_SUGGETION_INDEX' });
export const decreamentSuggetionIndex = () => ({ type: 'DECREAMENT_SUGGETION_INDEX' });
export const resetSuggetionIndex = (keyIndex) => ({ type: 'RESET_SUGGETION_INDEX', keyIndex });

/*
 * searchJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const searchJSONFailureAction = () => {
  return {
    type: GET_SEARCH_DATA_FAILURE
  };
};

export const getSearchPageData = (params, reqUrl, reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      headers: reqHeaders,
      url: serverUrls.search,
      params: { searchQuery: params }
    }).then(
      value => dispatch(searchJSONSuccessAction({ data: value.body })),
      error => dispatch(searchJSONFailureAction(error))
    );
  };
};
