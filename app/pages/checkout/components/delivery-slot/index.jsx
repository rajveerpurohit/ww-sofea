import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { loader, modal, viewportType } from '../../../../actions/common';
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
  // updateShippingInfo,
  setCheckoutActiveStep
} from '../../../../components/compound/deliveryDetails/actions';
import { updateShippingInfo } from '../../actions';
import { postDeliveryArea } from '../../../../components/basic/delevery-model/actions';


import AddressForm from '../delivery-address/address-form';
//import AddressSelect from '../delivery-address/address-select';
import AddressSelect from '../../../../components/basic/delivery-slot-modal/address-select';
import ProvinceSuburbForm from '../delivery-address/province-suburb-form';
import DeliverySlots from './delivery-slots';

class CheckoutDeliverySlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editReservedSlots: false,
      showProvinceSuburbForm: false,
      isAddressFormVisible: false
    };

    this.onEditReservedSlots = this.onEditReservedSlots.bind(this);
    this.onSubmitReservedSlots = this.onSubmitReservedSlots.bind(this);
    this.showProvinceSuburbForm = this.showProvinceSuburbForm.bind(this);
    this.hideProvinceSuburbForm = this.hideProvinceSuburbForm.bind(this);
  }

  componentDidMount() {
    this.props.getUserAddresses(this.props.deliveryDetails);
  }

  onEditReservedSlots(e) {
    this.setState({ editReservedSlots: true });
  }

  onSubmitReservedSlots(e) {
    e.preventDefault();
    const deliveryDetails = this.props.deliveryDetails;
    const reservedSlots = deliveryDetails.deliverySlotSession.reservedDeliverySlots;
    // console.log('reservedSlots', reservedSlots);
    const reqObj = {};
    reqObj.slotDetails = [];
    reqObj.shipToAddressName = deliveryDetails.currentAddress.nickname;
    if (reservedSlots.length === 1) {
      const reservedSlotId = reservedSlots.length > 0 ? reservedSlots[0].slotId : 0;
      reqObj.slotDetails[0] = {};
      reqObj.slotDetails[0].table = 'join';
      reqObj.slotDetails[0].shipOnDateKey = 'join';
      reqObj.slotDetails[0].shipOnDateValue = reservedSlots[0].stringShipOnDate;
      reqObj.slotDetails[0].deliverySlotValue = reservedSlotId;
      reqObj.slotDetails[0].deliverySlotKey = 'join';
      reqObj.slotDetails[0].shipToAddressName = deliveryDetails.currentAddress.nickname;
      reqObj.slotDetails[0].selected = true;
      // reqObj.joinBosket = 'true';
    } else if (reservedSlots.length === 2) {
      reqObj.slotDetails[0] = {};
      reqObj.slotDetails[0].table = 'food';
      reqObj.slotDetails[0].shipOnDateKey = 'food';
      reqObj.slotDetails[0].shipOnDateValue = reservedSlots[0].stringShipOnDate;
      reqObj.slotDetails[0].deliverySlotValue = reservedSlots[0].slotId;
      reqObj.slotDetails[0].deliverySlotKey = 'food';
      reqObj.slotDetails[0].shipToAddressName = deliveryDetails.currentAddress.nickname;
      reqObj.slotDetails[0].selected = true;

      reqObj.slotDetails[1] = {};
      reqObj.slotDetails[1].table = 'clothing';
      reqObj.slotDetails[1].shipOnDateKey = 'clothing';
      reqObj.slotDetails[1].shipOnDateValue = reservedSlots[1].stringShipOnDate;
      reqObj.slotDetails[1].deliverySlotValue = reservedSlots[1].slotId;
      reqObj.slotDetails[1].deliverySlotKey = 'clothing';
      reqObj.slotDetails[1].shipToAddressName = deliveryDetails.currentAddress.nickname;
      reqObj.slotDetails[1].selected = true;
    }
    reqObj.joinBosket = (reservedSlots.length !== 2) ? 'true' : 'false';
    console.log('updateShippingInfo ', reqObj);
    this.props.updateShippingInfo(reqObj)
      .then((res) => {
        console.log('updateShippingInfo error', res);
        if (!res.formexceptions) {
          this.props.setCheckoutActiveStep('deliveryOptions');
        } else {
          console.log('updateShippingInfo error', res);
        }
      });
      // .then(() => {
      //   this.props.setCheckoutActiveStep('deliveryOptions');
      // });
  }

  showProvinceSuburbForm(evt) {
    this.setState({ showProvinceSuburbForm: true });
  }

  hideProvinceSuburbForm(evt) {
    this.setState({ showProvinceSuburbForm: false });
  }

  render() {
    const deliveryDetails = this.props.deliveryDetails;
    const { addressForm, userAddresses } = deliveryDetails;
    const totalAddresses = Object.keys(userAddresses).length;

    if (this.state.showProvinceSuburbForm) {
      return (
        <article className="mainColCheckout">
          <h2>YOUR DELIVERY</h2>
          <ProvinceSuburbForm {...this.props} hideProvinceSuburbForm={this.hideProvinceSuburbForm} />
        </article>
      );
    }

    const reservedSlots = _.get(this.props, 'deliveryDetails.deliverySlotSession.reservedDeliverySlots', []);
    const isSlotReserved = reservedSlots.length;

    return (<article className="mainColCheckout">
      <h2>YOUR DELIVERY</h2>
      <h3>Where should we deliver your order?</h3>
      {totalAddresses === 0 &&
        <AddressForm {...this.props} showRemainingChars showProvinceSuburbForm={this.showProvinceSuburbForm} />
      }
      {totalAddresses !== 0 &&
        <section>
          <AddressSelect {...this.props} showRemainingChars showProvinceSuburbForm={this.showProvinceSuburbForm} pageType="checkout" />
          <section className="contentBlock" style={{ display: addressForm ? 'none' : 'block' }}>
            {isSlotReserved > 0 && <form name="frmReservedDeliveryOptions" id="frmReservedDeliveryOptions" className="wForm checkoutForm active" onSubmit={this.onSubmitReservedSlots} style={{ display: this.state.editReservedSlots ? 'none' : 'block' }}>
              {isSlotReserved === 1 && (<div className="text-small">
                <h3>Your delivery time slot(s) : </h3>
                <p id="slotDeliverySelected_1" className="intro">You selected :
                <strong id="deliveryDate_1">{reservedSlots[0].description}</strong>
                  <strong id="deliveryTime_1">, {reservedSlots[0].hourFrom} - {reservedSlots[0].hourTo}*</strong>
                </p>
                </div>)}
              {isSlotReserved === 2 && (<div className="text-small">
                <h3>Your delivery time slot(s) : </h3>
                <p id="slotDeliverySelected_1" className="intro">You selected Foods:
                <strong id="deliveryDate_1">{reservedSlots[0].description}</strong>
                  <strong id="deliveryTime_1">, {reservedSlots[0].hourFrom} - {reservedSlots[0].hourTo}*</strong>
                </p>
                <p id="slotDeliverySelected_1" className="intro">You selected others:
                <strong id="deliveryDate_1">{reservedSlots[1].description}</strong>
                  <strong id="deliveryTime_1">, {reservedSlots[1].hourFrom} - {reservedSlots[1].hourTo}*</strong>
                </p>
                </div>)}
              <fieldset className="submitField">
                <input type="button" id="editReservedSlots" className="button nextBtn floatL" onClick={this.onEditReservedSlots} value="Edit delivery date and time" name="editReservedSlots" />
              </fieldset>
              <fieldset className="grid--space-y">
                <p className="floatL noMargT">
                  <Link to="/checkout/cart" className="prevLink">Go back</Link>
                </p>
                <input type="submit" id="deliveryOneNext" className={`button nextBtn floatR ${(this.state.submitBtnEnable === false) ? 'disabled' : ''}`} value="Next" name="deliveryOneNext" disabled={(this.state.submitBtnEnable === false) ? 'disabled' : false} />
              </fieldset>
            </form>
            }
            {(isSlotReserved === 0 || this.state.editReservedSlots === true) && <DeliverySlots pageType="checkout" {...this.props} />}
          </section>
        </section>
      }
    </article>);
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    deliveryDetails: state.deliveryDetails,
    common: state.common,
    clp: state.clp,
    DeliverAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', {}),
    // miniCartData: _.get(state, 'headerReducer.miniCartReducer.miniCartData', {})
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
  setCheckoutActiveStep,
  postDeliveryArea
})(CheckoutDeliverySlot);
