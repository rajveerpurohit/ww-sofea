import React, { Component } from 'react';
import {connect} from 'react-redux';

const Register = () => (
<div className="grid__half--medium panel panel--padded">    
    <article className="newToWoolworthsOnline">
        <div className="grid">
            <h3 className="hide-on-mobi text-caps font-graphic">REGISTER WITH WOOLWORTHS</h3>
            <div className="font-graphic heading--4">
                Get started on our website and app
            </div>
            <div className="grid--space-y">
                <input className="input enhanced-checkbox is-enhanced" id="hasCard" name="hasCard" type="checkbox" defaultValue="hasCard"/><label className="enhanced-checkbox text-small label-checkbox" data-checkbox-toggle="" htmlFor="hasCard">Already have a card?</label>
            </div>
            <div className="grid--space-y hidden" data-toggle-checked="">
                <p className="text-small">Enter your ID or passport number - we'll find your details</p>
                <form action="/store/fragments/login/login-index.jsp?returnUrl=/store/index.jsp&amp;_DARGS=/store/fragments/login/new-form.jsp" autoComplete="off" className="wForm checkoutForm" data-js="validate-form" id="tripleRegisterForm" method="post" name="tripleRegisterForm" noValidate="true">
                    <div className="form-field idMethod form-field--enhanced-label" data-js="form-field" id="idPassport">
                        <label className="form-field__label form-field__label--enhanced" data-js="enhance-label">ID or Passport Number</label> 
                        <input className="stdFld" data-js="validate-field" data-validate-msg="Enter your ID or Passport number" data-validate-required="true" id="fldIdPassport" maxLength="13" name="idNumber" tabIndex="3" type="text"/>
                    </div> 
                    <input className="btn btn--primary btn--right grid--space-y" id="fetchDetails" type="submit" defaultValue="Register"/>
                </form>
            </div>
            <a className="btn btn--primary grid--space-y" data-toggle-unchecked="" href="/store/fragments/register/register-index.jsp">Register</a>
        </div>
    </article>
</div>
);

export default Register;