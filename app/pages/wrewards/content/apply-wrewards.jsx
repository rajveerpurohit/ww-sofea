import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import OtpModel from '../../../pages/otp/otpModel';
import { DEFAULT_DATE_PICKER_DATE_FORMAT } from '../../../Constants';
import DatePicker from '../../../components/basic/datepicker';
import { validateAppliedRewards, registerForWrewards } from '../actions';

class ApplyWrewards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      fldEmail: '',
      fldIDNumber: '',
      fldDOB: '',
      fldTitle: 'Select a Title*',
      fldFirstName: '',
      fldLastName: '',
      fldEmailAddress: '',
      fldContactNumber: '',
      mySchoolMember: '',
      mySchoolCardNumber: '',
      fldWRewardsCardNumber: '',
      signUpMySchool: 'No',
      fldchkwoolworths: false,
      fldchkwfs: false,
      fldchkmySchool: false,
      fldtermsrewards: false,
      fldtermsmyShool: false,
      fieldHavingFocus: '',
      formErrors: {},
      isFormHasErrors: false,
      isForm2HasErrors: false,
    };
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.handleValidateAppliedRewards = this.handleValidateAppliedRewards.bind(this);
    this.handleSubmitApplicationFormWRewards = this.handleSubmitApplicationFormWRewards.bind(this);
    this.renderFormErrorRequired = this.renderFormErrorRequired.bind(this);
    this.renderFormErrorElm = this.renderFormErrorElm.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  activateModal() {
    this.setState({ modalActive: true });
  }
  deactivateModal() {
    this.setState({
      modalActive: false
    });
  }
  formatDate(date) {
    try {
      let _date = date;

      if (typeof date === 'string') {
        _date = moment(new Date(date.split(' ')[0]));
      }

      return _date.format(DEFAULT_DATE_PICKER_DATE_FORMAT);
    } catch (e) {
      return '';
    }
  }
  handleChange(date) {
    this.setState({
      fldDOB: date
    });
  }
  handleFocus(evt, field) {
    if (evt) evt.preventDefault();
    this.setState({ fieldHavingFocus: field });
  }
  handleBlur(evt) {
    if (evt) evt.preventDefault();
    this.setState({ fieldHavingFocus: '' });
  }
  handleKeyUp() {
    if (!isNaN(Number(this.state.fldIDNumber)) && this.state.fldIDNumber.length >= 12) {
      document.getElementsByClassName('datepicker')[0].style.display = 'none';
      this.setState({ fldDOB: '' });
    } else {
      document.getElementsByClassName('datepicker')[0].style.display = 'block';
    }
  }
  handleValidateAppliedRewards(e) {
    e.preventDefault();
    const formErrors = {};
    if (this.state.fldEmail === '') {
      formErrors.fldEmail = 'This is a required field';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.fldEmail)) {
      formErrors.fldEmail = 'Please enter a valid email address';
    }
    if (this.state.fldIDNumber === '') {
      formErrors.fldIDNumber = 'This is a required field';
    }
    if (this.state.fldDOB === '' && this.state.fldIDNumber.length < 12) {
      formErrors.fldDOB = 'This is a required field';
      // matches a date in yyyy-mm-dd format from 1900-01-01 through 2099-12-31
    } else if (!/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i.test(this.state.fldDOB) && this.state.fldIDNumber.length < 12) {
      formErrors.fldDOB = 'Please enter a date in the format YYYY-MM-DD';
    }
    if (_.compact(_.values(formErrors)).length === 0) {
      this.setState({ formErrors: {}, isFormHasErrors: false });
      this.props.validateAppliedRewards(this.state, () => {
        const { firstName, lastName, email, primaryContactNo, rewardsCardNo, loginExists, isLoggedIn, emailIdMatched, isLinked, OTPSucceeded } = this.props.validateAppliedRewardsData;
        if (loginExists && isLoggedIn === 'true' && emailIdMatched === 'true' && isLinked === 'false' && OTPSucceeded) {
          this.activateModal();
        } else if (loginExists && isLoggedIn === 'false') {
          browserHistory.push({ pathname: '/login' });
        } else if (loginExists === false) {
          this.setState({ fldFirstName: firstName, fldLastName: lastName, fldEmailAddress: email, fldContactNumber: primaryContactNo, fldWRewardsCardNumber: rewardsCardNo });
        }
      });
    } else {
      this.setState({ formErrors, isFormHasErrors: true });
    }
  }
  handleSubmitApplicationFormWRewards(e) {
    e.preventDefault();
    const formErrors = {};
    if (this.state.fldTitle === 'Select a Title*') {
      formErrors.fldTitle = 'This is a required field';
    }
    if (this.state.fldFirstName === '') {
      formErrors.fldFirstName = 'This is a required field';
    }
    if (this.state.fldLastName === '') {
      formErrors.fldLastName = 'This is a required field';
    }
    if (this.state.fldEmailAddress === '') {
      formErrors.fldEmailAddress = 'This is a required field';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.fldEmailAddress)) {
      formErrors.fldEmailAddress = 'Please enter a valid email address';
    }
    if (this.state.fldContactNumber === '') {
      formErrors.fldContactNumber = 'This is a required field';
    }
    if (_.compact(_.values(formErrors)).length === 0) {
      if (this.state.fldtermsrewards === false) {
        formErrors.fldtermsrewards = 'You need to accept the terms and conditions to continue.';
      }
      if (this.state.fldtermsmyShool === false && this.state.signUpMySchool === 'Yes') {
        formErrors.fldtermsrewards = 'You need to accept the terms and conditions to continue.';
      }
      if (_.compact(_.values(formErrors)).length === 0) {
        this.setState({ formErrors: {}, isForm2HasErrors: false });
        const data = {
          newAtgUser: 'false',
          password: '',
          confirmPasswordTemp: '',
          acceptTermsWR: this.state.fldtermsrewards,
          acceptTermsMS: this.state.fldtermsmyShool,
          consent_Woolworths: this.state.fldchkwoolworths,
          consent_WFS: this.state.fldchkwfs,
          consent_Myschool: this.state.fldchkmySchool,
          alreadyMySchoolMember: this.state.mySchoolMember === 'Yes',
          WODTrigger: '1',
          idNumber: this.props.validateAppliedRewardsData.CustomerDetails.idNumber,
          passportNumber: this.props.validateAppliedRewardsData.CustomerDetails.passportNumber,
          differenceCardNumber: this.state.fldWRewardsCardNumber,
          title: this.state.fldTitle,
          initials: this.state.fldFirstName.charAt(0),
          firstName: this.state.fldFirstName,
          lastName: this.state.fldLastName,
          gender: this.props.validateAppliedRewardsData.gender,
          sDateOfBirth: this.state.fldDOB,
          primaryContact: this.state.fldContactNumber,
          mySchoolId: this.state.mySchoolCardNumber,
          emailAddress: this.state.fldEmailAddress,
          storeApplication: 'false',
          atgProfileID: this.props.validateAppliedRewardsData.profileId
        };
        this.props.registerForWrewards(data);
      } else {
        this.setState({ formErrors, isForm2HasErrors: true });
      }
    } else {
      this.setState({ formErrors, isForm2HasErrors: true });
    }
  }
  renderApplicationForm(displayForm) {
    return (<div className="grid grid--space-y dashboardBlock bottom-section checkout-fancybox applicationForm hidden" style={displayForm}>
      <div className="grid grid--space-y">
        <h3 className="text-caps font-graphic">Please confirm your details to complete your application</h3>
        <section className="0  "><article className="">
          <section className="accordionContent">
            <div className="grid__half--medium ">
              <form noValidate="true" method="post" data-js="validate-form" name="frmCheckoutAboutYouSignUp" id="frmCheckoutAboutYouSignUp" className="wForm">
                {this.renderFormErrorElm(this.state.isForm2HasErrors)}
                <div className="form-field" data-js="form-field">
                  <div data-js="validate-field" data-validate-required="true">
                    <span className="enhanced-select">
                      <select name="title" id="fldTitle" data-js="enhance-select" onChange={(e) => { this.setState({ fldTitle: e.target.value }); }}>
                        <option data-validate-unselected="true" id="0" value="Select a Title*">Select a Title*</option>
                        <option data-key="1" id="1" value="1|DR">DR</option>
                        <option data-key="2" value="2|MR">MR</option>
                        <option data-key="3" value="3|MRS">MRS</option>
                        <option data-key="4" value="4|MS">MS</option>
                        <option data-key="5" value="5|PROF">PROF</option>
                      </select>
                      <span className="enhanced-select__label">{this.state.fldTitle === 'Select a Title*' ? this.state.fldTitle : this.state.fldTitle.substring(2)}&nbsp;</span>
                      <span className="icon enhanced-select__icon" />
                    </span>
                  </div>
                  {this.renderFormErrorRequired(this.state.formErrors.fldTitle)}
                </div>
                <div className="form-field form-field--enhanced-label" data-js="form-field">
                  <label
                    htmlFor="fldFirstName" data-js="enhance-label" className={classnames('form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.fldFirstName) || this.state.fieldHavingFocus === 'fldFirstName'
                    })}
                  >First name*</label>
                  <input maxLength="40" data-validate-required="true" tabIndex="1" data-js="validate-field" name="fldFirstName" id="fldFirstName" type="text" value={this.state.fldFirstName} onChange={evt => this.setState({ fldFirstName: evt.target.value })} onFocus={e => this.handleFocus(e, 'fldFirstName')} onBlur={this.handleBlur} />
                  {this.renderFormErrorRequired(this.state.formErrors.fldFirstName)}
                </div>
                <div className="form-field form-field--enhanced-label" data-js="form-field">
                  <label
                    htmlFor="fldLastName" data-js="enhance-label" className={classnames('form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.fldLastName) || this.state.fieldHavingFocus === 'fldLastName'
                    })}
                  >Last name*</label>
                  <input maxLength="40" data-validate-required="true" tabIndex="2" data-js="validate-field" name="fldLastName" id="fldLastName" type="text" value={this.state.fldLastName} onChange={evt => this.setState({ fldLastName: evt.target.value })} onFocus={e => this.handleFocus(e, 'fldLastName')} onBlur={this.handleBlur} />
                  {this.renderFormErrorRequired(this.state.formErrors.fldLastName)}
                </div>
                <div className="form-field form-field--enhanced-label" data-js="form-field">
                  <label
                    htmlFor="fldEmailAddress" data-js="enhance-label" className={classnames('form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.fldEmailAddress) || this.state.fieldHavingFocus === 'fldEmailAddress'
                    })}
                  >Email address*</label>
                  <input data-validate-required="true" data-validate-type="email" tabIndex="3" data-js="validate-field" name="fldEmailAddress" id="fldEmailAddress" type="text" value={this.state.fldEmailAddress} onChange={evt => this.setState({ fldEmailAddress: evt.target.value })} onFocus={e => this.handleFocus(e, 'fldEmailAddress')} onBlur={this.handleBlur} />
                  {this.renderFormErrorRequired(this.state.formErrors.fldEmailAddress)}
                </div>
                <div className="form-field form-field--enhanced-label" data-js="form-field">
                  <label
                    htmlFor="fldContactNumber" data-js="enhance-label" className={classnames('form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.fldContactNumber) || this.state.fieldHavingFocus === 'fldContactNumber'
                    })}
                  >Cellphone number*</label>
                  <input data-validate-required="true" tabIndex="4" data-js="validate-field" name="fldContactNumber" id="fldContactNumber" type="text" value={this.state.fldContactNumber} onChange={evt => this.setState({ fldContactNumber: evt.target.value })} onFocus={e => this.handleFocus(e, 'fldContactNumber')} onBlur={this.handleBlur} />
                  {this.renderFormErrorRequired(this.state.formErrors.fldContactNumber)}
                </div>
                <div className="form-field form-field--enhanced-label" data-js="form-field">
                  <label
                    htmlFor="fldWRewardsCardNumber" data-js="enhance-label" className={classnames('form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.fldWRewardsCardNumber) || this.state.fieldHavingFocus === 'fldWRewardsCardNumber'
                    })}
                  >If you have a WRewards card, enter it here</label>
                  <input data-validate-required="true" tabIndex="7" data-js="validate-field" type="text" id="fldWRewardsCardNumber" name="fldWRewardsCardNumber" value={this.state.fldWRewardsCardNumber} onChange={evt => this.setState({ fldWRewardsCardNumber: evt.target.value })} onFocus={e => this.handleFocus(e, 'fldWRewardsCardNumber')} onBlur={this.handleBlur} />
                </div>
              </form>
              <hr className="hr--light" />
            </div>
          </section></article>
        </section>
      </div>
    </div>);
  }
  renderApplyWRewardsForm() {
    return (<div className="grid__half--medium">
      <form autoComplete="off" onSubmit={(e) => { this.handleValidateAppliedRewards(e); }} name="applyWRewardsForm" id="applyWRewardsForm" className="wForm" noValidate="true">
        {this.renderFormErrorElm(this.state.isFormHasErrors)}
        <div className="form-field form-field--enhanced-label" data-js="form-field">
          <label
          htmlFor="fldEmail" data-js="enhance-label" className={classnames('form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.fldEmail) || this.state.fieldHavingFocus === 'email'
          })}
          >Email Address*</label>
          <input
          data-validate-required="true" data-validate-type="email" tabIndex="0" data-js="validate-field" name="fldEmail" id="fldEmail" type="text" value={this.state.fldEmail} onChange={evt => this.setState({ fldEmail: evt.target.value })} onFocus={e => this.handleFocus(e, 'email')} onBlur={this.handleBlur}
          />
          {this.renderFormErrorRequired(this.state.formErrors.fldEmail)}
        </div>
        <div className="form-field form-field--enhanced-label" data-js="form-field">
          <label
          htmlFor="fldIDNumber" data-js="enhance-label" className={classnames('form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.fldIDNumber) || this.state.fieldHavingFocus === 'IDNumber'
          })}
          >ID or Passport Number*</label>
          <input minLength="1" maxLength="15" data-validate-required="true" data-validate-type="alphaNum" tabIndex="0" data-js="validate-field" name="fldIDNumber" id="fldIDNumber" type="text" value={this.state.fldIDNumber} onChange={evt => this.setState({ fldIDNumber: evt.target.value })} onFocus={e => this.handleFocus(e, 'IDNumber')} onBlur={this.handleBlur} onKeyUp={this.handleKeyUp} />
          {this.renderFormErrorRequired(this.state.formErrors.fldIDNumber)}
        </div>
        <div className="form-field form-field--enhanced-label datepicker" data-js="form-field">
          <label
          htmlFor="fldDOB" data-js="enhance-label" className={classnames('form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.fldDOB) || this.state.fieldHavingFocus === 'DOB'
          })}
          >Date of birth*</label>
          <DatePicker
          data-toggle="datepicker" data-validate-required="true" data-validate-type="date" tabIndex="0" data-js="validate-field" name="fldDOB" id="fldDOB" title="YYYY-MM-DD" type="date" className="datepicker-field" onFocus={e => this.handleFocus(e, 'DOB')} onBlur={this.handleBlur}
            startDate={this.state.fldDOB}
            handleChange={this.handleChange}
            placeholder="Date of birth*"
          />
          {/* <span className="datepicker-btn"><i /></span> */}
          {this.renderFormErrorRequired(this.state.formErrors.fldDOB)}
        </div>
        <div className="form-field">
          <p><small>* Required fields</small></p>
        </div>
        {/* <a rel="fancybox" id="btnFound" href="/store/fragements/dashboard/rewards/fancybox-container.jsp" className="button bottom float-left hidden" /> */}
        <div className="form-field Next">
          <button type="submit" id="btnSubmit" className="btn btn--primary btn--right" value="Next">Next</button>
          <span className="loading loading--dark ajaxSpinner" style={{ display: 'none' }} />
        </div>
        <div id="generalError" className="formErrors float-left" />
        {/* <img src="/images/ww_loader_no.gif" alt="Loading" className="float-left ajaxSpinner" />
      <p className="submit-link float-left hide-on-mobi hidden">
        <a href="javascript:parent.$.fancybox.close();">Return to basket</a>
      </p> */}
      </form>
      <br />
      <p className="disclaimer hidden">* Please note: We can only add your MySchool card if you have allowed Woolworths to contact you in your MySchool settings.</p><hr className="hr--light" />
    </div>);
  }
  renderConsentForm(displayForm) {
    const displayMySchoolCardContainer = { display: this.state.mySchoolMember === 'Yes' ? 'block' : 'none' };
    const displayMySchoolCardSignUp = { display: this.state.mySchoolMember === 'No' ? 'block' : 'none' };
    const displaySignUpMyschool = { display: this.state.signUpMySchool === 'Yes' && this.state.mySchoolMember === 'No' ? 'block' : 'none' };
    return (<div className="grid grid--space-y dashboardBlock bottom-section checkout-fancybox consentForm hidden" style={displayForm}>
      <div className="grid grid--space-y">
        <div className="grid__half--medium">
          <h3 className="text-caps font-graphic">Are you a member of Myschool?</h3>
          <form name="consentForm" id="consentForm" className="wForm ">
            <div className="form-field form-field--space-y" data-js="form-field">
              <div data-js="validate-field" data-validate-type="radio-group" data-validate-required="true" data-validate-msg="Please select one of these options">
                <div className="form-field">
                  <input type="radio" className="enhanced-radio is-enhanced" id="mySchoolMember" name="mySchoolMember" onChange={evt => this.setState({ mySchoolMember: evt.target.value })} value="Yes" />
                  <label htmlFor="mySchoolMember" className={`${this.state.mySchoolMember === 'Yes' ? 'label-radio is-checked' : 'label-radio'}`}>Yes</label>
                </div>
                <div className="form-field">
                  <input type="radio" className="enhanced-radio is-enhanced" id="nonMySchoolMember" name="mySchoolMember" value="No" onChange={evt => this.setState({ mySchoolMember: evt.target.value })} />
                  <label htmlFor="nonMySchoolMember" className={`${this.state.mySchoolMember === 'No' ? 'label-radio is-checked' : 'label-radio'}`}>No</label>
                </div>
              </div>
            </div>
            <div className="form-field mySchoolCardContainer hidden form-field--enhanced-label" data-js="form-field" style={displayMySchoolCardContainer}>
              <label
                htmlFor="mySchoolCardNumber" data-js="enhance-label" className={classnames('form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.mySchoolCardNumber) || this.state.mySchoolCardNumber === 'mySchoolCardNumber'
                })}
              >Please enter your card no</label>
              <input type="text" name="mySchoolCardNumber" id="mySchoolCardNumber" value={this.state.mySchoolCardNumber} onChange={evt => this.setState({ mySchoolCardNumber: evt.target.value })} onFocus={e => this.handleFocus(e, 'mySchoolCardNumber')} onBlur={this.handleBlur} />
            </div>
            <div className="form-field form-field--space-y mySchoolCardSignUp hidden" style={displayMySchoolCardSignUp}>
              <h4>Do you want to join MySchool now?</h4><p>You will be contacted by a Myschool representative</p>
              <div className="form-field" data-js="form-field">
                <div data-js="validate-field" data-validate-type="radio-group" data-validate-required="true" data-validate-msg="Please select one of these options">
                  <div className="form-field">
                    <input type="radio" className="enhanced-radio is-enhanced" id="signUpMySchoolYes" name="signUpMySchool" value="Yes" onChange={evt => this.setState({ signUpMySchool: evt.target.value })} />
                    <label htmlFor="signUpMySchoolYes" className={`${this.state.signUpMySchool === 'Yes' ? 'label-radio is-checked' : 'label-radio'}`}>Sign me up</label>
                  </div>
                  <div className="form-field">
                    <input type="radio" className="enhanced-radio is-enhanced" id="signUpMySchoolNo" name="signUpMySchool" value="No" onChange={evt => this.setState({ signUpMySchool: evt.target.value })} />
                    <label htmlFor="signUpMySchoolNo" className={`${this.state.signUpMySchool === 'No' ? 'label-radio is-checked' : 'label-radio'}`}>No thanks</label>
                  </div>
                </div>
              </div>
            </div>
            <hr className=" hr--light" />
            <h3 className="text-caps font-graphic ">PROMOTIONAL INFORMATION</h3>
            <p className="">You can unsubscribe from promotional information that does not relate to your exclusive WRewards benefits here:</p>
            <p className="">I <span className="greentext">DO NOT WANT</span> to receive promotional material from:</p>
            <div className="form-field" data-js="form-field">
              <input id="fld_chk_woolworths" className="enhanced-checkbox customCheck is-enhanced" name="fld_chk_woolworths" type="checkbox" onChange={(e) => { this.setState({ fldchkwoolworths: !this.state.fldchkwoolworths }); }} data-js="validate-field" />
              <label htmlFor="fld_chk_woolworths" className={`${this.state.fldchkwoolworths ? 'label-checkbox is-checked' : 'label-checkbox'}`}>Woolworths</label>
            </div>
            <div className="form-field" data-js="form-field">
              <input type="checkbox" onChange={(e) => { this.setState({ fldchkwfs: !this.state.fldchkwfs }); }} className="enhanced-checkbox customCheck is-enhanced" id="fld_chk_wfs" name="fld_chk_wfs" data-js="validate-field" />
              <label htmlFor="fld_chk_wfs" className={`${this.state.fldchkwfs ? 'label-checkbox is-checked' : 'label-checkbox'}`}>Woolworths Financial Services</label>
            </div>
            <div className="form-field signUpMyschool consents hidden" style={displaySignUpMyschool} data-js="form-field">
              <input type="checkbox" onChange={(e) => { this.setState({ fldchkmySchool: !this.state.fldchkmySchool }); }} className="enhanced-checkbox customCheck is-enhanced" id="fld_chk_mySchool" name="fld_chk_mySchool" data-js="validate-field" />
              <label htmlFor="fld_chk_mySchool" className={`${this.state.fldchkmySchool ? 'label-checkbox is-checked' : 'label-checkbox'}`}>MySchool MyVillage MyPlanet</label>
            </div>
          </form>
        </div>
      </div>
    </div>);
  }
  renderFormErrorRequired(error) {
    const { formErrors } = this.state;
    if (formErrors && error) {
      return (
        <span className="form-field__msg form-field__msg--error">{error}</span>
      );
    }
    return null;
  }
  renderTermsForm(displayForm) {
    const displaySignUpMyschool = { display: this.state.signUpMySchool === 'Yes' && this.state.mySchoolMember === 'No' ? 'block' : 'none' };
    return (<div className="grid grid--space-y dashboardBlock bottom-section checkout-fancybox termsForm hidden" style={displayForm}>
      <hr className="hr--light" />
      <div className="dashboardBlock forTandCs ">
        <h3 className="text-caps font-graphic">Terms and Conditions</h3>
        <div className="grid__half--medium">
          <div className="form-field" data-js="form-field">
            <input type="checkbox" onChange={(e) => { this.setState({ fldtermsrewards: !this.state.fldtermsrewards }); }} name="fld_terms_rewards" className="customCheck enhanced-checkbox is-enhanced" id="fld_terms_rewards" data-js="validate-field" data-validate-required="true" />
            <label htmlFor="fld_terms_rewards" className={`${this.state.fldtermsrewards ? 'label-checkbox is-checked' : 'label-checkbox'}`}>I accept the <a target="_blank" href="/corporate/fol110048"><strong>W</strong>Rewards Terms and Conditions</a> </label>
            {this.renderFormErrorRequired(this.state.formErrors.fldtermsrewards)}
          </div>
          <div className="consents hidden form-field" style={displaySignUpMyschool} data-js="form-field">
            <input type="checkbox" onChange={(e) => { this.setState({ fldtermsmyShool: !this.state.fldtermsmyShool }); }} name="fld_terms_myShool" className="customCheck enhanced-checkbox is-enhanced" id="fld_terms_myShool" data-js="validate-field" data-validate-required="true" />
            <label htmlFor="fld_terms_myShool" className={`${this.state.fldtermsmyShool ? 'label-checkbox is-checked' : 'label-checkbox'}`}>I accept the <a target="_blank" href="http://www.myschool.co.za/about-myschool/terms-and-conditions-card-usage">MySchool Terms and Conditions</a></label>
          </div>
          <div className="form-field" data-js="form-field">
            <a href="/corporate/cmp205289" target="_blank">Woolworths Privacy Notice</a>
          </div>
          <p className="information">*Required fields</p>
        </div>
      </div>
    </div>);
  }
  renderFormErrorElm(error) {
    if (error) {
      return (
        <div className="text-small message message--error">
          <span>There were some errors in your form input. Please review your input below.</span>
        </div>
      );
    }
    return null;
  }
  render() {
    const displayForm = { display: !_.isEmpty(this.props.validateAppliedRewardsData) ? 'block' : 'none' };
    if (this.props.registerRewardsData) {
      return (<div className="page-layout__content">
        <div id="apply-rewards-success" className="grid grid--space-y dashboardBlock">
          <div className="checkout-fancybox">
            <h1 className="text-caps font-graphic">Thank you for your application</h1>
            <hr className="hr--light" />
            <p className="text-medium">You can view your information in your Woolworths Online profile.</p>
            <br />
            <p><a className="btn btn--primary btn--right" href="/">Start Shopping</a></p>
            <p><a className="btn btn--secondary btn--right" href="/dashboard">Go There Now</a></p>
          </div>
        </div>
      </div>);
    }
    return (
      <div className="page-layout__content">
        <div className="seperator wrewardsWrapper">
          <div className="grid grid--space-y dashboardBlock top-section checkout-fancybox">
            <h1 className="text-caps font-graphic">Apply for a WRewards card</h1>
            <hr className="hr--light" /><h3 className="text-caps font-graphic">Sign up now and enjoy instant savings with rewards.</h3>
            {this.renderApplyWRewardsForm()}
          </div>
          { this.state.modalActive ? <OtpModel pagetype="reward" deactivateModal={this.deactivateModal} /> : '' }
          { !this.state.modalActive ? this.renderApplicationForm(displayForm) : ''}
        </div>
        { !this.state.modalActive ? this.renderConsentForm(displayForm) : ''}
        { !this.state.modalActive ? this.renderTermsForm(displayForm) : ''}
        { !this.state.modalActive ?
          <div className="grid grid--space-y dashboardBlock bottom-section checkout-fancybox hidden" style={displayForm}>
            <form name="applicationFormWRewards" onSubmit={(e) => { this.handleSubmitApplicationFormWRewards(e); }} data-js="validate-form" id="applicationFormWRewards" noValidate="true">
              <div className="sign-up form-field">
                <button className="btn btn--primary btn--right" id="btnSubmit" type="submit" name="submit" value="Sign Up">Sign Up</button>
                {/* <span className="loading loading--dark ajaxSpinner" style={{ display: 'none' }} />
                <img src="/images/ww_loader_no.gif" alt="Loading" className="float-left ajaxSpinner" />
                <div id="fldCommonError" className="formErrors float-left" /> */}
              </div>
            </form>
          </div> : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    validateAppliedRewardsData: state.wrewardsReducer.validateAppliedRewardsReducer.validateAppliedRewardsData,
    registerRewardsData: state.wrewardsReducer.registerForWrewards.registerRewardsData,
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ validateAppliedRewards, registerForWrewards }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ApplyWrewards);
