import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Logo from '../../basic/logo';
import TopHeader from '../../basic/top-header';
import MegaNav from '../../compound/mega-nav';
import AccountsList from '../../basic/account-lists';
import CartCheckout from '../../basic/mini-cart-checkout';
import DeliverySlotTo from '../../basic/delivery-slot';
import ExtendDeliverySlot from '../../basic/extend-delivery-slot';
import DeliveryDetails from '../../compound/deliveryDetails';

import CommonUtil from '../../../services/commonUtil';
import { logOut, setUserSession } from '../../compound/signin/actions';
import { loader, modal, viewportType, setMobileNavHeaderOption } from '../../../actions/common';
import {
  DEFAULT_STORE_ID,
  STORE_ID_COOKIE_NAME,
  DEFAULT_FOOD_FULFILLER_TYPE,
  VIEW_PORT_TYPE_MOBILE,
  VIEW_PORT_TYPE_DESKTOP
} from '../../../Constants';

import {
  changeLocation,
  addNewAddress,
  getUserAddresses,
  setCurrentAddress,
  getDeliverySlots,
  showAddressForm,
  reserveDeliverySlots,
  confirmDeliveryAddress,
  extendDeliverySlot,
  extendDeliverySlotApi,
  deliverySlotSession,
  changeDeliveryAddress
} from '../../compound/deliveryDetails/actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideDeliverySlotFlyOut: false
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.updateHideDeliverySlotFlyOut = this.updateHideDeliverySlotFlyOut.bind(this);
  }

  componentWillMount() {
    if (typeof window !== 'undefined' && window) {
      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentUser = _.get(nextProps, 'clp.currentUser', {});
    const storeId = _.get(currentUser, `storeIds[${DEFAULT_FOOD_FULFILLER_TYPE}]`, DEFAULT_STORE_ID);
    const cookieStoreId = CommonUtil.readCookie(STORE_ID_COOKIE_NAME) || '';

    if (cookieStoreId !== storeId) {
      CommonUtil.createCookie(STORE_ID_COOKIE_NAME, storeId);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && window) {
      window.removeEventListener('resize', this.updateDimensions);
    }
  }

  updateDimensions() {
    if (window.innerWidth < 840) {
      this.props.viewportType(VIEW_PORT_TYPE_MOBILE);
    } else {
      this.props.viewportType(VIEW_PORT_TYPE_DESKTOP);
    }
  }
  updateHideDeliverySlotFlyOut(flyOutStatus) {
    this.setState({ hideDeliverySlotFlyOut: flyOutStatus });
  }

  render() {
    const user = this.props.user;
    const totalOrderItems = (this.props.miniCartData.orderSummary && this.props.miniCartData.orderSummary.totalItemsCount) || 0;
    const deliveryDetails = this.props.deliveryDetails;
    const { labels, clp, logoLabel, cartLabels, rootCategories } = this.props;
    const currentUser = _.get(clp, 'currentUser', {});

    return (
      <header className="site-header">
        <TopHeader />
        <div className="site-header__main">
          <div className="content--centered">
            <Logo redirectUrl={this.props.logoData.redirectUrl} logoLabel={logoLabel} />
            <section className="site-header__wrapper site-header__wrapper--account">
              <nav className="main-header-nav">
                <ul className="nav-list-x">
                  <AccountsList
                    user={user}
                    currentUser={currentUser}
                    logOut={this.props.logOut}
                    labels={labels}
                    viewportType={this.props.common.viewportType}
                    mobileNavHeaderStatus={this.props.common.mobileNavHeaderStatus}
                    locationChanged={this.props.locationChanged}
                    setMobileNavHeaderOption={this.props.setMobileNavHeaderOption}
                  />
                  <DeliveryDetails
                    clp={clp}
                    user={user}
                    labels={labels}
                    deliveryDetails={deliveryDetails}
                  />
                  {user.isLoggedIn && totalOrderItems > 0 && (
                    <DeliverySlotTo
                      deliveryDetails={deliveryDetails}
                      logoLabel={labels}
                      {...this.props}
                      extendDeliverySlot={this.props.extendDeliverySlot}
                      hideDeliverySlotFlyOut={this.state.hideDeliverySlotFlyOut}
                      updateHideDeliverySlotFlyOut={this.updateHideDeliverySlotFlyOut}
                    />
                  )}
                  <CartCheckout
                    labels={labels}
                    cartLabels={cartLabels}
                    viewportType={this.props.common.viewportType}
                    setMobileNavHeaderOption={this.props.setMobileNavHeaderOption}
                    mobileNavHeaderStatus={this.props.common.mobileNavHeaderStatus}
                    updateHideDeliverySlotFlyOut={this.updateHideDeliverySlotFlyOut}
                  />
                  {deliveryDetails.extendDeliverySlot && (
                    <ExtendDeliverySlot
                      deliveryDetails={deliveryDetails}
                      clp={this.props.clp}
                      extendDeliverySlotApi={this.props.extendDeliverySlotApi}
                      deliverySlotSession={this.props.deliverySlotSession}
                      extendDeliverySlot={this.props.extendDeliverySlot}
                    />
                  )}
                </ul>
              </nav>
            </section>
            <MegaNav
              rootCategories={rootCategories}
              viewportType={this.props.common.viewportType}
              locationChanged={this.props.locationChanged}
              setMobileNavHeaderOption={this.props.setMobileNavHeaderOption}
              mobileNavHeaderStatus={this.props.common.mobileNavHeaderStatus}
            />
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  const res = {
    user: state.user,
    deliveryDetails: state.deliveryDetails,
    rootCategories: _.get(state, 'headerReducer.meganavReducer.rootCategories', {}),
    // logoData: state.headerReducer.logoReducer.logoData,
    logoData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.headerLogo', {}),
    miniCartData: _.get(state, 'headerReducer.miniCartReducer.miniCartData', {}),
    common: state.common,
    clp: state.clp,
    cartLabels: _.get(state, 'labels.labelsAndErrorMessages.cart', {}),
    locationChanged: _.get(state, 'headerReducer.meganavReducer.locationChanged', false),
    labels: _.get(state, 'labels.labelsAndErrorMessages.header', {}),
  };

  if (_.isEmpty(res.labels)) {
    return {
      ...res,
      sessConf: state.sessConf
    };
  }

  return res;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logOut,
      changeLocation,
      addNewAddress,
      getUserAddresses,
      setCurrentAddress,
      getDeliverySlots,
      showAddressForm,
      loader,
      modal,
      viewportType,
      setMobileNavHeaderOption,
      reserveDeliverySlots,
      confirmDeliveryAddress,
      extendDeliverySlot,
      extendDeliverySlotApi,
      deliverySlotSession,
      setUserSession,
      changeDeliveryAddress
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
