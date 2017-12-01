import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import headerReducer from '../components/sections/Header/reducer';
import user from '../reducers/user';
import footer from '../components/sections/Footer/reducer';
import deliveryDetails from '../reducers/deliveryDetails';
import home from '../pages/home/reducer';
import * as types from '../types';
import woolOnline from '../pages/woolworths-online/reducer';
import secureReducer from '../pages/safe-secure/reducer';
import aboutUsReducer from '../pages/about-us/reducer';
import faqReducer from '../pages/freq-questions/reducer';
import helpCenterReducer from '../pages/help-center/reducer';
import pressNewsReducer from '../pages/press-news/reducer';
import contactUsReducer from '../pages/contact-us/reducer';
import footerTermsdReducer from '../pages/terms-conditions/reducer';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  user,
  deliveryDetails,
  headerReducer,
  footer,
  home,
  routing,
  woolOnline,
  secureReducer,
  faqReducer,
  aboutUsReducer,
  helpCenterReducer,
  pressNewsReducer,
  contactUsReducer,
  footerTermsdReducer
});

export default rootReducer;
