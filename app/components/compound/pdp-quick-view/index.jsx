import React, { Component } from 'react';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import ImageMagnify from '../../basic/image-magnify';
import FavoriteList from '../../basic/favorite-list';
import AddItemToCart from '../../basic/add-item-to-cart';
import ShoppingListDropdown from '../../basic/shopping-list-dropdown';
import ProductPrice from '../../basic/product-price';
import ProductSize from '../../basic/product-size';
import ProductColour from '../../basic/product-colour';
import ProductAuxiliaryMedia from '../../basic/product-auxiliary-media';
import ProductImageFullView from '../../basic/product-image-full-view';

import { loader } from '../../../actions/common';
import { addItemToCart, removeItemFromCart, getUserAddresses, createNewShoppingList, addItemToShoppingList } from '../cart-action-panel/actions';
import {
  getProductInfo,
  getProductPriceInfo,
  getProductInventoryDetails,
  performInventoryCheck,
  resetComponentState,
  disableNewSuburbFlag
} from '../../../pages/pdp/actions';
import { getCurrentUser } from '../../../pages/clp/actions';
import { postDeliveryArea } from '../../basic/delevery-model/actions';

import {
  DEFAULT_ITEM_QUANTITY,
  DEFAULT_INVENTORY_QUANTITY,
  DEFAULT_ITEM_QUANTITY_LABEL,
  DEFAULT_MAX_INVENTORY_QUANTITY
} from '../../../Constants';

class PdpQuickView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      errorMessage: '',
      enableQuantity: false,
      selectedQuantity: DEFAULT_ITEM_QUANTITY_LABEL,
      selectedProductSKU: {},
      isProductSizeSelected: false,
      displayProductImageViewModal: false,

      colour: '',
      externalLargeImage: '',
      externalImageUrlReference: '',
      internalLargeImage: '',

      hasProductInventory: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);

    this.onChangeProductColour = this.onChangeProductColour.bind(this);
    this.onChangeProductSize = this.onChangeProductSize.bind(this);
    this.onAuxiliaryMediaSelect = this.onAuxiliaryMediaSelect.bind(this);
    this.onAddItemToCartClick = this.onAddItemToCartClick.bind(this);

    this.addItemToShoppingList = this.addItemToShoppingList.bind(this);
    this.createNewShoppingList = this.createNewShoppingList.bind(this);
    this.fetchProductInventory = this.fetchProductInventory.bind(this);
    this.postDeliveryArea = this.postDeliveryArea.bind(this);

    this.renderProductImageElm = this.renderProductImageElm.bind(this);
    this.renderProductFullImageActionElm = this.renderProductFullImageActionElm.bind(this);
    this.renderAddToCartActionElm = this.renderAddToCartActionElm.bind(this);
    this.renderAddShoppingListElm = this.renderAddShoppingListElm.bind(this);
    this.renderProductPriceElm = this.renderProductPriceElm.bind(this);
    this.renderProductErrors = this.renderProductErrors.bind(this);
    this.renderProductPromotionsElm = this.renderProductPromotionsElm.bind(this);
    this.renderProductSpecificationElm = this.renderProductSpecificationElm.bind(this);
    this.renderProductColorElm = this.renderProductColorElm.bind(this);
    this.renderProductSizeElm = this.renderProductSizeElm.bind(this);
    this.renderProductImageCarouselElm = this.renderProductImageCarouselElm.bind(this);

    this.getProductSaleNListPrice = this.getProductSaleNListPrice.bind(this);

    // GTM
    this.trackAddRemoveAnalytics = this.trackAddRemoveAnalytics.bind(this);
  }

  componentDidMount() {
    const { detailPageURL, currentUser } = this.props;
    const params = { splat: detailPageURL };

    if (_.isEmpty(currentUser)) this.props.getCurrentUser();
    this.props.getProductInfo(params);
    this.props.getProductPriceInfo(params);
  }

  componentWillReceiveProps(nextProps) {
    const { productInfo } = nextProps;
    const { defaultStyleId, colourSKUs, enableQuantity, productVariant } = productInfo;
    const { colour } = this.state;
    let sku = {};

    if (colourSKUs && !colour) {
      sku = _.find(colourSKUs, ({ styleId }) => styleId === defaultStyleId) || {};

      const newStates = {
        enableQuantity,
        selectedProductSKU: sku,
        colour: sku.colour,
        externalLargeImage: sku.externalLargeImage,
        externalImageUrlReference: sku.externalImageUrlReference,
        internalLargeImage: sku.internalLargeImage,
        displayProductImageViewModal: false,
        error: false,
        errorMessage: ''
      };

      if (productVariant === 'noVariant') {
        newStates.enableQuantity = true;
        newStates.selectedQuantity = DEFAULT_ITEM_QUANTITY;
      }

      this.setState(newStates);
    } else {
      this.setState({ error: false });
    }

    if (!this.state.hasProductInventory || nextProps.newSuburb) {
      this.fetchProductInventory(nextProps);

      if (nextProps.newSuburb) this.props.disableNewSuburbFlag();
    }
  }

  componentWillUnmount() {
    this.props.resetComponentState();
  }

  onChangeProductColour(evt, productId, sku) {
    if (evt) evt.preventDefault();

    const { currentUser, productInfo, productInventory } = this.props;
    const { fulfillerType, productVariant } = productInfo;
    let quantity = false;

    if (currentUser && fulfillerType && !_.isEmpty(productInventory)) {
      const { storeIds } = currentUser;
      const storeId = _.get(storeIds, fulfillerType, null);

      if (storeId) {
        quantity = _.get(productInventory, `${sku.id}.${storeId}`, false);
      }
    }

    const newStates = {
      selectedProductSKU: sku,
      colour: sku.colour,
      externalLargeImage: sku.externalLargeImage,
      externalImageUrlReference: sku.externalImageUrlReference,
      internalLargeImage: sku.internalLargeImage,
      error: false,
      errorMessage: ''
    };

    if (quantity || (productVariant === 'noVariant')) {
      newStates.enableQuantity = true;
      newStates.selectedQuantity = DEFAULT_ITEM_QUANTITY;
    } else {
      newStates.enableQuantity = false;
      newStates.selectedQuantity = DEFAULT_ITEM_QUANTITY_LABEL;
    }

    this.setState(newStates);
  }

  onChangeProductSize(evt, sku) {
    if (evt) evt.preventDefault();
    const { currentUser, productInfo, productInventory } = this.props;
    const { fulfillerType, productVariant } = productInfo;
    let quantity = false;

    if (currentUser && fulfillerType && productInventory) {
      const { storeIds } = currentUser;
      const storeId = _.get(storeIds, fulfillerType, null);

      if (storeId) {
        quantity = _.get(productInventory, `${sku.id}.${storeId}`, false);
      }
    }

    const newStates = {
      error: false,
      selectedProductSKU: Object.assign({}, this.state.selectedProductSKU, sku),
      isProductSizeSelected: true
    };

    if (quantity || (productVariant === 'noVariant')) {
      newStates.enableQuantity = true;
      newStates.selectedQuantity = DEFAULT_ITEM_QUANTITY;
    } else {
      newStates.enableQuantity = false;
      newStates.selectedQuantity = DEFAULT_ITEM_QUANTITY_LABEL;
    }

    this.setState(newStates);
  }

  onAuxiliaryMediaSelect(evt, urls) {
    if (evt) evt.preventDefault();
    const { externalLargeImage, internalLargeImage } = urls;
    this.setState({ externalLargeImage, internalLargeImage });
  }

  onAddItemToCartClick(data) {
    const { enableQuantity } = this.state;
    if (!enableQuantity) {
      this.setState({
        error: true,
        errorMessage: 'We cannot fulfil any product to this suburb'
      });

      return;
    }

    this.props.loader(true);
    this.props.addItemToCart(data);
  }

  fetchProductInventory(props) {
    const { currentUser, productInfo } = props;
    const { fulfillerType, activeSkuIds } = productInfo;

    if (currentUser && fulfillerType && !_.isEmpty(activeSkuIds)) {
      const { storeIds } = currentUser;
      const storeId = _.get(storeIds, fulfillerType, null);

      if (storeId) {
        this.props.getProductInventoryDetails(storeId, activeSkuIds);
        this.setState({ hasProductInventory: true });
      }
    }
  }

  postDeliveryArea(data) {
    this.props.loader(true);
    this.props.postDeliveryArea(data);
  }

  createNewShoppingList(listName) {
    this.props.loader(true);
    this.props.createNewShoppingList(listName);
  }

  addItemToShoppingList(giftListId) {
    const skuID = this.state.selectedProductSKU.id;
    const item = {
      giftListId: String(giftListId),
      skuID: String(skuID)
    };
    this.props.addItemToShoppingList(item);
  }

  activateModal(evt) {
    if (evt) evt.preventDefault();
    this.setState({ modalActive: true });
  }

  deactivateModal(evt) {
    this.props.loader(false);
    this.props.onQuickViewClose(evt);
  }

  getProductSaleNListPrice(product) {
    const { productId } = product;
    const { priceListId } = this.props.currentUser || {};
    const priceList = _.get(this.props, `productPrices[${productId}]`, {});

    if (priceList && priceListId && priceList[priceListId]) {
      const { id } = this.state.selectedProductSKU;
      const { skuPrices } = priceList[priceListId];

      if (id && skuPrices && skuPrices[id]) {
        const salePrice = _.get(skuPrices, `${id}.SalePrice`, 0);
        const listPrice = _.get(skuPrices, `${id}.ListPrice`, 0);

        return { salePrice, listPrice };
      }

      return null;
    }

    return null;
  }

  trackAddRemoveAnalytics() {
    const { productInfo } = this.props;
    const { selectedQuantity, selectedProductSKU } = this.state;
    const { colour, displayName, id } = selectedProductSKU;
    const { brandName, productId } = productInfo;
    const { listPrice, salePrice } = this.getProductSaleNListPrice(productInfo);
    const priceList = _.compact([listPrice, salePrice]);
    const pUrl = _.get(this.props, 'detailPageURL', '');
    const category = pUrl.split('/').slice(2, -3);

    return [{
      sku: id,
      id: productId,
      variant: colour,
      brand: brandName,
      name: displayName,
      price: priceList.join(' '),
      quantity: selectedQuantity,
      category: category.join('/')
    }];
  }

  renderProductImageElm() {
    const { displayName } = this.props.productInfo;
    const { externalLargeImage, externalImageUrlReference, internalLargeImage } = this.state;

    const settings = {
      alt: displayName,
      url: internalLargeImage,
      externalUrl: externalLargeImage && `${externalImageUrlReference}o=${externalLargeImage}`,
      width: 700,
      height: 894
    };

    return (
      <ImageMagnify {...settings} />
    );
  }

  renderProductFullImageActionElm() {
    const { externalLargeImage, internalLargeImage } = this.state;

    if (typeof window !== 'undefined' && (externalLargeImage || internalLargeImage)) {
      return (
        <p className="text-dampen strong" style={{ textAlign: 'center' }}>
          <span className="touch-hidden" style={{ display: 'inline-block' }} >Hover to zoom</span>
          <br className="touch-hidden" />
          <Link onClick={() => this.setState({ displayProductImageViewModal: true })} style={{ display: 'block' }} >
            Click here to see the full image
          </Link>
        </p>
      );
    }

    return null;
  }

  renderProductImageCarouselElm() {
    const { auxiliaryMedia } = this.props.productInfo;
    const { selectedProductSKU } = this.state;

    if (!_.isEmpty(auxiliaryMedia)) {
      return (
        <ProductAuxiliaryMedia
          auxiliaryMedia={auxiliaryMedia}
          onClick={this.onAuxiliaryMediaSelect}
          selectedProductSKU={selectedProductSKU}
          width={145}
          height={185}
        />
      );
    }

    return null;
  }

  renderProductErrors(product) {
    if (this.state.error && this.state.errorMessage) {
      return (
        <span>
          <div
            id={`${product && product.productId}_cartErrors`}
            className="formErrors details grid grid--space-y text-error quantityErrors"
          >
            {this.state.errorMessage}
          </div>
        </span>
      );
    }

    return null;
  }

  renderAddToCartActionElm(product) {
    const { currentUser, user, productInventory } = this.props;
    const { productId, fulfillerType, productVariant } = product;
    const { enableQuantity, selectedQuantity, selectedProductSKU, isProductSizeSelected } = this.state;
    const miniCartData = _.get(this.props, 'miniCartData.miniCartData', {});
    const skuId = selectedProductSKU.id;
    const suburbId = _.get(this.props, 'currentUser.suburb.id', null);
    let quantity = DEFAULT_INVENTORY_QUANTITY;
    let enableQuantityNoSuburb = false;

    if (suburbId) {
      if (currentUser && fulfillerType && productInventory) {
        const { storeIds } = currentUser;
        const storeId = _.get(storeIds, fulfillerType, null);

        if (storeId) {
          quantity = _.get(productInventory, `${skuId}.${storeId}`, false);
        }
      }

      if (!this.state.error && (!quantity || !productInventory)) {
        this.setState({
          error: true,
          enableQuantity: false,
          isProductSizeSelected: false,
          errorMessage: 'We cannot fulfil any product to this suburb'
        });
      }
    }

    if (productVariant === 'noVariant') {
      enableQuantityNoSuburb = true;
    }

    return (
      <div className="grid grid--space-y pdp__atc">
        <AddItemToCart
          user={user}
          currentUser={currentUser}
          loader={this.props.loader}
          productInfo={{ ...product, productId, skuId }}
          addItemToCart={this.onAddItemToCartClick}
          DeliveryAreaData={this.props.DeliveryAreaData}
          DeliveryLocation={this.props.DeliveryLocation}
          postDeliveryArea={this.postDeliveryArea}
          removeItemFromCart={this.props.removeItemFromCart}
          enableQuantity={quantity && (enableQuantity || isProductSizeSelected || enableQuantityNoSuburb)}
          selectedValue={selectedQuantity}
          onOptionClick={e => (this.setState({ selectedQuantity: Number(e.target.value) }))}
          selectOptions={_.range(1, _.min([quantity, DEFAULT_MAX_INVENTORY_QUANTITY]) + 1)}
          nonDelieverable={this.props.nonDelieverable}
          performInventoryCheck={this.props.performInventoryCheck}
          cartDetails={miniCartData}
          trackAddToCart={this.trackAddRemoveAnalytics}
          trackRemoveFromCart={this.trackAddRemoveAnalytics}
        />
      </div>
    );
  }

  renderAddShoppingListElm(product) {
    const { currentUser, user } = this.props;
    const { productId } = product;
    const skuId = this.state.selectedProductSKU.id;
    const productData = {
      p_productid: productId,
      p_SKU: skuId
    };

    return (
      <div className="grid grid--space-y">
        <ShoppingListDropdown
          user={user}
          currentUser={currentUser}
          loader={this.props.loader}
          rootClasses="grid__third--small"
          productInfo={{ ...product, skuId }}
          addItemToShoppingList={this.addItemToShoppingList}
          createNewShoppingList={this.createNewShoppingList}
        />
        <FavoriteList productData={productData} user={user} currentUser={currentUser} addAsChildren />
        {this.state.error && this.renderProductErrors(product)}
      </div>
    );
  }

  renderProductPriceElm(product) {
    const { productId } = product;
    const { priceListId } = this.props.currentUser;
    const priceList = this.props.productPrices[productId];

    if (priceList && priceListId && priceList[priceListId]) {
      const { id } = this.state.selectedProductSKU;
      const { skuPrices } = priceList[priceListId];

      if (id && skuPrices && skuPrices[id]) {
        const salePrice = _.get(skuPrices, `${id}.SalePrice`, 0);
        const listPrice = _.get(skuPrices, `${id}.ListPrice`, 0);

        return (<ProductPrice classes="price" ids={`price_${productId}_${id}`} salePrice={salePrice} listPrice={listPrice} />);
      }

      return null;
    }

    return null;
  }

  renderProductPromotionsElm(product) {
    const { productAttributes, productId } = product;
    const promotions = _.filter(productAttributes, ({ attributeDisplayName }) => (attributeDisplayName === 'PROMOTION'));

    if (promotions.length) {
      return (
        <div className="message font-graphic text-caps text-medium display-inline-block grid--space-y border--weight-thin theme--promo-primary">
          {promotions.map(promotion => <span id={`price_${productId}`} className="buySavePrice">{promotion.attributeValue}</span>)}
        </div>
      );
    }

    return null;
  }

  renderProductSpecificationElm(product) {
    return (
      <div className="grid grid--space-y">
        {this.renderProductColorElm(product)}
        {this.renderProductSizeElm(product)}
      </div>
    );
  }

  renderProductColorElm(product) {
    return (<ProductColour selectedProductSKU={this.state.selectedProductSKU} product={product} onChangeProductColour={this.onChangeProductColour} />);
  }

  renderProductSizeElm(product) {
    const { productInventory, currentUser } = this.props;

    return (
      <ProductSize
        product={product}
        currentUser={currentUser}
        productInventory={productInventory}
        onChangeProductSize={this.onChangeProductSize}
        styleId={this.state.selectedProductSKU.styleId}
      />
    );
  }

  renderModalContent(noBodyContent) {
    const { productInfo, detailPageURL } = this.props;
    const { displayName, productId } = productInfo;

    if (noBodyContent) {
      return (
        <div className="modal__content">
          <div className="product site-map-content" />
          <input id="focus-trap__hidden" className="hidden" autoFocus />
        </div>
      );
    }

    return (
      <div className="modal__content">
        <div className="product site-map-content">
          <div className="grid">
            <div className="grid__half--medium product-detail__grid">
              {this.renderProductImageElm()}
              {this.renderProductFullImageActionElm()}
              {this.renderProductImageCarouselElm()}
            </div>
            <div className="grid__half--medium product-detail__grid">
              <span className="heading--2 font-graphic">
                <h1 className="font-graphic heading--400 heading--sub no-wrap--ellipsis">
                  {productInfo.displayName}
                </h1>
              </span>
              <div className="grid" id={`${productId}_productPriceID`}>
                {this.renderProductPriceElm(productInfo)}
                <br />
                {this.renderProductPromotionsElm(productInfo)}
                &nbsp;
              </div>
              {this.renderProductSpecificationElm(productInfo)}
              <section className="productOrder productDetails">
                {this.renderAddToCartActionElm(productInfo)}
                {this.renderAddShoppingListElm(productInfo)}
              </section>
              <div className="grid">
                <ul className="list--silent">
                  <li className="strong">Description:</li>
                  <li>{displayName}</li>
                </ul>
                <ul className="list--silent">
                  <li className="strong">Product code:</li>
                  <li>{productId}</li>
                </ul>
                <Link to={detailPageURL} className="link--silen">
                  <span className="icon-text">View more details</span>
                  <span className="icon icon--right-circ-dark" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { selectedProductSKU, externalLargeImage, internalLargeImage, externalImageUrlReference, displayProductImageViewModal } = this.state;
    const {
      productInfo, productPrices,
      productInfoInProgress, productPricesInProgress, productInventoryInProgress
    } = this.props;
    const urls = { externalLargeImage, internalLargeImage, externalImageUrlReference };

    if (displayProductImageViewModal) {
      return (<ProductImageFullView urls={urls} product={selectedProductSKU} onClose={this.deactivateModal} />);
    }

    const noBodyContent = (
      productInfoInProgress || productPricesInProgress || productInventoryInProgress
      || _.isEmpty(productInfo) || _.isEmpty(productPrices)
    );

    const modalProps = {
      titleText: 'pdpQuickView',
      className: 'pdp-quick-view',
      verticallyCenter: true,
      focusdialog: true,
      onExit: this.deactivateModal
    };

    if (noBodyContent) {
      modalProps.initialFocus = '#focus-trap__hidden';
    }

    return (
      <AriaModal {...modalProps} >
        <div className="modal__box modal__box--panel modal__box--size-w-large pdp-quick-view">
          <Link className="icon icon--close-circ-dark modal__close" onClick={this.deactivateModal}>
            Close
          </Link>
          {this.renderModalContent(noBodyContent)}
        </div>
      </AriaModal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentUser: state.clp.currentUser,
    newSuburb: state.pdp.newSuburb,
    productInfo: state.pdp.productInfo,
    productPrices: state.pdp.productPrices,
    nonDelieverable: state.pdp.nonDelieverable,
    productInventory: state.pdp.productInventory,
    // DeliveryAreaData: state.deliveryDetails.deliveryArea,
    DeliveryAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', []),
    DeliveryLocation: state.deliveryDetails.deliveryLocation,
    labelsAndErrorMessages: state.labels.labelsAndErrorMessages,

    productInfoInProgress: state.pdp.productInfoInProgress,
    productPricesInProgress: state.pdp.productPricesInProgress,
    productInventoryInProgress: state.pdp.productInventoryInProgress,
    miniCartData: state.headerReducer.miniCartReducer
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUser,
    getProductInfo,
    getProductPriceInfo,
    getProductInventoryDetails,
    performInventoryCheck,
    resetComponentState,
    disableNewSuburbFlag,

    loader,

    addItemToCart,
    removeItemFromCart,
    getUserAddresses,
    createNewShoppingList,
    addItemToShoppingList,
    postDeliveryArea
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(PdpQuickView);
