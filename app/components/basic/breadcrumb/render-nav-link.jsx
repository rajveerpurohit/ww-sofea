import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';


class RenderNavLink extends Component {
  createLinkPath(ancester) {
    let LinkPath;
    let rootpath = '';
    const path = ancester.navigationState ? ancester.navigationState.substring(0, ancester.navigationState.indexOf('?')) : '';
    const linkText = ancester.label.substring(0, ancester.label.indexOf('_')).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(' ').join('-').replace(/--/i, '-');
    const previousURL = this.props.pathName ? this.props.pathName.substring(0, this.props.pathName.indexOf(linkText.toString() + '/')) : '';
    this.props.rootCategories.filter((rootCategory) => {
      if (rootCategory.categoryId === ancester.properties['category.repositoryId']) {
         rootpath = rootCategory.categoryURL;
      }
      if (linkText === 'Food') {
        LinkPath = previousURL + 'Food/' + linkText + path;
      } else {
         LinkPath = previousURL + linkText + path;
      }
      return LinkPath;
    });
    if (rootpath !== '') {
      return rootpath;
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
    rootCategories: state.headerReducer.meganavReducer.rootCategories,
    pathName: state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname ? state.routing.locationBeforeTransitions.pathname : ''
  };
}

export default connect(mapStateToProps)(RenderNavLink);

