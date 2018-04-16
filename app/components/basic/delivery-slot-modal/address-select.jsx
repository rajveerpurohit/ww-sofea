import React, { Component } from 'react';
import AddressForm from './address-form';
import Image from '../Image';
import CheckoutAddressForm from '../../../pages/checkout/components/delivery-address/address-form';

export default class AddresssSelect extends Component {

  constructor(props) {
    super(props);
    this.changeAddress = this.changeAddress.bind(this);
    this.showAddressFormMethod = this.showAddressFormMethod.bind(this);
    this.confirmDeliveryAddress = this.confirmDeliveryAddress.bind(this);
  }

  static getUserAddressesOptions(userAddresses) {
    const userAddressesLabels = Object.keys(userAddresses);
    const userAddressOptions = {
      defaultValue: '',
      addressOptions: [],
      label: ''
    };
    if (userAddressesLabels.length === 0) return userAddressOptions;
    userAddressesLabels.forEach((k) => {
      userAddressOptions.addressOptions.push(<option key={`user_address_${k}`} value={userAddresses[k].id}>{k}</option>);
    });
    userAddressOptions.defaultValue = userAddresses[userAddressesLabels[0]].id;
    userAddressOptions.label = userAddressesLabels[0];
    return userAddressOptions;
  }

  changeAddress(e) {
    e.preventDefault();
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    const userAddresses = this.props.deliveryDetails.userAddresses;
    
    this.props.changeDeliveryAddress(true, text);
    this.props.setCurrentAddress(userAddresses[text]);
    this.props.showAddressForm(false);
    return userAddresses[text];
  }

  showAddressFormMethod(e) {
    e.preventDefault();
    this.props.showAddressForm(true);
  }

  static getAddressBlock(address) {
    return (
      <section className="addressWrapper">
        <ul className="list--silent text-small addressBlock">
          <li className="strong">{address.nickname}</li>
          <li>{address.recipientName}</li>
          <li>{address.primaryContactNo}</li>
          <li>{address.address1}</li>
          <li>{address.address2}</li>
          <li>{address.city + ' ' + address.postalCode}</li>
        </ul>

      </section>);
  }

  confirmDeliveryAddress(event) {
    event.preventDefault();
    const data = {
      suburbId: this.props.deliveryDetails.currentAddress.suburbId,
      sourcePage: 'shipping',
      updateOrderSuburb: 'true'
    };
    const pageType = this.props.pageType || '';
    this.props.confirmDeliveryAddress(data, pageType)
      .then(() => {
        this.props.changeDeliveryAddress(false);
      });
  }

  static getUndeliverableProducts(products = []) {
    if (!products.length) return (<span />);
    const productsTable = products.map((product) => {
      return (<tr>
        <td>
          {
            product.productDisplayName && (
              <div>
                <strong><span id="product_name_" className="productName floatL">{ product.productDisplayName }</span><br /></strong>
                <span className="display-none--mobi-max">Product Code:<br />{ product.productId }</span>
              </div>
            )
          }
        </td>
        <td className="text-align-center">
          {
            product.quantity && (<div className="product-qty">{ product.quantity }</div>)
          }
        </td>
        <td className="text-align-center">
          {
            product.color && product.internalSwatchImage && (
              <Image payload={{ url: product.internalSwatchImage, alt: product.color }} />
            )
          }
          <br />
          {
            product.size && (<span>{ product.size }</span>)
          }
        </td>
        <td />
      </tr>);
    });

    return (
      <table className="table text-small table--border-rows">
        <thead className="text-caps">
          <tr>
            <th className="table__th">Your  Items</th>
            <th className="table__th text-align-center">QTY</th>
            <th className="table__th text-align-center">Colour/ Size</th>
            <th className="table__th text-align-right">total&nbsp;Price</th>
          </tr>
        </thead>
        <tbody>
          { productsTable }
        </tbody>
      </table>
    );
  }

  render() {
    const deliveryDetails = this.props.deliveryDetails;
    const currentAddressState = deliveryDetails.currentAddress;
    const userAddresses = deliveryDetails.userAddresses;
    const userAddressOptions = AddresssSelect.getUserAddressesOptions(userAddresses);
    const addressChangeData = deliveryDetails.addressChangeData;
    
    const addressBlock = Object.keys(currentAddressState).length ? AddresssSelect.getAddressBlock(currentAddressState) : (<ul className="list--silent text-small addressBlock" />);

    let unDeliverableProducts = (<span />);
    if (addressChangeData.deliveryAddressChangeStatus === 'unDeliverableProducts' || addressChangeData.deliveryAddressChangeStatus === 'unSellable') {
      if (addressChangeData.unSellableCommerceItems) {
        const productArray = addressChangeData.unSellableCommerceItems;
        unDeliverableProducts = (<div className="grid grid--space-y">
          <h4 className="text-caps font-graphic">Following products will be removed from the basket as they cannot be delivered</h4>
          {AddresssSelect.getUndeliverableProducts(productArray)}
        </div>);
      }
      if (addressChangeData.unDeliverableCommerceItems) {
        const productArray = addressChangeData.unDeliverableCommerceItems;
        unDeliverableProducts = (
        <div className="grid grid--space-y">
          <h4 className="text-caps font-graphic">Following products will be removed from the basket as they cannot be delivered</h4>
          { AddresssSelect.getUndeliverableProducts(productArray) }
        </div>);
      }
    }

    if (addressChangeData.deliveryAddressChangeStatus === 'hasDeliverySlotReservations') {
      unDeliverableProducts = (<p>You have a delivery reservation that will be cancelled if you go ahead with delivery address change</p>);
    }

    const AddressFormComponent = this.props.pageType === 'checkout' ? (<CheckoutAddressForm {...this.props} />) : (<AddressForm {...this.props} />);

    return (
      <section className="addressSelect">
        <div className="grid form-field">
          <div className="grid__half--large">
            <div className="grid__half--small">
              <span className="enhanced-select">
                <select id="addressNickname" name="selectAddressNickname" defaultValue={currentAddressState.id || 'selectAddress'} onChange={this.changeAddress}>
                  <option value="selectAddress" disabled>Select an Address</option>
                  {userAddressOptions.addressOptions}
                </select>
                <span className="enhanced-select__label">{currentAddressState.nickname || 'Select an Address'}</span>
                <span className="icon enhanced-select__icon" />
              </span>
            </div>
            <div className="grid__half--small">
              <button onClick={this.showAddressFormMethod} className="btn btn--secondary btn--right btn--block btn--align-left newAddressForm addNewAddress">Add a new address</button>
            </div>
          </div>
        </div>
        <hr className="hr--light" />
        {!deliveryDetails.addressForm && addressBlock}
        {
          deliveryDetails.addressForm && AddressFormComponent
        }
        {
          addressChangeData.deliveryAddressChangeStatus === "noFulfillmentCentre" && addressChangeData.message && (<div id="delivery-location-message" className="form-field__msg form-field__msg--error" >{ addressChangeData.message }</div>)
        }
        {deliveryDetails.changeDeliveryAddress && !deliveryDetails.addressForm && addressChangeData.deliveryAddressChangeStatus !== "noFulfillmentCentre" && (<span id="delivery-address-change">{unDeliverableProducts}<button id="btnConfirmDeliveryAddress" className="btn btn--primary btn--right grid--space-y" name="btnConfirmDeliveryAddress" onClick={this.confirmDeliveryAddress}>Confirm Delivery Address</button></span>)}
      </section>
    );
  }
}
