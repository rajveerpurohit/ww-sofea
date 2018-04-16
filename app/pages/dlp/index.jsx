import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { returnCartridge } from '../../utils/homePageUtils';
import { getDLPPageData } from './actions';
import { resetComponentState } from '../pdp/actions';
import { SEOTags } from '../../utils/seoUtils';


class DLPPage extends Component {

  static need = [getDLPPageData]

  constructor(props) {
    super(props);
  }

  render() {
    const SEOTagsData = _.get(this.props, 'SEOTags', {});
    return (
      <div className="landing-page-wrapper">
        {!_.isEmpty(SEOTagsData) &&
          <SEOTags
            title={SEOTagsData.title}
            metaKeywords={SEOTagsData.SEOTagsData}
            metaDescription={SEOTagsData.metaDescription}
          />
        }
        <div className="grid grid--space-y">
          {this.props.dlpData.length ? returnCartridge(this.props.dlpData[0].mainContent) : null}
          {/* <div className="product-list__item"><div id="curalate-fan-reel-wrapper" /></div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dlpData: state.dlp.dlpData,
    SEOTags: state.common.seo.SEOTags.dlp || {}
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ resetComponentState }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(DLPPage);
