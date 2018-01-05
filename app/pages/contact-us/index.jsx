import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';
import Accordion from '../../components/basic/accordion';
import SideBarComponent  from '../../components/basic/SideBarContent';

import {getContactUsPageData,getContactInfoPageData} from './actions';

class ContactUs extends Component {
  static need = [
    getContactUsPageData,
    getContactInfoPageData
  ]
  constructor(props) {
    super(props);
    this.state = {
      // contactUsData: [],
      departmentsData: [],
      topicsData: [],
      firstDepartment: 'Select a Department',
      firstDepartmentValue: '',
      firstTopic: '',
      firstTopicValue: ''
    };
    this.primaryComponent =  this.primaryComponent.bind(this);
    this.pageContent =  this.pageContent.bind(this);
    this.createDepartmentOptionsData = this.createDepartmentOptionsData.bind(this);
    this.createTopicOptionsData = this.createTopicOptionsData.bind(this);
    this.departmentSelect = this.departmentSelect.bind(this);
    this.topicSelect = this.topicSelect.bind(this);
    this.createAccDat = this.createAccDat.bind(this);
    this.renderData = this.renderData.bind(this);
  }
  
  createDepartmentOptionsData(contactUsData) {
    return contactUsData.map((item, index) => {
      return (<option key={index} value={item.departmentId}>{item.description}</option>);
    });
  }
  createTopicOptionsData(topicsData) {
    return topicsData.map((item, index) => {
      return (<option key={index} value={item.departmentId}>{item.description}</option>);
    });
  }
  departmentSelect(event) {
    const getDepartmentValue = event.target.value;
    const getDepartmentName = event.target.options[event.target.selectedIndex].text;

    this.setState({
      firstTopic: 'Select a Topic',
      firstTopicValue: ''
    });

    if (getDepartmentValue === '') {
      this.setState({
        firstDepartment: 'Select a Department',
        firstDepartmentValue: ''
      });
    } else {
      this.setState({
        firstDepartment: getDepartmentName,
        firstDepartmentValue: getDepartmentValue
      });

      /* Code to return topics of matched department*/
      let temp = [];
      this.props.contactUsData.map((departmentData) => {
        if (departmentData.departmentId === getDepartmentValue) {
          temp = departmentData.WoolworthsTopics;
        }
      });
      this.setState({
         topicsData: temp
       });
    }
  }
  topicSelect(event) {
    const getTopicValue = event.target.value;
    const getTopicName = event.target.options[event.target.selectedIndex].text;
    if (getTopicValue === '') {
      this.setState({
        firstTopic: 'Select a Topic',
        firstTopicValue: ''
      });
    } else {
      this.setState({
        firstTopic: getTopicName,
        firstTopicValue: getTopicValue
      });
    }
  }
  createAccDat(accData){
    return Object.keys(accData).map((key,i)=>{
      var accList =  {
        'name':key,
        'details':[]
      }
      accData[key].map((k)=>{
        var panelHeading = k.leftpanelHeading || k.rightpanelHeading || '';
        var panelBody = k.leftpanelContent || k.rightpanelContent || {};
        Object.keys(panelBody).forEach((key) => {
          if(panelBody[key] == ''){
            delete panelBody[key];  
          }
        });
        accList.details.push(this.renderData(panelBody,panelHeading))
      });
      return accList;
    });
  }
  renderData(panelBody,panelHeading){
    var strDetails = '<div className="grid__third--medium"><p><strong>'+panelHeading+'</strong></p>';
    var strpanelBody = Object.keys(panelBody).map((p)=>{
      return '<p>'+p+':'+panelBody[p]+'</p>'
    });
    var fstrDetails = strpanelBody.join('');
    strDetails = strDetails + fstrDetails + '</div>';
    return strDetails;
  }
  pageContent(){
    /*Code to create Accordian starts*/
    if(this.props.contactInfoData){
      var createAccordianData  = this.createAccDat(this.props.contactInfoData);
      var refinedObj = [];
      createAccordianData.map((k, i)=>{ 
        refinedObj.push({
              id: i, 
              name:k.name,
              details:k.details.join('')
            })
      });
    }
    /*Code to create Accordian ends*/
    return (
      <div className="page-layout__content">
      <div className="grid grid--space-y">
          <h1 className="text-caps font-graphic">Contact Us</h1>
          <p className="text-small">
            You can find all our contact details below, or fill in the form below to 
            <Link to="#submitQuery">
            submit a query</Link>.
          </p>
          <div className="grid grid__third--medium">
            <h3 className="font-graphic text-caps grid-visible--medium">Submit a Query</h3>
            <div className="accordion--max-medium accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="contact-section" data-accordion-active="true">
                <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                  <h4 className="accordion__toggle--chrome grid-hidden--medium accordion__toggle is-collapsed" data-js="accordion-toggle">Submit a Query</h4>
                  <div className="grid--space-y accordion__content is-collapsed" data-js="accordion-content">
                      <form method="post" name="generalEnquiriesForm" data-js="validate-form" action="/store/fragments/help/help-index.jsp?_DARGS=/store/fragments/help/submit-query.jsp.generalEnquiriesForm" id="generalEnquiriesForm" className="wForm" noValidate="true">
                        <div style={{display: 'none'}}><input name="_dyncharset" type="hidden" defaultValue="UTF-8" /> 
                  </div>
                  <div style={{display: 'none'}}><input name="_dynSessConf" type="hidden" defaultValue={-5118320893446871934} /> 
                </div>
                <div className="form-field" data-js="form-field">
                <div data-js="validate-field" data-validate-required="true">
                <input name="_D:department" type="hidden" defaultValue=" " />
                <span className="enhanced-select">
                <select data-js="enhance-select" name="department" onChange={(e) => { this.departmentSelect(e); }} id="department">
                <option value>Select a Department</option>
                {this.createDepartmentOptionsData(this.props.contactUsData)}
                </select>
                <span className="enhanced-select__label">{this.state.firstDepartmentValue == '' ? 'Select a Department' : this.state.firstDepartment}</span>
                <span className="icon enhanced-select__icon" /></span>
                </div>
                <input type="hidden" id="selectedDepartment" name="selectedDepartment" defaultValue />
                <div className="formErrors">Select a department</div>
                </div>
                <input name="/za/co/woolworths/ticket/TicketFormHandler.userId" type="hidden" defaultValue={613018858} /><input name="_D:/za/co/woolworths/ticket/TicketFormHandler.userId" type="hidden" defaultValue=" " />
                <input name="successurl" id="successurl" type="hidden" defaultValue="/fragments/help/help-index.jsp?content=help-thanks" /><input name="_Dsuccessurl" type="hidden" defaultValue=" " />
                <input name="errorurl" id="errorurl" type="hidden" defaultValue="/fragments/help/help-index.jsp?content=contact" /><input name="_D:errorurl" type="hidden" defaultValue=" " />
                <div className="form-field grid--space-y" data-js="form-field">
                <div data-js="validate-field" data-validate-required="true">
                <input name="_D:topic" type="hidden" defaultValue=" " /><span className="enhanced-select"><select data-js="enhance-select" name="topic" id="topic" onChange={(e) => { this.topicSelect(e); }}>
                <option data-validate-unselected="true" value>Select a Topic</option>
                {this.createTopicOptionsData(this.state.topicsData)}
                </select><span className="enhanced-select__label">{this.state.firstTopicValue == '' ? 'Select a Topic' : this.state.firstTopic}</span><span className="icon enhanced-select__icon" /></span>
                </div>
                <input type="hidden" id="selectedTopic" name="selectedTopic" defaultValue />
                </div>
                <div className="form-field form-field--enhanced-label" data-js="form-field">
                <label htmlFor="fldFirstName" data-js="enhance-label" className="form-field__label--enhanced is-active">First name*:</label>
                <input maxLength={40} data-validate-required="true" tabIndex={1} data-js="validate-field" name="firstName" id="fldFirstName" type="text" /><input name="_D:firstName" type="hidden" defaultValue=" " />
                </div>
                <div className="form-field form-field--enhanced-label" data-js="form-field">
                <label htmlFor="fldLastName" data-js="enhance-label" className="form-field__label--enhanced is-active">Last name*:</label>
                <input maxLength={40} data-validate-required="true" tabIndex={2} data-js="validate-field" name="lastName" id="fldLastName" type="text" /><input name="_D:lastName" type="hidden" defaultValue=" " />
                </div>
                <div className="form-field form-field--enhanced-label" data-js="form-field">
                <label htmlFor="fldEmailAddress" data-js="enhance-label" className="form-field__label--enhanced is-active">Email address*:</label>
                <input data-validate-type="email" data-validate-required="true" tabIndex={3} data-js="validate-field" name="emailAddress" id="fldEmailAddress" type="email" className="stdFld" defaultValue="" /><input name="_D:emailAddress" type="hidden" defaultValue="" />
                </div>
                <div className="form-field form-field--enhanced-label" data-js="form-field">
                <label htmlFor="fldPhoneNumber" data-js="enhance-label" className="form-field__label--enhanced is-active">Contact number*:</label>
                <input minLength={10} data-validate-required="true" data-validate-type="num" maxLength={11} tabIndex={4} data-js="validate-field" name="phoneNumber" id="fldPhoneNumber" type="tel" className="stdFld" defaultValue="" /><input name="_D:phoneNumber" type="hidden" defaultValue=" " />
                </div>
                <div className="grid--space-y">
                <div className="form-field" data-js="form-field">
                <label htmlFor="fldMessage">Message*:</label>
                <input name="_D:message" type="hidden" defaultValue=" " /><textarea maxLength={512} data-validate-required="true" tabIndex={5} data-js="validate-field" name="message" id="fldMessage" rows={5} cols={5} className="textarea form_textinput_faq" defaultValue={''} />
                </div>
                </div>
                <p className="text-intro">*Required fields</p>
                <p className="text-small">
                Your privacy is important to us. Please do not send us any information we have not requested.
                See our <Link to="/store/fragments/corporate/corporate-index.jsp?content=corporate-content&contentId=cmp205289">privacy notice</Link> for more.
                </p>
                <input name="formSubmit" id="formSubmit" type="submit" className="btn btn--primary btn--right" defaultValue="submit" /><input name="_D:formSubmit" type="hidden" defaultValue=" " />
                <div style={{display: 'none'}}><input name="_DARGS" type="hidden" defaultValue="/store/fragments/help/submit-query.jsp.generalEnquiriesForm" /> 
            </div>
            </form>
          </div>
      </div>
    </div>
    </div>
    <div className="grid grid__two-thirds--medium">
      <h3 className="font-graphic text-caps">Contact Info</h3>
      {refinedObj?<Accordion refinedData={refinedObj}/>:null}
    </div>
    </div>
    </div>
    );
  }
  primaryComponent(){
    return (
      <div className="main-page ">
        <nav className="breadcrumb empty" />
        <input type="hidden" defaultValue="#" id="referer_url" />
        <div className="grid grid--space-y page-layout">
          <div className="page-layout__aside">
            {this.props.contentAside && <SideBarComponent leftData={this.props.contentAside}/>}
          </div>
          {this.pageContent()}	
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
    contactUsData: state.contactUsReducer.contactUsFormReducer.contactUsData,
    contactInfoData: state.contactUsReducer.contactInfoReducer.contactInfo.CONTACTINFO,
    contentAside: state.contactUsReducer.contactInfoReducer.contactInfo.LeftNav
  };
};
export default connect(mapStateToProps)(ContactUs);
