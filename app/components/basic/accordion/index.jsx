import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
// import ReactChildrenCloneWithProps from 'react-children-clone-with-props';

export default class Accordion extends Component {
constructor(props) {
    super(props);
     this.state = {
        active: null
     };
     this.handleClick = this.handleClick.bind(this);
     this.display = this.display.bind(this);
     this.liClass = this.liClass.bind(this);
     this.Item = this.Item.bind(this);
     this.collpsedClass = this.collpsedClass.bind(this);
}
  handleClick(i) {
    return (e) => {
      const active = this.state.active === i ? null : i;
      this.setState({active});

    };
  }
  display(i) {
    return this.state.active === i ? 'block' : 'none';
  }
  collpsedClass(i){
    return this.state.active === i ? '' : 'is-collapsed';  
  }
  liClass(i) {
    return this.state.active === i ? 'active' : 'inactive';
  }
  Item(props, i) {
    return (
        <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment" key={i}>
          <h4 className={`accordion__toggle--chrome accordion__toggle--line accordion__toggle ${this.collpsedClass(i)}`} data-js="accordion-toggle"  onClick={this.handleClick(i)}>
            {props.name}
          </h4>
          <div className="grid accordion__content--chrome text-small accordion__content--animated accordion__content" data-js="accordion-content" style={{display: this.display(i)}} dangerouslySetInnerHTML={{__html : props.details}} />
        </div>
    );
  }
render() {
    const {refinedData} = this.props;
    return (

      <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-group="contact-section" data-accordion-animated="true" data-accordion-active="true">
        {refinedData.map(this.Item)}
      </div>

    );
}
}
