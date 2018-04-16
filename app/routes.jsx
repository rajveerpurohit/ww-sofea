import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import _ from 'lodash';
import { App } from './pages';

import HomePage from './pages/home';
import HowTo from './pages/content-how-tos';
import DLPPage from './pages/dlp';
import IntlPage from './pages/intl';
import SignIn from './pages/signin';
import Pdp from './pages/pdp';
import Plp from './pages/plp';
import Search from './components/compound/search';
import HelpCenter from './pages/help-center';
import ContactUs from './pages/contact-us';
import ContactUsThankYou from './pages/contact-us/ContactUsThankYou';
import CorporateContent from './pages/corporate-content';
import WoolworthsOnline from './pages/woolworths-online';
import WaysDetails from './pages/content-ways-detail';
import FAQ from './pages/freq-questions';
import Corporate from './pages/corporate';
import StoreLocator from './pages/store-locator';
import AboutUs from './pages/about-us';
import PressNews from './pages/press-news';
import Sustainability from './pages/sustanibility';
import LinkCard from './pages/link-a-card';
import AccountDetails from './pages/account-details';
import PaymentDetails from './pages/my-details/payment-details';
import MyAccount from './pages/my-account';
import MyOrders from './components/compound/MyOrders';
import OrderDetails from './components/compound/MyOrders/orderDetails';
import Favourites from './pages/favourites';
import FavouritesDetails from './pages/favourites/favourites-details';
import ShoppingList from './pages/shopping-list';
import ManageShoppingList from './pages/shopping-list/manage-shopping-list';
import ShoppingListDetails from './pages/shopping-list/shopping-list-details';
import PurchaseHistoryLanding from './pages/purchase-history-landing';
import TermsConditions from './pages/terms-conditions';
import PrivacyPolicy from './pages/privacy-policy';
import FinancialServices from './pages/financial-services';
import SafeAndSecure from './pages/safe-secure';
import CorporateSales from './pages/corporate-sales';
import CLP from './pages/clp';
import RecipePage from './pages/recipe-page';
import CartPage from './pages/shopping-cart';
import CheckoutPage from './pages/checkout';
import Studiow from './pages/studiow';
// import SLP from './pages/slp';
import NoResultsFound from './pages/no-results-found';
import ErrorPageFiveHunderd from './pages/error-page-five-hunderd';
import ErrorPageFourHunderd from './pages/error-page-four-hunderd';
import ApplyNow from './pages/apply-now';
// import PersonalLoan from './pages/personal-loan';
// import BalanceProtectionInsurance from './pages/balance-protection-insurance';
// import TravelInsurance from './pages/travel-insurance';
// import ViewMyAccounts from './pages/view-my-accounts';
// import PaymentOptions from './pages/payment-options';
// import Insurance from './pages/insurance/insurance';
import PersonalInfo from './pages/apply-now/personalInfo';
import IncomeExpenses from './pages/apply-now/incomeExpenses';
import Results from './pages/apply-now/results';
import WfsConnectCard from './pages/financial-services/content/wfs-connect-card';
import WfsMyWfs from './pages/financial-services/content/wfs-my-wfs';
import WfsProductDetails from './pages/financial-services/content/wfs-product-details';
import WfsTransactionHistory from './pages/financial-services/content/wfs-transaction-history';
import WfsSwitchEstatements from './pages/financial-services/content/wfs-switch-estatements';
import WfsSwitchEstatementsThanks from './pages/financial-services/content/wfs-switch-estatements-thanks';
import SizeGuide from './pages/size-guide';
import Woolworths from './pages/size-guide/content/woolworths/woolworths';
import CountryRoad from './pages/size-guide/content/country-road/country-road';
import Trenery from './pages/size-guide/content/trenery';
import Witchery from './pages/size-guide/content/witchery';
import Preference from './pages/account-details-preferences';
import MyInterests from './pages/account-details-interests';
// import WoolworthsTrenery from './pages/size-guide/content/woolworths/woolworths-trenery';
// import WoolworthsWitchery from './pages/size-guide/content/woolworths/woolworths-witchery';
import LittleWorld from './pages/little-world';
import Registration from './pages/registration';
import Wrewards from './pages/wrewards';
import WrewardsTierStatus from './pages/wrewards/tier-status';
import WrewardsTierStatusTransactions from './pages/wrewards/tier-status-transactions';
import DashboardTierStatus from './pages/wrewards/dashboad-tier-status';
import MaintainCards from './pages/wrewards/maintain-cards';
import AddWrewardsCard from './pages/wrewards/content/add-wrewards-card';
import Cards from './pages/wrewards/cards';
import Otp from './pages/otp';
import ResetPassword from './pages/reset-password';
import MyDetailsAddress from './pages/my-details-address';
import ResetPasswordThanks from './pages/reset-password-thanks';
import WrewardsIndex from './pages/wrewards/content/rewards-index';
import MyVouchers from './pages/wrewards/content/my-vouchers';
import ApplyWrewards from './pages/wrewards/content/apply-wrewards';
import SignedInUser from './pages/sigend-user';
import ApplyLoyalty from './pages/apply-loyalty';
import Curalate from './components/basic/curalate';
import MySchoolContribution from './pages/wrewards/myschool-contribution';

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

  // const mapSessionToState = (nextState, replace, callback) => {
  //   Promise.resolve()
  //     .then(x => store.dispatch(setUserSession())) // resolve func[0]
  //     .then(x => callback());
  // };

  const requireAuth = (nextState, replace, callback) => {
    const loginStatus = _.get(store.getState(), 'clp.currentUser.loggedInStatus', '');
    if (loginStatus < 4 && loginStatus !== '') {
      replace({
        pathname: '/login'
      });
    }
    callback();
  };

  return (
    <Route
      path="/" component={App} history={browserHistory}
      onChange={(prevState, nextState) => {
        if (nextState.location.action !== 'POP') {
          window.scrollTo(0, 0);
          if (typeof document !== 'undefined' && document.readyState === 'complete' && document.getElementById('fldSearch')) {
            document.getElementById('fldSearch').value = '';
          }
        }
      }}
    >
      <IndexRoute component={HomePage} />
      {/* <Route path="plp" component={Plp}  />
      <Route path="pdp" component={Pdp}  /> */}
      <Route path="login" component={SignIn} pageType="checkout" pageCode="login" />
      <Route path="/registration" component={Registration} pageType="checkout" pageCode="login" />
      <Route path="/curalate" component={Curalate} />
      {/* <Route path="/dept/(:deptName)/_/(:deptId)" component={DLPPage} /> */}

      <Route path="/dept/*" component={DLPPage} />
      <Route path="/gallery/tww" component={DLPPage} />
      <Route path="/intl/*" component={IntlPage} pageType="thirdparty" />
      {/* <Route path="/search*" component={SLP} /> */}
      <Route path="/cat*" component={CLP} />
      <Route path="/recipe/*" component={RecipePage} />
      <Route path="/checkout/cart" component={CartPage} pageType="checkout" />
      <Route path="/checkout" component={CheckoutPage} pageType="checkout" onEnter={requireAuth} />

      {/* routing for footer links */}
      <Route path="helpcenter" component={HelpCenter} />
      <Route path="contactus" component={ContactUs} />
      <Route path="contactus/thankyou" component={ContactUsThankYou} />
      <Route path="woolworthsonline" component={WoolworthsOnline} />
      <Route path="deliveryoptions" component={FAQ} />
      <Route path="returnandexchange" component={FAQ} />
      <Route path="help" component={HelpCenter} />
      <Route path="help/faqs(/:faqId)" component={FAQ} />
      <Route path="corporate(/:contentId)" component={Corporate} />
      <Route path="sizeGuides" component={SizeGuide}>
        <Route path="woolworths(/:type)" component={Woolworths} />
        <Route path="countryroad(/:type)" component={CountryRoad} />
        <Route path="trenery(/:type)" component={Trenery} />
        <Route path="witchery(/:type)" component={Witchery} />
      </Route>
      <Route path="wrewards/tier-status" component={WrewardsTierStatus} pageCode="wrewards" />
      <Route path="wrewards/tier-status-transactions" component={WrewardsTierStatusTransactions} pageCode="wrewards" />
      <Route path="wrewards(/:contentId)" component={Wrewards} pageCode="wrewards" />

      <Route path="storelocator" component={StoreLocator} />
      <Route path="pressandnews" component={PressNews} />
      <Route path="sustanibility" component={Sustainability} />
      <Route path="aboutus" component={AboutUs} />

      <Route path="orders" component={PurchaseHistoryLanding} />
      <Route path="dashboard/myaccount/user-details" component={AccountDetails} pageType="myAccount" onEnter={requireAuth} />
      <Route path="dashboard/myaccount/payment-details" component={PaymentDetails} pageType="myAccount" onEnter={requireAuth} />
      <Route path="dashboard" component={MyAccount} pageType="myAccount" pageCode="accountDetails" onEnter={requireAuth} />
      <Route path="dashboard/purchases/purchase-history" component={MyOrders} pageType="myAccount" onEnter={requireAuth} />
      <Route path="accountdetails/orderdetails" component={OrderDetails} pageType="myAccount" onEnter={requireAuth} />

      <Route path="dashboard/favourites/favourites-index" component={Favourites} pageType="myAccount" onEnter={requireAuth} />
      <Route path="dashboard/favourites/favourites-details" component={FavouritesDetails} pageType="myAccount" onEnter={requireAuth} />

      <Route path="/dashboard/shopping-lists/create-list" component={ShoppingList} pageType="myAccount" />
      <Route path="/dashboard/shopping-lists/shopping-lists-index" component={ShoppingListDetails} pageType="myAccount" onEnter={requireAuth} />
      <Route path="/dashboard/shopping-lists/shoppinglist/:shoppingListId" component={ManageShoppingList} pageType="myAccount" onEnter={requireAuth} />
      {/* <Route path="/dashboard/shoppinglist/:shoppingListId" component={ManageShoppingList} pageType="myAccount" /> */}

      <Route path="dashboard/preferences/consents" component={Preference} pageType="myAccount" pageCode="accountDetails" onEnter={requireAuth} />
      <Route path="dashboard/preferences/interests" component={MyInterests} pageType="myAccount" pageCode="accountDetails" onEnter={requireAuth} />
      <Route path="linkcard" component={LinkCard} />
      <Route path="dashboard/littleworld/details" component={LittleWorld} pageType="myAccount" pageCode="accountDetails" onEnter={requireAuth} />
      <Route path="dashboard/littleworld/details/add" component={LittleWorld} pageType="myAccount" pageCode="accountDetails" onEnter={requireAuth} />
      <Route path="/otp" component={Otp} pageType="checkout" pageCode="login" />
      <Route path="studiow" component={Studiow} pageType="checkout" pageCode="studiow" />

      <Route path="termsandconditions" component={TermsConditions} />
      <Route path="privacypolicy" component={PrivacyPolicy} />

      <Route path="secure" component={SafeAndSecure} />
      <Route path="corporatesales" component={CorporateSales} />

      <Route path="clp" component={CLP} />
      <Route path="prod/*" component={Pdp} />

      <Route path="corporate-content" component={CorporateContent} />
      <Route path="How-tos" component={HowTo} />
      <Route path="ways-to" component={WaysDetails} />

      <Route path="no-results" component={NoResultsFound} />


      {/* routing for Financial Services STARTS... */}
      <Route path="/wfs/wfs-application-details" component={ApplyNow} pageType="finance" />
      <Route path="/wfs/wfs-personal-info" component={PersonalInfo} pageType="finance" />
      <Route path="/wfs/wfs-income-expenses" component={IncomeExpenses} pageType="finance" />
      <Route path="/wfs/wfs-results" component={Results} pageType="finance" />
      <Route path="dashboard/wfs/connect-card" component={WfsConnectCard} pageType="myAccount" />
      <Route path="dashboard/wfs/my-wfs" component={WfsMyWfs} pageType="myAccount" />
      <Route path="wfs/my-wfs" component={WfsMyWfs} pageType="myAccount" />
      <Route path="dashboard/wfs/transaction-history(/accountNumber=:accountNumber)" component={WfsTransactionHistory} pageType="myAccount" />
      <Route path="dashboard/wfs/switch-estatements" component={WfsSwitchEstatements} pageType="myAccount" />
      <Route path="dashboard/wfs/switch-estatements-thanks" component={WfsSwitchEstatementsThanks} pageType="myAccount" />
      <Route path="dashboard/wfs/product-details(/isCreditCard)(=)(:type)" component={WfsProductDetails} pageType="myAccount" />
      <Route path="dashboard/wfs(/:contentId)" component={FinancialServices} />
      <Route path="wfs(/:contentId)" component={FinancialServices} pageCode="woolFinance" />
      {/* routing for Financial Services ENDS... */}


      {/* <Route path="slp" component={SLP} /> */}
      <Route path="dashboard/rewards/apply-loyalty-card" component={ApplyLoyalty} pageType="myAccount" />
      <Route path="signed-user" component={SignedInUser} pageType="checkout" pageCode="login" />
      <Route path="dashboard/rewards/maintain-cards" component={MaintainCards} pageType="myAccount" />
      <Route path="dashboard/rewards/maintain-cards(/:cardid)" component={Cards} pageType="myAccount" />
      <Route path="dashboard/rewards/add-wrewards-card" component={AddWrewardsCard} pageType="myAccount" />
      <Route path="dashboard/rewards/tier-status" component={DashboardTierStatus} pageType="myAccount" />
      <Route path="dashboard/rewards/connect-card" component={WfsConnectCard} pageType="myAccount" />
      <Route path="dashboard/rewards/apply-wrewards" component={ApplyWrewards} pageType="myAccount" />
      <Route path="dashboard/rewards/rewards-index" component={WrewardsIndex} pageType="myAccount" />
      <Route path="dashboard/rewards/vouchers" component={MyVouchers} pageType="myAccount" />
      <Route path="dashboard/rewards/contributions" component={MySchoolContribution} pageType="myAccount" />
      <Route path="dashboard/rewards*" component={Wrewards} />
      <Route path="/reset-password" component={ResetPassword} pageType="checkout" />
      <Route path="/reset-password-thanks" component={ResetPasswordThanks} pageType="checkout" />
      <Route path="dashboard/myaccount/delivery-details" component={MyDetailsAddress} pageType="myAccount" />
      <Route path="store/cat/Gifts/Gift-Cards/*" component={CLP} />

      <Route path="400" component={ErrorPageFourHunderd} pageType="checkout" pageCode="errorPage" />
      <Route path="500" component={ErrorPageFiveHunderd} pageType="checkout" pageCode="errorPage" />
      <Route path="*" component={ErrorPageFourHunderd} pageType="checkout" pageCode="errorPage" />


    </Route>
  );
};
