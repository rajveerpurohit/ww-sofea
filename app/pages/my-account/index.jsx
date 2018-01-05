import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';


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
                      <Link className="nav-list__link--filter strong" to="">Help</Link>
                    </li>
                    <li>
                      <Link className="nav-list__link--filter strong is-current" to="">Contact Us</Link>
                    </li>
                    <li>
                      <Link className="nav-list__link--filter strong" to="">Log out</Link>
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
                      <Link to="dashboard-index.jsp?content=myaccount/user-details" className="link--silent">My Details</Link>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <ul className="list--silent text-small">
                      <li className="list__item--chevron">
                        <Link to="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details">My personal details</Link>
                      </li>
                      <li className="list__item--chevron">
                        <Link to="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/delivery-details">Create delivery address</Link>
                      </li>
                      <li className="list__item--chevron">
                        <Link to="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/payment-details">My online payment details</Link>
                      </li>
                    </ul>
                  </section>
                  <footer className="panel-card__footer">
                    <strong />
                    <Link className="arrow-link--forward link--silent text-small" to="/store/fragments/dashboard/dashboard-index.jsp?content=myaccount/user-details">View all</Link>
                  </footer>
                </div>
               
                <div className="panel panel-card panel--flex">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <Link to="/fragments/dashboard/dashboard-index.jsp?content=preferences/consents" className="link--silent">My Preferences</Link>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <ul className="list--silent text-small">
                      <li className="list__item--chevron">
                        <Link to="/store/fragments/dashboard/dashboard-index.jsp?content=preferences/consents">View Communication Consents</Link>
                      </li>
                    </ul>
                  </section>
                  <footer className="panel-card__footer">
                  </footer>
                </div>
              
                <div className="panel panel-card panel--flex panel-card--tealblue">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <Link to="dashboard-index.jsp?content=wfs/about-wfs" className="link--silent">Financial Services</Link>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <p className="font-graphic text-caps heading heading--2">GET THE CARD THAT GIVES YOU MORE</p>
                  </section>
                  <footer className="panel-card__footer">
                    <strong>
                      <Link className="arrow-link--forward link--silent text-small" to="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/about-wfs">Apply now</Link>
                    </strong>
                    <br />
                    <strong>
                      <Link className="arrow-link--forward link--silent text-small" to="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/connect-card&source=wfs">Add your Woolies card</Link>
                    </strong>
                  </footer>
                </div>
                
                <div className="panel panel-card panel--flex panel-card--lumo-green">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <Link to="dashboard-index.jsp?content=rewards/about-rewards" className="link--silent">My WRewards</Link>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <p className="font-graphic heading heading--2 text-caps">SAVE 10% INSTANTLY ON OVER 1000 ITEMS </p>
                  </section>
                  <footer className="panel-card__footer">
                    <strong>
                      <Link className="arrow-link--forward link--silent text-small" to="/store/fragments/wrewards/wrewards-application.jsp?content=../dashboard/rewards/apply-wrewards&apply=rewards">Sign up now</Link>
                    </strong>
                    <br />
                    <strong>
                      <Link className="arrow-link--forward link--silent text-small" to="/store/fragments/dashboard/dashboard-index.jsp?content=wfs/connect-card&source=rewards">Add your WRewards card</Link>
                    </strong>
                  </footer>
                </div>
               
                <div className="panel panel-card panel--flex">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <Link to="/store/fragments/dashboard/dashboard-index.jsp?content=shopping-lists/shopping-lists-index" className="link--silent">My Shopping Lists
                      </Link>
                      <span className="icon icon--shopping-list-dark" />
                    </h3>
                    <p className="inline-visible-small-only">0 items</p>
                   
                  </header>
                  <section className="panel-card__body" />
                  <footer className="panel-card__footer">
                    <strong>
                      <Link className="arrow-link--forward link--silent text-small" to="dashboard-index.jsp?content=shopping-lists/create-list">Create a new list</Link>
                    </strong>
                  </footer>
                </div>
               
                <div className="panel panel-card panel--flex panel-card--hot-pink">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <Link to="dashboard-index.jsp?content=purchases/purchase-history" className="link--silent">My Online Orders</Link>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <p className="font-graphic heading heading--2 text-caps">Welcome, your first delivery is free</p>
                  </section>
                  <footer className="panel-card__footer">
                    <strong>
                      <Link className="arrow-link--forward link--silent text-small" to="/store/">Start shopping</Link>
                    </strong>
                  </footer>
                </div>
                
                <div className="panel panel-card panel--flex">
                  <header className="panel-card__header">
                    <h3 className="font-graphic text-caps">
                      <Link to="/store/fragments/help/help-index.jsp" className="link--silent">Need Help ?</Link>
                    </h3>
                  </header>
                  <section className="panel-card__body">
                    <ul className="list--silent text-small">
                      <li className="list__item--chevron">
                        <Link to="/store/fragments/help/help-index.jsp?content=faqs">FAQs</Link>
                      </li>
                      <li className="list__item--chevron">
                        <Link to="/store/fragments/help/help-index.jsp?content=contact">Ask a question</Link>
                      </li>
                    </ul>
                  </section>
                  <footer className="panel-card__footer">
                    <strong>
                      <Link className="arrow-link--forward link--silent text-small" to="/store/fragments/help/help-index.jsp">View all</Link>
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
