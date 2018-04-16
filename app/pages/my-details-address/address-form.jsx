import React, { Component } from 'react';
import _ from 'lodash';
import { run, ruleRunner } from '../../utils/validations/ruleRunner';
import { requiredFieldWithErrorMessage, validateContactNumber } from '../../utils/validations/rules';

const fieldValidations = [
  ruleRunner('nickname', 'Nick Name', requiredFieldWithErrorMessage('nickname')),
  ruleRunner('recipientName', 'Recipient Name', requiredFieldWithErrorMessage('recipientName')),
  ruleRunner('address1', 'Address 1', requiredFieldWithErrorMessage('address1')),
  ruleRunner('primaryContactNo', 'Contact Number', requiredFieldWithErrorMessage('primaryContactNo'))
];

class AddressFormUpdate extends Component {

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
    this.state = {
      toggleDivName: '',
      addressid: null,
      c2EditForm: '',
      showErrors: false,
      validationErrors: {},
      c2Address: {
        address2: '',
        address1: '',
        postalCode: '',
        cityID: '',
        province: '',
        cityName: '',
        countryCode: '',
        suburb: '',
        addressResidenceTypeID: '',
        provinceName: '',
      }
    }
  }

  componentWillMount() {
    // Run validations on initial state
    const currentAddress = this.props.addresses && this.props.addresses[this.props.activeAddress];
    if(!this.props.activeAddress) this.setState({validationErrors: run(this.state, fieldValidations)});
    else this.setState(Object.assign({}, this.state, currentAddress));
  }
  componentWillUnmount() {
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
        formData[field] = this.refs[field].value;
      }
      formData.city = this.getProvinceLabel(formData.region) || this.getProvinceLabel(currentAddress && currentAddress.region);;
      formData.suburb = this.getSuburbLabel(formData.region, formData.suburbId) || (currentAddress && currentAddress.suburb);
      formData.postalCode = this.getPostalCode(formData.region, formData.suburbId) || (currentAddress && currentAddress.postalCode);
      if(!formData.suburbId) formData.suburbId = currentAddress.suburbId
      if(!formData.region) formData.region = currentAddress.region
      this.props.updateaddressDetails(Object.assign({}, currentAddress, formData))
      .then(()=> this.props.toggleCloseDiv());
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

  render() {
    const defaultFormValue = this.props.addresses && this.props.addresses[this.props.activeAddress];
    const deliveryDetails = this.props.deliveryDetails;
    const form = this.props.deliveryDetails.form;
    const selectLocation = deliveryDetails.selectCurrentLocation;
    // selectLocation.provinceId = defaultFormValue && defaultFormValue.region
    // selectLocation.suburbId = defaultFormValue && defaultFormValue.suburbId
    const provinceOptions = this.getProvinceOptions(selectLocation.provinceId);
    const suburbOptions = this.getSuburbOptions(selectLocation.provinceId);
    const provinceLabel = this.getProvinceLabel(selectLocation.provinceId) || this.getProvinceLabel(defaultFormValue && defaultFormValue.region);
    const suburbLabel = this.getSuburbLabel(selectLocation.provinceId, selectLocation.suburbId) || (defaultFormValue && defaultFormValue.suburb);
    const postCode = this.getPostalCode() || (defaultFormValue && defaultFormValue.postalCode);
    return (
      <form onSubmit={this.onSubmit}>
        <div className="text-small message message--error" style={{ display: (!form.error) ? 'none' : 'block' }}><span>{form.error}</span></div>
        <div className="form-field">
          <input ref="nickname" name="nickname" type="text" maxLength="40" placeholder="Address nickname*" defaultValue={defaultFormValue && defaultFormValue.nickname} onChange={ this.handleFieldChanged('nickname') } />
          <p className="information characters" style={this.props.charStyles}><span>{this.state.nickname && this.state.nickname.length > 0 ? 40 - this.state.nickname.length : '40'} characters</span></p>
          { this.state.showErrors && this.errorFor('nickname') && (<div style={{display: 'block'}} className="formErrors">{this.errorFor('nickname')}</div>) }
        </div>
        <div className="form-field">
          <input ref="recipientName" type="text" maxLength="40" placeholder="Recipient name*" defaultValue={defaultFormValue && defaultFormValue.recipientName} onChange={ this.handleFieldChanged('recipientName') } />
          <p className="information characters" style={this.props.charStyles}><span>{this.state.recipientName && this.state.recipientName.length > 0 ? 40 - this.state.recipientName.length : '40'}  characters</span></p>
          { this.state.showErrors && this.errorFor('recipientName') && (<div style={{display: 'block'}} className="formErrors">{this.errorFor('recipientName')}</div>) }
        </div>
        <div className="form-field">
          <input ref="address1" type="text" maxLength="50" placeholder="Address line 1*" defaultValue={defaultFormValue && defaultFormValue.address1} onChange={ this.handleFieldChanged('address1') } />
          <p className="information characters" style={this.props.charStyles}><span>{this.state.address1 && this.state.address1.length > 0 ? 50 - this.state.address1.length : '50'}  characters</span></p>
          { this.state.showErrors && this.errorFor('address1') && (<div style={{display: 'block'}} className="formErrors">{this.errorFor('address1')}</div>) }
        </div>
        <div className="form-field">
          <input ref="address2" type="text" maxLength="50" placeholder="Address line 2" onChange={ this.handleFieldChanged('address2') } defaultValue={defaultFormValue && defaultFormValue.address2} />
          <p className="information characters" style={this.props.charStyles}><span>{this.state.address2 && this.state.address2.length > 0 ? 50 - this.state.address2.length : '50'}  characters</span></p>
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
              <select id="select-example-2" ref="suburbId" value={selectLocation.suburbId || defaultFormValue && defaultFormValue.suburbId} name="select-example-2" onChange={this.suburbChange}>
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
          { this.state.showErrors && this.errorFor('contactNumber') && (<div style={{display: 'block'}} className="formErrors">{this.errorFor('contactNumber')}</div>) }
        </div>
        <div className="form-field">
          <input type="text" ref="secondaryContactNo" placeholder="Additional contact" name="secondaryContactNo" defaultValue={defaultFormValue && defaultFormValue.secondaryContactNo} />
        </div>
        <div className="form-field">
          <textarea onChange={(e)=> this.handleInputChange(e)}
            maxLength="240" name="SplInstr" id="fldSplInstr" placeholder="Special Instructions" rows="8" cols="40" className="charLimit stdFld" style={{
            zIndex: 'auto', position: 'relative', lineHeight: 'normal', fontSize: '13.3333px', transition: 'none', background: 'transparent !important' }}
            defaultValue={defaultFormValue && defaultFormValue.SplInstr} />
          <p className="information characters" style={this.props.charStyles}><span>{ this.state.SplInstr && this.state.SplInstr.length > 0 ? 240 - this.state.SplInstr.length : '240'} characters</span></p>
          <p className={this.props.instClass || "disclaimer"}>Your privacy is important to us. Please don't send us any personal information we don't need.</p>
        </div>

        <div className="form-field">
          <p className="text-small strong">* Required fields</p>
          <hr />
        </div>
        <div className="form-field">
          <button type="submit" className="btn btn--primary btn--right">Update</button>
          <button type="reset" className="btn btn--silent cancel-btn" data-toggle-target='' onClick={(e)=>this.props.closeForm(e)} >Cancel<span className="icon"></span></button>
        </div>
      </form>
    );
  }
}

export default AddressFormUpdate;
