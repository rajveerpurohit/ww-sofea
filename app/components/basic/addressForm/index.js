import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class AddressForm extends Component {

constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.provinceChange = this.provinceChange.bind(this);
    this.suburbChange = this.suburbChange.bind(this);
}

onSubmit(e) {
    e.preventDefault();
    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    formData.type = 'secondaryAddresses';

    this.props.addNewAddress(formData);
}

provinceChange(e) {
    e.preventDefault();
    const provinceId = e.target.value;
    this.props.changeLocation(provinceId);
    return false;
  }

  suburbChange(e) {
    e.preventDefault();
    const suburbId = e.target.value;
    this.props.changeLocation('', suburbId);
    return false;
  }

  render() {
    const form = this.props.deliveryDetails.form;
    const selectLocation = this.props.selectLocation;
    const provinceLabel = this.props.provinceLabel;
    const provinceOptions = this.props.provinceOptions;
    const suburbOptions = this.props.suburbOptions;
    const suburbLabel = this.props.suburbLabel;
    const postCode = this.props.postCode;

    return (
        <form onSubmit={this.onSubmit}>
            <div className="text-small message message--error" data-reactid="16" style={{display: (!form.error) ? 'none' : 'block'}}><span data-reactid="17">{form.error}</span></div>
            <div className="form-field">
                <input ref="nickname" type="text" placeholder="Address nickname*" />
            </div>
            <div className="form-field">
                <input ref="recipientName" type="text" placeholder="Recipient name*" />
            </div>
            <div className="form-field">
                <input ref="address1" type="text" placeholder="Address line 1*" />
            </div>
            <div className="form-field">
                <input ref="address2" type="text" placeholder="Address line 2" />
            </div>
            <div id="provinceSuburbContainer" name="provinceSuburbContainer" className="form-field">
                <div className="form-field">
                    <span className="enhanced-select">
                        <select id="select-example" ref="city" value={provinceLabel} name="select-example" data-js="enhance-select" onChange={this.provinceChange}>
                            {provinceOptions}
                        </select>
                    <span className="enhanced-select__label">{ provinceLabel || 'Select a Province'}&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                </div>
                <div className="form-field">
                    <span className="enhanced-select">
                    <select id="select-example-2" ref="suburb" value={suburbLabel} name="select-example-2" data-js="enhance-select" onChange={this.suburbChange}>
                        {suburbOptions}
                    </select>
                    <span className="enhanced-select__label">{ suburbLabel || 'Select a Suburb' }&nbsp;</span>
                    <span className="icon enhanced-select__icon" /></span>
                </div>
                <section id="delivery-location-message"></section>
            </div>
            <div className="form-field">
                <input type="tel" ref="postalCode" placeholder="Post code" value={postCode} disabled="true" />
            </div>
            <div className="form-field">
                <input type="text" ref="primaryContactNo" placeholder="Contact Number*" name="primaryContactNo" />
            </div>
            <div className="form-field">
                <input type="text" placeholder="Additional contact" name="additionalContactNo" />
            </div>
            <div className="form-field">
                <p className="text-small strong">* Required fields</p>
                <hr />
            </div>
            <div className="form-field">
                <button type="submit" className="btn btn--primary btn--right">Save new address</button>
            </div>
        </form>
    );
  }
}