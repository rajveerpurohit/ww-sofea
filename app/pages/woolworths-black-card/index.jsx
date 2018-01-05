import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

export default class WoolBlackCard extends Component {
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
                      <Link to="" className="nav-list__link--filter"> Features &amp; benefits</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Pricing</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Terms &amp; Conditions</Link>
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
              <h2 className="heading--2 font-graphic text-caps">Woolworths Black Credit Card</h2>
              <div className="grid">
                <div className="grid__third--medium">
                  <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-black-credit-card-apply.jpg" />
                </div>
                <div className="grid__third--medium">
                  <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-black-credit-card-wrewards.jpg" />
                </div>
                <div className="grid__third--medium">
                  <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-wfs-black-credit-card-contacts.jpg" />
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
                      <span className="icon-para__paragraph">3% back in
                        <strong>w</strong>vouchers (Woolies vouchers) on all Woolworths purchases.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Free Taste Magazines</h3>
                    <p className="text-small">
                      <span className="icon icon--document-pages-grey icon-para__icon" />
                      <span className="icon-para__paragraph">With a WoolworthsBlack Credit Card, you'll receive a
                        <strong>voucher for a free</strong> TASTE magazine each month.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Free Coffee</h3>
                    <p className="text-small">
                      <span className="icon icon--coffee-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Get a free coffee or tea at any Woolworths Cafe, To Go or Tapas Bar, twice a month. </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Free Online Delivery</h3>
                    <p className="text-small">
                      <span className="icon icon--mouse-grey icon-para__icon" />
                      <span className="icon-para__paragraph">As a WoolworthsBlack Credit Cardholder, you'll get free online delivery when you shop on
                        <Link to="">www.woolworths.co.za</Link>. You will need to save your Black Credit Card against your online profile in order to activate this benefit.
                      </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Shop Anywhere</h3>
                    <p className="text-small">
                      <span className="icon icon--globe-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Your Woolworths Credit Card is internationally recognised and accepted at 29 million merchants around the world, wherever you see the Visa sign. </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Cash When You Need It</h3>
                    <p className="text-small">
                      <span className="icon icon--rewards-stash-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Use your Woolworths Credit Card to draw cash at any ATM displaying the Visa logo, worldwide. Interest is charged on all cash advances from the date of the withdrawal until the amount owing is paid. </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Free Additional Cards</h3>
                    <p className="text-small">
                      <span className="icon icon--carb-back-grey icon-para__icon" />
                      <span className="icon-para__paragraph">You're entitled to up to 8 additional cards at no extra cost. Everything paid for with these cards will contribute towards your
                        <strong>W</strong>Vouchers</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Reward Yourself</h3>
                    <p className="text-small">
                      <span className="icon icon--rosetta-limegreen icon-para__icon" />
                      <span className="icon-para__paragraph">As a Woolworths Credit Cardholder, you're automatically part of our great
                        <Link to="">WRewards programme</Link> that offers you exclusive special lower prices and exciting benefits. With a Woolworths Black Credit Card, you'll automatically receive
                        <strong>W</strong>Rewards benefits as a VIP cardholder for one year.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Piece Of Mind</h3>
                    <p className="text-small">
                      <span className="icon icon--umbrella-grey icon-para__icon" />
                      <span className="icon-para__paragraph">We offer you Comprehensive Balance Protection on your Woolworths Credit Card.
                        <Link to="">More info</Link>.</span>
                    </p>
                  </div>
                  <div className="wfs__details-block">
                    <h3 className="heading--3 font-graphic">Visa Purchase Protection</h3>
                    <p className="text-small">
                      <span className="icon icon--phone-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Provides short term insurance protection against theft and specified causes of accidental damage for 90 days from the date of purchase. Terms and conditions apply.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Exclusive Service</h3>
                    <p className="text-small">
                      <span className="icon icon--phone-grey icon-para__icon" />
                      <span className="icon-para__paragraph">You have access to an exclusive WoolworthsBlack Credit Card contact centre. </span>
                    </p>
                  </div>
                </div>
                <div className="grid__half--medium wfs-features__column">
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Get More Back Everywhere</h3>
                    <p className="text-small">
                      <span className="icon icon--rewards-plus-one-grey icon-para__icon" />
                      <span className="icon-para__paragraph">1% back in
                        <strong>w</strong>vouchers on all purchases outside of Woolworths.</span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Automatic Basic Travel Insurance</h3>
                    <p className="text-small">
                      <span className="icon icon--plane-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Basic travel insurance is automatically included if you are under the age of 75 and purchase an international airline ticket using your card.
                        <Link to="">Find out more</Link>.</span>
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
                        <strong>Medical Services (free to cardholder and family) include:</strong>
                        telephone medical advice, medical service provider referral, monitoring of medical condition during and after hospitalisation.
                      </li>
                      <li className="list__item--chevron">
                        <strong>Medical Services (chargeable to cardholder and family) include:</strong>
                        the delivery of essential medicine or equipment, despatch of physician, guarantee of hospital admittance deposit, arrangement of emergency medical evacuation and repatriation, arrangement of transportation of mortal remains, arrangement of transportation to join a cardholder, arrangement of return of children.
                      </li>
                      <li className="list__item--chevron">
                        <strong>Travel and General Services (free to cardholder and family) include:</strong>
                        inoculation and visa requirement information, legal referral, interpreter referral.
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
                    <h3 className="heading--3 font-graphic">Visa Extended Warranty</h3>
                    <p className="text-small">
                      <span className="icon icon--phone-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Coverage is provided which doubles the original manufacturer's warranty period. If applicable to a period of not exceeding 24 months. Cover included if the purchase is stolen or damaged or if the purchased ceases to operate satisfactorily and requires repairs.
                      </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Budget Facility</h3>
                    <p className="text-small">
                      <span className="icon icon--calendar-circle-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Make larger purchases by using the budget facility on your Woolworths Credit Card which allows you to choose your repayment period. Funds from your straight account can be allocated to budget so you can spread the payment of R300 or more over 6 to 60 months.
                      </span>
                    </p>
                  </div>
                  <div className="wfs-features__block">
                    <h3 className="heading--3 font-graphic">Pay for Fuel</h3>
                    <p className="text-small">
                      <span className="icon icon--fuel-plus-one-grey icon-para__icon" />
                      <span className="icon-para__paragraph">Pay for your fuel with your Woolies Credit Card and get up to 1% back in WVouchers PLUS No Transaction Fees &amp; up to 55 days INTEREST FREE on all fuel purchases.
                      </span>
                    </p>
                  </div>
                  <div className="grid grid--space-y info-box--grey">
                    <h3 className="font-graphic">To Qualify, You Must:</h3>
                    <span className="icon icon--profile-inverse-circle-grey icon-para__icon" />
                    <ul className="list--silent text-small icon-para__paragraph">
                      <li className="list__item--chevron">Be 18 years of age or older</li>
                      <li className="list__item--chevron">Have a valid RSA ID number</li>
                      <li className="list__item--chevron">Earn in excess of R41,666 per month</li>
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
