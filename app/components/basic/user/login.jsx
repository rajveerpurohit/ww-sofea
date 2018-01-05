import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import ServiceUtil from '../../../services/serviceUtil';

const LogIn = (props) => {
    const {message, submit, labels} = props;
    let email, password, login;

    const onSubmit = (e) => {
        e.preventDefault();
        login = email.value;
        password = password.value;
        props.loader(true);
        submit({ login, password })
        .then(() => {
            props.loader(false);
        });
        if (typeof window !== 'undefined' && window){
            localStorage.removeItem("logout");
        }
    };

    return (
      <div className="grid__half--medium theme--medium panel--padded">
          <article className="alreadyHaveALogin">
          <div className="grid">
              <h3 className="font-graphic text-caps">{ServiceUtil.getLabel(labels, 'global-login-signin-label')}</h3><span className="heading--4 font-graphic text-caps">{ServiceUtil.getLabel(labels, 'global-login-enter-profile-details')}</span>
              <form autoComplete="off" className="grid--space-y" data-js="validate-form" id="loginForm" method="post" name="loginForm" noValidate="true" onSubmit={onSubmit}>
                  <div className="text-small message message--error" style={{display: (!message) ? 'none' : 'block'}}><span>{message}</span></div>
                  <div className="form-field" data-js="form-field">
                      <input data-js="validate-field" data-validate-msg="Enter your email address" data-validate-required="true" data-validate-type="email" id="fldEmailAddressSml" name="emailAddress" placeholder={ServiceUtil.getLabel(labels, 'global-login-emailaddress')} tabIndex="1" type="email" defaultValue="" ref={input => email = input}  />
                    </div>
                  <div className="form-field" data-js="form-field">
                      <input data-js="validate-field" data-validate-msg="Enter your password" data-validate-required="true" id="fldPasswordSml" name="password" placeholder={ServiceUtil.getLabel(labels, 'global-login-password')} tabIndex="2" type="password" defaultValue="" ref={input => password = input} />
                    </div>
                  <div className="grid--space-y text-small">
                      <a className="forgotPassword link--silent" href="/store/fragments/login/login-index.jsp?content=reset-password"><span className="icon icon--right-dark" /><span className="icon-text">{ServiceUtil.getLabel(labels, 'global-login-forgot-password')}</span></a> <span>&nbsp;&nbsp;</span> <a className="forgotPassword leftOffset link--silent" href="/store/fragments/login/login-index.jsp?returnUrl=/store/&amp;_DARGS=/store/fragments/login/existing-form.jsp.1_A&amp;_DAV=&amp;_dynSessConf=4966436993587118294"><span className="icon icon--right-dark" /><span className="icon-text">{ServiceUtil.getLabel(labels, 'global-login-not-you')}</span></a>
                    </div>
                  <div className="grid--space-y">
                      <button type="submit" id="login" className="btn btn--primary btn--right" name="login">{ServiceUtil.getLabel(labels, 'global-login-signin-label')}</button>
                    </div>
                </form>
            </div>
        </article>
        </div>
    );
};

export default LogIn;
