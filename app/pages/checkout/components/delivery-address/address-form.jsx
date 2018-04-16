import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { error } from '../../../../components/compound/deliveryDetails/actions';
import { run, ruleRunner } from '../../../../utils/validations/ruleRunner';
import { requiredFieldWithErrorMessage, validateContactNumber } from '../../../../utils/validations/rules';

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
    this.getProvinceLabel = this.getProvinceLabel.bind(this);
    this.getSuburbLabel = this.getSuburbLabel.bind(this);
    this.getPostalCode = this.getPostalCode.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.handleFieldChanged = this.handleFieldChanged.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeAddressClick = this.handleChangeAddressClick.bind(this);
    this.getLength = this.getLength.bind(this);

    this.state = {
      showErrors: false,
      validationErrors: { },
      SplInstr: ''
    };
  }

  componentWillMount() {
    this.setState({ validationErrors: run(this.state, fieldValidations) });

    const { deliveryDetails } = this.props;

    const provinceId = _.get(deliveryDetails, 'deliveryLocation.provinceId', '');
    const suburbId = _.get(deliveryDetails, 'deliveryLocation.suburbId', '');
    this.props.changeLocation(provinceId);
    this.props.changeLocation('', suburbId);
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

      _.map(this.refs, (elem, field) => {
        if (field === 'region' || field === 'suburbId') {
          formData[field] = elem.getAttribute('value');
        } else {
          formData[field] = elem.value;
        }
      });

      const { region, suburbId } = formData;
      formData.city = this.getProvinceLabel(region);
      formData.suburb = this.getSuburbLabel(region, suburbId);
      formData.postalCode = this.getPostalCode(region, suburbId);
      formData.type = 'secondaryAddresses';

      if (!formData.suburbId) formData.suburbId = currentAddress.suburbId;
      if (!formData.region) formData.region = currentAddress.region;

      if (currentAddress && currentAddress.id) {
        this.props.updateaddressDetails(Object.assign({}, currentAddress, formData));
      } else {
        this.props.addNewAddress(formData).then(() => { if (this.props.count) this.props.toggleCloseDiv(); });
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

    if (sid === '') return null;

    const deliveryArea = this.props.DeliverAreaData;
    const area = deliveryArea.filter(a => a.id === pid);
    const suburbs = area.length ? area[0].suburbs : [];
    const suburbData = suburbs.filter(s => s.id === sid);

    return suburbData.length ? suburbData[0].postalCode : '';
  }

  getLength(field) {
    return this.refs[field] && this.refs[field].value.length;
  }

  errorFor(field) {
    return this.state.validationErrors[field] || '';
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
    this.setState({ SplInstr: e.target.value });
  }

  handleChangeAddressClick(evt) {
    const { showProvinceSuburbForm } = this.props;

    if (showProvinceSuburbForm) showProvinceSuburbForm(evt);
    else evt.preventDefault();
  }

  render() {
    const { showRemainingChars, deliveryDetails, addresses, activeAddress } = this.props;
    const form = deliveryDetails.form;
    const postCode = this.getPostalCode();
    const defaultFormValue = addresses && addresses[activeAddress];
    const { showErrors, SplInstr } = this.state;
    const charStyles = this.props.charStyles || { position: 'relative', left: '101%', top: '-25px' };
    const currentProvince = _.get(deliveryDetails, 'deliveryLocation.regionName', 'Select a Province');
    const currentSuburb = _.get(deliveryDetails, 'deliveryLocation.suburbName', 'Select a Suburb');
    const provinceId = _.get(deliveryDetails, 'deliveryLocation.provinceId', '');
    const suburbId = _.get(deliveryDetails, 'deliveryLocation.suburbId', '');

    return (
      <section className="dashboardBlock">
        <div id="newAddressFormDIV" className="formBlockHidden contactFormBlock formBlockFull formBlock" style={{ display: 'block' }}>
          <form onSubmit={this.onSubmit} id="newAddressForm" className="dashboardBlock contactForm newAddressForm validateForm" style={{ overflow: 'visible' }}>
            {form.error && <div className="text-small message message--error"><span>{form.error}</span></div>}
            <fieldset style={{ height: '32px' }}>
              <input
                ref="nickname" type="text" maxLength="40" placeholder="Address nickname*"
                defaultValue={defaultFormValue && defaultFormValue.nickname} onChange={this.handleFieldChanged('nickName')}
              />
              {showRemainingChars ? <p className="information characters" style={charStyles}><span>{this.getLength('nickname') > 0 ? 40 - this.getLength('nickname') : '40'} characters</span></p> : null}
              { showErrors && this.errorFor('nickName') && (<div style={{ display: 'block' }} className="formErrors">{this.errorFor('nickName')}</div>) }
            </fieldset>
            <fieldset style={{ height: '32px' }}>
              <input
                ref="recipientName" type="text" maxLength="40" placeholder="Recipient name*"
                defaultValue={defaultFormValue && defaultFormValue.recipientName} onChange={this.handleFieldChanged('recipientName')}
              />
              {showRemainingChars ? <p className="information characters" style={charStyles}><span>{this.getLength('recipientName') > 0 ? 40 - this.getLength('recipientName') : '40'} characters</span></p> : null}
              { showErrors && this.errorFor('recipientName') && (<div style={{ display: 'block' }} className="formErrors">{this.errorFor('recipientName')}</div>) }
            </fieldset>
            <fieldset style={{ height: '32px' }}>
              <input ref="address1" type="text" maxLength="50" placeholder="Address line 1*" defaultValue={defaultFormValue && defaultFormValue.address1} onChange={this.handleFieldChanged('address1')} />
              {showRemainingChars ? <p className="information characters" style={charStyles}><span>{this.getLength('address1') > 0 ? 50 - this.getLength('address1') : '50'} characters</span></p> : null}
              { showErrors && this.errorFor('address1') && (<div style={{ display: 'block' }} className="formErrors">{this.errorFor('address1')}</div>) }
            </fieldset>
            <fieldset style={{ height: '32px' }}>
              <input ref="address2" type="text" maxLength="50" placeholder="Address line 2" onChange={this.handleFieldChanged('address2')} defaultValue={defaultFormValue && defaultFormValue.address2} />
              {showRemainingChars ? <p className="information characters" style={charStyles}><span>{this.getLength('address2') > 0 ? 50 - this.getLength('address2') : '50'} characters</span></p> : null}
            </fieldset>
            <span id="provinceSuburbContainer" name="provinceSuburbContainer">
              <fieldset style={{ height: '32px' }}>
                <div className="customSelect disabled" id="uniform-fldAddressProvince" style={{ height: '32px' }} ref="region" value={provinceId}>
                  <span>{currentProvince}</span>
                </div>
              </fieldset>
              <fieldset style={{ height: '32px' }}>
                <div className="customSelect disabled" id="uniform-fldSuburb" style={{ height: '32px' }} ref="suburbId" value={suburbId}>
                  <span>{currentSuburb}</span>
                </div>
                <p className="texL">
                  <Link tabindex="0" onClick={this.handleChangeAddressClick} className="leftOffset moreLink">change suburb/province</Link>
                </p>
              </fieldset>
            </span>
            <fieldset style={{ height: '32px' }}>
              <input type="tel" id="postalCode" ref="postalCode" placeholder="Post code" value={postCode} disabled="true" />
            </fieldset>
            <fieldset style={{ height: '32px' }}>
              <input type="text" ref="primaryContactNo" placeholder="Contact Number*" name="primaryContactNo" defaultValue={defaultFormValue && defaultFormValue.primaryContactNo} onChange={this.handleFieldChanged('contactNumber')} />
              { showErrors && this.errorFor('contactNumber') && (<div style={{ display: 'block' }} className="formErrors">{this.errorFor('contactNumber')}</div>) }
            </fieldset>
            <fieldset style={{ height: '32px' }}>
              <input type="text" ref="secondaryContactNo" placeholder="Additional contact" name="secondaryContactNo" defaultValue={defaultFormValue && defaultFormValue.secondaryContactNo} />
            </fieldset>
            <fieldset style={{ height: 'auto' }}>
              <textarea
                onChange={e => this.handleInputChange(e)}
                maxLength="240" name="SplInstr" id="fldSplInstr" placeholder="Special Instructions"
                rows="8" cols="40" className="restricted-char stdFld"
                style={{ margin: '0px', width: '394px', height: '23px' }}
                defaultValue={defaultFormValue && defaultFormValue.SplInstr}
                ref="specialInstructions"
              />
              <p className="information characters" style={charStyles}>{showRemainingChars ? <span>{SplInstr.length > 0 ? 240 - SplInstr.length : '240'} characters</span> : null}</p>
              <p className={this.props.instClass || 'disclaimer'}>Your privacy is important to us. Please don't include any personal information that the driver will not need.</p>
            </fieldset>
            <fieldset style={{ height: '32px' }}>
              <p className="text-small strong">* Required fields</p>
              <hr />
            </fieldset>
            <fieldset style={{ height: '32px' }}>
              <button type="submit" className="btn btn--primary btn--right">Save new address</button>
              {this.props.closeForm ?
                <button type="reset" className="btn btn--silent cancel-btn" onClick={e => this.props.closeForm(e)} >Cancel<span className="icon" /></button>
              : null}
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
}

export default connect(() => { return {}; }, { error })(AddressForm);
