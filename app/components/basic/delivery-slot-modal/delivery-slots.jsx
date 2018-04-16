import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export default class DeliverySlots extends Component {

  constructor(props) {
    super(props);
    console.log('constructior', props);
    this.onSlotChange = this.onSlotChange.bind(this);
    this.reserveTimeSlot = this.reserveTimeSlot.bind(this);
    this.changeWeek = this.changeWeek.bind(this);
    this.onSplitChange = this.onSplitChange.bind(this);
    this.getTimeSlotsHtml = this.getTimeSlotsHtml.bind(this);
    const provinceId = this.props.deliveryDetails.deliveryLocation.provinceId;
    const suburbId = this.props.deliveryDetails.deliveryLocation.suburbId;
    this.props.changeLocation(provinceId);
    this.props.changeLocation(null, suburbId);
    this.state = {
      slotRadio: '',
      slotRadioFood: '',
      slotRadioOther: '',
      joinDeliverySlotWeekIndex: 0,
      foodDeliverySlotWeekIndex: 0,
      otherDeliverySlotWeekIndex: 0,
      splitDeliverySlot: false
    };
  }

  componentDidMount() {
    const deliveryDetails = this.props.deliveryDetails;
    const reservedSlots = _.get(this.props, 'deliveryDetails.deliverySlotSession.reservedDeliverySlots', []);
    const isSlotReserved = reservedSlots.length > 0;

    if (isSlotReserved) {
      const stateObj = {};
      if (reservedSlots.length === 1) {
        const reservedSlotId = isSlotReserved ? reservedSlots[0].slotId : 0;
        const slotVal = {
          deliverySlotValue: reservedSlotId,
          deliverySlotKey: 'join',
          table: 'join',
          shipOnDateKey: 'join',
          shipOnDateValue: reservedSlots[0].stringShipOnDate,
          shipToAddressName: deliveryDetails.currentAddress.nickname,
          selected: 'true'
        };
        stateObj.slotRadio = JSON.stringify(slotVal);
        stateObj.splitDeliverySlot = false;
        const joinDeliverySlots = deliveryDetails.deliverySlotSession.sortedJoinDeliverySlots;
        const weekIndex = DeliverySlots.findWeekIndex(reservedSlots[0], joinDeliverySlots);
        stateObj.joinDeliverySlotWeekIndex = weekIndex;
      } else if (reservedSlots.length === 2) {
        const foodSlotVal = {
          deliverySlotValue: reservedSlots[0].slotId,
          deliverySlotKey: 'food',
          table: 'food',
          shipOnDateKey: 'food',
          shipOnDateValue: reservedSlots[0].stringShipOnDate,
          shipToAddressName: deliveryDetails.currentAddress.nickname,
          selected: 'true'
        };
        const otherSlotVal = {
          deliverySlotValue: reservedSlots[1].slotId,
          deliverySlotKey: 'clothing',
          table: 'clothing',
          shipOnDateKey: 'clothing',
          shipOnDateValue: reservedSlots[1].stringShipOnDate,
          shipToAddressName: deliveryDetails.currentAddress.nickname,
          selected: 'true'
        };
        stateObj.slotRadioFood = foodSlotVal;
        stateObj.slotRadioOther = otherSlotVal;

        stateObj.splitDeliverySlot = true;
        const foodDeliverySlots = deliveryDetails.deliverySlotSession.sortedFoodDeliverySlots;
        const weekIndexFood = DeliverySlots.findWeekIndex(reservedSlots[0], foodDeliverySlots);
        stateObj.foodDeliverySlotWeekIndex = weekIndexFood;

        const otherDeliverySlots = deliveryDetails.deliverySlotSession.sortedOtherDeliverySlots;
        const weekIndexOther = DeliverySlots.findWeekIndex(reservedSlots[1], otherDeliverySlots);
        stateObj.otherDeliverySlotWeekIndex = weekIndexOther;
      }
      this.setState(stateObj);
    }
  }

  onSlotChange(table = 'join', slotValue, e) {
    let key = 'slotRadio';
    if (table === 'food') {
      key = 'slotRadioFood';
    }
    if (table === 'clothing') {
      key = 'slotRadioOther';
    }
    this.setState({
      [key]: e.currentTarget.value
    });
    if (this.props.updateDeliverySlot) {
      const slotData = JSON.parse(slotValue);
      const reqObj = {};
      if (this.state.splitDeliverySlot) {
        reqObj.joinBasket = "false";
        if (table === 'food') {
          let slotRadioOther = {};
          if (this.state.slotRadioOther) {
            slotRadioOther = JSON.parse(this.state.slotRadioOther);
          }
          reqObj.foodShipOnDate = slotData.shipOnDateValue || '';
          reqObj.otherShipOnDate = slotRadioOther.shipOnDateValue || '';
          reqObj.foodDeliverySlotId = slotData.deliverySlotValue || '';
          reqObj.otherDeliverySlotId = slotRadioOther.deliverySlotValue || '';
          reqObj.oddDeliverySlotId = '';
        }
        if (table === "clothing") {
          let slotRadioFood = {};
          if (this.state.slotRadioFood) {
            slotRadioFood = JSON.parse(this.state.slotRadioFood);
          }
          reqObj.foodShipOnDate = slotRadioFood.shipOnDateValue || '';
          reqObj.otherShipOnDate = slotData.shipOnDateValue || '';
          reqObj.foodDeliverySlotId = slotRadioFood.deliverySlotValue || '';
          reqObj.otherDeliverySlotId = slotData.deliverySlotValue || '';
          reqObj.oddDeliverySlotId = '';
        }
      } else {
        reqObj.joinBasket = "true";
        reqObj.foodShipOnDate = slotData.shipOnDateValue;
        reqObj.otherShipOnDate = '';
        reqObj.foodDeliverySlotId = slotData.deliverySlotValue;
        reqObj.otherDeliverySlotId = '';
        reqObj.oddDeliverySlotId = '';
      }
      console.log(reqObj);
      this.props.updateDeliverySlot(reqObj);
    }
  }

  static getHourSlotsHtml(hourSlots) {
    if (!hourSlots.length) return (<div className="delivery-slots__slot-label" tabIndex="-1">&nbsp;</div>);
    const output = [];
    hourSlots.forEach((val, i) => {
      output.push(<div className="delivery-slots__slot-label" key={`hour_slots_${i}`} tabIndex="-1">{val}</div>);
    });
    return output;
  }

  reserveTimeSlot(e) {
    e.preventDefault();
    const slotRadio = (!this.state.splitDeliverySlot) ? JSON.parse(this.state.slotRadio) : JSON.parse(this.state.slotRadioFood);

    if (this.state.splitDeliverySlot) slotRadio.selected = 'false';
    const slotDetails = (!this.state.splitDeliverySlot) ? [slotRadio] : [slotRadio, JSON.parse(this.state.slotRadioFood), JSON.parse(this.state.slotRadioOther)];
    const data = {
      slotDetails,
      shipToAddressName: this.props.deliveryDetails.currentAddress.nickname,
      joinBosket: (!this.state.splitDeliverySlot) ? 'true' : 'false'
    };
    if (this.props.pageType !== 'checkout') {
      this.props.reserveDeliverySlots(data)
        .then(() => {
          this.props.deactivateModal();
        });
    } else {
      this.props.updateShippingInfo(data)
        .then(() => {
          this.props.setCheckoutActiveStep('deliveryOptions');
        });
    }
  }

  changeWeek(key, val) {
    this.setState((prevState) => {
      return { [key]: prevState[key] + val };
    });
  }

  onSplitChange(e) {
    this.setState({
      splitDeliverySlot: (e.currentTarget.value === 'true')
    });
  }

  static formatDates(date) {
    const dateObj = new Date(date);
    const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

  getTimeSlotsHtml(headerDates, deliverySlotsData, table = 'join') {
    if (!deliverySlotsData.length) return (<div />);
    const output = [];
    deliverySlotsData.forEach((val, i) => {
      const slotsInput = [];
      for (let j = 0; j < deliverySlotsData[i].length; j++) {
        const slotData = deliverySlotsData[i][j];
        if (!slotData) {
          slotsInput.push(
            <div className="delivery-slots__day-slot" key={`time_slot_${i}${j}`}>
              <label className="label-radio" htmlFor="disabledInput"><span className="sr" />
                <input type="radio" className="is-enhanced enhanced-radio" id="disabledInput" tabIndex="0" name={'delivery-slot-' + table} disabled />
                <span className="delivery-slots__cost"><span className="price">R 0</span></span></label>
            </div>
          );
          continue;
        }
        const inputId = `slotId_${table}_${slotData.slotId || 'disabled'}`;
        const inputVal = {
          deliverySlotValue: slotData.slotId,
          deliverySlotKey: table,
          table,
          shipOnDateKey: table,
          shipOnDateValue: slotData.stringShipOnDate,
          shipToAddressName: this.props.deliveryDetails.currentAddress.nickname,
          selected: 'true'
        };

        let currentSlotValue = this.state.slotRadio;
        if (table === 'food') currentSlotValue = this.state.slotRadioFood;
        if (table === 'clothing') currentSlotValue = this.state.slotRadioOther;
        slotsInput.push(
          <div className="delivery-slots__day-slot" key={`time_slot_${i}${j}`}>
            <label key={`time_slot_label_${i}${j}`} className="label-radio" htmlFor={inputId}><span className="sr">{slotData.description}</span>
              <input key={`time_slot_input_${i}${j}`} type="radio" className="is-enhanced enhanced-radio" id={inputId} tabIndex="0" name={'delivery-slot-' + table} value={JSON.stringify(inputVal)} disabled={!slotData.available} onChange={e => this.onSlotChange(table, JSON.stringify(inputVal), e)} checked={JSON.stringify(inputVal) === currentSlotValue} />
              <span className="delivery-slots__cost"><span className="price">R {slotData.slotCost}</span></span></label>
          </div>
        );
      }
      let jsxArray = headerDates[i] ? [(<div className="delivery-slots__day-label">{DeliverySlots.formatDates(headerDates[i])}</div>)] : [(<div className="delivery-slots__day-label" ><br /><br /></div>)];

      jsxArray = jsxArray.concat(slotsInput);
      output.push((
        <div className="delivery-slots__day" key={`delivery_slot_day_${i}`}>
          {jsxArray}
        </div>
      ));
    });
    return output;
  }

  static findWeekIndex(reservedSlot, deliverySlots) {
    let keyIndex = 0;
    if (deliverySlots.length) {
      deliverySlots.forEach((val, index) => {
        if (val.data.length) {
          val.data.forEach((slots) => {
            if (slots.length) {
              slots.forEach((slotJson) => {
                if (slotJson && slotJson.slotId === reservedSlot.slotId && slotJson.stringShipOnDate === reservedSlot.stringShipOnDate) {
                  keyIndex = index;
                }
              });
            }
          });
        }
      });
    }
    return keyIndex;
  }

  render() {
    const deliveryDetails = this.props.deliveryDetails;
    const reservedSlots = _.get(this.props, 'deliveryDetails.deliverySlotSession.reservedDeliverySlots', []);
    const isSlotReserved = reservedSlots.length > 0;

    let timeSlotJsx = null;
    if (isSlotReserved) {
      timeSlotJsx = (<div className="text-small">
        {reservedSlots.length === 1 && <h3>Your delivery time slot(s) : </h3>}
        {reservedSlots.length === 1 && <p id="slotDeliverySelected_1">You selected : <strong id="deliveryDate_1">{reservedSlots[0].description}</strong><strong id="deliveryTime_1">, {reservedSlots[0].hourFrom} - {reservedSlots[0].hourTo}*</strong></p>}
        <p>Click on "Reserve delivery slot" if you're happy with the selected date and time:</p>
      </div>);
    }

    const deliverySlots = this.props.deliveryDetails.deliverySlotSession;
    let hourSlots = [];
    let headerDates = [];
    let deliverySlotsData = [];

    let hourSlotsFood = [];
    let hourSlotsOther = [];
    let deliverySlotsFoodData = [];
    let deliverySlotsOtherData = [];
    let headerDatesFood = [];
    let headerDatesOthers = [];

    let timeSlotsHtml = (<div />);
    let hourSlotsHtml = (<div />);
    let timeSlotsFoodHtml = (<div />);
    let timeSlotsOtherHtml = (<div />);
    let hourSlotsFoodHtml = (<div />);
    let hourSlotsOtherHtml = (<div />);
    if (Object.keys(deliverySlots).length) {
      if (!this.state.splitDeliverySlot && Array.isArray(deliverySlots.sortedJoinDeliverySlots)) {
        hourSlots = deliverySlots.sortedJoinDeliverySlots[this.state.joinDeliverySlotWeekIndex].hourSlots;
        deliverySlotsData = deliverySlots.sortedJoinDeliverySlots[this.state.joinDeliverySlotWeekIndex].data;
        headerDates = deliverySlots.sortedJoinDeliverySlots[this.state.joinDeliverySlotWeekIndex].headerDates;
        hourSlotsHtml = DeliverySlots.getHourSlotsHtml(hourSlots);
        timeSlotsHtml = this.getTimeSlotsHtml(headerDates, deliverySlotsData);
      } else if (this.state.splitDeliverySlot && Array.isArray(deliverySlots.sortedFoodDeliverySlots) && Array.isArray(deliverySlots.sortedOtherDeliverySlots)) {
        hourSlotsFood = deliverySlots.sortedFoodDeliverySlots[this.state.foodDeliverySlotWeekIndex].hourSlots;
        hourSlotsOther = deliverySlots.sortedOtherDeliverySlots[this.state.otherDeliverySlotWeekIndex].hourSlots;

        deliverySlotsFoodData = deliverySlots.sortedFoodDeliverySlots[this.state.foodDeliverySlotWeekIndex].data;
        headerDatesFood = deliverySlots.sortedFoodDeliverySlots[this.state.foodDeliverySlotWeekIndex].headerDates;

        deliverySlotsOtherData = deliverySlots.sortedOtherDeliverySlots[this.state.otherDeliverySlotWeekIndex].data;
        headerDatesOthers = deliverySlots.sortedOtherDeliverySlots[this.state.otherDeliverySlotWeekIndex].headerDates;

        hourSlotsFoodHtml = DeliverySlots.getHourSlotsHtml(hourSlotsFood);
        timeSlotsFoodHtml = this.getTimeSlotsHtml(headerDatesFood, deliverySlotsFoodData, 'food');

        hourSlotsOtherHtml = DeliverySlots.getHourSlotsHtml(hourSlotsOther);
        timeSlotsOtherHtml = this.getTimeSlotsHtml(headerDatesOthers, deliverySlotsOtherData, 'clothing');
      }
    }

    let showHtml;
    if (Object.keys(deliverySlots).length === 0 && deliveryDetails.changeDeliveryAddress === false) {
      showHtml = (<h4>Order can not be delivered here, no delivery slots available for this address.</h4>);
    } else if (Object.keys(deliverySlots).length && !deliveryDetails.changeDeliveryAddress) {
      showHtml = (<div>
        <hr className="hr--light" />
        {!deliverySlots.splitEnabled ? (<h4>When should we deliver? Choose an option.</h4>) : (<div>
          <h4>Your order will be split into more than one delivery.</h4>
          <div className="display-table grid--space-y text-small">
            <div className="radio-toggle__row display-table__row">
              <span>
                <label htmlFor="fldOrderCombine" className={'enhanced-radio label-radio text-small ' + (!this.state.splitDeliverySlot ? 'is-checked' : '')}>
                  <input name="orderDate" id="fldOrderCombine" type="radio" value="false" className={'input is-enhanced enhanced-radio ' + (!this.state.splitDeliverySlot ? 'is-checked' : '')} onChange={this.onSplitChange} checked={!this.state.splitDeliverySlot} />
                  <span><strong>Deliver all items in one time slot</strong></span></label>
              </span>
            </div>
            <div className="radio-toggle__row display-table__row is-selected">
              <span>
                <label htmlFor="fldOrderSplit" className={'enhanced-radio label-radio text-small ' + (this.state.splitDeliverySlot ? 'is-checked' : '')}>
                  <input name="orderDate" id="fldOrderSplit" type="radio" value="true" className={'input is-enhanced enhanced-radio ' + (this.state.splitDeliverySlot ? 'is-checked' : '')} onChange={this.onSplitChange} checked={this.state.splitDeliverySlot} />
                  <span><strong>Deliver food items first and other items later</strong> (This may cost more)</span></label>
              </span>
            </div>
            <div className="formErrors">Please select a delivery option.</div>
          </div>
        </div>)
        }
        {!this.state.splitDeliverySlot ?
          (<div className="deliveryCombined deliveryWrapper deliveryTable" style={{ overflow: 'hidden' }}>
            <div className="grid--space-y" />
            <div className="delivery-slots deliverySlider selected">
              <div className="delivery-slots__slots">
                <div className="delivery-slots__slot-label" tabIndex="-1">&nbsp;</div>
                {hourSlotsHtml}
              </div>
              {timeSlotsHtml}
            </div>
            <div className="grid grid--space-y">
              <div className="grid__half">
                <a id="prev_sg564070929" className="text-small link--silent link--circ-arrow-hover previous-column sg564070929" style={{ display: this.state.joinDeliverySlotWeekIndex > 0 ? 'block' : 'none' }} onClick={this.changeWeek.bind(this, 'joinDeliverySlotWeekIndex', -1)}>
                  <span className="icon icon--left-circ-dark">�</span>
                  <span className="icon-text">Previous week</span>
                </a> &nbsp;
                </div>
              <div className="grid__half grid--align-right">
                <a id="next_sg564070929_join" className="text-small link--silent link--circ-arrow-hover next-column sg564070929" style={{ display: this.state.joinDeliverySlotWeekIndex < deliverySlots.sortedJoinDeliverySlots.length - 1 ? 'block' : 'none' }} onClick={this.changeWeek.bind(this, 'joinDeliverySlotWeekIndex', 1)}>
                  <span className="icon-text">Next week</span>
                  <span className="icon icon--right-circ-dark">�</span>
                </a>
              </div>
            </div>
            <hr className="hr--light" />
          </div>) :
          (<div>
            <div className="deliverySplit deliveryWrapper deliveryTable grid food" style={{ overflow: 'hidden' }}>
              <div className="grid--space-y">
                <div className="text-caps text-small strong heading--4 font-graphic">Your food items</div>
              </div>
              <div className=" text-small">When should we deliver? Choose a timeslot.</div>
              <hr className="hr--light" />
              <div className="delivery-slots deliverySlider selected">
                <div className="delivery-slots__slots">
                  <div className="delivery-slots__slot-label" tabIndex="-1">&nbsp;</div>
                  {hourSlotsFoodHtml}
                </div>
                {timeSlotsFoodHtml}
              </div>
              <div className="grid grid--space-y">
                <div className="grid__half">
                  <a id="prev_sg564070929" className="text-small link--silent link--circ-arrow-hover previous-column sg564070929" style={{ display: this.state.foodDeliverySlotWeekIndex > 0 ? 'block' : 'none' }} onClick={this.changeWeek.bind(this, 'foodDeliverySlotWeekIndex', -1)}>
                    <span className="icon icon--left-circ-dark">�</span>
                    <span className="icon-text">Previous week</span>
                  </a> &nbsp;
                  </div>
                <div className="grid__half grid--align-right">
                  <a id="next_sg564070929_join" className="text-small link--silent link--circ-arrow-hover next-column sg564070929" style={{ display: this.state.foodDeliverySlotWeekIndex < deliverySlots.sortedFoodDeliverySlots.length - 1 ? 'block' : 'none' }} onClick={this.changeWeek.bind(this, 'foodDeliverySlotWeekIndex', 1)}>
                    <span className="icon-text">Next week</span>
                    <span className="icon icon--right-circ-dark">�</span>
                  </a>
                </div>
              </div>
              <hr className="hr--light" />
            </div>
            <div className="deliverySplit deliveryWrapper deliveryTable grid clothing" style={{ overflow: 'hidden' }}>
              <div className="grid--space-y">
                <div className="text-caps text-small strong heading--4 font-graphic">Your other items</div>
              </div>
              <div className=" text-small">When should we deliver? Choose a timeslot.</div>
              <hr className="hr--light" />
              <div className="delivery-slots deliverySlider selected">
                <div className="delivery-slots__slots">
                  <div className="delivery-slots__slot-label" tabIndex="-1">&nbsp;</div>
                  {hourSlotsOtherHtml}
                </div>
                {timeSlotsOtherHtml}
              </div>
              <div className="grid grid--space-y">
                <div className="grid__half">
                  <a id="prev_sg564070929" className="text-small link--silent link--circ-arrow-hover previous-column sg564070929" style={{ display: this.state.otherDeliverySlotWeekIndex > 0 ? 'block' : 'none' }} onClick={this.changeWeek.bind(this, 'otherDeliverySlotWeekIndex', -1)}>
                    <span className="icon icon--left-circ-dark">�</span>
                    <span className="icon-text">Previous week</span>
                  </a> &nbsp;
                  </div>
                <div className="grid__half grid--align-right">
                  <a id="next_sg564070929_join" className="text-small link--silent link--circ-arrow-hover next-column sg564070929" style={{ display: this.state.otherDeliverySlotWeekIndex < deliverySlots.sortedOtherDeliverySlots.length - 1 ? 'block' : 'none' }} onClick={this.changeWeek.bind(this, 'otherDeliverySlotWeekIndex', 1)}>
                    <span className="icon-text">Next week</span>
                    <span className="icon icon--right-circ-dark">�</span>
                  </a>
                </div>
              </div>
              <hr className="hr--light" />
            </div>
          </div>)}
        {this.props.pageType !== 'checkout' && timeSlotJsx}
        {this.props.pageType !== 'checkout' && (<div className="form-field">
          {(!this.state.splitDeliverySlot) ?
            (<button type="submit" id="reserveDeliverySlotSubmit" className="btn btn--primary btn--right" disabled={this.state.slotRadio === '' ? 'disabled' : false} onClick={this.reserveTimeSlot}>Reserve time slot</button>)
            : (<button type="submit" id="reserveDeliverySlotSubmit" className="btn btn--primary btn--right" disabled={(this.state.slotRadioFood === '' || this.state.slotRadioOther === '') ? 'disabled' : false} onClick={this.reserveTimeSlot}>Reserve time slot</button>)}
          <span />
          <Link id="reserveDeliverySlotCancel" to="" onClick={this.props.deactivateModal} className="btn btn--secondary btn--right">Cancel</Link>
        </div>)
        }
        {
          this.props.pageType === 'checkout' && (<fieldset className="grid--space-y">
            <p className="floatL noMargT">
              <Link to="/checkout/cart" className="prevLink">Go back</Link>
            </p>
            {(!this.state.splitDeliverySlot) ?
              (<button id="deliveryOneNext" onClick={this.reserveTimeSlot} className="button nextBtn floatR" disabled={this.state.slotRadio === '' ? 'disabled' : false} >Next</button>)
              : (<button id="deliveryOneNext" onClick={this.reserveTimeSlot} className="button nextBtn floatR" disabled={(this.state.slotRadioFood === '' || this.state.slotRadioOther === '') ? 'disabled' : false} >Next</button>)}
          </fieldset>)
        }
      </div>);
    } else {
      showHtml = (<div />);
    }
    return showHtml;
  }
}
