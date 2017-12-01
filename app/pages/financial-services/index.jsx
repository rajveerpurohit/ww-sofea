import React, { Component } from 'react';
import {connect} from 'react-redux';

export default class FinancialServices extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
        <div className="grid grid--space-y page-layout">
      
        <div className="page-layout__aside">
         
          <nav className="subCategoryNav toggled dashboardNav">
           
            <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="open-single" data-accordion-type="open-single" data-accordion-animated="true" data-accordion-active="true">
              <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
                <div className="accordion__toggle accordion__toggle--chrome accordion__toggle--line heading heading--4" data-js="accordion-toggle">Financial Services</div>
                
                <ul className="list--silent text-small accordion__content--chrome accordion__content accordion__content--animated" data-js="accordion-content" style={{height: 1645}}>
                  <li className="active"><a href="/store/fragments/wfs/wfs-index.jsp" className="nav-list__link--filter">Financial Services</a></li>
                  <li><hr className="hr--light" /></li>
                  <li className="active"><a href="/store/fragments/wfs/wfs-index.jsp?content=store-card-benefits" className="nav-list__link--filter">Store Card</a>
                    <ul className="list--silent text-small accordion__content--chrome accordion__content">
                      <li><a href="/store/fragments/wfs/wfs-index.jsp?content=store-card-benefits" className="nav-list__link--filter">Features &amp; Benefits</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=store-card-pricing" className="nav-list__link--filter">Pricing</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110052" className="nav-list__link--filter">Terms &amp; Conditions</a></li>
                      <li><a className="nav-list__link--filter" href="https://www.woolworths.co.za/store/fragments/wfs/wfs-application-details.jsp" target="_blank">Apply Now</a></li>
                      <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/wfs-index" className="nav-list__link--filter">View My Account</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=store-card-payment-options" className="nav-list__link--filter">Payment Options</a></li>
                    </ul>
                  </li>
                  <li><hr className="hr--light" /></li>
                  <li className="active"><a href="/store/fragments/wfs/wfs-index.jsp?content=credit-card" className="nav-list__link--filter">Credit Card</a>
                    <ul className="list--silent text-small accordion__content--chrome accordion__content">
                      <li><a href="/store/fragments/wfs/wfs-index.jsp?content=black-card-benefits" className="nav-list__link--filter">Black Credit Card</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/wfs/wfs-index.jsp?content=black-card-benefits" className="nav-list__link--filter">Features &amp; Benefits</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=black-card-pricing" className="nav-list__link--filter">Pricing</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110053" className="nav-list__link--filter">Terms &amp; Conditions</a></li>	</ul>	</li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=gold-card-benefits" className="nav-list__link--filter">Gold Credit Card</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/wfs/wfs-index.jsp?content=gold-card-benefits" className="nav-list__link--filter">Features &amp; Benefits</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=gold-card-pricing" className="nav-list__link--filter">Pricing</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110053" className="nav-list__link--filter">Terms &amp; Conditions</a></li>	</ul>	</li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=silver-card-benefits" className="nav-list__link--filter">Silver Credit Card</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/wfs/wfs-index.jsp?content=silver-card-benefits" className="nav-list__link--filter">Features &amp; Benefits</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=silver-card-pricing" className="nav-list__link--filter">Pricing</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110053" className="nav-list__link--filter">Terms &amp; Conditions</a></li>	</ul>	</li>	<li><a href="/store/fragments/wrewards/wrewards-index.jsp" className="nav-list__link--filter">WRewards</a></li>	<li><a href="/store/fragments/wrewards/wrewards-index.jsp?content=cards" className="nav-list__link--filter">Apply Now</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=balance-protection-insurance" className="nav-list__link--filter">Balance Protection Insurance</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=shopping-tips" className="nav-list__link--filter">Online Shopping Tips &amp; Security</a></li>
                      <li><a className="nav-list__link--filter" target="_blank" href="https://ib.absa.co.za/wcob/">Logon to Credit Card Banking Online</a></li>
                      <li><a href="/store/fragments/wfs/wfs-index.jsp?content=about-credit-card-banking" className="nav-list__link--filter">More About Credit Card Banking Online</a></li>
                    </ul>
                  </li>
                  <li><hr className="hr--light" /></li>
                  <li className="active"><a href="/store/fragments/wfs/wfs-index.jsp?content=personal-loans" className="nav-list__link--filter">Personal Loans</a>
                    <ul className="list--silent text-small accordion__content--chrome accordion__content">
                      <li> <a className="nav-list__link--filter" href="https://www.woolworths.co.za/store/fragments/wfs/wfs-application-details.jsp">Apply Now</a></li>
                      <li><a href="/store/fragments/wfs/wfs-index.jsp?content=personal-loans-pricing" className="nav-list__link--filter">Pricing</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=personal-loans-payment-options" className="nav-list__link--filter">Payment Options</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110055" className="nav-list__link--filter">Terms &amp; Conditions</a></li>
                    </ul>
                  </li>
                  <li><hr className="hr--light" /></li>
                  <li className="active"><a href="/store/fragments/wfs/wfs-index.jsp?content=insurance" className="nav-list__link--filter">Insurance</a>
                    <ul className="list--silent text-small accordion__content--chrome accordion__content">
                      <li><a href="/store/fragments/wfs/wfs-index.jsp?content=balance-protection-insurance" className="nav-list__link--filter">Balance Protection Insurance</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/wfs/wfs-index.jsp?content=balance-protection-insurance" className="nav-list__link--filter">Features &amp; Benefits</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=balance-insurance-pricing" className="nav-list__link--filter">Pricing</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-content&contentId=cmp100095" className="nav-list__link--filter">Terms &amp; Conditions</a></li>	</ul>	</li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=travel-insurance" className="nav-list__link--filter">Travel Insurance</a>
                        <ul className="list--silent text-small accordion__content--chrome accordion__content">
                          <li><a href="/store/fragments/wfs/wfs-index.jsp?content=travel-insurance" className="nav-list__link--filter">Features &amp; Benefits</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=travel-insurance-claiming" className="nav-list__link--filter">Pricing</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-content&contentId=cmp100135" className="nav-list__link--filter">Terms &amp; Conditions</a></li>
                        </ul>
                      </li>
                      <li><a className="nav-list__link--filter" href="http://www.insurancethroughwoolworths.co.za/Login/Login.aspx">Manage My Policy</a>
                      </li>
                    </ul>
                  </li>
                  <li><hr className="hr--light" /></li>
                  <li className="active"><a href="/store/cat/_/N-ef34pi" className="nav-list__link--filter">My Life</a>
                    <ul className="list--silent text-small accordion__content--chrome accordion__content">
                      <li><a href="/store/cat/My-Life/Career-advice/_/N-1z12uqh" className="nav-list__link--filter">Career advice</a></li>	<li><a href="/store/cat/My-Life/Family-matters/_/N-h26d5o" className="nav-list__link--filter">Family matters</a></li>	<li><a href="/store/cat/My-Life/Managing-at-home/_/N-1y4sert" className="nav-list__link--filter">Managing at home</a></li>	<li><a href="/store/cat/My-Life/Relationships-and-money/_/N-1fgghqr" className="nav-list__link--filter">Relationships and money</a></li>	<li><a href="/store/cat/My-Life/Savings-tips/_/N-kxrt6u" className="nav-list__link--filter">Savings tips</a></li>
                    </ul>
                  </li>
                  <li><hr className="hr--light" /></li>
                  <li><a href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/about-wfs" className="nav-list__link--filter">View My Account</a></li>	<li><a href="/store/fragments/wfs/wfs-index.jsp?content=credit-card-payment-options" className="nav-list__link--filter">Payment Options</a></li> <li><a href="/store/fragments/help/help-index.jsp" className="nav-list__link--filter">Help</a></li> <li><a href="/store/fragments/help/help-index.jsp?content=contact&source=wfs" className="nav-list__link--filter">Contact Financial Services</a></li>	<li><a href="/store/?_DARGS=/store/fragments/navigation/ww/category-list-wfs.jsp_A&_DAV=&_dynSessConf=2892300346183702564" className="nav-list__link--filter">Logout</a></li>	</ul> </div>	</div>
          
          </nav>
          
        </div>
        <div className="page-layout__content">					
         
          <h1 className="heading--2 font-graphic text-caps">Woolworths financial services</h1>
          <div className="grid">
            <div className="grid__half--medium">
              <a href="/store/fragments/wfs/wfs-index.jsp?content=credit-card">
                <img src="/images/wfs/Landing_page_CreditCard.jpg" className="img-fill-responsive" alt="Woolworths Credit Cards" />
              </a>
            </div>
            <div className="grid__half--medium">
              <div className="grid">
                <div className="grid__half--small">
                  <a href="/store/fragments/wfs/wfs-index.jsp?content=store-card-benefits">
                    <img src="/images/wfs/Landing_page_storeCard.jpg" className="img-fill-responsive" alt="Woolworths Store Cards" />
                  </a>
                </div>
                <div className="grid__half--small">
                  <a href="/store/fragments/wfs/wfs-index.jsp?content=personal-loans" className="last-child">
                    <img src="/images/wfs/Landing_page_loansSimple.jpg" className="img-fill-responsive" alt="Personal Loans" />
                  </a>
                </div>
              </div>
              <div className="grid grid--space-y">
                <div className="grid__half--small">
                  <a href="/store/fragments/wfs/wfs-index.jsp?content=insurance">
                    <img src="/images/wfs/Landing_page_insuranceCover.jpg" className="img-fill-responsive" alt="Insurance" />
                  </a>
                </div>
                <div className="grid__half--small">
                  <a href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/about-wfs" className="last-child">
                    <img src="/images/wfs/Landing_page_viewAccounts.jpg" className="img-fill-responsive" alt="View my accounts" />                
                  </a>
                </div>
              </div>           
            </div>
          </div>
          <div className="grid grid--space-y">
            <p>Woolworths Financial Services offers a range of financial solutions. Our Products and services include the Woolworths
              in-store card; gold credit card; black credit card and revolving personal loans. Our Financial solutions are rooted in
              the same dedication to detail, reliability and guarantee of quality that you expect from Woolworths. That is the difference.</p>
          </div>
         
        </div>	</div>

      </div>
    );
  }
}
