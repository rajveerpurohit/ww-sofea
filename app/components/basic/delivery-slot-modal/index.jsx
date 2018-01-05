import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';
import AddressForm from '../addressForm';

export default class DeleverySlotModel extends Component {
  
  constructor(props) {
    super(props);
    this.getProvinceOptions = this.getProvinceOptions.bind(this);
    this.getSuburbOptions = this.getSuburbOptions.bind(this);
    this.getAddressBlock = this.getAddressBlock.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.showAddressFormMethod = this.showAddressFormMethod.bind(this);
    this.getHourSlotsHtml = this.getHourSlotsHtml.bind(this);
    this.getTimeSlotsHtml = this.getTimeSlotsHtml.bind(this);    
    this.confirmDeliveryAddress = this.confirmDeliveryAddress.bind(this);    
    //this.formatDates = this.formatDates.bind(this);    
    const provinceId = this.props.deliveryDetails.deliveryLocation.provinceId;
    const suburbId = this.props.deliveryDetails.deliveryLocation.suburbId;
    this.props.changeLocation(provinceId);
    this.props.changeLocation(null, suburbId);
  }

  getProvinceOptions(provinceId = 0) {
    const deliveryArea = this.props.deliveryDetails.deliveryArea;
    const suburbs = deliveryArea.filter(a => a.id === provinceId);
    const provinceOptions = [];

    deliveryArea.forEach((ele) => {
      provinceOptions.push(<option value={ele.id}>{ele.name}</option>);
    });
    return provinceOptions;
  }

  getSuburbOptions(provinceId = 0) {
    if(!provinceId) return [];
    const deliveryArea = this.props.deliveryDetails.deliveryArea;
    const area = deliveryArea.filter(a => a.id === provinceId);
    const suburbsArr = area.length ? area[0].suburbs : [];
    const suburbOptions = [];
    suburbsArr.forEach((ele) => {
      suburbOptions.push(<option value={ele.id}>{ele.name}</option>);
    });
    return suburbOptions;
  }

  getProvinceLabel(pid) {
    const deliveryArea = this.props.deliveryDetails.deliveryArea;
    const area = deliveryArea.filter(a => a.id === pid);
    return area.length ? area[0].name : '';
  }

  getSuburbLabel(pid, sid) {
    const deliveryArea = this.props.deliveryDetails.deliveryArea;
    const area = deliveryArea.filter(a => a.id === pid);
    const suburbs = area.length ? area[0].suburbs : [];
    const suburbData = suburbs.filter(s => s.id === sid);
    return suburbData.length ? suburbData[0].name : '';
  }

  getUserAddressesOptions(userAddresses) {
    const userAddressesLabels = Object.keys(userAddresses);
    const userAddressOptions = {
      defaultValue: '',
      addressOptions: [],
      'label': ''
    };
    if(userAddressesLabels.length === 0) return userAddressOptions;
    userAddressesLabels.forEach((k) => {
      userAddressOptions.addressOptions.push(<option value={userAddresses[k].id}>{k}</option>);
    });
    userAddressOptions.defaultValue = userAddresses[userAddressesLabels[0]].id;
    userAddressOptions.label = userAddressesLabels[0];
    return userAddressOptions;
  }

  getAddressBlock(address) {
    return (
    <span className="addressWrapper">
    <ul className="list--silent text-small addressBlock">	    
      <li className="strong">{address.nickname}</li>
      <li>{address.firstName}</li>
      <li>{address.primaryContactNo}</li>
      <li>{address.address1}</li>
      <li>{address.city +' '+ address.postalCode}</li> 
    </ul>
    <hr className="hr--light" />
    </span>);
  }

  changeAddress(e) {
    e.preventDefault();
    const addressId = e.target.value;
    const index = e.target.selectedIndex;
    const text = e.target[index].text;
    const userAddresses = this.props.deliveryDetails.userAddresses;
    this.props.setCurrentAddress(userAddresses[text]);
    this.props.showAddressForm(false);
    return userAddresses[text];
  }

  showAddressFormMethod(e) {
    e.preventDefault();
    this.props.showAddressForm(true);
  }

  getHourSlotsHtml(hourSlots) {
    if(!hourSlots.length) return (<div className="delivery-slots__slot-label" tabIndex="-1">&nbsp;</div>);
    const output = [];
    hourSlots.forEach((val) => {
      output.push(<div className="delivery-slots__slot-label" tabIndex="-1">{val}</div>)
    });    
    return output;
  }

  getTimeSlotsHtml(headerDates, deliverySlotsData) {
    if(!deliverySlotsData.length) return (<div></div>);
    
    const output = [];
    deliverySlotsData.forEach((val, i) => {
      var slotsInput = [];
      for(var j=0; j < deliverySlotsData[i].length; j++) {
        var slotData = deliverySlotsData[i][j];
        if(!slotData) continue;
        slotsInput.push(
          <div className="delivery-slots__day-slot ">
            <label className="label-radio" for="slotId_join_1_200002"><span className="sr">{slotData.description}</span>						      							      	 	
              <input type="radio" className="is-enhanced enhanced-radio" id="slotId_join_1_200002" tabIndex="0" name="delivery-slot-join" value={j} disabled={!slotData.available} />
              <span className="delivery-slots__cost"><span className="price">R {slotData.slotCost}</span></span></label> 
          </div>
        )
      }
      let jsxArray = [(<div className="delivery-slots__day-label">{DeleverySlotModel.formatDates(headerDates[i])}</div>)];

      jsxArray = jsxArray.concat(slotsInput);
      output.push((
        <div className="delivery-slots__day">
          {jsxArray}
        </div>
      ));
    });  
    return output;
  }

  confirmDeliveryAddress(event) {
    event.preventDefault();
    //alert('confirm Address');
  }

  static formatDates(date) {
     const dateObj = new Date(date);
     const dayArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
     const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
     const output = [];
     const currentDay = dayArr[dateObj.getDay()];
     const cmi = dateObj.getMonth();
     const currentMonth = monthArr[cmi];
     output.push(currentDay);
     output.push((<br />));
     output.push(dateObj.getDate());
     output.push(' ');
     output.push(currentMonth);
     return output;  
  }

  render() {
    const deliveryDetails = this.props.deliveryDetails;
    const selectLocation = deliveryDetails.selectCurrentLocation;

    const userAddresses = deliveryDetails.userAddresses;
    const currentAddressState = deliveryDetails.currentAddress;

    const provinceOptions = this.getProvinceOptions(selectLocation.provinceId);
    const suburbOptions = this.getSuburbOptions(selectLocation.provinceId);
    const provinceLabel = this.getProvinceLabel(selectLocation.provinceId);
    const suburbLabel = this.getSuburbLabel(selectLocation.provinceId, selectLocation.suburbId);
    const postCode = deliveryDetails.deliveryLocation.postalCode;
    const totalAddresses = Object.keys(userAddresses).length;
    const userAddressOptions = this.getUserAddressesOptions(userAddresses);
    const shouldShowAddressForm = deliveryDetails.addressForm; 

    const addressBlock = Object.keys(currentAddressState).length ? this.getAddressBlock(currentAddressState) : (<ul className="list--silent text-small addressBlock"></ul>);

    const deliverySlots = this.props.deliveryDetails.deliverySlots;
    let hourSlots = [];
    let headerDates = [];
    let deliverySlotsData = [];

    if (Object.keys(deliverySlots).length && deliverySlots.sortedJoinDeliverySlots && Object.keys(deliverySlots.sortedJoinDeliverySlots).length) {
      hourSlots = deliverySlots.sortedJoinDeliverySlots[0].hourSlots;
      deliverySlotsData = deliverySlots.sortedJoinDeliverySlots[0].data;
      headerDates = deliverySlots.sortedJoinDeliverySlots[0].headerDates;
    }

    const hourSlotsHtml = this.getHourSlotsHtml(hourSlots);
    const timeSlotsHtml = this.getTimeSlotsHtml(headerDates, deliverySlotsData);

    let showHtml, showHtml1;
    if (shouldShowAddressForm) {
       showHtml = (<AddressForm selectLocation={selectLocation} provinceOptions={provinceOptions} suburbOptions={suburbOptions} provinceLabel={provinceLabel} suburbLabel={suburbLabel} postCode={postCode} {...this.props} />)
       showHtml1 = (<div></div>)
    } else {
      const deliveryLocationSuburbId = deliveryDetails.deliveryLocation.suburbId;
      const currentSelectedAddressSuburubId = currentAddressState.suburbId;

      let deliveryAddressChange = (<span id="delivery-address-change"></span>)
      if (deliveryLocationSuburbId !== currentSelectedAddressSuburubId) {
        deliveryAddressChange = (<span id="delivery-address-change"><button id="btnConfirmDeliveryAddress" className="btn btn--primary btn--right" name="btnConfirmDeliveryAddress" onClick={this.confirmDeliveryAddress}>Confirm Delivery Address</button></span>);
      }

       showHtml = addressBlock;
       if (deliveryLocationSuburbId === currentSelectedAddressSuburubId) {
        showHtml1 = (<div>
          <h4>When should we deliver? Choose an option.</h4>
          <div className="deliveryCombined deliveryWrapper deliveryTable" style={{overflow: "hidden"}}>
              <div className="grid--space-y"></div>
              <div className="delivery-slots deliverySlider selected">
                <div className="delivery-slots__slots">
                    <div className="delivery-slots__slot-label" tabIndex="-1">&nbsp;</div>
                    {hourSlotsHtml}
                </div>        
                {timeSlotsHtml}
              </div>
              <hr className="hr--light" />
          </div>
          <div className="form-field">
            <button type="submit" id="reserveDeliverySlotSubmit" className="btn btn--primary btn--right disabled" disabled="disabled">Reserve time slot</button>
            <span> </span>
            <Link id="reserveDeliverySlotCancel" to="" onClick={this.props.deactivateModal} className="btn btn--secondary btn--right">Cancel</Link>
          </div>
          </div>);
       } else {
         showHtml1 = deliveryAddressChange;
       }
    }


    return (
      <div>
        <AriaModal titleText="deliverySlot" onExit={this.props.deactivateModal} dialogStyle={{display: "block", textAlign: "center" }}> 
          <div className="modal__box modal__box--panel modal__box--size-w-large" data-js="modal-box" tabIndex="0" style={{marginBottom: "20px", top: "20px"}}>
          <Link to="" className="icon icon--close-circ-dark modal__close" onClick={this.props.deactivateModal}>close</Link>
              <div className="heading heading--3 font-graphic modal__head" data-js="modal-head">Select your delivery location and time slot</div>
              {totalAddresses === 0 && 
                <div className="modal__content">
                <div className="grid form-field">
                  <AddressForm selectLocation={selectLocation} provinceOptions={provinceOptions} suburbOptions={suburbOptions} provinceLabel={provinceLabel} suburbLabel={suburbLabel} postCode={postCode} {...this.props} />
              </div>
              </div>
              }
              { totalAddresses !== 0 &&
              <div className="modal__content">
                <form method="post" name="selectAddress" id="frmSelectAddress" className="wForm checkoutForm active">
                <div className="grid__half--large">
                  <div className="grid__half--small">
                  
                  <span className="enhanced-select">
                  <select id="addressNickname" name="selectAddressNickname" defaultValue={currentAddressState.id || userAddressOptions.defaultValue} onChange={this.changeAddress}>
                          <option value="selectAddress" disabled="">Select an Address</option>
                          {userAddressOptions.addressOptions}
                  </select>
                  <span className="enhanced-select__label">{currentAddressState.nickname || userAddressOptions.label}</span>
                  <span className="icon enhanced-select__icon"></span>
                  </span>
                  </div>
                  <div className="grid__half--small">
                    <button onClick={this.showAddressFormMethod} className="btn btn--secondary btn--right btn--block btn--align-left newAddressForm addNewAddress">Add a new address</button>
                  </div>
                </div>
                </form>
                <hr className="hr--light"/>
                {showHtml}
                {showHtml1}
              </div>
            }
            <hr className="hr--light"/>
            <p id="slot_reservation_lifespan_info" className="text-small modal__foot">*Your delivery time slot will be reserved for 60 minutes once you have chosen to reserve it.</p>
          </div>
        </AriaModal>
      </div>
    )
  }
}
