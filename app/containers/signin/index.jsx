import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { manualLogin, redirect } from '../../actions/users';
import { connect } from 'react-redux';
import LogIn from '../../components/compound/user/login';
import Register from '../../components/compound/user/register';

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
                <LogIn message={message} submit={ manualLogin } />
                <Register />
            </div>
        );
    }
}

SignIn.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired
};


function mapStateToProps({ user }) {
    return {
        user
    };
}

export default connect(mapStateToProps, { manualLogin, redirect })(SignIn);