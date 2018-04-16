import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { getAllItemsInWishList, removeItemFromFavoriteList } from '../../components/basic/favorite-list/actions';
import Image from '../../components/basic/Image';
import Dropdown from '../../components/basic/Dropdown';
import AddItemToCart from '../../components/basic/add-item-to-cart';
import DeliveryModal from '../../components/basic/add-item-to-cart/modal';
import { DEFAULT_ITEM_QUANTITY, ALLOWED_ITEM_QUANTITY_LIST } from '../../Constants';
import { getProductPriceInfo, getFavouriteProductInventory } from '../pdp/actions';
import ProductPrice from '../../components/basic/product-price';
import TableHeader from '../pdp/product-common/generic-table-header';
import ColorSelect from '../pdp/product-common/color-select';
import { addItemToCart } from '../../components/compound/cart-action-panel/actions';
import { loader } from '../../actions/common';
import { postDeliveryArea } from '../../components/basic/delevery-model/actions';


class FavouritesDetails extends Component {
  // static need = [
  //   getAllItemsInWishList
  // ]
  constructor(props) {
    super(props);
    this.state = {
      productsToAddToCart: [], // _.get(this.props, 'currentUser.wishListItems', []), // [], // _.get(props, 'currentUser.wishListItems', []),
      isQuantitySet: false,
      selectedItems: [],
      isAllSelectItemsSelected: false,
      isHidden: 'hidden',
      modalActive: false,
      isFetching: true,
      isInventoryFetching: true,
      currentSuburb: _.get(props, 'currentUser.suburb.id', '')
    };
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
    this.handleSelectAllProduct = this.handleSelectAllProduct.bind(this);
    this.changeProductSize = this.changeProductSize.bind(this);
    this.renderProductsTabel = this.renderProductsTabel.bind(this);
    this.renderAddItemToCartElm = this.renderAddItemToCartElm.bind(this);
    this.renderDeliveryModal = this.renderDeliveryModal.bind(this);
    this.renderEmptyListDetail = this.renderEmptyListDetail.bind(this);

    this.trackAddRemoveAnalytics = this.trackAddRemoveAnalytics.bind(this);
  }
  componentWillMount() {
    this.props.getAllItemsInWishList().then(() => {
      this.setState({ isFetching: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isQuantitySet, productsToAddToCart, currentSuburb } = this.state;
    const { favouriteProdctinventories, currentUser, suburbChanged } = nextProps;
    const wishListItems = _.get(currentUser, 'wishListItems', []);
    const suburbId = _.get(currentUser, 'suburb.id', '');
    const storeIds = _.get(currentUser, 'storeIds', []);
    const newStates = {};

    // if (!_.isEmpty(wishListItems) && _.isEmpty(favouriteProdctinventories) && !_.isEmpty(suburbId)) {
    // if (!_.isEmpty(wishListItems) && !_.isEmpty(currentSuburb) && currentSuburb !== suburbId) {
    if ((!_.isEmpty(wishListItems) && _.isEmpty(favouriteProdctinventories)) || (suburbChanged && !_.isEmpty(storeIds))) {
      newStates.currentSuburb = suburbId;
      this.fetchProductInventory(nextProps);
    }

    if ((!isQuantitySet && !_.isEmpty(favouriteProdctinventories) && storeIds) || !suburbId || (currentSuburb !== suburbId)) {
      const temp = Object.assign({}, wishListItems);
      _.map(temp, (product) => {
        const { catalogRefId, fulfillerType } = product;
        if (suburbId) {
          const store = storeIds[fulfillerType];
          const skuIn = favouriteProdctinventories[catalogRefId];
          const quantity = _.min([_.get(skuIn, store, 0), 99]);
          product.options = _.min([_.get(skuIn, store, 0), 99]);
          product.quantity = (quantity && product.quantityDesired) || 0;
          product.selected = false;
          product.selectedSize = false;
        } else {
          product.options = ALLOWED_ITEM_QUANTITY_LIST;
          product.quantity = DEFAULT_ITEM_QUANTITY;
          product.selected = false;
          product.selectedSize = false;
        }
        product.skuId = product.catalogRefId;
      });
      newStates.isQuantitySet = true;
      newStates.productsToAddToCart = temp;
      if (!_.isEmpty(newStates)) this.setState({ ...newStates });
      // if (!_.isEmpty(temp)) this.setState({ isQuantitySet: true, productsToAddToCart: temp });
    }
    if (suburbChanged) {
      this.props.getAllItemsInWishList();
    }
    if (_.isEmpty(productsToAddToCart) || productsToAddToCart.length !== wishListItems.length) {
      wishListItems.map((product) => {
        if (!_.isEmpty(product.colorSkus)) {
          product.colorSkus.map((clrSku) => {
            if (product.colourDescription === clrSku.colour) {
              product.activeClrSku = clrSku;
              return null;
            }
            return null;
          });
        }
      });
      newStates.productsToAddToCart = wishListItems;
      if (!_.isEmpty(newStates)) this.setState({ ...newStates });
      // this.setState({ productsToAddToCart: wishListItems });
    }

    if (!_.isEmpty(newStates)) this.setState({ ...newStates });
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
  removeItemFromWishList = (evt, product) => {
    evt.preventDefault();
    const { catalogRefId, productId, id } = product;
    const favoriteListId = _.get(this.props, 'currentUser.favorites.wishListId', '');

    const data = {
      giftlistId: String(favoriteListId),
      removalGiftItemId: String(id),
      productId: String(productId),
      catalogRefId: String(catalogRefId)
    };

    this.props.removeItemFromFavoriteList(data);
  }
  handleSelectProduct(evt, pId) {
    evt.preventDefault();
    const { selectedItems } = this.state;
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
    const { productsToAddToCart, isAllSelectItemsSelected } = this.state;
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
  changeProductSize(evt, pId) {
    evt.preventDefault();
    const { favouriteProdctinventories, currentUser } = this.props;
    const storeIds = _.get(currentUser, 'storeIds', []);

    const newCatalogRefId = evt.target.value.split('__')[0];
    const newSize = evt.target.value.split('__')[1];
    const { productsToAddToCart } = this.state;
    const newState = Object.assign({}, productsToAddToCart);
    const products = _.map(newState, (product) => {
      const { catalogRefId, fulfillerType } = product;
      if (product.productId === pId) {
        const store = storeIds[fulfillerType];
        const skuIn = favouriteProdctinventories[newCatalogRefId];
        const quantity = _.min([_.get(skuIn, store, 0), 99]);

        return ({
          ...product,
          size: newSize,
          primarySize: newSize,
          catalogRefId: newCatalogRefId,
          skuId: newCatalogRefId,
          options: _.min([_.get(skuIn, store, 0), 99]),
          quantity: (quantity && product.quantityDesired) || 0,
          selectedSize: true
        });
      }
      return product;
    });
    this.setState({ productsToAddToCart: products });
  }
  getSelectedColorSKU = (clrSKU) => {
    const { productsToAddToCart } = this.state;
    const { externalLargeImage, internalLargeImage, id, colour } = clrSKU;
    const products = _.map(productsToAddToCart, (product) => {
      if (_.includes(product.activeSkuIds, id)) {
        return ({
          ...product,
          internalImageURL: internalLargeImage,
          externalImageURL: externalLargeImage,
          colourDescription: colour,
          catalogRefId: id,
          skuId: id,
          activeClrSku: clrSKU
        });
      }
      return product;
    });
    this.setState({ productsToAddToCart: products });
  };
  fetchProductInventory = (props) => {
    const { currentUser, favouriteProdctinventories } = props;
    const storeIds = _.get(currentUser, 'storeIds', []);
    const inventoryStores = _.uniq(_.map(storeIds, store => store));
    inventoryStores.pop();
    const wishListItems = _.get(currentUser, 'wishListItems', []);

    const activeSkuIds = wishListItems.reduce((previous, current) => {
      return ((current && current.activeSkuIds) || []).concat(previous);
    }, []);
    if (currentUser && !_.isEmpty(activeSkuIds)) {
      this.props.getFavouriteProductInventory(activeSkuIds, inventoryStores);
      // this.setState({ isInventoryFetching: false });
      // .then(() => {
      //   this.setState({ isInventoryFetching: false });
      // });
    }
  }

  activateModal = () => {
    this.setState({ modalActive: true });
  }
  deactivateModal = () => {
    this.setState({ modalActive: false });
  }
  continueOption = ({ suburbId }) => {
    const data = {
      suburbId,
      addSuburbToOrder: true
    };
    this.props.postDeliveryArea(data);
  }
  generateSizeOptions = (sizeSkus, activeClrSku, fulfillerType) => {
    const { currentUser } = this.props;
    const favouriteProdctinventories = _.get(this.props, 'favouriteProdctinventories', {});

    const storeIds = _.get(currentUser, 'storeIds', []);
    const store = storeIds[fulfillerType];

    if (!_.isEmpty(favouriteProdctinventories) && !_.isEmpty(sizeSkus) && !_.isEmpty(activeClrSku)) {
      return [
        { label: 'Size', value: 'Size' },
        ...sizeSkus[activeClrSku.styleId].map(sku => {
          const skuIn = favouriteProdctinventories[sku.id];
          const quantity = _.min([_.get(skuIn, store, 0), 99]);
          if (quantity > 0) {
            return { label: ` ${sku.size} `, value: `${sku.id}__${sku.size}` };
          }
          return { label: ` ${sku.size} `, value: `${sku.id}__${sku.size}`, disabled: true };
        }
        )
      ];
    }
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
  renderProductsTabel() {
    const { productsToAddToCart, isHidden, isAllSelectItemsSelected } = this.state;
    return (
      <table width="100%" cellPadding={0} cellSpacing={0} className="table fav-items">
        <thead>
          <TableHeader
            listType="favItems"
            selectAllproducts={this.handleSelectAllProduct}
            allSelectItemsLabel={isAllSelectItemsSelected ? 'Unselect All' : 'Select All'}
          />
        </thead>
        <tbody className="table--border-rows">
          {/* FAVOURITE ITEMS */}
          {!_.isEmpty(productsToAddToCart) && _.map(productsToAddToCart, (product) => {
            const { id,
              productId,
              options,
              quantity, activeClrSku,
              catalogRefId,
              colorSkus,
              productURL,
              sizeSkus,
              quantityRemaining,
              internalImageURL,
              externalImageURL,
              displayName,
              selected,
              listPrice,
              wasPrice,
              fulfillerType,
              price } = product;
            const payload = {
              url: internalImageURL,
              externalUrl: externalImageURL,
              className: 'img-responsive lazyloaded',
              alt: displayName,
              title: displayName,
              width: 80
            };
            const checkboxLabelClass = _.includes(this.state.selectedItems, productId) ? 'is-checked' : '';
            return (
              <tr id={`wishListItem_${id}`} key={id}>
                <td className="purchases__table-item">
                  <figure className="flush-m">
                    <div className="text-align-center text-space">
                      <span>
                        <Link rel={productId} id={`img_link_${productId}`} to={productURL} className="link--silent">
                          <Image payload={payload} />
                        </Link>
                      </span>
                    </div>
                  </figure>
                  <div className="text-space display-none--mobi-max">
                    <strong>
                      <Link id={`product_name_${productId}`} to={productURL} className="link--silent productName">
                        {displayName} <br />
                      </Link>
                    </strong>
                    <span className="display-none--mobi-max">Product Code:<br />{catalogRefId}</span>
                  </div>
                </td>
                <td>
                  <div className="display-none--mobi-min">
                    <strong>
                      <Link id={`product_name_${productId}`} to={productURL} className="link--silent productName">
                        {displayName} <br />
                      </Link>
                    </strong>
                    <span className="display-none--mobi-max">Product Code:<br />{catalogRefId}</span>
                  </div>
                  {colorSkus !== '' ?
                    <ColorSelect
                      colorSkus={colorSkus}
                      rootClassName={'product-atl'}
                      getSelectedItem={this.getSelectedColorSKU}
                      activeClrSku={activeClrSku}
                    />
                    : null}
                  {/* <!-- END COLOUR SELECT --> */}
                  {/* <!-- SIZE SELECT -->  */}
                  {product.size !== 'NO SZ' && activeClrSku ?
                    <div className="display-inline-block" style={{ width: 80 }}>
                      <Dropdown
                        id={`${id} fldProductSize`}
                        name="size"
                        onChange={e => this.changeProductSize(e, productId)}
                        options={this.generateSizeOptions(sizeSkus, activeClrSku, fulfillerType) || []}
                        selectedValue={product.selectedSize ? product.size : 'Size'}
                        disabled={quantityRemaining === 0}
                        classNames={`selectItemId_${id}`}
                      />
                    </div>
                    : null}
                  {/* <!-- END SIZE --> */}
                  <div className="display-none--mobi-min">
                    <div className="product-qty">
                      <Dropdown
                        id={productId}
                        name={productId}
                        onChange={e => this.setQuantity(e, productId)}
                        options={_.isArray(options) ? options : _.range(1, options + 1)}
                        selectedValue={options === 0 || product.selectedSize ? 'Qty' : quantity || 1}
                        disabled={options === 0 || product.selectedSize}
                        classNames={`quantitySelected ${productId}`}
                      />
                    </div>
                  </div>
                </td>
                <td className="display-none--mobi-max">
                  <div className="product-qty">
                    <Dropdown
                      id={productId}
                      name={productId}
                      onChange={e => this.setQuantity(e, productId)}
                      options={_.isArray(options) ? options : _.range(1, options + 1)}
                      selectedValue={options === 0 || (!product.selectedSize && product.size !== 'NO SZ') ? 'Qty' : quantity || 1}
                      disabled={options === 0 || (!product.selectedSize && product.size !== 'NO SZ')}
                      classNames={`quantitySelected ${productId}`}
                    />
                  </div>
                </td>
                {/* <!-- price --> */}
                <td id="productPriceID" name="productPriceID" className="display-none--mobi-max">
                  <span className="price" id={`price_${productId}`}>
                    <span className="currency" itemProp="priceCurrency" content="ZAR" />
                    {product.size !== 'NO SZ' && colorSkus !== '' ? 'From:' : null}
                    <ProductPrice salePrice={listPrice} listPrice={wasPrice} />
                  </span>
                  {/* <!-- END PRICE --> */}
                </td>
                <td>
                  <div className={`chk_box_${id} chk_box_${productId} listProductDetails productCartAdd`}>
                    <input type="checkbox" id={`chk_box_${id} chk_box_${productId}`} name="selectedSkus" className="input enhanced-checkbox is-enhanced" defaultValue={product.catalogRefId} />
                    <label className={`enhanced-checkbox label-checkbox ${checkboxLabelClass}`} onClick={evt => this.handleSelectProduct(evt, productId)} htmlFor={`chk_box_${id} chk_box_${productId}`}>&nbsp;</label>
                  </div>
                </td>
                {/* delete */}
                <td>
                  <Link to="" onClick={evt => this.removeItemFromWishList(evt, product)} title="delete from favorite list" className="icon icon--close-circ-dark removeItem">&nbsp;</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  renderAddItemToCartElm() {
    const suburbId = _.get(this.props, 'currentUser.suburb.id', '');
    const { productsToAddToCart } = this.state;
    const { DeliveryLocation, user, currentUser, DeliveryAreaData } = this.props;
    return (
      <div className="grid">
        <div className="listManageBlock grid__third--meduim float-l--small grid--space-y float-r--meduim float-r--large">
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
              /> :
              !_.isEmpty(productsToAddToCart) && <Link onClick={this.activateModal} className="btn btn--primary btn--right">Select Delivery Location </Link>
            }
          </p>
        </div>
      </div>
    );
  }
  renderEmptyListDetail() {
    return (
      <span>
        <p className="text-intro">Your favourites list does not contain any items.  Would you like to add some items now?</p>
        <p><Link to="/" className="btn btn--primary btn--right">Add items now</Link></p>
      </span>
    );
  }
  render() {
    const { productsToAddToCart, isHidden, isFetching } = this.state;
    return (
      <div>
        <main className="grid grid--space-y site-main">
          <div className="main-page">
            <div className="grid grid--space-y page-layout">
              <div className="page-layout__content">
                {/* FAVOURITES */}
                <h1 className="font-graphic text-caps">My Favourites</h1>
                <div id="quantityErrors" className="formErrors quantityErrors">
                  <span className={`form-field__msg form-field__msg--error ${isHidden}`}>
                    <span className="errorFld">Please select a valid item to add to your basket!!</span>
                  </span>
                </div>
                <section className="contentBlock tableWrapper">
                  {!_.isEmpty(productsToAddToCart) ? this.renderProductsTabel() : (!isFetching) ? this.renderEmptyListDetail() : null}
                </section>
                {this.renderAddItemToCartElm()}
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
    suburbChanged: state.clp.suburbChanged,
    user: state.user,
    favouriteProdctinventories: state.pdp.favouriteProdctinventories,
    DeliveryAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', [])
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllItemsInWishList,
    removeItemFromFavoriteList,
    getFavouriteProductInventory,
    addItemToCart,
    loader,
    postDeliveryArea
  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(FavouritesDetails);
