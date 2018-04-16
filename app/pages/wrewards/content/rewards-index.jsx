import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { getSavingDetails } from '../actions';

class WrewardsIndex extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSavingDetails();
  }

  render() {
    const savingDetails = this.props.savingDetails;

    if (_.size(savingDetails) === 0) return (<div className="page-layout__content" />);

    let currentYearData = (<div className="panel panel-card__body panel--padded"><p>We have no data for the current year</p></div>);

    if (savingDetails.ytdDiscountDouble + savingDetails.totalRewardSaving > 0) {
      currentYearData = (<div>
        <p><b><b>W</b>Rewards summary from July {savingDetails.financialYear - 1}</b>:</p>
        <div className="wrewards-savings-summary">
          <div>
            <p><b>W</b>Rewards total instant savings.</p>
          </div>
          <div>
            <p><strong>{savingDetails.ytdDiscountDouble}</strong></p>
          </div>
        </div>
        <div className="wrewards-savings-summary">
          <div>
            <p><b>W</b>Rewards Credit Card Vouchers earned quarterly</p>
          </div>
          <div>
            <p><strong>{savingDetails.totalRewardSaving}</strong></p>
          </div>
        </div>
      </div>);
    }

    let previousYearData = (<header className="panel panel-card__body panel--padded grid--space-y">
      <p>We have no data for the previous year</p></header>);

    if (savingDetails.prevYtdDiscountDouble + savingDetails.totalRewardSavingForPrevYear > 0) {
      previousYearData = (<header className=" buttonHolder">
        <a rel="accordionContent">
          <p className="floatL"><strong>WRewards summary from July {savingDetails.financialYear - 2} to June {savingDetails.financialYear - 1} </strong></p>
          <p className=" floatR"><span className="openArrow" /></p>
          <div className="clearFloat" />
        </a>
        <section className="accordionContent">
          <div>
            <div className="wrewards-savings-summary">
              <div>
                <p><b>W</b>Rewards total instant savings.</p>
              </div>
              <div className="floatR">
                <p className="textR price"><strong>R {savingDetails.prevYtdDiscountDouble}</strong></p>
              </div>

            </div>

            <div className="wrewards-savings-summary">
              <div>
                <p><b>W</b>rewards Credit Card Vouchers earned quarterly</p>
              </div>
              <div>
                <p className="textR price"><strong>R {savingDetails.totalRewardSavingForPrevYear}</strong></p>
              </div>
            </div>
          </div>
        </section>
      </header>);
    }

    return (
      <div className="page-layout__content">
        <section className="grid">
          <h1 className="text-caps font-graphic">WREWARDS</h1>
          <div className="grid grid__two-thirds--medium">
            {
              savingDetails && savingDetails.tieredStatusValue && (<div className="panel panel-card__body panel--padded"><p className="text-intro grid__three-fourths--small"><strong className="font-graphic">My Tier Status</strong>: {savingDetails.tieredStatusValue}</p>
                <Link to="/dashboard/rewards/tier-status" className="btn btn--primary btn--right grid__one-fourth--small">View Details</Link>
              </div>)
            }
            {savingDetails && savingDetails.unclaimedVouchers > 0 &&
              (<div className="panel panel-card__body panel--padded grid--space-y"><p className="text-intro grid__three-fourths--small"><strong className="font-graphic">My Vouchers</strong>: {savingDetails.unclaimedVouchers} Vouchers<a className="notifyAlert"><span>!</span></a></p><Link className="btn btn--primary btn--right grid__one-fourth--small" to="/dashboard/rewards/vouchers">View My Vouchers</Link></div>)
            }
            {
              savingDetails && savingDetails.unclaimedVouchers === 0 &&
              (<div className="panel panel-card__body panel--padded grid--space-y"><p className="text-intro grid__three-fourths--small"><strong className="font-graphic">My Vouchers</strong>: {savingDetails.unclaimedVouchers} Vouchers</p></div>)
            }
          </div>
          <div className="grid grid__third--medium">

            <Link to="/store/fragments/common/dimension-search-results.jsp?searchTerm=WRewards&amp;isExact=true">
              <img src="/images/rewards/earthcred.jpg" alt="Exclusive to cardholders" className="img-responsive" />
            </Link>
          </div>
        </section>
        <section className="grid grid--space-y">
          {currentYearData}
        </section>
        <div className="panel panel-card__body panel-card--lumo-green panel--padded grid--space-y">
          <div>
              <p>You have saved <span className="price">R {savingDetails.ytdDiscountDouble + savingDetails.totalRewardSaving}</span></p>
            </div>
          {savingDetails.unclaimedVouchers > 0 &&
              (<p>To save even more, don't let your {savingDetails.unclaimedVouchers} <u><a href="/fragments/dashboard/dashboard-index.jsp?content=rewards/vouchers">vouchers</a></u> expire!</p>)
            }
        </div>
        <section className="accordionWrapper">
          <article className="accordionBlock">
              {previousYearData}
            </article>
        </section>
        <section className="grid grid--space-y">
          <article className="grid__third--large">
              <a href="/store/fragments/wrewards/wrewards-index.jsp">
                <img className="img-responsive" src="/images/rewards/vitality.jpg" alt="Instant Rewards" />
              </a>
            </article>
          <article className="grid__third--large">
              <a href="/store/fragments/wrewards/wrewards-index.jsp?content=my-school">
                <img className="img-responsive" alt="MySchool MyVillage MyPlanet" src="/images/rewards/myschool_v2.jpg" />
              </a>
            </article>
          <article className="grid__third--large">
              <a href="/store/fragments/wrewards/wrewards-index.jsp?content=littleworld">
                <img className="img-responsive" alt="MySchool MyVillage MyPlanet" src="/images/rewards/little_world.jpg" />
              </a>
            </article>
        </section>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    savingDetails: state.wrewardsReducer.savingDetails
  };
};

export default connect(mapStateToProps, { getSavingDetails })(WrewardsIndex);
