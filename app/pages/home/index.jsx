import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {returnCartridge} from '../../utils/homePageUtils';
import {getHomePageData} from './actions';


class HomePage extends Component {

   static need = [
    getHomePageData
  ]

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
    } else {
      return (
        <div className="grid grid--space-y">
          { this.props.homeData.length ? returnCartridge(this.props.homeData[0].mainContent) : null }
        </div>
      );
    }
  }
  render() {
    return (
      <div className="grid grid--homepage main-page">
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
    homeData: state.home.homeData
  };
};

export default connect(mapStateToProps)(HomePage);
