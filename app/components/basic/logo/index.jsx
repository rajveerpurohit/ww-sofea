import React from 'react';
import { Link } from 'react-router';


const Logo = (props) => {
    return (
      <section className="site-header__wrapper site-header__wrapper--logo">
        <Link to={props.redirectUrl} className="icon site-header__logo">{props.logoLabel}</Link>
      </section>
    );
};
export default Logo;
