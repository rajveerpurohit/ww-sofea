import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

import {
  DEFAULT_DATE_PICKER_DATE_FORMAT
} from '../../../Constants';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: props.startDate || null
    };

    this.handleChange = this.handleChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.formMomentDateObj = this.formMomentDateObj.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      startDate: nextProps.startDate || this.state.startDate
    });
  }

  handleChange(startDate) {
    if (this.props.handleChange) {
      this.props.handleChange(this.formatDate(startDate));
    } else {
      this.setState({ startDate });
    }
  }

  formatDate(date) {
    if (date) {
      try {
        let _date = date;

        if (typeof date === 'string') {
          _date = moment(new Date(date.split(' ')[0]));
        }

        return _date.format(DEFAULT_DATE_PICKER_DATE_FORMAT);
      } catch (e) {
        return '';
      }
    }
  }

  formMomentDateObj(date) {
    if (date) {
      try {
        let _date = moment();

        if (typeof date === 'string') {
          _date = moment(new Date(date.split(' ')[0]));
        }

        return _date;
      } catch (e) {
        return '';
      }
    }

    return null;
  }

  render() {
    return (
      <ReactDatePicker
        selected={this.formMomentDateObj(this.state.startDate)}
        onChange={this.handleChange}
        dateFormat={DEFAULT_DATE_PICKER_DATE_FORMAT}
        placeholderText={this.props.placeholder}
        className="datepicker-field react-datepicker__input-container"
        customInput={<div>
          <input
          type="text"
          value={this.state.startDate}
          placeholder={this.props.placeholder}
          className="datepicker-field react-datepicker-ignore-onclickoutside"
          />
          <span className="datepicker-btn"><i /></span>
        </div>}
      />
    );
  }
}
