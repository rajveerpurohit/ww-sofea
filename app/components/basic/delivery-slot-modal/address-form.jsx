import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { run, ruleRunner } from '../../../utils/validations/ruleRunner';
import { requiredFieldWithErrorMessage, validateContactNumber } from '../../../utils/validations/rules';
import { error } from '../../compound/deliveryDetails/actions';

const fieldValidations = [
  ruleRunner('nickName', 'Nick Name', requiredFieldWithErrorMessage('nickName')),
  ruleRunner('recipientName', 'Recipient Name', requiredFieldWithErrorMessage('nameAndSurname')),
  ruleRunner('address1', 'Address 1', requiredFieldWithErrorMessage('addressLine1')),
  ruleRunner('contactNumber', 'Contact Number', validateContactNumber)
];

class AddressForm extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.provinceChange = this.provinceChange.bind(this);
    this.suburbChange = this.suburbChange.bind(this);
    this.getProvinceLabel = this.getProvinceLabel.bind(this);
    this.getSuburbLabel = this.getSuburbLabel.bind(this);
    this.getPostalCode = this.getPostalCode.bind(this);
    this.getProvinceOptions = this.getProvinceOptions.bind(this);
    this.getSuburbOptions = this.getSuburbOptions.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.handleFieldChanged = this.handleFieldChanged.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getLength = this.getLength.bind(this);
    this.state = {
      showErrors: false,
      validationErrors: { },
      SplInstr: ''
    }
  }

  componentWillMount() {
    // Run validations on initial state
    this.setState({validationErrors: run(this.state, fieldValidations)});
  }

  componentWillUnmount() {
    this.props.error();
    this.props.changeLocation();
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ showErrors: true });
    const validationErrors = this.state.validationErrors;
    if (_.size(validationErrors) === 0) {
      const formData = {};
      const currentAddress = this.props.addresses && this.props.addresses[this.props.activeAddress];
      for (const field in this.refs) {
        if (this.refs.hasOwnProperty(field)) formData[field] = this.refs[field].value;
      }
      formData.city = this.getProvinceLabel(formData.region);
     
      formData.suburb = this.getSuburbLabel(formData.region, formData.suburbId);
      formData.postalCode = this.getPostalCode(formData.region, formData.suburbId);
      formData.type = 'secondaryAddresses';
      if (currentAddress && currentAddress.id) {
        this.props.updateaddressDetails(Object.assign({}, currentAddress, formData));
      } else {
        this.props.addNewAddress(formData, this.props.deliveryDetails).then(()=> {if(this.props.count)this.props.toggleCloseDiv()});
        ;
      } 
    }
  }

  getProvinceLabel(pid) {
    const deliveryArea = this.props.DeliverAreaData;
    const area = deliveryArea.filter(a => a.id === pid);
    return area.length ? area[0].name : '';
  }

  getSuburbLabel(pid, sid) {
    const deliveryArea = this.props.DeliverAreaData;
    const area = deliveryArea.filter(a => a.id === pid);
    const suburbs = area.length ? area[0].suburbs : [];
    const suburbData = suburbs.filter(s => s.id === sid);
    return suburbData.length ? suburbData[0].name : '';
  }

  getPostalCode() {
    const selectCurrentLocation = this.props.deliveryDetails.selectCurrentLocation;
    const pid = selectCurrentLocation.provinceId;
    const sid = selectCurrentLocation.suburbId;
    if (sid === '') {
      return null;
    }
    const deliveryArea = this.props.DeliverAreaData;
    const area = deliveryArea.filter(a => a.id === pid);
    const suburbs = area.length ? area[0].suburbs : [];
    const suburbData = suburbs.filter(s => s.id === sid);
    return suburbData.length ? suburbData[0].postalCode : '';
  }
  
  getProvinceOptions() {
    const deliveryArea = this.props.DeliverAreaData;
    const provinceOptions = [];

    deliveryArea.forEach((ele) => {
      provinceOptions.push(<option key={ele.id} value={ele.id}>{ele.name}</option>);
    });
    return provinceOptions;
  }

  getSuburbOptions(provinceId = 0) {
    if (!provinceId) return [];
    const deliveryArea = this.props.DeliverAreaData;
    const area = deliveryArea.filter(a => a.id === provinceId);
    const suburbsArr = area.length ? area[0].suburbs : [];
    const suburbOptions = [];
    suburbsArr.forEach((ele) => {
      suburbOptions.push(<option key={ele.id} value={ele.id}>{ele.name}</option>);
    });
    return suburbOptions;
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
    this.getPostalCode();
    return false;
  }

  errorFor(field) {
    return this.state.validationErrors[field] || "";
  }

  handleFieldChanged(field) {
    return (e) => {
      const newState = { ...this.state };
      newState[field] = e.target.value;
      newState.validationErrors = run(newState, fieldValidations);
      this.setState(newState);
    };
  }
  handleInputChange(e) {
    this.setState({SplInstr : e.target.value});
    // this.updateValidators(inputPropName, e.target.value);
  }
  getLength(field) {
    return this.refs[field] && this.refs[field].value.length;
  }

  render() {
    const deliveryDetails = this.props.deliveryDetails;
    const form = this.props.deliveryDetails.form;
    const selectLocation = deliveryDetails.selectCurrentLocation;
    const provinceOptions = this.getProvinceOptions(selectLocation.provinceId);
    const suburbOptions = this.getSuburbOptions(selectLocation.provinceId);
    const provinceLabel = this.getProvinceLabel(selectLocation.provinceId);
    const suburbLabel = this.getSuburbLabel(selectLocation.provinceId, selectLocation.suburbId);
    const postCode = this.getPostalCode();
    const defaultFormValue = this.props.addresses && this.props.addresses[this.props.activeAddress];
    const { count } = this.props
    const { showErrors, SplInstr } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="text-small message message--error" style={{ display: (!form.error) ? 'none' : 'block' }}><span>{form.error}</span></div>
        <div className="form-field">
          <input ref="nickname" type="text" maxLength="40" placeholder="Address nickname*" defaultValue={defaultFormValue && defaultFormValue.nickname} onChange={ this.handleFieldChanged('nickName') } />
          {count ? <p className="information characters" style={this.props.charStyles}><span>{this.getLength('nickname') > 0 ? 40 - this.getLength('nickname') : '40'} characters</span></p> : null}
          { showErrors && this.errorFor('nickName') && (<div style={{display: 'block'}} className="formErrors">{this.errorFor('nickName')}</div>) }
        </div>
        <div className="form-field">
          <input ref="recipientName" type="text" maxLength="40" placeholder="Recipient name*" defaultValue={defaultFormValue && defaultFormValue.recipientName} onChange={ this.handleFieldChanged('recipientName') } />
          {count ? <p className="information characters" style={this.props.charStyles}><span>{this.getLength('recipientName') > 0 ? 40 - this.getLength('recipientName') : '40'} characters</span></p> : null}
          { showErrors && this.errorFor('recipientName') && (<div style={{display: 'block'}} className="formErrors">{this.errorFor('recipientName')}</div>) }
        </div>
        <div className="form-field">
          <input ref="address1" type="text" maxLength="50" placeholder="Address line 1*" defaultValue={defaultFormValue && defaultFormValue.address1} onChange={ this.handleFieldChanged('address1') } />
          {count ? <p className="information characters" style={this.props.charStyles}><span>{this.getLength('address1') > 0 ? 50 - this.getLength('address1') : '50'} characters</span></p> : null}
          { showErrors && this.errorFor('address1') && (<div style={{display: 'block'}} className="formErrors">{this.errorFor('address1')}</div>) }
        </div>
        <div className="form-field">
          <input ref="address2" type="text" maxLength="50" placeholder="Address line 2" onChange={ this.handleFieldChanged('address2') } defaultValue={defaultFormValue && defaultFormValue.address2} />
          {count ? <p className="information characters" style={this.props.charStyles}><span>{this.getLength('address2') > 0 ? 50 - this.getLength('address2') : '50'} characters</span></p> : null}
        </div>
        <div id="provinceSuburbContainer" name="provinceSuburbContainer" className="form-field">
          <div className="form-field">
            <span className="enhanced-select">
              <select id="select-example" ref="region" value={selectLocation.provinceId} name="select-example" onChange={this.provinceChange}>
                {provinceOptions}
              </select>
              <span className="enhanced-select__label">{ provinceLabel || 'Select a Province'}&nbsp;</span><span className="icon enhanced-select__icon" /></span>
          </div>
          <div className="form-field">
            <span className="enhanced-select">
              <select id="select-example-2" ref="suburbId" value={selectLocation.suburbId} name="select-example-2" onChange={this.suburbChange}>
                {suburbOptions}
              </select>
              <span className="enhanced-select__label">{ suburbLabel || 'Select a Suburb' }&nbsp;</span>
              <span className="icon enhanced-select__icon" /></span>
          </div>
          <section id="delivery-location-message" />
        </div>
        <div className="form-field">
          <input type="tel" id="postalCode" ref="postalCode" placeholder="Post code" value={postCode} disabled="true" />
        </div>
        <div className="form-field">
          <input type="text" ref="primaryContactNo" placeholder="Contact Number*" name="primaryContactNo" defaultValue={defaultFormValue && defaultFormValue.primaryContactNo} onChange={ this.handleFieldChanged('contactNumber') } />
          { showErrors && this.errorFor('contactNumber') && (<div style={{display: 'block'}} className="formErrors">{this.errorFor('contactNumber')}</div>) }
        </div>
        <div className="form-field">
          <input type="text" ref="secondaryContactNo" placeholder="Additional contact" name="secondaryContactNo" defaultValue={defaultFormValue && defaultFormValue.secondaryContactNo} />
        </div>
        <div className="form-field">
          <textarea onChange={(e)=> this.handleInputChange(e)}
            maxLength="240" name="SplInstr" id="fldSplInstr" placeholder="Special Instructions" rows="8" cols="40" className="charLimit stdFld" style={{
            zIndex: 'auto', position: 'relative', lineHeight: 'normal', fontSize: '13.3333px', transition: 'none', background: 'transparent !important' }}
            defaultValue={defaultFormValue && defaultFormValue.SplInstr} />
          <p className="information characters" style={this.props.charStyles}>{count ? <span>{SplInstr.length > 0 ? 240 - SplInstr.length : '240'} characters</span> : null}</p>
          <p className={this.props.instClass || "disclaimer"}>Your privacy is important to us. Please don't send us any personal information we don't need.</p>
        </div>

        <div className="form-field">
          <p className="text-small strong">* Required fields</p>
          <hr />
        </div>
        <div className="form-field">
          <button type="submit" className="btn btn--primary btn--right">Save new address</button>
          {this.props.closeForm ?
            <button type="reset" className="btn btn--silent cancel-btn" data-toggle-target='' onClick={(e)=>this.props.closeForm(e)} >Cancel<span className="icon"></span></button>
          :null}
        </div>
      </form>
    );
  }
}


export default connect(() => { return {}; }, { error })(AddressForm);
