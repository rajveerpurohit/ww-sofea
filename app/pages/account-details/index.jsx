import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';
import moment from 'moment';
import _ from 'lodash';

import validators from './validate';
import {
  getaccountDetailsPageData,
  updateUserEmail,
  updateContactNumbers,
  changePassword,
  updateUserDetails,
  deleteUser,
  updateUserEmailAddresses
} from './actions';
import {
  DEFAULT_DATE_PICKER_DATE_FORMAT
} from '../../Constants';
import DatePicker from '../../components/basic/datepicker';

class AccountDetails extends Component {

  constructor(props) {
    super(props);
    const userDetails = _.get(props, 'currentuserDetails.accountDetails.userDetails', {});
    const c2ContactDetails = _.get(userDetails, 'c2ContactDetails', {});
    const dateOfBirth = _.get(userDetails, 'dateOfBirth', null);
    this.state = {
      modalActive: false,
      startDate: dateOfBirth,
      toggleDivName: userDetails.firstName,
      detailsForm: {
        title: userDetails.title,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        gender: userDetails.gender,
        dateOfBirth: userDetails.dateOfBirth && this.formatDate(userDetails.dateOfBirth),
        email: userDetails.email,
        userNumber: userDetails.passportNumber,
        primaryContactNo: userDetails.primaryContactNo,
        secondaryContactNo: userDetails.secondaryContactNo,
        mySchoolCardNo: '',
        differenceCardNo: userDetails.differenceCardNo,
        twitterHandle: userDetails.twitterHandle,
        vatRegistrationNumber: userDetails.vatRegistrationNumber,
      },
      emailAddressForm: {
        email: '',
        confirmemailaddress: ''
      },
      passwordForm: {
        currentpassword: '',
        password: '',
        confirmpassword: '',
        passwordHint: ''
      },
      contactNumbersForm: {
        contactNumber: userDetails.contactNumber,
        alternateContactNumber: userDetails.alternateContactNumber,
        primaryCountryDiallingCode: c2ContactDetails.primaryCountryDiallingCode,
        primaryDiallingCode: c2ContactDetails.primaryDiallingCode,
        primaryNumbers: c2ContactDetails.primaryNumbers,
        secondaryCountryDiallingCode: c2ContactDetails.secondaryCountryDiallingCode,
        secondaryDiallingCode: c2ContactDetails.secondaryDiallingCode,
        secondaryNumbers: c2ContactDetails.secondaryNumbers,
        homeCountryDiallingCode: c2ContactDetails.homeCountryDiallingCode,
        homeDiallingCode: c2ContactDetails.homeDiallingCode,
        homeNumbers: c2ContactDetails.homeNumbers,
        workCountryDiallingCode: c2ContactDetails.workCountryDiallingCode,
        workDiallingCode: c2ContactDetails.workDiallingCode,
        workNumbers: c2ContactDetails.workNumbers,
      },
      emailAddressesForm: {
        email: userDetails.email,
        primaryEmail: userDetails.primaryEmail,
        secondaryEmail: userDetails.secondaryEmail,
      },
      formErrors: {},
      isFormHasErrors: {}
    };

    // Set of validators for signin form
    this.validators = validators;
    this.toggleDiv = this.toggleDiv.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateValidators = this.updateValidators.bind(this);
    this.renderFormErrorElm = this.renderFormErrorElm.bind(this);
    this.renderFormFieldErrorElm = this.renderFormFieldErrorElm.bind(this);
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.handleselectChange = this.handleselectChange.bind(this);
  }

  componentDidMount() {
    const userDetails = _.get(this.props, 'currentuserDetails.accountDetails.userDetails', {});
    this.props.getaccountDetailsPageData().then(()=>{
      const userDetails = _.get(this.props, 'currentuserDetails.accountDetails.userDetails', {});
      const c2ContactDetails = _.get(this.userDetails, 'c2ContactDetails', {});
      const dateOfBirth = _.get(this.userDetails, 'dateOfBirth', null);
      const contactNumbersForm = {
        contactNumber: userDetails.primaryContactNo,
        alternateContactNumber: userDetails.secondaryContactNo,
        primaryCountryDiallingCode: c2ContactDetails.primaryCountryDiallingCode,
        primaryDiallingCode: c2ContactDetails.primaryDiallingCode,
        primaryNumbers: c2ContactDetails.primaryNumbers,
        secondaryCountryDiallingCode: c2ContactDetails.secondaryCountryDiallingCode,
        secondaryDiallingCode: c2ContactDetails.secondaryDiallingCode,
        secondaryNumbers: c2ContactDetails.secondaryNumbers,
        homeCountryDiallingCode: c2ContactDetails.homeCountryDiallingCode,
        homeDiallingCode: c2ContactDetails.homeDiallingCode,
        homeNumbers: c2ContactDetails.homeNumbers,
        workCountryDiallingCode: c2ContactDetails.workCountryDiallingCode,
        workDiallingCode: c2ContactDetails.workDiallingCode,
        workNumbers: c2ContactDetails.workNumbers,
      };
      const emailAddressesForm = {
        email: userDetails.email,
        primaryEmail: userDetails.primaryEmail,
        secondaryEmail: userDetails.secondaryEmail,
      };
      const detailsForm= {
        title: userDetails.title,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        gender: userDetails.gender,
        dateOfBirth: userDetails.dateOfBirth && this.formatDate(userDetails.dateOfBirth),
        email: userDetails.email,
        userNumber: userDetails.passportNumber,
        primaryContactNo: userDetails.primaryContactNo,
        secondaryContactNo: userDetails.secondaryContactNo,
        mySchoolCardNo: '',
        differenceCardNo: userDetails.differenceCardNo,
        twitterHandle: userDetails.twitterHandle,
        vatRegistrationNumber: userDetails.vatRegistrationNumber,
      };
      this.setState({detailsForm, emailAddressesForm, contactNumbersForm});
    });
  }

  onDateChange(newDate) {
    if (newDate) {
      const newState = _.assign({}, this.state);
      newState.detailsForm.dateOfBirth = newDate;
      newState.startDate = newDate;
      this.setState(newState);
    }
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

  activateModal() {
    this.setState({ modalActive: true });
  }
  handleselectChange(e, formObj, inputPropName) {
    this.setState({ title: e.target.value });
  }
  deactivateModal() {
    this.setState({
      modalActive: false
    });
  }
  handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
    // this.updateValidators(inputPropName, e.target.value);
  }
  /**
  * This function updates the state of the validator for the specified validator
  */
  updateValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
  }

  toggleDiv(e) {
    const attrValue = e.target.attributes['data-toggle-target'] && e.target.attributes['data-toggle-target'].value;
    if (attrValue) {
      this.setState({
        toggleDivName: attrValue !== this.state.toggleDivName ? attrValue : null
      });
    }
  }
  handleEmailAddressForm(e) {
    e.preventDefault();
    const { emailAddressForm } = this.state;
    let formErrors = {};
    const isFormHasErrors = {};
    formErrors = _.reduce(emailAddressForm, (prev, val, field) => {
      prev[field] = this.validate(val, field); // eslint-disable-line no-param-reassign
      return prev;
    }, {});
    if (_.compact(_.values(formErrors)).length === 0) {
      isFormHasErrors.emailAddressFormsHasErrors = false;
      this.setState({ isFormHasErrors, formErrors: {} });
      this.props.updateUserEmail(emailAddressForm, () => {
        const { currentuserDetails } = this.props;
        const userData = currentuserDetails.accountDetails && currentuserDetails.accountDetails.userDetails;
        formErrors.email = userData.formexceptions[0].message;
        this.setState({ formErrors });
      }).then(() => {
        if (_.compact(_.values(formErrors)).length === 0) {
          this.setState({
            emailAddressForm: {
              email: '',
              confirmemailaddress: ''
            },
            toggleDivName: (_.compact(_.values(formErrors)).length === 0) ? null : this.state.toggleDivName });
        }
      });
    } else {
      isFormHasErrors.emailAddressFormsHasErrors = true;
      this.setState({ isFormHasErrors, formErrors });
    }
  }
  handleNewPasswordForm(e) {
    e.preventDefault();
    const { passwordForm } = this.state;
    let formErrors = {};
    const isFormHasErrors = {};
    formErrors = _.reduce(passwordForm, (prev, val, field) => {
      prev[field] = this.validate(val, field); // eslint-disable-line no-param-reassign
      return prev;
    }, {});
    if (_.compact(_.values(formErrors)).length === 0) {
      isFormHasErrors.passwordFormHasErrors = false;
      this.setState({ isFormHasErrors, formErrors });
      this.props.changePassword(passwordForm, () => {
        const { currentuserDetails } = this.props;
        const userData = currentuserDetails.accountDetails && currentuserDetails.accountDetails.userDetails;
        userData.formexceptions.map((errorMsg) => {
          errorMsg.message && errorMsg.message.indexOf('Please provide the password.') >= 0 ? formErrors.currentpassword = errorMsg.message : '';
          errorMsg.message && errorMsg.message.indexOf('Password Hint') >= 0 ? formErrors.passwordHint = errorMsg.message : '';
          errorMsg.message && errorMsg.message.indexOf(' 6 characters and maximum 20') >= 0 ? formErrors.password = errorMsg.message : '';
          return formErrors;
        });
        this.setState({ formErrors });
      }).then((res) => {
        if (_.compact(_.values(formErrors)).length === 0) {
          this.setState({
            passwordForm: {
              currentpassword: '',
              password: '',
              confirmpassword: '',
              passwordHint: ''
            },
            toggleDivName: (_.compact(_.values(formErrors)).length === 0) ? null : this.state.toggleDivName });
        }
      });
    } else {
      isFormHasErrors.passwordFormHasErrors = true;
      this.setState({ isFormHasErrors, formErrors });
    }
  }
  handleDetailsForm(e) {
    e.preventDefault();
    const detailsForm = {};
    detailsForm.firstName = this.state.detailsForm.firstName;
    detailsForm.lastName = this.state.detailsForm.lastName;
    detailsForm.dateOfBirth = this.state.detailsForm.dateOfBirth;
    let formErrors = {};
    const isFormHasErrors = {};
    formErrors = _.reduce(detailsForm, (prev, val, field) => {
      prev[field] = this.validate(val, field); // eslint-disable-line no-param-reassign
      return prev;
    }, {});
    if (_.compact(_.values(formErrors)).length === 0) {
      isFormHasErrors.detailsFormHasErrors = false;
      this.setState({ isFormHasErrors, formErrors: {} });
      this.props.updateUserDetails(this.state.detailsForm, () => {
        const { currentuserDetails } = this.props;
        const userData = currentuserDetails.accountDetails && currentuserDetails.accountDetails.userDetails;
        userData.formexceptions.map((errorMsg) => {
          errorMsg.message && errorMsg.message.indexOf('title') >= 0 ? formErrors.title = 'Please enter your Title.' : '';
          errorMsg.message && errorMsg.message.indexOf('Vat Registration number') >= 0 ? formErrors.vatRegistrationNumber = errorMsg.message : '';
          return formErrors;
        });
        this.setState({ formErrors, toggleDivName: (_.compact(_.values(formErrors)).length === 0) ? null : this.state.toggleDivName });
      }).then(() => {
        if (_.compact(_.values(formErrors)).length === 0) {
          this.setState({ toggleDivName: (_.compact(_.values(formErrors)).length === 0) ? null : this.state.toggleDivName });
        }
      });
    } else {
      isFormHasErrors.detailsFormHasErrors = true;
      this.setState({ isFormHasErrors, formErrors });
    }
  }
  handlEmailAddressesForm(e) {
    e.preventDefault();
    const { emailAddressesForm } = this.state;
    let formErrors = {};
    const isFormHasErrors = {};
    formErrors = _.reduce(emailAddressesForm, (prev, val, field) => {
      prev[field] = this.validate(val, field); // eslint-disable-line no-param-reassign
      return prev;
    }, {});
    if (_.compact(_.values(formErrors)).length === 0) {
      isFormHasErrors.emailAddressesFormHasErrors = false;
      this.setState({ isFormHasErrors, formErrors: {} });
      this.props.updateUserEmailAddresses(emailAddressesForm, () => {
        const { currentuserDetails } = this.props;
        const userData = currentuserDetails.accountDetails && currentuserDetails.accountDetails.userDetails;
        formErrors.userEmail = userData.formexceptions[0].message;
        this.setState({ formErrors, toggleDivName: (_.compact(_.values(formErrors)).length === 0) ? null : this.state.toggleDivName });
      }).then(() => {
        if (_.compact(_.values(formErrors)).length === 0) {
          this.setState({
            toggleDivName: (_.compact(_.values(formErrors)).length === 0) ? null : this.state.toggleDivName });
        }
      });
    } else {
      isFormHasErrors.emailAddressesFormHasErrors = true;
      this.setState({ isFormHasErrors, formErrors });
    }
  }
  handlContactNumbersForm(e) {
    e.preventDefault();
    const { synchronizeStatus } = this.props;
    const contactNumbersForm = {};
    let formErrors = {};
    const isFormHasErrors = {};
    formErrors = _.reduce(contactNumbersForm, (prev, val, field) => {
      prev[field] = this.validate(val, field); // eslint-disable-line no-param-reassign
      return prev;
    }, {});
    if (_.compact(_.values(formErrors)).length === 0) {
      isFormHasErrors.contactNumbersFormHasErrors = false;
      this.setState({ isFormHasErrors, formErrors: {} });
      this.props.updateContactNumbers(this.state.contactNumbersForm, synchronizeStatus, () => {
        const { currentuserDetails } = this.props;
        const userData = currentuserDetails.accountDetails && currentuserDetails.accountDetails.userDetails;
        userData.formexceptions.map((errorMsg) => {
          errorMsg.message && errorMsg.message.indexOf('Please enter a valid phone number.') >= 0 ? formErrors.contactNumber = errorMsg.message : '';
          errorMsg.message && errorMsg.message.indexOf('Secondary Contact Number') >= 0 ? formErrors.alternateContactNumber = errorMsg.message : '';
          return formErrors;
        });
        this.setState({ formErrors, toggleDivName: (_.compact(_.values(formErrors)).length === 0) ? null : this.state.toggleDivName });
      }).then(() => {
        if (_.compact(_.values(formErrors)).length === 0) {
          this.setState({
            toggleDivName: (_.compact(_.values(formErrors)).length === 0) ? null : this.state.toggleDivName });
        }
      });
    } else {
      isFormHasErrors.contactNumbersFormHasErrors = true;
      this.setState({ isFormHasErrors, formErrors });
    }
  }
  validate(val, field) {
    // if (field === 'primaryContactNo') {
    //   if (isNaN(Number(val)) || val.length < 10) {
    //     return 'Please enter a valid contact number with no spaces or special characters (local: 10 digits; international: 15 digits)';
    //   }
    if (field === 'contactNumber') {
      if (isNaN(Number(val)) || val === '' || val === undefined) {
        return 'Please enter a valid phone number';
      }
    } else if (field === 'alternateContactNumber') {
      if (val === '' || val === undefined) {
        return '';
      } else if ((isNaN(Number(val)))) {
        return 'Please enter a valid phone number';
      }
    } else if (field === 'userEmail' || field === 'primaryEmail' || field === 'secondaryEmail') {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val) && val !== undefined && val !== '') {
        return 'Please enter a correct email address';
      }
    } else if (field === 'passwordHint') {
      return '';
    } else if (field === 'firstName' && val === undefined) {
      return 'Enter first name';
    } else if (field === 'lastName' && val === undefined) {
      return 'Enter last name';
    } else if (val === '' || val === undefined) {
      return 'This is a required field';
    } else if (!/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i.test(val) && field === 'dateOfBirth') {
      return 'Please enter a date in the format YYYY-MM-DD';
    } else if (field === 'confirmemailaddress') {
      if (val !== this.state.emailAddressForm.email) {
        return 'Emails do not match.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)) {
        return 'Please enter a valid email address';
      }
    } else if (field === 'confirmpassword') {
      if (val !== this.state.passwordForm.password) {
        return 'Passwords do not match.';
      }
    }
    return '';
  }
  renderFormErrorElm(field) {
    const { isFormHasErrors } = this.state;
    if (isFormHasErrors[field]) {
      return (
        <div className="text-small message message--error">
          <span>There were some errors in your form input. Please review your input below.</span>
        </div>
      );
    }

    return null;
  }

  renderFormFieldErrorElm(field) {
    const { formErrors } = this.state;
    if (formErrors[field]) {
      return (
        <span className="form-field__msg form-field__msg--error">{formErrors[field]}</span>
      );
    }

    return null;
  }
  renderModal() {
    return (
      <AriaModal
      titleText="account-detail"
      className="suburb-modal"
      verticallyCenter
      onExit={this.deactivateModal}
      >
        <div className="modal__box modal__box--panel modal__box--size-w-large" >
          <span className="icon icon--close-circ-dark modal__close" onClick={this.deactivateModal} >close</span>
          <div className="heading heading--3 font-graphic modal__head">DELETE MY ONLINE PROFILE</div>
          <div className="modal__content">
            <div className="text-small">
              <p>If there is anything we can do to improve your experience with Woolworths, please contact Customer Support on <br /><strong><u>0860 100 987</u></strong></p>
              <p><strong>Please note:</strong><br />After you have deleted your online profile, you will no longer be able to login or access your online order history.</p>
              <p>Deleting your online profile will not close any other accounts you have with Woolworths or Woolworths Financial Services.</p>
              <br />
              <div className="form-field">
                <input name="submit" id="fldUpdate" type="button" className="btn btn--primary btn--right" defaultValue="Delete my profile" onClick={() => this.props.deleteUser()} />
                <span className="btn btn--silent cancel-btn">
                  <span onClick={this.deactivateModal} className="link--silent text--small arrow-link--forward">Cancel</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </AriaModal>
    );
  }
  render() {
    const { toggleDivName, detailsForm, emailAddressForm, passwordForm, contactNumbersForm, emailAddressesForm } = this.state;
    const { currentuserDetails, synchronizeStatus } = this.props;
    const userData = currentuserDetails.accountDetails && currentuserDetails.accountDetails.userDetails;
    const userc2ContactDetails = currentuserDetails.accountDetails && currentuserDetails.accountDetails.userDetails.c2ContactDetails;
    return (
      <div>
        <main className="grid grid--space-y site-main">
          <div className="main-page ">
            <nav className="breadcrumb empty" />
            <div className="grid grid--space-y page-layout">
              <div className="page-layout__content">
                <h1 className="font-graphic text-caps">My Details</h1>
                <section className="grid grid--space-y">
                  <h2 className="font-graphic text-caps">My Login Details</h2>
                  <section className="my-details-section">
                    <div className="my-details-section__row">
                      <div className="my-details-section__cell text-small grid__fourth--medium">
                        <strong>Online Email address:</strong>
                      </div>
                      <div className="my-details-section__cell text-small grid__fourth--medium ">
                        {userData.email}
                      </div>
                      <div className="my-details-section__cell grid text-align-right">
                        <span onClick={e => this.toggleDiv(e)} className="icon-text text-small link--silent arrow-link--forward" data-toggle-target="content-email-form">
                        Update email address</span>
                      </div>
                      <div className="my-details-section__row grid" style={{ display: toggleDivName === 'content-email-form' ? 'block' : 'none' }}>
                        <div className="grid my-details-section__form">
                          <div className="grid__half--medium">
                            <form id="updateEmailAddressForm" name="emailAddressForm" noValidate="true" onSubmit={(e) => { this.handleEmailAddressForm(e); }}>
                              {this.renderFormErrorElm('emailAddressFormsHasErrors')}
                              <div className="form-field">
                                <input name="emailAddress" id="fldemailAddress" placeholder="Email Address" type="email" value={emailAddressForm.email} onChange={event => this.handleInputChange(event, 'emailAddressForm', 'email')} />
                                {this.renderFormFieldErrorElm('email')}
                              </div>
                              <div className="form-field">
                                <input name="confirmEmailAddress" id="fldConfirmEmailAddress" placeholder="Confirm Email Address" type="email" value={emailAddressForm.confirmemailaddress} onChange={event => this.handleInputChange(event, 'emailAddressForm', 'confirmemailaddress')} />
                                {this.renderFormFieldErrorElm('confirmemailaddress')}
                              </div>
                              <div className="form-field">
                                <button name="submit" id="fldSubmitEmail" type="submit" value="Update" className="btn btn--primary btn--right">Update </button>
                                <button type="reset" className="btn btn--silent cancel-btn" id="fldCancelEmail" value="Cancel" name="cancel" data-toggle-target="content-email-form" onClick={e => this.toggleDiv(e)}>Cancel<span className="icon" /></button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-details-section__row">
                      <div className="my-details-section__cell text-small grid__fourth--medium">
                        <strong>Password hint:</strong>
                      </div>
                      <div className="my-details-section__cell text-small grid__fourth--medium ">
                        {userData.passwordHint}
                      </div>
                      <div className="my-details-section__cell grid text-align-right">
                        <span onClick={e => this.toggleDiv(e)} className="icon-text text-small link--silent arrow-link--forward" to="" data-js="content-toggle" data-toggle-target="content-password-form">
                        Change my password</span>
                      </div>
                      <div className="my-details-section__row grid" id="content-password-form" style={{ display: toggleDivName === 'content-password-form' ? 'block' : 'none' }}>
                        <div className="grid my-details-section__form">
                          <div className="grid__half--medium">
                            <form id="frmNewPasswordForm" noValidate="true" name="passwordForm" onSubmit={(e) => { this.handleNewPasswordForm(e); }}>
                              {this.renderFormErrorElm('passwordFormHasErrors')}
                              <div className="form-field">
                                <input name="currentpassword" id="fldCurrentPwd" placeholder="Current password" type="password" className="stdFld" value={passwordForm.currentpassword} onChange={event => this.handleInputChange(event, 'passwordForm', 'currentpassword')} />
                                {this.renderFormFieldErrorElm('currentpassword')}
                              </div>
                              <div className="form-field">
                                <input name="password" id="fldNewPassword" placeholder="New password" type="password" className="stdFld" value={passwordForm.password} onChange={event => this.handleInputChange(event, 'passwordForm', 'password')} />
                                {this.renderFormFieldErrorElm('password')}
                              </div>
                              <div className="form-field">
                                <input name="confirmpassword" id="fldConfirmNewPassword" placeholder="Confirm password" type="password" className="stdFld" value={passwordForm.confirmpassword} onChange={event => this.handleInputChange(event, 'passwordForm', 'confirmpassword')} />
                                {this.renderFormFieldErrorElm('confirmpassword')}
                              </div>
                              <div className="form-field">
                                <input name="passwordHint" id="fldPasswordHint" placeholder="Password hint" type="text" className="stdFld" value={passwordForm.passwordHint} onChange={event => this.handleInputChange(event, 'passwordForm', 'passwordHint')} />
                                {this.renderFormFieldErrorElm('passwordHint')}
                              </div>
                              <div className="form-field">
                                <input name="submit" id="fldSavePwd" type="submit" defaultValue="Update" className="btn btn--primary btn--right" />
                                <button type="reset" className="btn btn--silent cancel-btn" id="fldCancelpwd" value="Cancel" name="cancel" data-js="content-toggle" data-toggle-target="content-password-form" onClick={e => this.toggleDiv(e)}>Cancel<span className="icon" /></button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
                <Link name="personal" />
                <section className="grid grid--space-y">
                  <h2 className="font-graphic text-caps">My Personal Details</h2>
                  <section className="my-details-section">
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">Title:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.title === 'unknown' ? '' : userData.title}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">Name:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.firstName}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">Surname:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.lastName}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">ID/passport number:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.identityNumber || userData.passportNumber} </span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">Gender:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.gender === 'unknown' ? '' : userData.gender}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">Date of birth:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.dateOfBirth && this.formatDate(userData.dateOfBirth)}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">MySchool card number:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.mySchoolCardNo}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">WRewards card number:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.differenceCardNo}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">Twitter Handle:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.twitterHandle}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third">
                        <strong className="text-small">VAT Registration No:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        <span className="text-small">{userData.vatRegistrationNumber}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell text-align-right">
                        <span onClick={e => this.toggleDiv(e)} to="" className="text-small link--silent arrow-link--forward" data-js="content-toggle" data-toggle-target="content-details-form">
                        Update my details</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid" id="content-details-form" style={{ display: toggleDivName === 'content-details-form' ? 'block' : 'none' }}>
                      <div className="grid__half--medium my-details-section__form">
                        <form name="detailsForm" id="frmPersonalDetailsForm" className="contactForm updateDetails validateForm" noValidate="true" onSubmit={(e) => { this.handleDetailsForm(e); }}>
                          {this.renderFormErrorElm('detailsFormHasErrors')}
                          <div className="form-field" >
                            <div data-validate-msg="Please enter title">
                              <span className="enhanced-select">
                                <select data-js="enhance-select" name="title" id="fldTitle" defaultValue="Mr" onChange={event => this.handleInputChange(event, 'detailsForm', 'title')}>
                                  <option value>Title</option>
                                  <option value="MISS">Miss</option>
                                  <option value="MR">Mr</option>
                                  <option value="MRS">Mrs</option>
                                  <option value="MS">Ms</option>
                                  <option value="DR">Dr</option>
                                  <option value="PROF">Prof</option>
                                </select>
                                <span className="enhanced-select__label">{detailsForm.title === 'unknown' ? 'Title' : detailsForm.title}&nbsp;</span>
                                <span className="icon enhanced-select__icon" />
                              </span>
                              {this.renderFormFieldErrorElm('title')}
                            </div>
                          </div>
                          <div className="form-field">
                            <input name="firstName" id="fldFirstName" placeholder="Name*" type="text" value={detailsForm.firstName} onChange={event => this.handleInputChange(event, 'detailsForm', 'firstName')} />
                            {this.renderFormFieldErrorElm('firstName')}
                          </div>
                          <div className="form-field">
                            <input name="lastName" id="fldSurname" placeholder="lastName*" type="text" value={detailsForm.lastName} onChange={event => this.handleInputChange(event, 'detailsForm', 'lastName')} />
                            {this.renderFormFieldErrorElm('lastName')}
                          </div>
                          <div className="form-field">
                            <input name="userNumber" id="fldID" placeholder="ID/passport number" type="text" value={detailsForm.userNumber} onChange={event => this.handleInputChange(event, 'detailsForm', 'userNumber')} />
                          </div>
                          <div className="form-field">
                            <div className="form-field" >
                              <span className="enhanced-select">
                                <select name="gender" id="fldGender" onChange={event => this.handleInputChange(event, 'detailsForm', 'gender')}>
                                  <option>Select gender</option>
                                  <option value="female">female</option>
                                  <option value="male">male</option>
                                </select>
                                <span className="enhanced-select__label">{detailsForm.gender === 'unknown' ? 'Select gender' : detailsForm.gender}&nbsp;</span>
                                <span className="icon enhanced-select__icon" />
                              </span>
                            </div>
                          </div>
                          <div className="form-field">
                            <DatePicker
                              startDate={this.state.startDate}
                              handleChange={this.onDateChange}
                              placeholder="Date of birth*"
                            />
                            {this.renderFormFieldErrorElm('dateOfBirth')}
                          </div>
                          <div className="form-field">
                            <input name="mySchoolCard" id="fldMySchoolCard" placeholder="MySchool card number" type="text" value={detailsForm.mySchoolCardNo} onChange={event => this.handleInputChange(event, 'detailsForm', 'mySchoolCardNo')} />
                          </div>
                          <div className="form-field">
                            <input name="differenceCardNo" id="fldDifferenceCard" placeholder="Difference card number" type="text" value={detailsForm.differenceCardNo} onChange={event => this.handleInputChange(event, 'detailsForm', 'differenceCardNo')} />
                          </div>
                          <div className="form-field">
                            <input name="twitterHandle" id="fldTwitterHandle" placeholder="Twitter Handle" type="text" value={detailsForm.twitterHandle} onChange={event => this.handleInputChange(event, 'detailsForm', 'twitterHandle')} />
                          </div>
                          <div className="form-field">
                            <input name="vatRegistrationNumber" id="fldVatRegistrationNumber" placeholder="Vat Registration Number" type="text" value={detailsForm.vatRegistrationNumber} onChange={event => this.handleInputChange(event, 'detailsForm', 'vatRegistrationNumber')} />
                            {this.renderFormFieldErrorElm('vatRegistrationNumber')}
                          </div>
                          <p className="text-small">*Required fields</p>
                          <div className="form-field">
                            <input name="submit" type="submit" defaultValue="Update" className="btn btn--primary btn--right" />
                            <button type="reset" className="btn btn--silent cancel-btn" value="Cancel" name="cancel" data-js="content-toggle" data-toggle-target="content-details-form" onClick={e => this.toggleDiv(e)}>Cancel<span className="icon" /></button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                  <p style={{ display: 'none' }}>Please note that you can't edit this info due to FICA regulations. Please contact our Customer Services team on 0860 022 002 if you'd like to update any of this info.</p>
                </section>
                <section className="grid grid--space-y">
                  <h2 className="font-graphic text-caps">My Email Addresses</h2>
                  <section className="my-details-section">
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third--small">
                        <strong className="text-small">Online Email address:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds--small">
                        <span className="text-small">{userData.email}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third--small">
                        <strong className="text-small">Primary Email address:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds--small">
                        <span className="text-small">{userData.primaryEmail}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell grid__third--small">
                        <strong className="text-small">Secondary Email address:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds--small">
                        <span className="text-small">{userData.secondaryEmail}</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell text-align-right">
                        <span onClick={e => this.toggleDiv(e)} className="text-small link--silent arrow-link--forward" to="" data-js="content-toggle" data-toggle-target="content-emails-form2">
                        Update my email addresses</span>
                      </div>
                    </div>
                    <div className="my-details-section__row grid" id="content-emails-form" style={{ display: toggleDivName === 'content-emails-form2' ? 'block' : 'none' }}>
                      <div className="grid__half--medium my-details-section__form">
                        <form name="emailAddressFormLessId" id="emailAddressFormLessId" className="emailAddressesForm validateForm" onSubmit={(e) => { this.handlEmailAddressesForm(e); }} noValidate="true">
                          {this.renderFormErrorElm('emailAddressesFormHasErrors')}
                          <div className="form-field">
                            <input name="email" id="email" placeholder="Email Address" type="text" value={emailAddressesForm.email} onChange={event => this.handleInputChange(event, 'emailAddressesForm', 'email')} />
                            {this.renderFormFieldErrorElm('email')}
                          </div>
                          {/* <div className="form-field">
                            <input name="confirmemailaddress" id="confirmemailaddress" placeholder="Confirm Email Address" type="text" value={emailAddressesForm.confirmemailaddress} onChange={event => this.handleInputChange(event, 'emailAddressesForm', 'confirmemailaddress')} />
                          </div> */}
                          <div className="form-field">
                            <input name="primaryEmail" id="primaryEmail" placeholder="Primary Email address" type="text" value={emailAddressesForm.primaryEmail} onChange={event => this.handleInputChange(event, 'emailAddressesForm', 'primaryEmail')} />
                            {this.renderFormFieldErrorElm('primaryEmail')}
                          </div>
                          <div className="form-field">
                            <input name="secondaryEmail" id="secondaryEmail" placeholder="Secondary Email address" type="text" value={emailAddressesForm.secondaryEmail} onChange={event => this.handleInputChange(event, 'emailAddressesForm', 'secondaryEmail')} />
                            {this.renderFormFieldErrorElm('secondaryEmail')}
                          </div>
                          <div className="form-field grid--space-y">
                            <input name="submit" type="submit" defaultValue="Update" className="btn btn--primary btn--right" />
                            <button type="reset" className="btn btn--silent cancel-btn" value="Cancel" name="cancel" data-js="content-toggle" data-toggle-target="content-emails-form" onClick={e => this.toggleDiv(e)}>Cancel<span className="icon" /></button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                  <p style={{ display: 'none' }}>Please note that you can't edit this info due to FICA regulations. Please contact our Customer Services team on 0860 022 002 if you'd like to update any of this info.</p>
                </section>
                <section className="grid grid--space-y">
                  <h2 className="font-graphic text-caps">My Contact Numbers</h2>
                  <section className="my-details-section">
                    {synchronizeStatus && userc2ContactDetails ?
                    <section>
                      <div className="my-details-section__row grid text-small">
                        <div className="my-details-section__cell grid__third">
                          <strong>Contact number:</strong>
                        </div>
                        <div className="my-details-section__cell grid__two-thirds">
                          {`${userc2ContactDetails.primaryCountryDiallingCode}-${userc2ContactDetails.primaryDiallingCode}-${userc2ContactDetails.primaryNumbers}`}
                        </div>
                      </div>  <div className="my-details-section__row grid text-small">
                        <div className="my-details-section__cell grid__third">
                          <strong>Alternate contact number:</strong>
                        </div>
                        <div className="my-details-section__cell grid__two-thirds">
                          {`${userc2ContactDetails.secondaryCountryDiallingCode}-${userc2ContactDetails.secondaryDiallingCode}-${userc2ContactDetails.secondaryNumbers}`}
                        </div>
                      </div>  <div className="my-details-section__row grid text-small">
                        <div className="my-details-section__cell grid__third">
                          <strong>Work Landline Contact number:</strong>
                        </div>
                        <div className="my-details-section__cell grid__two-thirds">
                          {`${userc2ContactDetails.workCountryDiallingCode}-${userc2ContactDetails.workDiallingCode}-${userc2ContactDetails.workNumbers}`}
                        </div>
                      </div>  <div className="my-details-section__row grid text-small">
                        <div className="my-details-section__cell grid__third">
                          <strong>Home Landline Contact number:</strong>
                        </div>
                        <div className="my-details-section__cell grid__two-thirds">
                          {`${userc2ContactDetails.homeCountryDiallingCode}-${userc2ContactDetails.homeDiallingCode}-${userc2ContactDetails.homeNumbers}`}
                        </div>
                      </div>
                    </section>
                    :<section><div className="my-details-section__row grid text-small">
                      <div className="my-details-section__cell grid__third">
                        <strong>Contact number:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                        {userData.primaryContactNo}
                      </div>
                    </div>
                    <div className="my-details-section__row grid text-small">
                      <div className="my-details-section__cell grid__third">
                        <strong>Alternate contact number:</strong>
                      </div>
                      <div className="my-details-section__cell grid__two-thirds">
                      {userData.secondaryContactNo}
                    </div>
                      </div></section>}
                    <div className="my-details-section__row grid">
                      <div className="my-details-section__cell text-align-right">
                        <span onClick={e => this.toggleDiv(e)} className="text-small link--silent arrow-link--forward" to="#updateContacts" data-js="content-toggle" data-toggle-target="content-contact-form">
                        Update my contact numbers</span>
                      </div>
                    </div>
                    <div className="my-details-section__row" id="content-contact-form" style={{ display: toggleDivName === 'content-contact-form' ? 'block' : 'none' }}>
                      <div className="grid__half--large my-details-section__form">
                        <form name="contactNumbersFormLessId" data-js="validate-form" id="contactNumbersFormLessId" noValidate="true" onSubmit={(e) => { this.handlContactNumbersForm(e); }}>
                          {this.renderFormErrorElm('contactNumbersFormHasErrors')}
                          <div className="text-small">
                            <p>Eg. 27-21-4077002</p>
                          </div>
                          {synchronizeStatus ?
                            <section>
                              <div className="form-field" data-js="form-field">
                                <div className="grid grid__fourth">
                                  <input name="primaryCountryCode" id="fldPrimaryCountryCode" type="text" maxLength="3" placeholder="Country*" value={contactNumbersForm.primaryCountryDiallingCode} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'primaryCountryDiallingCode')} />
                                </div>
                                <div className="grid grid__fourth">
                                  <input name="primaryDiallingCode" id="fldPrimaryDiallingCode" type="text" maxLength="3" placeholder="Dialling*" value={contactNumbersForm.primaryDiallingCode} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'primaryDiallingCode')} />
                                </div>
                                <div className="grid grid__two-fourths">
                                  <input name="primaryNumbers" id="fldPrimaryNumbers" type="text" maxLength="7" placeholder="Number*" value={contactNumbersForm.primaryNumbers} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'primaryNumbers')} />
                                </div>
                              </div>
                              <div className="form-field" data-js="form-field">
                                <div className="grid grid__fourth">
                                  <input name="workCountryCode" id="fldWorkCountryCode" type="text" maxLength="3" placeholder="Country" value={contactNumbersForm.secondaryCountryDiallingCode} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'secondaryCountryDiallingCode')} />
                                </div>
                                <div className="grid grid__fourth">
                                  <input name="workDiallingCode" id="fldWorkDiallingCode" type="text" maxLength="3" placeholder="Dialling" value={contactNumbersForm.secondaryDiallingCode} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'secondaryDiallingCode')} />
                                </div>
                                <div className="grid grid__two-fourths">
                                  <input name="workNumbers" id="fldWorkNumbers" type="text" maxLength="7" placeholder="Number" value={contactNumbersForm.secondaryNumbers} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'secondaryNumbers')} />
                                </div>
                              </div>
                              <div className="form-field" data-js="form-field">
                                <div className="grid grid__fourth">
                                  <input name="secondaryCountryCode" id="fldSecondaryCountryCode" type="text" maxLength="3" placeholder="Country" value={contactNumbersForm.workCountryDiallingCode} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'workCountryDiallingCode')} />
                                </div>
                                <div className="grid grid__fourth">
                                  <input name="secondaryDiallingCode" id="fldSecondaryDiallingCode" type="text" maxLength="3" placeholder="Dialling" value={contactNumbersForm.workDiallingCode} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'workDiallingCode')} />
                                </div>
                                <div className="grid grid__two-fourths">
                                  <input name="secondaryNumbers" id="fldSecondaryNumbers" type="text" maxLength="7" placeholder="Number" value={contactNumbersForm.workNumbers} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'workNumbers')} />
                                </div>
                              </div>
                              <div className="form-field" data-js="form-field">
                                <div className="grid grid__fourth">
                                  <input name="homeCountryCode" id="fldHomeCountryCode" type="text" maxLength="3" placeholder="Country" value={contactNumbersForm.homeCountryDiallingCode} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'homeCountryDiallingCode')} />
                                </div>
                                <div className="grid grid__fourth">
                                  <input name="homeDiallingCode" id="fldHomeDiallingCode" type="text" maxLength="3" placeholder="Dialling" value={contactNumbersForm.homeDiallingCode} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'homeDiallingCode')} />
                                </div>
                                <div className="grid grid__two-fourths">
                                  <input name="homeNumbers" id="fldHomeNumbers" type="text" maxLength="7" placeholder="Number" value={contactNumbersForm.homeNumbers} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'homeNumbers')} />
                                </div>
                              </div><br />
                            </section> :
                            <section>
                              <div className="form-field" data-js="form-field">
                                <div className="grid">
                                  <input name="ContactNumber" id="ContactNumber" type="text" placeholder="Contact Number*" value={contactNumbersForm.contactNumber} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'contactNumber')} />
                                  {this.renderFormFieldErrorElm('contactNumber')}
                                </div>
                              </div>
                              <div className="form-field" data-js="form-field">
                                <div className="grid">
                                  <input name="alternateContactNumber" id="alternateContactNumber" type="text" placeholder="alternate Contact Number" value={contactNumbersForm.alternateContactNumber} onChange={event => this.handleInputChange(event, 'contactNumbersForm', 'alternateContactNumber')} />
                                  {this.renderFormFieldErrorElm('alternateContactNumber')}
                                </div>
                              </div><br />
                            </section>}
                          <div className="form-field">
                            <input name="submit" type="submit" defaultValue="Update" className="btn btn--primary btn--right" />
                            <button type="reset" className="btn btn--silent cancel-btn" value="Cancel" name="cancel" data-js="content-toggle" data-toggle-target="content-contact-form" onClick={e => this.toggleDiv(e)}>Cancel<span className="icon" /></button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <section className="my-details-section">
                      <p style={{ display: 'none' }}>Please note that you can't edit this info due to FICA regulations. Please contact our Customer Services team on 0860 022 002 if you'd like to update any of this info.</p>
                    </section>
                    <section className="grid grid--space-y">
                      <h2 className="text-caps font-graphic">Other Actions</h2>
                      <div className="my-details-section__row">
                        <div className="my-details-section__cell">
                          <span
                          className="text-small link--silent arrow-link--forward link--silent"
                          onClick={this.activateModal}
                          >
                          I want to delete my online profile
                            </span>
                        </div>
                      </div>
                    </section>
                  </section>
                </section>
              </div>
            </div>
          </div>
        </main>
        {
        this.state.modalActive ? this.renderModal() : ''
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentuserDetails: state.accountDetailsReducer,
    synchronizeStatus: state.clp.currentUser.synchronizeStatus,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUserEmail,
    updateContactNumbers,
    changePassword,
    updateUserDetails,
    deleteUser,
    updateUserEmailAddresses,
    getaccountDetailsPageData
  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(AccountDetails);
