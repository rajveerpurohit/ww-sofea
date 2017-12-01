import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const CheckoutHeader = () => (<header className="grid checkout-header">
<Link to="/" className="icon site-header__logo"></Link>
<Link to="/" className="site-header-foot__icon"></Link>
</header>);

export default CheckoutHeader;