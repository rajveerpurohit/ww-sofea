import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';


export default class WeRewardsWorks extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
              <main className="grid grid--space-y site-main">
                <div className="main-page">
                <div className="grid grid--space-y">
                    <h1 className="font-graphic text-caps">How it works</h1>
                    <p className="text-small">
                    <Link to="">Terms and conditions apply</Link>
                    </p>
                    <p className="text-intro">
                    <strong>W</strong>Rewards is our way of rewarding customers INSTANTLY.
                    <strong>W</strong>Rewards members save millions every week.</p>
                    <p className="text-small">As a Woolworths cardholder, you are automatically a member with
                    <strong>W</strong>Rewards. This exclusive membership gives you the opportunity to:</p>
                    <ul className="list--silent text-small">
                    <li className="list__item--chevron">
                        <strong>Save</strong> up to 20%
                        <strong>instantly</strong> on thousands of items throughout the store, from food to clothing to homeware to beauty and more.</li>
                    <li className="list__item--chevron">Earn
                        <strong>tiered benefits</strong>. Check your
                        <Link to="">
                        <strong>W</strong>Rewards tier status</Link> to see just how much your shopping has paid off for you. Just remember to swipe your card before your till items are rung up. The more you shop, the higher your status, the more benefits you will receive.</li>
                    <li className="list__item--chevron">Want to
                        <strong>save even more?</strong> Pay with a Woolworths Store Card or Credit Card and you'll enjoy an additional
                        <strong>5% savings</strong>
                        - that's 15% instead of 10% on specially marked
                        <strong>W</strong>Rewards offers.
                    </li>
                    </ul>
                    <hr className="hr--light" />
                    <h4 className="font-graphic text-caps">Get More</h4>
                    <p className="text-small">
                    <span className="icon icon--steps-circle-anthracite icon-para__icon" />
                    <span className="icon-para__paragraph">There are three levels to
                        <strong>W</strong>Rewards - the more you spend,
                        <strong>the more guaranteed rewards</strong> you'll enjoy. You'll start out on the Valued level, and we'll review your status every quarter, upgrading your status automatically as you qualify for a higher level.</span>
                    </p>
                    <div className="grid grid--space-y wrewards-member-tiers">
                    <div className="grid__third--medium slick-list wrewards-member-tiers__tier">
                        <div className="wrewards-member-tiers__tier-header">
                        <h2 className="text-caps wrewards-member-tiers__tier-heading">
                            <span className="wrewards-member-tiers__level-name">Valued</span> Member</h2>
                        <span className="text-caps text-small font-graphic wrewards-member-tiers__tier-sub-heading">Swipe and save instantly</span>
                        </div>
                        <div className="text-small wrewards-member-tiers__tier-body">
                        <ul className="list--silent">
                            <li className="list__item--chevron">Swipe your Woolies card and get an extra 10% off selected items. Pay with your Woolies card and get a further 5% off selected items.</li>
                            <li className="list__item--chevron">Be the first to know about sales and special events</li>
                        </ul>
                        </div>
                    </div>
                    <div className="grid__third--medium slick-list wrewards-member-tiers__tier">
                        <div className="wrewards-member-tiers__tier-header">
                        <h2 className="text-caps wrewards-member-tiers__tier-heading">
                            <span className="wrewards-member-tiers__level-name">Loyal</span> Member</h2>
                        <span className="text-caps text-small font-graphic wrewards-member-tiers__tier-sub-heading">Spend Between R10 000 - R29 999 annually</span>
                        </div>
                        <div className="text-small wrewards-member-tiers__tier-body">
                        <ul className="list--silent">
                            <li className="list__item--chevron">Swipe your Woolies card and get an extra 10% off selected items. Pay with your Woolies card and get a further 5% off selected items.</li>
                            <li className="list__item--chevron">Be the first to know about sales and special events</li>
                            <li className="list__item--chevron">Exclusive
                            <strong>W</strong>Rewards savings vouchers throughout the year</li>
                            <li className="list__item--chevron">Welcome to tier voucher</li>
                        </ul>
                        </div>
                    </div>
                    <div className="grid__third--medium slick-list wrewards-member-tiers__tier">
                        <div className="wrewards-member-tiers__tier-header">
                        <h2 className="text-caps wrewards-member-tiers__tier-heading">
                            <span className="wrewards-member-tiers__level-name">VIP</span> Member</h2>
                        <span className="text-caps text-small font-graphic wrewards-member-tiers__tier-sub-heading">Spend R30 000 or more annually</span>
                        </div>
                        <div className="text-small wrewards-member-tiers__tier-body">
                        <ul className="list--silent">
                            <li className="list__item--chevron">Swipe your Woolies card and get an extra 10% off selected items. Pay with your Woolies card and get a further 5% off selected items.</li>
                            <li className="list__item--chevron">Be the first to know about sales and special events</li>
                            <li className="list__item--chevron">Exclusive
                            <strong>W</strong>Rewards savings vouchers throughout the year</li>
                            <li className="list__item--chevron">Birthday voucher</li>
                            <li className="list__item--chevron">Welcome to tier voucher</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    <div className="grid grid--space-y">
                    <h4 className="font-graphic text-caps">Support a school or charity</h4>
                    <p className="text-small">
                        <span className="icon icon--rainbow-circle-anthracite icon-para__icon" />
                        <span className="icon-para__paragraph">We're big on giving to organisations that make a difference for others. MySchool MyVillage MyPlanet raises over R1 million every week for schools and charities. If you're not already a supporter, tick the "Join MySchool MyVillage MyPlanet" box on the application form and up to 1% of the value of your purchases will be given to your chosen school or charity when you swipe your WRewards card at Woolies. Every swipe counts and it doesn't cost you a cent!
                        </span>
                    </p>
                    <p>
                        <button className="btn btn--primary btn--right">Apply Now</button>
                    </p>
                    </div>
                </div>
                </div>
            </main>
      </div>
    );
  }
}
