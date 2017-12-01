import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CartCheckout extends Component {
    constructor(props){
        super(props);
        
        this.state = {
          isHovering: false,
          isListHovering :  false,
          groupSubTotal : [],
          orderSummary : [],
          miniCartItems : []
        
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseListEnter = this.handleMouseListEnter.bind(this);
        this.getMincartData = this.getMincartData.bind(this);
    }
    componentDidMount() {
     let url = "http://172.21.40.151:8180/public/v1/cart/commerceItems/wwCartDetails";
        axios.get(url) 
          .then((response)=>{
          this.setState({
            groupSubTotal :response.data.groupSubTotal,
            orderSummary : response.data.orderSummary,
            miniCartItems : response.data.items
          })
            
      });
    }
    handleMouseEnter() {
        this.setState({isHovering : true});
        this.setState({isListHovering : true});
    }
    handleMouseListEnter() {
        this.setState({isListHovering : true});
        
    }
    handleMouseLeave() {
            this.setState({
                isHovering : false,
                isListHovering : false
            });           
    }
    getMincartData(getminiCartItems){
        const itemTypes =  Object.keys(getminiCartItems);
        let miniCart = [];
        for(let i in itemTypes){
            miniCart.push(getminiCartItems[itemTypes[i]].map((item,index) => {
            return(
                <div className="grid mini-cart__prod" key={index}>
                    <a href="#" className="grid__third">
                        <img className="img-fill-responsive" src="//images.woolworthsstatic.co.za/Foil-Print-Cut-Out-T-Shirt-.jpg?o=ky7G37knlsBuZ7NRGsI3YVIjHkMj&V=KlBQ&w=350" alt="Modern Pea Coat"/>
                    </a>
                    <div className="grid__two-thirds">
                        <a href="#" className="link--silent">{item.productDisplayName}</a>
                        <ul className="list--silent">
                            <li className="mini-cart__price">From:
                            <span className="price">
                            <span className="currency" itemprop="priceCurrency" content="ZAR">R</span>
                            <span itemprop="price" content="99.00">{item.priceInfo.amount}</span>
                            </span>
                            </li>
                            <li>Qty: {item.quantity}</li>
                            <li>Colour: 
                                <img className="colour-swatch" src="//images.woolworthsstatic.co.za/swatch-X-WHITE-6009207121710.jpg?o=xkQwnqToQkUEO1pVZ2a6H33Q5fsj&V=@AfR&w=16" title="x white" alt="x white" />
                            </li>
                            <li className="text-xsmall">Size:{item.size}</li>
                        </ul>
                    </div>
                </div>
            );
        }));
        } 
        return miniCart; 
        
        
    }
    getDiscount(){
        if(this.state.orderSummary.shippingAdjusted === true){
            return(<li>Estimated delivery cost:
                <span className="price">
                <span className="currency">R</span>{this.state.orderSummary.estimateDelivery}</span>
            </li>);
        } else{return null}    
    }
    getMiniCartSummary(){
    
        return(
            <div className="mini-cart__summary">
                 <ul className="list--silent">
                    <li>
                        <strong>{this.state.orderSummary.totalItemsCount} items</strong>
                    </li>
                    <li>Estimated basket total:
                        <span className="price">
                        <span className="currency">R</span>{this.state.orderSummary.basketTotal}</span>
                    </li>
                        {this.getDiscount()}
                  </ul>  
            </div>
        )
    }
    getbuttonLinks() {
        return(
            <div className="mini-cart__ctas">
                <div className="mini-cart__cta">
                    <a href="#" className="btn btn--secondary btn--right btn--block">Edit cart</a>
                </div>
                <div className="mini-cart__cta">
                    <a href="#" className="btn btn--secondary btn--right btn--block">Checkout</a>
                </div>
            </div>
        )
    }
    generateCartDiv() {
        return(
            <div className="mini-cart fly-out is-open" data-js="fly-out" data-fly-out-type="click" data-fly-out-pos="right">
                <span className="text-xsmall main-header-nav__label">My Cart</span>
                <a href="#" className="nav-list-x__link link--silent">
                <strong className="font-graphic text-small main-header-nav__title">Checkout</strong>
                </a>
                <a href="#" className="fly-out__toggle badge__cart" data-js="fly-out-toggle" >
                <span className="icon icon--cart-white inline-block-visible--mobi-max"></span>
                <span className="icon icon--cart badge__cart-cart inline-block-hidden--mobi-max"></span>
                {this.state.orderSummary && this.state.orderSummary.totalItemsCount ?  <span className="badge__cart-count">{this.state.orderSummary.totalItemsCount}</span> : " "  }
                </a>
                {
                    this.state.isListHovering &&
                    <div className="mini-cart__contents fly-out__content fly-out__content--right" data-js="fly-out-content" style={{marginTop: "0px"}} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>                        
                        {this.state.orderSummary && this.state.orderSummary.totalItemsCount ? (this.state.isListHovering && this.generateFlyOutProdDiv()) :  (this.state.isListHovering && this.generateFlyOutNonProdDiv()) }
                    </div>
                }
            </div>
        );
    }
    generateFlyOutProdDiv(){
        return (<div data-js="mini-cart-carousel">
                                {this.getMincartData(this.state.miniCartItems)}    
                                {this.getMiniCartSummary()}
                                {this.getbuttonLinks()}
                            
                </div>);
    }
    generateFlyOutNonProdDiv() {
        return (<div className="panel panel--silent panel--padded font-graphic">Free delivery for first time shoppers.</div>);
    }
    render(){
        return(
            <li className="nav-list-x__item main-header-nav__item nav-list-x--space main-header-nav__mini-cart child-is-open" onMouseEnter={this.handleMouseListEnter}
             onMouseLeave={()=>{setTimeout(function() {this.state.isHovering === false ? this.handleMouseLeave() : this.handleMouseEnter() }.bind(this), 3000);}}
             >
                { this.generateCartDiv()  }
            </li>
        );
    }
}
export default CartCheckout;