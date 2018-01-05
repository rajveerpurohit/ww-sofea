import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import {getCorporateSales} from './actions';
import {bindActionCreators} from 'redux';
import SideBarComponent  from '../../components/basic/SideBarContent';
class CorporateSales extends Component {
  static need = [getCorporateSales];
  constructor(props) {
    super(props);

    this.primaryComponent = this.primaryComponent.bind(this);
    this.pageContent = this.pageContent.bind(this);
 
  }
  primaryComponent(){
    return(
      <div className="main-page ">
        <nav className="breadCrumbs empty" />
        <div className="grid page-layout">
          <div className="page-layout__aside">     
            {this.props.contentAside && <SideBarComponent leftData={this.props.contentAside}/>}
          </div>
          {this.pageContent()}
        </div>
      </div>
    );
  }
  pageContent(){
    return(
      <div className="page-layout__content">
        <div className="grid">
            <article>
              <h1 className="heading heading--1 text-caps font-graphic">Corporate Sales</h1>
              <div className="text-small">
                  <p><strong>{this.props.corporateSalesData.heading}</strong></p>
                  <p>{this.props.corporateSalesData.description}</p>
              </div>
            </article>
        </div>
      </div>
    );
  }

  render() {
    return (
    <div>
        <main className="grid grid--space-y site-main">
          {this.primaryComponent()}
        </main>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    corporateSalesData : state.corporateSalesReducer.corporateSalesData.CORPORATESALES,
    contentAside : state.corporateSalesReducer.corporateSalesData.LeftNav
  };
};

export default connect(mapStateToProps)(CorporateSales);

