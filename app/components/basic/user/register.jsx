import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import ServiceUtil from '../../../services/serviceUtil';
import { getUserCardDetails } from '../../../pages/registration/actions';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { showForm: false, isChecked: false, tripleRegisterForm: { idNumber: '' }, showErrMsg: false };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
  }

  onChangeHandler() {
    this.setState({
      showForm: !this.state.showForm,
      isChecked: !this.state.isChecked
    });
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
  render() {
    const { labels, customer } = this.props;
    const { showForm, tripleRegisterForm, showErrMsg } = this.state;
    if (customer && customer.contactNumber) {
      browserHistory.push({ pathname: '/otp' });
    }
    return (
      <div className="grid__half--medium panel panel--padded">
        <article className="newToWoolworthsOnline">
          <div className="grid">
            <h3 className="hide-on-mobi text-caps font-graphic">{ServiceUtil.getLabel(labels, 'global-login-rgister-woolworths-label')} </h3>
            <div className="font-graphic heading--4">{ServiceUtil.getLabel(labels, 'global-login-get-started-website-app-label')}</div>
            <div className="grid--space-y">
              <input className="input enhanced-checkbox is-enhanced" id="hasCard" name="hasCard" type="checkbox" defaultValue="hasCard" onChange={() => this.onChangeHandler()} />
              <label className={`enhanced-checkbox text-small label-checkbox ${(this.state.isChecked) ? 'is-checked' : ''}`} htmlFor="hasCard">
                {ServiceUtil.getLabel(labels, 'global-login-already-have-card-label')}
              </label>
            </div>
            {showForm ? <div className="<grid--space-y">
              <p className="text-small">{ServiceUtil.getLabel(labels, 'global-login-enter-id-passport-label')}</p>
              <form
              className="wForm checkoutForm"
              id="tripleRegisterForm"
              name="tripleRegisterForm"
              >
                <div className="form-field idMethod" data-js="form-field" id="idPassport">
                  <input
                  className="stdFld"
                  id="fldIdPassport"
                  maxLength="13"
                  name="idNumber"
                  tabIndex="3"
                  type="text"
                  value={tripleRegisterForm.idNumber}
                  onChange={event => this.handleInputChange(event, 'tripleRegisterForm', 'idNumber')}
                  />
                </div>
                {showErrMsg ? <span className="form-field__msg form-field__msg--error">Please Enter your ID or passport number</span> : ''}
                <span className="form-field__msg form-field__msg--error">{customer.formexceptions && customer.formexceptions[0].message}</span>
                {showForm ? <input className="btn btn--primary btn--right" id="fetchDetails" type="button" defaultValue="Register" onClick={() => this.getUserCardDetails()} /> : null}
              </form>
            </div> : null}
            {showForm ? null : <Link className="nav-list__link link--silent btn btn--primary grid--space-y" to="/registration">
              {ServiceUtil.getLabel(labels, 'global-login-register-label')}
            </Link>}
          </div>
        </article>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customer: state.createUserReducer.createUser.createUser,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserCardDetails }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Register);
