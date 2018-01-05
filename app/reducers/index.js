import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import headerReducer from '../components/sections/Header/reducer';
import user from '../components/compound/signin/reducer';
import footer from '../components/sections/Footer/reducer';
import deliveryDetails from '../components/compound/deliveryDetails/reducer';
import home from '../pages/home/reducer';
import dlp from '../pages/dlp/reducer';
import clp from '../pages/clp/reducer';
import labels from './labelsReducer';
import * as types from '../types';
import woolOnline from '../pages/woolworths-online/reducer';
import secureReducer from '../pages/safe-secure/reducer';
import aboutUsReducer from '../pages/about-us/reducer';
import faqReducer from '../pages/freq-questions/reducer';
import helpCenterReducer from '../pages/help-center/reducer';
import contactUsReducer from '../pages/contact-us/reducer';
import pressNewsReducer from '../pages/press-news/reducer';
import search from '../components/compound/search/reducer';
import footerTermsdReducer from '../pages/terms-conditions/reducer';
//  import deliveryAreaReducer from '../components/basic/delivering-to/reducer';
import utilityReducer from '../components/basic/top-header/reducer';
import corporateSalesReducer from '../pages/corporate-sales/reducer';
import storeLocatorReducer from '../pages/storelocator/reducer';
import storeListReducer from '../components/basic/storeList/reducer';
import common from './commonReducer';

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
  dlp,
  clp,
  labels,
  search,
  routing,
  woolOnline,
  secureReducer,
  faqReducer,
  aboutUsReducer,
  helpCenterReducer,
  contactUsReducer,
  pressNewsReducer,
  footerTermsdReducer,
  utilityReducer,
  corporateSalesReducer,
  storeListReducer,
  storeLocatorReducer,
  common
 });

export default rootReducer;
