import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { createUser } from './actions';
import { validateForm } from '../../utils/validations/rules';

class Registration extends Component {
  constructor(props) {
    super(props);
    const { customer } = this.props;

    this.state = {
      regForm: {
        title: (customer && customer.title) || 'Title',
        firstName: (customer && customer.firstName) || '',
        lastName: (customer && customer.lastName) || '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: '',
        confirmEmail: '',
        primaryContactNo: (customer && customer.primaryContact) || '',
      },
      checkboxClassName: 'class label-checkbox text-small',
      isFormHasErrors: false,
      formErrors: {},
      editable: false,
    };

    this.checkboxHandler = this.checkboxHandler.bind(this);
    // this.handleselectChange = this.handleselectChange.bind(this);
    // this.renderFormErrorElm = this.renderFormErrorElm.bind(this);
    this.renderFormFieldErrorElm = this.renderFormFieldErrorElm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { currentUser, customer } = this.props;
    if (customer && customer.firstName) {
      this.setState({
        editable: true,
      });
    }
  }

  handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { regForm } = this.state;
    const { customer, idenificationNumber } = this.props;
    let formErrors = {};
    formErrors = _.reduce(regForm, (prev, val, field) => {
      prev[field] = this.props.validateForm(val, field, regForm); // eslint-disable-line no-param-reassign
      return prev;
    }, {});
    if (this.state.regForm.title === 'Title') {
      formErrors.title = 'Choose a title';
    }
    if (customer.customerId) {
      regForm.gender = customer.gender;
      regForm.identityNumber = idenificationNumber;
      regForm.passportNumber = customer.passportNumber;
      regForm.differenceCardNo = customer.differenceCard;
      regForm.mySchoolCardNo = customer.mySchoolCard;
      regForm.secondaryContactNo = customer.secondaryContact;
      regForm.synchronizeStatus = true;
      regForm.initials = customer.initials;
      regForm.corporateNumber = customer.customerId;
    }
    if (_.compact(_.values(formErrors)).length === 0) {
      this.setState({ isFormHasErrors: false, formErrors: {} });
      this.props.createUser(Object.assign({}, regForm, { login: regForm.email }), () => {
        const responseUserError = this.props.createError && this.props.createError[0].indexOf('A user already exists for the email address supplied') >= 0 ? <span className="form-field__msg form-field__msg--error">A user already exists for the email address supplied.</span> : '';
        const responsePasswordError = this.props.createError && this.props.createError[0].indexOf('field must be at least 6 characters and maximum 20') >= 0 ? <span className="form-field__msg form-field__msg--error">'Password' field must be at least 6 characters and maximum 20</span> : '';
        this.setState({ formErrors: { responseUserError, responsePasswordError } });
      }).then(() => {
        const errr = this.props.createError && this.props.createError[0];
        if (errr) {
          const responseUserError = errr.message.indexOf('A user already exists for the email address supplied') >= 0 ? <span className="form-field__msg form-field__msg--error">A user already exists for the email address supplied.</span> : '';
          const responsePasswordError = errr.message.indexOf('field must be at least 6 characters and maximum 20') >= 0 ? <span className="form-field__msg form-field__msg--error">'Password' field must be at least 6 characters and maximum 20</span> : '';
          this.setState({ formErrors: { responseUserError, responsePasswordError } });
        }
      });
    } else {
      this.setState({ isFormHasErrors: true, formErrors });
    }
  }

  checkboxHandler(e) {
    const newState = Object.assign({}, this.state);
    newState.regForm.termsAndConditions = (e.target.className === 'class label-checkbox text-small').toString();
    newState.checkboxClassName = e.target.className === 'class label-checkbox text-small' ? 'class label-checkbox text-small is-checked' : 'class label-checkbox text-small';
    this.setState(newState);
  }

  renderFormFieldErrorElm(field) {
    const { isFormHasErrors, formErrors } = this.state;
    if (isFormHasErrors && formErrors[field]) {
      return (
        <span className="form-field__msg form-field__msg--error">{formErrors[field]}</span>
      );
    }
    return null;
  }

  render() {
    const { regForm, checkboxClassName, isFormHasErrors, editable } = this.state;
    return (
      <main className="site-main grid">
        <div className="contentContainer">
          <article className="checkout checkoutRegister">
            <div className="grid grid--space-y">
              <div className="grid__third">
                <h1 className="font-graphic text-caps">Register</h1>
              </div>
              <div className="grid__two-thirds">
                <ul xmlns="http://www.w3.org/1999/html" className="text-medium nav-list-x nav-list-x--line nav-list-x--wrap text-align-right">
                  <li className="nav-list-x__item nav-list-x__item--line nav-list-x__item--wrap"><span>Need help? </span>Call<span className="hide-on-mobi"> us on</span>: <strong><a href="tel:0860100987">0860 100 987</a></strong></li>
                  <li className="nav-list-x__item nav-list-x__item--line nav-list-x__item--wrap text-caps">
                    <Link to="/">Home</Link>
                  </li>
                </ul>
              </div>
            </div>
            <article className="grid grid__two-fourths--large mainColCheckout">
              <form id="regForm" className="regForm" onSubmit={(e) => { this.handleSubmit(e); }} noValidate="true">
                { isFormHasErrors ?
                  <div className="text-small message message--error">
                    <span>There were some errors in your form input. Please review your input below.</span>
                  </div>
                 : null }
                <div className="form-field" data-js="form-field">
                  <div data-validate-msg="Choose a title" className="enhanced-select">
                    <select data-js="enhance-select" name="title" id="fldTitle" className="customSelect small" onChange={event => this.handleInputChange(event, 'regForm', 'title')} disabled={editable}>
                      <option data-validate-unselected="true" value="Title" >Title </option>
                      <option value="Miss">Miss </option>
                      <option value="Mr"> Mr </option>
                      <option value="Mrs"> Mrs </option>
                      <option value="Ms"> Ms </option>
                      <option value="Dr">  Dr </option>
                    </select>
                    <span className="enhanced-select__label">{regForm.title}</span>
                    <span className="icon enhanced-select__icon" />
                  </div>
                  {this.renderFormFieldErrorElm('title')}
                </div>
                <div className="form-field" data-js="form-field">
                  <input data-validate-msg="Enter first name" maxLength="40" tabIndex="1" name="firstname" id="fldFirstName" placeholder="First name*" type="text" value={regForm.firstName} onChange={event => this.handleInputChange(event, 'regForm', 'firstName')} disabled={editable} />
                  {this.renderFormFieldErrorElm('firstName')}
                </div>
                <div className="form-field" data-js="form-field">
                  <input data-validate-msg="Enter surname" maxLength="40" tabIndex="2" name="lastName" id="fldLastName" placeholder="Last name*" type="text" value={regForm.lastName} onChange={event => this.handleInputChange(event, 'regForm', 'lastName')} disabled={editable} />
                  {this.renderFormFieldErrorElm('lastName')}
                </div>

                <div className="form-field" data-js="form-field">
                  <input data-validate-msg="Please enter a valid email address" data-validate-email="compareA" data-validate-type="email" tabIndex="3" name="emailAddress" id="fldEmailAddress" placeholder="Email address*" maxLength="50" type="text" value={regForm.email} onChange={event => this.handleInputChange(event, 'regForm', 'email')} />
                  {this.renderFormFieldErrorElm('email') || this.state.formErrors.responseUserError}
                </div>
                <div className="form-field" data-js="form-field">
                  <input data-validate-email="compareB" data-validate-type="email" tabIndex="4" name="confirmEmailAddress" id="fldConfirmEmailAddress" placeholder="Confirm email address*" maxLength="50" type="text" value={regForm.confirmEmail} onChange={event => this.handleInputChange(event, 'regForm', 'confirmEmail')} />
                  {this.renderFormFieldErrorElm('confirmEmail')}
                </div>
                <div className="form-field" data-js="form-field">
                  <input data-validate-password="compareA" tabIndex="5" name="password" id="fldPassword" placeholder="Enter a password*" maxLength="20" type="password" className="stdFld" value={regForm.password} onChange={event => this.handleInputChange(event, 'regForm', 'password')} />
                  {this.renderFormFieldErrorElm('password') || this.state.formErrors.responsePasswordError}
                </div>
                <div className="form-field" data-js="form-field">
                  <input data-validate-password="compareB" tabIndex="6" name="confirmPassword" id="fldConfirmPassword" placeholder="Confirm password*" maxLength="20" type="password" className="stdFld" value={regForm.confirmPassword} onChange={event => this.handleInputChange(event, 'regForm', 'confirmPassword')} />
                  {this.renderFormFieldErrorElm('confirmPassword')}
                </div>
                <div className="form-field" data-js="form-field">
                  <input data-validate-msg="Please enter a valid contact number with no spaces or special characters (local: 10 digits; international: 15 digits)" data-validate-type="num" maxLength="15" tabIndex="7" name="contactNumber" id="fldContactNumber" placeholder="Contact number*" type="text" value={regForm.primaryContactNo} onChange={event => this.handleInputChange(event, 'regForm', 'primaryContactNo')} />
                  {this.renderFormFieldErrorElm('primaryContactNo')}
                </div>
                <div>
                  <p className="registerFooter text-small">*Required fields</p>
                </div>
                <div className="form-field" data-js="form-field">
                  <input data-validate-msg="You need to accept these terms and conditions to continue" name="TandC" id="fldTAndC" type="checkbox" className="enhanced-checkbox is-enhanced" value="true" />
                  <label htmlFor="fldTAndC" className={checkboxClassName} onClick={e => this.checkboxHandler(e)}>I accept the <Link to="/corporate/fol110048" target="_blank">Terms and conditions</Link></label>
                  {this.renderFormFieldErrorElm('termsAndConditions')}
                </div>
                <div className="form-field registerFooter">
                  <hr />
                  <button name="Submit" id="fldSubmit" type="submit" value="Register" className="btn btn--primary float-r--small">Register</button>
                </div>
              </form>
            </article>
            <div className="grid__fourth--large float-r--large">
              <aside className="">
                <section className="panel panel--padded">
                  <h2 className="font-graphic text-caps">Already a member?</h2>
                  <Link to="login" className="btn btn--secondary btn--block btn--left btn--right">SIGN IN<span /></Link>
                </section>
                <section className=" grid--space-y panel panel--padded">
                  <h2 className="font-graphic text-caps">Register using a Woolworths or MySchool card</h2>
                  <Link to="login" className="btn btn--secondary btn--block btn--left btn--right">Link my card<span /></Link>
                </section>
              </aside>
            </div>
          </article>
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    createError: _.get(state, 'createUserReducer.createUser.createUser.formexceptions', ''),
    dashboarddetails: state.dashboardReducer.dashboard.dashboard,
    customer: state.createUserReducer.createUser.createUser,
    idenificationNumber: _.get(state, 'createUserReducer.createUser.idenificationNumber', ''),
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ createUser, validateForm }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Registration);
