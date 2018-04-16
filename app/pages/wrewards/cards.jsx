import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import Barcode from 'react-barcode';

import { getMaintainCards } from './actions';
import SideMenu from '../../components/sections/SideMenu';


class Cards extends Component {
  static need = [];
  constructor(props) {
    super(props);
    this.primaryComponent = this.primaryComponent.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getMaintainCards();
  }
  handleClick(printPage){
    let headstr = '<html><head><title></title></head><body>';
    let footstr = '</body>';
    let newstr = document.all.item(printPage).innerHTML;
    let oldstr = document.body.innerHTML;
    document.body.innerHTML = headstr + newstr + footstr;
    window.print();
    document.body.innerHTML = oldstr;
    return false;
  }

  primaryComponent(maintainCardsData) {
    console.log('DDDDDDD', maintainCardsData);
    const cardId = this.props.params.cardid;
    return (
      <div className="main-page">
        <nav className="breadcrumb empty" />
        <div className="grid grid--space-y page-layout">
          <div className="page-layout__content">
            <div className="contentBlock wrewardsWrapper grid">
              <div className="grid__two-thirds--medium">
                <h1>WREWARDS CARD</h1>
                <div className="grid">
                  <div className="itemSizeTable" />
                  <div className="grid__fourth--medium wcard_text">
                    <p><strong>Card Number</strong>:</p>
                  </div>
                  <div className="grid__fourth--medium wcard_num">
                    <p className="textR">{maintainCardsData.maintainrewardcardList && maintainCardsData.maintainrewardcardList[cardId].cardNumber}</p>
                  </div>
                  <div className="itemSizeTable" />
                </div>
                <section>
                  <div id="printBarcode" className="show-print pos--rel" >
                    <Barcode value={maintainCardsData.maintainrewardcardList && maintainCardsData.maintainrewardcardList[cardId].cardNumber} />
                  </div>
                  <br />
                  <div className="grid__fourth--medium">
                    <div className="grid">
                      <div className="display-none--mobi-max"><a href="" className="btn btn--primary btn--right" onClick={() => { this.handleClick('printBarcode'); }}>PRINT BARCODE</a></div>

                      <div className="display-none--mobi-min"><a href="javascript:printBarcode('printBarcodeMobile');" className="btn btn--primary btn--right">PRINT BARCODE</a></div>
                    </div>
                  </div>
                  <div className="grid__fourth--medium"><a className="btn btn--primary btn--right">EMAIL MY CARD INFO</a></div>
                  <br />
                  <br />
                  <h2 className="text-caps font-graphic">HOW TO USE THIS CARD</h2>
                  <p className="text-intro">When making payment online, your <b>W</b>Rewards instant savings will automatically be calculated.</p>
                  <p className="text-intro">There are several ways to use your <b>W</b>Rewards card in-store.</p>
                  <ul className="list list--silent">
                    <li className="list__item list__item--chevron">If you have a physical card, present it at the till point, or</li>
                    <li className="list__item list__item--chevron">quote your card number to the cashier, or</li>
                    <li className="list__item list__item--chevron">print out the barcode and present it to the cashier to scan.</li>
                  </ul>
                </section>
              </div>
              <div className="panel panel-card__body panel--padded grid__fourth--medium flush-m">
                <p className="floatR"><strong>Need help? Call us on: <u>0861 50 20 50</u></strong></p>
                {/* <img className="floatR wrewards_cardImg" src="/images/rewards/wrewards_card.jpg" /> */}
              </div>
             
            </div>
            <p id="add-maintain" className="floatL"><Link to="/dashboard/rewards/maintain-cards/" className="arrow-link--forward link--silent text-small strong">Back to Add / Maintain My Cards</Link></p>
          </div>
        </div>
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


export default connect(mapStateToProps, { getMaintainCards })(Cards);

