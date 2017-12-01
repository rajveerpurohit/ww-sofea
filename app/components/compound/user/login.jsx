import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const LogIn = ({message,  submit}) => {

    let email, password, login;

    const onSubmit = (e) => {
        e.preventDefault();
        login = email.value;
        password = password.value;
        submit({ login, password });
    }

    return (
        <div className="grid__half--medium theme--medium panel--padded">
        <article className="alreadyHaveALogin">
            <div className="grid">
                <h3 className="font-graphic text-caps">Sign in</h3><span className="heading--4 font-graphic text-caps">Enter your profile details</span>
                <form action="/rest/model/atg/userprofiling/ProfileActor/login" autoComplete="off" className="grid--space-y" data-js="validate-form" id="loginForm" method="post" name="loginForm" noValidate="true" onSubmit={onSubmit}>
                    <div className="text-small message message--error" style={{display: (!message) ? 'none' : 'block'}}><span>{message}</span></div>
                    <div className="form-field" data-js="form-field">
                        <input data-js="validate-field" data-validate-msg="Enter your email address" data-validate-required="true" data-validate-type="email" id="fldEmailAddressSml" name="emailAddress" placeholder="Email address" tabIndex="1" type="email" defaultValue="" ref={input => email = input }/>
                    </div>
                    <div className="form-field" data-js="form-field">
                        <input data-js="validate-field" data-validate-msg="Enter your password" data-validate-required="true" id="fldPasswordSml" name="password" placeholder="Password" tabIndex="2" type="password" defaultValue="" ref={input => password = input } />
                    </div>
                    <div className="grid--space-y text-small">
                        <a className="forgotPassword link--silent" href="/store/fragments/login/login-index.jsp?content=reset-password"><span className="icon icon--right-dark"></span><span className="icon-text">Forgot your password?</span></a> <span>&nbsp;&nbsp;</span> <a className="forgotPassword leftOffset link--silent" href="/store/fragments/login/login-index.jsp?returnUrl=/store/&amp;_DARGS=/store/fragments/login/existing-form.jsp.1_A&amp;_DAV=&amp;_dynSessConf=4966436993587118294"><span className="icon icon--right-dark"></span><span className="icon-text">Not you?</span></a>
                    </div>
                    <div className="grid--space-y">
                        <button type="submit" id="login" className="btn btn--primary btn--right" name="login">Sign In</button> 
                    </div>
                </form>
            </div>
        </article>
        </div>
    );
}

export default LogIn;