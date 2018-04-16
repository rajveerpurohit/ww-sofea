import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { confirmUserLogin } from '../registration/actions';

class Otp extends Component {
  constructor(props) {
    super(props);
    const { customer } = this.props;
    this.state = {
      regForm: {
        oneTimePin: '',
        customerId: customer && customer.customerId
      },
      errMsg: false
    };
    this.confirmUserLogin = this.confirmUserLogin.bind(this);
  }
  handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
  }
  confirmUserLogin() {
    const { customer, idenificationNumber } = this.props;
    const { regForm, errMsg } = this.state;
    const pagetype = this.props.pagetype ? this.props.pagetype : '';
    if (customer.customerId && regForm.oneTimePin) {
      this.props.confirmUserLogin(regForm, 'confirmcustomerlogin', this.props.pagetype);
      this.setState({
        errMsg: false
      });
    } else {
      this.setState({
        errMsg: true
      });
    }
  }
  render() {
    const { customer, idenificationNumber, otpSuccess } = this.props;
    const { regForm, errMsg } = this.state;
    if (this.props.modal) {
      return (<div className="grid grid--space-y">
        <h2 className="text-caps font-graphic">We've Found You</h2>
        <hr className="hr--light" />
        <p>An SMS with a One Time Pin (OTP) has been sent to your cell phone number <strong><span id="found_cell_number">{customer && customer.contactNumber}</span></strong></p>
        <form method="post" name="resendOTP" data-js="validate-form" className="wForm">
          <div className="form-field">
            <button type="button" id="resendOTP" name="resendOTP" className="btn btn--primary btn--right" value="Resend PIN" onClick={() => this.props.confirmUserLogin({ customerId: customer.customerId, idenificationNumber }, 'resendotp')}>Resend PIN</button>
          </div>
          <br />
          <hr className="hr--light" />
        </form>
        <form method="post" name="ajaxfrmSubmitOTP" data-js="validate-form" className="wForm">
          <p>Please confirm that this is you by entering the OTP sent to you:</p>
          <div className="form-field form-field--enhanced-label" data-js="form-field">
            <label htmlFor="fldCardOTP" data-js="enhance-label" className="form-field__label--enhanced">One Time Pin*</label>
            <input name="cardOTP" id="fldCardOTP" type="text" value={regForm.oneTimePin} onChange={event => this.handleInputChange(event, 'regForm', 'oneTimePin')} className="stdFld float-left narrowField" />
            {errMsg ? <span className="form-field__msg form-field__msg--error">Please Enter OTP</span> : ''}
            {otpSuccess.formexceptions ? <span className="form-field__msg form-field__msg--error">{otpSuccess.formexceptions[0].message}</span> : null }
          </div>
          <div className="formErrors float-left">The OTP is you entered is incorrect. Please try again.</div>
          <div className="form-field">
            <button type="button" id="fldListSubmit" name="listSubmit" className="btn btn--primary btn--right" value="Submit Pin" onClick={() => this.confirmUserLogin()}>Submit Pin</button>
          </div>
        </form>
        <div className="help-block">
          <h3 className="text-caps font-graphic">Need Help?</h3>
          <p>If the phone number above is incorrect or you did not receive your One Time Pin (and have already tried resending it), please contact us for assistance.</p>
          <p className="hide-on-mobi">Call us on: <strong>0860 022 002</strong>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Email us: <a href="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</a></p>
        </div>
      </div>);
    }
    return (
      <main className="site-main grid">
        <div className="grid grid--space-y">
          <section className="grid">
            <div className="grid__two-thirds--large panel--padded">
              <h1 className="font-graphic text-caps">We've found you!</h1>
              <p className="text-intro">An sms containing a One Time Pin has been sent to your cell phone:</p>
              <p className="text-intro">Your number: {customer && customer.contactNumber}</p>
              <p className="text-intro">Please confirm that this is you by entering the One Time Pin below:</p>
              <form name="submitOTP" id="frmSubmitOTP">
                <div className="form-field" data-js="form-field">
                  <div className="grid__third--medium">
                    <input name="cardOTP" id="fldCardOTP" type="text" placeholder="One Time Pin" value={regForm.oneTimePin} onChange={event => this.handleInputChange(event, 'regForm', 'oneTimePin')} />
                    {errMsg ? <span className="form-field__msg form-field__msg--error">Please Enter OTP</span> : ''}
                    {otpSuccess.formexceptions ? <span className="form-field__msg form-field__msg--error">{otpSuccess.formexceptions[0].message}</span> : null }
                  </div>
                  <div className="grid__three-fourths--medium">
                    <br /><input name="resendOneTimePin" className="btn btn--silent text-small flush grid--space-y" type="button" value="Resend Pin" onClick={() => this.props.confirmUserLogin({ customerId: customer.customerId, idenificationNumber }, 'resendotp')} />
                    <span className="icon icon--right-circ-dark" /></div>
                </div>
                <div className="form-field">
                  <input name="listSubmit" className="btn btn--primary" id="fldListSubmit" type="button" value="Next" onClick={() => this.confirmUserLogin()} />
                </div>
              </form>
              <p>
                <Link to="/login" onClick={() => { this.props.isLogin(true); }} className="btn btn--silent text-small flush grid--space-y">Back to Log In<span className="icon icon--right-circ-dark" /></Link>
              </p>
            </div>
            <div className="grid__third--large">
              <article className="connectCardMessage panel panel--padded">
                <h3>Help</h3>
                <p className="text-small">If this is not your correct number, or you did not receive your One Time PIN (and have already tried resending it), or you would like to speak to someone for assistance:</p>
                <p className="text-small">Woolworths Customer Services <br /><a href="tel:0860 022 002">0860 022 002</a><br /><a href="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</a></p>
                <p className="text-small">Woolworths Online<br /><a href="tel:0860 100 987">0860 100 987</a><br /><a href="mailto:shop@woolworths.co.za">shop@woolworths.co.za</a></p>
              </article>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customer: state.createUserReducer.createUser.createUser,
    otpSuccess: state.createUserReducer.createUser.otpSuccess,
    idenificationNumber: state.createUserReducer.createUser.idenificationNumber,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ confirmUserLogin }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Otp);
