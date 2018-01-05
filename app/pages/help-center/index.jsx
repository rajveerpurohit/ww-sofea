import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';

import {getHelpAction} from './actions';
import SideBarComponent from '../../components/basic/SideBarContent';
import Panels from '../../components/basic/panels';

class HelpCenter extends Component {
  static need = [
     getHelpAction
  ]

  constructor(props) {
    super(props);

    this.primeComponent = this.primeComponent.bind(this);
    this.secondaryComponent = this.secondaryComponent.bind(this);
    this.findComponenet = this.findComponenet.bind(this);
  }
  findComponenet() {
    return (
      <div className="grid grid--space-y">
        <hr className="hr--light" />
        <h2 className="font-graphic text-caps">{this.props.searchData.heading}</h2>
        <p className="text-intro">{this.props.searchData.description}</p>
        <Link className="btn btn--primary btn--right" to={this.props.searchData.searchBtnUrl}>{this.props.searchData.searchBtnTxt}</Link>
      </div>
    );
  }
  secondaryComponent() {
    return (
      <div className="grid grid--space-y">
        <h1 className="font-graphic text-caps">{this.props.helpData.heading}</h1>
        <p className="text-intro">{this.props.helpData.description}</p>
        {this.props.helpData ? <Panels panelData={this.props.helpData} /> : null}
      </div>
    );
  }
  primeComponent() {
    return (
      <main className="grid grid--space-y site-main">
        <div className="main-page ">

          <nav className="breadcrumb empty" />
          <div className="grid grid--space-y page-layout">
            <div className="page-layout__aside">
              { this.props.contentAside && <SideBarComponent leftData={this.props.contentAside} />}
            </div>
            <div className="page-layout__content">
              {this.props.helpData ? this.secondaryComponent() : null}
              {this.props.searchData ? this.findComponenet() : null}
            </div>
          </div>
        </div>
      </main>
    );
  }
  render() {
    return (
      <div>
        {this.primeComponent()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    helpData: state.helpCenterReducer.helpCenterData.help,
    searchData: state.helpCenterReducer.helpCenterData.search,
    contentAside: state.helpCenterReducer.helpCenterData.LeftNav,
    };
};

export default connect(mapStateToProps)(HelpCenter);
