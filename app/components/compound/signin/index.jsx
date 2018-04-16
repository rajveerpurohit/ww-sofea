import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { manualLogin, redirect } from './actions';
import { loader } from '../../../actions/common';
import Otp from '../../../pages/otp';
import LogIn from '../../basic/user/login';
import Register from '../../basic/user/register';
import SignedInUser from '../../../pages/sigend-user';

class SignIn extends Component {
  constructor(props) {
    super(props);
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('emailValue') : '';
    const emailDisabled = typeof window !== 'undefined' ? localStorage.getItem('emailValue') : '';
    this.state = {
      userEmail,
      emailDisabled,
      isLogin: false
    };
    this.clearEmailInput = this.clearEmailInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  clearEmailInput() {
    this.setState({
      emailDisabled: ''
    });
    window.localStorage.setItem('emailValue', '');
  }

  handleInputChange(e) {
    this.setState({ userEmail: e.target.value });
  }
  isLogin(param) {
    this.setState({ isLogin: param });
  }
  render() {
    const { message, isLoggedIn } = this.props.user;
    const currentUser = this.props.currentUser;
    const { customer } = this.props;
    const loggedInStatus = currentUser.loggedInStatus || 0;
    if (customer && customer.contactNumber && this.state.isLogin === false) {
      return <Otp isLogin={this.isLogin} />;
    }
    if (isLoggedIn && loggedInStatus > 4) {
      // this.props.redirect('/signed-user');
      return (
        <div>
          <SignedInUser />
        </div>
      );
    }

    return (
      <div className="grid flex-parent">
        <LogIn
          message={message}
          labels={this.props.labels}
          loader={this.props.loader}
          submit={this.props.manualLogin}
          redirectUrl={this.props.common.previousLocation}
          userEmail={this.state.userEmail}
          clearEmailInput={this.clearEmailInput}
          handleInputChange={this.handleInputChange}
          emailDisabled={this.state.emailDisabled}
        />
        <Register labels={this.props.labels} />
      </div>
    );
  }
}

SignIn.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, common, clp, createUserReducer }) => {
  const currentUser = clp.currentUser || {};
  const customer = createUserReducer.createUser.createUser || {};
  return { user, common, currentUser, customer };
};

export default connect(mapStateToProps, { manualLogin, redirect, loader })(SignIn);
