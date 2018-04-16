import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import cx from 'classnames';

import Image from '../Image';
import ProductPrice from '../product-price';
import Carousel from '../Carousel';
import ServiceUtil from '../../../services/serviceUtil';
import { getminiCartData } from '../../sections/Header/actions';

import {
  miniCartSliderSettings,
  VIEW_PORT_TYPE_MOBILE,
  VIEW_PORT_TYPE_DESKTOP,
  MOBILE_HEADER_OPTION_CART
} from '../../../Constants';

class CartCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
      isListHovering: false
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseListEnter = this.handleMouseListEnter.bind(this);
    this.getMincartData = this.getMincartData.bind(this);
    this.onCartIconClick = this.onCartIconClick.bind(this);

    this.renderSwatchElm = this.renderSwatchElm.bind(this);
    this.renderPriceElm = this.renderPriceElm.bind(this);
    this.renderQuantityElm = this.renderQuantityElm.bind(this);
    this.renderColorElm = this.renderColorElm.bind(this);
    this.renderSizeElm = this.renderSizeElm.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
  }

  componentDidMount() {
    this.props.getminiCartData();
  }

  onCartIconClick(evt) {
    const { viewportType, setMobileNavHeaderOption, mobileNavHeaderStatus } = this.props;

    if (viewportType === VIEW_PORT_TYPE_MOBILE && _.isFunction(setMobileNavHeaderOption)) {
      if (this.bodyElement) this.bodyElement.classList.remove('nav-is-open');

      if (mobileNavHeaderStatus === MOBILE_HEADER_OPTION_CART) {
        setMobileNavHeaderOption('null');
      } else {
        setMobileNavHeaderOption(MOBILE_HEADER_OPTION_CART);
        this.setState({ isHovering: true, isListHovering: true });
      }
    } else if (this.state.isHovering) {
      this.handleMouseLeave(evt);
    } else {
      this.handleMouseEnter(evt);
    }
  }

  onBodyClick() {
    this.setState({
      isHovering: false,
      isListHovering: false
    });

    const ua = navigator.userAgent;
    const event = (ua.match(/(iPad|iPhone)/gi)) ? 'touchstart' : 'click';
    this.bodyElement.removeEventListener(event, this.onBodyClick);
  }

  get bodyElement() {
    return (typeof document !== 'undefined' && document.body);
  }

  getMincartData(getminiCartItems) {
    const itemTypes = Object.keys(getminiCartItems);
    const miniCart = [];
    for (const i in itemTypes) {
      miniCart.push(
        getminiCartItems[itemTypes[i]].map((item, i) => {
          return (
            <div className="grid mini-cart__prod" key={item.productId + i}>
              <Link to={item.productseoURL} className="grid__third">
                <Image
                  payload={{
                    className: 'img-fill-responsive',
                    url: item.internalImageURL,
                    alt: item.productDisplayName,
                    externalUrl: item.externalImageURL
                  }}
                />
              </Link>
              <div className="grid__two-thirds">
                <Link to={item.productseoURL} className="link--silent">
                  {item.productDisplayName}
                </Link>
                <ul className="list--silent">
                  {this.renderPriceElm(item)}
                  {this.renderQuantityElm(item)}
                  {item.color && this.renderColorElm(item)}
                  {this.renderSizeElm(item)}
                </ul>
              </div>
            </div>
          );
        })
      );
    }
    return <Carousel minSlides={3} className="slick-vertical" settings={miniCartSliderSettings} type="miniCart">{miniCart}</Carousel>;
  }

  getDiscount() {
    if (this.props.orderSummary.shippingAdjusted === true) {
      return (
        <li>
          {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-estimated-delivery-cost-label')}:
          {this.props.orderSummary.estimateDelivery !== 0 ?
            <span className="price">
              <span className="currency">{ServiceUtil.getLabel(this.props.labels, 'global-minicartpopup-currency-label')}</span>
              {this.props.orderSummary.estimateDelivery}
            </span> : <span className="price">TBC</span>}
        </li>
      );
    }

    return null;
  }

  getMiniCartSummary() {
    return (
      <div className="mini-cart__summary">
        <ul className="list--silent">
          <li>
            <strong>
              {this.props.orderSummary.totalItemsCount} {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-items-label')}
            </strong>
          </li>
          <li>
            {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-estimated-basket-total-label')}:
            <span className="price">
              <span className="currency">{ServiceUtil.getLabel(this.props.labels, 'global-minicartpopup-currency-label')}</span>
              {this.props.orderSummary.basketTotal}
            </span>
          </li>
          {this.getDiscount()}
        </ul>
      </div>
    );
  }

  getbuttonLinks() {
    return (
      <div className="mini-cart__ctas">
        <div className="mini-cart__cta">
          <Link to="/checkout/cart" className="btn btn--secondary btn--right btn--block">
            {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-edit-cart-label')}
          </Link>
        </div>
        <div className="mini-cart__cta">
          <Link to="/checkout/cart" className="btn btn--primary btn--flat btn--right btn--block">
            {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-checkout-label')}
          </Link>
        </div>
      </div>
    );
  }

  generateCartDiv() {
    const { viewportType, mobileNavHeaderStatus } = this.props;
    const classes = cx('mini-cart fly-out', {
      'is-open': viewportType === VIEW_PORT_TYPE_MOBILE && mobileNavHeaderStatus === MOBILE_HEADER_OPTION_CART
    }, {
      'is-open': viewportType === VIEW_PORT_TYPE_DESKTOP && this.state.isHovering
    });

    if (viewportType === VIEW_PORT_TYPE_DESKTOP && this.state.isHovering && navigator && navigator.userAgent) {
      const ua = navigator.userAgent;
      if (ua.match(/(iPad|iPhone)/gi)) {
        this.bodyElement.addEventListener('touchstart', this.onBodyClick);
      }      
    }

    return (
      <div className={classes}>
        <span className="text-xsmall main-header-nav__label">{ServiceUtil.getLabel(this.props.headerLabels, 'global-header-my-cart-label')}</span>
        <Link to="/checkout/cart" className="nav-list-x__link link--silent" onClick={this.onCartIconClick}>
          <strong className="font-graphic text-small main-header-nav__title">{ServiceUtil.getLabel(this.props.headerLabels, 'global-header-checkout-label')}</strong>
        </Link>
        <Link
          className="fly-out__toggle badge__cart" onClick={this.onCartIconClick}
          onMouseEnter={() => {
            this.props.updateHideDeliverySlotFlyOut(true);
            this.handleMouseListEnter();
            if (!this.state.isHovering) {
              this.handleMouseEnter();
            }
          }}
          onMouseLeave={() => {
            if (this.state.isHovering) this.props.updateHideDeliverySlotFlyOut(false);
            setTimeout(() => {
              // if (this.state.isHovering) {
              //   this.handleMouseEnter();
              // } else {
              this.handleMouseLeave();
              // }
            }, 3000);
          }}

        >
          <span className="icon icon--cart-white inline-block-visible--mobi-max" />
          <span className="icon icon--cart badge__cart-cart inline-block-hidden--mobi-max" />
          {this.renderBadgeElm()}
        </Link>
        {this.state.isListHovering && (
          <div
            className="mini-cart__contents fly-out__content fly-out__content--right"
            style={{ marginTop: '0px' }}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {this.props.orderSummary && this.props.orderSummary.totalItemsCount
              ? this.state.isListHovering && this.generateFlyOutProdDiv()
              : this.state.isListHovering && this.generateFlyOutNonProdDiv()}
          </div>
        )}
      </div>
    );
  }

  generateFlyOutProdDiv() {
    return (
      <div>
        {this.getMincartData(this.props.miniCartItems)}
        {this.getMiniCartSummary()}
        {this.getbuttonLinks()}
      </div>
    );
  }

  generateFlyOutNonProdDiv() {
    return (
      <div className="panel panel--silent panel--padded font-graphic">
        {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-first-time-shoppers-label')}
      </div>
    );
  }

  handleMouseEnter() {
    this.props.updateHideDeliverySlotFlyOut(true);
    this.setState({
      isHovering: true,
      isListHovering: true
    });
    const element = document.getElementById('frmSiteSearch');
    if (element) element.classList.remove('is-open');
  }

  handleMouseListEnter() {
    this.setState({ isListHovering: true });
    const element = document.getElementById('frmSiteSearch');
    if (element) element.classList.remove('is-open');
  }

  handleMouseLeave() {
    this.setState({
      isHovering: false,
      isListHovering: false
    });
  }

  renderBadgeElm() {
    const totalItemsCount = _.get(this.props, 'orderSummary.totalItemsCount', 0);

    if (totalItemsCount > 0) {
      return <span className="badge__cart-count">{totalItemsCount}</span>;
    }

    return null;
  }

  renderPriceElm(item) {
    const { productId, id, priceInfo } = item;
    const { listPrice, promoPrice, simplePromotion, wasPrice } = priceInfo;
    // let sale = simplePromotion ? listPrice + promoPrice : listPrice;
    return (
      <li className="mini-cart__price">
        {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-from-label')} :
        <ProductPrice
          classes="price"
          ids={`price_${productId}_${id}`}
          salePrice={listPrice}
          listPrice={wasPrice}  // {sale === listPrice ? 0 : sale}
        />
      </li>
    );
  }

  renderQuantityElm(item) {
    return (
      <li>
        {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-qty-label')} :{item.quantity}
      </li>
    );
  }

  renderColorElm(item) {
    return (
      <li>
        {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-colour-label')} :&nbsp;{/* item.color */}
        {item.internalSwatchImage && this.renderSwatchElm(item)}
      </li>
    );
  }

  renderSizeElm(item) {
    return item.size !== 'NO SZ' ? (
      <li className="text-xsmall">
        {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-size-label')} :{item.size}
      </li>
    ) : null;
  }

  renderSwatchElm(item) {
    return (
      <Image
        payload={{
          className: 'colour-swatch',
          url: item.internalSwatchImage,
          externalUrl: item.externalSwatchImageURL,
          alt: item.color,
          title: item.color
        }}
      />
    );
  }

  render() {
    const { viewportType, mobileNavHeaderStatus } = this.props;
    const classes = cx('nav-list-x__item main-header-nav__item nav-list-x--space main-header-nav__mini-cart', {
      'child-is-open': viewportType === VIEW_PORT_TYPE_MOBILE && mobileNavHeaderStatus === MOBILE_HEADER_OPTION_CART
    }, {
      'child-is-open': viewportType === VIEW_PORT_TYPE_DESKTOP && this.state.isHovering
    });

    return (
      <li className={classes} >
        {this.generateCartDiv()}
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  const { miniCartData } = state.headerReducer.miniCartReducer;

  return {
    miniCartData,
    groupSubTotal: miniCartData.groupSubTotal,
    orderSummary: miniCartData.orderSummary,
    miniCartItems: miniCartData.items,
    labels: _.get(state, 'labels.labelsAndErrorMessages.cart', {}),
    headerLabels: _.get(state, 'labels.labelsAndErrorMessages.header', {})
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getminiCartData }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(CartCheckout);
