import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';

import ServiceUtil from '../../../../../app/services/serviceUtil';
import ProductPrice from '../../../../components/basic/product-price';
import TableHeader from '../../../pdp/product-common/generic-table-header';
import Image from '../../../../components/basic/Image';

class OrderConfirmation extends Component {

  renderItemTypeTable() {
    const cartItems = this.props.miniCartData.miniCartData.items || {};
    // const { cartItems } = this.state;
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
                    <tr>
                      <th>Your Items</th>
                      <th className="hide-on-mobi">&nbsp;</th>
                      <th className="hide-on-mobi">Qty</th>
                      <th className="hide-on-mobi">Colour/ Size</th>
                      <th className="mobiPrice" nowrap>unit&nbsp;Price&nbsp;</th>
                      <th className="hide-on-mobi" nowrap>total&nbsp;Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems[item].map(product => this.renderProductRows(product))}
                  </tbody>

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

  renderProductRows(product) {
    const { options, productId, internalImageURL, priceInfo, externalImageURL, productDisplayName } = product;

    const payload = {
      url: internalImageURL,
      externalUrl: externalImageURL,
      className: 'border--weight-thin lazyloaded',
      title: product.productDisplayName,
      alt: product.productDisplayName
    };
    const { listPrice, promoPrice, simplePromotion } = priceInfo;
    const sale = simplePromotion ? listPrice + promoPrice : listPrice;

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
                listPrice={sale === listPrice ? 0 : sale}
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

                <div className="customSelect" id={`uniform-${product.productId}_mobile`} />
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
          <div id="qtyContainer" name="qtyContainer">
            {`Qty': ${product.quantity}`}
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
            listPrice={sale === listPrice ? 0 : sale}
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

      </tr>
    );
  }

  render() {
    const { deliveryDetails, orderSummary } = this.props.orderConfirmation;
    const labels = this.props.labels;

    return (
      <article>
        <section>
          <h2>Thank you!<br /> Order confirmation number {orderSummary.orderId} </h2>
          <p className="intro">We've received your order and will be emailing you a copy of this confirmation too. Please call us on <Link href="tel:0860100987">0860 100 987</Link> if you have any queries.</p>
        </section>
        <section className="summaryTable">
          <h2>Delivery summary</h2>
          <table cellSpacing="0" cellPadding="0" border="0" width="0%" className="deliverySummaryTable">
            <tbody>
              <tr>
                <td>Customer Name:</td>
                <td>{deliveryDetails.shippingAddress.firstName}</td>
              </tr>
              <tr>
                <td>Delivery date:</td>
                <td>{deliveryDetails.formattedShipOndates[0]}</td>
              </tr>
              <tr>
                <td>Delivery time:</td>
                <td>{deliveryDetails.formattedDeliveryTimes[0]}</td>
              </tr>
              <tr>
                <td>Delivery address:</td>
                <td><strong>{deliveryDetails.shippingAddress.city} &nbsp; {deliveryDetails.shippingAddress.postalCode}</strong></td>
              </tr>
              <tr>
                <td>Regular contact number:</td>
                <td>{deliveryDetails.shippingAddress.primaryContactNo}</td>
              </tr>
              <tr>
                <td>Secondary contact number:</td>
                <td>{deliveryDetails.shippingAddress.secondaryContactNo}</td>
              </tr>
              <tr>
                <td>Special instructions:</td>
                <td>{deliveryDetails.shippingAddress.specialInstructions}</td>
              </tr>
              <tr>
                <td>Gift Message:</td>
                <td>{this.props.orderConfirmation.message}</td>
              </tr>
              <tr>
                <td>Delivery fee:</td>
                <td>{deliveryDetails.shippingAmount}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="summaryTable tableWrapper">
          <h2>Order Summary</h2>

          <table cellSpacing={0} cellPadding={0} border={0} className="basketSummaryTotals">
            <tbody>
              {this.renderItemTypeTable()}
            </tbody>
          </table>

        </section>
        <section className="summaryTable">
          <table cellSpacing="0" cellPadding="0" border="0" className="totals noMargT">
            <tfoot>
              <tr>
                <td className="hide-on-mobi"><p>You can manage your orders in My Account. <Link to="/dashboard">Go there now</Link></p></td>
                <td>
                  <p>Basket total: <span className="price">{orderSummary.basketTotal}</span></p>
                  <p>delivery fee: <span className="price">{orderSummary.estimateDelivery}</span></p>
                  <section className="wrewards">
                    <p className="noMargT">Get 15% OFF selected <strong className="wrewards">W</strong>Rewards items on your next order when you pay with your Woolies Store or Credit Card.</p>
                    <p><strong className="wrewards"><Link to="/wfs/credit-card">Apply for a Woolworths Credit Card.</Link></strong></p>
                  </section>
                  <hr />
                  <Link className="button" to="/">back to home</Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </section>
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderConfirmation: state.checkout.orderConfirmation,
    labels: state.labels.labelsAndErrorMessages.cart,
    miniCartData: state.headerReducer.miniCartReducer,
    user: state.user
  };
};
export default connect(mapStateToProps)(OrderConfirmation);
