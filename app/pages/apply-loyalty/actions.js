import { polyfill } from 'es6-promise';
import { browserHistory } from 'react-router';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';


polyfill();

/*
 * CONSTANTS
*/
export const GET_APPLY_LOYALTY_JSON_SUCCESS = 'GET_APPLY_LOYALTY_JSON_SUCCESS';
export const GET_APPLY_LOYALTY_FAILURE = 'GET_APPLY_LOYALTY_FAILURE';
export const POST_APPLY_LOYALTY_JSON_SUCCESS = 'POST_APPLY_LOYALTY_JSON_SUCCESS';
export const POST_APPLY_LOYALTY_FAILURE = 'POST_APPLY_LOYALTY_FAILURE';

export const ApplyLoyaltySuccessAction = (data) => {
  return {
    type: GET_APPLY_LOYALTY_JSON_SUCCESS,
    data
  };
};

export const ApplyLoyaltyFailureAction = () => {
  return {
    type: GET_APPLY_LOYALTY_FAILURE
  };
};
export const postLoyaltySuccessAction = (data) => {
  return {
    type: POST_APPLY_LOYALTY_JSON_SUCCESS,
    data
  };
};

export const postLoyaltyFailureAction = () => {
  return {
    type: POST_APPLY_LOYALTY_FAILURE
  };
};

export const getApplyLoyalty = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.getRewardsLoyalty }).then((value) => {
      dispatch(ApplyLoyaltySuccessAction({ data: value.body }));
    });
  };
};

export const postLoyaltyData = (data) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ method: 'POST', url: serverUrls.postRewardsLoyalty, data: data }).then(
      value => dispatch(postLoyaltySuccessAction({ data: value.body }),
      browserHistory.push('/dashboard/rewards/maintain-cards')
      ),
      error => dispatch(postLoyaltyFailureAction(error))
  );
  };
};
