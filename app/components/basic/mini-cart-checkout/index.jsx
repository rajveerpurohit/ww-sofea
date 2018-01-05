import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import ServiceUtil from '../../../services/serviceUtil';

class CartCheckout extends Component {
  // static need = [
  //   getminiCartData
  // ];
    constructor(props) {
        super(props);

        this.state = {
          isHovering: false,
          isListHovering: false,
          // groupSubTotal: [],
          // orderSummary: [],
          // miniCartItems: []

        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseListEnter = this.handleMouseListEnter.bind(this);
        this.getMincartData = this.getMincartData.bind(this);
    }
    componentDidMount() {
    //  const url = 'http://172.21.40.151:8180/public/v1/cart/commerceItems/wwCartDetails';
    //     axios.get(url)
    //       .then((response) => {
    //       this.setState({
    //         groupSubTotal: response.data.groupSubTotal,
    //         orderSummary: response.data.orderSummary,
    //         miniCartItems: response.data.items
    //       });
    //   });
    // this.props.getminiCartData();
    
    }
    handleMouseEnter() {
        this.setState({isHovering: true});
        this.setState({isListHovering: true});
        // this.props.getminiCartData();
    }
    handleMouseListEnter() {
        this.setState({isListHovering: true});
    }
    handleMouseLeave() {
            this.setState({
                isHovering: false,
                isListHovering: false
            });
    }
    getMincartData(getminiCartItems) {
        const itemTypes = Object.keys(getminiCartItems);
        const miniCart = [];
        for (const i in itemTypes) {
            miniCart.push(getminiCartItems[itemTypes[i]].map((item, index) => {
            return (
              <div className="grid mini-cart__prod" key={index}>
                <Link to="" className="grid__third">
                  <img className="img-fill-responsive" src="//images.woolworthsstatic.co.za/Foil-Print-Cut-Out-T-Shirt-.jpg?o=ky7G37knlsBuZ7NRGsI3YVIjHkMj&V=KlBQ&w=350" alt="Modern Pea Coat" />
                </Link>
                <div className="grid__two-thirds">
                  <Link to="" className="link--silent">{item.productDisplayName}</Link>
                  <ul className="list--silent">
                    <li className="mini-cart__price">{ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-from')} :
                            <span className="price">
                              <span className="currency" itemProp="priceCurrency" content="ZAR">R</span>
                              <span itemProp="price" content="99.00">{item.priceInfo.amount}</span>
                            </span>
                    </li>
                    <li>{ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-qty')} : {item.quantity}</li>
                    <li>{ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-colour')} :{item.size}:
                                <img className="colour-swatch" src="//images.woolworthsstatic.co.za/swatch-X-WHITE-6009207121710.jpg?o=xkQwnqToQkUEO1pVZ2a6H33Q5fsj&V=@AfR&w=16" title="x white" alt="x white" />
                    </li>
                    <li className="text-xsmall">{ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-size')} :{item.size}</li>
                  </ul>
                </div>
              </div>
            );
        }));
        }
        return miniCart;
    }
    getDiscount() {
        if (this.props.orderSummary.shippingAdjusted === true) {
            return (<li>{ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-estimated-delivery-cost')}:
                <span className="price">
                  <span className="currency">R</span>{this.props.orderSummary.estimateDelivery}</span>
            </li>);
        } return null;
    }
    getMiniCartSummary() {
        return (
          <div className="mini-cart__summary">
            <ul className="list--silent">
              <li>
                <strong>{this.props.orderSummary.totalItemsCount} {ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-items')}</strong>
              </li>
              <li>{ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-estimated-basket-total')}:
                        <span className="price">
                          <span className="currency">R</span>{this.props.orderSummary.basketTotal}</span>
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
              <Link to="" className="btn btn--secondary btn--right btn--block">{ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-edit-cart')}</Link>
            </div>
            <div className="mini-cart__cta">
              <Link to="" className="btn btn--secondary btn--right btn--block">{ServiceUtil.getLabel(this.props.cartLabels, 'global-minicartpopup-checkout')}</Link>
            </div>
          </div>
        );
    }
    generateCartDiv() {
        return (
          <div className="mini-cart fly-out is-open" data-js="fly-out" data-fly-out-type="click" data-fly-out-pos="right">
            <span className="text-xsmall main-header-nav__label">{ServiceUtil.getLabel(this.props.labels, 'global-header-my-cart')}</span>
            <Link to="" className="nav-list-x__link link--silent">
              <strong className="font-graphic text-small main-header-nav__title">{ServiceUtil.getLabel(this.props.labels, 'global-header-checkout')}</strong>
            </Link>
            <Link to="" className="fly-out__toggle badge__cart" data-js="fly-out-toggle" >
              <span className="icon icon--cart-white inline-block-visible--mobi-max" />
              <span className="icon icon--cart badge__cart-cart inline-block-hidden--mobi-max" />
              {this.props.orderSummary && this.props.orderSummary.totalItemsCount ? <span className="badge__cart-count">{this.props.orderSummary.totalItemsCount}</span> : ' ' }
            </Link>
            {
                    this.state.isListHovering &&
                    <div className="mini-cart__contents fly-out__content fly-out__content--right" data-js="fly-out-content" style={{marginTop: '0px'}} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        {this.props.orderSummary && this.props.orderSummary.totalItemsCount ? (this.state.isListHovering && this.generateFlyOutProdDiv()) : (this.state.isListHovering && this.generateFlyOutNonProdDiv()) }
                    </div>
                }
          </div>
        );
    }
    generateFlyOutProdDiv() {
        return (<div data-js="mini-cart-carousel">
          {this.getMincartData(this.props.miniCartItems)}
          {this.getMiniCartSummary()}
          {this.getbuttonLinks()}

        </div>);
    }
    generateFlyOutNonProdDiv() {
        return (<div className="panel panel--silent panel--padded font-graphic">Free delivery for first time shoppers.</div>);
    }
    render() {
        return (
          <li className="nav-list-x__item main-header-nav__item nav-list-x--space main-header-nav__mini-cart" onMouseEnter={this.handleMouseListEnter}
             onMouseLeave={() => { setTimeout(() => { this.state.isHovering === false ? this.handleMouseLeave() : this.handleMouseEnter(); }, 3000); }}
             >
            { this.generateCartDiv() }
          </li>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    // miniCartData: state.miniCartReducer.miniCartData,
    groupSubTotal: state.headerReducer.miniCartReducer.miniCartData.groupSubTotal,
    orderSummary: state.headerReducer.miniCartReducer.miniCartData.orderSummary,
    miniCartItems: state.headerReducer.miniCartReducer.miniCartData.items
    };
};

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({getminiCartData}, dispatch);
// };

export default connect(mapStateToProps)(CartCheckout);
