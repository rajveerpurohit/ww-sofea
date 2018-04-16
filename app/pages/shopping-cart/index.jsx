import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';
import { bindActionCreators } from 'redux';
import OtpModel from '../../pages/otp/otpModel';
import { SEOTags } from '../../utils/seoUtils';
import GiftWithPurchase from './gift-with-purchase';
import Accordion from '../../components/basic/accordion';

import {
  addItemToCart,
  updateItemQty,
  removeCommerceItemFromCart,
  removeGroupItemsFromCart,
  removeAllItemsFromCart,
  getUserAddresses,
  createNewShoppingList,
  addGroupOfItemsToShoppingList,
  applyVoucher,
  revokeVoucher,
  selectGiftWithPurchase
} from '../../components/compound/cart-action-panel/actions';

import { ALLOWED_ITEM_QUANTITY_LIST } from '../../Constants';
import ServiceUtil from '../../services/serviceUtil';

import { loader } from '../../actions/common';
import { getProductInventory } from '../pdp/actions';
import TableHeader from '../pdp/product-common/generic-table-header';


import { getCartData } from '../../components/sections/Header/actions';
import { postDeliveryArea } from '../../components/basic/delevery-model/actions';
import Image from '../../components/basic/Image';
import ShoppingListDropdown from '../../components/basic/shopping-list-dropdown';
import Dropdown from '../../components/basic/Dropdown';
import ProductPrice from '../../components/basic/product-price';
import { setUserSession } from '../../components/compound/signin/actions';
import Vouchers from './vouchers';

import { tagRemoveFromCart } from '../../gtm/gtmActions';

class CartPage extends Component {
  static need = [
    // getCartData
  ]

  constructor(props) {
    super(props);
    this.state = {
      isQuantitySet: false,
      showLoader: false,
      isCartFetching: true,
      cartItems: props.miniCartData.miniCartData.items || {}, // _.get(props, 'miniCartData.miniCartData.items', {})
      modalActive: false
    };
    this.renderModal = this.renderModal.bind(this);
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.addGroupOfItemsToShoppingList = this.addGroupOfItemsToShoppingList.bind(this);
    this.createNewShoppingList = this.createNewShoppingList.bind(this);
    this.removeSingleItemFromCart = this.removeSingleItemFromCart.bind(this);
    this.removeGroupItemsFromCart = this.removeGroupItemsFromCart.bind(this);
    this.removeAllItemsFromCart = this.removeAllItemsFromCart.bind(this);
    this.changeItemQty = this.changeItemQty.bind(this);

    this.trackRemoveFromCart = this.trackRemoveFromCart.bind(this);

    this.renderVoutchers = this.renderVoutchers.bind(this);
    this.renderItemTypeTable = this.renderItemTypeTable.bind(this);
    this.renderGenericTableHeader = this.renderGenericTableHeader.bind(this);
    this.renderProductRows = this.renderProductRows.bind(this);
    this.renderCartContainer = this.renderCartContainer.bind(this);
    this.renderMessegeNote = this.renderMessegeNote.bind(this);
    this.renderSideContainer = this.renderSideContainer.bind(this);
    this.renderBasketSummary = this.renderBasketSummary.bind(this);
    this.renderGWP = this.renderGWP.bind(this);
    this.renderDiscount = this.renderDiscount.bind(this);
  }
  componentWillMount() {
    // this.props.getCartData();


    this.props.getCartData().then(() => {
      const skuIds = _.get(this.props, 'miniCartData.miniCartData.skuIds', []);
      const { currentUser } = this.props;
      const storeIds = _.get(currentUser, 'storeIds', []); // currentUser;
      const inventoryStores = _.uniq(_.map(storeIds, store => store));
      inventoryStores.pop();
      this.props.getProductInventory(skuIds || [], inventoryStores);
      this.setState({ isCartFetching: false });
    });
  }
  componentDidMount() {
    // const skuIds = _.get(this.props, 'miniCartData.miniCartData.skuIds', []);
    // this.props.getProductInventory(skuIds || []).then(() => {
    //   this.setState({ isInventory: false });
    // });


    // this.props.getCartData().then(() => {
    //   const skuIds = _.get(this.props, 'miniCartData.miniCartData.skuIds', []);
    //   this.props.getProductInventory(skuIds || []);
    // });
  }
  componentWillReceiveProps(nextProps) {
    const { isQuantitySet, isInventory } = this.state;
    const cartItems = nextProps.miniCartData.miniCartData.items || this.state.cartItems;
    const temp = Object.assign({}, cartItems);
    const { inventories, currentUser } = nextProps;
    const suburbId = _.get(currentUser, 'suburb.id', '');
    const storeIds = _.get(currentUser, 'storeIds', []); // currentUser;
    if (!_.isEmpty(temp) && inventories) {
      _.map(temp, items => items.map((product) => {
        if (suburbId) {
          const { fulfillerType, catalogRefId } = product;
          const store = storeIds[fulfillerType];
          const skuIn = inventories[catalogRefId];
          product.options = _.min([_.get(skuIn, store, 0), 99]);
        } else {
          product.options = ALLOWED_ITEM_QUANTITY_LIST;
        }
      }));
    }

    this.setState({ isQuantitySet: true, cartItems: temp });
  }
  createNewShoppingList(listName) {
    this.props.loader(true);
    this.props.createNewShoppingList(listName);
  }

  addGroupOfItemsToShoppingList(shoppingListId, commerceItemType, listType) {
    const item = {
      giftListId: shoppingListId,
      giftListType: listType,
      addCommerceItemGroupToList: 'true',
      currentCommerceItemGroupType: commerceItemType
    };
    this.props.addGroupOfItemsToShoppingList(item);
  }

  trackAddRemoveAnalytics(products) {
    return _.map(products, (product) => {
      const splat = _.get(product, 'productseoURL', '');
      const category = splat.split('/').slice(2, -3);
      const { listPrice, salePrice } = product.priceInfo;

      return {
        name: product.productDisplayName,
        price: _.compact([listPrice, salePrice]),
        brand: product.brandName,
        category: category.join('/'),
        variant: null,

        id: product.productId,
        sku: product.catalogRefId,
        quantity: product.quantity
      };
    });
  }

  trackRemoveFromCart(cid) {
    const items = _.get(this.props, 'miniCartData.miniCartData.items', {});
    let product;

    _.some(items, (item) => {
      product = _.find(item, itm => (itm.id === cid));

      if (product) {
        this.props.tagRemoveFromCart(this.trackAddRemoveAnalytics([product]));
      }

      return product;
    });
  }

  removeSingleItemFromCart(evt, productId) {
    evt.preventDefault();
    if (productId) {
      const data = {
        commerceItemId: String(productId)
      };

      this.trackRemoveFromCart(productId);
      this.props.removeCommerceItemFromCart(data);
    }
  }

  removeGroupItemsFromCart(evt, groupType) {
    evt.preventDefault();
    if (groupType) {
      const items = _.get(this.props, `miniCartData.miniCartData.items[${groupType}]`, []);
      const data = {
        currentCommerceItemGroupType: String(groupType)
      };

      if (items.length) this.props.tagRemoveFromCart(this.trackAddRemoveAnalytics(items));
      this.props.removeGroupItemsFromCart(data);
    }
  }

  removeAllItemsFromCart(evt) {
    evt.preventDefault();

    const items = _.get(this.props, 'miniCartData.miniCartData.items', {});
    const products = _.flatMap(items);

    if (products.length) this.props.tagRemoveFromCart(this.trackAddRemoveAnalytics(products));
    this.props.removeAllItemsFromCart();
  }

  changeItemQty(evt, product) {
    const data = {
      quantity: Number(evt.target.value)
    };
    this.props.updateItemQty(
      {
        data,
        commerceItemId: product.id
      }
    );
  }
  activateModal() {
    this.setState({ modalActive: true });
  }
  deactivateModal() {
    this.setState({
      modalActive: false
    });
  }
  renderProductRows(product) {
    const { options, productId, internalImageURL, priceInfo, externalImageURL, productDisplayName } = product;

    const payload = {
      url: internalImageURL,
      externalUrl: externalImageURL,
      className: 'border--weight-thin lazyloaded',
      title: product.productDisplayName,
      alt: product.productDisplayName
    };
    const { listPrice, promoPrice, simplePromotion, wasPrice } = priceInfo;
    // const sale = simplePromotion ? listPrice + promoPrice : listPrice;

    return (
      <tr>
        <td>
          <figure className="flush-m">
            <Link rel={product.productId} id={product.productId} to={product.productseoURL} className="border--colour-grey">
              <Image payload={payload} />
            </Link>
          </figure>
          <div>
            <Link to={product.productseoURL}>
              <strong id={`product_name_${product.productId}`}>{product.productDisplayName}</strong><br />
            </Link>
            <span className="show-on-mobi" id="productPriceID" name="productPriceID">
              {/* PRICE */}
              From:
              <ProductPrice
                classes="price"
                ids={`price_${product.productId}`}
                salePrice={listPrice}
                listPrice={wasPrice}  // {sale === listPrice ? 0 : sale}
              />
            </span>
            <span>	Product Code:<br />{product.catalogRefId}<br />
            </span>
          </div>
          <div id={`promotion_${product.productId}`} className="font-graphic text-save margT" />
          <div className="mobiQuantityPrice show-on-mobi">
            <div className="productColourSize">
              {/* QTY */}
              <div id="qtyContainer" name="qtyContainer">

                <div className="customSelect" id={`uniform-${product.productId}_mobile`}>
                  <Dropdown
                    id={`${product.catalogRefId}_mobile`}
                    name={`${product.catalogRefId}_mobile`}
                    onChange={e => this.changeItemQty(e, product)}
                    options={_.isArray(options) ? options : _.range(1, options + 1)}
                    selectedValue={options === 0 ? 'Qty' : product.quantity || 1}
                    disabled={options === 0}
                    classNames={`quantitySelected ${product.catalogRefId}`}
                  />
                </div>
              </div>
              <span id="qtyContainer">
                <Image
                  payload={{
                    url: product.internalSwatchImage,
                    externalUrl: product.externalSwatchImageURL,
                    alt: product.color,
                    title: product.color,
                    className: 'colour-swatch'
                  }}
                />
              </span>
              <span id="qtyContainer">
                &nbsp;
                {product.size !== 'NO SZ' ? `Size: ${product.size}` : ''}
              </span>
            </div>
            <div>
              <section className="productPromotions">{product.promotions ? product.promotions : ''}</section>
            </div>
          </div>
        </td>
        <td className="hide-on-mobi" />
        <td className="hide-on-mobi">
          {/* QTY */}
          <div id="qtyContainer" name="qtyContainer">
            <div className="customSelect" id={`uniform-${product.productId}`}>

              <Dropdown
                id={`${product.catalogRefId}_mobile`}
                name={`${product.catalogRefId}_mobile`}
                onChange={e => this.changeItemQty(e, product)}
                options={_.isArray(options) ? options : _.range(1, options + 1)}
                selectedValue={options === 0 ? 'Qty' : product.quantity || 1}
                disabled={options === 0}
                classNames={`quantitySelected ${product.catalogRefId}`}
              />
            </div>
          </div>

        </td>
        <td className="hide-on-mobi productColours floatL" wrap="nowrap">
          <Image
            payload={{
              url: product.internalSwatchImage,
              externalUrl: product.externalSwatchImageURL,
              alt: product.color,
              title: product.color,
              className: 'colour-swatch'
            }}
          /> {product.size !== 'NO SZ' ? product.size : ''}
        </td>
        <td className="hide-on-mobi" nowrap="nowrap">

          <ProductPrice
            classes="font-graphic price"
            ids={`price_${product.productId}`}
            salePrice={listPrice}
            listPrice={wasPrice}  // {sale === listPrice ? 0 : sale}
            split
          />
        </td>
        <td className="price" nowrap="nowrap">
          <ProductPrice price={product.priceInfo.amount} />
          <br />
          {product.priceInfo.itemSavings ? (
            <span className="text-save text-caps font-graphic">
              <strong>You saved:<br /><ProductPrice price={product.priceInfo.itemSavings} /></strong>
            </span>
          ) : null}
        </td>
        <td>
          <Link className="removeItem" onClick={e => this.removeSingleItemFromCart(e, product.id)} to="" title="remove item">x</Link>
        </td>
      </tr>
    );
  }
  renderGWP(gwpSelections) {
    const giftsAccordianCategories = [];
    gwpSelections.map((gwpSelection) => {
      if (gwpSelection.quantityAvailableForSelection >= 1) {
        giftsAccordianCategories.push({
          name: gwpSelection.promtionDisplayName,
          details: <GiftWithPurchase gwpData={gwpSelection} selectGiftWithPurchase={this.props.selectGiftWithPurchase} />,
          isReactNode: true
        });
      }
    });
    if (!_.isEmpty(giftsAccordianCategories)) {
      return (
        <span id="giftPlaceHolders">
          <div className="grid">
            <div className="accordionWrapper">
              CHOOSE YOUR FREE GIFT
              <br /><br />
              <Accordion active={5} refinedData={giftsAccordianCategories} />
            </div>
          </div>
        </span>
      );
    }
  }
  renderItemTypeTable() {
    // const cartItems = this.props.miniCartData.miniCartData.items || {};
    const { cartItems } = this.state;
    const groupSubTotal = this.props.miniCartData.miniCartData.groupSubTotal || {};
    const { productInfo, user, currentUser } = this.props;
    const gwpSelections = _.get(this.props, 'miniCartData.miniCartData.gwpSelections', []);
    const commerceItemRenderingOrder = [
      'premiumFlowerCommerceItem',
      'homeCommerceItem',
      'foodCommerceItem',
      'premiumBrandCommerceItem',
      'clothingCommerceItem',
      'giftCard',
      'default'
    ];
    return (
      <span id="basketSummaryItems">
        {
          commerceItemRenderingOrder.map((item) => {
            if (_.get(cartItems, item)) {
              return (
                <table cellSpacing={0} cellPadding={0} border={0} width="0%">
                  <thead>
                    {this.renderGenericTableHeader(item)}
                  </thead>
                  <tbody>
                    {cartItems[item].map(product => this.renderProductRows(product))}
                  </tbody>
                  {/* SUB TOTALS */}
                  <tfoot className="basketSummeryTotals">
                    <tr>
                      <td colSpan={6} nowrap="nowrap">
                        <Link className="arrowLink" to="" onClick={e => this.removeGroupItemsFromCart(e, item)}>Remove all items</Link>
                        <span id="shoppingList_clothingCommerceItem" className="shoppingListCommerceWrapper">
                          <div id="shoppingList">
                            <ShoppingListDropdown
                              user={user}
                              currentUser={currentUser}
                              loader={this.props.loader}
                              productInfo={{ ...cartItems[item], item }}
                              addGroupOfItemsToShoppingList={{
                                addGroupOfItemsToShoppingList: this.addGroupOfItemsToShoppingList,
                                currentCommerceItemGroupType: item,
                                shoppingList: 'shoppingList'
                              }}
                              createNewShoppingList={this.createNewShoppingList}
                            />
                          </div>
                        </span> {/* END PRODUCT ADD TO LIST */}
                        <div className="subTotal textR margR price">
                          {ServiceUtil.getLabel(this.props.labels, 'global-minicartpopup-sub-total-label')}
                          <ProductPrice price={groupSubTotal[item]} />
                        </div>
                        {/* <div className="subTotal textR margR price">Sub-total: R {groupSubTotal[key].toFixed(2)}</div> */}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              );
            }
          })
        }
        {!_.isEmpty(gwpSelections) && this.renderGWP(gwpSelections)}
        <br />
      </span>
    );
  }
  renderGenericTableHeader(itemType) {
    let keyLabel = '';
    switch (itemType) {
      case 'clothingCommerceItem': keyLabel = 'CLOTHING';
        break;
      case 'foodCommerceItem': keyLabel = 'FOODS';
        break;
      case 'giftCard': keyLabel = 'GIFT CARDS';
        break;
      case 'homeCommerceItem': keyLabel = 'HOME';
        break;
      default: keyLabel = 'GENERAL';
    }
    return (
      <TableHeader listType="shoppingCart" groupHeading={keyLabel} />
    );
  }
  renderMessegeNote(messeges) {
    return (
      <section className="noteWrapper">
        {
          _.map(messeges, (messege) => {
            if (typeof messege === 'object') {
              this.renderMessegeNote(messege);
            }
            return (
              <p className="note" style={{ marginBottom: 12 + 'px' }}>
                {messege}
              </p>
            );
          })
        }
      </section>
    );
  }
  renderVoutchers(vouchers) {
    const appliedVouchersError = _.get(this.props, 'miniCartData.miniCartData.appliedVouchersError', []);
    return (
      <span id="onlineVouchers">
        <h1 style={{ fontSize: '90%' }}>MY PERSONALISED VOUCHERS</h1>
        <Vouchers
          vouchers={vouchers}
          applyVoucher={this.props.applyVoucher}
          revokeVoucher={this.props.revokeVoucher}
          appliedVouchersError={appliedVouchersError}
        />
      </span>
    );
  }
  renderSideContainer(miniCartData, labels) {
    const user = _.get(this.props, 'user.isLoggedIn', '');
    const synchronizeStatus = _.get(this.props, 'currentUser.synchronizeStatus', '');
    return (
      <aside>
        <Link to="" className="button continueToCheckout">
          {ServiceUtil.getLabel(labels, 'global-minicartpopup-go-to-checkout-label')}<span />
        </Link>
        <div id="basket-summary-widget">
          <section>
            <h3>{ServiceUtil.getLabel(labels, 'global-minicartpopup-total-label')}</h3>
            <table cellSpacing={0} cellPadding={0} border={0} width="0%">
              <tbody>
                <tr>
                  <td>{miniCartData.totalItemsCount} {ServiceUtil.getLabel(labels, 'global-minicartpopup-items-label')}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>{ServiceUtil.getLabel(labels, 'global-minicartpopup-total-basket-label')}</td>
                  <td>
                    <ProductPrice price={miniCartData.basketTotal} />
                  </td>
                </tr>
                <tr>
                  <td>{ServiceUtil.getLabel(labels, 'global-minicartpopup-est-delivery-label')}</td>
                  <td> TBC </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>{ServiceUtil.getLabel(labels, 'global-minicartpopup-total-label')}</td>
                  <td>
                    <ProductPrice price={miniCartData.total} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>
        </div>
        <span className="estimatedDiscount hidden">10%</span>
        { user && !synchronizeStatus ? <section className="wrewards">
          <h3 className="margB">Join <strong className="wrewards">W</strong>Rewards now for instant savings on over 1000 items every day.</h3>
          <p>
            <strong>Already a member?</strong>
            <br />
            <Link rel="fancybox" className="hide-on-mobi" onClick={this.activateModal}>Add your card to your profile</Link>
            <Link className="show-on-mobi">Add your card to your profile</Link>
          </p>
        </section> : ''}
        { user && synchronizeStatus ? <section className="wrewards">
          <h3>WRewards members get instant savings on selected items.</h3>
          <h3>Pay with your Woolies Store or Credit Card and get an extra 5% off.</h3>
        </section> : ''}
        { !user ? <section className="wrewards">
          <h3 className="margB">Join <strong className="wrewards">W</strong>Rewards now for instant savings on over 1000 items every day.</h3>
          <Link rel="fancybox" className="hide-on-mobi" onClick={this.activateModal}>More info</Link>
        </section> : ''}

        <div className="hide-on-mobi">
          <section>
            <p> {ServiceUtil.getLabel(labels, 'global-minicartpopup-price-and-delivery-cost-label')}</p>
            <p>
              <strong>{ServiceUtil.getLabel(labels, 'global-minicartpopup-is-it-a-gift-label')}</strong>
              <br />
              {ServiceUtil.getLabel(labels, 'global-minicartpopup-able-to-choose-gift-label')}
            </p>
          </section>
        </div>
      </aside>
    );
  }
  renderDiscount(discountDetails) {
    return (
      <p style={{ marginBottom: 10, paddingBottom: 20, borderBottom: '1px solid #999999' }}>
        {
          Object.keys(discountDetails).map((key) => {
            if (discountDetails[key]) {
              return (
                <span className="price">
                  <br />{_.startCase(key)}&nbsp;:
                  <ProductPrice price={discountDetails[key]} />
                </span>
              );
            }
          })
        }
      </p>
    );
  }
  renderBasketSummary(miniCartData, labels) {
    const vouchers = _.get(this.props, 'miniCartData.miniCartData.vouchers', []);
    const discountDetails = _.get(this.props, 'miniCartData.miniCartData.discountDetails', {});
    const backToShoppingURL = _.get(this.props, 'currentUser.backToShoppingURL', '');

    return (
      <section className="tableWrapper">
        <form id="basketSummaryForm" className="wForm" method="post" action="/" name>
          {!_.isEmpty(vouchers) ? this.renderVoutchers(vouchers) : null}
          {this.renderItemTypeTable()}
          <span id="basketEstimatedTotal">
            <table cellSpacing={0} cellPadding={0} border={0} width="0%" className="basketSummaryTotals">
              <tbody>
                <tr>
                  <td>
                    <Link className="removeAllFromBasket" to="" onClick={this.removeAllItemsFromCart} >
                      {ServiceUtil.getLabel(labels, 'global-minicartpopup-remove-all-items-from-basket-label')}</Link>
                    <br />
                    {backToShoppingURL ?
                      <Link to={backToShoppingURL} className="removeAllFromBasket">
                        {ServiceUtil.getLabel(labels, 'global-minicartpopup-back-to-shopping-label')}
                      </Link>
                      : null}
                    <br />
                  </td>
                </tr>
                <tr>
                  <td nowrap="nowrap">
                    <div className="estimatedTotalWrapper">
                      <p className="estimatedTotal textR">
                        <br />{ServiceUtil.getLabel(labels, 'global-minicartpopup-total-label')}
                        <ProductPrice price={miniCartData.total} />&nbsp;
                      </p>
                      {!_.isEmpty(discountDetails) && this.renderDiscount(discountDetails)}
                      <br />
                      <p className="textR noMargT">
                        {this.props.user.isLoggedIn ?
                          <Link to="/checkout" className="button">{ServiceUtil.getLabel(labels, 'global-minicartpopup-go-to-checkout-label')}</Link>
                          :
                          <Link to="/login" className="button">{ServiceUtil.getLabel(labels, 'global-minicartpopup-go-to-checkout-label')}</Link>
                        }
                      </p>
                      <p className="textR">
                        <Link to="/" className="continueShopping moreLink">{ServiceUtil.getLabel(labels, 'global-checkout-continue-shopping-label')}</Link>
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </span>
        </form>
      </section>
    );
  }
  renderCartContainer(miniCartData) {
    const globalMessages = _.get(this.props, 'miniCartData.miniCartData.globalMessages', {});
    const { labels } = this.props;
    return (
      <section className="contentWrapper">
        <div className="contentContainer">

          <article className="checkout basketSummery">
            <span id="basketSummaryTotal">
              <header>
                <h1>{ServiceUtil.getLabel(labels, 'global-minicartpopup-basket-summary-label')}</h1>
                <p className="textR floatR noMargT">
                  <Link to="/" className="continueShopping moreLink">
                    {ServiceUtil.getLabel(labels, 'global-checkout-continue-shopping-label')}
                  </Link>
                </p>
              </header>
              {this.renderSideContainer(miniCartData, labels)}
              <div id="deliveryMessage">
                {this.renderMessegeNote(globalMessages)}
              </div>
            </span>
            {this.renderBasketSummary(miniCartData, labels)}
          </article>
        </div>
      </section>
    );
  }
  renderModal() {
    const user = _.get(this.props, 'user.isLoggedIn', '');
    if (user) {
      return <OtpModel pagetype="cart" deactivateModal={this.deactivateModal} />;
    }
    return (<AriaModal
        titleText="otpfancybox"
        className="fancybox-wrap fancybox-desktop fancybox-type-ajax"
        initialFocus="#otpfancybox"
        verticallyCenter
        onExit={this.deactivateModal}
    > <div className="modal__box modal__box--panel modal__box--size-w-large" tabIndex="-1">
      <Link className="icon icon--close-circ-dark modal__close" onClick={this.deactivateModal}>close
          </Link>
      <div className="modal__content">
        <div id="otpfancybox" className="modal-target is-open">
          <section className="checkout-fancybox">
            <h2>Why Get <strong>W</strong>Rewards?</h2>
            <hr />
            <p className="intro">Every day you'll <strong>save 10% instantly on over 1000 items</strong> throughout the store - from food and fashion, to homeware and beauty.<br />Pay with a Woolies Store or Credit Card and <strong>save an extra 5%</strong>.</p>
            <p><Link to="/registration">Register</Link> now to create your profile or <Link to="/login">login</Link> to your account.</p>
          </section>
        </div>
      </div>
    </div>
    </AriaModal>);
  }
  render() {
    const miniCartData = _.get(this.props, 'miniCartData.miniCartData.orderSummary', '');
    const miniCartItems = _.get(this.props, 'miniCartData.miniCartData.items', '');
    const productCount = _.get(this.props, 'miniCartData.miniCartData.productCountMap.totalProductCount');
    const { isCartFetching } = this.state;
    const SEOTagsData = _.get(this.props, 'SEOTags', {});
    return (
      <div className="siteContent forCheckout" role="main">
        {!_.isEmpty(SEOTagsData) &&
          <SEOTags
            title={SEOTagsData.title}
            metaKeywords={SEOTagsData.SEOTagsData}
            metaDescription={SEOTagsData.metaDescription}
          />
        }

        {
          productCount !== 0 ? this.renderCartContainer(miniCartData) : !isCartFetching ? (
            <section>
              <p>You have no items in your shopping cart.<br /></p>
              <p>Please <Link to="/" className="moreLink">{ServiceUtil.getLabel(this.props.labels, 'global-checkout-continue-shopping-label')}</Link></p>
            </section>
          ) : null
        }
        {
          this.state.modalActive ? this.renderModal() : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    miniCartData: state.headerReducer.miniCartReducer,
    currentUser: state.clp.currentUser,
    user: state.user,
    inventories: state.pdp.inventories,
    labels: state.labels.labelsAndErrorMessages.cart,
    SEOTags: state.common.seo.SEOTags.cart
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProductInventory,
      getCartData,
      addItemToCart,
      updateItemQty,
      removeCommerceItemFromCart,
      removeGroupItemsFromCart,
      removeAllItemsFromCart,
      getUserAddresses,
      createNewShoppingList,
      addGroupOfItemsToShoppingList,
      loader,
      postDeliveryArea,
      setUserSession,
      applyVoucher,
      revokeVoucher,
      selectGiftWithPurchase,

      tagRemoveFromCart
    }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(CartPage);
