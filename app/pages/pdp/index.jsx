import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';

import { SEOTags } from '../../utils/seoUtils';
import BreadCrumb from '../../components/basic/breadcrumbs';
import ImageMagnify from '../../components/basic/image-magnify';
import SocialLinks from '../../components/basic/social-links';
import Ribbon from '../../components/basic/Ribbon';
import FavoriteList from '../../components/basic/favorite-list';
import AddItemToCart from '../../components/basic/add-item-to-cart';
import ShoppingListDropdown from '../../components/basic/shopping-list-dropdown';
import ProductPrice from '../../components/basic/product-price';
import ProductSize from '../../components/basic/product-size';
import ProductColour from '../../components/basic/product-colour';
import ProductAccordians from '../../components/basic/product-accordians';
import ProductRecentlyViewed from '../../components/basic/product-recently-viewed';
import ProductAuxiliaryMedia from '../../components/basic/product-auxiliary-media';
import ProductImageFullView from '../../components/basic/product-image-full-view';

import { loader } from '../../actions/common';
import {
  addItemToCart,
  removeItemFromCart,
  getUserAddresses,
  createNewShoppingList,
  addItemToShoppingList
} from '../../components/compound/cart-action-panel/actions';
import {
  getProductInfo,
  getProductPriceInfo,
  getRecentlyViewedProducts,
  getDeliveryAndReturnsDetails,
  getProductInventoryDetails,
  performInventoryCheck,
  disableNewSuburbFlag,
  resetComponentState
} from './actions';
import { getCurrentUser } from '../clp/actions';
import { postDeliveryArea } from '../../components/basic/delevery-model/actions';
import { tagProductClicks } from '../../gtm/gtmActions';

import CommonUtil from '../../services/commonUtil';

import {
  BADGE_KEYS_PREFERENCE,
  DEFAULT_ITEM_QUANTITY,
  DEFAULT_INVENTORY_QUANTITY,
  DEFAULT_ITEM_QUANTITY_LABEL,
  DEFAULT_MAX_INVENTORY_QUANTITY,
  RECENTLY_VIEWED_PRODUCTS_COOKIE_NAME,
  MAX_RECENTLY_VIEWED_PRODUCTS_IN_COOKIE
} from '../../Constants';

class Pdp extends Component {
  static need = [getProductInfo, getProductPriceInfo, getDeliveryAndReturnsDetails];

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      errorMessage: '',
      enableQuantity: false,
      selectedQuantity: DEFAULT_ITEM_QUANTITY_LABEL,
      selectedProductSKU: {},
      isProductSizeSelected: false,
      hasRecentlyViewedProductPrices: false,
      displayProductImageViewModal: false,
      triedForRecentlyViewedProducts: false,

      colour: '',
      externalLargeImage: '',
      externalImageUrlReference: '',
      internalLargeImage: ''
    };

    this.renderBackToBrowseLink = this.renderBackToBrowseLink.bind(this);
    this.renderProductElm = this.renderProductElm.bind(this);
    this.renderProductErrors = this.renderProductErrors.bind(this);
    this.renderAddToCartActionElm = this.renderAddToCartActionElm.bind(this);
    this.renderAddShoppingListElm = this.renderAddShoppingListElm.bind(this);
    this.renderProductImageCarouselElm = this.renderProductImageCarouselElm.bind(this);
    this.renderProductColorElm = this.renderProductColorElm.bind(this);
    this.renderProductSizeElm = this.renderProductSizeElm.bind(this);
    this.renderProductPriceElm = this.renderProductPriceElm.bind(this);
    this.renderRecentlyViewedProductElm = this.renderRecentlyViewedProductElm.bind(this);
    this.renderProductSocialLinksElm = this.renderProductSocialLinksElm.bind(this);
    this.renderProductImageElm = this.renderProductImageElm.bind(this);
    this.renderProductFullImageActionElm = this.renderProductFullImageActionElm.bind(this);
    this.renderProductSpecificationElm = this.renderProductSpecificationElm.bind(this);
    this.renderProductPromotionsElm = this.renderProductPromotionsElm.bind(this);
    this.renderProductRibbonElm = this.renderProductRibbonElm.bind(this);

    this.getProductSaleNListPrice = this.getProductSaleNListPrice.bind(this);

    // GTM
    this.trackAddRemoveAnalytics = this.trackAddRemoveAnalytics.bind(this);
    this.trackRecentlyViewedProductClick = this.trackRecentlyViewedProductClick.bind(this);

    this.onChangeProductColour = this.onChangeProductColour.bind(this);
    this.onChangeProductSize = this.onChangeProductSize.bind(this);
    this.onAuxiliaryMediaSelect = this.onAuxiliaryMediaSelect.bind(this);
    this.onProductImageModalClose = this.onProductImageModalClose.bind(this);
    this.onRecentlyViewedProductClick = this.onRecentlyViewedProductClick.bind(this);
    this.checkBrowseLinkClick = this.checkBrowseLinkClick.bind(this);

    this.addItemToShoppingList = this.addItemToShoppingList.bind(this);
    this.createNewShoppingList = this.createNewShoppingList.bind(this);
    this.fetchProductInventory = this.fetchProductInventory.bind(this);
    this.getRecentlyViewedProductIds = this.getRecentlyViewedProductIds.bind(this);
    this.postDeliveryArea = this.postDeliveryArea.bind(this);
    this.showInvalidPropertiesError = this.showInvalidPropertiesError.bind(this);
  }

  componentDidMount() {
    if (_.isEmpty(this.props.currentUser)) this.props.getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    const { productInfo, recentlyViewedProducts } = nextProps;
    const { productInventoryInProgress, recentlyViewedProductsInProgress } = nextProps;
    const { defaultStyleId, colourSKUs, productId, productVariant, activeSkuIds } = productInfo;
    const recentlyViewedIds = this.getRecentlyViewedProductIds(productId);
    CommonUtil.createCookie(RECENTLY_VIEWED_PRODUCTS_COOKIE_NAME, recentlyViewedIds.join('-'));

    const { selectedProductSKU } = this.state;
    let sku = selectedProductSKU;
    const urls = {};

    // new Product from Recently viewed list
    if (selectedProductSKU.id && _.isArray(activeSkuIds) && !_.includes(activeSkuIds, selectedProductSKU.id)) {
      sku = _.find(colourSKUs, ({ styleId }) => styleId === defaultStyleId) || {};
      if (recentlyViewedIds.length) this.props.getProductPriceInfo(recentlyViewedIds);

      urls.externalLargeImage = sku.externalLargeImage;
      urls.externalImageUrlReference = sku.externalImageUrlReference;
      urls.internalLargeImage = sku.internalLargeImage;
    } else {
      // First time
      if (_.isEmpty(selectedProductSKU) && colourSKUs && defaultStyleId) {
        sku = _.find(colourSKUs, ({ styleId }) => styleId === defaultStyleId) || {};

        urls.externalLargeImage = sku.externalLargeImage;
        urls.externalImageUrlReference = sku.externalImageUrlReference;
        urls.internalLargeImage = sku.internalLargeImage;
      }

      if (!recentlyViewedProductsInProgress && recentlyViewedIds.length && !this.state.triedForRecentlyViewedProducts) {
        if (_.isEmpty(recentlyViewedProducts)) {
          this.setState({ triedForRecentlyViewedProducts: true });
          this.props.getRecentlyViewedProducts(recentlyViewedIds);
          this.props.getProductPriceInfo(recentlyViewedIds);
        } else {
          const _pIds = _.map(_.get(recentlyViewedProducts, 'recentlyViewedItems', {}), 'productId');
          const _diff = _.difference(recentlyViewedIds, _pIds);

          if (_diff.length) {
            const __union = _.union(_pIds, recentlyViewedIds);
            CommonUtil.createCookie(RECENTLY_VIEWED_PRODUCTS_COOKIE_NAME, __union.join('-'));
            this.setState({ triedForRecentlyViewedProducts: true });
            this.props.getRecentlyViewedProducts(__union);
            this.props.getProductPriceInfo(__union);
          }
        }
      }

      if (!productInventoryInProgress && (nextProps.newSuburb || !nextProps.hasProductInventory)) {
        this.fetchProductInventory(nextProps);
        if (nextProps.newSuburb) {
          this.props.disableNewSuburbFlag();
        }
      }
    }

    const newStates = {
      enableQuantity: this.state.isProductSizeSelected,
      selectedProductSKU: sku,
      colour: sku.colour,
      error: false,
      errorMessage: ''
    };

    if (!_.isEmpty(urls)) {
      _.assign(newStates, urls);
    }

    if (productVariant === 'noVariant') {
      newStates.enableQuantity = true;
      newStates.selectedQuantity = DEFAULT_ITEM_QUANTITY;
    }

    this.setState(newStates);
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

  onChangeProductSize(e, sku) {
    e.preventDefault();
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

  onProductImageModalClose(evt) {
    if (evt) evt.preventDefault();
    this.setState({ displayProductImageViewModal: false });
  }

  onRecentlyViewedProductClick(pId, evt) {
    this.trackRecentlyViewedProductClick(pId);
    this.props.resetComponentState();
  }

  getRecentlyViewedProductIds(productId) {
    const recentlyViewed = CommonUtil.readCookie(RECENTLY_VIEWED_PRODUCTS_COOKIE_NAME) || '';
    let recentlyViewedIds = [productId];

    if (recentlyViewed) {
      recentlyViewedIds = _.uniq(_.compact(_.concat(_.split(recentlyViewed, '-'), productId)));
      if (recentlyViewedIds.length > MAX_RECENTLY_VIEWED_PRODUCTS_IN_COOKIE) {
        recentlyViewedIds = _.drop(recentlyViewedIds);
      }
    }

    return _.compact(recentlyViewedIds);
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

  fetchProductInventory(props) {
    const { currentUser, productInfo } = props;
    const { fulfillerType, activeSkuIds } = productInfo;

    if (currentUser && fulfillerType && !_.isEmpty(activeSkuIds)) {
      const { storeIds } = currentUser;
      const storeId = _.get(storeIds, fulfillerType, null);

      if (storeId) {
        this.props.loader(true);
        this.props.getProductInventoryDetails(storeId, activeSkuIds);
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

  checkBrowseLinkClick() {
    if (!_.isEmpty(this.props.clpData)) {
      if (this.props.clpData['@type'] === 'Redirect') {
        this.props.router.go(-2);
      } else {
        browserHistory.push({
          pathname: '/',
        });
      }
    } else {
      this.props.router.goBack();
    }
    // } else {
    //   browserHistory.push({
    //     pathname: '/',
    //   });
    // }
  }

  showInvalidPropertiesError() {
    const { error } = this.state;

    if (!error) {
      this.setState({
        error: true,
        errorMessage: 'Please select a valid item add to your list'
      });
    }
  }

  trackRecentlyViewedProductClick(pId) {
    const items = _.get(this.props, 'recentlyViewedProducts.recentlyViewedItems', []);
    const product = _.find(items, ({ productId }) => (productId === pId));

    if (product && this.props.tagProductClicks) {
      const splat = _.get(product, 'productURL', '');
      const category = splat.split('/').slice(2, -2);

      this.props.tagProductClicks([{
        name: product.displayName,
        brand: product.brands || null,
        category: category.join('/'),
        id: pId,
        sku: product.skuId
      }], true);
    }
  }

  trackAddRemoveAnalytics() {
    const { productInfo } = this.props;
    const { selectedQuantity, selectedProductSKU } = this.state;
    const { colour, displayName, id } = selectedProductSKU;
    const { brandName, productId } = productInfo;
    const { listPrice, salePrice } = this.getProductSaleNListPrice(productInfo);
    const priceList = _.compact([listPrice, salePrice]);
    const splat = _.get(this.props, 'params.splat', '');
    const category = splat.split('/').slice(0, -3);

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

  renderBackToBrowseLink() {
    return (
      <p>
        <Link
          className="link--silent text-small"
          onClick={this.checkBrowseLinkClick.bind(this)}
          title="Back to browse"
        >
          <span className="icon icon--left-circ-dark" />
          <span className="icon-text">Back to browse</span>
        </Link>
      </p>
    );
  }

  renderProductElm(product) {
    if (_.isEmpty(product)) {
      return null;
    }

    return (
      <div className="product">
        <div className="grid">
          <div className="grid__third--medium" id="productImgID">
            {this.renderProductImageElm()}
            {this.renderProductFullImageActionElm(product)}
            {this.renderProductImageCarouselElm()}
            {this.renderProductSocialLinksElm()}
          </div>
          <div className="grid__two-thirds--medium product-detail__grid">
            <h1 className="font-graphic heading--400 heading--sub no-wrap--ellipsis">
              {product.displayName}
            </h1>
            <div className="grid heading--2">
              {this.renderProductPriceElm(product)}
              <br />
              {this.renderProductPromotionsElm(product)}
            </div>
            {this.renderProductRibbonElm(product)}
            <span id="productAttrID" name="productAttrID" className="grid">
              {this.renderProductSpecificationElm(product)}
              {this.renderAddToCartActionElm(product)}
              {this.renderAddShoppingListElm(product)}
              {this.renderProductErrors(product)}
            </span>
            <ProductAccordians product={product} deliveryAndReturnsDetails={this.props.deliveryAndReturnsDetails} />
          </div>
        </div>
        {this.renderRecentlyViewedProductElm()}
      </div>
    );
  }

  renderProductErrors(product) {
    if (this.state.error && this.state.errorMessage) {
      return (
        <span>
          <div
            id={`${product.productId}_cartErrors`}
            className="formErrors details grid grid--space-y text-error quantityErrors"
          >
            {this.state.errorMessage}
          </div>
        </span>
      );
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

  renderProductRibbonElm(product) {
    const ribbonsData = _.reduce(
      _.filter(product.productAttributes, ({ attributeDisplayName }) => {
        return _.includes(BADGE_KEYS_PREFERENCE, attributeDisplayName);
      }), (prev, attr) => {
        prev[`p_${attr.attributeDisplayName}Image`] = attr.imageURL; // eslint-disable-line no-param-reassign
        prev[attr.attributeDisplayName] = attr.displayName; // eslint-disable-line no-param-reassign

        return prev;
      }, {});

    return (
      <div className="grid grid--space-y">
        <Ribbon attributes={ribbonsData} classNames="" />
      </div>
    );
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
    return (<ProductColour colour={this.state.selectedProductSKU.colour} product={product} onChangeProductColour={this.onChangeProductColour} />);
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

  renderProductPriceElm(product) {
    const prices = this.getProductSaleNListPrice(product);

    if (_.isEmpty(prices)) {
      return null;
    }

    const { id } = this.state.selectedProductSKU;

    return (<ProductPrice classes="price" ids={`price_${product.productId}_${id}`} {...prices} />);
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

  renderProductImageElm() {
    const { displayName } = this.props.productInfo;
    const { externalLargeImage, externalImageUrlReference, internalLargeImage } = this.state;

    const settings = {
      alt: displayName,
      url: internalLargeImage,
      externalUrl: externalLargeImage && `${externalImageUrlReference}o=${externalLargeImage}`,
      width: 700
    };

    return (
      <ImageMagnify {...settings} />
    );
  }

  renderProductSocialLinksElm() {
    if (typeof window === 'undefined') {
      return null;
    }

    const { displayName } = this.props.productInfo;
    const config = {
      url: window.location.href,
      text: displayName
    };

    return (
      <SocialLinks
        twitter={config}
        pinterest={config}
        facebook={config}
      />
    );
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

  renderAddToCartActionElm(product) {
    const { currentUser, user, productInventory } = this.props;
    const { productId, fulfillerType, productVariant } = product;
    const skuId = this.state.selectedProductSKU.id;
    const suburbId = _.get(this.props, 'currentUser.suburb.id', null);
    let quantity = DEFAULT_INVENTORY_QUANTITY;
    let enableQuantityNoSuburb = false;
    const miniCartData = _.get(this.props, 'miniCartData.miniCartData', {});

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
    } else if (productVariant === 'noVariant') {
      enableQuantityNoSuburb = true;
    }

    const { enableQuantity, isProductSizeSelected, selectedQuantity } = this.state;

    return (
      <div className="grid grid--space-y pdp__atc">
        <AddItemToCart
          user={user}
          currentUser={currentUser}
          loader={this.props.loader}
          productInfo={{ ...product, productId, skuId }}
          addItemToCart={this.props.addItemToCart}
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
          showInvalidPropertiesError={this.showInvalidPropertiesError}
          hasInvalidProperties={!this.state.isProductSizeSelected}
        />
        <FavoriteList productData={productData} user={user} currentUser={currentUser} addAsChildren />
      </div>
    );
  }

  renderRecentlyViewedProductElm() {
    const { currentUser, productPrices, recentlyViewedProducts, productInfo } = this.props;

    if (recentlyViewedProducts && recentlyViewedProducts.recentlyViewedItems && !_.isEmpty(productPrices)) {
      const _recentlyViewedProducts = _.reject(recentlyViewedProducts.recentlyViewedItems, ({ productId }) => productInfo.productId === productId);

      if (_recentlyViewedProducts) {
        return (
          <div className="grid--space-y">
            <ProductRecentlyViewed
              recentlyViewedProducts={_recentlyViewedProducts}
              productPrices={productPrices}
              currentUser={currentUser}
              onProductClick={this.onRecentlyViewedProductClick}
            />
          </div>
        );
      }
    }

    return null;
  }

  render() {
    const { selectedProductSKU, externalLargeImage, internalLargeImage, externalImageUrlReference } = this.state;
    const urls = { externalLargeImage, internalLargeImage, externalImageUrlReference };
    const { productInfo, productInfoInProgress } = this.props;
    const SEOTagsData = _.get(this.props, 'SEOTags', {});


    if (!productInfoInProgress && (_.isEmpty(productInfo) || (!productInfo.status && productInfo.message))) {
      return (
        <div className="main-page pdp">
          {!_.isEmpty(SEOTagsData) &&
            <SEOTags
              title={SEOTagsData.title}
              metaKeywords={SEOTagsData.SEOTagsData}
              metaDescription={SEOTagsData.metaDescription}
            />
          }
          <div>{productInfo.message}</div>
        </div>
      );
    }

    return (
      <div className="main-page pdp">
        {!_.isEmpty(SEOTagsData) &&
          <SEOTags
            title={SEOTagsData.title}
            metaKeywords={SEOTagsData.SEOTagsData}
            metaDescription={SEOTagsData.metaDescription}
          />
        }
        <Link id="pdp-link" style={{ display: 'none' }} />
        <div className="grid grid--tight-y">
          <BreadCrumb breadCrumbs={productInfo.breadCrumbs} router={this.props.router} />
          {this.props.router && this.renderBackToBrowseLink()}
          {productInfo && this.renderProductElm(productInfo)}
          {this.state.displayProductImageViewModal && (
            <ProductImageFullView urls={urls} product={selectedProductSKU} onClose={this.onProductImageModalClose} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    clpData: state.clp.SLPData,
    currentUser: state.clp.currentUser,
    newSuburb: state.pdp.newSuburb,
    productInfo: state.pdp.productInfo,
    productPrices: state.pdp.productPrices,
    nonDelieverable: state.pdp.nonDelieverable,
    productInventory: state.pdp.productInventory,
    recentlyViewedProducts: state.pdp.recentlyViewedProducts,
    deliveryAndReturnsDetails: state.pdp.deliveryAndReturnsDetails,
    // DeliveryAreaData: state.deliveryDetails.deliveryArea,
    DeliveryAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', {}),
    DeliveryLocation: state.deliveryDetails.deliveryLocation,
    labelsAndErrorMessages: state.labels.labelsAndErrorMessages,

    productInfoInProgress: state.pdp.productInfoInProgress,
    productPricesInProgress: state.pdp.productPricesInProgress,
    productInventoryInProgress: state.pdp.productInventoryInProgress,
    hasProductInventory: state.pdp.hasProductInventory,
    recentlyViewedProductsInProgress: state.pdp.recentlyViewedProductsInProgress,
    miniCartData: state.headerReducer.miniCartReducer,
    SEOTags: state.common.seo.SEOTags.pdp
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUser,
    getProductInfo,
    getProductPriceInfo,
    performInventoryCheck,
    getRecentlyViewedProducts,
    getDeliveryAndReturnsDetails,
    getProductInventoryDetails,
    disableNewSuburbFlag,
    resetComponentState,

    loader,

    addItemToCart,
    removeItemFromCart,
    getUserAddresses,
    createNewShoppingList,
    addItemToShoppingList,
    postDeliveryArea,

    tagProductClicks
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Pdp);
