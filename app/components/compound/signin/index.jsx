import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { manualLogin, redirect } from './actions';
import { loader } from '../../../actions/common';
import { connect } from 'react-redux';
import LogIn from '../../basic/user/login';
import Register from '../../basic/user/register';

class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isWaiting, message, isLoggedIn } = this.props.user;
        const { manualLogin, redirect } = this.props;
        if(isLoggedIn) {
            redirect('/');
        }
        return (
            <div className="grid flex-parent">
                <LogIn message={message} submit={ manualLogin } labels={this.props.labels} loader={this.props.loader} />
                <Register labels={this.props.labels}/>
            </div>
        );
    }
}

SignIn.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired
};


function mapStateToProps({ user, common }) {
    return {
        user,
        common
    };
}

export default connect(mapStateToProps, {manualLogin, redirect, loader})(SignIn);