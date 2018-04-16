import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { getAllItemsInWishList } from '../../components/basic/favorite-list/actions';
import Image from '../../components/basic/Image';


class Favourites extends Component {

  static need = [
    // getAllItemsInWishList
  ]
  constructor(props) {
    super(props);
    this.state = {
      wishListItemsLoaded: true
    };
  }
  componentWillMount() {
    const wishListItems = _.get(this.props, 'currentUser.wishListItems', []);
    if (_.isEmpty(wishListItems)) {
      this.setState({ wishListItemsLoaded: false });
      this.props.getAllItemsInWishList().then(() => this.setState({ wishListItemsLoaded: true }));
    }
  }
  componentDidMount() {
    // this.props.getAllItemsInWishList().then();
  }
  renderPanelBody = (wishListItems) => {
    if (!_.isEmpty(wishListItems)) {
      return (
        <div className="panel-card__body">
          <section className="panel-card__body text-align-center">
            <div className="grid">
              {/* PRODUCT IMAGE */}
              {wishListItems.map((product, i) => {
                if (i < 2) {
                  const payload = {
                    url: product.internalImageURL,
                    externalUrl: product.externalImageURL,
                    className: 'img-responsive lazyloaded',
                    alt: product.displayName,
                    title: product.displayName,
                    width: 80
                  };
                  return (
                    <span key={product.productId}> <Link rel={product.productId} id={`img_link_${product.productId}`} to={product.productURL} className="link--silent">
                      <Image payload={payload} />
                    </Link>
                    </span>
                  );
                }
              })}
            </div>
          </section>
          <hr className="hr hr--light mini-cart__ctas" />
          <section className="panel-card__footer">
            <ul className="list list--silent">
              {wishListItems.map((product, i) => {
                if (i < 2) {
                  return (
                    <li key={product.productId} className="list__item list__item--chevron">
                      <Link to={product.productURL} className="link--silent text-small">{product.displayName}</Link>
                    </li>
                  );
                }
              })}
            </ul>
            <Link className="arrow-link--forward link--silent text-small" to="/dashboard/favourites/favourites-details">View all</Link>
          </section>
        </div>
      );
    }
    return (
      <div className="panel-card__body">
        <p className="link--silent">No Saved Favourites List</p>
      </div>
    );
  }
  renderLoader = () => {
    return (
      <div className="panel-card__body">
        <span className="loading loading--dark loading--large" style={{ margin: '17% 0 0 42%' }} />
      </div>
    );
  }
  render() {
    const wishListItems = _.get(this.props, 'currentUser.wishListItems', []);
    const firstName = _.get(this.props, 'currentUser.firstName', '');
    const { wishListItemsLoaded } = this.state;
    return (
      <div>

        <main className="grid grid--space-y site-main">
          <div className="main-page">
            <div className="grid grid--space-y page-layout">
              <div className="page-layout__content">
                {/* FAVOURITES */}
                <h1 className="font-graphic text-caps">
                  {!!firstName.length && `${firstName}'s`} Favourites
                  <Image
                    payload={{
                      url: 'images/icons/icon_heartBig.png',
                      alt: 'My Favourites'
                    }}
                  />
                </h1>
                <div className="flex-parent">
                  <div className="panel panel-card panel--flex grid__two-fourths--medium">
                    {/* REPEAT FOR PRODUCTS, ARTICLES & RECIPES */}
                    <header className="panel-card__header">
                      <h3 className="font-graphic text-caps">My Favourites</h3>
                    </header>
                    {wishListItemsLoaded ? this.renderPanelBody(wishListItems) : this.renderLoader()}

                  </div>
                </div>
                {/* END FAVOURITES */}
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
    miniCartData: state.headerReducer.miniCartReducer,
    currentUser: state.clp.currentUser,
    user: state.user
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllItemsInWishList }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Favourites);
