import React, { Component } from 'react';
import {connect} from 'react-redux';


export default class AccountDetails extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
        
      <main className="grid grid--space-y site-main">
        <div className="main-page ">
         
          <nav className="breadcrumb empty" />
          <input type="hidden" defaultValue id="referer_url" />
          <div className="grid grid--space-y page-layout">
           
            <div className="page-layout__aside">
            
              <nav className="subCategoryNav toggled dashboardNav">
               
                <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="open-single" data-accordion-type="open-single" data-accordion-animated="true" data-accordion-active="true">
                  <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
                    <div className="accordion__toggle accordion__toggle--chrome accordion__toggle--line heading heading--4" data-js="accordion-toggle">My Account</div>
                    <ul className="list--silent text-small accordion__content--chrome accordion__content accordion__content--animated" data-js="accordion-content" style={{height: 952}}>
                      <li className="active"><a href="/store/fragments/dashboard/dashboard-index.jsp" className="nav-list__link--filter">My Account Home</a></li>
                      <li><hr className="hr--light" /></li>
                      <li className="active"><a href="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details#personal" className="nav-list__link--filter">My Details</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/payment-details" className="nav-list__link--filter">Payment Details</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/delivery-details" className="nav-list__link--filter">My Addresses</a></li>
                        </ul>
                      </li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=preferences/consents" className="nav-list__link--filter">My Preferences</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=preferences/consents" className="nav-list__link--filter">View Communication Consents</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=preferences/interests" className="nav-list__link--filter">View Communication Interests</a></li>	
                        </ul>
                      </li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/about-wfs" className="nav-list__link--filter">Financial Services</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/about-wfs" className="nav-list__link--filter">About Financial Services</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/connect-card" className="nav-list__link--filter">Link Account</a></li>	
                        </ul>
                      </li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/about-rewards" className="nav-list__link--filter">WRewards</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/about-littleworld" className="nav-list__link--filter">Littleworld</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/about-rewards" className="nav-list__link--filter">WRewards</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/about-myschool" className="nav-list__link--filter">MySchool</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/connect-card" className="nav-list__link--filter">Link Account</a></li>	
                        </ul>
                      </li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=favourites/favourites-index" className="nav-list__link--filter">My Favourites</a></li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=shopping-lists/create-list" className="nav-list__link--filter">Shopping Lists</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=shopping-lists/shopping-lists-index" className="nav-list__link--filter">My Shopping Lists</a></li>
                        </ul>
                      </li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=purchases/purchase-history" className="nav-list__link--filter">Online Purchases</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=purchases/purchase-history" className="nav-list__link--filter">My Online Purchases</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/apply-loyalty-card" className="nav-list__link--filter">Apply For Loyalty Card</a></li>
                        </ul>
                      </li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=littleworld/details" className="nav-list__link--filter">Littleworld</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=littleworld/details" className="nav-list__link--filter">View Details</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=littleworld/details&add=true" className="nav-list__link--filter">Add Another Child</a></li>
                        </ul>
                      </li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/?_DARGS=/store/fragments/navigation/ww/category-list-dashboard.jsp_A&_DAV=&_dynSessConf=-5118320893446871934" className="nav-list__link--filter">Logout</a></li>	</ul> </div>
                </div>
               
              </nav>
            
            </div>
            <div className="page-layout__content">					
             
              <h1 className="font-graphic text-caps">My Details</h1>
            
              <section className="grid grid--space-y">
                <h2 className="font-graphic text-caps">My Login Details</h2>
                <section className="my-details-section">
                  <div className="my-details-section__row">
                    <div className="my-details-section__cell text-small grid__fourth--medium">
                      <strong>Online Email address:</strong> 
                    </div>
                    <div className="my-details-section__cell text-small grid__fourth--medium ">
                      omkar.somji@zensar.com
                    </div>
                    <div className="my-details-section__cell grid text-align-right">
                      <a className="icon-text text-small link--silent arrow-link--forward" href="#" data-js="content-toggle" data-toggle-target="content-email-form">Update email address</a>
                    </div>
                    <div className="my-details-section__row grid" id="content-email-form" style={{display: 'none'}}>
                      <div className="grid my-details-section__form">
                        <div className="grid__half--medium">
                          <form method="post" name="updateEmailAddressForm" data-js="validate-form" action="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details&_DARGS=/store/fragments/dashboard/myaccount/login-details.jsp" id="updateEmailAddressForm" noValidate="true"><div style={{display: 'none'}}><input name="_dyncharset" type="hidden" defaultValue="UTF-8" /> </div><div style={{display: 'none'}}><input name="_dynSessConf" type="hidden" defaultValue={-5118320893446871934} /> </div>
                            <div className="form-field" data-js="form-field">
                              <input data-validate-email="compareA" data-validate-type="email" name="emailAddressForm" id="fldEmailAddressForm" placeholder="Email Address" type="email" defaultValue className /><input name="_D:emailAddressForm" type="hidden" defaultValue=" " />
                            
                            </div>
                            <div className="form-field" data-js="form-field">
                              <input data-validate-email="compareB" data-validate-type="email" data-validate-required="true" data-js="validate-field" name="confirmEmailAddressForm" id="fldConfirmEmailAddressForm" placeholder="Confirm Email Address" type="email" defaultValue /><input name="_D:confirmEmailAddressForm" type="hidden" defaultValue=" " />
                             
                            </div>
                            <div className="form-field" data-js="form-field">
                              <input name="successUrl" id="successurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:successUrl" type="hidden" defaultValue=" " />
                              <input name="errorUrl" id="errorurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:errorUrl" type="hidden" defaultValue=" " />
                              <input name="submit" id="fldSubmitEmail" type="submit" defaultValue="Update" className="btn btn--primary btn--right" /><input name="_D:submit" type="hidden" defaultValue=" " />
                              <button type="reset" className="btn btn--silent cancel-btn" id="fldCancelEmail" value="Cancel" name="cancel" data-js="content-toggle" data-toggle-target="content-email-form">Cancel<span className="icon" /></button>
                            </div> <div style={{display: 'none'}}><input name="_DARGS" type="hidden" defaultValue="/store/fragments/dashboard/myaccount/login-details.jsp" /> </div></form>
                        </div> </div> </div>	</div>	
                  <div className="my-details-section__row">
                    <div className="my-details-section__cell text-small grid__fourth--medium">
                      <strong>Password hint:</strong>
                    </div>
                    <div className="my-details-section__cell grid text-align-right">
                      <a className="icon-text text-small link--silent arrow-link--forward" href="#" data-js="content-toggle" data-toggle-target="content-password-form">Change my password</a>
                    </div>
                    <div className="my-details-section__row grid" id="content-password-form" style={{display: 'none'}}>
                      <div className="grid my-details-section__form">
                        <div className="grid__half--medium">
                          <form method="post" name="passwordForm" data-js="validate-form" action="/store/fragments/dashboard/dashboard-index.jsp?_DARGS=/store/fragments/dashboard/myaccount/login-details.jsp.frmNewPasswordForm" id="frmNewPasswordForm" noValidate="true"><div style={{display: 'none'}}><input name="_dyncharset" type="hidden" defaultValue="UTF-8" /> </div><div style={{display: 'none'}}><input name="_dynSessConf" type="hidden" defaultValue={-5118320893446871934} /> </div>
                            <div className="form-field" data-js="form-field">
                              <input data-validate-required="true" data-js="validate-field" name="currentPwd" id="fldCurrentPwd" placeholder="Current password" type="password" defaultValue className="stdFld" /><input name="_D:currentPwd" type="hidden" defaultValue=" " />
                            </div>
                            <div className="form-field" data-js="form-field">
                              <input data-validate-password="compareA" name="newPassword" id="fldNewPassword" placeholder="New password" type="password" defaultValue className="stdFld" /><input name="_D:newPassword" type="hidden" defaultValue=" " />
                            </div>
                            <div className="form-field" data-js="form-field">
                              <input data-validate-password="compareB" data-validate-required="true" data-js="validate-field" name="confirmNewPassword" id="fldConfirmNewPassword" placeholder="Confirm password" type="password" defaultValue className="stdFld" /><input name="_D:confirmNewPassword" type="hidden" defaultValue=" " />
                            </div>
                            <div className="form-field" data-js="form-field">
                              <input data-js="validate-field" name="passwordHint" id="fldPasswordHint" placeholder="Password hint" type="text" defaultValue className="stdFld" /><input name="_D:passwordHint" type="hidden" defaultValue=" " />
                            </div>
                            <div className="form-field" data-js="form-field">
                              <input name="successUrl" id="successurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:successUrl" type="hidden" defaultValue=" " />
                              <input name="errorUrl" id="errorurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:errorUrl" type="hidden" defaultValue=" " />
                              <input name="submit" id="fldSavePwd" type="submit" defaultValue="Update" className="btn btn--primary btn--right" /><input name="_D:submit" type="hidden" defaultValue=" " />
                              <button type="reset" className="btn btn--silent cancel-btn" id="fldCancelpwd" value="Cancel" name="cancel" data-js="content-toggle" data-toggle-target="content-password-form">Cancel<span className="icon" /></button>
                            </div>
                            <div style={{display: 'none'}}><input name="_DARGS" type="hidden" defaultValue="/store/fragments/dashboard/myaccount/login-details.jsp.frmNewPasswordForm" /> </div></form>
                        </div> </div> </div> </div>	</section>	</section>
             
              <a name="personal" />
              <section className="grid grid--space-y">
                <h2 className="font-graphic text-caps">My Personal Details</h2>
                <section className="my-details-section">
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">Title:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small">Mr</span>
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">Name:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small">Omkar</span>
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">Surname:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small">Somji</span> </div> </div> 
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">ID/passport number:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small" />
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">Gender:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small">unknown</span>
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">Date of birth:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small" /> </div> </div> 
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">MySchool card number:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small" />
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">WRewards card number:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small" />
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">Twitter Handle:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small" />
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third">
                      <strong className="text-small">VAT Registration No:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      <span className="text-small" />
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell text-align-right">
                      <a href="#" className="text-small link--silent arrow-link--forward" data-js="content-toggle" data-toggle-target="content-details-form">Update my details</a>
                    </div>
                  </div>
                  <div className="my-details-section__row grid" id="content-details-form" style={{display: 'none'}}>
                    <div className="grid__half--medium my-details-section__form">
                      <form method="post" name="personalDetailsFormLessId" data-js="validate-form" action="/store/fragments/dashboard/dashboard-index.jsp?_DARGS=/store/fragments/dashboard/myaccount/my-personal-details.jsp" id="frmPersonalDetailsForm" className="contactForm updateDetails validateForm" noValidate="true"><div style={{display: 'none'}}><input name="_dyncharset" type="hidden" defaultValue="UTF-8" /> </div><div style={{display: 'none'}}><input name="_dynSessConf" type="hidden" defaultValue={-5118320893446871934} /> </div>      	
                        <div className="form-field" data-js="form-field" data-validate-required="true">
                          <div data-js="validate-field" data-validate-msg="Please enter title">
                            <input name="_D:title" type="hidden" defaultValue=" " /><span className="enhanced-select"><select data-js="enhance-select" name="title" id="fldTitle" className>
                                <option value>Title</option>
                                <option value="MISS">Miss</option>
                                <option value="MR" selected="selected">Mr</option>
                                <option value="MRS">Mrs</option>
                                <option value="MS">Ms</option>
                                <option value="DR">Dr</option>
                                <option value="PROF">Prof</option>
                              </select><span className="enhanced-select__label">Mr&nbsp;</span><span className="icon enhanced-select__icon" /></span>		
                           
                          </div>
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Enter first name" data-validate-required="true" tabIndex={2} data-js="validate-field" name="firstName" id="fldFirstName" placeholder="Name*" type="text" defaultValue="Omkar" /><input name="_D:firstName" type="hidden" defaultValue=" " />
                         
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Enter last name" data-validate-required="true" tabIndex={3} data-js="validate-field" name="surname" id="fldSurname" placeholder="Surname*" type="text" defaultValue="Somji" /><input name="_D:surname" type="hidden" defaultValue=" " />
                        
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Enter ID/passport number" tabIndex={4} data-js="validate-field" name="id" id="fldID" placeholder="ID/passport number" type="text" defaultValue /><input name="_D:id" type="hidden" defaultValue=" " />
                         
                        </div>
                        <div className="form-field" data-js="form-field">
                          <div className="form-field" data-js="form-field" data-validate-required="true">
                            <input name="_D:gender" type="hidden" defaultValue=" " /><span className="enhanced-select"><select tabIndex={5} data-js="enhance-select" name="gender" id="fldGender">
                                <option>Select gender</option>	
                                <option value="female">female</option>
                                <option value="male">male</option>
                              </select><span className="enhanced-select__label">Select gender&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                          </div>
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-toggle="datepicker" data-validate-type="date" tabIndex={6} data-js="validate-field" type="text" data-validate-required="true" name="fldDOB" placeholder="Date of birth*" id="fldDOB" data-datepicker-format="yyyy-MM-dd" defaultValue className="datepicker-field" /><input name="_D:fldDOB" type="hidden" defaultValue=" " />
                          <span className="datepicker-btn"><i /></span>
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Please enter a valid Myschool card" tabIndex={9} data-js="validate-field" name="mySchoolCard" id="fldMySchoolCard" placeholder="MySchool card number" type="text" defaultValue /><input name="_D:mySchoolCard" type="hidden" defaultValue=" " />
                         
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Please enter a valid Difference card number" tabIndex={10} data-js="validate-field" name="differenceCard" id="fldDifferenceCard" placeholder="Difference card number" type="text" defaultValue /><input name="_D:differenceCard" type="hidden" defaultValue=" " />
                          
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Please enter a valid Twitter handle" tabIndex={11} data-js="validate-field" name="twitterHandle" id="fldTwitterHandle" placeholder="Twitter Handle" type="text" defaultValue /><input name="_D:twitterHandle" type="hidden" defaultValue=" " />
                          
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Please enter a valid Vat registration number" tabIndex={12} data-js="validate-field" name="vatRegistrationNumber" id="fldVatRegistrationNumber" placeholder="Vat Registration Number" type="text" defaultValue /><input name="_D:vatRegistrationNumber" type="hidden" defaultValue=" " />
                          
                        </div>
                        <p className="text-small">*Required fields</p>
                        <input name="primaryContactNo" id="primaryContactNo" type="hidden" defaultValue={1234567890} /><input name="_D:primaryContactNo" type="hidden" defaultValue=" " />
                        <div className="form-field" data-js="form-field">
                          <input type="hidden" name="synchStatus" id="fldSynchStatus" defaultValue />	            	
                          <input name="successUrl" id="successurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:successUrl" type="hidden" defaultValue=" " />
                          <input name="errorUrl" id="errorurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:errorUrl" type="hidden" defaultValue=" " />
                          <input name="submit" id="fldSubmit" type="submit" defaultValue="Update" className="btn btn--primary btn--right" /><input name="_D:submit" type="hidden" defaultValue=" " />
                          <button type="reset" className="btn btn--silent cancel-btn" id="fldCancel" value="Cancel" name="cancel" data-js="content-toggle" data-toggle-target="content-details-form">Cancel<span className="icon" /></button>
                        </div> 
                        <input name="emailAddress" id="fldEmailAddress" placeholder="Email address*" type="hidden" defaultValue="omkar.somji@zensar.com" className="stdFld" /><input name="_D:emailAddress" type="hidden" defaultValue=" " />	 <div style={{display: 'none'}}><input name="_DARGS" type="hidden" defaultValue="/store/fragments/dashboard/myaccount/my-personal-details.jsp" /> </div></form>
                    </div> </div> </section> 
               
                <p style={{display: 'none'}}>Please note that you can't edit this info due to FICA regulations. Please contact our Customer Services team on 0860 022 002 if you'd like to update any of this info.</p>	
              </section>
             
              <section className="grid grid--space-y">
                <h2 className="font-graphic text-caps">My Email Addresses</h2>
                <section className="my-details-section">
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third--small">
                      <strong className="text-small">Online Email address:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds--small">
                      <span className="text-small">omkar.somji@zensar.com</span>
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third--small">
                      <strong className="text-small">Primary Email address:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds--small">
                      <span className="text-small" />
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell grid__third--small">
                      <strong className="text-small">Secondary Email address:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds--small">
                      <span className="text-small" />
                    </div>
                  </div>
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell text-align-right">
                      <a className="text-small link--silent arrow-link--forward" href="#" data-js="content-toggle" data-toggle-target="content-emails-form">Update my email addresses</a>
                    </div>
                  </div>
                  <div className="my-details-section__row grid" id="content-emails-form" style={{display: 'none'}}>
                    <div className="grid__half--medium my-details-section__form">    
                      <form method="post" name="emailAddressFormLessId" data-js="validate-form" action="/store/fragments/dashboard/dashboard-index.jsp?_DARGS=/store/fragments/dashboard/myaccount/my-email-addresses.jsp" id="emailAddressFormLessId" className="emailAddressesForm validateForm" noValidate="true"><div style={{display: 'none'}}><input name="_dyncharset" type="hidden" defaultValue="UTF-8" /> </div><div style={{display: 'none'}}><input name="_dynSessConf" type="hidden" defaultValue={-5118320893446871934} /> </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Please enter a correct email address" data-validate-type="email" data-js="validate-field" name="fldEmailAddressOnline" id="fldEmailAddressOnline" placeholder="Email Address" type="text" defaultValue="omkar.somji@zensar.com" className /><input name="_D:fldEmailAddressOnline" type="hidden" defaultValue=" " />
                        
                        </div>		                       
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Please enter a correct email address" data-validate-type="email" data-js="validate-field" name="fldEmailAddressPrimary" id="fldEmailAddressPrimary" placeholder="Primary Email address" type="text" defaultValue className /><input name="_D:fldEmailAddressPrimary" type="hidden" defaultValue=" " />
                         
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Please enter a correct email address" data-validate-type="email" data-js="validate-field" name="fldEmailAddressSecondary" id="fldEmailAddressSecondary" placeholder="Secondary Email address" type="text" defaultValue /><input name="_D:fldEmailAddressSecondary" type="hidden" defaultValue=" " />
                        
                        </div> <input name="/za/co/woolworths/userprofiling/ProfileEmailFormHandler.pageName" type="hidden" defaultValue="myEmailAddresses" /><input name="_D:/za/co/woolworths/userprofiling/ProfileEmailFormHandler.pageName" type="hidden" defaultValue=" " />
                        <div className="form-field grid--space-y" data-js="form-field">
                          <input type="hidden" name="synchStatus" id="fldSynchStatus" defaultValue />	            	
                          <input name="successUrl" id="successurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:successUrl" type="hidden" defaultValue=" " />
                          <input name="errorUrl" id="errorurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:errorUrl" type="hidden" defaultValue=" " />
                          <input name="submit" id="fldSubmit" type="submit" defaultValue="Update" className="btn btn--primary btn--right" /><input name="_D:submit" type="hidden" defaultValue=" " />
                          <button type="reset" className="btn btn--silent cancel-btn" id value="Cancel" name="cancel" data-js="content-toggle" data-toggle-target="content-emails-form">Cancel<span className="icon" /></button>
                        </div>	
                        <div style={{display: 'none'}}><input name="_DARGS" type="hidden" defaultValue="/store/fragments/dashboard/myaccount/my-email-addresses.jsp" /> </div></form>
                    </div>
                  </div>
                </section>
               
                <p style={{display: 'none'}}>Please note that you can't edit this info due to FICA regulations. Please contact our Customer Services team on 0860 022 002 if you'd like to update any of this info.</p>
              </section>
              <section className="grid grid--space-y">
                <h2 className="font-graphic text-caps">My Contact Numbers</h2>
                <section className="my-details-section">
                  <div className="my-details-section__row grid text-small">
                    <div className="my-details-section__cell grid__third">
                      <strong>Contact number:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                      1234567890
                    </div>
                  </div>
                  <div className="my-details-section__row grid text-small">
                    <div className="my-details-section__cell grid__third">
                      <strong>Alternate contact number:</strong>
                    </div>
                    <div className="my-details-section__cell grid__two-thirds">
                    </div> </div> 
                  <div className="my-details-section__row grid">
                    <div className="my-details-section__cell text-align-right">
                      <a className="text-small link--silent arrow-link--forward" href="#updateContacts" data-js="content-toggle" data-toggle-target="content-contact-form">Update my contact numbers</a>
                    </div>
                  </div>
                  <div className="my-details-section__row" id="content-contact-form" style={{display: 'none'}}>
                    <div className="grid__half--large my-details-section__form">
                      <form method="post" name="contactNumbersFormLessId" data-js="validate-form" action="/store/fragments/dashboard/dashboard-index.jsp?_DARGS=/store/fragments/dashboard/myaccount/my-contact-numbers.jsp" id="contactNumbersFormLessId" noValidate="true"><div style={{display: 'none'}}><input name="_dyncharset" type="hidden" defaultValue="UTF-8" /> </div><div style={{display: 'none'}}><input name="_dynSessConf" type="hidden" defaultValue={-5118320893446871934} /> </div>		
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Please enter a valid phone number" data-validate-required="true" data-validate-type="num" data-js="validate-field" name="contactNumber" id="fldContactNumber" placeholder="Contact number*" type="text" defaultValue={1234567890} /><input name="_D:contactNumber" type="hidden" defaultValue=" " />
                         
                        </div>
                        <div className="form-field" data-js="form-field">
                          <input data-validate-msg="Please enter a valid phone number" data-validate-type="num" data-js="validate-field" name="alternateContactNumber" id="fldAlternateContactNumber" placeholder="Alternate contact number" type="text" defaultValue /><input name="_D:alternateContactNumber" type="hidden" defaultValue=" " />	
                         
                        </div> 
                        <div className="form-field">
                          <input type="hidden" name="synchStatus" id="fldSynchStatus" defaultValue />
                          <input name="/za/co/woolworths/userprofiling/ProfileDetailsFormHandler.pageName" type="hidden" defaultValue="myContactNumbers" /><input name="_D:/za/co/woolworths/userprofiling/ProfileDetailsFormHandler.pageName" type="hidden" defaultValue=" " />		<input name="successUrl" id="successurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:successUrl" type="hidden" defaultValue=" " />
                          <input name="errorUrl" id="errorurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details" /><input name="_D:errorUrl" type="hidden" defaultValue=" " />
                          <input name="submit" id="fldSubmit" type="submit" defaultValue="Update" className="btn btn--primary btn--right" /><input name="_D:submit" type="hidden" defaultValue=" " />
                          <button type="reset" className="btn btn--silent cancel-btn" id value="Cancel" name="cancel" data-js="content-toggle" data-toggle-target="content-contact-form">Cancel<span className="icon" /></button>
                        </div>	<div style={{display: 'none'}}><input name="_DARGS" type="hidden" defaultValue="/store/fragments/dashboard/myaccount/my-contact-numbers.jsp" /> </div></form>
                    </div>
                  </div>
                  <section className="my-details-section">
                    
                    <p style={{display: 'none'}}>Please note that you can't edit this info due to FICA regulations. Please contact our Customer Services team on 0860 022 002 if you'd like to update any of this info.</p>
                  </section>
                  <section className="grid grid--space-y">
                    <h2 className="text-caps font-graphic">Other Actions</h2>
                    <div className="my-details-section__row">
                      <div className="my-details-section__cell">
                        <a href="#" className="text-small link--silent arrow-link--forward link--silent" data-modal-target="/store/fragments/dashboard/myaccount/delete-profile.jsp" data-js="modal-toggle" data-modal-type="load" data-modal-classes="modal__box--panel modal__box--size-w-large" data-modal-overlay="true" data-modal-head="DELETE MY ONLINE PROFILE">
                          I want to delete my online profile
                        </a>
                      </div>
                    </div>
                  </section>        
                
                </section></section></div>	</div>	
        </div>	</main>
      </div>
    );
  }
}
