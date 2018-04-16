import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import SideMenu from '../components/sections/SideMenu';
import SignIn from './signin';
// import DetailsSideMenu from '../components/sections/DetailsPageSideMenu';

import CheckoutHeader from '../components/sections/Header/checkoutHeader';
import CheckoutFooter from '../components/sections/Footer/checkoutFooter';
import Loader from '../components/basic/common/loader';
import Studiow from './studiow';
import '../styles/main.scss';
import { setPreviousLocation } from '../actions/common';
import { setUserSession } from '../components/compound/signin/actions';

const ThirdPartyApp = ({ children }) => (
  <div className="app">
    <div className="grid-wrapper checkout-page">{children}</div>
    <Loader />
  </div>
);

const CheckoutApp = ({ children, pageCode }) => {
  const classes = classnames('grid-wrapper', {
    'checkout-page': pageCode !== 'login'
  });

  return (
    <div className="app">
      <CheckoutHeader />
      <div className={classes} >{children}</div>
      <CheckoutFooter />
      <Loader />
    </div>
  );
};

const Finance = ({ children, pageCode }) => {
  // const classes = classnames('grid-wrapper', { 'checkout-page': pageCode !== 'login' || pageCode !== 'wwFinance' });

  return (
    <div className="app page-wfs-app  ">

      <CheckoutHeader pageCode={'finance'} />
      <div className="grid-wrapper site-page content--centered ">
        <div className="sticky-footer-parent">
          <div className="sticky-footer__content">
            <main className="grid grid--space-y site-main">{children}</main>
          </div>
        </div>
      </div>
      <CheckoutFooter pageCode={'finance'} />
      <Loader />

    </div>
  );
};

// const ErrorFourHundredApp = ({ children }) => (
//   <div className="app">
//     <CheckoutHeader />
//     <div className="grid-wrapper checkout-page">{children}</div>
//     <CheckoutFooter />
//     <Loader />
//   </div>
// );

// const ErrorFiveHundredApp = ({ children }) => (
//   <div className="app">
//     <CheckoutHeader />
//     <div className="grid-wrapper checkout-page">{children}</div>
//     <CheckoutFooter />
//     <Loader />
//   </div>
// );

const MainApp = ({ children, pageCode }) => (
  <div className="app">
    <Header />
    <div className="grid-wrapper site-page content--centered">
      {
        pageCode === 'woolFinance' ?
          <main className="grid grid--space-y site-main" pageCode={pageCode} >{children}</main> :
          <main className="grid grid--space-y site-main" >{children}</main>}
      <Footer />
      <Loader />
    </div>
  </div>
);

const MyAccount = ({ children, user }) => {
  if (user.isLoggedIn) {
    return (
      <div className="app">
        <Header />
        <div className="grid-wrapper site-page content--centered">
          <div className="page-layout__aside">
            <SideMenu />
          </div>
          <main className="grid grid--space-y site-main">{children}</main>
          <Footer />
          <Loader />
        </div>
      </div>
    );
  } else if (!user.isLoggedIn && user.isWaiting) {
    return (<Loader showOnLoad />);
  }
  return (<SignIn />);
};


/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 */
class App extends Component {

  componentWillMount() {
    this.props.setUserSession(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.setPreviousLocation(this.props.location.pathname);
    }
  }

  render() {
    const rounteProps = this.props.children.props.route;
    const { pageType, pageCode } = rounteProps;

    switch (pageType) {
      case 'checkout': {
        if (pageCode === 'studiow') {
          return (<CheckoutApp><Studiow /></CheckoutApp>);
        }

        return (<CheckoutApp pageCode={pageCode} >{this.props.children}</CheckoutApp>);
      }

      case 'ErrorPageFourHunderd':
        return (<CheckoutApp>{this.props.children}</CheckoutApp>);

      case 'ErrorPageFiveHunderd':
        return (<CheckoutApp>{this.props.children}</CheckoutApp>);

      case 'myAccount':
        return (<MyAccount pageCode={pageCode} user={this.props.user} push={this.props.push}>{this.props.children}</MyAccount>);
      case 'finance':
        return (<Finance pageCode={pageCode} >{this.props.children}</Finance>);
      case 'thirdparty':
        return (<ThirdPartyApp>{this.props.children}</ThirdPartyApp>);
      default:
        return <MainApp>{this.props.children}</MainApp>;
    }
  }
}

App.propTypes = {
  children: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { setPreviousLocation, setUserSession, push })(App);
