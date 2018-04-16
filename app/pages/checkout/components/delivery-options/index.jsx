import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { updateshippinginstructions, getUtilityServiceforPayment } from '../../actions';
// import ServiceUtil from '../../../../services/serviceUtil';

class DeliveryOptions extends Component {
  constructor() {
    super();
    this.state = {
      giftMessageEabled: 'false',
      remainingCharacters: 240,
      specialInstructions: 'YES',
      groceryDelivery: 'false'
    };

    this.deliveryOptionSubmit = this.deliveryOptionSubmit.bind(this);
    this.giftMessageEabled = this.giftMessageEabled.bind(this);
    this.goBackBtn = this.goBackBtn.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  getCount(e) {
    this.setState({ remainingCharacters: 240 - e.target.value.length });
  }

  deliveryOptionSubmit(event) {
    event.preventDefault();

    const { specialInstructions, deliveryMessage, groceryDelivery, giftOption, giftMessage } = this.deliveryFinal;
    let plasticBag = groceryDelivery !== undefined ? (groceryDelivery.value === 'true') : false;
    const mockdata = {
      substituesAllowed: specialInstructions.value,
      deliverySpecialInstructions: deliveryMessage.value,
      plasticBags: plasticBag,
      giftNoteSelected: (giftOption.value === 'true'),
      giftMessage: (giftOption.value === 'true' ? giftMessage.value : '')
    };
    this.props.updateshippinginstructions(mockdata)
    .then((res) => {
      if (res.success === true) {
        this.props.setCheckoutActiveStep('orderPayment');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  giftMessageEabled(e) {
    // console.log('giftMessageEabled ', e.target.value);
    this.setState({ giftMessageEabled: e.target.value });
  }
  goBackBtn(event) {
    this.props.setCheckoutActiveStep('deliverySlot');
  }
  renderShoppingBags(labels, checkboxStyles) {
    return (
      <section className="checkoutCheckboxes">
        <p>
          <strong>{labels['global-checkout-shopping-bags-label']}</strong>
        </p>
        <p>{labels['global-checkout-shopping-bags-txt-label']}</p>
        <fieldset>
          <div className="customRadio" id="uniform-shoppingBags">
            <span className={this.state.groceryDelivery === 'true' ? 'checked' : ''}>
              <input name="groceryDelivery" id="shoppingBags" type="radio" value="true" onClick={(e) => { this.setState({ groceryDelivery: e.target.value }); }} className="customRadio" />
            </span>
          </div>
          <label htmlFor="shoppingBags">{labels['global-checkout-shopping-bags-bags-label']}</label>
        </fieldset>
        <fieldset>
          <div className="customRadio" id="uniform-box">
            <span className={this.state.groceryDelivery === 'false' ? 'checked' : ''}>
              <input name="groceryDelivery" id="box" type="radio" value="false" onClick={(e) => { this.setState({ groceryDelivery: e.target.value }); }} className="customRadio" defaultChecked />
            </span>
          </div>
          <label htmlFor="box">{labels['global-checkout-shopping-bags-box-label']}</label>
        </fieldset>
      </section>
    );
  }
  renderSpecialInstruction(payload, labels, styles) {
    const fieldset = [];
    payload.forEach((options, index) => {
      if (options === 'YES') {
        fieldset.push(
          <fieldset key={options}>
            <div className="customRadio" id="uniform-fldSubstitutions">
              <span className={this.state.specialInstructions === options ? 'checked' : ''}>
                <input name="specialInstructions" id="fldSubstitutions" type="radio" value="YES" onClick={(e) => { this.setState({ specialInstructions: e.target.value }); }} className="customRadio" defaultChecked />
              </span>
            </div>
            <label htmlFor="fldSubstitutions">{labels['global-checkout-substitutions-label']}</label>
          </fieldset>
        );
      } else if (options === 'YES_CALL_CONFIRM') {
        fieldset.push(
          <fieldset key={options}>
            <div className="customRadio" id="uniform-fldConfirm">
              <span className={this.state.specialInstructions === options ? 'checked' : ''}>
                <input name="specialInstructions" id="fldConfirm" type="radio" value={options} onClick={(e) => { this.setState({ specialInstructions: e.target.value }); }} className="customRadio" />
              </span>
            </div>
            <label htmlFor="fldConfirm">{labels['global-checkout-confirm-label']}</label>
          </fieldset>
        );
      } else if (options === 'NO') {
        fieldset.push(
          <fieldset key={options}>
            <div className="customRadio" id="uniform-fldDont">
              <span className={this.state.specialInstructions === options ? 'checked' : ''}>
                <input name="specialInstructions" id="fldDont" type="radio" value={options} onClick={(e) => { this.setState({ specialInstructions: e.target.value }); }} className="customRadio" />
              </span>
            </div>
            <label htmlFor="fldDont">{labels['global-checkout-dont-label']}</label>
          </fieldset>
        );
      }
    });
    return (
      <section className="checkoutCheckboxes">
        <h3>{labels['global-checkout-special-instruction-label']}</h3>
        <p>{labels['global-checkout-special-instruction-note-label']}</p>
        {fieldset}
      </section>
    );
  }
  render() {
    const labels = this.props.labels;
    const payload = this.props.deliveryOptions;
    const checkboxStyles = { opacity: 0 };
    const giftMsgStyles = {
      display: (this.state.giftMessageEabled === 'true') ? 'block' : 'none'
    };
    return (
      <article className="mainColCheckout">
        <form name="deliveryFinal" id="frmDeliveryFinal" ref={(form) => { this.deliveryFinal = form; }} className="wForm checkoutForm" onSubmit={this.deliveryOptionSubmit} >
          <h2>YOUR DELIVERY</h2>
          {payload.substituesAllowed ? this.renderSpecialInstruction(payload.substituesAllowed, labels, checkboxStyles) : ''}
          <section>
            <p>
              <strong>{labels['global-checkout-delivery-instruction-heading-label']}</strong>
            </p>
            <p>{labels['global-checkout-delivery-instruction-note-label']}</p>
            <fieldset>
              <textarea
                name="deliveryMessage"
                id="fldDeliveryMessage"
                rows="8"
                cols="40"
                defaultValue={payload.shipAddressSplInstructions}
                className="charLimit"
              />
              <p className="disclaimer">{labels['global-checkout-delivery-instruction-disclaimer-label']}</p>
            </fieldset>
          </section>
          {payload.containsFoodItem ? this.renderShoppingBags(labels, checkboxStyles) : ''}
          <section className="checkoutCheckboxes giftDetails">
            <h4>{labels['global-checkout-is-this-gift-label']}</h4>
            <fieldset>
              <div className="customRadio" id="uniform-Yes">
                <span className={this.state.giftMessageEabled === 'true' ? 'checked' : ''}>
                  <input name="giftOption" id="Yes" type="radio" value="true" className="customRadio" onClick={this.giftMessageEabled} />
                </span>
              </div>
              <label htmlFor="Yes">{labels['global-checkout-is-this-gift-yes-label']}</label>
            </fieldset>
            <fieldset>
              <div className="customRadio" id="uniform-No">
                <span className={this.state.giftMessageEabled === 'false' ? 'checked' : ''}>
                  <input name="giftOption" id="No" type="radio" value="false" className="customRadio" onClick={this.giftMessageEabled} defaultChecked />
                </span>
              </div>
              <label htmlFor="No">{labels['global-checkout-is-this-gift-no-label']}</label>
            </fieldset>
          </section>
          <section style={giftMsgStyles}>
            <p><strong>Write a gift message</strong></p>
            <fieldset>
              <textarea
                maxLength="240"
                onChange={this.getCount}
                className="charLimit restricted-char" id="fldGiftMessage" name="giftMessage" rows="8" cols="40" />
              <p className="information characters"><span className="charCount">{this.state.remainingCharacters}</span> characters</p>
            </fieldset>
          </section>
          <section className="fieldsetFooter">
            <p className="floatL noMargT">
              <Link className="prevLink" onClick={this.goBackBtn}>{labels['global-checkout-go-back-label']}</Link>
            </p>
            <input type="submit" value="save &amp; continue" className="button floatR" />
          </section>
        </form>
      </article>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    deliveryOptions: state.checkout.deliveryOption
  };
};
export default connect(mapStateToProps, {
  updateshippinginstructions,
  getUtilityServiceforPayment
})(DeliveryOptions);
