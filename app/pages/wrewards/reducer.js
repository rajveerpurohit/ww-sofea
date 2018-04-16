import { combineReducers } from 'redux';
import {
    GET_WREWARDS_LEFTNAV_JSON_SUCCESS,
    GET_WREWARDS_LEFTNAV_JSON_FAILURE,
    GET_WREWARDS_JSON_SUCCESS,
    GET_WREWARDS_JSON_FAILURE,
    GET_WREWARDS_TIER_STATUS_JSON_SUCCESS,
    GET_WREWARDS_TIER_STATUS_JSON_FAILURE,
    GET_WREWARDS_MAINTAIN_CARDS_JSON_SUCCESS,
    GET_WREWARDS_MAINTAIN_CARDS_JSON_FAILURE,
    GET_DASHBOARD_TIER_STATUS_JSON_SUCCESS,
    GET_DASHBOARD_TIER_STATUS_JSON_FAILURE,
    SET_WREWARDS_SAVING_DETAILS,
    UNSET_WREWARDS_SAVING_DETAILS,
    SET_VOUCHERS,
    UNSET_VOUCHERS,
    VALIDATEAPPLIEDREWARDS_JSON_SUCCESS,
    VALIDATEAPPLIEDREWARDS_JSON_FAILURE,
    REGISTERFORWREWARDS_JSON_SUCCESS,
    REGISTERFORWREWARDS_JSON_FAILURE,
    GET_SCHOOL_CONTRIBUTION_JSON_SUCCESS,
    GET_SCHOOL_CONTRIBUTION_JSON_FAILURE
} from './actions';

const wrewardsLeftNavReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_WREWARDS_LEFTNAV_JSON_SUCCESS:
      return Object.assign({}, state, { leftNav: action.data.data.wrewardsLeftNav });
    case GET_WREWARDS_LEFTNAV_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const wrewardsContentReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_WREWARDS_JSON_SUCCESS:
      return Object.assign({}, state, { wrewardsData: action.data.data });
    case GET_WREWARDS_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};
const schoolContributionReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_SCHOOL_CONTRIBUTION_JSON_SUCCESS:
      return Object.assign({}, state, { schoolData: action.data.data });
    case GET_SCHOOL_CONTRIBUTION_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const wrewardsTierStatusReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_WREWARDS_TIER_STATUS_JSON_SUCCESS:
      return Object.assign({}, state, { wrewardsTierData: action.data.data });
    case GET_WREWARDS_TIER_STATUS_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};
const validateAppliedRewardsReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case VALIDATEAPPLIEDREWARDS_JSON_SUCCESS:
      return Object.assign({}, state, { validateAppliedRewardsData: action.data.data });
    case VALIDATEAPPLIEDREWARDS_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};
const registerForWrewards = (
  state = {},
  action
) => {
  switch (action.type) {
    case REGISTERFORWREWARDS_JSON_SUCCESS:
      return Object.assign({}, state, { registerRewardsData: action.data.data });
    case REGISTERFORWREWARDS_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};
const dashboardTierStatusReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_DASHBOARD_TIER_STATUS_JSON_SUCCESS:
      return Object.assign({}, state, { dashboardTierData: action.data.data });
    case GET_DASHBOARD_TIER_STATUS_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const maintainCardsReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_WREWARDS_MAINTAIN_CARDS_JSON_SUCCESS:
      return Object.assign({}, state, { mainCardsData: action.data.data });
    case GET_WREWARDS_MAINTAIN_CARDS_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const savingDetails = (state = {}, action) => {
  switch (action.type) {
    case SET_WREWARDS_SAVING_DETAILS:
      return action.data;
    case UNSET_WREWARDS_SAVING_DETAILS:
      return {};
    default:
      return state;
  }
};

const vouchers = (state = [], action) => {
  switch (action.type) {
    case SET_VOUCHERS:
      return action.data;
    case UNSET_VOUCHERS:
      return [];
    default:
      return state;
  }
};

const wrewardsReducer = combineReducers({
  wrewardsLeftNavReducer,
  wrewardsContentReducer,
  wrewardsTierStatusReducer,
  maintainCardsReducer,
  validateAppliedRewardsReducer,
  registerForWrewards,
  dashboardTierStatusReducer,
  savingDetails,
  vouchers,
  schoolContributionReducer
});

export default wrewardsReducer;
