import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { postPaymentDetailsData, getPaymentDetailsData, deletePaymentDetailsData } from './actions';

class PaymentDetails extends Component {
  // static need = [getPaymentDetailsData];
  constructor(props) {
    super(props);
    this.state = {
      showAddNewCardForm: true,
      fldCardNickName: '',
      fldCardHolderName: '',
      fldCardType: 'Card Type',
      fldCardNumber: '',
      fldCardExpiryMonth: 'Month',
      fldCardExpiryYear: 'Year',
      formErrors: {}
    };
    this.renderFormErrorRequired = this.renderFormErrorRequired.bind(this);
    this.renderAddNewCardForm = this.renderAddNewCardForm.bind(this);
    this.renderPaymentDetailsPanel = this.renderPaymentDetailsPanel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddNewCard = this.handleAddNewCard.bind(this);
    this.handleAddCardSubmit = this.handleAddCardSubmit.bind(this);
    this.handleRemoveCardSubmit = this.handleRemoveCardSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getPaymentDetailsData();
  }
  handleAddNewCard() {
    if (this.state.showAddNewCardForm) {
      document.getElementById('addNewCard').style.display = 'block';
      this.setState({ showAddNewCardForm: false });
    } else {
      document.getElementById('addNewCard').style.display = 'none';
      this.setState({ showAddNewCardForm: true });
    }
  }
// Implementation of the Luhn algorithm
  isValidCardNumber(cardNumber) {
    let sum = 0;
    let alt = false;
    let i = cardNumber.length - 1;
    let num;
    while (i >= 0) {
        // get the next digit
      num = parseInt(cardNumber.charAt(i), 10);
        // if it's an alternate number...
      if (alt) {
        num *= 2;
        if (num > 9) {
          num = (num % 10) + 1;
        }
      }
        // flip the alternate bit
      alt = !alt;
        // add to the rest of the sum
      sum += num;
        // go to next digit
      i--;
    }
    // determine if it's valid
    return (sum % 10 === 0);
  }
  handleAddCardSubmit(e) {
    e.preventDefault();
    const formErrors = {};

    if (this.state.fldCardNickName === '' || this.state.fldCardHolderName === '' || this.state.fldCardType === 'Card Type' || this.state.fldCardNumber === '' || this.state.fldCardNumber.length < 13 || this.state.fldCardNumber.length > 19 || !this.isValidCardNumber(this.state.fldCardNumber) || isNaN(Number(this.state.fldCardNumber)) || (this.state.fldCardType !== 'wwcard' && (this.state.fldCardExpiryMonth === 'Month' || this.state.fldCardExpiryYear === 'Year'))) {
      return typeof window !== 'undefined' && window ? window.alert('Invalid Card Number. Please correct and try again.') : '';
    }
    if (_.compact(_.values(formErrors)).length === 0) {
      this.setState({ formErrors: {} });
      this.props.postPaymentDetailsData(this.state, () => { this.props.getPaymentDetailsData(); });
      this.setState({
        fldCardNickName: '',
        fldCardHolderName: '',
        fldCardType: 'Card Type',
        fldCardNumber: '',
        fldCardExpiryMonth: 'Month',
        fldCardExpiryYear: 'Year',
      });
      this.handleAddNewCard();
    } else {
      this.setState({ formErrors });
    }
  }
  handleCardType(cardType) {
    switch (cardType) {
      case 'visa':return (<p><strong>Card type:</strong> Visa&nbsp;<img src="https://www-win-qa.woolworths.co.za/images/icons/icon_visa.jpg" alt="WW Store Card" /></p>);
      case 'masterCard':return (<p><strong>Card type:</strong> Mastercard&nbsp;<img src="https://www-win-qa.woolworths.co.za/images/icons/icon_masterCard.jpg" alt="WW Store Card" /></p>);
      default:return (<p><strong>Card type:</strong> WW Store Card&nbsp;<img src="https://www-win-qa.woolworths.co.za/images/icons/icon_storeCard.jpg" alt="WW Store Card" /></p>);
    }
  }
  handleDelete(e, itemId) {
    e.preventDefault();
    e.target.parentNode.classList.add('hidden');
    document.getElementById(itemId).style.display = 'block';
  }
  handleNo(e, itemId) {
    e.preventDefault();
    document.getElementById('cardDetailsAction' + itemId).classList.remove('hidden');
    document.getElementById(itemId).style.display = 'none';
  }
  handleRemoveCardSubmit(e, itemId) {
    e.preventDefault();
    this.props.deletePaymentDetailsData(String(itemId));
    this.props.getPaymentDetailsData();
  }
  renderPaymentDetailsPanel() {
    const getPaymentDetails = _.get(this.props.getPaymentDetails, 'items', []);

    return (getPaymentDetails.map((item) => {
      return (
        <article className="panel-card panel--flex" key={item.id}>
          <form onSubmit={(e) => { this.handleRemoveCardSubmit(e, item.id); }} name="removeCard_usercc29250001">
            <header className="panel-card__header font-graphic text-caps"><h3>{item.nickname}&nbsp;</h3></header>
            <section className="panel-card__body">
              {this.handleCardType(item.creditCardType)}
              <p>
                <strong>Card number:</strong>  **** **** **** {item.creditCardNumber} </p><p><strong>Cardholder:</strong> {item.cardHolderName}
                </p>
              { item.creditCardType === 'visa' || item.creditCardType === 'masterCard' ? <p><strong>Expiry date:</strong>{item.expirationMonth}/{item.expirationYear}</p> : '' }
            </section>
            <footer className="panel-card__footer">
              <div className={'cardDetailsAction'} id={`cardDetailsAction${item.id}`}>
                <Link to="" onClick={(e) => { this.handleDelete(e, item.id); }} className="deleteCard strong text-small link--silent arrow-link--forward">Delete this card</Link>
              </div>
              <div id={item.id} className="confirm_actions text-small" style={{ display: 'none' }}>
                <input name="" type="submit" value="Confirm delete : Yes" className="btn btn--silent" />
                <span>|</span>
                <Link onClick={(e) => { this.handleNo(e, item.id); }} to="" className="link--silent btn btn--silent"> No</Link>
              </div>
            </footer>
          </form>
        </article>
      );
    })
    );
  }
  renderAddNewCardForm() {
    return (<div id="addNewCard" className="grid__two-thirds--large" style={{ display: 'none' }}><br />
      <h3 className="font-graphic">Add a new card</h3>
      <form name="frmCardDetailsForm" onSubmit={e => this.handleAddCardSubmit(e)} id="frmCardDetailsForm" className="contactForm addCard ">
        <div className="form-field" data-js="form-field">
          <input
            data-validate-required="true" data-js="validate-field" name="cardNickName" id="fldCardNickName" placeholder="Card nickname*" value={this.state.fldCardNickName}
            onChange={evt => this.setState({ fldCardNickName: evt.target.value })} type="text" className="stdFld"
          />
          {this.renderFormErrorRequired(this.state.formErrors.fldCardNickName)}
        </div>
        <div className="form-field" data-js="form-field">
          <input
            value={this.state.fldCardHolderName} onChange={evt => this.setState({ fldCardHolderName: evt.target.value })} maxLength="40" data-validate-required="true" data-js="validate-field" name="cardHolderName" id="fldCardHolderName" placeholder="Cardholder name*" type="text" className="stdFld"
          />
          {this.renderFormErrorRequired(this.state.formErrors.fldCardHolderName)}
        </div>
        <div className="form-field" data-js="form-field">
          <div className="grid__half--large" data-js="validate-field" data-validate-required="true">
            <span className="enhanced-select">
              <select data-js="enhance-select" name="cardType" onChange={evt => this.setState({ fldCardType: evt.target.value })} id="fldCardType" className="customSelectSmall">
                <option value="Card Type">Card Type</option>
                <option value="visa">Visa</option>
                <option value="wwcard">Store Card</option>
                <option value="masterCard">Master Card</option>
              </select>
              <span className="enhanced-select__label">{this.state.fldCardType === 'wwcard' ? 'Store Card' : this.state.fldCardType}&nbsp;</span>
              <span className="icon enhanced-select__icon" />
            </span>
          </div>
          {this.renderFormErrorRequired(this.state.formErrors.fldCardType)}
        </div>
        <div className="form-field" data-js="form-field">
          <input
            maxLength="16" value={this.state.fldCardNumber} onChange={evt => this.setState({ fldCardNumber: evt.target.value })} data-validate-required="true" data-js="validate-field" name="cardNumber" id="fldCardNumber" placeholder="Card number*" type="text" className=""
          />
          {this.renderFormErrorRequired(this.state.formErrors.fldCardNumber)}
        </div>
        { this.state.fldCardType !== 'wwcard' ?
          <div id="expiryDates" className="form-field">
            <label htmlFor="fldCardExpiryMonth" className="text-small">Expiry date*: </label>
            <div className="form-field" data-js="form-field">
              <div className="grid">
                <span className="grid__half">
                  <span className="enhanced-select">
                    <select data-js="enhance-select" onChange={evt => this.setState({ fldCardExpiryMonth: evt.target.value })} name="cardExpiryMonth" id="fldCardExpiryMonth" className="expiryMonth">
                      <option value="Month" data-validate-unselected="true">Month</option>
                      <option value="1">1</option><option value="2">2</option>
                      <option value="3">3</option><option value="4">4</option>
                      <option value="5">5</option><option value="6">6</option>
                      <option value="7">7</option><option value="8">8</option>
                      <option value="9">9</option><option value="10">10</option>
                      <option value="11">11</option><option value="12">12</option>
                    </select>
                    <span className="enhanced-select__label">{this.state.fldCardExpiryMonth}&nbsp;</span>
                    <span className="icon enhanced-select__icon" />
                  </span>
                </span>
                <span className="grid__half">
                  <span className="enhanced-select">
                    <select data-js="enhance-select" onChange={evt => this.setState({ fldCardExpiryYear: evt.target.value })} name="cardExpiryYear" id="fldCardExpiryYear" className="expiryYear">
                      <option value="Year" data-validate-unselected="true">Year</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                    </select>
                    <span className="enhanced-select__label">{this.state.fldCardExpiryYear}&nbsp;</span>
                    <span className="icon enhanced-select__icon" />
                  </span>
                </span>
              </div>
              {this.renderFormErrorRequired(this.state.formErrors.fldCardExpiryMonth)}
            </div>
          </div> : ''
        }
        <p className="text-small">*Required fields</p>
        <div className="submitField">
          <button type="submit" id="submitButton" className="btn btn--primary btn--right">Save Details</button>
          <button type="reset" className="btn btn--silent cancel-btn" id="fldCancel" name="cancel" data-js="content-toggle" data-toggle-target="addNewCard" onClick={this.handleAddNewCard}>Cancel<span className="icon" />
          </button>
        </div>
      </form>
    </div>);
  }
  renderFormErrorRequired(error) {
    const { formErrors } = this.state;
    if (formErrors) {
      return (
        <span className="form-field__msg form-field__msg--error">{error}</span>
      );
    }

    return null;
  }
  render() {
    return (
      <div className="page-layout__content">
        <section className="grid grid--space-y">
          <p className="text-intro">Save your card details here for extra convenience when shopping online</p>
          <div className="cardHolder flex-parent">
            {this.renderPaymentDetailsPanel()}
          </div>
          <div>
            <button className="btn btn--primary btn--right " data-js="content-toggle" data-toggle-target="addNewCard" onClick={this.handleAddNewCard}>Add a New Card</button>
          </div>
          {this.renderAddNewCardForm()}
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    addPaymentDetails: state.myDetailReducer.paymentDetailsReducer.addPaymentDetails,
    getPaymentDetails: state.myDetailReducer.paymentDetailsReducer.getPaymentDetails,
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ postPaymentDetailsData, getPaymentDetailsData, deletePaymentDetailsData }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(PaymentDetails);
