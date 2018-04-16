import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { confirmUserLogin } from '../registration/actions';
import _ from 'lodash';

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      regForm: {
        login: '',
      },
      err: false,
      errorMsg: this.props.errorMsg && errorMsg[0].message
    } 
    this.primeComponent = this.primeComponent.bind(this);
    this.confirmUserLogin = this.confirmUserLogin.bind(this);
  }

 handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
    // this.updateValidators(inputPropName, e.target.value);
  }
confirmUserLogin(){
  const { regForm } = this.state;
  if(regForm.login && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(regForm.login)){
    this.props.confirmUserLogin(regForm, 'forgotpassword');
    this.setState({
      err: false
    })
  } else if (regForm.login !== '' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(regForm.login)){
    this.setState({
      err: true,
      errorMsg: 'Please enter a valid email address'
    });
  } else {
    this.setState({
      err: true,
      errorMsg: 'This is a required field'
    });
  }
}
  primeComponent() {
    const { regForm, err, errorMsg } = this.state;
    return (
      <main className="site-main grid">
        {/* CONTENT */}
        {/* CONTENT CONTAINER */}
        <div className="grid grid--space-y">
          {/*  load page relevant to url param (based on name) */}
          {/* RESET PASSWORD */}
          <div className="checkout">
            <div className="grid">
              <h2 className="font-graphic text-caps">Forgotten your password?</h2>
              <div className="panel panel--padded">
                {err || errorMsg ? <div data-js="form-feedback" className="text-small message message--error"><span>There were some errors in your form input. Please review your input below.</span></div> : null }
                <form name="resetPasswordForm" id="frmResetPasswordForm" className="checkoutForm">
                  <p>Enter your registered email address and we'll reset your password.</p>
                  <div className="form-field" data-js="form-field">
                    <input size={35} data-validate-type="email" name="emailAddress" id="fldEmailAddress" placeholder="Registered email address" type="text" value={regForm.login} onChange={event => this.handleInputChange(event, 'regForm', 'login')} />
                    {err || errorMsg ? <span className="form-field__msg form-field__msg--error">{errorMsg}</span> : ''}
                  </div>
                  <div className="form-field">
                    <input name="listSubmit" className="btn btn--primary" id="fldListSubmit" type="button" value="forgot" onClick={()=>this.confirmUserLogin()} />
                    <Link id="fldCancel" to="login" className="btn btn--silent cancel-btn">Cancel <span className="icon" /></Link>
                  </div>

                </form>
              </div>
            </div>
          </div>{/* END RESET PASSWORD */}</div>
      </main>
    );
  }
  render() {
    return (
      <div className="grid-wrapper">
        {this.primeComponent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMsg: _.get(state, 'createUserReducer.createUser.createUser.formexceptions', ''),
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ confirmUserLogin }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ResetPassword);
