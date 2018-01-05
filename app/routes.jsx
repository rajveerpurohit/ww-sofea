import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App} from './pages';

import HomePage from './pages/home';
import HowTo from './pages/content-how-tos';
import DLPPage from './pages/dlp';
import SignIn from './pages/signin';
import Pdp from './pages/pdp';
import Plp from './pages/plp';
import HelpCenter from './pages/help-center';
import ContactUs from './pages/contact-us';
import CorporateContent from './pages/corporate-content';
import WoolworthsOnline from './pages/woolworths-online';
import WaysDetails from './pages/content-ways-detail';
import FAQ from './pages/freq-questions';
import StoreLocator from './pages/storelocator';
import AboutUs from './pages/about-us';
import PressNews from './pages/press-news';
import Sustainability from './pages/sustanibility';
import LinkCard from './pages/link-a-card';
import AccountDetails from './pages/account-details';
import ShoppingList from './pages/shopping-list';
import PurchaseHistoryLanding from './pages/purchase-history-landing';
import TermsConditions from './pages/terms-conditions';
import PrivacyPolicy from './pages/privacy-policy';
import FinancialServices from './pages/financial-services';
import SafeAndSecure from './pages/safe-secure';
import CorporateSales from './pages/corporate-sales';
import CLP from './pages/clp';
import Studiow from './pages/studiow';
import { setUserSession } from './components/compound/signin/actions';
/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  // const redirectAuth = (nextState, replace, callback) => {
  //   store.dispatch(isLoggedIn());
  //   callback();
  // };

  const mapSessionToState = (nextState, replace, callback) => {
    // store.dispatch(setUserSession());
    Promise.resolve()
      .then(x => store.dispatch(setUserSession())) // resolve func[0]
      .then(x => callback());
    // callback();
  };

  return (
    <Route path="/" component={App} onEnter={mapSessionToState}>
      <IndexRoute component={HomePage} />
      {/* <Route path="plp" component={Plp}  />
      <Route path="pdp" component={Pdp}  />*/}
      <Route path="login" component={SignIn} pageType="checkout" />

      {/* <Route path="/dept/(:deptName)/_/(:deptId)" component={DLPPage} /> */}

      <Route path="/dept/*" component={DLPPage} />
      <Route path="/cat/*" component={CLP} />

      {/* routing for footer links*/}
      <Route path="helpcenter" component={HelpCenter} />
      <Route path="contactus" component={ContactUs} />
      <Route path="woolworthsonline" component={WoolworthsOnline} />
      <Route path="deliveryoptions" component={FAQ} />
      <Route path="returnandexchange" component={FAQ} />
      <Route path="help" component={HelpCenter} />
      <Route path="help/faqs(/:faqId)" component={FAQ} />

      <Route path="storelocator" component={StoreLocator} />
      <Route path="pressandnews" component={PressNews} />
      <Route path="sustanibility" component={Sustainability} />
      <Route path="aboutus" component={AboutUs} />

      <Route path="orders" component={PurchaseHistoryLanding} />
      <Route path="shoppinglist" component={ShoppingList} />
      <Route path="accountdetails" component={AccountDetails} />
      <Route path="linkcard" component={LinkCard} />

      <Route path="studiow" component={Studiow} pageType="studiow" />

      <Route path="termsandconditions" component={TermsConditions} />
      <Route path="privacypolicy" component={PrivacyPolicy} />

      <Route path="getthecard" component={FinancialServices} />

      <Route path="secure" component={SafeAndSecure} />
      <Route path="corporatesales" component={CorporateSales} />

      <Route path="clp" component={CLP} />

      <Route path="corporate-content" component={CorporateContent} />
      <Route path="How-tos" component={HowTo} />
      <Route path="ways-to" component={WaysDetails} />
    </Route>
  );
};
