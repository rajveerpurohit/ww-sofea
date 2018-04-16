import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import AriaModal from 'react-aria-modal';
import Otp from '../../pages/otp';
import { getUserCardDetails } from '../../pages/registration/actions';

class OtpModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripleRegisterForm: { idNumber: '' },
      showErrMsg: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
  }
  getUserCardDetails() {
    const { showErrMsg, tripleRegisterForm } = this.state;
    if (tripleRegisterForm.idNumber) {
      this.props.getUserCardDetails(tripleRegisterForm.idNumber);
      this.setState({ showErrMsg: false });
    } else {
      this.setState({ showErrMsg: true });
    }
  }
  handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
  }
  deactivateModal() {
    this.props.deactivateModal();
  }
  render() {
    const { customer, otpSuccess } = this.props;
    const { tripleRegisterForm, showErrMsg } = this.state;
    return (
      <AriaModal
        titleText="otpfancybox"
        className="fancybox-wrap fancybox-desktop fancybox-type-ajax"
        initialFocus="#otpfancybox"
        verticallyCenter
        onExit={this.deactivateModal}
      >
        <div className="modal__box modal__box--panel modal__box--size-w-large" tabIndex="-1">
          <Link className="icon icon--close-circ-dark modal__close" onClick={this.deactivateModal}>close
          </Link>
          <div className="modal__content">
            <div id="otpfancybox" className="modal-target is-open">
              {otpSuccess && otpSuccess.customerId ?
                <section className="checkout-fancybox">
                  <h2>Thanks For Adding Your Card!</h2>
                  <hr />
                  <p className="intro">Your card has been added to your online profile<span className="show_disclaimer">*</span>, and you will receive 10% off 1000s of <strong>W</strong>Rewards items when shopping online. Don't forget to pay with your Woolies card for extra savings.</p>
                  <input type="button" id="btnSubmit" className="btn btn--primary btn--right" onClick={this.deactivateModal} value="Continue to Basket" />
                  <br />
                  <div className="show_disclaimer">
                    <br />
                    <hr />
                    <p className="disclaimer">* Please note: Your online profile details have been updated to those on record with Woolworths Financial Services.</p>
                  </div>
                </section> :
                customer && customer.contactNumber ?
                  <Otp modal pagetype={this.props.pagetype} /> :
                  <section id="fancybox-content">
                    <h1 className="text-caps font-graphic">Get Instant Savings with WRewards</h1>
                    <hr className="hr--light" />
                    <h3 className="text-caps font-graphic">Get instant savings on over 1000 items simply by adding your WRewards card, MySchool card*, or your Woolworths Store or Credit card to your profile. Start the process:</h3>
                    <div className="grid__half--medium">
                      <form data-scenario="1" name="tripleRegisterForm" id="tripleRegisterForm" className="wForm">
                        <fieldset className="noMargT">
                          <input
                            id="fldIdPassport"
                            name="idNumber"
                            type="text"
                            value={tripleRegisterForm.idNumber}
                            onChange={event => this.handleInputChange(event, 'tripleRegisterForm', 'idNumber')} placeholder="Enter your ID or Passport Number" className="stdFld narrowField float-left"
                          />
                          {showErrMsg ? <span className="form-field__msg form-field__msg--error">Enter your ID or Passport Number</span> : <span className="form-field__msg form-field__msg--error">{customer.formexceptions && customer.formexceptions[0].message}</span>}
                        </fieldset>
                        <input type="button" onClick={() => this.getUserCardDetails()} id="fldListSubmit" name="listSubmit" className="btn btn--primary btn--right" value="Submit" />
                        <p className="submit-link float-left hide-on-mobi "><Link onClick={this.deactivateModal}>Return to basket</Link></p>
                      </form>
                      <br />
                      <p className="disclaimer ">* Please note: We can only add your MySchool card if you have allowed Woolworths to contact you in your MySchool settings.</p>
                      <hr className="hr--light" />
                    </div>
                  </section>}
            </div></div>
        </div>
      </AriaModal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customer: state.createUserReducer.createUser.createUser,
    otpSuccess: state.createUserReducer.createUser.otpSuccess
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserCardDetails }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(OtpModel);
