import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const CheckoutHeader = () => (<header className="grid checkout-header">
  <Link to="/" className="icon site-header__logo" />
  <Link to="/" className="site-header-foot__icon" />
</header>);

export default CheckoutHeader;
