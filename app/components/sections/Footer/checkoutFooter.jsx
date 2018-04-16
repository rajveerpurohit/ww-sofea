import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Image from '../../basic/Image';
import { getLoginFooter } from '../Header/actions';
// import { getLoginFooter } from './actions';

class CheckoutFooter extends Component {

  componentDidMount() {
    this.props.getLoginFooter();
  }
  createList(loginFooterData, pagesCode) {
    return loginFooterData.map((item, index) => {
      let stylespec = '';
      if (pagesCode === 'finance' && (index === 0 || index === 4 || index === 5)) { stylespec = 'block'; } else { stylespec = 'none'; }
      if (pagesCode !== 'finance') { stylespec = 'block' }
      return (
        <li style={{ display: stylespec }}><Link to={item.targetUrl} className="link--silent">{item.name}</Link></li>
      );
    });
  }
  render() {
    
    const loginFooterData = _.get(this.props, 'loginFooterData.secureFooterLinks.secureFooterLinks', []);
    // this.props.loginFooterData && this.props.loginFooterData.secureFooterLinks && this.props.loginFooterData.secureFooterLinks.secureFooterLinks ?
    // this.props.loginFooterData.secureFooterLinks.secureFooterLinks : '';
    return (
      <footer className="checkout-footer">
        <ul className="text-caps checkout-footer__nav">
          {this.createList(loginFooterData, this.props.pageCode)}
        </ul>
      </footer>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loginFooterData: state.headerReducer.headerDetailsReducer.headerDetailsData.footer.loginFooterData
    // loginFooterData: state.footer.loginFooterData
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getLoginFooter }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(CheckoutFooter);
