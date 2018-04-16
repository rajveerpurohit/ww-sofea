import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import localeInfoUtil from '../../../services/localeInfoUtil';


class RenderNavLink extends Component {
  createLinkPath(ancester) {
    let LinkPath;
    let rootpath = '';
    const path = ancester.navigationState ? ancester.navigationState.substring(0, ancester.navigationState.indexOf('?')) : '';
    const linkText = ancester.label.substring(0, ancester.label.indexOf('_')).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(' ').join('-').replace(/--/i, '-');
    const previousURL = this.props.pathName ? this.props.pathName.substring(0, this.props.pathName.indexOf(linkText.toString() + '/')) : '';
    const href = typeof window !== 'undefined' && window ? window.location.href : '';
    const getNsValue = localeInfoUtil.getParameterByName('Ns', href);
    const getNrppValue = localeInfoUtil.getParameterByName('Nrpp', href);
    const getNrValue = localeInfoUtil.getParameterByName('Nr', href);
    const getNttValue = localeInfoUtil.getParameterByName('Ntt', href);
    const categoryId = ancester.label.substring(ancester.label.indexOf('_') + 1, ancester.label.lastIndexOf('_'));
    this.props.rootCategories.filter((rootCategory) => {
      if (rootCategory.categoryId === categoryId) {
        rootpath = rootCategory.categoryURL;
      }
      if (linkText === 'Food') {
        LinkPath = previousURL + 'Food/' + linkText + path;
      } else {
        LinkPath = previousURL + linkText + path;
      }
      return LinkPath;
    });
    if (getNttValue !== null) {
      // LinkPath = LinkPath.replace('/cat', '/search');
      if (getNrppValue !== null && getNrValue !== null && getNsValue !== null) {
        LinkPath = LinkPath + '?Nr=' + getNrValue + '&Nrpp=' + getNrppValue + '&Ns=' + getNsValue + '&Ntt=' + getNttValue;
        return LinkPath;
      } else if (getNrValue !== null && getNsValue !== null) {
        LinkPath = LinkPath + '?Nr=' + getNrValue + '&Ns=' + getNsValue + '&Ntt=' + getNttValue;
        return LinkPath;
      } else if (getNrValue !== null && getNrppValue !== null) {
        LinkPath = LinkPath + '?Nr=' + getNrValue + '&Nrpp=' + getNrppValue + '&Ntt=' + getNttValue;
        return LinkPath;
      }
      return LinkPath + '?Ntt=' + getNttValue;
    }
    if (rootpath !== '') {
      return rootpath;
    }
    if (LinkPath.charAt(0) !== '/') {
      LinkPath = '/cat/' + LinkPath;
    }
    if (getNrppValue !== null && getNrValue !== null && getNsValue !== null) {
      LinkPath = LinkPath + '?Nr=' + getNrValue + '&Nrpp=' + getNrppValue + '&Ns=' + getNsValue;
      return LinkPath;
    } else if (getNrValue !== null && getNsValue !== null) {
      LinkPath = LinkPath + '?Nr=' + getNrValue + '&Ns=' + getNsValue;
      return LinkPath;
    } else if (getNrValue !== null && getNrppValue !== null) {
      LinkPath = LinkPath + '?Nr=' + getNrValue + '&Nrpp=' + getNrppValue;
      return LinkPath;
    }
    return LinkPath;
  }
  render() {
    const ancester = this.props.ancesterData;
    const linkText = this.props.ancesterData.label ? this.props.ancesterData.label.substring(0, this.props.ancesterData.label.indexOf('_')) : '';
    if (linkText === 'Back to browse') {
      return (<Link className="link--silent text-small" to="">
        <span className="icon icon--left-circ-dark" />
        <span className="icon-text">{linkText}</span>
      </Link>);
    }
    if (ancester.contentPath && linkText !== '') {
      const LinkPath = this.createLinkPath(ancester);
      return (<Link to={`${LinkPath}`} title={linkText}>{`${linkText}`}</Link>);
    } else if (!ancester.contentPath && linkText !== '') {
      return (<Link to={`${ancester.navigationState}${ancester.navigationState}`} title={linkText}>{`${linkText}`}</Link>);
    }
    return (<Link to={`${ancester.navigationState}`}>{`${linkText}`}</Link>);
  }
}
function mapStateToProps(state) {
  return {
    rootCategories: _.get(state, 'headerReducer.meganavReducer.rootCategories', {}),
    pathName: state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname ? state.routing.locationBeforeTransitions.pathname : ''
  };
}

export default connect(mapStateToProps)(RenderNavLink);

