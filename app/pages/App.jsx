import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import CheckoutHeader from '../components/sections/Header/checkoutHeader';
import CheckoutFooter from '../components/sections/Footer/checkoutFooter';
import Loader from '../components/basic/common/loader';
import Studiow from './studiow';
//import { setUserSession } from '../components/compound/signin/actions';

import '../styles/main.scss';

const CheckoutApp = ({children}) => (<div className="app">
  <CheckoutHeader />
  <div className="grid-wrapper">
    {children}
  </div>
  <CheckoutFooter />
  <Loader />
</div>);

const MainApp = ({children}) => (<div className="app">
  <Header />
  <div className="grid-wrapper site-page content--centered">
    <main className="grid grid--space-y site-main">
      {children}
    </main>
    <Footer />
    <Loader />
  </div>
</div>);

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 */
class App extends Component {
  render() {
    const rounteProps = this.props.children.props.route;
    const pageType = rounteProps.pageType;
    if (pageType === 'checkout') {
      return (
        <CheckoutApp>{this.props.children}</CheckoutApp>
      );
    }
    if (pageType === 'studiow') {
      return (
        <Studiow />
      );
    }
    return <MainApp>{this.props.children}</MainApp>;
  }
}

App.propTypes = {
  children: PropTypes.object
};

 export default App;

// export default connect(mapStateToProps, { getTokenConfirmation })(App);

