import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CheckoutCrumbs from './components/checkout-crumbs';
import CheckoutDeliverySlot from './components/delivery-slot';
import DeliveryOptions from './components/delivery-options';
import OrderPayment from './components/payment';
import PaymentPortal from './components/payment-portal';
import OrderConfirmation from './components/order-confirmation';
import OrderSummaryAside from './components/order-summary-aside';
import ProductPrice from '../../components/basic/product-price';
// import { loader } from '../../actions/common';

import { setCheckoutActiveStep } from './actions';
import { getCart } from '../../components/sections/Header/actions';
import { getCurentUserAddresses } from '../../actions/users';
// import { getCart } from '../../components/sections/Header/actions';

class CheckoutPage extends Component {
  // static need = [getminiCartData];

  constructor(props) {
    super(props);
    this.state = {
      currentActiveStep: ''
    };
  }
  componentWillMount() {
    if (this.props.activeStep === null) {
      this.props.setCheckoutActiveStep('deliverySlot');
      // this.state.currentActiveStep = this.props.activeStep;
      this.state.currentActiveStep = 'deliverySlot';
    } else {
      this.state.currentActiveStep = 'deliverySlot';
    }
  }
  // ComponentDid
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.currentActiveStep !== nextProps.activeStep) {
      this.state.currentActiveStep = nextProps.activeStep;
      return true;
    }
    return false;
  }
  componentWillUnmount() {
    this.props.setCheckoutActiveStep('deliverySlot');
  }
  generateCheckoutSteps() {
    const activeStep = this.state.currentActiveStep;
    if (activeStep === 'deliverySlot') {
      return (<CheckoutDeliverySlot currentActiveStep={activeStep} setCheckoutActiveStep={this.props.setCheckoutActiveStep} labels={this.props.labels} />);
    } else if (activeStep === 'deliveryOptions') {
      return (<DeliveryOptions currentActiveStep={activeStep} setCheckoutActiveStep={this.props.setCheckoutActiveStep} labels={this.props.labels} />);
    } else if (activeStep === 'orderPayment') {
      return (<OrderPayment currentActiveStep={activeStep} setCheckoutActiveStep={this.props.setCheckoutActiveStep} labels={this.props.labels} />);
    } else if (activeStep === 'paymentPortal') { // For 3D Secure creditcards payment
      return (<PaymentPortal currentActiveStep={activeStep} setCheckoutActiveStep={this.props.setCheckoutActiveStep} labels={this.props.labels} />);
    } else if (activeStep === 'orderConfirmation') {
      return (<OrderConfirmation currentActiveStep={activeStep} setCheckoutActiveStep={this.props.setCheckoutActiveStep} labels={this.props.labels} />);
    }
    return null;
  }

  render() {
    return (
      <div className="siteContent forCheckout" role="main">
        <section className="contentWrapper">
          <div className="contentContainer">
            <article className="checkout">
              <header>
                <h1>Checkout</h1>
                <ul className="lists needHelp">
                  <li>
                    <span>Need help? </span>Call<span className="hide-on-mobi"> us on</span>:
                    <strong>
                      <Link href="tel:0860100987">0860 100 987</Link>
                    </strong>
                  </li>
                  <li>
                    <div id="headerId">
                      <span className="shoppingCart-Total">
                        <Link to="/checkout/cart">
                          <span className="price"><ProductPrice price={this.props.miniCartData.orderSummary.total} /></span>
                        </Link>
                      </span>
                    </div>
                  </li>
                  <li>
                    <a href="/">Home</a>
                  </li>
                </ul>
                <CheckoutCrumbs activeStep={this.state.currentActiveStep} />
              </header>
              {this.generateCheckoutSteps()}
              {this.state.currentActiveStep === 'orderConfirmation' ? '' : <OrderSummaryAside miniCartData={this.props.miniCartData} activeStep={this.state.currentActiveStep} labels={this.props.labelsOrderSum} currentUser={this.props.currentUser} user={this.props.user} />}
            </article>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addresses: state.user.addresses,
    activeStep: state.checkout.activeStep,
    labels: state.labels.labelsAndErrorMessages.CheckOut,
    currentUser: state.clp.currentUser,
    user: state.user,
    miniCartData: state.headerReducer.miniCartReducer.miniCartData,
    labelsOrderSum: state.labels.labelsAndErrorMessages.cart
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       setCheckoutActiveStep,
//       getCurentUserAddresses,
//       getminiCartData
//     },
//     dispatch
//   );
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setCheckoutActiveStep,
//     getCurentUserAddresses,
//     getminiCartData
//   };
// };
export default connect(mapStateToProps, {
  setCheckoutActiveStep,
  getCurentUserAddresses,
  getCart
})(CheckoutPage);

// const CheckoutPage = connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
// export default CheckoutPage;
