import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { returnCartridge } from '../../utils/homePageUtils';
import { SEOTags } from '../../utils/seoUtils';


class HomePage extends Component {

  constructor(props) {
    super(props);
    this.returnHomeCartridge = this.returnHomeCartridge.bind(this);
  }
  returnHomeCartridge() {
    if (this.props.homeData.length && this.props.homeData[0].mainHeader) {
      return (<div className="grid grid--space-y">
        {this.props.homeData.length ? returnCartridge(this.props.homeData[0].mainHeader) : null}
        {this.props.homeData.length ? returnCartridge(this.props.homeData[0].mainSubHeader) : null}
        {this.props.homeData.length ? returnCartridge(this.props.homeData[0].subHeader) : null}
      </div>);
    }
    return (
      <div className="grid grid--space-y">
        {this.props.homeData.length ? returnCartridge(this.props.homeData[0].mainContent) : null}
      </div>
    );
  }
  render() {
    const SEOTagsData = _.get(this.props, 'SEOTags', {});
    return (
      <div className="grid grid--homepage main-page">
        {!_.isEmpty(SEOTagsData) &&
          <SEOTags
            title={SEOTagsData.title}
            metaKeywords={SEOTagsData.SEOTagsData}
            metaDescription={SEOTagsData.metaDescription}
          />
        }
        <nav className="homeNav" />
        <div className="landing-page-wrapper" >
          {this.returnHomeCartridge()}
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    homeData: state.home.homeData,
    SEOTags: state.common.seo.SEOTags.home
  };
};

export default connect(mapStateToProps)(HomePage);
