import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { confirmUserLogin } from '../registration/actions';

export default class ResetPasswordThanks extends Component {

  constructor(props) {
    super(props);
    this.primeComponent = this.primeComponent.bind(this);
  }

  primeComponent() {
    const { regForm } = this.state;
    return (
      <main className="site-main grid">
      </main>
    );
  }
  render() {
    return (
      <div className="grid-wrapper">
        <div className="grid grid--space-y">
          <article className="checkout grid">
              <article className="fullBlock atg_store_myAccount">
                <h2 className="font-graphic text-caps">Temporary Password Sent</h2>
                <div className="panel panel--padded">
                    <p className="text-intro">Your password has been reset and emailed to the address provided.</p>
                    <p className="text-intro">Please check this email for your temporary password. Once you are successfully logged in, you should change this password to something you will remember.</p>
                    <p className="text-intro">Note: temporary passwords are only sent to email addresses used at registration.</p>
                    <Link className="nav-list__link link--silent btn btn--primary grid--space-y" to="/login">Go to login</Link>
                </div>
              </article>
          </article>
        </div>      
      </div>
    );
  }
}

