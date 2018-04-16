import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import {
  addItemToFavoriteList,
  removeItemFromFavoriteList
} from './actions';
import { GIFT_LIST_TYPE } from '../../../Constants';

class FavoriteList extends Component {
  constructor(props) {
    super(props);

    const productId = _.get(props, 'productData.p_productid', null);
    const catalogRefIds = _.get(props, 'productData.p_SKU', null);
    this.state = {
      productId,
      catalogRefIds
    };

    this.renderWithoutTooltip = this.renderWithoutTooltip.bind(this);
    this.renderWithTooltip = this.renderWithTooltip.bind(this);

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addItemToWishList = this.addItemToWishList.bind(this);
    this.removeItemFromWishList = this.removeItemFromWishList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const productId = _.get(nextProps, 'productData.p_productid', null);
    const catalogRefIds = _.get(nextProps, 'productData.p_SKU', null);

    this.setState({ productId, catalogRefIds });
  }

  get isFavorite() {
    const favoriteList = _.get(this.props, 'currentUser.favorites.productIds', []);

    return _.includes(favoriteList, this.state.productId);
  }

  get favoriteLabel() {
    return this.isFavorite ? 'Added to favourites' : 'Add to favourites';
  }

  toggleFavorite(evt) {
    evt.preventDefault();
    const favoriteListId = _.get(this.props, 'currentUser.favorites.wishListId', '');

    if (favoriteListId) {
      if (this.isFavorite) {
        this.removeItemFromWishList(favoriteListId);
      } else {
        this.addItemToWishList(favoriteListId);
      }
    }
  }

  addItemToWishList(favoriteListId) {
    const { catalogRefIds, productId } = this.state;
    const data = {
      giftlistId: String(favoriteListId),
      productId: String(productId),
      catalogRefIds: String(catalogRefIds),
      giftlistType: GIFT_LIST_TYPE
    };

    this.props.addItemToFavoriteList(data);
  }

  removeItemFromWishList(favoriteListId) {
    const { catalogRefIds, productId } = this.state;
    const data = {
      giftlistId: String(favoriteListId),
      productId: String(productId),
      catalogRefId: String(catalogRefIds)
    };

    this.props.removeItemFromFavoriteList(data);
  }

  renderWithTooltip(props, body) {
    const { productId } = this.state;

    return (
      <span id={`product_favorites_${productId}`} className={`product_favorites_${productId}`}>
        <Link
          {...props}
          data-tip={body}
          data-for={productId}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <ReactTooltip
          id={productId}
          place="left"
          effect="solid"
        />
      </span>
    );
  }

  renderWithoutTooltip(props, body) {
    const { productId } = this.state;

    return (
      <span id={`product_favorites_${productId}`} className={`product_favorites_${productId}`}>
        <Link {...props} dangerouslySetInnerHTML={{ __html: body }} />
      </span>
    );
  }

  render() {
    const { user, addAsChildren, showTooltip } = this.props;
    const isFavorite = this.isFavorite;
    const iconClasses = classnames('icon', { 'icon--heart-grey': !isFavorite }, { 'icon--heart-solid-pink': isFavorite });
    const props = {};
    let body = this.favoriteLabel;

    if (user.isLoggedIn) {
      props.onClick = this.toggleFavorite;
    } else {
      props.to = '/login';
    }

    if (addAsChildren) {
      props.className = 'btn btn--silent';

      body = `<span class="${iconClasses}"></span><span class="icon-text">${body}</span>`;
    } else {
      props.className = classnames('product-card__wish', iconClasses);
    }

    return (showTooltip ? this.renderWithTooltip(props, body) : this.renderWithoutTooltip(props, body));
  }
}

const mapStateToProps = (state) => {
  return state;
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ addItemToFavoriteList, removeItemFromFavoriteList }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(FavoriteList);
