import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import DeliverySlotsSlider from './delivery-slots-slider';
import CommonUtil from '../../../../services/commonUtil'; // CommonUtil.radioBtnVal

export default class DeliverySlots extends Component {

  constructor(props) {
    super(props);
    this.onSplitChange = this.onSplitChange.bind(this);
    this.onChangeODD = this.onChangeODD.bind(this);
    this.onDeliveryOptionSubmit = this.onDeliveryOptionSubmit.bind(this);
    this.submitBtnEnable = this.submitBtnEnable.bind(this);
    const provinceId = this.props.deliveryDetails.deliveryLocation.provinceId;
    const suburbId = this.props.deliveryDetails.deliveryLocation.suburbId;
    this.props.changeLocation(provinceId);
    this.props.changeLocation(null, suburbId);
    this.state = {
      splitDeliverySlot: false,
      displayODDTimeSlot: false,
      submitBtnEnable: false, // for enable the submitBtnEnable in all the case
      splitFoodEnable: false, // for enable submitBtnEnable in case Split delivery
      splitOtherEnable: false // for enable submitBtnEnable in case Split delivery
    };
  }
  componentWillMount() {
    const deliverySlots = this.props.deliveryDetails.deliverySlotSession;
    let reservedDeliverySlots = deliverySlots.reservedDeliverySlots !== undefined ? deliverySlots.reservedDeliverySlots.length : 0;
    console.log('reservedDeliverySlots-------', reservedDeliverySlots); // reservedDeliverySlots.length
    // this.stateChange(reservedDeliverySlots > 1);
    this.setState({ splitDeliverySlot: reservedDeliverySlots > 1 });
  }
  onSplitChange(e) {
    this.setState({
      splitDeliverySlot: (e.currentTarget.value === 'true')
    });
    this.setState({ submitBtnEnable: false });
    this.setState({ displayODDTimeSlot: false });
  }
  onChangeODD(e) {
    let elm = e.target.parentElement.parentElement;
    if (elm.parentElement.classList.contains('is-selected')) {
      elm.parentElement.querySelector('.is-selected').classList.remove('is-selected');
      elm.parentElement.querySelector('input').checked = false;
    }
    e.target.checked = true;
    elm.classList.add('is-selected');
    if (e.target.value === 'onlyOtherItems') {
      // console.log('(e.target ', e.target, e.target.value);
      this.setState({ displayODDTimeSlot: e.target.value });
    } else if (e.target.value === 'otherItems') {
      this.setState({ displayODDTimeSlot: e.target.value });
    } else {
      this.setState({ displayODDTimeSlot: '' });
      const reqObj = {};
      reqObj.joinBasket = 'true';
      reqObj.foodShipOnDate = '';
      reqObj.otherShipOnDate = '';
      reqObj.foodDeliverySlotId = '';
      reqObj.otherDeliverySlotId = '';
      reqObj.oddDeliverySlotId = e.target.value;
      this.props.updateDeliverySlot(reqObj);
      if (this.state.splitDeliverySlot === true) {
        this.setState({ splitOtherEnable: true });
      }
    }
    if (e.target.value === 'onlyOtherItems' || e.target.value === 'otherItems') {
      this.setState({ submitBtnEnable: false });
    } else {
      this.setState({ submitBtnEnable: true });
    }
  }
  onDeliveryOptionSubmit(e) {
    e.preventDefault();
    const deliveryDetails = this.props.deliveryDetails;
    const deliverySlots = this.props.deliveryDetails.deliverySlotSession;
    const onlyFoodItems = deliverySlots.requiredToDisplayOnlyODD === false && deliverySlots.splitEnabled === false;
    const onlyOtherItems = deliverySlots.requiredToDisplayOnlyODD === true; // for ODD
    const foodAndotherItems = deliverySlots.splitEnabled === true; // Join deliverySlot and Split DeliverySlot

    const formRef = this.selectDeliveryOptions;
    const { field } = this.selectDeliveryOptions;
    // let formValidity = false;
    const reqObj = {};
    reqObj.slotDetails = [];
    reqObj.shipToAddressName = deliveryDetails.currentAddress.nickname;

    if (onlyFoodItems === true) {
      // console.log('formRef[delivery-slot-join]', formRef['delivery-slot-join']);
      // console.log('formRef[delivery-slot-join].value', formRef['delivery-slot-join'].value);
      let slotValue = formRef['delivery-slot-join'] !== undefined ? JSON.parse(CommonUtil.radioBtnVal(formRef['delivery-slot-join'])) : null;
      reqObj.slotDetails[0] = slotValue;
      reqObj.joinBosket = 'true';
    } else if (onlyOtherItems === true) {
      let oddSlotValue = (field !== undefined && field.value.length !== 0 && field.value !== 'otherItems' && field.value !== 'onlyOtherItems') ? field.value : null;
      let slotValue = formRef['delivery-slot-join'] !== undefined ? JSON.parse(CommonUtil.radioBtnVal(formRef['delivery-slot-join'])) : null;
      if (oddSlotValue === null && slotValue !== null) {
        reqObj.slotDetails[0] = slotValue;
        reqObj.joinBosket = 'true';
      } else if (oddSlotValue !== null && slotValue === null) {
        reqObj.slotDetails[0] = {};
        reqObj.slotDetails[0].table = 'join';
        reqObj.slotDetails[0].shipOnDateKey = 'join';
        reqObj.slotDetails[0].shipOnDateValue = '';
        reqObj.slotDetails[0].deliverySlotValue = oddSlotValue;
        reqObj.slotDetails[0].deliverySlotKey = 'join';
        reqObj.slotDetails[0].shipToAddressName = deliveryDetails.currentAddress.nickname;
        reqObj.slotDetails[0].selected = true;
        reqObj.joinBosket = 'false';
      }
    } else if (foodAndotherItems === true && this.state.splitDeliverySlot === false) {
      let otherSlotValue = formRef['delivery-slot-join'] !== undefined ? JSON.parse(CommonUtil.radioBtnVal(formRef['delivery-slot-join'])) : null;
      reqObj.slotDetails[0] = otherSlotValue;
      reqObj.joinBosket = (!this.state.splitDeliverySlot) ? 'true' : 'false';
    } else if (foodAndotherItems === true && this.state.splitDeliverySlot === true) {
      let foodSlotValue = formRef['delivery-slot-food'] !== undefined ? JSON.parse(CommonUtil.radioBtnVal(formRef['delivery-slot-food'])) : null;
      let otherSlotValue = formRef['delivery-slot-clothing'] !== undefined ? JSON.parse(CommonUtil.radioBtnVal(formRef['delivery-slot-clothing'])) : null;
      let oddOtherSlotValue = (field !== undefined && field.value.length !== 0 && field.value !== 'otherItems' && field.value !== 'onlyOtherItems') ? field.value : null;

      reqObj.slotDetails[0] = foodSlotValue;
      if (oddOtherSlotValue !== null && otherSlotValue === null) {
        reqObj.slotDetails[1] = {};
        reqObj.slotDetails[1].table = 'join';
        reqObj.slotDetails[1].shipOnDateKey = 'join';
        reqObj.slotDetails[1].shipOnDateValue = '';
        reqObj.slotDetails[1].deliverySlotValue = oddOtherSlotValue;
        reqObj.slotDetails[1].deliverySlotKey = 'join';
        reqObj.slotDetails[1].shipToAddressName = deliveryDetails.currentAddress.nickname;
        reqObj.slotDetails[1].selected = true;
      } else {
        reqObj.slotDetails[1] = otherSlotValue;
      }
      reqObj.joinBosket = (!this.state.splitDeliverySlot) ? 'true' : 'false';
    }
    this.props.updateShippingInfo(reqObj)
      .then((res) => {
        if (!res.formexceptions && res.statusCode !== 500) {
          this.props.setCheckoutActiveStep('deliveryOptions');
        } else {
          console.log('updateShippingInfo error', res);
        }
      });
  }
  submitBtnEnable(enable) {
    if (enable === true) {
      this.setState({ submitBtnEnable: true });
    } else if (enable === 'foodItems') {
      this.setState({ splitFoodEnable: true });
    } else if (enable === 'otherItems') {
      this.setState({ splitOtherEnable: true });
    }
    if (this.state.splitFoodEnable === true && enable === 'otherItems') {
      this.setState({ submitBtnEnable: true });
    } else if (this.state.splitOtherEnable === true && enable === 'foodItems') {
      this.setState({ submitBtnEnable: true });
    }
  }
  generateOddOption(payload, otherItemsDeliveryCost, otherItemTimeSlot, combineDeliveryStartDate, timeSlotValue, reservedSlots) {
    const fieldset = [];
    payload.forEach((options, index) => {
      fieldset.push(
        <div className="form-field radio-toggle__row display-table__row" data-radioRow="">
          <strong>
            <input type="radio" name="field" className="input is-enhanced enhanced-radio" id={`value_join_${options.deliverySlotId}`} value={options.deliverySlotId} onChange={this.onChangeODD} />
            <label data-timeslot="" htmlFor={`value_join_${options.deliverySlotId}`} className="enhanced-radio label-radio text-small">R {options.amount}</label>
          </strong>
          <strong>Value {options.startDeliveryDay} - {options.endDeliveryDay} Day Delivery</strong>
          <span>Delivery between <strong>{options.deliveryDate}</strong></span>
        </div>
      );
    });
    fieldset.push(
      <div className="form-field radio-toggle__row display-table__row" data-radioRow="">
        <strong>
          <input type="radio" name="field" className="input is-enhanced enhanced-radio" id={'timeslot_join'} value={timeSlotValue} onChange={this.onChangeODD} defaultChecked={reservedSlots === true} />
          <label data-timeslot="" htmlFor={'timeslot_join'} className="enhanced-radio label-radio text-small">R {otherItemsDeliveryCost}</label>
        </strong>
        <strong>TIMESLOT</strong> <span>Delivery between <strong>{otherItemTimeSlot} from {combineDeliveryStartDate}</strong></span>
      </div>
    );
    return fieldset;
  }
  render() {
    const deliveryDetails = this.props.deliveryDetails;
    const deliverySlots = this.props.deliveryDetails.deliverySlotSession;
    let showHtml;
    if (Object.keys(deliverySlots).length === 0 && deliveryDetails.changeDeliveryAddress === false) {
      showHtml = (<h4>Order can not be delivered here, no delivery slots available for this address.</h4>);
    } else if (Object.keys(deliverySlots).length && !deliveryDetails.changeDeliveryAddress) {
      const { openDayDeliverySlots,
        otherItemsDeliveryCost,
        sortedFoodDeliverySlots,
        sortedOtherDeliverySlots,
        sortedJoinDeliverySlots,
        requiredToDisplayODD,
        requiredToDisplayOnlyODD,
        combineDeliveryStartDate,
        reservedDeliverySlots } = deliverySlots;

      const onlyFoodItems = deliverySlots.requiredToDisplayOnlyODD === false && deliverySlots.splitEnabled === false;
      const onlyOtherItems = deliverySlots.requiredToDisplayOnlyODD === true; // for ODD
      const foodAndotherItems = deliverySlots.splitEnabled === true; // Join deliverySlot and Split DeliverySlot

      let onlyOtherItemHourTime = onlyOtherItems ? sortedJoinDeliverySlots[0].data[0][0].hourFrom + ' - ' + sortedJoinDeliverySlots[0].data[0][2].hourTo : '';
      let otherItemHourTime = this.state.splitDeliverySlot === true ? sortedOtherDeliverySlots[0].data[0][0].hourFrom + ' - ' + sortedJoinDeliverySlots[0].data[0][2].hourTo : '';
      
      showHtml = (<form name="frmSelectDeliveryOptions" id="frmSelectDeliveryOptions" ref={(form) => { this.selectDeliveryOptions = form; }} className="wForm checkoutForm active" onSubmit={this.onDeliveryOptionSubmit}>
        {onlyFoodItems ? (<div>
          <h4>When should we deliver? Choose an option.</h4>
          <DeliverySlotsSlider payload={sortedJoinDeliverySlots} type={'join'} reservedSlots={reservedDeliverySlots} purpose={'onlyFoodItems'} currentAddress={deliveryDetails.currentAddress.nickname} updateDeliverySlot={this.props.updateDeliverySlot} submitBtnEnable={this.submitBtnEnable} />
        </div>) : ''
        }
        {onlyOtherItems ? (<div>
          <h4>When should we deliver? Choose an option.</h4>
          {requiredToDisplayOnlyODD === true && this.generateOddOption(openDayDeliverySlots, otherItemsDeliveryCost, onlyOtherItemHourTime, combineDeliveryStartDate, 'onlyOtherItems', reservedDeliverySlots > 0)}
        </div>) : ''
        }
        {this.state.displayODDTimeSlot === 'onlyOtherItems' ? (<div className="deliveryCombined deliveryWrapper deliveryTable" style={{ overflow: 'hidden' }}>
          <div className="grid--space-y" />
          <DeliverySlotsSlider payload={sortedJoinDeliverySlots} type={'join'} reservedSlots={reservedDeliverySlots} purpose={'onlyOtherItems'} currentAddress={deliveryDetails.currentAddress.nickname} updateDeliverySlot={this.props.updateDeliverySlot} submitBtnEnable={this.submitBtnEnable} />
        </div>) : ''}
        {foodAndotherItems ? (<div>
          <h4>Your order will be split into more than one delivery.</h4>
          <div className="display-table grid--space-y text-small">
            <div className={'radio-toggle__row display-table__row ' + (!this.state.splitDeliverySlot ? 'is-selected' : '')}>
              <span>
                <input name="orderDate" id="fldOrderCombine" type="radio" value="false" className={'input is-enhanced enhanced-radio'} onChange={this.onSplitChange} checked={!this.state.splitDeliverySlot} />
                <label htmlFor="fldOrderCombine" className={'enhanced-radio label-radio text-small'}>
                  <span><strong>Deliver all items in one time slot</strong></span></label>
              </span>
            </div>
            <div className={'radio-toggle__row display-table__row ' + (this.state.splitDeliverySlot ? 'is-selected' : '')}>
              <span>
              <input name="orderDate" id="fldOrderSplit" type="radio" value="true" className={'input is-enhanced enhanced-radio'} onChange={this.onSplitChange} checked={this.state.splitDeliverySlot} />
                <label htmlFor="fldOrderSplit" className={'enhanced-radio label-radio text-small'}>
                  <span><strong>Deliver food items first and other items later</strong> (This may cost more)</span></label>
              </span>
            </div>
            <div className="formErrors">Please select a delivery option.</div>
          </div>
        </div>) : ''
        }
        {this.state.splitDeliverySlot === false && foodAndotherItems ? (<div className="deliveryCombined deliveryWrapper deliveryTable" style={{ overflow: 'hidden' }}>
          <div className="grid--space-y text-small">When should we deliver? Choose a timeslot.</div>
          <hr className="hr--light" />
          <div className="grid--space-y" />
          <DeliverySlotsSlider payload={sortedJoinDeliverySlots} type={'join'} reservedSlots={reservedDeliverySlots} purpose={'joinItems'} currentAddress={deliveryDetails.currentAddress.nickname} updateDeliverySlot={this.props.updateDeliverySlot} submitBtnEnable={this.submitBtnEnable} />
        </div>) : ''}
        {this.state.splitDeliverySlot === true ? (<div><div className="deliverySplit deliveryWrapper deliveryTable grid food" style={{ display: 'block' }}>
          <div className="grid--space-y"><div className="text-caps text-small strong heading--4 font-graphic">Your food items</div></div>
          <div className=" text-small">When should we deliver? Choose a timeslot.</div>
          <hr className="hr--light" />
          <DeliverySlotsSlider payload={sortedFoodDeliverySlots} type={'food'} reservedSlots={reservedDeliverySlots} purpose={'foodItems'} currentAddress={deliveryDetails.currentAddress.nickname} updateDeliverySlot={this.props.updateDeliverySlot} submitBtnEnable={this.submitBtnEnable} />
        </div>
          <div id="oddSplitBasket">
            <div><div className="text-caps text-small strong heading--4 font-graphic">Your other items</div></div>
            <div className="text-small">Choose a delivery option</div>
            <div className="display-table grid--space-y text-small">
              {requiredToDisplayODD === true && this.generateOddOption(openDayDeliverySlots, otherItemsDeliveryCost, otherItemHourTime, combineDeliveryStartDate, 'otherItems', reservedDeliverySlots > 1)}
            </div>
            {this.state.displayODDTimeSlot === 'otherItems' ? (<DeliverySlotsSlider payload={sortedOtherDeliverySlots} type={'clothing'} reservedSlots={reservedDeliverySlots} purpose={'otherItems'} currentAddress={deliveryDetails.currentAddress.nickname} updateDeliverySlot={this.props.updateDeliverySlot} submitBtnEnable={this.submitBtnEnable} />) : ''}
            {requiredToDisplayODD === false && <DeliverySlotsSlider payload={sortedOtherDeliverySlots} type={'clothing'} reservedSlots={reservedDeliverySlots} purpose={'otherItems'} currentAddress={deliveryDetails.currentAddress.nickname} updateDeliverySlot={this.props.updateDeliverySlot} submitBtnEnable={this.submitBtnEnable} />}
          </div>
        </div>) : ''}
        <fieldset className="grid--space-y">
          <p className="floatL noMargT">
            <Link to="/checkout/cart" className="prevLink">Go back</Link>
          </p>
          <input type="submit" id="deliveryOneNext" className={`button nextBtn floatR ${(this.state.submitBtnEnable === false) ? 'disabled' : ''}`} value="Next" name="deliveryOneNext" disabled={(this.state.submitBtnEnable === false) ? 'disabled' : false} />
        </fieldset>
      </form>);
    } else {
      showHtml = (<div />);
    }
    return showHtml;
  }
}
