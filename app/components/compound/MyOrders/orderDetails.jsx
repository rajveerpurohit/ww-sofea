import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getOrderHistory, getOrderDetails, cancelOrder, addItemsToOrder, redirectToLogin, resetOrderDetails } from './actions';
import { createNewShoppingList, addOrderedItemsToShoppingList } from '../cart-action-panel/actions';
import { loader } from '../../../actions/common';
import Image from '../../basic/Image';
import ShoppingListDropdown from '../../basic/shopping-list-dropdown';

const COMMERCE_ITEM_TYPES = {
  premiumFlowerCommerceItem: 'YOUR FLOWER ITEMS',
  homeCommerceItem: 'YOUR HOME ITEMS',
  foodCommerceItem: 'YOUR FOODS ITEMS',
  premiumBrandCommerceItem: 'YOUR PREMIUM ITEMS',
  clothingCommerceItem: 'YOUR CLOTHING ITEMS',
  giftCard: 'YOUR GIFT CARDS ITEMS',
  default: 'YOUR GENERAL ITEMS'
};

const currencyFormat = (cur) => {
  const _cur = typeof cur === 'number' ? cur : Number(cur);

  return _cur.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.orderTable = this.orderTable.bind(this);
    this.addOrderedItemsToShoppingList = this.addOrderedItemsToShoppingList.bind(this);
    this.createNewShoppingList = this.createNewShoppingList.bind(this);

    this.state = {
      orderDetails: null
    };
  }

  componentDidMount() {
    const params = this.props.location.query || {};
    if (params.orderid) {
      this.props.getOrderDetails(params.orderid)
        .catch((e) => {
          this.props.redirectToLogin('/');
        });
    }
  }

  componentWillUnmount() {
    this.props.resetOrderDetails();
  }

  createNewShoppingList(listName) {
    this.props.loader(true);


    const orderDetails = {
      shoppingListName: listName,
      orderId: this.props.location.query.orderid
    };
    this.props.addOrderedItemsToShoppingList(orderDetails);

    this.props.createNewShoppingList(listName);
  }

  addOrderedItemsToShoppingList(orderId, shoppingListId) {
    const orderDetails = {
      //shoppingListName,
      shoppingListId,
      orderId
    };
    this.props.addOrderedItemsToShoppingList(orderDetails);
  }

  orderTable(tableData) {
    const orderRows = tableData.map((item) => {
      return (
        <tr>
          <td className="purchases__table-item">
            <figure className="flush-m">
              <a rel="20026875" id="img_link_20026875">
                <Image
                  payload={{
                    className: 'product-card__img',
                    width: 80,
                    alt: item.productDisplayName,
                    title: item.productDisplayName,
                    externalUrl: item.externalImageURL,
                    url: item.internalImageURL
                  }}
                />
              </a>
            </figure>
            <div>
              <a>
                <strong id="product_name_20026875">{item.productDisplayName}</strong><br /></a>
              <span>Product Code:<br />{item.productId}<br />
              </span>
            </div>
            <div id="promotion_20026875" className="font-graphic text-save margT" />
            <div className="mobiQuantityPrice show-on-mobi">
              <div className="productColourSize" />
              <div>
                <section className="productPromotions">
                  <p className="promoNotify wRewards noMargT"><strong>W</strong>Rewards </p>
                </section>
              </div>
            </div>
          </td>
          <td>{item.quantity}</td>
          <td><Image
            payload={{
              className: 'colour-swatch circle',
              width: 16,
              alt: item.color,
              title: item.color,
              externalUrl: item.externalSwatchImageURL,
              url: item.internalSwatchImage
            }}
          /></td>
          <td>
            <span className="font-graphic">R {item.priceInfo.listPrice}</span>
          </td>
          <td>
            R {item.priceInfo.rawTotalPrice}
          </td>
        </tr>
      );
    });
    return orderRows;
  }


  renderCommerceItemSection(itemKey, items, total) {
    if (items && Array.isArray(items) && items.length) {
      return (
        <table className="purchases__table table table--border-rows grid--space-y" cellSpacing="0" cellPadding="0">
          <thead className="no-wrap text-caps">
            <tr>
              <th>{COMMERCE_ITEM_TYPES[itemKey]}</th>
              <th>Qty</th>
              <th>Colour/ Size</th>
              <th>unit&nbsp;Price&nbsp;</th>
              <th>total&nbsp;Price</th>
            </tr>
          </thead>
          <tbody>
            {this.orderTable(items)}
          </tbody>
          <tfoot className="purchases__table-foot">
            <tr>
              <td colSpan="5">
                <span>TOTAL: R {currencyFormat(total)}</span>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <button type="submit" className="btn text-dampen-slight arrow-link--forward link--silent purchases__table-button" onClick={() => { this.props.addItemsToOrder(this.props.location.query.orderid, itemKey); }}>Add to basket</button>
              </td>
            </tr>
          </tfoot>
        </table>
      );
    }

    return null;
  }

  render() {
    if (this.props.user && !this.props.user.isLoggedIn) {
      this.props.redirectToLogin();
    }

    if (!this.props.location.query || !this.props.location.query.orderid) this.props.redirectToLogin('/');
    const orderId = this.props.location.query.orderid;
    const orderDetails = this.props.user.orderDetails;
    if (!orderDetails) {
      return (<h2>No Details Available</h2>);
    }
    return (<div className="page-layout__content">
      <section>
        <h1 className="font-graphic text-caps">Purchase History</h1>
        <table className="table purchases__header-table">
          <tbody>
            <tr>
              <td className="grid__fourth">
                <strong>Purchase ID:</strong>
              </td>
              <td className="grid__three-fourths">{orderId}</td>
            </tr>
            <tr>
              <td className="grid__fourth">
                <strong>Purchase date:</strong>
              </td>
              <td className="grid__three-fourths" />
            </tr>
            <tr>
              <td className="grid__fourth">
                <strong>Delivery:</strong>
              </td>
              <td className="grid__three-fourths" />
            </tr>
          </tbody>
        </table>
        <section>
          {_.map(orderDetails.items, (details, itemKey) => this.renderCommerceItemSection(itemKey, details, orderDetails.groupSubTotal[itemKey]))}


          <span id="shoppingList_clothingCommerceItem" className="float-r btn text-dampen-slight arrow-link--forward purchases__table-button">
            <div id="shoppingList">
              <ShoppingListDropdown
                user={this.props.user}
                currentUser={this.props.currentUser}
                loader={this.props.loader}
                productInfo={{}}
                addOrderedItemsToShoppingList={{
                  addOrderedItemsToShoppingList: this.addOrderedItemsToShoppingList,
                  orderId
                }}
                createNewShoppingList={this.createNewShoppingList}
              />
            </div>
          </span>

          {/*
            <a className="float-r btn text-dampen-slight arrow-link--forward purchases__table-button" data-modal-overlay="true">Create list</a>
             <div id="create-list-purchase-history" className="modal-target">
            <p>Enter a list name click on 'create list'.</p>
            <input type="text" name="fldListName" id="fldListName" className="input input--text" placeholder="List name" />
            <input id="btnSaveList" type="button" value="Create List" className="btn btn--primary btn--right grid--space-y" data-js="modal-close" />
            </div>*/
          }
        </section>
      </section>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    currentUser: state.clp.currentUser,
    common: state.common,
    location: state.routing.locationBeforeTransitions
  };
}

export default connect(mapStateToProps, {
  getOrderHistory,
  getOrderDetails,
  cancelOrder,
  addItemsToOrder,
  redirectToLogin,
  resetOrderDetails,
  loader,
  createNewShoppingList,
  addOrderedItemsToShoppingList
})(OrderDetails);
