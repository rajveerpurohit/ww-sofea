import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';
import _ from 'lodash';

import { postDeliveryArea, getSuburbArea } from './actions';
import { loader, modal } from '../../../actions/common';
import { getUserAddresses } from '../../compound/deliveryDetails/actions';

class DeleveryModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstProv: 'Select a Province', // regions.regions[0].name,
      firstSuburb: 'Select a Suburb', // suburbs.suburbs[0].name
      firstProvValue: '',
      firstSuburbValue: '',
      nonDelieverable: ''
    };

    this.createProvienceOptionsData = this.createProvienceOptionsData.bind(this);
    this.createSuburbsOptionsData = this.createSuburbsOptionsData.bind(this);
    this.provienceSelect = this.provienceSelect.bind(this);
    this.suburbsSelect = this.suburbsSelect.bind(this);
    this.continueOption = this.continueOption.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.reserveASlot = this.reserveASlot.bind(this);
  }

  continueOption(evt) {
    if (evt) evt.preventDefault();
    const deliveryLocation = this.props.deliveryDetails.deliveryLocation;
    const data = {
      suburbId: this.state.firstSuburbValue
    };
    if (deliveryLocation.suburbId) {
      data.updateOrderSuburb = true;
    } else {
      data.addSuburbToOrder = true;
    }

    if (typeof window !== 'undefined' && window) {
      localStorage.setItem('SelectedOption', this.state.firstSuburb);
    }
    //this.props.updateProps(this.state.firstSuburb);
    return this.props.postDeliveryArea(data)
    .then(() => {
      this.deactivateModal();
    });
  }

  deactivateModal(e) {
    if(e) e.preventDefault();
    this.props.deactivateModal();
  }

  provienceSelect(event) {
    const getProVal = event.target.value;
    const getProName = event.target.options[event.target.selectedIndex].text;
    if (getProVal === '') {
      this.setState({
        firstProv: 'Select a Province',
        firstProvValue: ''
      });
      if (document.getElementById('selSuburb').style.display === 'block') {
        document.getElementById('selSuburb').style.display = 'none';
      }
    } else {
      this.setState({
        firstProv: getProName,
        firstProvValue: getProVal
      });
      _.filter(this.props.provienceData, (provData) => {
        if (provData.id === getProVal) {
          this.setState({
            suburbsData: provData.suburbs
          });
          document.getElementById('province-loader').style.visibility = 'hidden';
          document.getElementById('selSuburb').style.display = 'block';
        }
      });
    }
  }

  suburbsSelect(event) {
    const getSubVal = event.target.value;
    const getSubName = event.target.options[event.target.selectedIndex].text;
    if (getSubVal === '') {
      this.setState({
        firstSuburb: 'Select a Suburb',
        firstSuburbValue: ''
      });
      if (document.getElementById('suburbSelect').style.display === 'block') {
        document.getElementById('suburbSelect').style.display = 'none';
      }
    } else {
      this.props.getSuburbArea(getSubVal, (...payload) => {
        if ((payload[0].suburbAvailable && payload[0].deliveryAddressChangeStatus === 'suburbDeliverable')
          || (payload[0].suburbAvailable && payload[0].deliveryAddressChangeStatus === 'unDeliverableProducts')) {
          document.getElementById('suburbSelect').style.display = 'block';
          document.getElementById('delivery-location-message').style.display = 'none';
          this.setState({
            firstSuburb: getSubName,
            firstSuburbValue: getSubVal
          });
        } else if (!payload[0].suburbAvailable && payload[0].deliveryAddressChangeStatus === 'noFulfillmentCentre') {
          this.setState({
            nonDelieverable: payload[0].message
          });
          document.getElementById('delivery-location-message').style.display = 'block';
          document.getElementById('suburbSelect').style.display = 'none';
          this.setState({
            firstSuburb: getSubName,
            firstSuburbValue: getSubVal
          });
        }
      });
    }
  }

  createProvienceOptionsData(getProvienceData) {
    return getProvienceData.map((item, index) => {
      return (<option key={index} value={item.id}>{item.name}</option>);
    });
  }

  createSuburbsOptionsData(getSuburbsData) {
    return getSuburbsData.map((item, index) => {
      return (<option key={index} data-name={item.name} value={item.id} >{item.name}</option>);
    });
  }

  createButtonsForNonCartItems() {
    const reservedDeliverySlots = _.get(this.props, 'deliveryDetails.deliverySlotSession.reservedDeliverySlots', []);
    const isSlotReserved = reservedDeliverySlots.length;

    if (!isSlotReserved) {
      return (
        <div className="grid grid--space-y intro productOrder">
          <button id="btnContinue" type="button" onClick={this.continueOption} className="btn btn--secondary btn--right" style={{ display: 'inline-block' }}>Continue Shopping</button>
        </div>
      );
    }

    return (
      <div id="suburbSelect" className="grid grid--space-y">
        <h4 className="heading--sup">Reserve a delivery timeslot</h4>
        <p className="text-small heading--sub">To improve your shopping experience, you can reserve your delivery timeslot up front.
        It will be reserved for 60 minutes while you complete your shop.</p>
        <div className="grid grid--space-y intro productOrder">
          <button id="btnReserveDeliverySlot" type="button" className="btn btn--primary btn--right" style={{ display: 'inline-block' }} onClick={this.reserveASlot}>Reserve time slot</button>&nbsp;
          <button id="btnContinue" type="button" className="btn btn--secondary btn--right" style={{ display: 'inline-block' }} onClick={this.continueOption}>Continue Shopping</button>
        </div>
        <p className="text-small">*Your delivery time slot will be reserved for 60 minutes once you have chosen to reserve it.</p>
      </div>
    );
  }

  reserveASlot() {
    this.props.modal(false);
    this.props.loader(true);

    return this.continueOption()
      .then(() => this.props.getUserAddresses(this.props.deliveryDetails))
      .then(() => {
        this.props.loader(false);
        return this.props.modal(true);
      });
  }

  render() {
    return (
      <div>
        <AriaModal titleText="deliveryArea" onExit={this.props.deactivateModal} >
          <div className="modal__box modal__box--panel modal__box--size-w-large" style={{ marginBottom: '184px', top: '184px', width: '100%' }}>
            <Link to="" className="icon icon--close-circ-dark modal__close" onClick={this.props.deactivateModal} >close</Link>
            <div className="heading heading--3 font-graphic modal__head">Select your delivery location</div>
            <div className="modal__content">
              <form id="deliverylocform" >
                <div id="gift-registry-delivery-message" className="hidden" style={{ display: 'none' }}>
                  <h2>WHO SHOULD WE DELIVER TO</h2>
                </div>
                <div className="form-field">
                  <label htmlFor="select-example" className="form-field__label text-small">Select a province to see a list of suburbs that we deliver this product to:</label>
                  <div className="is-loading" id="provinceContainer">
                    <span className="enhanced-select">
                      <select id="fldProvince" name="province" className="customSelect" onChange={this.provienceSelect}>
                        <option value="">Select a Province</option>
                        {this.props.provienceData && this.createProvienceOptionsData(this.props.provienceData)}
                      </select>

                      <span className="enhanced-select__label">{this.state.firstProvValue === '' ? 'Select a Province' : this.state.firstProv}</span>
                      <span className="icon enhanced-select__icon" />
                    </span>
                    <span id="province-loader" className="loading--dark" />
                  </div>
                </div>

                <div id="selSuburb" className="hidden form-field is-loading" style={{ display: 'none' }}>
                  <span className="enhanced-select">
                    <select name="suburbId" id="fieldSuburb" className="customSelect" onChange={this.suburbsSelect}>
                      <option value="">Select a Suburb</option>
                      {this.state.suburbsData && this.createSuburbsOptionsData(this.state.suburbsData)}

                    </select>
                    <span className="enhanced-select__label">{this.state.firstSuburbValue === '' ? 'Select a Suburb' : this.state.firstSuburb}</span>
                    <span className="icon enhanced-select__icon" />
                  </span>
                </div>

                <span id="delivery-location-message" className="form-field__msg form-field__msg--error hidden" style={{ display: 'none' }}>{this.state.nonDelieverable}</span>

                <div id="suburbSelect" className="grid grid--space-y" style={{ display: 'none' }}>
                  <hr />

                  {this.createButtonsForNonCartItems()}
                </div>

                <div className="grid grid--space-y hidden" id="suburbSelectNoFFCentre" style={{ display: 'none' }}>
                  <button id="btnCancel" type="button" className="btn btn--secondary btn--right hidden" style={{ display: 'none' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </AriaModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    suburbData: state.deliveryAreaReducer.suburbData
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ postDeliveryArea, getSuburbArea, loader, getUserAddresses, modal }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(DeleveryModel);
