import React, { Component } from 'react';
// import { connect } from 'react-redux';

class CheckoutCrumbs extends Component {
//   constructor(props) {
//     super(props);
//   }
  createCrumbsMarkup() {
    // const aStep = this.props.activeStep;
    // const crumbs = `
    //       <li className="prevElem">
    //         <p>About you</p>
    //       </li>
    //       <li className="${(aStep === 'deliverySlot' || aStep === 'deliveryOptions') ? 'currentElem' : 'prevElem'}">
    //         <p>Delivery</p>
    //       </li>
    //       <li className="${(aStep === 'orderPayment' && aStep !== 'deliverySlot' && aStep !== 'deliveryOptions') ? 'currentElem' : 'prevElem'}">
    //         <p>Payment</p>
    //       </li>
    //       <li className="last-checkoutCrumbs ${(aStep === 'orderPayment') ? 'currentElem' : ''}">
    //         <p>Confirmation</p>
    //       </li>
    // `;
    // return { __html: crumbs };
    // <ul dangerouslySetInnerHTML={this.createCrumbsMarkup()} />
    if (this.props.activeStep === 'deliverySlot' || this.props.activeStep === 'deliveryOptions') {
      return (
        <ul>
          <li className="prevElem">
            <p>About you</p>
          </li>
          <li className="currentElem">
            <p>Delivery</p>
          </li>
          <li>
            <p>Payment</p>
          </li>
          <li className="last-checkoutCrumbs">
            <p>Confirmation</p>
          </li>
        </ul>
      );
    } else if (this.props.activeStep === 'orderPayment') {
      return (
        <ul>
          <li className="prevElem">
            <p>About you</p>
          </li>
          <li className="prevElem">
            <p>Delivery</p>
          </li>
          <li className="currentElem">
            <p>Payment</p>
          </li>
          <li className="last-checkoutCrumbs">
            <p>Confirmation</p>
          </li>
        </ul>
      );
    } else if (this.props.activeStep === 'orderConfirmation') {
      return (
        <ul>
          <li className="prevElem">
            <p>About you</p>
          </li>
          <li className="prevElem">
            <p>Delivery</p>
          </li>
          <li className="prevElem">
            <p>Payment</p>
          </li>
          <li className="last-checkoutCrumbs currentElem">
            <p>Confirmation</p>
          </li>
        </ul>
      );
    }
    // return null;
  }
  render() {
    console.log('checkoutCrumbs', this.props.activeStep);
    return (
      <nav className="checkoutCrumbs">
        {this.createCrumbsMarkup()}
      </nav>
    );
  }
}
export default CheckoutCrumbs;
