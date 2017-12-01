import React, { Component } from 'react';
import {connect} from 'react-redux';

export default class WoolStoreCard extends Component {
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
                  <h4 className="text-caps accordion__toggle--chrome accordion__toggle--line accordion__toggle" data-js="accordion-toggle">Store Card:</h4>
                  <ul className="list--silent text-small accordion__content--chrome accordion__content" data-js="accordion-content">
                    <li>
                      <a href="#" className="nav-list__link--filter">
                        <strong>Features &amp; Benefits</strong>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Pricing</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Apply Now</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> View My Account</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Payment Options</a>
                    </li>
                    <li>
                      <hr className="hr--light" />
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Help</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Contact Financial Services</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Log out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="page-layout__content">
              <h2 className="heading--2 font-graphic text-caps">Woolworths Store Card</h2>
              <div className="grid">
                <div className="grid__third--medium">
                  <a href="#">
                    <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-store-card-apply.jpg" />
                  </a>
                </div>
                <div className="grid__third--medium">
                  <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-store-card-contacts.jpg" />
                </div>
                <div className="grid__third--medium">
                  <a href="#">
                    <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-store-card-wrewards.jpg" />
                  </a>
                </div>
              </div>
              <div className="grid grid--space-y">
                <h3 className="font-graphic heading--3 text-caps">Features and Benefits</h3>
                <div className="grid__half--medium  wfs-features__column">
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Automatic Rewards</h3>
                    <p className="text-small">
                      <span className="icon icon--rosetta-limegreen icon-para__icon" />
                      <span className="icon-para__paragraph">As a Woolworths Store Cardholder, you're automatically part of our great
                        <a href="#">WRewards programme</a> that offers you exclusive special lower prices on selected items at Woolies as well as other benefits.
                      </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Make a Difference</h3>
                    <p className="text-small">
                      <span className="icon icon--rainbow-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Link your Store Card to our MySchool MyVillage MyPlanet fundraising programme and we'll donate up to 1% of the value of every Woolworths purchase you make to the organisation of your choice.
                        <a href="#">Get more info</a>.
                      </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">You're In Control</h3>
                    <p className="text-small">
                      <span className="icon icon--calendar-circle-grey icon-para__icon" />
                      <span className="icon-para__paragraph">A Woolworths Store Card puts you in charge of your budget. You decide how much you want to pay each month, and the payment method you prefer.
                      </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Easy To Manage</h3>
                    <p className="text-small">
                      <span className="icon icon--document-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Your purchases are automatically billed to your account and you'll receive a monthly statement. Pay at any Woolworths store, by debit order, electronically at ATMs or by using telephone or internet banking.
                      </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Convenient</h3>
                    <p className="text-small">
                      <span className="icon icon--clock-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Use your Woolworths Store card at any Woolies store and at selected Engen stores in South Africa (this excludes lotto, petrol and electricity purchases). Pay your utility bill (water &amp; electricity) and buy airtime.
                      </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Additional Cards</h3>
                    <p className="text-small">
                      <span className="icon icon--carb-back-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Get up to 8 additional Cards for your family and friends at no extra cost. Purchases made with these cards will be billed to your account.
                      </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Lost Card Protection</h3>
                    <p className="text-small">
                      <span className="icon icon--lock-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Notify us within 24 hours of your Store Card being lost or stolen.</span>
                    </p>
                  </div>
                </div>
                <div className="grid__half--medium wfs-features__column">
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">24-Hour Shopping</h3>
                    <p className="text-small">
                      <span className="icon icon--clock-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Use your Woolworths Store Card to shop online at
                        <a href="#">www.woolworths.co.za</a>.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Up To 55 Days Interest Free</h3>
                    <p className="text-small">
                      <span className="icon icon--calendar-55-grey icon-para__icon" />
                      <span className="icon-para__paragraph">As long as you pay your account in full on or before the due date, no interest will be charged. </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">24/7 Balance</h3>
                    <p className="text-small">
                      <span className="icon icon--clock-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Check your balance automatically without talking to a consultant just by calling 0861 50 20 20. Make sure you have your account number and ID number handy. You can also ask for assistance at any of our till points. </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Easy Application</h3>
                    <p className="text-small">
                      <span className="icon icon--profile-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Just complete the application form online or pick up a brochure and application form next time you're at Woolies, hand it in there or fax it to 021 407 5850. </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Peace Of Mind</h3>
                    <p className="text-small">
                      <span className="icon icon--umbrella-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Your peace of mind is important to us, so we offer you Comprehensive Balance Protection.
                        <a href="#">Find out more about these options</a>.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Mobile Self Service (MSS)</h3>
                    <p className="text-small">
                      <span className="icon icon--phone-feature-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Allows you to access your Woolworths Store Account info on your cellphone wherever you are.
                        <a href="#" target="_blank">Find out more</a>.</span>
                    </p>
                  </div>
                  <div className="grid grid--space-y info-box--grey">
                    <h3 className="font-graphic">To Qualify, You Must:</h3>
                    <span className="icon icon--profile-inverse-circle-grey icon-para__icon" />
                    <ul className="text-small list--silent icon-para__paragraph">
                      <li className="icon-text list__item--chevron">Be 18 years of age or older</li>
                      <li className="icon-text list__item--chevron">Have a valid RSA ID number</li>
                      <li className="icon-text list__item--chevron">Earn at least R2,000 per month</li>
                      <p className="text-small">When collecting your store card, bring the following:</p>
                      <li className="list__item--chevron">Valid South African ID</li>
                      <li className="list__item--chevron">Latest three payslips or the last three months' bank statements</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid--space-y">
                  <button className="btn btn--right btn--primary">Apply Now</button>
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
