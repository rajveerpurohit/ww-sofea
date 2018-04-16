import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import AriaModal from 'react-aria-modal';

import AddressForm from './address-form';
import AddressSelect from './address-select';
import DeliverySlots from './delivery-slots';
import { resetDeliverySlotsData } from '../../compound/deliveryDetails/actions';

class DeleverySlotModel extends Component {

  componentWillUnmount() {
    this.props.resetDeliverySlotsData();
  }

  render() {
    const deliveryDetails = this.props.deliveryDetails;
    const userAddresses = deliveryDetails.userAddresses;
    const totalAddresses = Object.keys(userAddresses).length;
    const shouldShowAddressForm = deliveryDetails.addressForm;

    return (
      <div>
        <AriaModal titleText="deliverySlot" onExit={this.props.deactivateModal} dialogStyle={{ display: 'block', textAlign: 'center' }}>
          <div className="modal__box modal__box--panel modal__box--size-w-large" tabIndex="0" style={{ marginBottom: '20px', top: '20px' }}>
            <Link className="icon icon--close-circ-dark modal__close" onClick={this.props.deactivateModal}>close</Link>
            <div className="heading heading--3 font-graphic modal__head">Select your delivery location and time slot</div>
            {totalAddresses === 0 && (
              <div className="modal__content">
                <div className="grid form-field">
                  <AddressForm {...this.props} />
                </div>
              </div>
            )}
            {totalAddresses !== 0 && (
              <div className="modal__content">
                <AddressSelect {...this.props} />
                {!shouldShowAddressForm && <DeliverySlots {...this.props} />}
              </div>
            )}
            <hr className="hr--light" />
            <p id="slot_reservation_lifespan_info" className="text-small modal__foot">*Your delivery time slot will be reserved for 60 minutes once you have chosen to reserve it.</p>
          </div>
        </AriaModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // DeliverAreaData: state.deliveryDetails.deliveryArea,
    DeliverAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', {})
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ resetDeliverySlotsData }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(DeleverySlotModel);
