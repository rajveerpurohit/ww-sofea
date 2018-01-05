import React, { Component } from 'react';
import {connect} from 'react-redux';

import {returnCartridge} from '../../utils/homePageUtils';
import {getDLPPageData} from './actions';


class DLPPage extends Component {

   static need = [
      getDLPPageData
  ]


  constructor(props) {
        super(props);
       
      }
      componentDidMount() {
        }

  render() {
    return (
      <div className="landing-page-wrapper">
        <div className="grid grid--space-y">
          { this.props.dlpData.length ? returnCartridge(this.props.dlpData[0].mainContent) : null }
          <div className="product-list__item"><div id="curalate-fan-reel-wrapper" /></div>
        </div>
      </div>
    );
  }
}
// export default DLPPage;

const mapStateToProps = (state) => {
  return {
    dlpData: state.dlp.dlpData
  };
};
export default connect(mapStateToProps)(DLPPage);
