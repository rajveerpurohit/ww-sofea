import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { logOut } from '../../components/compound/signin/actions';

class SignedInUser extends Component {
  constructor(props) {
    super(props);
    this.primeComponent = this.primeComponent.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
  }
  handleLogout(e) {
    e.preventDefault();
    const logout = this.props.logOut;
    Promise.resolve()
            .then(() => logout()) // resolve func[0]
            .then(() => {
              if (typeof window !== 'undefined' && window) {
                localStorage.setItem('SelectedOption', 'Delivery Area');
                localStorage.setItem('logout', true);
              }
            });
  }
  primeComponent() {
    const firstName = _.get(this.props.currentUser, 'firstName', '');
    return (
      <div className="grid-wrapper">
        <main className="site-main grid">
          {/* CONTENT */}
          {/* CONTENT CONTAINER */}
          <div className="grid grid--space-y">
            {/*  load page relevant to url param (based on name) */}
            {/* LOGIN */}
            <article className="checkout">
              {/*
                 <section>
                    <p class="note">If you have a Woolies Store Card, Credit Card or Personal Loan and have not yet reset your old login details, then click <a href="/store/fragments/login/wfs-login.jsp"><strong>here</strong></a> to reset now.</p>
                 </section>
                 */}{/* DESKTOP */}
              <div className="grid flex-parent">
                <div className="grid__half--medium theme--medium panel--padded">
                  {/* EXISTING */}
                  <article className="alreadyHaveALogin ">
                    <div className="grid">
                      {/* LOGIN FORM */}
                      <p className="heading--4 font-graphic text-caps">You are currently logged in as {firstName}.</p>
                      <span className="theme--dark">
                        <Link to="" onClick={(e) => { this.handleLogout(e); }} className="btn btn--primary btn--right">Sign out</Link>
                      </span>
                    </div>
                  </article>
                  {/* END EXISTING */}
                </div>
                <div className="grid__half--medium panel panel--padded">
                  {/* AUTHENTICATED USER */}
                  <article className="newToWoolworthsOnline">
                    <div className="box">
                      <span className="hide-on-mobi">
                        <h3 className="font-graphic text-caps heading--3">ACCESS YOUR ACCOUNT</h3>
                        <p className="text-small ">to update your contact details, view your purchase history and view your exclusive WRewards benefits</p>
                      </span>
                      <span className="text-small">
                        <p>Access your Woolworths Online account details</p>
                      </span>
                      <div className="grid--space-y"><Link to="dashboard" className="btn btn--right btn--primary">your account</Link></div>
                      <div className="grid--space-y"><Link href="/" className="btn btn--primary btn--right">Continue shopping</Link></div>
                    </div>
                  </article>
                  {/* END AUTHENTICATED USER */}
                </div>
              </div>
              {/* MOBILE */}
            </article>
            {/* END LOGIN */}
          </div>
        </main>
      </div>
    );
  }
  render() {
    console.log('currentUser', this.props.currentUser);
    return (
      <div>
        {this.primeComponent()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.clp.currentUser
  };
};


export default connect(mapStateToProps,{ logOut })(SignedInUser);
