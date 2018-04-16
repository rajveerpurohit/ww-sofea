import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { getMaintainCards } from '.././actions';

class AddWrewardsCard extends Component {
  static need = [];
  constructor(props) {
    super(props);
    this.primaryComponent = this.primaryComponent.bind(this);
  }
  componentDidMount() {
    this.props.getMaintainCards();
  }
  primaryComponent(maintainCardsData) {
    return (
      <div className="page-layout__content">
        <header><h1>Add Your WRewards Card To Your Online Profile</h1></header>
        <section className="grid">
          <div className="grid__two-thirds--medium">
            <p className="text-intro">By adding your WRewards card to your online profile you will be able to see your <strong>W</strong>Rewards tier status and vouchers as well as claiming instant savings as you shop. If you have any Financial Services products, you will also see your financial transactions and related information.</p>
            <form method="post" name="frmAddWRewardsCardForm" id="frmAddWRewardsCardForm" className="contactForm addWRewardsCard ">
              <div className="form-field" data-js="form-field"><input maxLength="16" name="fldCardNumber" id="fldCardNumber" placeholder="Card number*" type="text" value="" className="stdFld" />
              </div>
              <input name="submit" id="fldSubmit" type="submit" value="Add Card" className="grid--space-y btn btn--primary" />
            </form>
          </div>
          <div className="grid__third--medium checkout">
            <aside className="">
              <section className="panel--padded theme--medium">
                <h3 className="font-graphic text-caps">Need Help?</h3><p className="text-small">Call us on: <strong>0860 022 002</strong>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Email us: <a href="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</a></p>
              </section>
              <section className="grid--space-y panel panel--padded">
                <p className="text-small">*PLEASE NOTE: We can only add your MySchool card if you have given Woolworths permission to contact you in your MySchool settings.</p>
              </section>
            </aside>
          </div>
        </section>
      </div>
    );
  }
  render() {
    const maintainCardsData = _.get(this.props, 'maintainCardsStatus', {});
    return (
      <main className="grid grid--space-y site-main">
        {maintainCardsData && this.primaryComponent(maintainCardsData)}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    maintainCardsStatus: state.wrewardsReducer.maintainCardsReducer.mainCardsData
  };
};


export default connect(mapStateToProps, { getMaintainCards })(AddWrewardsCard);

