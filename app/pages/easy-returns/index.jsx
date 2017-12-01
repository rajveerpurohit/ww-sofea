import React, { Component } from 'react';
import {connect} from 'react-redux';


export default class EasyReturns extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
          <main className="grid grid--space-y site-main">
          <div className="main-page ">
           
            <nav className="breadCrumbs empty" />
           
            <div className="grid page-layout">
              <div className="page-layout__aside">
                
                <nav className="subCategoryNav toggled ">
                  
                  <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="open-single" data-accordion-type="open-single" data-accordion-animated="true" data-accordion-active="true">
                    <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
                      <div className="accordion__toggle accordion__toggle--chrome accordion__toggle--line heading heading--4" data-js="accordion-toggle">Help</div>
                      <ul className="list--silent text-small accordion__content--chrome accordion__content accordion__content--animated" data-js="accordion-content" style={{height: 156}}>
                        <li className="active"><a href="/store/fragments/help/help-index.jsp" className="nav-list__link--filter">Help</a></li>	<li><a href="/store/fragments/help/help-index.jsp?content=contact" className="nav-list__link--filter">Contact Us</a></li>	<li><a href="/store/fragments/help/help-index.jsp?content=faqs" className="nav-list__link--filter">FAQs</a></li>	<li><a href="/store/fragments/customer-service/customer-service-index.jsp?content=find-store" className="nav-list__link--filter">Store Locator</a></li>	<li><a href="/store/fragments/help/size-guide/size-guide-index.jsp?content=woolworths-size-guide-index" className="nav-list__link--filter">Size Guides</a></li>	<li><a href="/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110130" className="nav-list__link--filter">Using Woolworths Online</a></li>	</ul> </div>	</div>
                 
                </nav>
               
              </div>
              <div className="page-layout__content">		
                <div className="grid">
                  
                  <article>
                    <h1 className="heading heading--1 text-caps font-graphic">Easy returns and refunds</h1>
                    <div className="text-small"><p>Here's how you can return or refund your online purchase.</p>
                      <p><strong>How do I return an online purchase?&nbsp;</strong><br /><span style={{color: 'rgb(0, 0, 0)', fontSize: 12}}>We want you to be happy with your purchase. If for any reason you’re not, you may return items purchased online to any Woolworths store for a full refund, replacement or exchange, provided you have the original tax invoice, and items are returned in a saleable condition within 60 days of purchase. Remember, you must present&nbsp;</span>two documents<span style={{color: 'rgb(0, 0, 0)', fontSize: 12}}>&nbsp;when you return an item you've purchased online to a store:</span></p>
                      <ul>
                        <li>Your dispatch note:<strong>&nbsp;</strong><span style={{color: 'rgb(0, 0, 0)', fontSize: 12}}>This is given to you when your order is delivered</span></li>
                        <li>Your original tax invoice<span style={{color: 'rgb(0, 0, 0)', fontSize: 12}}>: This is emailed to you when your order is being processed. You can either print it out, or show it to the cashier on your phone</span></li>
                      </ul>
                      <p>Please note:</p>
                      <ul>
                        <li>Should you not have an invoice, we will be happy to exchange your purchase at the current system price.</li>
                        <li>Cell phones, cell phone accessories, and certain other items are covered by separate warranties.</li>
                        <li>For hygiene reasons, underwear (excluding bras) and earrings for pierced ears may not be returned or exchanged.</li>
                        <li>Gift cards purchased will not be refunded.</li>
                        <li>Country Road, Trenery, Mimco and Witchery purchases may only be returned to Woolworths stores that carry these brands.</li>
                      </ul>
                      <p><strong>Our delivery agents are not authorised to accept goods for return on delivery.</strong><br />Please phone Customer Services on 0860 100 987 to find the store nearest you.</p>
                      <p><strong>How will I be refunded?</strong><br /><span style={{color: 'rgb(0, 0, 0)', fontSize: 12}}>Your refund will be given against the original payment card as specified on your proof of purchase (your online dispatch note serves as your proof of purchase). For example, if you paid online with a credit card, the Woolworths store which handles your refund will process your refund to a credit card. In the event of a gift return, or no proof of payment being available, you will be refunded via a Woolworths gift card. Please note that we cannot make cash refunds for items purchased online.</span></p></div> </article>	
                  
                </div>	</div>	</div>	
          </div>	</main>
      </div>
    );
  }
}
