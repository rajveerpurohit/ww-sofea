import React, { Component } from 'react';
import {connect} from 'react-redux';
import SignIn from '../../containers/signin';

const SignInPage = () => (
   <main className="site-main grid">
		<div className="grid grid--space-y">
			<article className="checkout">
				<SignIn />
			</article>
		</div>
	</main>
);

export default SignInPage;