import React, { Component } from 'react';
import {connect} from 'react-redux';

import SignIn from '../../components/compound/signin';

class SignInPage extends Component {


	render() {
		return (
  <main className="site-main grid">
    <div className="grid grid--space-y">
    <article className="checkout">
    <SignIn labels={this.props.labels} />
  </article>
  </div>
  </main>
		);
	}
}

const mapStateToProps = (state) => {
	if (state.labels.labels.myAccount) {
		return {
			labels: state.labels.labels.myAccount
		};
	}
  
};
export default connect(mapStateToProps)(SignInPage);

