import React, { Component } from 'react';
import {connect} from 'react-redux';


export default class storeByGeoLocation extends Component {
  constructor(props) {
    super(props);

  }
  
 


	 
  render() {
    return (
      <div>
                        <h2 className="text-caps font-graphic">Find a Store near me</h2> <p><strong>Find a Store in your area</strong>: (Choose a proximity in KMs below and then click 'show me nearby Store')</p>
                        <form id="searchByGeoLocform">
                          <p style={{display: 'inline-block'}}>Show me Store within a &nbsp; </p>
                          <div className="form-field storeRadius" data-js="form-field" style={{display: 'inline-block', float: 'left'}}>  
                            <span className="enhanced-select"><select id="storeRadius" name="question" data-js="enhance-select">
                                <option value={1}>1</option>
                                <option data-validate-unselected="true" value={5} selected>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                              </select><span className="enhanced-select__label">5&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                           
                          </div>
                          <p style={{display: 'inline-block'}}>&nbsp; km radius.</p>
						  <br/>
						  <br/>
						  
						  <input type="hidden" id="longitude" default="" />
						  <input type="hidden" id="latitude" default="" />
</form>
      </div>
    );
  }
}
