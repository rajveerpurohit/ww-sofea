import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Image from '../../components/basic/Image';
import SocialLinks from '../../components/basic/social-links';
import SideBarComponent from '../../components/basic/SideBarContent';
import Dropdown from '../../components/basic/Dropdown';
import AddItemToCart from '../../components/basic/add-item-to-cart';
import { DEFAULT_ITEM_QUANTITY, ALLOWED_ITEM_QUANTITY_LIST } from '../../Constants';
import { getProductPriceInfo, getProductInventory } from '../pdp/actions';
import TableHeader from '../pdp/product-common/generic-table-header';


class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsToAddToCart: props.contentData.Recipe.completeProductList.map(product => product), // props.contentData.Recipe.recipeIngredients.map(product => _.get(product, 'ingredient.products[0]', {})),
      isPriceSet: false,
      isQuantitySet: false,
      currentSuburb: _.get(props, 'currentUser.suburb.id', '')
    };
    this.renderRecipeImageContainer = this.renderRecipeImageContainer.bind(this);
    this.renderRecipeDetails = this.renderRecipeDetails.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
    this.renderCookingInstructions = this.renderCookingInstructions.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderIngredientsProductList = this.renderIngredientsProductList.bind(this);
    this.renderProductSocialLinksElm = this.renderProductSocialLinksElm.bind(this);

    this.trackAddRemoveAnalytics = this.trackAddRemoveAnalytics.bind(this);
  }
  componentDidMount() {
    const productList = this.props.contentData.Recipe.completeProductList.map(product => product.skuId); // this.props.contentData.Recipe.recipeIngredients.map(product => _.get(product, 'ingredient.products[0].skuId', ''));
    this.props.getProductPriceInfo(productList);
    const storeIds = _.get(this.props, 'currentUser.storeIds', []);
    const suburbId = _.get(this.props, 'currentUser.suburb.id', '');
    if (!_.isEmpty(suburbId) || _.isEmpty(this.props.inventories)) {
      const inventoryStores = _.uniq(_.map(storeIds, store => store));
      inventoryStores.pop();
      this.props.getProductInventory(productList, inventoryStores);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { productsToAddToCart, isPriceSet, isQuantitySet, currentSuburb } = this.state;
    const temp = Object.assign({}, productsToAddToCart);
    const { productPrices, inventories, currentUser } = nextProps;
    const suburbId = _.get(currentUser, 'suburb.id', '');
    const storeIds = _.get(currentUser, 'storeIds', []);
    const newStates = {};

    if (!_.isEmpty(suburbId) && !_.isEmpty(currentSuburb) && currentSuburb !== suburbId) {
      newStates.currentSuburb = suburbId;
      const inventoryStores = _.uniq(_.map(storeIds, store => store));
      inventoryStores.pop();
      const productList = this.props.contentData.Recipe.completeProductList.map(product => product.skuId);
      this.props.getProductInventory(productList, inventoryStores);
    }

    if (!isPriceSet && !_.isEmpty(productPrices)) {
      const productWisePrice = nextProps.productPrices;
      _.map(temp, (product) => {
        const productPriceDetails = productWisePrice[product.productId];
        const productPrice = productPriceDetails[nextProps.currentUser.priceListId].skuPrices[product.productId].SalePrice;
        product.price = productPrice;
      });

      newStates.isPriceSet = true;
      newStates.productsToAddToCart = temp;
    }
    if ((!isQuantitySet && !_.isEmpty(inventories) && storeIds) || !suburbId || (currentSuburb !== suburbId)) {
      _.map(temp, (product) => {
        if (suburbId && inventories && storeIds) {
          const { fulfillerType, skuId } = product;
          const store = storeIds[fulfillerType];
          const skuIn = inventories[skuId];
          const quantity = _.min([_.get(skuIn, store, 0), 99]);
          product.options = _.min([_.get(skuIn, store, 0), 99]);
          product.quantity = (quantity && DEFAULT_ITEM_QUANTITY) || 0;
        } else {
          product.options = ALLOWED_ITEM_QUANTITY_LIST;
          product.quantity = DEFAULT_ITEM_QUANTITY;
        }
      });

      newStates.isQuantitySet = true;
      newStates.productsToAddToCart = temp;
    }

    if (!_.isEmpty(newStates)) this.setState(newStates);
  }

  setQuantity(e, pId) {
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
    const { productsToAddToCart } = this.state;
    const newList = _.reject(data.items, ({ quantity }) => !quantity);
    if (newList.length) this.props.addItemToCart({ ...data, items: newList });
  }

  handleDelete = (pId) => {
    const { productsToAddToCart } = this.state;
    const newList = _.reject(productsToAddToCart, ({ productId }) => (productId === pId));
    this.setState({ productsToAddToCart: newList });
  };

  trackAddRemoveAnalytics() {
    return _.map(this.state.productsToAddToCart, (prod) => {
      const pdpURL = _.get(prod, 'pdpURL', '');
      const category = pdpURL.split('/').slice(2, -3);

      return {
        sku: prod.skuId,
        id: prod.productId,
        name: prod.displayName,
        price: prod.price,
        quantity: prod.quantity,
        category: category.join('/')
      };
    });
  }

  renderRecipeDetails = (contentData) => {
    return (
      <div className="recipeDetails">
        <header>
          <h1 className="text-caps font-graphic">
            {contentData.displayName}
          </h1>
        </header>
        <table cellSpacing={0} cellPadding={0} width="100%" className="table table--border-rows">
          <tbody>
            {contentData.Recipe && contentData.Recipe.recipeDetails ?
              Object.keys(contentData.Recipe.recipeDetails).map((key, i) => {
                return key === 'recipeAuthors' ?
                  <tr key={i}>
                    <td><strong>Recipe By</strong>:</td>
                    <td>{contentData.Recipe.recipeDetails[key].map(auth => auth.displayName)}</td>
                  </tr>
                  :
                  <tr key={i}>
                    <td><strong>{key}</strong>:</td>
                    <td>{contentData.Recipe.recipeDetails[key]}</td>
                  </tr>;
              }) : null
            }
          </tbody>
        </table>
      </div>
    );
  };
  renderIngredients = (ingredients) => {
    return (
      <section className="ingredients">
        <h3 className="text-caps font-graphic">Ingredients</h3>
        <ul className="list list--silent text-medium">
          {
            ingredients.map((ingredient, index) => <li key={index} className="list__item">{ingredient.ingredient.displayName}</li>)
          }
        </ul>
      </section>
    );
  };
  renderCookingInstructions = (instructions) => {
    return (
      <section className="cookingInstructions">
        <h3 className="text-caps font-graphic">Cooking Instructions</h3>
        <div itemProp="recipeInstructions" className="text-medium" dangerouslySetInnerHTML={{ __html: instructions }} />
        {// social links goes here
          this.renderProductSocialLinksElm()
        }
      </section>
    );
  };

  renderRecipeImageContainer = () => {
    const { contentData } = this.props;
    const imageData = {
      url: contentData.Recipe ? contentData.Recipe.image && contentData.Recipe.image.internalImage : '',
      alt: contentData.Recipe ? contentData.Recipe.recipeTitle : '',
      className: 'img-fill-responsive',
    };
    return (
      <div className="recipeMainImage">
        {imageData.url.indexOf('www.youtube.com') >= -1 || imageData.url.indexOf('youtu.be') >= -1 ?
          <span>
            <Image payload={imageData} />
            <div className="imageCaption text-intro" />
            <div className="promoDetailWrapper" />
          </span>
          :
          <span style={{ color: '#000000' }}>
            <iframe height={315} src={imageData.url} frameBorder={0} width={560} allowFullScreen />
          </span>
        }
      </div>
    );
  };
  renderIngredientsProductList = (products) => {
    const items = [];
    const { DeliveryLocation } = this.props;
    return (
      <table cellSpacing={0} cellPadding={0} className="purchases__table table table--border-rows">
        <thead>
          <TableHeader listType="recipeIngredients" />
        </thead>
        <tbody >
          {_.map(products, (product) => {
            const productId = _.get(product, 'productId', '');
            const productUrl = _.get(product, 'pdpURL', '');
            const price = _.get(product, 'price', 0);
            const quantity = _.get(product, 'quantity', 0);
            const options = _.get(product, 'options', 0);
            const payload = {
              url: _.get(product, 'media.internalImage', ''),
              className: 'product-card__img lazyloaded',
              title: product.productDisplayName,
              alt: product.productDisplayName,
              externalUrl: _.get(product, 'media.externalImage', '')
            };
            items.push({
              productId,
              skuId: _.get(product, 'skuId', ''),
              quantity: 2
            });
            return (
              <tr key={productId} className={`prod_row_${productId}`}>
                <td className="purchases__table-item">
                  <figure className="flush-m">
                    <div className="border--weight-thin text-align-center text-space">
                      <div className="display-inline-block">
                        {/* PRODUCT IMAGE */}
                        <figure className="flush-m">
                          <Link rel={productId} id={`img_link_${productId}`} to={productUrl}>
                            <Image payload={payload} />
                            {/* <img src={`//images.woolworthsstatic.co.za/${product.displayName}-${product.productId}.jpg?w=350`} itemProp="image" title={product.displayName} alt={product.displayName} className="product-card__img lazyloaded" /> */}
                          </Link>
                        </figure>
                        {/* END PRODUCT IMAGE */} {/* END PRODUCT IMAGE */}
                      </div>
                    </div>
                  </figure>
                  <div className="display-inline-block text-space">
                    <strong>
                      <Link to={productUrl}>
                        <span id={`product_name_${productId}`} className="productName"> {product.displayName}</span>	</Link>
                      <br />
                    </strong> {/* mobile view */} {/* PRODUCT DETAILS */}
                    <strong>
                      <Link id="product_name_20111670" to={productUrl} className="link--silent productName">
                        <br />
                      </Link>
                    </strong>
                    <span className="display-none--mobi-max">Product Code:<br />{productId}</span> {/* END PRODUCT DETAILS */}
                  </div>
                </td>
                <td>
                  {/* QTY */}
                  <div className="product-qty">
                    <Dropdown
                      id={productId}
                      name={productId}
                      onChange={e => this.setQuantity(e, productId)}
                      options={_.isArray(options) ? options : _.range(1, options + 1)}
                      selectedValue={options === 0 ? 'Qty' : product.quantity || 1}
                      disabled={options === 0}
                      classNames={`quantitySelected ${productId}`}
                    />
                  </div>
                  {/* END QTY */}
                </td>
                <td className id="productPriceID" name="productPriceID">
                  {/* PRICE */}
                  <span className="price" id={`price_${productId}`}>
                    <span className="currency" itemProp="priceCurrency" content="ZAR" />
                    <span className="price">R {price}</span>
                  </span>
                  {/* END PRICE */}
                </td>
                <td>
                  <span rel={`${productId}`} className="icon icon--close-circ-dark removeItemIngredient" onClick={() => this.handleDelete(productId)} title="remove item">&nbsp;</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  renderProductSocialLinksElm = () => {
    const { contentData } = this.props;
    const displayName = contentData.displayName;
    const mediaImage = contentData.Recipe.image && contentData.Recipe.image.internalImage;
    if (typeof window !== 'undefined' && window) {
      const location = 'http://' + window.location.host + mediaImage;

      const config = {
        url: '',
        text: displayName,
        media: [location]
      };

      if (typeof window !== 'undefined' && window) {
        config.url = window.location.href;
      }

      return (
        <SocialLinks
          twitter={config}
          pinterest={config}
          facebook={config}
        />
      );
    }
  };


  render() {
    const { contentData, contentAside, DeliveryLocation, loader, user, currentUser, addItemToCart, DeliveryAreaData, postDeliveryArea, removeItemFromCart } = this.props;
    const miniCartData = _.get(this.props, 'miniCartData.miniCartData', {});
    return (
      <main className="grid grid--space-y site-main" >
        <div className="main-page site-map-content">
          <nav className="breadcrumb empty" />
          <div className="grid grid--space-y page-layout">
            <div className="page-layout__aside">
              {contentAside ? <SideBarComponent leftData={contentAside} /> : null}
            </div>
            <div className="page-layout__content">
              {/* RECIPE */}
              <div className="grid" itemScope itemType="http://schema.org/Recipe">
                <div className="grid__fourth--medium">
                  <div className="grid">
                    {contentData ? this.renderRecipeImageContainer() : null}
                  </div>
                  {/* END RECIPE HEADER */}
                </div>
                <div className="grid__three-fourths--medium">
                  {/* RECIPE DETAILS */}
                  {contentData ? this.renderRecipeDetails(contentData) : null}
                  {/* END RECIPE DETAILS */}
                </div>
              </div>
              <div className="grid grid--space-y">
                {/* COOKING INSTRUCTIONS */}
                <div className="grid__fourth--medium">
                  {contentData && contentData.Recipe ? this.renderIngredients(contentData.Recipe.recipeIngredients) : null}
                  <p className="text-xsmall">Woolworths is committed to sustainability via our good business journey. Seasonal (and other) products might not always be in stock.</p>
                </div>
                <div className="grid__three-fourths--medium">
                  {contentData && contentData.Recipe ? this.renderCookingInstructions(contentData.Recipe.method) : null}
                </div>
                {/* END COOKING INSTRUCTIONS */}
              </div>
              <div className="grid">
                {/* RECIPE PRODUCTS */}
                <div className="recipeAdditional">
                  <h2 className="text-caps font-graphic">Buy the ingredients</h2>
                  <div className="tableWrapper">
                    <h3 className="text-caps font-graphic">What to buy</h3>
                    <form method="post" name="rangeProducts" action="/store/fragments/recipe/?_DARGS=/store/fragments/recipe/recipe-products.jsp.1#" id="rangeProducts">

                      {contentData && contentData.Recipe && contentData.Recipe.recipeIngredients ? this.renderIngredientsProductList(this.state.productsToAddToCart) : null}

                    </form>
                  </div>
                  <div className="grid grid--space-y text-align-right">
                    {/* <a data-modal-classes="modal__box--panel modal__box--size-w-medium" data-js="modal-toggle" data-modal-head="Select your delivery location" data-modal-target="/store/fragments/pages/popups/popup-index.jsp?content=delivery-locations/ww/delivery-locations&productId=6009175398916&selectionArea=changeQuantityAddSuburb&content=delivery-locations/delivery-locations&catalogRefId=&actionURI=/store/cartridges/PageSlot/PageSlot.jsp" href="" data-modal-type="load" className="btn btn--primary btn--right" data-modal-overlay="true">
                      Add to cart </a> */}
                    <AddItemToCart
                      qtyList
                      user={user}
                      currentUser={currentUser}
                      loader={loader}
                      productInfo={_.map(this.state.productsToAddToCart, prod => prod)}
                      addItemToCart={this.addItemToCart}
                      DeliveryAreaData={DeliveryAreaData}
                      DeliveryLocation={DeliveryLocation}
                      postDeliveryArea={postDeliveryArea}
                      removeItemFromCart={removeItemFromCart}
                      cartDetails={miniCartData}
                      trackAddToCart={this.trackAddRemoveAnalytics}
                    />
                  </div>
                </div>
                {/* END RECIPE PRODUCTS */}
              </div>
              {/* END RECIPE */}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    productPrices: state.pdp.productPrices,
    inventories: state.pdp.inventories,
    miniCartData: state.headerReducer.miniCartReducer
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProductPriceInfo, getProductInventory }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Recipe);
