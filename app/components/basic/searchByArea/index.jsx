import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import {postDeliveryArea} from './actions';

class ProvinceAndSuburbModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // provienceData : this.props.provienceDataClick,
      // suburbsData : [],
      firstProv : "Select a Province" ,//regions.regions[0].name,
      firstSuburb : "Select a Suburb", //suburbs.suburbs[0].name
      firstProvValue : " ",
      firstSuburbValue :  " ",
      nonDelieverable : " "
    }
    this.createProvienceOptionsData = this.createProvienceOptionsData.bind(this);
    this.createSuburbsOptionsData = this.createSuburbsOptionsData.bind(this);
    this.provienceSelect = this.provienceSelect.bind(this);
    this.suburbsSelect = this.suburbsSelect.bind(this);
    this.continueOption = this.continueOption.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this); 
  }
  componentDidMount() {
   
  }
  continueOption(evt) {
    const data = {
      "suburbId": this.state.firstSuburbValue
      };
    // axios.post('http://172.21.40.151:8180/public/v1/cart/commerceItems/suburb', data) 
    //   .then((response)=>{ 
    //      this.setState({
    //         nonDelieverable : response.data.title
    //       });
    //   }).catch((error) => {
      
    //     if (error.response) {
    //     } 
        
    // });
 

    if (typeof window !== 'undefined' && window){
      localStorage.setItem( 'SelectedOption', this.state.firstSuburb);
    }  
      this.props.updateProps(this.state.firstSuburb);
      this.props.postDeliveryArea(data);
      this.deactivateModal();
      
  }
 
  deactivateModal() {
    this.props.deactivateModal();
  }
  
  provienceSelect(event){
    let getProVal  = event.target.value;
    let getProName = event.target.options[event.target.selectedIndex].text; 
    if(getProVal === ""){
      this.setState({
        firstProv : "Select a Province",
        firstProvValue : ""
      });
      if(document.getElementById('selSuburb').style.display == "block"){
        document.getElementById('selSuburb').style.display = "none";
      }
    }
    else{
      this.setState({ 
        firstProv : getProName,
        firstProvValue : getProVal
      });
      let hasMatch =false;
      this.props.provienceData.filter((provData)=>{   
         if(provData.id == getProVal){
          hasMatch = true;       
          this.setState({
            suburbsData : provData.suburbs
          });
          document.getElementById('province-loader').style.visibility = "visible";
          document.getElementById('province-loader').style.visibility = "hidden"; 
          document.getElementById('selSuburb').style.display = "block";
         }
      });
      }
    
  }
  suburbsSelect(event){
    let getSubVal  = event.target.value;
    let getSubName = event.target.options[event.target.selectedIndex].text;
    if(getSubVal === ""){
      this.setState({
        firstSuburb : "Select a Suburb",
        firstSuburbValue : ""
      });
      if(document.getElementById('suburbSelect').style.display == "block"){
        document.getElementById('suburbSelect').style.display = "none";
      }
    }
    else{
      this.setState({
        firstSuburb : getSubName,
        firstSuburbValue : getSubVal
      });
      document.getElementById('suburbSelect').style.display = "block";
    }
  }
  createProvienceOptionsData(getProvienceData) {  
        return getProvienceData.map((item,index)=>  {
          return(<option key={index} value={item.id}>{item.name}</option>);
        });   
  }  
  createSuburbsOptionsData(getSuburbsData) {  
    return getSuburbsData.map((item,index)=>  {
      return(<option key={index} data-name={item.name} value={item.id} >{item.name}</option>);
    });
  }
  createButtonsForNonCartItems(){
   
      return(
          <div className="grid grid--space-y intro productOrder">            
            <button id="btnContinue"  type="button" onClick={this.continueOption} className="btn btn--secondary btn--right"  style={{display: "inline-block"}}>Continue Shopping</button>
          </div>
      );
  }
 
  render() {
    return (
              <div>
                  <form id="deliverylocform" >
                        <div className="form-field">
                        <div className="is-loading" id="provinceContainer">
                          <span className="enhanced-select">
                              <select id="fldProvince" name="province"  className="customSelect" onChange={(e)=>{this.provienceSelect(e);this.props.update('none');}}>
                              <option value="">Select a Province</option>
                              {this.props.provienceData && this.createProvienceOptionsData(this.props.provienceData)}                
                              </select>
                              
                              <span className="enhanced-select__label">{this.state.firstProvValue == "" ? "Select a Province" : this.state.firstProv}</span><span className="icon enhanced-select__icon"></span>
                          </span>
                          <span id="province-loader" className="loading--dark"></span>
                        </div>
                      </div>

                      <div id="selSuburb" className="hidden form-field is-loading" style={{display: "none"}}>
                        <span className="enhanced-select">
                          <select name="suburbId" id="fieldSuburb" className="customSelect"  onChange={(e)=>{this.suburbsSelect(e);this.props.update(document.getElementById('fieldSuburb').value);}}>
                            <option value="">Select a Suburb</option>
                            {this.state.suburbsData && this.createSuburbsOptionsData(this.state.suburbsData)}    
                                      
                          </select>
                          <span className="enhanced-select__label">{this.state.firstSuburbValue == "" ? "Select a Suburb" : this.state.firstSuburb}</span><span className="icon enhanced-select__icon"></span>
                        </span>
                      </div>

                      <span id="delivery-location-message" className="form-field__msg form-field__msg--error hidden" style={{display: "none"}}>{this.state.nonDelieverable}</span>
                    
                      <div id="suburbSelect" className="grid grid--space-y" style={{display: "none"}}>
                       </div>
                      
                  </form>
               </div>
  
    )
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ postDeliveryArea }, dispatch);
};

export default connect(null, matchDispatchToProps)(ProvinceAndSuburbModel);