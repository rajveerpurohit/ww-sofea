import React, { Component } from 'react';
import {connect} from 'react-redux';

export default class WoolGoldCard extends Component {
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
                      <a href="#" className="nav-list__link--filter"> Features &amp; benefits</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Pricing</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Terms &amp; Conditions</a>
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
              <h2 className="heading--2 font-graphic text-caps">Woolworths Gold Credit Card</h2>
              <div className="grid">
                <div className="grid__third--medium">
                  <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-credit-card-gold.jpg" />
                </div>
                <div className="grid__third--medium">
                  <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-gold-card-wrewards.jpg" />
                </div>
                <div className="grid__third--medium">
                  <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-gold-card-contacts.jpg" />
                </div>
                <div className="grid__half--medium grid--space-y">
                  <h3 className="heading--3 font-graphic text-caps">Features and Benefits</h3>
                </div>
              </div>
              <div className="grid grid--space-y">
                <div className="grid__half--medium">
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Get More Back At Woolies</h3>
                    <p className="text-small">
                      <span className="icon icon--rewards-plus-three-grey icon-para__icon" />
                      <span className="icon-para__paragraph">2% back in
                        <strong>w</strong>vouchers (Woolies vouchers) on all Woolworths purchases.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Cash When You Need It</h3>
                    <p className="text-small">
                      <span className="icon icon--rewards-stash-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Use your Woolworths Credit Card to draw cash at any ATM displaying the Visa logo, worldwide. Interest is charged on all cash advances from the date of the withdrawal until the amount owing is paid.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Automatic Basic Travel Insurance</h3>
                    <p className="text-small">
                      <span className="icon icon--plane-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Basic travel insurance is automatically included if you are under the age of 75 and purchase an international airline ticket using your card.
                        <a href="#">Find out more</a>.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Lost Card Protection</h3>
                    <p className="text-small">
                      <span className="icon icon--lock-grey icon-para__icon" />
                      <span className="icon-para__paragraph">This covers you against the fraudulent use of both primary and secondary cards. Simply notify us within 24 hours of your card being lost/stolen.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Budget Facility</h3>
                    <p className="text-small">
                      <span className="icon icon--calendar-circle-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Make larger purchases by using the budget facility on your Woolworths Credit Card which allows you to choose your repayment period. Funds from your straight account can be allocated to budget so you can spread the payment of R300 or more over 6 to 60 months.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Reward Yourself</h3>
                    <p className="text-small">
                      <span className="icon icon--rosetta-limegreen icon-para__icon" />
                      <span className="icon-para__paragraph">As a Woolworths Credit Cardholder, you're automatically part of our great
                        <a href="#">
                          <strong>W</strong>Rewards programme</a> that offers you exclusive special lower prices and exciting benefits. You'll earn rewards each time you swipe.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Peace Of Mind</h3>
                    <p className="text-small">
                      <span className="icon icon--umbrella-grey icon-para__icon" />
                      <span className="icon-para__paragraph">We offer you Comprehensive Balance Protection on your Woolworths Credit Card.
                        <a href="#">More info</a>.</span>
                    </p>
                  </div>
                </div>
                <div className="grid__half--medium wfs-features__column">
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Get More Back Everywhere</h3>
                    <p className="text-small">
                      <span className="icon icon--rewards-plus-one-grey icon-para__icon" />
                      <span className="icon-para__paragraph">0.75% back in
                        <strong>w</strong>vouchers on all purchases outside of Woolworths.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Free Additional Cards</h3>
                    <p className="text-small">
                      <span className="icon icon--carb-back-grey icon-para__icon" />
                      <span className="icon-para__paragraph">You're entitled to up to 8 additional cards at no extra cost. Everything paid for with these cards will contribute towards your
                        <strong>W</strong>Vouchers.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Medical and Legal Assistance:</h3>
                    <p className="text-small">
                      <span className="icon icon--cross-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Provides you and your immediate family with Assistance Services, when all travelling together on a journey outside your principle country of residence for a duration of up to 90 days.</span>
                    </p>
                    <ul className="list--silent text-small icon-para__paragraph">
                      <li className="list__item--chevron">
                        <strong>Medical Services (free to cardholder and family) include:</strong> telephone medical advice, medical service provider referral, monitoring of medical condition during and after hospitalisation.
                      </li>
                      <li className="list__item--chevron">
                        <strong>Medical Services (chargeable to cardholder and family) include:</strong> the delivery of essential medicine or equipment, despatch of physician, guarantee of hospital admittance deposit, arrangement of emergency medical evacuation and repatriation, arrangement of transportation of mortal remains, arrangement of transportation to join a cardholder, arrangement of return of children.
                      </li>
                      <li className="list__item--chevron">
                        <strong>Travel and General Services (free to cardholder and family) include:</strong>inoculation and visa requirement information, legal referral, interpreter referral.
                      </li>
                    </ul>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Electronic Statements</h3>
                    <p className="text-small">
                      <span className="icon icon--document-grey icon-para__icon" />
                      <span className="icon-para__paragraph">You can elect to receive your monthly statements via email at your convenience.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Pay for Fuel</h3>
                    <p className="text-small">
                      <span className="icon icon--fuel-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Pay for your fuel with your Woolies Credit Card and get up to 1% back in WVouchers PLUS No Transaction Fees &amp; up to 55 days INTEREST FREE on all fuel purchases.</span>
                    </p>
                  </div>
                  <div className="grid grid--space-y info-box--grey">
                    <h3 className="font-graphic">To Qualify, You Must:</h3>
                    <span className="icon icon--profile-inverse-circle-grey icon-para__icon" />
                    <ul className="list--silent text-small icon-para__paragraph">
                      <li className="list__item--chevron">Be 18 years of age or older</li>
                      <li className="list__item--chevron">Have a valid RSA ID number</li>
                      <li className="list__item--chevron">Earn in excess of R3 000.00 per month</li>
                    </ul>
                    <span className="text-small icon-para__paragraph">When collecting your credit card, bring the following:</span>
                    <ul className="list--silent text-small icon-para__paragraph">
                      <li className="list__item--chevron">Valid South African ID</li>
                      <li className="list__item--chevron">Latest three payslips or the last three months' bank statements</li>
                      <li className="list__item--chevron">Utility bill or original bank statement dated within the last three months, as proof of residence</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid--space-y">
                  <button className="btn btn--primary btn--right">Apply Now</button>
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
