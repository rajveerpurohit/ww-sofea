import React, { Component } from 'react';
import { Link } from 'react-router';
import ServiceUtil from '../../../services/serviceUtil';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.password = null;
    this.onSubmit = this.onSubmit.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.state = {
      allowLogin: false,
      isFormHasErrors: false,
      formErrors: {},
    }
  }
  
  changePassword(password) {
    this.password = password;
  }

  componentDidMount() {
    this.setState({ allowLogin: true });
  }

  onSubmit(e) {
    const { message, submit, labels, redirectUrl, userEmail, clearEmailInput, handleInputChange, emailDisabled } = this.props;
    const { formErrors, isFormHasErrors } = this.state;
    e.preventDefault();
    if(userEmail === '' || this.password.value === '' || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userEmail)) {
      formErrors.userEmail = userEmail === '' || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userEmail) ? 'Enter your email address' : '';
      formErrors.password = this.password.value === '' ? 'Enter your password' : '';
      this.setState({isFormHasErrors: true, formErrors})
    } else{
      this.setState({isFormHasErrors: false, formErrors: {}})
      let login = userEmail;
      let password = this.password.value;
      this.props.loader(true);
      submit({ login, password }, redirectUrl).then(() => {
        this.props.loader(false);
      });

      if (typeof window !== 'undefined' && window) {
        localStorage.removeItem('logout');
      }
    }
  }

  render() {
    const { message, submit, labels, redirectUrl, userEmail, clearEmailInput, handleInputChange, emailDisabled } = this.props;
    const { formErrors, isFormHasErrors } = this.state;
    let password;
    let login;

    return (
      <div className="grid__half--medium theme--medium panel--padded">
        <article className="alreadyHaveALogin">
          <div className="grid">
            <h3 className="font-graphic text-caps">{ServiceUtil.getLabel(labels, 'global-login-signin-label')}</h3>
            <span className="heading--4 font-graphic text-caps">{ServiceUtil.getLabel(labels, 'global-login-enter-profile-details-label')}</span>
            <form autoComplete="off" className="grid--space-y" id="loginForm" method="post" name="loginForm" noValidate="true" onSubmit={this.onSubmit}>
              <div className="text-small message message--error" style={{ display: !message ? 'none' : 'block' }}>
                <span>{message}</span>
              </div>
              {isFormHasErrors ?
              <div className="text-small message message--error"  style={{ display: 'block' }}>
                <span>There were some errors in your form input. Please review your input below.</span>
              </div>: null
              }
              <div className="form-field">
                <input
                  data-js="validate-field"
                  data-validate-msg="Enter your email address"
                  data-validate-required="true"
                  data-validate-type="email"
                  id="fldEmailAddressSml"
                  name="emailAddress"
                  placeholder={ServiceUtil.getLabel(labels, 'global-login-emailaddress-label')}
                  tabIndex="1"
                  type="email"
                  value={userEmail}
                  disabled={emailDisabled}
                  onChange={(e)=>handleInputChange(e)}
                />
                {isFormHasErrors && formErrors.userEmail ? <span className="form-field__msg form-field__msg--error">{formErrors.userEmail}</span>: null}
              </div>
              <div className="form-field">
                <input
                  data-js="validate-field"
                  data-validate-msg="Enter your password"
                  data-validate-required="true"
                  id="fldPasswordSml"
                  name="password"
                  placeholder={ServiceUtil.getLabel(labels, 'global-login-password-label')}
                  tabIndex="2"
                  type="password"
                  defaultValue=""
                  ref={input => this.changePassword(input)}
                />
                {isFormHasErrors && formErrors.password ? <span className="form-field__msg form-field__msg--error">{formErrors.password}</span>: null}
              </div>
              <div className="grid--space-y text-small">
                <Link className="forgotPassword link--silent" to="/reset-password">
                  <span className="icon icon--right-dark" />
                  <span className="icon-text">{ServiceUtil.getLabel(labels, 'global-login-forgot-password-label')}</span>
                </Link>{' '}
                <span>&nbsp;&nbsp;</span>{' '}
                <a
                  className="forgotPassword leftOffset link--silent"
                  href="#"
                >
                  <span className="icon icon--right-dark" />
                  <span className="icon-text" onClick={clearEmailInput}>{ServiceUtil.getLabel(labels, 'global-login-not-you-label')}</span>
                </a>
              </div>
              <div className="grid--space-y">
                <button type="submit" id="login" className="btn btn--primary btn--right" name="login" disabled={!this.state.allowLogin} >
                  {ServiceUtil.getLabel(labels, 'global-login-signin-label')}
                </button>
              </div>
            </form>
          </div>
        </article>
      </div>
    );
  }
};

export default LogIn;
