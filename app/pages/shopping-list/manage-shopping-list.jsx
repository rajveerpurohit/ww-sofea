import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import ProductPrice from '../../components/basic/product-price';
import TableHeader from '../pdp/product-common/generic-table-header';
import Image from '../../components/basic/Image';
import Dropdown from '../../components/basic/Dropdown';
import AddItemToCart from '../../components/basic/add-item-to-cart';
import DeliveryModal from '../../components/basic/add-item-to-cart/modal';

import { getUserShoppingList, getshoppingListItems, removeItemFromShoppingList } from './actions';
import { addItemToCart } from '../../components/compound/cart-action-panel/actions';
import { removeItemFromFavoriteList } from '../../components/basic/favorite-list/actions';
import { DEFAULT_ITEM_QUANTITY, ALLOWED_ITEM_QUANTITY_LIST } from '../../Constants';
import { getProductInventory } from '../pdp/actions';
import { loader } from '../../actions/common';
import { postDeliveryArea } from '../../components/basic/delevery-model/actions';


class ManageShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsToAddToCart: [],
      isQuantitySet: false,
      selectedItems: [],
      isAllSelectItemsSelected: false,
      isHidden: 'hidden',
      isFetching: true,
    };
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
    this.handleSelectAllProduct = this.handleSelectAllProduct.bind(this);
    this.renderProductsTabel = this.renderProductsTabel.bind(this);
    this.renderEmptyListDetail = this.renderEmptyListDetail.bind(this);
    this.renderAddItemToCartElm = this.renderAddItemToCartElm.bind(this);
    this.renderDeliveryModal = this.renderDeliveryModal.bind(this);

    this.trackAddRemoveAnalytics = this.trackAddRemoveAnalytics.bind(this);
  }

  componentWillMount() {
    this.props.getshoppingListItems(this.props.params.shoppingListId).then(() => {
      this.setState({ isFetching: false });
    });
  }
  componentWillReceiveProps(nextProps) {
    const { isQuantitySet, productsToAddToCart, isFetching } = this.state;
    const { inventories, currentUser, currentShopingListItems, suburbChanged } = nextProps;
    const suburbId = _.get(currentUser, 'suburb.id', '');
    const storeIds = _.get(currentUser, 'storeIds', []);
    if ((!_.isEmpty(currentShopingListItems) && _.isEmpty(inventories) && !_.isEmpty(suburbId)) || (isFetching && typeof inventories !== 'undefined')) {
      const productList = _.map(currentShopingListItems, 'catalogRefId');
      const inventoryStores = _.uniq(_.map(storeIds, store => store));
      inventoryStores.pop();
      nextProps.getProductInventory(productList, inventoryStores);
    }

    if ((!isQuantitySet && !_.isEmpty(inventories) && storeIds) || !suburbId || productsToAddToCart.length !== currentShopingListItems.length) {
      const temp = Object.assign({}, currentShopingListItems);

      _.map(temp, (product) => {
        if (suburbId && inventories && storeIds) {
          const { catalogRefId, fulfillerType } = product;
          const store = storeIds[fulfillerType];
          const skuIn = inventories[catalogRefId];
          const quantity = _.min([_.get(skuIn, store, 0), 99]);
          product.options = _.min([_.get(skuIn, store, 0), 99]);
          product.quantity = (quantity && product.quantityDesired) || 0;
          product.selected = false;
        } else {
          product.options = ALLOWED_ITEM_QUANTITY_LIST;
          product.quantity = DEFAULT_ITEM_QUANTITY;
          product.selected = false;
        }

        product.skuId = product.catalogRefId;
      });

      this.setState({ isQuantitySet: true, productsToAddToCart: temp });
    }
    if (suburbChanged) {
      this.props.getshoppingListItems(this.props.params.shoppingListId);
    }
  }
  setLoaderProp = (productsToAddToCart) => {
    if (_.reject(productsToAddToCart, item => (!item.quantity || !_.includes(this.state.selectedItems, item.productId))).length > 0) {
      return this.props.loader;
    }
    return () => undefined;
  }
  setQuantity = (e, pId) => {
    e.preventDefault();
    const { productsToAddToCart } = this.state;
    const newState = Object.assign({}, productsToAddToCart);
    const products = _.map(newState, (product) => {
      if (product.productId === pId) {
        return ({ ...product, quantity: Number(e.target.value) });
      }
      return product;
    });
    this.setState({ productsToAddToCart: products });
  }

  addItemToCart = (data) => {
    const { selectedItems } = this.state;
    const newList = _.reject(data.items, (item) => {
      return (!item.quantity || !_.includes(selectedItems, item.productId));
    });
    if (_.isEmpty(newList)) {
      this.setState({ isHidden: '' });
    } else {
      this.props.addItemToCart({ ...data, items: newList });
    }
  }
  removeItemFromShoppingList = (evt, product) => {
    evt.preventDefault();
    const { catalogRefId, productId, id } = product;
    const shoppingListId = this.props.params.shoppingListId;
    const data = {
      giftListId: String(shoppingListId),
      removalGiftItemId: String(id),
      productId: String(productId),
      catalogRefId: String(catalogRefId),
    };
    this.props.removeItemFromShoppingList(data).then(() => {
      this.props.getshoppingListItems(shoppingListId);
    });
  }

  handleSelectProduct(evt, pId) {
    evt.preventDefault();
    const { selectedItems, isHidden } = this.state;
    let items;

    if (_.includes(selectedItems, pId)) {
      items = _.pull(selectedItems, pId);
    } else {
      items = _.uniq([...selectedItems, pId]);
    }
    if (items.length) {
      this.setState({ isHidden: 'hidden' });
    } else {
      this.setState({ isHidden: '' });
    }

    this.setState({ selectedItems: items });
  }

  handleSelectAllProduct(evt) {
    evt.preventDefault();
    const { productsToAddToCart, isAllSelectItemsSelected, isHidden } = this.state;
    let items = [];

    if (!isAllSelectItemsSelected) {
      items = _.reduce(productsToAddToCart, (prev, product) => {
        if (product.quantity) prev.push(product.productId);

        return prev;
      }, []);
    }
    if (items.length) {
      this.setState({ isHidden: 'hidden' });
    } else {
      this.setState({ isHidden: '' });
    }
    this.setState({ selectedItems: items, isAllSelectItemsSelected: !isAllSelectItemsSelected });
  }
  activateModal = () => {
    this.setState({ modalActive: true });
  }
  deactivateModal = () => {
    this.setState({ modalActive: false });
  }
  continueOption = ({ suburbId }) => {
    const { currentShopingListItems, currentUser } = this.props;
    const storeIds = _.get(currentUser, 'storeIds', []);

    const data = {
      suburbId,
      addSuburbToOrder: true
    };

    this.props.postDeliveryArea(data);
    // .then(() => {
    //   if (!_.isEmpty(currentShopingListItems)) {
    //     const productList = _.map(currentShopingListItems, 'catalogRefId');
    //     const inventoryStores = _.uniq(_.map(storeIds, store => store));
    //     inventoryStores.pop();
    //     this.props.getProductInventory(productList, inventoryStores);
    //   }
    // });
  }

  trackAddRemoveAnalytics() {
    return _.map(this.state.productsToAddToCart, (prod) => {
      const pdpURL = _.get(prod, 'productURL', '');
      const category = pdpURL.split('/').slice(2, -3);
      const prices = _.compact([
        _.get(prod, 'wasPrice', null),
        _.get(prod, 'listPrice', null)
      ]);

      return {
        sku: prod.skuId,
        id: prod.productId,
        name: prod.displayName,
        price: prices.join(' '),
        quantity: prod.quantity,
        category: category.join('/')
      };
    });
  }

  renderDeliveryModal() {
    return (
      <DeliveryModal
        modalActive
        focusDialog
        deactivateModal={this.deactivateModal}
        provienceData={this.props.DeliveryAreaData}
        continueOption={this.continueOption}
      />
    );
  }
  renderAddItemToCartElm() {
    const suburbId = _.get(this.props, 'currentUser.suburb.id', '');
    const { productsToAddToCart } = this.state;
    const { DeliveryLocation, user, currentUser, DeliveryAreaData } = this.props;
    return (
      <div className="grid">
        <div className="grid grid--space-y">
          <div className="grid__fourth--medium pos--rel float-l--small float-r--meduim float-r--large text-align-right">
            <p>

              {this.state.modalActive && this.renderDeliveryModal()}
              {!_.isEmpty(suburbId) ? !_.isEmpty(productsToAddToCart) &&
                <AddItemToCart
                  qtyList
                  user={user}
                  currentUser={currentUser}
                  loader={this.setLoaderProp(productsToAddToCart)}
                  productInfo={_.toArray(this.state.productsToAddToCart)}
                  addItemToCart={this.addItemToCart}
                  DeliveryAreaData={DeliveryAreaData}
                  DeliveryLocation={DeliveryLocation}
                  postDeliveryArea={this.props.postDeliveryArea}
                  trackAddToCart={this.trackAddRemoveAnalytics}
                  trackRemoveFromCart={this.trackAddRemoveAnalytics}
                /> :
                !_.isEmpty(productsToAddToCart) && <Link onClick={this.activateModal} className="btn btn--primary btn--right">Select Delivery Location</Link>
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderProductsTabel() {
    const { productsToAddToCart, isAllSelectItemsSelected } = this.state;
    return (
      <div>
        <div className="grid shopping-list pos--rel" style={{ overflow: 'hidden' }}>
          <table cellSpacing={0} cellPadding={0} border={0} className="table">
            <thead>
              <TableHeader
                listType="shoppingListItemsPage"
                selectAllproducts={this.handleSelectAllProduct}
                allSelectItemsLabel={isAllSelectItemsSelected ? 'Unselect All' : 'Select All'}
              />
            </thead>
            <tbody className="table--border-rows">
              {_.map(productsToAddToCart, (item) => {
                const {
                  id,
                  externalSwatchImage,
                  internalSwatchImage,
                  productId,
                  catalogRefId,
                  productURL,
                  internalImageURL,
                  externalImageURL,
                  displayName,
                  quantityDesired,
                  selected,
                  quantity,
                  colourDescription,
                  size,
                  options,
                  price,
                  listPrice,
                  wasPrice
                } = item;
                const payload = {
                  url: internalImageURL,
                  externalUrl: externalImageURL,
                  className: 'product-card__img lazyloaded',
                  alt: displayName,
                  title: displayName
                };

                const checkboxLabelClass = _.includes(this.state.selectedItems, productId) ? 'is-checked' : '';
                return (
                  <tr id="prod_row_503176870" valign="top" className="text-xsmall">
                    {/* image */}
                    <td className="purchases__table-item">
                      <figure className="flush-m">
                        <div className="text-align-center text-space">
                          {/* PRODUCT IMAGE */}
                          <figure className="flush-m">
                            <Link rel={productId} id={`img_link_${productId}`} to={productURL} className="link--silent">
                              <Image payload={payload} />
                            </Link>
                          </figure>
                          {/* END PRODUCT IMAGE */} {/* END PRODUCT IMAGE */}
                        </div>
                      </figure>
                      <div className="text-space display-none--mobi-max">
                        {/* PRODUCT DETAILS */}
                        <strong>
                          <Link id={`product_name_${productId}`} to={productURL} className="link--silent productName">
                            {displayName} <br />
                          </Link>
                        </strong>
                        <span className="display-none--mobi-max">Product Code:<br />{catalogRefId}</span>
                        {/* END PRODUCT DETAILS */}
                      </div>
                    </td> {/* qty */}
                    <td>
                      <div className="text-space display-none--mobi-min">
                        {/* PRODUCT DETAILS */}
                        <strong>
                          <Link id={`product_name_${productId}`} to={productURL} className="link--silent productName">
                            {displayName} <br />
                          </Link>
                        </strong>
                        <span className="display-none--mobi-max">Product Code:<br />{catalogRefId}</span>
                        {/* END PRODUCT DETAILS */}
                      </div>
                      {/* QTY */}
                      {!!quantity &&
                        (<div className="product-qty">
                          <Dropdown
                            id={productId}
                            name={productId}
                            onChange={e => this.setQuantity(e, productId)}
                            options={_.isArray(options) ? options : _.range(1, options + 1)}
                            selectedValue={options === 0 ? 'Qty' : item.quantity || 1}
                            disabled={options === 0}
                            classNames={`quantitySelected ${productId}`}
                          />
                        </div>)
                      }
                      {/* END QTY */}
                    </td>
                    {/* colours / size */}
                    {quantity
                      ? (
                        <td className="productColours">
                          <Image
                            payload={{
                              url: internalSwatchImage,
                              externalUrl: externalSwatchImage,
                              className: 'colour-swatch circle',
                              alt: colourDescription,
                              title: colourDescription
                            }}
                          />
                          {size !== 'NO SZ' && size}
                        </td>)
                      : (
                        <td>
                          <span className="display-none--mobi-max">Currently Unavailable</span>
                          <span className="display-none--mobi-min">N/A</span>
                        </td>
                      )}
                    {/* total unit price */}
                    <td className="price display-none--mobi-max" id="productPriceID" name="productPriceID">
                      {/* PRICE */}
                      {!!quantity && (
                        <span className="price" id={`price_${productId}`}>
                          <span className="currency" itemProp="priceCurrency" content="ZAR" />
                          <ProductPrice salePrice={listPrice} listPrice={wasPrice} />
                        </span>
                      )}
                      {/* END PRICE */}
                    </td>
                    {/* <td className="display-none--mobi-max" /> */}
                    {/* select items */}
                    <td>
                      {!!quantity && (
                        <div className={`chk_box_${id} chk_box_${productId} listProductDetails productCartAdd`}>
                          <input type="checkbox" id={`chk_box_${id} chk_box_${productId}`} name="selectedSkus" className="input enhanced-checkbox is-enhanced" defaultValue={catalogRefId} />
                          <label className={`enhanced-checkbox label-checkbox ${checkboxLabelClass}`} onClick={evt => this.handleSelectProduct(evt, productId)} htmlFor={`chk_box_${id} chk_box_${productId}`}>&nbsp;</label>
                        </div>
                      )}
                    </td>
                    {/* delete items */}
                    <td className="display-none--mobi-max">
                      <Link onClick={evt => this.removeItemFromShoppingList(evt, item)} title="delete from shopping list" to="" className="icon icon--close-circ-dark removeItem">&nbsp;</Link>
                    </td>
                    {/*
                     <td style={{ paddingLeft: 5 }} className="display-none--mobi-min">
                      <Link onClick={evt => this.removeItemFromShoppingList(evt, item)} title="delete from shopping list" to="" className="icon icon--close-circ-dark removeItem">&nbsp;</Link>
                    </td>
                  */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {this.renderAddItemToCartElm()}
      </div>
    );
  }
  renderEmptyListDetail() {
    return (
      <span>
        <p className="text-intro">Your shopping list does not contain any items.  Would you like to add some items now?</p>
        <p><Link to="/" className="btn btn--primary btn--right">Add items now</Link></p>
      </span>
    );
  }

  render() {
    const { productsToAddToCart, isHidden, isFetching } = this.state;
    const currentShopingListName = _.get(this.props, 'currentShopingListName', '');

    return (
      <div className="page-layout__content">
        <form method="post" name="addListToOrderForm" action="" id="addListToOrderForm">
          <div className="grid">
            <h1 className="font-graphic text-caps">{currentShopingListName}</h1>
          </div>
          <div id="quantityErrors" className="formErrors quantityErrors">
            <span className={`form-field__msg form-field__msg--error ${isHidden}`}>
              <span className="errorFld">Please select a valid item to add to your basket!!</span>
            </span>
          </div>
          {!_.isEmpty(productsToAddToCart) ? this.renderProductsTabel() : (!isFetching) ? this.renderEmptyListDetail() : null}
        </form>
        {/* END LIST DETAILS */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentShopingListItems: state.currentShopingListItems.items,
    currentShopingListName: state.currentShopingListItems.currentShopingListName,
    suburbChanged: state.currentShopingListItems.suburbChanged,
    inventories: state.pdp.inventories,
    miniCartData: state.headerReducer.miniCartReducer,
    currentUser: state.clp.currentUser,
    user: state.user,
    DeliveryAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', []),
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserShoppingList,
    getshoppingListItems,
    removeItemFromFavoriteList,
    removeItemFromShoppingList,
    getProductInventory,
    addItemToCart,
    loader,
    postDeliveryArea
  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ManageShoppingList);
