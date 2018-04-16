import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { getMaintainCards } from './actions';
import SideMenu from '../../components/sections/SideMenu';


class MaintainCards extends Component {
  static need = [];
  constructor(props) {
    super(props);
    this.primaryComponent = this.primaryComponent.bind(this);
  }
  componentDidMount() {
    this.props.getMaintainCards();
  }
  primaryComponent(maintainCardsData) {
    const content = (cardData) => {
      return cardData && cardData.map((card, i) => {
        return (
          <article className="panel panel-card__body panel--padded grid__third--small" key={i}>
            <form method="post" name="removeCard_28" action="">
              <section className="grid">
                <div className="grid__third--large">
                  <img src={card.cardImage} alt="WRewards Card" className="img-responsive" />
                </div>
                <div className="grid__two-thirds--large flush-m">
                  <h3 className="font-graphic text-intro flush-m">WRewards Card</h3>
                  <p className="text-small flush-m">
                    <strong>Card number:</strong>
                    {card.cardNumber}
                  </p>
                  <p><Link to={`/dashboard/rewards/maintain-cards/${i}`} className="text-medium text-dampen-slight arrow-link--forward link--silent">
                            View card info
                    </Link>
                  </p>
                </div>
              </section>
            </form>
          </article>
        );
      });
    };
    return (
      <div className="main-page">
        <nav className="breadcrumb empty" />
        <div className="grid grid--space-y page-layout">
          <div className="page-layout__content">
            <header>
              <h1 className="text-caps font-graphic flush-m">Add/Maintain Cards</h1>
            </header>
            <section className="contentBlock">
              <p>Below are all the Woolies cards you have added to your online profile.</p>
              <div className="grid">
                {content(maintainCardsData.maintainrewardcardList)}
              </div>
              <div>
                <p className="text-intro">Have another <strong>W</strong>Rewards card?</p>
                <p><a href="/dashboard/rewards/add-wrewards-card" className="btn btn--primary btn--right">Add it now</a></p>
              </div>
            </section>
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


export default connect(mapStateToProps, { getMaintainCards })(MaintainCards);

