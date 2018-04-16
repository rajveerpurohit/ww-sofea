import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { viewportType } from '../../../actions/common';
import { setUserSession } from '../../compound/signin/actions';
import {
  VIEW_PORT_TYPE_MOBILE,
  VIEW_PORT_TYPE_DESKTOP
} from '../../../Constants';

class CheckoutHeader extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);
    }
  }


  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateDimensions);
    }
  }

  updateDimensions() {
    if (typeof window !== 'undefined' && window.innerWidth < 840) {
      this.props.viewportType(VIEW_PORT_TYPE_MOBILE);
    } else {
      this.props.viewportType(VIEW_PORT_TYPE_DESKTOP);
    }
  }

  render() {
    return (
      <header className="checkout-header">
        <article className="logo">
          <Link to="/" />
        </article>
        {this.props.pageCode === 'finance' && <span className="wfs-app__logo text-caps">Financial Services</span>}
        <article className="wLogo">
          <Link to="/" />
        </article>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return ({
    labels: state.labels.labelsAndErrorMessages,
    viewportType: state.common.viewportType
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ viewportType, setUserSession }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutHeader);
