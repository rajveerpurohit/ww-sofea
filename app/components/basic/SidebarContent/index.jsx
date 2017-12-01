import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router'

export default class SideBarComponent extends Component {
  constructor(props) {
    super(props);
   
    this.contentAside = this.contentAside.bind(this);
    this.generateLi = this.generateLi.bind(this);
  }
 
 
  contentAside(){
    return(
      <nav className="subCategoryNav toggled ">
      <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="open-single" data-accordion-type="open-single" data-accordion-animated="true" data-accordion-active="true">
         <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
            <div className="accordion__toggle accordion__toggle--chrome accordion__toggle--line heading heading--4" data-js="accordion-toggle">Help</div>
            <ul className="list--silent text-small accordion__content--chrome accordion__content accordion__content--animated" data-js="accordion-content" style={{height: 156}}>
            { this.props.leftData && this.generateLi(this.props.leftData)}
            </ul> 
         </div>
      </div>
   </nav>
    );
  }
  generateLi(generateData){
    var keyValue= Object.keys(generateData)[0];
    if(generateData[keyValue]){
      return generateData[keyValue].map((item,index)=>{
        return(
          <li key={index} className="active"><Link to={item.url} className="nav-list__link--filter">{item.displayName}</Link></li>
        );
      });
    }  
  }
  
  render() {
    return (
      <div>
     {this.contentAside()}</div>
    );
  }
}

