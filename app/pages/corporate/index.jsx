import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { getCorporate, getLeftNav } from './actions';
// import Image from '../../components/basic/Image';
import SideBarComponent from '../../components/basic/SideBarContent';
import Panels from '../../components/basic/panels';

import FiveWays from '../content/FiveWays';
import Article from '../content/Article';
import Howto from '../content/Howto';
import Look from '../content/Look';
import Lookbook from '../content/Lookbook';
import Recipe from '../content/Recipe';
import ContentFolder from '../content/ContentFolder';
import SimpleHtml from '../content/SimpleHtml';

class Corporate extends Component {
  static need = [getCorporate, getLeftNav];
  constructor(props) {
    super(props);
  }
  render() {
    const location = _.get(this.props, 'location.pathname', '');
    const breadCrumbs = _.get(this.props, 'corporate.contents.breadcrumbs', {});
    const corporateData = _.get(this.props, 'corporate', {});
    const contentAside = _.get(this.props, 'contentAside', {});
    if (corporateData && corporateData.contents && corporateData.contents.type) {
      switch (corporateData.contents.type) {
        case 'ContentFolder': return <ContentFolder location={location} breadCrumbs={breadCrumbs} contentData={corporateData} contentAside={contentAside} isActive={this.props.location.pathname} />;
        case 'SimpleHTML': return <SimpleHtml location={location} breadCrumbs={breadCrumbs} contentData={corporateData} contentAside={contentAside} isActive={this.props.location.pathname} />;
        case 'FiveWays': return <FiveWays location={location} breadCrumbs={breadCrumbs} contentData={corporateData.contents} contentAside={contentAside} />;
        case 'Article': return <Article location={location} breadCrumbs={breadCrumbs} contentData={corporateData.contents} contentAside={contentAside} />;
        case 'Howto': return <Howto contentData={corporateData} />;
        case 'Look': return <Look contentData={corporateData} />;
        case 'Lookbook': return <Lookbook contentData={corporateData} />;
        case 'Recipe': return <Recipe contentData={corporateData} contentAside={contentAside} />;
        default: return <ContentFolder contentData={corporateData} contentAside={contentAside} />;
      }
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    corporate: state.corporateReducer.corporateContentReducer.corporateData,
    contentAside: state.corporateReducer.LeftNavReducer.leftNav
  };
};

export default connect(mapStateToProps, { getCorporate, getLeftNav })(Corporate);
