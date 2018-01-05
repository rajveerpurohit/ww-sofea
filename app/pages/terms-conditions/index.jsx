import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {getTermsNCondtions} from './actions';
import SideBarComponent  from '../../components/basic/SideBarContent';
import Panels from '../../components/basic/panels';

class TermsConditions extends Component {
  static need = [
    getTermsNCondtions
  ];
  constructor(props) {
    super(props);

    this.primeComponent = this.primeComponent.bind(this);
    this.secondaryComponent =this.secondaryComponent.bind(this);
    
  }
  componentDidMount(){
 
  }

  secondaryComponent(){
    return(
      
        <div className="grid">
          <header> 
          </header> 
          <div className="grid">
            <img className=" img-fill-responsive" alt={this.props.termsData.heading} src={this.props.termsData.imageUrl} />
          </div>
        
          <p className="text-intro" />
        
          <article className="grid grid--space-y">
            {this.props.termsData.panels ? <Panels panelData = {this.props.termsData} /> : null}
          </article>	
          
        </div>	
      
    );
  }
  primeComponent(){
    return(  
      <main className="grid grid--space-y site-main">
        <div className="main-page ">
        	
          <nav className="breadCrumbs empty" />
         
          <div className="grid page-layout">
          <div className="page-layout__aside">     
             { this.props.contentAside && <SideBarComponent leftData={this.props.contentAside}/>}
         </div>
            <div className ="page-layout__content">
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
    termsData : state.footerTermsdReducer.termsData,
    contentAside : state.footerTermsdReducer.contentAside,
    };
};

export default connect(mapStateToProps)(TermsConditions);
