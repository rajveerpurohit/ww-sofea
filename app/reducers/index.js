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
import corporateReducer from '../pages/corporate/reducer';
import helpReducer from '../pages/help-center/reducer';
import sizeGuideReducer from '../pages/size-guide/reducer';
import contactUsReducer from '../pages/contact-us/reducer';
import pressNewsReducer from '../pages/press-news/reducer';
import recipePage from '../pages/recipe-page/reducer';
import search from '../components/compound/search/reducer';
import footerTermsdReducer from '../pages/terms-conditions/reducer';
import deliveryAreaReducer from '../components/basic/delevery-model/reducer';
import wishListReducer from '../components/basic/favorite-list/reducer';
import corporateSalesReducer from '../pages/corporate-sales/reducer';
import storeLocatorReducer from '../pages/store-locator/reducer';
import storeListReducer from '../components/basic/store-list/reducer';
import common from './commonReducer';
import accountDetailsReducer from '../pages/account-details/reducer';
import leftNavReducer from '../components/sections/SideMenu/reducer';
import cartActionPanel from '../components/compound/cart-action-panel/reducer';
import pdp from '../pages/pdp/reducer';
import { reducer as formReducer } from 'redux-form';
import applyNowReducer from '../pages/apply-now/reducer';
import financialServicesReducer from '../pages/financial-services/reducer';
import preferenceReducer from '../pages/account-details-preferences/reducer';
import interestReducer from '../pages/account-details-interests/reducer';
import littleWorldReducer from '../pages/little-world/reducer';
import wrewardsReducer from '../pages/wrewards/reducer';
import currentShopingListItems from '../pages/shopping-list/reducer';
import dashboardReducer from '../pages/my-account/reducer';
import checkout from '../pages/checkout/reducer';
import createUserReducer from '../pages/registration/reducer';
import myDetailReducer from '../pages/my-details/reducer';
import addressDetailsReducer from '../pages/my-details-address/reducer';
import gtmReducer from '../gtm/gtmReducer';
import applyLoyaltyReducer from '../pages/apply-loyalty/reducer';

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
  recipePage,
  labels,
  search,
  routing,
  woolOnline,
  secureReducer,
  faqReducer,
  corporateReducer,
  aboutUsReducer,
  helpReducer,
  sizeGuideReducer,
  contactUsReducer,
  pressNewsReducer,
  footerTermsdReducer,
  wishListReducer,
  corporateSalesReducer,
  storeListReducer,
  storeLocatorReducer,
  common,
  currentShopingListItems,
  accountDetailsReducer,
  leftNavReducer,
  cartActionPanel,
  deliveryAreaReducer,
  pdp,
  form: formReducer,
  applyNowReducer,
  financialServicesReducer,
  preferenceReducer,
  interestReducer,
  littleWorldReducer,
  wrewardsReducer,
  dashboardReducer,
  checkout,
  createUserReducer,
  myDetailReducer,
  addressDetailsReducer,
  gtmReducer,
  applyLoyaltyReducer
});

export default rootReducer;
