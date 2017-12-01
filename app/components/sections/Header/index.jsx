import React, {Component} from 'react';
import { connect } from 'react-redux';

import Logo from '../../basic/logo';
import TopHeader from '../../basic/top-header';
import MegaNav from '../../compound/mega-nav';
import AccountsList from '../../basic/account-lists';
import CartCheckout from '../../basic/mini-cart-checkout';
import DeliveryTo from '../../basic/delivering-to';
import DeliverySlotTo from '../../basic/delivery-slot';

import { logOut } from '../../../actions/users';

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
        }
    }
    updateDimensions() {
        // added to set the classes according to device
        const root = document.getElementsByTagName('html')[0];
        if (window.innerWidth < 1023) {
            root.setAttribute('class', 'svg csscalc touchevents cssanimations csstransforms csstransitions objectfit object-fit flexbox meganav--mobile js-ready');
        } else {
            root.setAttribute('class', 'svg csscalc no-touchevents cssanimations csstransforms csstransitions objectfit object-fit flexbox meganav--desktop js-ready');
        }
    }
    render() {
        const user = this.props.user;
        const deliveryDetails = this.props.deliveryDetails;
        const deliverySlot = (user.isLoggedIn && deliveryDetails.deliveryLocation.suburb) ? <DeliverySlotTo deliveryDetails={deliveryDetails} /> : null;
        return (
          <header className="site-header">
            <TopHeader />
            <div className="site-header__main">
              <div className="content--centered">
                <Logo redirectUrl={this.props.logoData.redirectUrl} logoLabel={this.props.logoLabel} />
                <section className="site-header__wrapper site-header__wrapper--account">
                  <nav className="main-header-nav">
                    <ul className="nav-list-x">
                      <AccountsList user={user} logOut={this.props.logOut} />
                      <DeliveryTo />
                      { deliverySlot }
                      <CartCheckout />
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
    return {
        user: state.user,
        deliveryDetails: state.deliveryDetails,
        rootCategories: state.headerReducer.meganavReducer.rootCategories,
        logoData: state.headerReducer.logoReducer.logoData
    };
}

export default connect(mapStateToProps, { logOut })(Header);
