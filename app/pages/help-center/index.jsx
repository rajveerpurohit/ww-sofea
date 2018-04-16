import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { getHelpAction, getLeftNav } from './actions';
import SideBarComponent from '../../components/basic/SideBarContent';
import Panels from '../../components/basic/panels';

class HelpCenter extends Component {
  static need = [
    getHelpAction,
    getLeftNav
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
        <h3 className="font-graphic text-caps">Can't Find What You're After?</h3>
        <p className="text-intro">Let us know and we'll get you the info you're looking for as soon as possible.</p>
        <p><Link to="/contactus" className="btn btn--primary btn--right">Send us your question</Link></p>
      </div>
    );
  }
  secondaryComponent(data) {
    // let panels = [];
    let panels = _.get(data.Static, 'childItems', []);
    panels.map((panel, i) => {
      panel.panelHeading = panel.displayName;
      if (panel.type === 'folder')
        panel.url = '/corporate/' + panel.contentId;
    });
    return (
      <div className="grid grid--space-y">
        <h1 className="font-graphic text-caps">{this.props.helpData.displayName}</h1>
        <p className="text-intro">{this.props.helpData.description}</p>
        {this.props.helpData ? <Panels panelData={panels} /> : null}
      </div>
    );
  }
  primeComponent() {
    return (
      <main className="grid grid--space-y site-main">
        <div className="main-page site-map-content">

          <nav className="breadcrumb empty" />
          <div className="grid grid--space-y page-layout">
            <div className="page-layout__aside">
              {this.props.contentAside && <SideBarComponent leftData={this.props.contentAside} />}
            </div>
            <div className="page-layout__content">
              {this.props.helpData ? this.secondaryComponent(this.props.helpData) : null}
              {this.findComponenet()}
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
    helpData: state.helpReducer.helpCenterReducer.helpCenterData,
    contentAside: state.helpReducer.LeftNavReducer.leftNav
  };
};

export default connect(mapStateToProps)(HelpCenter);
