import React, { Component } from 'react';
import {connect} from 'react-redux';


export default class MyAccount extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
        
      <main className="grid grid--space-y site-main">
        <div className="main-page">
          <div className="grid grid--space-y page-layout">
            <div className="page-layout__aside">
              <div className="accordion accordion--chrome" data-js="accordion" data-accordion-start="open-single" data-accordion-type="open-single" data-accordion-active="true">
                <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                  <h4 className="accordion__toggle--chrome accordion__toggle" data-js="accordion-toggle">MY ACCOUNT</h4>
                  <ul className="list--silent text-small accordion__content--chrome accordion__content" data-js="accordion-content">
                    <li>
                      <a className="nav-list__link--filter strong" href="#">Help</a>
                    </li>
                    <li>
                      <a className="nav-list__link--filter strong is-current" href="#">Contact Us</a>
                    </li>
                    <li>
                      <a className="nav-list__link--filter strong" href="#">Log out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="page-layout__content">
              <h1 className="font-graphic">My Account</h1>
              <p className="text-intro">If you wish to update your details, please contact our call centre.
                <span className="font-graphic">Woolworths Call Centre</span> : 0860 022 002
                <span className="font-graphic">WFS Call Centre</span> : 021 411 5000</p>
            
              <div className="flex-parent">
              
                <div className="panel panel-card panel--flex">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <a href="dashboard-index.jsp?content=myaccount/user-details" className="link--silent">My Details</a>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <ul className="list--silent text-small">
                      <li className="list__item--chevron">
                        <a href="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details">My personal details</a>
                      </li>
                      <li className="list__item--chevron">
                        <a href="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/delivery-details">Create delivery address</a>
                      </li>
                      <li className="list__item--chevron">
                        <a href="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/payment-details">My online payment details</a>
                      </li>
                    </ul>
                  </section>
                  <footer className="panel-card__footer">
                    <strong />
                    <a className="arrow-link--forward link--silent text-small" href="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details">View all</a>
                  </footer>
                </div>
               
                <div className="panel panel-card panel--flex">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <a href="/fragments/dashboard/dashboard-index.jsp?content=preferences/consents" className="link--silent">My Preferences</a>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <ul className="list--silent text-small">
                      <li className="list__item--chevron">
                        <a href="/store/fragments/dashboard/dashboard-index.jsp?content=preferences/consents">View Communication Consents</a>
                      </li>
                    </ul>
                  </section>
                  <footer className="panel-card__footer">
                  </footer>
                </div>
              
                <div className="panel panel-card panel--flex panel-card--tealblue">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <a href="dashboard-index.jsp?content=wfs/about-wfs" className="link--silent">Financial Services</a>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <p className="font-graphic text-caps heading heading--2">GET THE CARD THAT GIVES YOU MORE</p>
                  </section>
                  <footer className="panel-card__footer">
                    <strong>
                      <a className="arrow-link--forward link--silent text-small" href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/about-wfs">Apply now</a>
                    </strong>
                    <br />
                    <strong>
                      <a className="arrow-link--forward link--silent text-small" href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/connect-card&source=wfs">Add your Woolies card</a>
                    </strong>
                  </footer>
                </div>
                
                <div className="panel panel-card panel--flex panel-card--lumo-green">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <a href="dashboard-index.jsp?content=rewards/about-rewards" className="link--silent">My WRewards</a>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <p className="font-graphic heading heading--2 text-caps">SAVE 10% INSTANTLY ON OVER 1000 ITEMS </p>
                  </section>
                  <footer className="panel-card__footer">
                    <strong>
                      <a className="arrow-link--forward link--silent text-small" href="/store/fragments/wrewards/wrewards-application.jsp?content=../dashboard/rewards/apply-wrewards&apply=rewards">Sign up now</a>
                    </strong>
                    <br />
                    <strong>
                      <a className="arrow-link--forward link--silent text-small" href="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/connect-card&source=rewards">Add your WRewards card</a>
                    </strong>
                  </footer>
                </div>
               
                <div className="panel panel-card panel--flex">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <a href="/store/fragments/dashboard/dashboard-index.jsp?content=shopping-lists/shopping-lists-index" className="link--silent">My Shopping Lists
                      </a>
                      <span className="icon icon--shopping-list-dark" />
                    </h3>
                    <p className="inline-visible-small-only">0 items</p>
                   
                  </header>
                  <section className="panel-card__body" />
                  <footer className="panel-card__footer">
                    <strong>
                      <a className="arrow-link--forward link--silent text-small" href="dashboard-index.jsp?content=shopping-lists/create-list">Create a new list</a>
                    </strong>
                  </footer>
                </div>
               
                <div className="panel panel-card panel--flex panel-card--hot-pink">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <a href="dashboard-index.jsp?content=purchases/purchase-history" className="link--silent">My Online Orders</a>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <p className="font-graphic heading heading--2 text-caps">Welcome, your first delivery is free</p>
                  </section>
                  <footer className="panel-card__footer">
                    <strong>
                      <a className="arrow-link--forward link--silent text-small" href="/store/">Start shopping</a>
                    </strong>
                  </footer>
                </div>
                
                <div className="panel panel-card panel--flex">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <a href="/store/fragments/help/help-index.jsp" className="link--silent">Need Help ?</a>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <ul className="list--silent text-small">
                      <li className="list__item--chevron">
                        <a href="/store/fragments/help/help-index.jsp?content=faqs">FAQs</a>
                      </li>
                      <li className="list__item--chevron">
                        <a href="/store/fragments/help/help-index.jsp?content=contact">Ask a question</a>
                      </li>
                    </ul>
                  </section>
                  <footer className="panel-card__footer">
                    <strong>
                      <a className="arrow-link--forward link--silent text-small" href="/store/fragments/help/help-index.jsp">View all</a>
                    </strong>
                  </footer>
                </div>
              
              </div>
            
            </div>
          </div>
        </div>
      </main>
             
            
      </div>
    );
  }
}
