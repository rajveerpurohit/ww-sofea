import React, { Component } from 'react';
import { Link } from 'react-router';

import _ from 'lodash';

export default class DeliverySlotsSlider extends Component {
  constructor(props) {
    super(props);
    this.onChangeWeek = this.onChangeWeek.bind(this);
    this.onSlotChange = this.onSlotChange.bind(this);
    this.state = {
      slotRadio: '',
      slotRadioFood: '',
      slotRadioOther: '',
      deliverySlotWeekIndex: 0
    };
  }
  componentDidMount() {
    const reservedSlots = this.props.reservedSlots;
    if (reservedSlots.length === 1) {
      const stateObj = {};
      const reservedSlotId = reservedSlots.length > 0 ? reservedSlots[0].slotId : 0;
      const slotVal = {
        deliverySlotValue: reservedSlotId,
        deliverySlotKey: 'join',
        table: 'join',
        shipOnDateKey: 'join',
        shipOnDateValue: reservedSlots[0].stringShipOnDate,
        shipToAddressName: this.props.currentAddress,
        selected: 'true'
      };
      stateObj.slotRadio = JSON.stringify(slotVal);
      stateObj.deliverySlotWeekIndex = DeliverySlotsSlider.findWeekIndex(reservedSlots[0], this.props.payload);
      this.setState(stateObj);
    } else if (reservedSlots.length === 2 && this.props.type === 'food') {
      const stateObj = {};
      const foodSlotVal = {
        deliverySlotValue: reservedSlots[0].slotId,
        deliverySlotKey: 'food',
        table: 'food',
        shipOnDateKey: 'food',
        shipOnDateValue: reservedSlots[0].stringShipOnDate,
        shipToAddressName: this.props.currentAddress,
        selected: 'true'
      };
      stateObj.slotRadioFood = JSON.stringify(foodSlotVal);
      stateObj.deliverySlotWeekIndex = DeliverySlotsSlider.findWeekIndex(reservedSlots[0], this.props.payload);
      console.log('food', stateObj);
      this.setState(stateObj);
    } else if (reservedSlots.length === 2 && this.props.type === 'clothing') {
      const stateObj = {};
      const otherSlotVal = {
        deliverySlotValue: reservedSlots[1].slotId,
        deliverySlotKey: 'clothing',
        table: 'clothing',
        shipOnDateKey: 'clothing',
        shipOnDateValue: reservedSlots[1].stringShipOnDate,
        shipToAddressName: this.props.currentAddress,
        selected: 'true'
      };
      stateObj.slotRadioOther = JSON.stringify(otherSlotVal);
      stateObj.deliverySlotWeekIndex = DeliverySlotsSlider.findWeekIndex(reservedSlots[1], this.props.payload);
      console.log('clothing', stateObj);
      this.setState(stateObj);
    } else if (reservedSlots.length === 2 && this.props.type === 'join') {
      const stateObj = {};
      const slotVal = {
        deliverySlotValue: reservedSlots[1].slotId,
        deliverySlotKey: 'join',
        table: 'join',
        shipOnDateKey: 'join',
        shipOnDateValue: reservedSlots[1].stringShipOnDate,
        shipToAddressName: this.props.currentAddress,
        selected: 'true'
      };
      stateObj.slotRadio = JSON.stringify(slotVal);
      stateObj.deliverySlotWeekIndex = DeliverySlotsSlider.findWeekIndex(reservedSlots[1], this.props.payload);
      console.log('clothing', stateObj);
      this.setState(stateObj);
    }
    if (this.props.reservedSlots.length > 0) {
      this.props.submitBtnEnable(true);
    }
  }
  onChangeWeek(e) {
    let val = parseInt(e.currentTarget.getAttribute('data-weekindex'), 10);
    this.setState((prevState) => {
      return { deliverySlotWeekIndex: prevState.deliverySlotWeekIndex + val };
    });
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
      // if (this.state.splitDeliverySlot) {
        // reqObj.joinBasket = 'false';
      if (table === 'food') {
        reqObj.joinBasket = 'false';
        let slotRadioOther = {};
        if (this.state.slotRadioOther) {
          slotRadioOther = JSON.parse(this.state.slotRadioOther);
        }
        reqObj.foodShipOnDate = slotData.shipOnDateValue || '';
        reqObj.otherShipOnDate = slotRadioOther.shipOnDateValue || '';
        reqObj.foodDeliverySlotId = slotData.deliverySlotValue || '';
        reqObj.otherDeliverySlotId = slotRadioOther.deliverySlotValue || '';
        reqObj.oddDeliverySlotId = '';
      } else if (table === 'clothing') {
        let slotRadioFood = {};
        reqObj.joinBasket = 'false';
        if (this.state.slotRadioFood) {
          slotRadioFood = JSON.parse(this.state.slotRadioFood);
        }
        reqObj.foodShipOnDate = slotRadioFood.shipOnDateValue || '';
        reqObj.otherShipOnDate = slotData.shipOnDateValue || '';
        reqObj.foodDeliverySlotId = slotRadioFood.deliverySlotValue || '';
        reqObj.otherDeliverySlotId = slotData.deliverySlotValue || '';
        reqObj.oddDeliverySlotId = '';
        // }
      } else {
        reqObj.joinBasket = 'true';
        reqObj.foodShipOnDate = slotData.shipOnDateValue;
        reqObj.otherShipOnDate = '';
        reqObj.foodDeliverySlotId = slotData.deliverySlotValue;
        reqObj.otherDeliverySlotId = '';
        reqObj.oddDeliverySlotId = '';
      }
      console.log(reqObj);
      this.props.updateDeliverySlot(reqObj);
      if (this.props.purpose === 'onlyFoodItems' || this.props.purpose === 'onlyOtherItems' || this.props.purpose === 'joinItems') {
        this.props.submitBtnEnable(true);
      } else if (this.props.purpose === 'foodItems') {
        this.props.submitBtnEnable('foodItems');
      } else if (this.props.purpose === 'otherItems') {
        this.props.submitBtnEnable('otherItems');
      }
    }
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
              <label className="label-radio" htmlFor={`disabledInput_${i}${j}`}><span className="sr" />
                <input type="radio" className="is-enhanced enhanced-radio" id={`disabledInput_${i}${j}`} tabIndex="0" name={'delivery-slot-' + table} disabled />
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
          shipToAddressName: this.props.currentAddress,
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
      let jsxArray = headerDates[i] ? [(<div className="delivery-slots__day-label">{DeliverySlotsSlider.formatDates(headerDates[i])}</div>)] : [(<div className="delivery-slots__day-label" ><br /><br /></div>)];

      jsxArray = jsxArray.concat(slotsInput);
      output.push((
        <div className="delivery-slots__day" key={`delivery_slot_day_${i}`}>
          {jsxArray}
        </div>
      ));
    });
    return output;
  }
  static getHourSlotsHtml(hourSlots) {
    if (!hourSlots.length) return (<div className="delivery-slots__slot-label" tabIndex="-1">&nbsp;</div>);
    const output = [];
    hourSlots.forEach((val, i) => {
      output.push(<div className="delivery-slots__slot-label" key={`${val}`} tabIndex="-1">{val}</div>);
    });
    return output;
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
    const slideNo = this.props.payload ? this.props.payload.length : 1;
    let tableHourSlots = []; // table left side index
    let tableHeaderDates = [];
    let tableDeliverySlotsData = [];

    let tableHourSlotsHtml = (<div />);
    let tableTimeSlotsHtml = (<div />);
    tableHourSlots = _.get(this.props, `payload[${this.state.deliverySlotWeekIndex}].hourSlots`, []);
    tableHeaderDates = _.get(this.props, `payload[${this.state.deliverySlotWeekIndex}].headerDates`, []);
    tableDeliverySlotsData = _.get(this.props, `payload[${this.state.deliverySlotWeekIndex}].data`, []);

    tableHourSlotsHtml = DeliverySlotsSlider.getHourSlotsHtml(tableHourSlots);
    tableTimeSlotsHtml = this.getTimeSlotsHtml(tableHeaderDates, tableDeliverySlotsData, this.props.type);
    return (<div>
      <div className="delivery-slots deliverySlider selected">
        <div className="delivery-slots__slots">
          <div className="delivery-slots__slot-label" tabIndex="-1">&nbsp;</div>
          {tableHourSlotsHtml}
        </div>
        {tableTimeSlotsHtml}
      </div>
      <div className="grid grid--space-y">
        <div className="grid__half">
          <Link id="prev_sg564070929" className="text-small link--silent link--circ-arrow-hover previous-column sg564070929" style={{ display: this.state.deliverySlotWeekIndex > 0 ? 'block' : 'none' }} data-weekIndex="-1" onClick={this.onChangeWeek}>
            <span className="icon icon--left-circ-dark">�</span>
            <span className="icon-text">Previous week</span>
          </Link> &nbsp;
        </div>
        <div className="grid__half grid--align-right">
          <Link id="next_sg564070929_join" className="text-small link--silent link--circ-arrow-hover next-column sg564070929" style={{ display: this.state.deliverySlotWeekIndex < slideNo - 1 ? 'block' : 'none' }} data-weekIndex="1" onClick={this.onChangeWeek}>
            <span className="icon-text">Next week</span>
            <span className="icon icon--right-circ-dark">�</span>
          </Link>
        </div>
      </div>
      <hr className="hr--light" />
    </div>);
  }
}
