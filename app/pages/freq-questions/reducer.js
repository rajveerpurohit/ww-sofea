import { combineReducers } from 'redux';
import {
  GET_LEFTNAV_JSON_SUCCESS,
  GET_LEFTNAV_JSON_FAILURE,
  GET_FAQ_JSON_SUCCESS,
  GET_FAQ_FAILURE,
  GET_FAQDETAIL_JSON_SUCCESS,
  GET_FAQDETAIL_JSON_FALIURE
} from './actions';

const LeftNavReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LEFTNAV_JSON_SUCCESS:
      return Object.assign({}, state, {
        leftNav:
          action.data.data &&
          action.data.data.leftNav &&
          action.data.data.leftNav.LeftNav
      });
    case GET_LEFTNAV_JSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const faqLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FAQ_JSON_SUCCESS:
      return Object.assign({}, state, {
        faqData: action.data.data.contents.AllFAQs.FAQs
      });
    case GET_FAQ_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const faqDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FAQDETAIL_JSON_SUCCESS:
      return Object.assign({}, state, {
        faqDetails: action.data.data.contents
      });
    case GET_FAQDETAIL_JSON_FALIURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const faqReducer = combineReducers({
  LeftNavReducer,
  faqLinkReducer,
  faqDetailsReducer
});

export default faqReducer;
