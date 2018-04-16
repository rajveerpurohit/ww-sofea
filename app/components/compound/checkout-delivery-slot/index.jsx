import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loader, modal, viewportType } from '../../../actions/common';
import {
  changeLocation,
  addNewAddress,
  getUserAddresses,
  setCurrentAddress,
  getDeliverySlots,
  showAddressForm,
  reserveDeliverySlots,
  confirmDeliveryAddress,
  extendDeliverySlot,
  extendDeliverySlotApi,
  deliverySlotSession,
  changeDeliveryAddress,
  updateDeliverySlot,
  updateShippingInfo,
  setCheckoutActiveStep
} from '../deliveryDetails/actions';

import AddressForm from '../../basic/delivery-slot-modal/address-form';
import AddressSelect from '../../basic/delivery-slot-modal/address-select';
import DeliverySlots from '../../basic/delivery-slot-modal/delivery-slots';

class CheckoutDeliverySlot extends Component {
  componentDidMount() {
    this.props.getUserAddresses(this.props.deliveryDetails);
  }

  render() {
    const deliveryDetails = this.props.deliveryDetails;
    const userAddresses = deliveryDetails.userAddresses;
    const totalAddresses = Object.keys(userAddresses).length;
    return (<div>
      <h2>YOUR DELIVERY</h2>
      {totalAddresses === 0 &&
        <AddressForm {...this.props} />
      }
      {totalAddresses !== 0 &&
        <section>
          <AddressSelect {...this.props} />
          <section className="contentBlock"><DeliverySlots pageType="checkout" {...this.props} /></section>
        </section>
      }
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    deliveryDetails: state.deliveryDetails,
    common: state.common,
    clp: state.clp,
    DeliverAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', {}),
    //miniCartData: _.get(state, 'headerReducer.miniCartReducer.miniCartData', {})
  };
};

export default connect(mapStateToProps, {
  changeLocation,
  addNewAddress,
  getUserAddresses,
  setCurrentAddress,
  getDeliverySlots,
  showAddressForm,
  loader,
  modal,
  viewportType,
  reserveDeliverySlots,
  confirmDeliveryAddress,
  extendDeliverySlot,
  extendDeliverySlotApi,
  deliverySlotSession,
  changeDeliveryAddress,
  updateDeliverySlot,
  updateShippingInfo,
  setCheckoutActiveStep
})(CheckoutDeliverySlot);
