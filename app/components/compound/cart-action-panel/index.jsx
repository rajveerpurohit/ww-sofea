import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { addItemToCart, removeItemFromCart, getUserAddresses, createNewShoppingList, addItemToShoppingList } from './actions';
import ShoppingListDropdown from '../../basic/shopping-list-dropdown';
import AddItemToCart from '../../basic/add-item-to-cart';
import { loader } from '../../../actions/common';
import { postDeliveryArea } from '../../basic/delevery-model/actions';
import { performInventoryCheck } from '../../../pages/pdp/actions';

class CartActionPanel extends Component {
  constructor(props) {
    super(props);

    this.addItemToShoppingList = this.addItemToShoppingList.bind(this);
    this.createNewShoppingList = this.createNewShoppingList.bind(this);
  }

  createNewShoppingList(listName) {
    this.props.loader(true);
    this.props.createNewShoppingList(listName);
  }

  addItemToShoppingList(giftListId) {
    const skuID = this.props.productInfo.p_SKU;
    const item = { giftListId, skuID };
    this.props.addItemToShoppingList(item);
  }

  render() {
    const { productInfo, user, currentUser, cartDetails } = this.props;
    const productId = productInfo.p_productid;

    return (
      <div>
        <AddItemToCart
          user={user}
          currentUser={currentUser}
          loader={this.props.loader}
          fromCLP={this.props.fromCLP}
          addItemBtnClasses="btn--block"
          removeItemBtnClasses="product-atc__remove"
          productInfo={{ ...productInfo, productId, skuId: productInfo.p_SKU }}
          addItemToCart={this.props.addItemToCart}
          DeliveryAreaData={this.props.DeliveryAreaData}
          DeliveryLocation={this.props.DeliveryLocation}
          postDeliveryArea={this.props.postDeliveryArea}
          nonDelieverable={this.props.nonDelieverable}
          removeItemFromCart={this.props.removeItemFromCart}
          performInventoryCheck={this.props.performInventoryCheck}
          cartDetails={cartDetails}
          trackAddToCart={this.props.trackAddToCart}
          trackRemoveFromCart={this.props.trackRemoveFromCart}
        />
        <ShoppingListDropdown
          user={user}
          currentUser={currentUser}
          loader={this.props.loader}
          productInfo={{ ...productInfo, productId, skuId: productInfo.p_SKU }}
          addItemToShoppingList={this.addItemToShoppingList}
          createNewShoppingList={this.createNewShoppingList}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // DeliveryAreaData: state.deliveryDetails.deliveryArea,
    DeliveryAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', []),
    DeliveryLocation: state.deliveryDetails.deliveryLocation,
    currentUser: state.clp.currentUser,
    nonDelieverable: state.cartActionPanel.nonDelieverable,
    user: state.user
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addItemToCart,
    removeItemFromCart,
    getUserAddresses,
    createNewShoppingList,
    addItemToShoppingList,
    loader,
    postDeliveryArea,
    performInventoryCheck
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(CartActionPanel);
