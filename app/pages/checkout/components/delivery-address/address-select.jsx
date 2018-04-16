import React, { Component } from 'react';
import AddressForm from './address-form';

export default class AddresssSelect extends Component {
  static getUserAddressesOptions(userAddresses) {
    const userAddressesLabels = Object.keys(userAddresses);
    const userAddressOptions = {
      defaultValue: '',
      addressOptions: [],
      label: ''
    };

    if (userAddressesLabels.length === 0) return userAddressOptions;
    userAddressesLabels.forEach((k) => {
      userAddressOptions.addressOptions.push(
        <option key={`user_address_${k}`} value={userAddresses[k].id}>
          {k}
        </option>
      );
    });

    userAddressOptions.defaultValue = userAddresses[userAddressesLabels[0]].id;
    userAddressOptions.label = userAddressesLabels[0];
    return userAddressOptions;
  }

  static getAddressBlock(address) {
    return (
      <section className="addressWrapper">
        <ul className="list--silent text-small addressBlock" style={{ display: 'block' }}>
          <li className="strong">{address.nickname}</li>
          <li>{address.recipientName}</li>
          <li>{address.primaryContactNo}</li>
          <li>{address.address1}</li>
          <li>{address.address2}</li>
          <li>{address.city + ' ' + address.postalCode}</li>
        </ul>
        <hr className="hr--light" />
      </section>
    );
  }

  constructor(props) {
    super(props);

    this.changeAddress = this.changeAddress.bind(this);
    this.showAddressFormMethod = this.showAddressFormMethod.bind(this);
    this.confirmDeliveryAddress = this.confirmDeliveryAddress.bind(this);
  }

  changeAddress(e) {
    e.preventDefault();
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    const userAddresses = this.props.deliveryDetails.userAddresses;
    const currentUser = this.props.clp.currentUser;

    if (
      userAddresses[text] &&
      ((currentUser.region &&
        currentUser.region.id !== userAddresses[text].region) ||
        (currentUser.suburb &&
          currentUser.suburb.id !== userAddresses[text].suburbId))
    ) {
      this.props.changeDeliveryAddress(true);
    } else {
      this.props.changeDeliveryAddress(false);
    }

    this.props.setCurrentAddress(userAddresses[text]);
    this.props.showAddressForm(false);
    return userAddresses[text];
  }

  showAddressFormMethod(e) {
    e.preventDefault();
    this.props.showAddressForm(true);
  }

  confirmDeliveryAddress(event) {
    event.preventDefault();
    const data = {
      suburbId: this.props.deliveryDetails.currentAddress.suburbId,
      sourcePage: 'shipping',
      updateOrderSuburb: 'true'
    };

    this.props.confirmDeliveryAddress(data).then(() => {
      this.props.changeDeliveryAddress(false);
    });
  }

  render() {
    const deliveryDetails = this.props.deliveryDetails;
    const currentAddressState = deliveryDetails.currentAddress;
    const userAddresses = deliveryDetails.userAddresses;
    const userAddressOptions = AddresssSelect.getUserAddressesOptions(
      userAddresses
    );

    const addressBlock = Object.keys(currentAddressState).length ? (
      AddresssSelect.getAddressBlock(currentAddressState)
    ) : (
      <ul className="list--silent text-small addressBlock" />
    );

    return (
      <section className="addressSelect">
        <div className="grid form-field">
          <div className="grid__half--large">
            <div className="grid__half--small">
              <span className="enhanced-select">
                <select
                  id="addressNickname"
                  name="selectAddressNickname"
                  defaultValue={
                    currentAddressState.id || userAddressOptions.defaultValue
                  }
                  onChange={this.changeAddress}
                >
                  <option value="selectAddress" disabled="">
                    Select an Address
                  </option>
                  {userAddressOptions.addressOptions}
                </select>
                <span className="enhanced-select__label">
                  {currentAddressState.nickname || userAddressOptions.label}
                </span>
                <span className="icon enhanced-select__icon" />
              </span>
            </div>
            <div className="grid__half--small">
              <button
                onClick={this.showAddressFormMethod}
                className="btn btn--secondary btn--right btn--block btn--align-left newAddressForm addNewAddress"
              >
                Add a new address
              </button>
            </div>
          </div>
        </div>
        <hr className="hr--light" />
        {deliveryDetails.addressForm ? <AddressForm {...this.props} /> : addressBlock }
        {deliveryDetails.changeDeliveryAddress &&
          !deliveryDetails.addressForm && (
            <span id="delivery-address-change">
              <button
                id="btnConfirmDeliveryAddress"
                className="btn btn--primary btn--right"
                name="btnConfirmDeliveryAddress"
                onClick={this.confirmDeliveryAddress}
              >
                Confirm Delivery Address
              </button>
            </span>
          )}
      </section>
    );
  }
}
