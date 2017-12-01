import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {getContactUsPageData} from './actions';

class ContactUs extends Component {
  static need = [
    getContactUsPageData
  ]
  constructor(props) {
    super(props);
    this.state = {
      //contactUsData: [],
      departmentsData : [],
      topicsData : [],
      firstDepartment : 'Select a Department',
      firstDepartmentValue : '',
      firstTopic : '',
      firstTopicValue : ''
    }
    this.fetchContactUsData = this.fetchContactUsData.bind(this); 
    this.createDepartmentOptionsData = this.createDepartmentOptionsData.bind(this);
    this.createTopicOptionsData = this.createTopicOptionsData.bind(this);
    this.departmentSelect = this.departmentSelect.bind(this);
    this.topicSelect = this.topicSelect.bind(this);
  }
  componentDidMount() {
    //this.fetchContactUsData();
  }
  fetchContactUsData(){
    let url = 'http://172.21.40.151:8180/public/v1/common/jsonContent/contactUs';
    axios.get(url).then((response)=>{
        this.setState({
            contactUsData : response.data.ContactUsDisplayBean
        });
    });   
  console.log(">>>>>>",this.state.contactUsData);
  }
  createDepartmentOptionsData(contactUsData) {  
    return contactUsData.map((item,index)=>  {
      return(<option key={index} value={item.departmentId}>{item.description}</option>);
    });   
  }
  createTopicOptionsData(topicsData) { 
    return topicsData.map((item,index)=>  {
      return(<option key={index} value={item.departmentId}>{item.description}</option>);
    });
  }
  departmentSelect(event){
    let getDepartmentValue  = event.target.value;
    let getDepartmentName = event.target.options[event.target.selectedIndex].text; 
    if(getDepartmentValue === ""){
      this.setState({
        firstDepartment : "Select a Department",
        firstDepartmentValue : "" 
      });
    }
    else{
      this.setState({ 
        firstDepartment : getDepartmentName,
        firstDepartmentValue : getDepartmentValue
      });
      
      /*Code to return topics of matched department*/
      var temp = [];
      this.props.contactUsData.map((departmentData) => {
        console.log('departmentData+++++++', departmentData);
        if(departmentData.departmentId === getDepartmentValue){
          console.log(departmentData.departmentId,'===',getDepartmentValue);
         console.log("departmentData.WoolworthsTopics", departmentData.WoolworthsTopics);
          temp = departmentData.WoolworthsTopics
          console.log('********temp', temp)
        }
      })
      //console.log('********temp', temp);
      this.setState({
         topicsData : temp
       });
    }
    
  }
  topicSelect(event){
    let getTopicValue  = event.target.value;
    let getTopicName = event.target.options[event.target.selectedIndex].text;
    if(getTopicValue === ""){
      this.setState({
        firstTopic : "Select a Topic",
        firstTopicValue : ""
      });
    }else{
      this.setState({ 
        firstTopic : getTopicName,
        firstTopicValue : getTopicValue
      });
    }

  }
  render() {
    //console.log('>>>',this.state.firstTopic)
    return (
      <div>
        
     
        <main className="grid grid--space-y site-main">
          <div className="main-page ">
           
            <nav className="breadcrumb empty" />
            <input type="hidden" defaultValue="http://www.woolworths.co.za/store/fragments/help/help-index.jsp" id="referer_url" />
            <div className="grid grid--space-y page-layout">
            
              <div className="page-layout__aside">
               
                <nav className="subCategoryNav toggled ">
                 
                  <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="open-single" data-accordion-type="open-single" data-accordion-animated="true" data-accordion-active="true">
                    <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
                      <div className="accordion__toggle accordion__toggle--chrome accordion__toggle--line heading heading--4" data-js="accordion-toggle">Help</div>
                      <ul className="list--silent text-small accordion__content--chrome accordion__content accordion__content--animated" data-js="accordion-content" style={{height: 164}}>
                        <li className="active"><a href="/store/fragments/help/help-index.jsp" className="nav-list__link--filter">Help</a></li>	<li className="heading heading--4"><a href="/store/fragments/help/help-index.jsp?content=contact" className="nav-list__link--filter">Contact Us</a></li>	<li><a href="/store/fragments/help/help-index.jsp?content=faqs" className="nav-list__link--filter">FAQs</a></li>	<li><a href="/store/fragments/customer-service/customer-service-index.jsp?content=find-store" className="nav-list__link--filter">Store Locator</a></li>	<li><a href="/store/fragments/help/size-guide/size-guide-index.jsp?content=woolworths-size-guide-index" className="nav-list__link--filter">Size Guides</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110130" className="nav-list__link--filter">Using Woolworths Online</a></li>	</ul> </div>	</div>
                
                </nav>
              
              </div>
              <div className="page-layout__content">					
               
                <div className="grid grid--space-y">
                  <h1 className="text-caps font-graphic">Contact Us</h1>
                  <p className="text-small">You can find all our contact details below, or fill in the form below to <a href="#submitQuery">submit a query</a>.</p>
                 
                  <div className="grid grid__third--medium">
                    <h3 className="font-graphic text-caps grid-visible--medium">Submit a Query</h3>
                    <div className="accordion--max-medium accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="contact-section" data-accordion-active="true">
                      <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                        <h4 className="accordion__toggle--chrome grid-hidden--medium accordion__toggle is-collapsed" data-js="accordion-toggle">Submit a Query</h4>
                        <div className="grid--space-y accordion__content is-collapsed" data-js="accordion-content">
                        
                          <form method="post" name="generalEnquiriesForm" data-js="validate-form" action="/store/fragments/help/help-index.jsp?_DARGS=/store/fragments/help/submit-query.jsp.generalEnquiriesForm" id="generalEnquiriesForm" className="wForm" noValidate="true"><div style={{display: 'none'}}><input name="_dyncharset" type="hidden" defaultValue="UTF-8" /> </div><div style={{display: 'none'}}><input name="_dynSessConf" type="hidden" defaultValue={-5118320893446871934} /> </div>
                            <div className="form-field" data-js="form-field">
                              <div data-js="validate-field" data-validate-required="true">
                                <input name="_D:department" type="hidden" defaultValue=" " />
                                <span className="enhanced-select">
                                  <select data-js="enhance-select" name="department" onChange={(e)=>{this.departmentSelect(e)}}  id="department">
                                    <option value>Select a Department</option>
                                    {this.createDepartmentOptionsData(this.props.contactUsData)}
                                  </select>
                                  <span className="enhanced-select__label">{this.state.firstDepartmentValue == "" ? "Select a Department" : this.state.firstDepartment}</span>
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
                                <input name="_D:topic" type="hidden" defaultValue=" " /><span className="enhanced-select"><select data-js="enhance-select" name="topic" id="topic" onChange={(e)=>{this.topicSelect(e)}}>
                                    <option data-validate-unselected="true" value>Select a Topic</option>
                                    {this.createTopicOptionsData(this.state.topicsData)}
                                  </select><span className="enhanced-select__label">{this.state.firstTopicValue == "" ? "Select a Topic" : this.state.firstTopic}</span><span className="icon enhanced-select__icon" /></span>
                              </div>
                              <input type="hidden" id="selectedTopic" name="selectedTopic" defaultValue />
                            </div>
                           
                            <div className="form-field form-field--enhanced-label" data-js="form-field">
                              <label htmlFor="fldFirstName" data-js="enhance-label" className="form-field__label--enhanced is-active">First name*:</label>
                              <input maxLength={40} data-validate-required="true" tabIndex={1} data-js="validate-field" name="firstName" id="fldFirstName" placeholder type="text" defaultValue="Omkar" /><input name="_D:firstName" type="hidden" defaultValue=" " />
                            </div>
                           
                            <div className="form-field form-field--enhanced-label" data-js="form-field">
                              <label htmlFor="fldLastName" data-js="enhance-label" className="form-field__label--enhanced is-active">Last name*:</label>
                              <input maxLength={40} data-validate-required="true" tabIndex={2} data-js="validate-field" name="lastName" id="fldLastName" placeholder type="text" defaultValue="Somji" /><input name="_D:lastName" type="hidden" defaultValue=" " />
                            </div>
                           
                            <div className="form-field form-field--enhanced-label" data-js="form-field">
                              <label htmlFor="fldEmailAddress" data-js="enhance-label" className="form-field__label--enhanced is-active">Email address*:</label>
                              <input data-validate-type="email" data-validate-required="true" tabIndex={3} data-js="validate-field" name="emailAddress" id="fldEmailAddress" placeholder type="email" className="stdFld" defaultValue="omkar.somji@zensar.com" /><input name="_D:emailAddress" type="hidden" defaultValue=" " />
                            </div>
                           
                            <div className="form-field form-field--enhanced-label" data-js="form-field">
                              <label htmlFor="fldPhoneNumber" data-js="enhance-label" className="form-field__label--enhanced is-active">Contact number*:</label>
                              <input minLength={10} data-validate-required="true" data-validate-type="num" maxLength={11} tabIndex={4} data-js="validate-field" name="phoneNumber" id="fldPhoneNumber" placeholder type="tel" className="stdFld" defaultValue={1234567890} /><input name="_D:phoneNumber" type="hidden" defaultValue=" " />
                            </div>
                          
                            <div className="grid--space-y">
                              <div className="form-field" data-js="form-field">
                                <label htmlFor="fldMessage">Message*:</label>
                                <input name="_D:message" type="hidden" defaultValue=" " /><textarea maxLength={512} data-validate-required="true" tabIndex={5} data-js="validate-field" name="message" id="fldMessage" placeholder rows={5} cols={5} className="textarea form_textinput_faq" defaultValue={""} />
                              </div>
                            </div>                     
                            <p className="text-intro">*Required fields</p>
                            <p className="text-small">
                              Your privacy is important to us. Please do not send us any information we have not requested. 
                              See our <a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-content&contentId=cmp205289">privacy notice</a> for more.
                            </p>
                            <input name="formSubmit" id="formSubmit" type="submit" className="btn btn--primary btn--right" defaultValue="submit" /><input name="_D:formSubmit" type="hidden" defaultValue=" " />
                            <div style={{display: 'none'}}><input name="_DARGS" type="hidden" defaultValue="/store/fragments/help/submit-query.jsp.generalEnquiriesForm" /> </div></form>
                        </div> </div> </div> </div>
                
                  <div className="grid grid__two-thirds--medium">
                    <h3 className="font-graphic text-caps">Contact Info</h3>
                  
                    <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="contact-section" data-accordion-animated="true" data-accordion-active="true">
                      <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                        <h4 className="accordion__toggle--chrome is-collapsed accordion__toggle" data-js="accordion-toggle">General Enquiries</h4>
                        <div className="grid accordion__content--chrome text-small accordion__content--animated is-collapsed accordion__content" data-js="accordion-content" style={{height: 198}}>	
                          <div className="grid__third--medium">
                            <p><a href="tel:0860022002">0860 022 002</a></p>
                            <p>Fax: (021) 407 3995</p>
                            <p>Email: <a href="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</a></p>
                            <p>&nbsp;</p>
                            <p><a href="tel:+27214077002">International caller, please dial +27 21 407 7002</a></p>
                          </div>
                          <div className="grid__third--medium">
                            <p><strong>Call Centre Operating Hours:</strong></p>
                            <p>Monday - Friday <span>8am - 5.30pm</span></p>
                            <p>Saturday <span>8am - 5pm</span></p>
                            <p>Sunday <span>9am - 1pm</span></p>
                            <p>Public Holidays <span>9am - 1pm</span></p>
                          </div>	
                        </div>
                      </div>
                    </div>
                    <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="contact-section" data-accordion-animated="true" data-accordion-active="true">
                      <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                        <h4 className="accordion__toggle--chrome is-collapsed accordion__toggle" data-js="accordion-toggle">Woolworths Online</h4>
                        <div className="grid accordion__content--chrome text-small accordion__content--animated is-collapsed accordion__content" data-js="accordion-content" style={{height: 180}}>	
                          <div className="grid__third--medium">
                            <p><a href="tel:0860100987">0860 100 987</a></p>
                            <p>Email: <a href="mailto:shop@woolworths.co.za">shop@woolworths.co.za</a></p>
                            <p>&nbsp;</p>
                            <p><a href="tel:+27214076137">International caller, please dial +27 21 407 6137</a></p>
                          </div>
                          <div className="grid__third--medium">
                            <p><strong>Call Centre Operating Hours:</strong></p>
                            <p>Monday - Friday <span>8am - 7.30pm</span></p>
                            <p>Saturday <span>8am - 5pm</span></p>
                            <p>Sunday <span>8am - 1pm</span></p>
                            <p>Public Holidays <span>8am - 5pm</span></p>
                          </div>	
                        </div>
                      </div>
                    </div>
                    <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="contact-section" data-accordion-animated="true" data-accordion-active="true">
                      <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                        <h4 className="accordion__toggle--chrome is-collapsed accordion__toggle" data-js="accordion-toggle">WRewards</h4>
                        <div className="grid accordion__content--chrome text-small accordion__content--animated is-collapsed accordion__content" data-js="accordion-content" style={{height: 180}}>	
                          <div className="grid__third--medium">
                            <p><a href="tel:0861502050">0861 502 050</a></p>
                            <p>Email: <a href="mailto:rewards@woolworths.co.za">rewards@woolworths.co.za</a></p>
                            <p>&nbsp;</p>
                            <p><a href="tel:+27214077003">International caller, please dial +27 21 407 7003</a></p>
                          </div>
                          <div className="grid__third--medium">
                            <p><strong>Call Centre Operating Hours:</strong></p>
                            <p>Monday - Friday <span>8am - 5.30pm</span></p>
                            <p>Saturday <span>8:30am - 2pm</span></p>
                            <p>Sunday <span>9am - 1pm</span></p>
                            <p>Public Holidays <span>9am - 1pm</span></p>
                          </div>	
                        </div>
                      </div>
                    </div>
                    <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="contact-section" data-accordion-animated="true" data-accordion-active="true">
                      <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                        <h4 className="accordion__toggle--chrome is-collapsed accordion__toggle" data-js="accordion-toggle">MySchool Enquiries</h4>
                        <div className="grid accordion__content--chrome text-small accordion__content--animated is-collapsed accordion__content" data-js="accordion-content" style={{height: 150}}>	
                          <div className="grid__third--medium">
                            <p><a href="tel:0860100445">0860 100 445</a></p>
                            <p>Email: <a href="mailto:cs@vmp.co.za">cs@vmp.co.za</a></p>
                          </div>
                          <div className="grid__third--medium">
                            <p><strong>Call Centre Operating Hours:</strong></p>
                            <p>Monday - Friday <span>8am - 5pm</span></p>
                            <p>No Weekends</p>
                            <p>No Public Holidays</p>
                          </div>	
                        </div>
                      </div>
                    </div>
                    <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="contact-section" data-accordion-animated="true" data-accordion-active="true">
                      <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                        <h4 className="accordion__toggle--chrome is-collapsed accordion__toggle" data-js="accordion-toggle">Financial Services</h4>
                        <div className="grid accordion__content--chrome text-small accordion__content--animated is-collapsed accordion__content" data-js="accordion-content" style={{height: 180}}>	
                          <div className="grid__third--medium">
                            <p><a href="tel:0214115000">021 411 5000</a></p>
                            <p>Email: <a href="mailto:queries@wfs.co.za">queries@wfs.co.za</a></p>
                            <p>Complaints: <a href="mailto:complaints@wfs.co.za">complaints@wfs.co.za</a></p>
                            <p><a href="tel:+27214115000">International caller, please dial +27 21 411 5000</a></p>
                          </div>
                          <div className="grid__third--medium">
                            <p><strong>Call Centre Operating Hours:</strong></p>
                            <p>Monday - Friday <span>7.30am - 9pm</span></p>
                            <p>Saturday <span>7:30am - 9pm</span></p>
                            <p>Sunday <span>7.30am - 9pm</span></p>
                            <p>Public Holidays <span>7.30am - 9pm</span></p>
                          </div>	
                        </div>
                      </div>
                    </div>
                    <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="contact-section" data-accordion-animated="true" data-accordion-active="true">
                      <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                        <h4 className="accordion__toggle--chrome is-collapsed accordion__toggle" data-js="accordion-toggle">International Enquiries</h4>
                        <div className="grid accordion__content--chrome text-small accordion__content--animated is-collapsed accordion__content" data-js="accordion-content" style={{height: 540}}>	
                          <div>
                            <p><a href="tel:+27214077002">+27 21 407 7002</a></p>
                            <p>Email: <a href="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</a></p>
                            <br />
                            <p><strong>Woolworths Online:</strong></p>
                            <p><a href="tel:+27214076137">+27 21 407 6137</a></p>
                            <p>Email: <a href="mailto:shop@woolworths.co.za">shop@woolworths.co.za</a></p>
                            <br />
                            <p><strong>WRewards Enquiries:</strong></p>
                            <p><a href="tel:+27214077003">+27 21 407 7003</a></p>
                            <p>Email: <a href="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</a></p>
                            <br />
                            <p><strong>MySchool Enquiries:</strong></p>
                            <p>Email: <a href="mailto:cs@myschool.co.za">cs@myschool.co.za</a></p>
                            <br />
                            <p><strong>Financial Services:</strong></p>
                            <p><a href="tel:+27214115000">+27 21 411 5000</a></p>
                            <p>Email: <a href="mailto:queries@wfs.co.za">queries@wfs.co.za</a></p>
                          </div>	
                        </div>
                      </div>
                    </div>
                  
                  </div>       
                 
                </div>
              
              </div>	</div>	
          </div>	</main>	
      	
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    contactUsData: state.contactUsReducer.contactUsData
  };
};
export default connect(mapStateToProps)(ContactUs);