import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router'

export default class Panels extends Component {
  constructor(props) {
    super(props);
   
    this.panelSection = this.panelSection.bind(this);
  }
 
  panelSection(){
    const createPanels = this.props.panelData.panels;
    return createPanels.map((item,index)=>{
      return  (
        <section className="panel panel--padded grid__third--medium" key={index}>
          <h2 className="heading heading--3 text-caps font-graphic">{item.panelHeading}</h2>
          <Link to={item.panelContent.url} className="btn btn--secondary btn--right btn--block btn--align-left btn--block">{item.panelContent.displayName}</Link>
        </section>);
    });
    
  }
  render() {
    return (
      <div>
     {this.panelSection()}</div>
    );
  }
}

