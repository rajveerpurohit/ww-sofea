import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { returnCartridge } from '../../utils/homePageUtils';
import { getDLPPageData } from '../dlp/actions';

class IntlPage extends Component {
  static need = [getDLPPageData]

  render() {
    const mainContent = _.get(this.props, 'dlpData[0].mainContent', null);

    return (
      <div className="landing-page-wrapper">
        <div className="grid grid--space-y">
          {mainContent && returnCartridge(mainContent)}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ dlpData: state.dlp.dlpData }), {})(IntlPage);
