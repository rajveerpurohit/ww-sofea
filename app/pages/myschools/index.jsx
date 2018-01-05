import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

export default class MYSchools extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <main className="grid grid--space-y site-main">
          <div className="main-page">
            <div className="grid grid--space-y">
              <div className="grid">
                <Link to="">
                  <img className="img-fill-responsive" src="/store/assets/images/content/banners/banner-myschool.jpg" />
                </Link>
              </div>
              <div className="grid grid--space-y">
                <h2 className="text-caps font-graphic">MySchool MyVillage MyPlanet</h2>
                <p className="text-small">
                  <strong>MySchool MyVillage MyPlanet</strong> is South Africa's number one community support fundraising programme, which raises over R4 million a month for more than 10,000 worthy schools, charities and environmental/ animal welfare organisations.
                    </p>
                <h4 className="text-caps font-graphic">How does it work?</h4>
                <p className="text-small">You can sign up for a MySchool card in store or online at
                        <Link to="">www.myschool.co.za</Link> or
                        <strong>link your Woolies card to MySchool</strong> and choose which beneficiary you want to support every time you shop. Whenever you swipe your card at Woolies,
                        <strong>up to 1% of your purchases are given back</strong> to your cause,
                        <strong>at no cost to you!</strong> Woolies makes the contribution on your behalf. How rewarding!</p>
                <h4 className="text-caps font-graphic">Benefits to you</h4>
                <ul className="list--silent text-small">
                  <li className="list__item--chevron">Instant WRewards for you whilst you reward others.</li>
                  <li className="list__item--chevron">Exclusive access to exciting MySchool competitions.</li>
                  <li className="list__item--chevron">Monthly update on the amount of funds you have raised for your beneficiary and how funds are being used to benefit the community.</li>
                  <li className="list__item--chevron">Every swipe counts!</li>
                </ul>
                <h4 className="text-caps font-graphic">Link your card</h4>
                <p className="text-small">Call MySchool Customer Services on 0860 100 445 or go to
                        <Link to="">www.myschool.co.za.</Link>
                </p>
                <h4 className="text-caps font-graphic">Make every swipe count today!</h4>
                <button className="btn btn--primary btn--right">Join Now</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
