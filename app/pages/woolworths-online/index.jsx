import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import {getUsingWoolworthsOnline} from './action';
import SideBarComponent from '../../components/basic/SideBarContent';
import Panels from '../../components/basic/panels';

class WoolworthsOnline extends Component {
  static need = [
    getUsingWoolworthsOnline
  ];
  constructor(props) {
    super(props);
    this.primeComponent = this.primeComponent.bind(this);
    this.secondaryComponent = this.secondaryComponent.bind(this);
  }
  componentDidMount() {

  }
  secondaryComponent() {
    return (

      <div className="grid">
        <header />
        <div className="grid">
          <img className=" img-fill-responsive" alt="Placeholder" src={this.props.woolData.woolworthsOnline ? this.props.woolData.woolworthsOnline.imageUrl : ''} />
        </div>

        <p className="text-intro" />
        <article className="grid grid--space-y">
          {this.props.woolData.woolworthsOnline ? <Panels panelData={this.props.woolData.woolworthsOnline} /> : null}

        </article>

      </div>
    );
  }
  primeComponent() {
    return (
      <main className="grid grid--space-y site-main">
        <div className="main-page ">

          <nav className="breadCrumbs empty" />

          <div className="grid page-layout">
            <div className="page-layout__aside">
              { this.props.contentAside && <SideBarComponent leftData={this.props.contentAside} />}
            </div>
            <div className="page-layout__content">
              {this.secondaryComponent()}
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
    woolData: state.woolOnline,
    contentAside: state.woolOnline.contentAside
    };
};

export default connect(mapStateToProps)(WoolworthsOnline);
