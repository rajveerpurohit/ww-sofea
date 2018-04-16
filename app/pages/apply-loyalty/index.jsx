import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import {
    changeLocation
  } from '../../components/compound/deliveryDetails/actions';
import DatePicker from '../../components/basic/datepicker';
import { getApplyLoyalty, postLoyaltyData } from './actions';
import ServiceUtil from '../../services/serviceUtil';


class ApplyLoyalty extends Component {
  // static need= [getApplyLoyalty];
  constructor(props) {
    super(props);
    this.state = {
      regForm: {
        idNumber: '',
        differenceCardNumber: '',
        title: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        primaryContact: '',
        addressLine1: '',
        addressLine2: '',
        suburbName: '',
        gender: ''
      },
      startDate: null,
      dateOfBirth: '',

      telephonePermission: false,
      smsPermission: false,
      emailPermission: false,
      postPermission: false,
      thirdpartyPermission: false,
      cardStore: 'fldCollectStore',
      collectCardStore: false,
      collectCardPost: false,

      acceptTermsWR: false,
      isFormHasErrors: false,
      errors: {},
      titles: {},
      genders: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMaincheck = this.handleMaincheck.bind(this);
    this.provinceChange = this.provinceChange.bind(this);
    this.suburbChange = this.suburbChange.bind(this);
    this.getProvinceLabel = this.getProvinceLabel.bind(this);
    this.getSuburbLabel = this.getSuburbLabel.bind(this);
    this.getPostalCode = this.getPostalCode.bind(this);
    this.getProvinceOptions = this.getProvinceOptions.bind(this);
    this.getSuburbOptions = this.getSuburbOptions.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.renderFormErrorRequired = this.renderFormErrorRequired.bind(this);
    this.renderFormErrorElm = this.renderFormErrorElm.bind(this);
    this.createTitleOptions = this.createTitleOptions.bind(this);
  }
  componentDidMount() {
    this.props.getApplyLoyalty();
  }
  componentWillReceiveProps(nextProps) {
    const { getApplyLoyaltyData } = nextProps;
    if (getApplyLoyaltyData) {
      const { regForm } = this.state;
      this.setState({ regForm: {
        idNumber: getApplyLoyaltyData.identityNumber,
        differenceCardNumber: getApplyLoyaltyData.differenceCardNumber,
        title: getApplyLoyaltyData.title,
        firstName: getApplyLoyaltyData.firstName,
        lastName: getApplyLoyaltyData.lastName,
        emailAddress: getApplyLoyaltyData.emailAddress,
        phoneNumber: getApplyLoyaltyData.primaryContactNo,
        primaryContact: getApplyLoyaltyData.primaryContactNo,
        addressLine1: getApplyLoyaltyData.addressLine1,
        addressLine2: getApplyLoyaltyData.addressLine2,
        suburbName: getApplyLoyaltyData.suburbName,
        gender: getApplyLoyaltyData.gender

      },
        startDate: getApplyLoyaltyData.dateOfBirth && getApplyLoyaltyData.dateOfBirth.split(' ')[0],
        // dateOfBirth: getApplyLoyaltyData.dateOfBirth,

        telephonePermission: getApplyLoyaltyData.optOutPhone,
        smsPermission: getApplyLoyaltyData.optOutSms,
        emailPermission: getApplyLoyaltyData.optOutEmail,
        postPermission: getApplyLoyaltyData.optOutPost,
        thirdpartyPermission: getApplyLoyaltyData.optOut3rd,
        cardStore: 'fldCollectStore',
        collectCardStore: false,
        collectCardPost: false,
        titles: getApplyLoyaltyData.titles,
        genders: getApplyLoyaltyData.genders
       // acceptTermsWR: getApplyLoyaltyData,
      });
    }
  }
  componentWillUnmount() {
    this.props.changeLocation();
  }
  onDateChange(newDate) {
    if (newDate) {
      const newState = _.assign({}, this.state);
      newState.dateOfBirth = newDate;
      newState.startDate = newDate;
      this.setState(newState);
    }
  }
  createTitleOptions(getOptions) {
    const getOtpion = [];
    for (const key in getOptions) {
      if (getOptions.hasOwnProperty(key)) {
          // console.log(key + " -> " + getOptions[key]);
        getOtpion.push(<option value={key + '|' + getOptions[key]}> {getOptions[key]} </option>);
      }
    }
    return getOtpion;
  }

  handleCardStore(evt) {
    this.setState({ cardStore: evt.target.value });
  }
  handleMaincheck(event) {
    if (!event.target.nextSibling.classList.contains('is-checked')) {
      event.target.nextSibling.classList.add('is-checked');
    } else {
      event.target.nextSibling.classList.remove('is-checked');
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
  handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    console.log(' newState[formObj][inputPropName]', newState);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    const deliveryDetails = this.props.deliveryDetails;
    const form = this.props.deliveryDetails.form;
    const selectLocation = deliveryDetails.selectCurrentLocation;
    const suburbLabel = this.getSuburbLabel(selectLocation.provinceId, selectLocation.suburbId);
    const { regForm } = this.state;
    const errors = {};
    e.preventDefault();

    const data = {
      idNumber: regForm.idNumber,
      passportNumber: regForm.idNumber,
      differenceCardNumber: regForm.differenceCardNumber,
      title: regForm.title,
      firstName: regForm.firstName,
      lastName: regForm.lastName,
      emailAddress: regForm.emailAddress,
      phoneNumber: regForm.phoneNumber,
      primaryContact: regForm.primaryContact,
      addressLine1: regForm.addressLine1,
      addressLine2: regForm.addressLine2,
      suburbName: suburbLabel.toString(),
      postalCode: this.getPostalCode().toString(),
      telephonePermission: this.telephonePermission.checked,
      smsPermission: this.smsPermission.checked,
      emailPermission: this.emailPermission.checked,
      postPermission: this.postPermission.checked,
      thirdpartyPermission: this.thirdpartyPermission.checked,
      collectCardStore: this.state.cardStore === 'fldCollectStore',
      collectCardPost: this.state.cardStore === 'fldCollectPost',
      atgProfileID: this.props.currentUser.profileId.toString(),
      wODTrigger: 3,
      acceptTermsWR: this.acceptTermsWR.checked,

    };

    if (regForm.firstName === '') {
      errors.firstName = 'This is a required field';
    }
    if (regForm.lastName === '') {
      errors.lastName = 'This is a required field';
    }

    if (regForm.idNumber) {
      if (isNaN(Number(regForm.idNumber))) {
        errors.idNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-numbers-error');
      } else if (regForm.idNumber.length < 13) {
        errors.idNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-characters-error', [13]);
      } else {
        // Valid SA ID Number
        let ParseIdString = regForm.idNumber;
        ParseIdString = ParseIdString.split('').map(Number);
        let d = -1;
        let a = 0;
        let b = 0;
        for (let i = 0; i < 12; i += 2) {
          a += ParseIdString[i];
        }
        for (let i = 1; i < 13; i += 2) {
          b = (b * 10) + ParseIdString[i];
        }
        b *= 2;
        let c = 0;
        do {
          c += b % 10;
          b = parseInt(b / 10, 10);
        } while (b > 0);
        c += a;
        d = 10 - (c % 10);
        if (d !== ParseIdString[12]) {
          errors.idNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-id-numbers-error');
        }
      }
    } else if (regForm.idNumber === '') {
      errors.idNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
    }
    if (regForm.emailAddress === '') {
      errors.emailAddress = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(regForm.emailAddress)) {
      errors.emailAddress = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-email-address-error');
    }
    if (regForm.primaryContact) {
      if (isNaN(Number(regForm.primaryContact))) {
        errors.primaryContact = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-numbers-error');
      } else if (regForm.primaryContact.length < 10) {
        errors.primaryContact = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-characters-error', [10]);
      } else if (!/^((06)|(07)|(08))[0-9]{8}$/i.test(regForm.primaryContact)) {
        errors.primaryContact = 'A valid Cellphone number is Required Must be 10 numeric characters';
      }
    } else if (regForm.primaryContact === '') {
      errors.primaryContact = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
    }
    if (regForm.addressLine1 === '') {
      errors.addressLine1 = 'This is a required field';
    }
    if (this.acceptTermsWR.checked === false) {
      errors.acceptTermsWR = 'You need to accept the terms and conditions to continue.';
    }
    this.setState({
      errors
    });
    if (_.compact(_.values(errors)).length === 0 && this.acceptTermsWR.checked === true) {
      this.setState({ isFormHasErrors: false });
      this.props.postLoyaltyData(data);
    } else {
      this.setState({ isFormHasErrors: true });
      console.log('errors', this.state.errors);
    }
  }
  renderFormErrorRequired(error) {
    return (
      <span className="form-field__msg form-field__msg--error" data-js="form-field-msg">
        {error}
      </span>
    );
  }
  renderFormErrorElm() {
    if (this.state.isFormHasErrors) {
      console.log(this.state.isFormHasErrors);
      return (
        <div className="text-small message message--error">
          <span>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-form-input-error')}</span>
        </div>
      );
    }
    return null;
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
    const { regForm } = this.state;
    return (
      <div className="page-layout__content">
        <section>
          <h1 className="text-caps font-graphic">WRewards Card Application</h1>
          <form onSubmit={this.handleSubmit} name="frmApplyLoyaltyForm" id="frmApplyLoyaltyForm" className="contactForm ">
            {this.renderFormErrorElm()}
            <section className="contentBlock">
              <h2 className="text-caps font-graphic text-intro">About You</h2>
              <div className="form-field has-error" data-js="form-field">
                <input
                data-validate-msg="Enter ID/passport number"
                data-validate-required="true"
                data-js="validate-field"
                name="idNumber"
                placeholder="ID/passport number*"
                id="fldID"
                type="text"
                className="input input--text"
                onChange={event => this.handleInputChange(event, 'regForm', 'idNumber')}
                value={regForm.idNumber}
                />

                {this.state.errors && this.state.errors.idNumber ? this.renderFormErrorRequired(this.state.errors.idNumber) : ''}
              </div>
              <div className="form-field" data-js="form-field">
                <input
                  name="differenceCardNumber" placeholder="Difference Card Number" id="difference" type="text" className="stdFld"
                  onChange={event => this.handleInputChange(event, 'regForm', 'differenceCardNumber')}
                  value={regForm.differenceCardNumber}
                />
              </div>
              <div className="form-field grid__half--large" data-js="form-field" data-validate-required="true">
                <div data-validate-msg="Choose a title" className="enhanced-select">
                  <select data-js="enhance-select" name="title" id="fldTitle" className="customSelect small" onChange={event => this.handleInputChange(event, 'regForm', 'title')}>
                    <option data-validate-unselected="true" value="Title" >Title </option>
                    { this.state.titles && this.createTitleOptions(this.state.titles) }
                  </select>
                  <span className="enhanced-select__label">{regForm.title && regForm.title != '' ? regForm.title.split('|').pop() : 'Title'}</span>
                  <span className="icon enhanced-select__icon" />
                </div>
              </div>
              <input name="initials" id="fldInitials" type="hidden" defaultValue="r" /><input name="_D:initials" type="hidden" defaultValue=" " />
              <div className="form-field" data-js="form-field" style={{ marginTop: '0.5em' }}>
                <input
                  name="firstName" placeholder="Name*" id="fldFirstName" type="text" className="input input--text"
                  onChange={event => this.handleInputChange(event, 'regForm', 'firstName')}
                  value={regForm.firstName}
                />
                {this.state.errors && this.state.errors.firstName ? this.renderFormErrorRequired(this.state.errors.firstName) : ''}
              </div>
              <div className="form-field" data-js="form-field">
                <input
                  name="lastName" placeholder="Surname*" id="fldSurname" type="text" className="input input--text" onChange={event => this.handleInputChange(event, 'regForm', 'lastName')}
                  value={regForm.lastName}
                />
                {this.state.errors && this.state.errors.lastName ? this.renderFormErrorRequired(this.state.errors.lastName) : ''}
              </div>
              <div className="form-field" data-js="form-field">
                <div className="grid__half--large" data-validate-required="true">
                  <span className="enhanced-select">
                    <select
                       name="gender" id="fldGender" onChange={event => this.handleInputChange(event, 'regForm', 'gender')}
                    >
                      <option>Please select your gender</option>
                      { this.state.genders && this.createTitleOptions(this.state.genders) }
                    </select><span className="enhanced-select__label">{regForm.gender && regForm.gender != '' ? regForm.gender.split('|').pop() : 'Please select your gender'}&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                </div> </div>
              <div className="form-field has-error" data-js="form-field">
                <div className="grid__half--large">
                  {/* <input data-toggle="datepicker" data-validate-type="date" data-js="validate-field" type="text" data-validate-required="true" name="fldDOB" placeholder="Date of birth*" id="fldDOB" data-datepicker-format="yyyy-MM-dd" defaultValue className="datepicker-field" /><input name="_D:fldDOB" type="hidden" defaultValue=" " />
                  <span className="datepicker-btn"><i /></span> */}
                  <DatePicker
                    startDate={this.state.startDate != '' ? this.state.startDate : ''}
                    handleChange={this.onDateChange}
                    placeholder="Date of birth*"
                  />
                </div>
              </div>
              <div className="form-field" data-js="form-field">
                <input
                name="emailAddress" placeholder="Email address*" id="fldEmailAddress" type="text"
                className="stdFld" onChange={event => this.handleInputChange(event, 'regForm', 'emailAddress')}
                value={regForm.emailAddress}
                />
                {this.state.errors && this.state.errors.emailAddress ? this.renderFormErrorRequired(this.state.errors.emailAddress) : ''}
              </div>
              <div className="form-field" data-js="form-field">
                <input
                  name="primaryContact" placeholder="Contact number*" id="fldPrimaryContact" type="text" className="stdFld" onChange={event => this.handleInputChange(event, 'regForm', 'primaryContact')}
                  value={regForm.primaryContact}
                />
                {this.state.errors && this.state.errors.primaryContact ? this.renderFormErrorRequired(this.state.errors.primaryContact) : ''}
              </div>
              <div className="form-field" data-js="form-field">
                <div className="grid__half--large">
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
                </div>
              </div>
              <div className="form-field" data-js="form-field">
                <input
                  name="addressLine1" placeholder="Address Line 1*" id="fldAddressLineOne" type="text"
                  onChange={event => this.handleInputChange(event, 'regForm', 'addressLine1')}
                  value={regForm.addressLine1}
                />
                {this.state.errors && this.state.errors.addressLine1 ? this.renderFormErrorRequired(this.state.errors.addressLine1) : ''}
              </div>
              <div className="form-field" data-js="form-field">
                <input
                  name="addressLine2" placeholder="Address Line 2" id="fldAddressLineTwo" type="text" onChange={event => this.handleInputChange(event, 'regForm', 'addressLine2')}
                  value={regForm.addressLine2}
                />
              </div>
              <div className="form-field" data-js="form-field">
                <input name="suburb" placeholder="Suburb*" id="suburb" type="hidden" defaultValue="Bayswater" /><input name="_D:suburb" type="hidden" defaultValue=" " />
                <div className="formErrors">Please enter a suburb.</div>
              </div>
              <div>
                <input type="tel" id="postalCode" ref="postalCode" placeholder="Post code" value={postCode} />
              </div>
            </section>
            <section className="grid--space-y">
              <h2 className="font-graphic text-caps text-intro">If you don't want to hear from Woolworths,<br />tick below (opt out)</h2>

              <div className="form-field">
                <input name="telephonePermission" id="fldCheckCalls" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onClick={(e) => { this.handleMaincheck(e); }} ref={(telephonePermission) => { this.telephonePermission = telephonePermission; }} defaultChecked={this.state.telephonePermission} />
                <label className={`enhanced-checkbox label-checkbox text-intro ${this.state.telephonePermission === true ? 'is-checked' : ''} `} htmlFor="fldCheckCalls" >I don't want telephone calls</label>
              </div>
              <div className="form-field">
                <input name="smsPermission" id="fldCheckSMS" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} ref={(smsPermission) => { this.smsPermission = smsPermission; }} defaultChecked={this.state.smsPermission} />
                <label className={`enhanced-checkbox label-checkbox text-intro ${this.state.smsPermission === true ? 'is-checked' : ''} `} htmlFor="fldCheckSMS" >I don't want SMSs</label>
              </div>
              <div className="form-field">
                <input name="emailPermission" id="fldCheckEmails" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} ref={(emailPermission) => { this.emailPermission = emailPermission; }} defaultChecked={this.state.emailPermission} />
                <label className={`enhanced-checkbox label-checkbox text-intro ${this.state.emailPermission === true ? 'is-checked' : ''} `} htmlFor="fldCheckEmails" >I don't want emails (Please note that you won't receive any more email
     vouchers)</label>
              </div>
              <div className="form-field">
                <input name="postPermission" id="fldCheckPost" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} ref={(postPermission) => { this.postPermission = postPermission; }} defaultChecked={this.state.postPermission} />
                <label className={`enhanced-checkbox label-checkbox text-intro ${this.state.postPermission === true ? 'is-checked' : ''} `} htmlFor="fldCheckPost" >I don't want post (Please note that you won't receive any more voucher
     booklets)</label>
              </div>
              <div className="form-field">
                <input
                    name="thirdpartyPermission" id="fldCheckShare" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} ref={(thirdpartyPermission) => {
                      this.thirdpartyPermission = thirdpartyPermission;
                    }} defaultChecked={this.state.thirdpartyPermission}
                />
                <label className={`enhanced-checkbox label-checkbox text-intro ${this.state.thirdpartyPermission === true ? 'is-checked' : ''} `} htmlFor="fldCheckShare" >I don't want to share my personal info with a third party</label>
              </div>
            </section>
            <section className="grid--space-y">
              <h2 className="font-graphic text-caps text-intro">Receiving your difference card</h2>
              <div>
                <input
                  name="cardStore" id="fldCollectStore" value="fldCollectStore" type="radio" className="input enhanced-radio is-enhanced" onChange={(e) => { this.handleCardStore(e); }} ref={(collectCardStore) => {
                    this.collectCardStore = collectCardStore;
                  }}
                />
                <label className={`${this.state.cardStore === 'fldCollectStore' ? 'text-intro label-radio is-checked' : 'text-intro label-radio'}`} htmlFor="fldCollectStore">Collect immediately at a Woolworths store near you.</label>
              </div>
              <p id="CollectCardRadio" className="text-intro">Explain to the store that you applied online. When you have the card call us on 0861 50 20 50 or email us at <strong><a href="mailto:rewards@woolworths.co.za">rewards@woolworths.co.za</a></strong> so that we can link your card.</p>
              <div>
                <input
                  name="cardStore" id="fldCollectPost" type="radio" className="input enhanced-radio is-enhanced" value="fldCollectPost" onChange={(e) => { this.handleCardStore(e); }} ref={(collectCardPost) => {
                    this.collectCardPost = collectCardPost;
                  }}
                />
                <label className={`${this.state.cardStore === 'fldCollectPost' ? 'text-intro label-radio is-checked' : 'text-intro label-radio'}`} htmlFor="fldCollectPost">Please post it to me.</label>
              </div>
            </section>
            <section className="grid--space-y">
              <h2 className="font-graphic text-caps text-intro">Terms and Conditions</h2>
              <div className="form-field">
                <input
                    name="acceptTermsWR" id="fldTAndC" type="checkbox" defaultValue="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.handleMaincheck(e); }} ref={(acceptTermsWR) => {
                      this.acceptTermsWR = acceptTermsWR;
                    }} defaultChecked={this.state.acceptTermsWR}
                />
                <label className={`enhanced-checkbox label-checkbox text-intro ${this.state.acceptTermsWR === true ? 'is-checked' : ''} `} htmlFor="fldTAndC" >I accept the
                    <Link to="">Terms and Conditions</Link></label>
                {this.state.errors && this.state.errors.acceptTermsWR ? this.renderFormErrorRequired(this.state.errors.acceptTermsWR) : ''}
              </div>
            </section>
            <p className="text-small">*Required fields</p>
            <div className="form-field">
              <input name="submit" id="flSubmit" type="submit" defaultValue="Submit" className="btn btn--primary btn--right" />
            </div>
          </form>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DeliverAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', {}),
    deliveryDetails: state.deliveryDetails,
    getApplyLoyaltyData: _.get(state, 'applyLoyaltyReducer.applyLoyaltyData', {}),
    labels: _.get(state, 'labels.labelsAndErrorMessages.WFS', {}),
    currentUser: state.clp.currentUser,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeLocation, getApplyLoyalty, postLoyaltyData }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ApplyLoyalty);

