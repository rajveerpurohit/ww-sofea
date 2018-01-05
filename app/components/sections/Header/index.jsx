import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import Logo from '../../basic/logo';
import TopHeader from '../../basic/top-header';
import MegaNav from '../../compound/mega-nav';
import AccountsList from '../../basic/account-lists';
import CartCheckout from '../../basic/mini-cart-checkout';
import DeliverySlotTo from '../../basic/delivery-slot';
import DeliveryDetails from '../../compound/deliveryDetails';

import { logOut } from '../../compound/signin/actions';
import { loader, modal } from '../../../actions/common';

import { changeLocation, addNewAddress, getUserAddresses, setCurrentAddress, getDeliverySlots, showAddressForm } from '../../compound/deliveryDetails/actions';


class Header extends Component {
    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentWillMount() {
        if (typeof window !== 'undefined' && window) {
            window.addEventListener('resize', this.updateDimensions);
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined' && window) {
            this.updateDimensions();
        }
    }
    componentWillUnmount() {
        if (typeof window !== 'undefined' && window) {
            window.removeEventListener('resize', this.updateDimensions);
            window.location.reload();
        }
    }
    updateDimensions() {
        // added to set the classes according to device
        const root = document.getElementsByTagName('html')[0];
        if (window.innerWidth < 1023) {

            root.setAttribute('class', 'svg csscalc touchevents cssanimations csstransforms csstransitions objectfit object-fit flexbox meganav--mobile js-ready');
            document.getElementsByClassName('main-nav__list hover-ready main-nav__list--primary')[0].style.visibility = 'hidden';

        } else {
            root.setAttribute('class', 'svg csscalc no-touchevents cssanimations csstransforms csstransitions objectfit object-fit flexbox meganav--desktop js-ready');
            document.getElementsByClassName('main-nav__list no-hover main-nav__list--primary')[0].style.visibility = 'visible';

        }
    }
    render() {
        const user = this.props.user;
        const deliveryDetails = this.props.deliveryDetails;
        const deliverySlot = (user.isLoggedIn && deliveryDetails.deliveryLocation.suburbId) ? <DeliverySlotTo deliveryDetails={deliveryDetails} logoLabel={this.props.labels} {...this.props} /> : null;

        return (
          <header className="site-header">
            <TopHeader />
            <div className="site-header__main">
              <div className="content--centered">
                <Logo redirectUrl={this.props.logoData.redirectUrl} logoLabel={this.props.logoLabel} />
                <section className="site-header__wrapper site-header__wrapper--account">
                  <nav className="main-header-nav">
                    <ul className="nav-list-x">
                      <AccountsList user={user} logOut={this.props.logOut} labels={this.props.labels} />
                      <DeliveryDetails labels={this.props.labels} deliveryDetails={deliveryDetails}/>
                      { deliverySlot }
                      <CartCheckout labels={this.props.labels} cartLabels={this.props.cartLabels} />
                    </ul>
                  </nav>
                </section>
                <MegaNav rootCategories={this.props.rootCategories} />
              </div>
            </div>
          </header>
         );
    }
}

function mapStateToProps(state) {
    if (state.labels.labels.header && state.labels.labels.cart) {
        return {
            user: state.user,
            deliveryDetails: state.deliveryDetails,
            rootCategories: state.headerReducer.meganavReducer.rootCategories,
            logoData: state.headerReducer.logoReducer.logoData,
            labels: state.labels.labels.header,
            cartLabels: state.labels.labels.cart,
            common: state.common
        };
    }
        return {
            user: state.user,
            deliveryDetails: state.deliveryDetails,
            rootCategories: state.headerReducer.meganavReducer.rootCategories,
            logoData: state.headerReducer.logoReducer.logoData,
            cartLabels: state.labels.labels.cart,
            sessConf: state.sessConf,
            common: state.common
        };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logOut,
        changeLocation,
        addNewAddress,
        getUserAddresses,
        setCurrentAddress,
        getDeliverySlots,
        showAddressForm,
        loader,
        modal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
