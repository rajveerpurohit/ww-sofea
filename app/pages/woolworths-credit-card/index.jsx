import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

export default class WoolCreditCard extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
           <main className="grid grid--space-y site-main">
        <div className="main-page">
          <div className="grid grid--space-y">
            <div className="page-layout__aside">
              <div className="accordion accordion--chrome" data-js="accordion" data-accordion-start="first-open" data-accordion-type="open-single" data-accordion-active="true">
                <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                  <h4 className="text-caps accordion__toggle--chrome accordion__toggle--line accordion__toggle" data-js="accordion-toggle">Credit Card:</h4>
                  <ul className="list--silent text-small accordion__content--chrome accordion__content" data-js="accordion-content">
                    <li>
                      <Link to="" className="nav-list__link--filter"> Black Credit Card</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Gold Credit Card</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Silver Credit Card</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> WRrewards</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Apply Now</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Balance Protection Insurance</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> View My Account</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Payment Options</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Online Shopping Tips &amp; Security</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Logon to Credit Card Banking Online</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> More About Credit Card Banking Online</Link>
                    </li>
                    <li>
                      <hr className="hr--light" />
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Help</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Contact Financial Services</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Log out</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="page-layout__content">
              <h2 className="heading--2 font-graphic text-caps">Woolworths Credit Cards</h2>
              <p>With a Woolworths Credit Card you will earn WVouchers each and every time you swipe. As a Woolworths Credit Cardholder, you're automatically part of our great WRewards programme that offers you exclusive special lower prices and other benefits.</p>
              <hr className="hr--light" />
              <div className="grid panel-row--medium">
                <div className="grid__fourth--medium panel-row__item--medium">
                  <Link to="">
                    <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-credit-cards-black.jpg" />
                  </Link>
                  <p>
                    <Link to="" className="text-small link--silent link--circ-arrow-hover">
                      <span className="icon-text">Read more</span>
                      <span className="icon icon--right-circ-dark">»</span>
                    </Link>
                  </p>
                </div>
                <div className="grid__fourth--medium panel-row__item--medium">
                  <Link to="">
                    <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-credit-cards-gold.jpg" />
                  </Link>
                  <p>
                    <Link to="" className="text-small link--silent link--circ-arrow-hover">
                      <span className="icon-text">Read more</span>
                      <span className="icon icon--right-circ-dark">»</span>
                    </Link>
                  </p>
                </div>
                <div className="grid__fourth--medium  panel-row__item--medium">
                  <Link to="">
                    <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-credit-cards-silver.jpg" />
                  </Link>
                  <p>
                    <Link to="" className="text-small link--silent link--circ-arrow-hover">
                      <span className="icon-text">Read more</span>
                      <span className="icon icon--right-circ-dark">»</span>
                    </Link>
                  </p>
                </div>
                <div>
                  <div className="grid__fourth--medium  panel-row__item--medium">
                    <Link to="">
                      <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-membership-difference.jpg" />
                    </Link>
                  </div>
                </div>
              </div>
              <hr className="hr--light" />
              <div className="grid">
                <h4 className="heading--4 font-graphic text-caps">We'll tell you which card you qualify for when you apply:</h4>
                <button className="btn btn--primary btn--right">Apply Now</button>
              </div>
              <hr className="hr--light" />
              <div className="grid panel-row--medium">
                <div className="grid__third--medium panel-row__item--medium">
                  <h4 className="heading--4 font-graphic">Contact Us</h4>
                  <ul className="list--silent text-small">
                    <li>Phone :
                      <Link to="">086 50 20 20</Link>
                    </li>
                    <li>Fax :
                      <Link to="">0861 50 20 06</Link>
                    </li>
                    <li>Email :
                      <Link to="">creditcard@wfs.co.za</Link>
                    </li>
                  </ul>
                </div>
                <div className="grid__third--medium panel-row__item--medium">
                  <h4 className="heading--4 font-graphic">Balance Protection Insurance</h4>
                  <p className="text-small">Choose the option that suits your needs.</p>
                  <p>
                    <Link to="" className="text-small link--silent link--circ-arrow-hover">
                      <span className="icon-text">More Details</span>
                      <span className="icon icon--right-circ-dark">»</span>
                    </Link>
                  </p>
                </div>
                <div className="grid__third--medium panel-row__item--medium">
                  <h4 className="heading--4 font-graphic">View Accounts</h4>
                  <p className="text-small">Login to view all your account info</p>
                  <p>
                    <Link to="" className="text-small link--silent link--circ-arrow-hover">
                      <span className="icon-text">Login</span>
                      <span className="icon icon--right-circ-dark">»</span>
                    </Link>
                  </p>
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
