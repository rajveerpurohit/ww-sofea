import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';


export default class DeleveryModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provienceData : [],
      suburbsData : [],
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
    this.fetchDeliveryLocation();
  }
  continueOption(evt) {
    const data = {
      "suburbId": this.state.firstSuburbValue
      };
    axios.post('http://172.21.40.151:8180/public/v1/cart/commerceItems/suburb', data) 
      .then((response)=>{ 
         this.setState({
            nonDelieverable : response.data.title
          });
      }).catch((error) => {
      
        if (error.response) {
          console.log(error.response); 
        } 
        
    });
    

    if (typeof window !== 'undefined' && window){
      localStorage.setItem( 'SelectedOption', this.state.firstSuburb );
    }  
      this.props.updateProps(this.state.firstSuburb);
      this.deactivateModal();
      
  }
  fetchDeliveryLocation(){
      let url = '';
      if(this.props.updateVal == "Delivery Area "){
          url = "http://172.21.40.151:8180/public/v1/location/regions/";
      } else{
          url = "http://172.21.40.151:8180/public/v1/location/regions?isChangeDeliveryLocation=true";
      }
      axios.get(url) 
          .then((response)=>{
          this.setState({
              provienceData : response.data.regions
          });
      });
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
      this.state.provienceData.filter((provData)=>{   
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
                <AriaModal titleText="deliveryArea" onExit={this.props.deactivateModal} >
                <div className="modal__box modal__box--panel modal__box--size-w-large" data-js="modal-box" style={{marginBottom: "184px", top: "184px",width : "100%"}}> 
                  <a href="#" className="icon icon--close-circ-dark modal__close" onClick={this.props.deactivateModal}>close</a>
                  <div className="heading heading--3 font-graphic modal__head" data-js="modal-head">Select your delivery location</div>  
                  <div className="modal__content">
                  <form id="deliverylocform" >
                      <div id="gift-registry-delivery-message" className="hidden" style={{display: "none"}}>
                        <h2>WHO SHOULD WE DELIVER TO</h2>    
                      </div>
                      <div className="form-field">
                        <label htmlFor="select-example" className="form-field__label text-small">Select a province to see a list of suburbs that we deliver this product to:</label>
                        <div className="is-loading" id="provinceContainer">
                          <span className="enhanced-select">
                              <select id="fldProvince" name="province"  className="customSelect" onChange={(e)=>{this.provienceSelect(e)}}>
                              <option value="">Select a Province</option>
                              {this.state.provienceData && this.createProvienceOptionsData(this.state.provienceData)}                
                              </select>
                              
                              <span className="enhanced-select__label">{this.state.firstProvValue == "" ? "Select a Province" : this.state.firstProv}</span><span className="icon enhanced-select__icon"></span>
                          </span>
                          <span id="province-loader" className="loading--dark"></span>
                        </div>
                      </div>

                      <div id="selSuburb" className="hidden form-field is-loading" style={{display: "none"}}>
                        <span className="enhanced-select">
                          <select name="suburbId" id="fieldSuburb" className="customSelect"  onChange={(e)=>{this.suburbsSelect(e)}}>
                            <option value="">Select a Suburb</option>
                            {this.state.suburbsData && this.createSuburbsOptionsData(this.state.suburbsData)}    
                                      
                          </select>
                          <span className="enhanced-select__label">{this.state.firstSuburbValue == "" ? "Select a Suburb" : this.state.firstSuburb}</span><span className="icon enhanced-select__icon"></span>
                        </span>
                      </div>

                      <span id="delivery-location-message" className="form-field__msg form-field__msg--error hidden" style={{display: "none"}}>{this.state.nonDelieverable}</span>
                    
                      <div id="suburbSelect" className="grid grid--space-y" style={{display: "none"}}>
                        <hr/>

                          {this.createButtonsForNonCartItems()}
                       </div>
                      
                      <div className="grid grid--space-y hidden" id="suburbSelectNoFFCentre" style={{display: "none"}}>
                        <button id="btnCancel" type="button" className="btn btn--secondary btn--right hidden" data-js="modal-toggle" style={{display: "none"}}>Cancel</button>
                      </div>
                  </form>
                  </div>
                  </div>   
                  </AriaModal>  
               </div>
  
    )
  }
}
