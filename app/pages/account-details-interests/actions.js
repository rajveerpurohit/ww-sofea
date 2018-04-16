import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
*/
export const GET_INTERESTS_JSON_SUCCESS = 'GET_INTERESTS_JSON_SUCCESS';
export const GET_INTERESTS_DATA_FAILURE = 'GET_INTERESTS_DATA_FAILURE';
export const POST_INTERESTS_QUERY_SUCCESS = 'POST_INTERESTS_QUERY_SUCCESS';
export const POST_INTERESTS_QUERY_FAILURE = 'POST_INTERESTS_QUERY_FAILURE';


export const interestJSONSuccessAction = data => ({
  type: GET_INTERESTS_JSON_SUCCESS,
  data
});

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const interestJSONFailureAction = () => ({ type: GET_INTERESTS_DATA_FAILURE });

export const interestQuerySuccessAction = data => ({
  type: POST_INTERESTS_QUERY_SUCCESS,
  data
});

export const interestQueryFailureAction = data => ({
  type: POST_INTERESTS_QUERY_FAILURE,
  data
});


export const getInterestPageData = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      url: serverUrls.userinterests
    }).then(
      value => dispatch(interestJSONSuccessAction({ data: value.body }))
    );
  };
};

export const postInterestsData = (data) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      method: 'POST',
      url: serverUrls.postuserinterests,
      data
    })
    .then(
      value => dispatch(interestQuerySuccessAction({ data: value.body })),
      error => dispatch(interestQueryFailureAction(error))
    );
  };
};
