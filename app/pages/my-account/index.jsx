import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { getdashboarddetails } from './actions';
import Image from '../../components/basic/Image';

class MyAccount extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getdashboarddetails();
  }

  render() {
    const { dashboarddetails, currentUser } = this.props;
    const littleworldMap = _.get(dashboarddetails, 'littleworldMap', '');
    const littleworld = _.get(dashboarddetails, 'littleworld', '');
    const favorites = _.get(currentUser, 'favorites.productIds', []);
    const synchronizeStatus = _.get(currentUser, 'synchronizeStatus', []);
    const createDeliveryAddress = _.get(dashboarddetails, 'createDeliveryAddress', '');
    const recentOrders = _.get(dashboarddetails, 'orderHistory.items', '');
    const wRewardsMap = _.get(dashboarddetails, 'wRewardsMap', '');
    const shoppingLists = _.get(dashboarddetails, 'shoppingLists', '').slice(0, 3);
    const financialServices = _.get(dashboarddetails, 'financialServices', '');
    return (
      <div>
        <main className="grid grid--space-y site-main">
          <div className="main-page">
            <div className="grid grid--space-y page-layout">
              <div className="page-layout__content">
                <h1 className="font-graphic text-caps">My Account</h1>
                <p className="text-intro">If you wish to update your details, please contact our call centre.
                <span className="font-graphic">Woolworths Call Centre</span> : 0860 022 002
                <span className="font-graphic">WFS Call Centre</span> : 021 411 5000</p>
                <div className="flex-parent">
                  <div className="panel panel-card panel--flex">
                    <header className="panel-card__header">
                      <h3 className="font-graphic text-caps">
                        <Link to="dashboard/myaccount/user-details" className="link--silent">My Details</Link>
                      </h3>
                    </header>
                    <section className="panel-card__body">
                      <ul className="list--silent text-small">
                        <li className="list__item--chevron">
                          <Link className="link--silent" to="dashboard/myaccount/user-details">My personal details</Link>
                        </li>
                        <li className="list__item--chevron">
                          <Link className="link--silent" to="dashboard/myaccount/delivery-details">{createDeliveryAddress ? 'Create delivery address' : 'My addresses'}</Link>
                        </li>
                        <li className="list__item--chevron">
                          <Link className="link--silent" to="dashboard/myaccount/payment-details">My online payment details</Link>
                        </li>
                      </ul>
                    </section>
                    <footer className="panel-card__footer">
                      <strong />
                      <Link className="arrow-link--forward link--silent text-small" to="/dashboard/myaccount/user-details">View all</Link>
                    </footer>
                  </div>
                  <div className="panel panel-card panel--flex">
                    <header className="panel-card__header">
                      <h3 className="font-graphic text-caps">
                        <Link to="dashboard/preferences/interests" className="link--silent">My Preferences</Link>
                      </h3>
                    </header>
                    <section className="panel-card__body">
                      <ul className="list--silent text-small">
                        <li className="list__item--chevron">
                          <Link to="dashboard/preferences/consents">View Communication Consents</Link>
                        </li>
                        {synchronizeStatus ? <li className="list__item--chevron">
                          <Link to="dashboard/preferences/interests">View Communication Interests</Link>
                        </li> : null}
                      </ul>
                    </section>
                    <footer className="panel-card__footer" />
                  </div>
                  <div className={`panel panel-card panel--flex ${financialServices && financialServices.length > 0 ? '' : 'panel-card--tealblue'}`}>
                    <header className="panel-card__header">
                      <h3 className="font-graphic text-caps">
                        <Link to="dashboard/wfs/about-wfs" className="link--silent">Financial Services</Link>
                      </h3>
                    </header>
                    {financialServices && financialServices.length > 0 ?
                      <section className="panel-card__body">
                        <div className="text-small">My accounts:
                        <br />{financialServices.map((item) => {
                          const payload = {
                            url: item.cardLargeImage,
                            alt: item.description,
                            classNam: 'card',
                            width: 37,
                            height: 24
                          };
                          return (
                            <Link to="dashboard/wfs/my-wfs">
                              <Image payload={payload} />
                            </Link>
                          );
                        }
                        )}
                        </div>
                      </section> :
                      <section className="panel-card__body">
                        <p className="font-graphic text-caps heading heading--2">GET THE CARD THAT GIVES YOU MORE</p>
                      </section>}
                    {financialServices && financialServices.length > 0 ?
                      <footer className="panel-card__footer">
                        <strong>
                          <Link className="arrow-link--forward link--silent text-small" to="dashboard/wfs/my-wfs">View more</Link>
                        </strong>
                      </footer> :
                      <footer className="panel-card__footer">
                        <strong>
                          <Link className="arrow-link--forward link--silent text-small" to="dashboard/wfs/about-wfs">Apply now</Link>
                        </strong>
                        <br />
                        <strong>
                          <Link className="arrow-link--forward link--silent text-small" to="dashboard/wfs/connect-card">Add your Woolies card</Link>
                        </strong>
                      </footer>}
                  </div>
                  <div className={`panel panel-card panel--flex ${wRewardsMap && wRewardsMap.unclaimedVouchers ? '' : 'panel-card--lumo-green'}`}>
                    <header className="panel-card__header">
                      <h3 className="font-graphic text-caps">
                        <Link to="dashboard/rewards/about-rewards" className="link--silent">My WRewards</Link>
                      </h3>
                    </header>
                    {wRewardsMap && wRewardsMap.unclaimedVouchers ?
                      <section className="panel-card__body">
                        <p className="text-small">
                        Tier: VIP <br />
                          <Link to="/store/fragments/dashboard/dashboard-index.jsp?content=rewards/vouchers" className="link--silent">
                        Unclaimed Vouchers: 6
                      </Link>
                          <br />
                        You saved: R 8,459.31
                      </p>
                      </section> :
                      <section className="panel-card__body">
                        <p className="font-graphic heading heading--2 text-caps">SAVE 10% INSTANTLY ON OVER 1000 ITEMS </p>
                      </section>}
                    <footer className="panel-card__footer">
                      <strong>
                        <Link className="arrow-link--forward link--silent text-small" to="/dashboard/rewards/apply-wrewards">Sign up now</Link>
                      </strong>
                      <br />
                      <strong>
                        <Link className="arrow-link--forward link--silent text-small" to="/dashboard/rewards/connect-card">Add your WRewards card</Link>
                      </strong>
                    </footer>
                  </div>
                  <div className="panel panel-card panel--flex">
                    <header className="panel-card__header">
                      <h3 className="font-graphic text-caps">
                        <Link to="dashboard/shopping-lists/create-list" className="link--silent">My Shopping Lists&nbsp;
                        </Link>
                        <span className="icon icon--shopping-list-dark" style={{ marginTop: -5 }} />
                      </h3>
                      {shoppingLists && shoppingLists.length > 0 ?
                        <section className="panel-card__body">
                          <ul className="list--silent text-small">
                            {shoppingLists.map(item =>
                              <li className="list__item--chevron" key={item.id}>
                                <Link to={`dashboard/shopping-lists/shoppinglist/${item.id}`} className="link--silent">
                                  {item.description} : {item.itemCount} items
                                </Link>
                              </li>
                            )
                            }
                          </ul>
                        </section> :
                        null}
                    </header>
                    <section className="panel-card__body" />
                    <footer className="panel-card__footer">
                      <strong>
                        {
                          shoppingLists && shoppingLists.length > 0
                            ? <Link className="arrow-link--forward link--silent text-small" to="/dashboard/shopping-lists/shopping-lists-index">View all</Link>
                            : <Link className="arrow-link--forward link--silent text-small" to="/dashboard/shopping-lists/create-list">Create a new list</Link>
                        }


                      </strong>
                    </footer>
                  </div>
                  <div className={`panel panel-card panel--flex ${recentOrders && recentOrders.length > 0 ? '' : 'panel-card--hot-pink'}`}>
                    <header className="panel-card__header">
                      <h3 className="font-graphic text-caps">
                        <Link to="dashboard/purchases/purchase-history" className="link--silent">My Online Orders</Link>
                      </h3>
                    </header>
                    {recentOrders && recentOrders.length > 0 ?
                      <section className="panel-card__body">
                        <p className="font-graphic heading heading--2 text-caps">Last two orders:</p>
                        {recentOrders.map(item => <p><span className="arrow-link--forward link--silent text-small" ><strong>{item.submittedDate.split(' ')[0]}</strong>-R {item.priceInfo && item.priceInfo.amount}</span></p>)}
                      </section> :
                      <section className="panel-card__body">
                        <p className="font-graphic heading heading--2 text-caps">Welcome, your first delivery is free</p>
                      </section>
                    }<footer className="panel-card__footer">
                      <strong>
                        {recentOrders && recentOrders.length > 0 ?
                          <Link className="arrow-link--forward link--silent text-small" to="/dashboard/purchases/purchase-history">View all</Link>
                          : <Link className="arrow-link--forward link--silent text-small" to="/">Start shopping</Link>}
                      </strong>
                    </footer>
                  </div>

                  {!_.isEmpty(favorites) ?
                    <div className="panel panel-card panel--flex">
                      <header className="panel-card__header">
                        <h3 className="font-graphic text-caps">
                          <Link className="link--silent" to="dashboard/favourites/favourites-index">
                            My Favorites
                            <Image
                              payload={{
                                url: '/images/icons/icon_heartSmall.png',
                                alt: 'My Favourites'
                              }}
                            />
                          </Link>
                        </h3>
                      </header>
                      <section className="panel-card__body">
                        <ul className="list--silent text-small">
                          <li className="list__item--chevron">
                            <Link className="link--silent" to="dashboard/favourites/favourites-details">Products</Link>
                          </li>
                        </ul>
                      </section>
                      <footer className="panel-card__footer">
                        <strong>
                          <Link className="arrow-link--forward link--silent text-small" to="dashboard/favourites/favourites-details">View all</Link>
                        </strong>
                      </footer>
                    </div>
                    : null
                  }

                  {littleworld ?
                    <div className="panel panel-card panel--flex">
                      <header className="panel-card__header">
                        <h3 className="font-graphic text-caps">
                          <Link className="link--silent" to="dashboard/favourites/favourites-index">
                            littleworld
                            <Image
                              payload={{
                                url: '/images/icons/icon_heartSmall.png',
                                alt: 'My Favourites'
                              }}
                            />
                          </Link>
                        </h3>
                      </header>
                      <section className="panel-card__body">
                        <ul className="list--silent text-small">
                          <li className="list__item--chevron">
                            <span className="link--silent">children:{littleworldMap.Children}</span>
                          </li>
                        </ul>
                      </section>
                      <footer className="panel-card__footer">
                        <strong>
                          <Link className="arrow-link--forward link--silent text-small" to="dashboard/littleworld/details">View all</Link>
                        </strong>
                      </footer>
                    </div>
                    : null
                  }

                  <div className="panel panel-card panel--flex">
                    <header className="panel-card__header">
                      <h3 className="font-graphic text-caps">
                        <Link to="help" className="link--silent">Need Help ?</Link>
                      </h3>
                    </header>
                    <section className="panel-card__body">
                      <ul className="list--silent text-small">
                        <li className="list__item--chevron">
                          <Link className="link--silent" to="help/faqs">FAQs</Link>
                        </li>
                        <li className="list__item--chevron">
                          <Link className="link--silent" to="contactus">Ask a question</Link>
                        </li>
                      </ul>
                    </section>
                    <footer className="panel-card__footer">
                      <strong>
                        <Link className="arrow-link--forward link--silent text-small" to="help">View all</Link>
                      </strong>
                    </footer>
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
const mapStateToProps = (state) => {
  return {
    currentUser: state.clp.currentUser,
    dashboarddetails: state.dashboardReducer.dashboard.dashboard,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getdashboarddetails }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(MyAccount);
