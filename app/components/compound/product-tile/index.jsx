import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import url from 'url';
import qs from 'qs';
import classnames from 'classnames';

import Image from '../../basic/Image';
import ImageLazyLoad from '../../basic/image/ImageLazyLoad';
import Ribbon from '../../basic/Ribbon';
import FavoriteList from '../../basic/favorite-list';
import CartActionPanel from '../cart-action-panel';

import PDPQuickView from '../pdp-quick-view';

import {
  PRECISION_LENGTH,
  PRODUCT_SIZE_CONST_ML,
  PRODUCT_SIZE_CONST_G
} from '../../../Constants';

const ImagePanel = ({ imagePanelData, productType }) => {
  const { attributes } = imagePanelData;
  const imageReference = _.get(attributes, 'p_imageReference', '');
  const externalImageUrl = _.get(attributes, 'p_externalImageReference', '');
  const displayName = _.get(attributes, 'p_displayName', '');
  const imageData = {
    url: imageReference,
    alt: displayName,
    className: 'product-card__img lazyloaded',
    title: displayName,
    externalUrl: externalImageUrl,
    width: '350'
  };
  return (
    <div>
      <div className="product-card__image-wrap">
        <ImageLazyLoad
          payload={imageData}
          loader={
            <div className="">
              <span className="product-card__loading-icon loading loading--dark loading--large" />
            </div>
          }
        />
      </div>
      <Ribbon attributes={attributes} classNames="product-card__badges" />
      {attributes.Type !== 'Food' && attributes.Type !== 'recipe' ? <Brand brandData={{ displayName, brandsImageURL: attributes.p_BrandsImage, productId: attributes.p_productid }} /> : null}
    </div>
  );
};

const showSizeAsColour = (colour) => {
  return colour && (_.endsWith(colour, PRODUCT_SIZE_CONST_ML) || _.some(PRODUCT_SIZE_CONST_G, size => _.includes(colour, size)));
};

const ColorSwatchs = ({ swatchs, detailPageURL }) => {
  const pUrl = url.parse(detailPageURL);
  const query = qs.parse(pUrl.query);

  return (
    <nav className="product-card__swatches">
      <ul className="nav-list-x">
        {_.uniqBy(swatchs, 'attributes.p_swatchColour')
          .map((swatch, index) => {
            const { attributes } = swatch;

            const title = _.get(attributes, 'p_swatchColour', '');
            const imageData = {
              title,
              url: _.get(attributes, 'p_swatch', ''),
              externalUrl: _.get(attributes, 'p_externalSwatch', ''),
              className: 'colour-swatch colour-swatch--large'
            };

            const linkTo = {
              pathname: pUrl.pathname,
              search: `?${qs.stringify(Object.assign({}, query, { colourSKUId: _.get(attributes, 'p_SKU', '') }))}`
            };

            return (
              <li className="nav-list-x__item" key={index}>
                <Link to={linkTo} className="nav-list-x__link">
                  <Image payload={imageData} />
                </Link>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};

const getProductPricesNVariant = (records = [], currentUser = {}, skuId = '') => {
  const prod = _.find(records, ({ attributes }) => (attributes.p_SKU === skuId)) || {};
  const prices = _.compact([
    _.get(prod, `attributes.p_pl${currentUser.priceListZoneId}_wp`, null),
    _.get(prod, `attributes.p_pl${currentUser.priceListZoneId}`, null)
  ]);

  return {
    variant: _.get(prod, 'attributes.p_swatchColour', null),
    price: prices.join(' ')
  };
};

const trackAddRemoveAnalytics = (productDescription, currentUser) => ({ quantity }) => {
  const splat = _.get(productDescription, 'detailPageURL', '');
  const category = splat.split('/').slice(2, -3);
  const attr = _.get(productDescription, 'attributes', {});
  const { price, variant } = getProductPricesNVariant(productDescription.records, currentUser, attr.p_SKU);

  return [{
    name: attr.p_displayName,
    brand: attr.Brands,
    category: category.join('/'),

    id: attr.p_productid,
    sku: attr.p_SKU,
    quantity,
    variant,
    price
  }];
};

const ProductActionsPanel = (productDescription, productType, productInfo, currentUser, user, cartDetails) => {
  const type = _.get(productDescription, 'attributes.Type', '');

  if (productType === 'FOOD' || type === 'Food') {
    return (
      <CartActionPanel
        fromCLP
        productInfo={productInfo}
        currentUser={currentUser}
        user={user}
        cartDetails={cartDetails}
        trackAddToCart={trackAddRemoveAnalytics(productDescription, currentUser)}
        trackRemoveFromCart={trackAddRemoveAnalytics(productDescription, currentUser)}
      />);
  }

  const props = {
    className: 'btn btn--secondary btn--right btn--block btn--align-left'
  };

  if (type === 'recipe') {
    props.to = `/recipe/_/A-${productDescription.attributes.p_contentId}`;
  } else {
    props.to = productDescription.detailPageURL;
  }

  return (
    <Link {...props} >
      {type === 'recipe' ? 'Read More' : 'More details'}
    </Link>
  );
};

const Price = ({ productData, priceListZoneId }) => {
  const records = productData.records;
  const priceProp = `p_pl${priceListZoneId}`;
  const priceList = records.map(record => record.attributes[priceProp]);

  const maxPrices = Math.max(...priceList);
  const minPrices = Math.min(...priceList);

  const wasPrice = records.filter(s => s.attributes[`${priceProp}_wp`] != 0);
  const maxWasPrices = wasPrice.length ? Math.max(...wasPrice.map(record => record.attributes[`${priceProp}_wp`])) : 0;
  const minWasPrices = wasPrice.length ? Math.min(...wasPrice.map(record => record.attributes[priceProp])) : 0;

  return (
    <div className="product-card__info-line" itemProp="offers" itemScope itemType="#">
      <ReturnPrice priceDetails={{ minPrices, maxPrices, maxWasPrices, minWasPrices }} />
      {productData.attributes.PROMOTION ?
        <div id={`promotion_${productData.attributes.p_productid}`} className="font-graphic product__special product-card__info-line no-wrap--ellipsis">
          {productData.attributes.PROMOTION}
        </div>
        : null}
    </div>
  );
};

const DescriptionHeading = (productDescription, pageTamlateType, spotlightArticle, spotLightProduct, priceListZoneId) => {
  const receipeProps = _.get(productDescription, 'detailPageURL', '');
  const prodAttribute = _.get(productDescription, 'attributes.Type', '');
  if (prodAttribute === 'recipe' || _.includes(receipeProps, '/recipe/') || prodAttribute === 'article' || prodAttribute === 'fiveways') {
    return (
      <Link to={`/recipe/_/A-${productDescription.attributes.p_contentId}`} className="product-card__details">
        <strong>{productDescription.attributes.Type}</strong>
        <h2 className="product-card__name product-card__info-line no-wrap--ellipsis" itemProp="name">
          {productDescription.attributes.p_title ? productDescription.attributes.p_title : ''}
        </h2>
      </Link>
    );
  }
  return (
    <Link to={productDescription.detailPageURL} className="product-card__details">
      <h2 className="product-card__name product-card__info-line no-wrap--ellipsis" itemProp="name">
        {productDescription.attributes.p_displayName ? productDescription.attributes.p_displayName : ''}
      </h2>
      {pageTamlateType !== 'longerLanding' || (pageTamlateType === 'longerLanding' && spotLightProduct == true) || (spotlightArticle == true && pageTamlateType === 'longerLanding') ?
        <Price productData={productDescription} priceListZoneId={priceListZoneId} />
        : null}

    </Link>
  );
};

const DescriptionPanel = ({ productDescription, productType, pageTamlateType, currentUser, user, spotlightArticle, spotLightProduct, cartDetails }) => {
  const priceListZoneId = _.get(currentUser, 'priceListZoneId', '');

  return (
    <div id={`prod_details_${productDescription.attributes.p_productid}`} className="productDetails">
      {DescriptionHeading(productDescription, pageTamlateType, spotlightArticle, spotLightProduct, priceListZoneId)}
      {ProductActionsPanel(productDescription, productType, productDescription.attributes, currentUser, user, cartDetails)}
    </div>
  );
};

const Brand = ({ brandData }) => {
  if (brandData && brandData.brandsImageURL) {
    const imageData = {
      url: brandData.brandsImageURL,
      alt: brandData.displayName,
      id: 'img_' + brandData.productId
    };

    return (
      <div className="product-card__brand">
        <Image payload={imageData} />
      </div>
    );
  }

  return null;
};

const HoverDetails = (props) => {
  if (props.spotlightArticle == true || props.spotLightProduct == true) {
    return null;
  }

  const type = _.get(props, 'productData.Type', '');

  return (
    <div className="hoverDetails">
      {type === 'Food' && (<FavoriteList {...props} showTooltip />)}
      {props.showQuickView && (
        <p>
          <Link onClick={props.onQuickViewClick} className="btn btn--secondary btn--right product-card__quick">Quick view</Link>
        </p>
      )}
    </div>
  );
};

const ReturnPrice = ({ priceDetails }) => {
  const { minPrices, maxPrices, maxWasPrices, minWasPrices } = priceDetails;
  if ((maxWasPrices === minWasPrices) && (minWasPrices == 0)) {
    if (_.isNaN(minPrices)) return null;

    if (maxPrices !== minPrices) {
      return (
        <span className="font-graphic">
          From: <span className="price">R {minPrices.toFixed(PRECISION_LENGTH)}</span>
        </span>
      );
    }

    return (
      <span className="font-graphic">
        <span className="price">R {minPrices.toFixed(PRECISION_LENGTH)}</span>
      </span>
    );
  }

  if (_.isNaN(maxWasPrices) || _.isNaN(minWasPrices)) return null;

  return (
    <span className="font-graphic">
      <span className="price price--original">
        <span className="currency">R</span>{maxWasPrices.toFixed(PRECISION_LENGTH)}
      </span>
      <span className="price price--discounted text-space">
        <span className="currency" content="ZAR">R</span>
        <span className="price">{minWasPrices.toFixed(PRECISION_LENGTH)}</span>
      </span>
    </span>
  );
};

class ProductTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
      showProductQuickView: false
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.onQuickViewClick = this.onQuickViewClick.bind(this);
    this.onQuickViewClose = this.onQuickViewClose.bind(this);
    this.trackProductClick = this.trackProductClick.bind(this);
  }

  onQuickViewClick(e) {
    if (e) e.preventDefault();

    this.trackProductClick();
    this.setState({ showProductQuickView: true });
  }

  onQuickViewClose(e) {
    if (e) e.preventDefault();
    this.setState({ showProductQuickView: false });
  }

  handleMouseEnter(e) {
    if (e) e.preventDefault();
    this.setState({
      isHovering: true
    });
  }

  handleMouseLeave(e) {
    if (e) e.preventDefault();
    this.setState({
      isHovering: false
    });
  }

  trackProductClick() {
    const { productData, currentUser, tagProductClicks } = this.props;

    if (tagProductClicks) {
      tagProductClicks(trackAddRemoveAnalytics(productData, currentUser)({ quantity: null }));
    }
  }

  renderProductErrorElm(productData) {
    const skuId = productData.p_SKU;
    const { id, message } = this.props.nonDelieverable;

    if (id === skuId) {
      return (<div className="product-card__error text-error" id={`${id}_favoritesError`}>{message}</div>);
    }

    return null;
  }

  render() {
    const { productData, productType, pageTamlateType, user, currentUser, showQuickView, spotlightArticle, spotLightProduct, cartDetails } = this.props;
    const type = _.get(productData, 'attributes.Type', '');
    const rootClasees = classnames(
      {
        'product-list__item': pageTamlateType !== 'longerLanding'
      }, {
        'landing__product-card': pageTamlateType === 'longerLanding'
      }
    );

    const cardClasses = classnames('product-card__visual', { 'is-hovering': this.state.isHovering });
    const cardProps = {
      className: cardClasses,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    };

    return (
      <div className={rootClasees}>
        <article className="product-card">
          <div {...cardProps} >
            <Link to={type.toLowerCase() === 'recipe' ? `/recipe/_/A-${productData.attributes.p_contentId}` : productData.detailPageURL} onClick={this.trackProductClick} >
              <ImagePanel imagePanelData={productData} productType={productType} />
              {productData.attributes.Type !== 'recipe' && productData.attributes.Type !== 'article' && productData.attributes.Type !== 'fiveways' && !_.includes(productData.detailPageURL, '/recipe/') ? <HoverDetails showQuickView={showQuickView} productData={productData.attributes} user={user} currentUser={currentUser} onQuickViewClick={this.onQuickViewClick} spotlightArticle={spotlightArticle} spotLightProduct={spotLightProduct} /> : null}
            </Link>
          </div>
          {
            productData.attributes.Type !== 'Food' && pageTamlateType !== 'longerLanding' && productData.attributes.Type !== 'recipe' && productData.attributes.Type !== 'article' && productData.attributes.Type !== 'fiveways' && !_.includes(productData.detailPageURL, '/recipe/')
            ? <ColorSwatchs swatchs={productData.records} detailPageURL={productData.detailPageURL} />
            : null
          }
          <DescriptionPanel
            pageTamlateType={pageTamlateType}
            productDescription={productData}
            productType={productType}
            currentUser={currentUser}
            user={user}
            spotlightArticle={spotlightArticle}
            spotLightProduct={spotLightProduct}
            cartDetails={cartDetails}
          />
          {this.state.showProductQuickView && <PDPQuickView onQuickViewClose={this.onQuickViewClose} detailPageURL={productData.detailPageURL} />}
          {this.props.nonDelieverable && this.renderProductErrorElm(productData.attributes)}
        </article>
      </div>
    );
  }
}

export default ProductTile;
