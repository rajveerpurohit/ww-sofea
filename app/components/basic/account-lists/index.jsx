import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import _ from 'lodash';

import ServiceUtil from '../../../services/serviceUtil';
import {
  VIEW_PORT_TYPE_DESKTOP,
  VIEW_PORT_TYPE_MOBILE,
  MOBILE_HEADER_OPTION_ACCOUNT
} from '../../../Constants';

class AccountsList extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseListEnter = this.handleMouseListEnter.bind(this);
    this.handleMouseListLeave = this.handleMouseListLeave.bind(this);
    this.toggleAccountIcon = this.toggleAccountIcon.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      isHovering: false,
      isListHovering: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { viewportType, mobileNavHeaderStatus } = nextProps;

    if (viewportType === VIEW_PORT_TYPE_MOBILE) {
      if (mobileNavHeaderStatus === MOBILE_HEADER_OPTION_ACCOUNT) {
        this.setState({ isListHovering: true, isHovering: true });
      } else {
        this.setState({ isListHovering: false, isHovering: false });
      }
    }
  }

  onLogout(e) {
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

  handleMouseEnter() {
    this.setState({ isHovering: true });
  }

  handleMouseListEnter() {
    this.setState({ isListHovering: true });
  }

  handleMouseListLeave() {
    this.setState({ isListHovering: false });
  }

  handleMouseLeave() {
    setTimeout(() => this.setState({ isHovering: false }), 500);
  }

  toggleAccountIcon() {
    const { isListHovering, isHovering } = this.state;

    if (!isListHovering || !isHovering) {
      this.props.setMobileNavHeaderOption(MOBILE_HEADER_OPTION_ACCOUNT);
    } else {
      this.props.setMobileNavHeaderOption('null');
    }
  }

  render() {
    const { user, currentUser } = this.props;
    const shoppingLists = _.get(currentUser, 'shoppingLists', []);

    if (user.isLoggedIn) {
      const liClass = classnames(
        'nav-list-x__item', 'main-header-nav__item', 'main-header-nav__profile',
        'fly-out', 'fly-out--toggle-overlay-medium',
        {
          'is-open': this.state.isListHovering || this.state.isHovering,
          'child-is-open': this.state.isListHovering || this.state.isHovering
        }
      );
      const spanClass = classnames(
        'icon', 'icon--down-circ-darkest'
      );
      const liProps = {
        className: liClass
      };
      const spanProps = {
        className: spanClass
      };
      if (this.props.viewportType === VIEW_PORT_TYPE_DESKTOP) {
        spanProps.onMouseEnter = this.handleMouseEnter;
        spanProps.onMouseLeave = this.handleMouseLeave;
      } else {
        liProps.onClick = this.toggleAccountIcon;
      }

      return (
        <li {...liProps}>
          <span className="text-xsmall main-header-nav__label">Hello {user.userName}</span>
          <span className="nav-list-x__link">
            <span className="icon icon--user-white inline-block-visible--mobi-max" />
            <strong className="font-graphic text-small main-header-nav__title">
              <Link to="/dashboard" className="fly-out__toggle nav-list-x__link link--silent">
                {ServiceUtil.getLabel(this.props.labels, 'global-header-account-lists-label')}</Link>
              &nbsp;&nbsp;<span {...spanProps} />
            </strong>
          </span>
          <ul className="nav-list fly-out__content main-header-nav__profile-nav" onMouseEnter={this.handleMouseListEnter} onMouseLeave={this.handleMouseListLeave}>
            <li className="nav-list__item">
              <Link to="/dashboard" className="nav-list__link link--silent">
                {ServiceUtil.getLabel(this.props.labels, 'global-header-account-details-label')}
              </Link>
            </li>
            <li className="nav-list__item">
              <Link to="/dashboard/purchases/purchase-history" className="nav-list__link link--silent">
                {ServiceUtil.getLabel(this.props.labels, 'global-header-my-orders-label')}
              </Link>
            </li>
            {!_.isEmpty(shoppingLists) &&
              <li className="nav-list__item">
                <Link to="/dashboard/shopping-lists/shopping-lists-index" className="nav-list__link link--silent">
                  {ServiceUtil.getLabel(this.props.labels, 'global-header-my-shopping-lists-label')}
                </Link>
              </li>
            }
            <li className="nav-list__item">
              <Link className="nav-list__link link--silent" onClick={this.onLogout}>
                {ServiceUtil.getLabel(this.props.labels, 'global-header-signout-label')}
              </Link>
            </li>
          </ul>
        </li>
      );
    }
    return (
      <li className="nav-list-x__item main-header-nav__item main-header-nav__profile">
        <Link to="/login" className="fly-out__toggle nav-list-x__link link--silent">
          <span className="text-xsmall main-header-nav__label"> {ServiceUtil.getLabel(this.props.labels, 'global-header-hello-signin-label')}</span>
          <span className="icon icon--user-white inline-block-visible--mobi-max" />
          <strong className="font-graphic text-small main-header-nav__title">
            REGISTER &nbsp;&nbsp;<span className="icon icon--down-circ-darkest" />
          </strong>
        </Link>
      </li>
    );
  }
}

export default AccountsList;
