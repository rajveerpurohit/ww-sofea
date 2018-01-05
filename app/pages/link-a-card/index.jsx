
import React, { Component } from 'react';
import {connect} from 'react-redux';


export default class LinkCard extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
        
      <main className="grid grid--space-y site-main">
        <div className="main-page ">
         
          <nav className="breadcrumb empty" />
          <input type="hidden" defaultValue="#" id="referer_url" />
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
                          <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/about-wfs" className="nav-list__link--filter">About Financial Services</a></li>	<li className="heading heading--4"><a href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/connect-card" className="nav-list__link--filter">Link Account</a></li>	
                        </ul>
                      </li>
                      <li><hr className="hr--light" /></li>
                      <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/about-rewards" className="nav-list__link--filter">WRewards</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/about-littleworld" className="nav-list__link--filter">Littleworld</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/about-rewards" className="nav-list__link--filter">WRewards</a></li>	<li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/about-myschool" className="nav-list__link--filter">MySchool</a></li>	<li className="heading heading--4"><a href="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/connect-card" className="nav-list__link--filter">Link Account</a></li>	
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
             
              <header>
                <h1 className="font-graphic text-caps">Link your Woolworths card to your online profile</h1>
                <p className="text-intro">By linking your online profile and your Woolworths or MySchool cards you will be able to see your WRewards tier status and vouchers as well as claiming instant savings as you shop. If you have any Financial Services products, you will also see your financial transactions and related information.</p>
              </header>
              <div className="grid connect-card">
                <div className="grid grid__three-fourths--large grid__half--medium">
                  <form id="idPassportForm" className="wForm checkoutForm" name="idPassportForm" method="post" autoComplete="off" style={{marginTop: '-15px'}}>	    
                   
                    <div id="idPassport" className="form-field idMethod form-field--enhanced-label">
                      <label className="form-field__label form-field__label--enhanced" data-js="enhance-label">ID or Passport Number</label>
                      <input type="text" tabIndex={3} id="fldIdPassport" name="idNumber" className="stdFld" maxLength={13} />
                    </div>
                    <div id="wrewardsCard" className="idMethod" style={{display: 'none'}}>
                      <input type="text" tabIndex={3} id="fldWrewardsCard" name="cardNumber" className="stdFld" placeholder="WRewards Card Number" maxLength={16} />
                      <div className="formErrors">Enter your WRewards Card Number</div>
                    </div>
                    <div id="storeCard" className="idMethod" style={{display: 'none'}}>
                      <input type="text" tabIndex={3} id="fldStoreCard" name="storeCardNumber" className="stdFld" placeholder="Store Card Number" maxLength={16} />
                      <div className="formErrors">Enter your Store Card Number</div>
                    </div>
                    <div id="myCard" className="idMethod" style={{display: 'none'}}>
                      <input type="text" tabIndex={3} id="fldMyCard" name="myCardNumber" className="stdFld" placeholder="MySchool MyVillage MyPlanet Card Number" maxLength={16} />
                      <div className="formErrors">Enter your MySchool MyVillage MyPlanet Card Number</div>
                    </div>
                    <div id="wfsCard" className="idMethod" style={{display: 'none', marginTop: '4px !important'}}>
                      <input type="text" tabIndex={3} id="fldWFSId" name="idNumber" className="stdFld" placeholder="ID Number" maxLength={13} />
                      <div className="formErrors">Enter your WFS Card Number</div>
                      <br />
                      <input type="text" tabIndex={3} id="fldWFSCard" name="creditCardNumber" className="stdFld" placeholder="Woolworths Credit Card Number" style={{marginTop: 0}} maxLength={16} />	        
                      <input defaultValue placeholder type="text" name="txtMaskHidden" id="txtMaskHidden" maxLength={16} readOnly="readonly" style={{display: 'none'}} />
                      <div className="formErrors">Enter your Credit Card Number</div>
                    </div>	</form>
                  <form method="post" name="frmTripleRegisterForm" action="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/connect-card&_DARGS=/store/fragments/dashboard/wfs/connect-card.jsp" id="frmTripleRegisterForm"><div style={{display: 'none'}}><input name="_dyncharset" type="hidden" defaultValue="UTF-8" /> </div><div style={{display: 'none'}}><input name="_dynSessConf" type="hidden" defaultValue={-5118320893446871934} /> </div>
                    <div className="form-field" data-js="form-field">
                      <input name="idNumber" id="fldIDNumber" placeholder type="hidden" defaultValue className="stdFld" /><input name="_D:idNumber" type="hidden" defaultValue=" " />
                     
                      <p className="errorFld">
                      </p> </div> <div> <input name="successurl" id="successurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=wfs/connect-card-thanks" /><input name="_D:successurl" type="hidden" defaultValue=" " />
                      <input name="errorurl" id="errorurl" type="hidden" defaultValue="/fragments/dashboard/dashboard-index.jsp?content=wfs/connect-card" /><input name="_D:errorurl" type="hidden" defaultValue=" " />
                      <input name="listSubmit" id="fldListSubmit" type="submit" defaultValue="Fetch details" className="btn btn--primary btn--right" /><input name="_D:listSubmit" type="hidden" defaultValue=" " />
                    </div> <div style={{display: 'none'}}><input name="_DARGS" type="hidden" defaultValue="/store/fragments/dashboard/wfs/connect-card.jsp" /> </div></form>
                </div>	
               
                <div className="grid__fourth--large grid__half--medium">
                  <div className="panel">
                    <div className="panel-card__body">
                      <p><strong>Which cards are we talking about?</strong></p>
                      <ul>
                        <li>Woolworths Store card</li>
                        <li>Woolworths Credit card (Silver, Gold or Black)</li>
                        <li>WRewards Card</li>
                        <li>MySchool MyVillage MyPlanet card</li>
                      </ul>
                    </div>
                  </div>
                </div>
             
              </div>
           
            </div>	</div>	
        </div>
        </main>
      </div>
    );
  }
}
