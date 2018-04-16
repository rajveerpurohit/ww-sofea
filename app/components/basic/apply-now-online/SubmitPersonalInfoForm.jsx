import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import SuburbSearch from './suburb-search';
import ServiceUtil from '../../../services/serviceUtil';
import { getSuburbSearch, postPersonalInfoData } from '../../../pages/apply-now/actions';

class SubmitPersonalInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Title*',
      initial: '',
      dependent: '0',
      maritalStatus: 'Marital status*',
      suburb: '',
      suburbSearch: false,
      postalCode: '',
      home: '',
      work: '',
      isFormHasErrors: false,
      woolworthsStaffMebmer: false,
      errors: {}
    };
    this.renderFormErrorRequired = this.renderFormErrorRequired.bind(this);
    this.handlewoolworthsStaffMebmer = this.handlewoolworthsStaffMebmer.bind(this);
    this.renderFormErrorElm = this.renderFormErrorElm.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchClose = this.onSearchClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFocus(e) {
    e.target.previousSibling.classList.add('is-active');
  }
  handleBlur(e) {
    if (!e.target.value) {
      e.target.previousSibling.classList.remove('is-active');
    }
  }
  handlewoolworthsStaffMebmer() {
    this.setState({ woolworthsStaffMebmer: !this.state.woolworthsStaffMebmer });
  }
  handleSubmit(e) {
    if (e) e.preventDefault();
    const errors = {};
    let flag = 0;
    if (this.state.title === 'Title*') {
      errors.title = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.initial === '' || document.getElementById('fullName').value === '') {
      errors.initial = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    } else if (this.props.applyNowData.content.wfsSessionBean.firstName.charAt(0).toLowerCase() !== this.state.initial.toLowerCase()) {
      errors.initial = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-initials-error');
      flag = 1;
    }
    if (this.state.maritalStatus === 'Marital status*') {
      errors.maritalStatus = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.dependent === '') {
      errors.dependent = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    } else if (isNaN(Number(this.state.dependent))) {
      errors.dependent = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-numbers-error');
      flag = 1;
    }
    if (this.state.suburb) {
      if (this.state.suburb.length < 3) {
        errors.suburb = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-characters-error', [3]);
        flag = 1;
      } else if (this.state.postalCode === '') {
        errors.postalCode = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-postal-code-error');
        flag = 1;
      }
    } else if (this.state.suburb === '') {
      errors.suburb = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.work && (this.state.work.length < 10 || (isNaN(Number(this.state.work))))) {
      errors.work = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-telephone-number-error', ['work']);
      flag = 1;
    }
    if (this.state.home && (this.state.home.length < 10 || (isNaN(Number(this.state.home))))) {
      errors.home = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-telephone-number-error', ['home']);
      flag = 1;
    }
    if (document.getElementById('emailAddress').value === '') {
      errors.emailAddress = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (document.getElementById('cellPhoneNumber').value === '') {
      errors.cellPhoneNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }

    this.setState({
      errors
    });
    if (flag === 0) {
      this.setState({ isFormHasErrors: false });
      const formObj = Object.assign({}, this.state, { applyCardData: this.props.applyNowData.content.wfsSessionBean });
      this.props.postPersonalInfoData(formObj);
      browserHistory.push({ pathname: '/wfs/wfs-income-expenses' });
    } else {
      this.setState({ isFormHasErrors: true });
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
      return (
        <div className="text-small message message--error">
          <span>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-form-input-error')}</span>
        </div>
      );
    }
    return null;
  }
  onSearchClick(e) {
    if (this.state.suburb !== '') {
      this.props.getSuburbSearch(this.state.suburb);
      this.setState({ suburbSearch: true });
    }
  }

  onSearchClose(searchData) {
    const searchDataArray = searchData.split(',');
    if (searchDataArray[0] !== 'Close') {
      this.setState({ suburbSearch: false, suburb: searchDataArray[0], postalCode: searchDataArray[2] });
    } else {
      this.setState({ suburbSearch: false });
    }
  }
  render() {
    const applyCardData = _.get(this.props.applyNowData, 'content.wfsSessionBean', {});
    const suburbSearchData = _.get(this.props.applyNowData, 'wfsSuburb', []);
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off" name="personalInfo" id="personalInfo" className="wfs-app__form" noValidate="true">
        {this.renderFormErrorElm()}
        <div className="grid grid--space-y">
          <div className="wfs-app__form-column">

            <h4 className="font-graphic text-caps wfs-app__form-subheading">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-about-you-label')}</h4>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <div data-js="validate-field" data-validate-required="true">
                <span className="enhanced-select">
                  <select data-js="enhance-select" onChange={evt => this.setState({ title: evt.target.value })} name="title">
                    <option data-validate-unselected="true" value="Title*">Title*</option>
                    <option value="ADV">ADV</option>
                    <option value="CAPT">CAPT</option>
                    <option value="COL">COL</option>
                    <option value="DR">DR</option>
                    <option value="DS">DS</option>
                    <option value="KAPT">KAPT</option>
                    <option value="KING">KING</option>
                    <option value="KOL">KOL</option>
                    <option value="KONING">KONING</option>
                    <option value="KORP">KORP</option>
                    <option value="LT">LT</option>
                    <option value="ME">ME</option>
                    <option value="MEJ">MEJ</option>
                    <option value="MEV">MEV</option>
                    <option value="MISS">MISS</option>
                    <option value="MNR">MNR</option>
                    <option value="MR">MR</option>
                    <option value="MRS">MRS</option>
                    <option value="MS">MS</option>
                    <option value="PROF">PROF</option>
                    <option value="REV">REV</option>
                  </select>
                  <span className="enhanced-select__label">{this.state.title}&nbsp;</span>
                  <span className="icon enhanced-select__icon" /></span>
              </div>
              {this.state.errors && this.state.errors.title ? this.renderFormErrorRequired(this.state.errors.title) : ''}

            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="initial" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-initials-label')}</label>
              <input
                data-validate-required="true" data-js="validate-field" name="initial" id="initial" type="text" className="input" onChange={evt => this.setState({ initial: evt.target.value })} onFocus={this.handleFocus} onBlur={this.handleBlur}
              />
              {this.state.errors && this.state.errors.initial ? this.renderFormErrorRequired(this.state.errors.initial) : ''}
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label">
              <label htmlFor="fullName" data-js="enhance-label" className={`${applyCardData.firstName ? 'form-field__label--enhanced is-active' : 'form-field__label--enhanced'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-full-names-label')}</label>
              <input name="fullName" disabled="disabled" id="fullName" type="text" value={applyCardData.firstName} className="input" />
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label">
              <label htmlFor="surname" data-js="enhance-label" className={`${applyCardData.lastName ? 'form-field__label--enhanced is-active' : 'form-field__label--enhanced'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-surname-label')}</label>
              <input name="surname" disabled="disabled" id="surname" type="text" value={applyCardData.lastName} className="input" />
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label">
              <label htmlFor="idNumber" data-js="enhance-label" className={`${applyCardData.idNumber ? 'form-field__label--enhanced is-active' : 'form-field__label--enhanced'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-south-african-id-number-label')}</label>
              <input name="idNumber" disabled="disabled" id="idNumber" type="text" value={applyCardData.idNumber} className="input" />
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label">
              <label htmlFor="fldDOB" data-js="enhance-label" className={`${applyCardData.dateOfBirth ? 'form-field__label--enhanced is-active' : 'form-field__label--enhanced'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-date-of-birth-label')}</label>
              <input name="fldDOB" disabled="disabled" id="fldDOB" title="Date of birth*" type="text" value={applyCardData.dateOfBirth} className="input" />
            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label">
              <span className="text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-gender-label')}</span>&nbsp;&nbsp;&nbsp;
              <input name="gender" disabled="disabled" id="fldChildGenderMale_0" type="radio" value="male" className="input enhanced-radio is-enhanced" />
              <label htmlFor="fldChildGenderMale_0" className={`${applyCardData.gender === 'Male' ? 'label-radio is-checked' : 'label-radio'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-male-label')}</label>&nbsp;&nbsp;&nbsp;
              <input name="gender" disabled="disabled" id="fldChildGenderFemale_0" type="radio" value="female" className="input enhanced-radio is-enhanced" />
              <label htmlFor="fldChildGenderFemale_0" className={`${applyCardData.gender === 'Female' ? 'label-radio is-checked' : 'label-radio'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-female-label')}</label>
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="dependent" data-js="enhance-label" className="form-field__label--enhanced is-active">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-dependents-label')}</label>
              <input data-validate-type="num" maxLength="2" data-js="validate-field" name="dependent" id="dependent" type="text" value={this.state.dependent} onChange={evt => this.setState({ dependent: evt.target.value })} className="input" onFocus={this.handleFocus} onBlur={this.handleBlur} />
              {this.state.errors && this.state.errors.dependent ? this.renderFormErrorRequired(this.state.errors.dependent) : ''}
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <div data-js="validate-field" data-validate-required="true">
                <span className="enhanced-select">
                  <select data-js="enhance-select" name="maritalStatus" id="maritalStatus" onChange={evt => this.setState({ maritalStatus: evt.target.value })}>
                    <option data-validate-unselected="true" value="Marital status*">Marital status*</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widow">Widow</option>
                    <option value="Common law">Common law</option>
                    <option value="Married in Community of Property">Married in Community of Property</option>
                  </select><span className="enhanced-select__label">{this.state.maritalStatus}&nbsp;</span><span className="icon enhanced-select__icon" /></span>
              </div>
              {this.state.errors && this.state.errors.maritalStatus ? this.renderFormErrorRequired(this.state.errors.maritalStatus) : ''}
            </div>
          </div>

          <div className="wfs-app__form-column">
            <h4 className="font-graphic text-caps wfs-app__form-subheading">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-your-address-label')}</h4>
            <div className="grid">
              <div className="grid__three-fourths">

                <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
                  <label htmlFor="suburb" data-js="enhance-label" className={`${this.state.suburb === '' ? 'form-field__label--enhanced' : 'form-field__label--enhanced is-active'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-suburb-label')}</label>
                  <input
                    value={this.state.suburb} minLength="3" data-validate-required="true" data-js="validate-field" name="suburb" id="suburb" type="text" className="input" onFocus={this.handleFocus}
                    onBlur={this.handleBlur} onChange={evt => this.setState({ suburb: evt.target.value })}
                  />
                  {this.state.errors && this.state.errors.suburb ? this.renderFormErrorRequired(this.state.errors.suburb) : ''}
                </div>
              </div>
              <div className="grid__fourth form-field--enhanced-label">
                <input type="button" id="suburbSearch" className="btn btn--secondary pos--rel" value="search" data-spinner-trigger="true" onClick={e => this.onSearchClick(e)} />
              </div>
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label">
              <label htmlFor="postalCode" data-js="enhance-label" className={`${this.state.postalCode === '' ? 'form-field__label--enhanced' : 'form-field__label--enhanced is-active'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-postal-code-label')}</label>
              <input type="text" disabled="true" name="postalCode" value={this.state.postalCode} className="input" id="postalCode" />
              {this.state.errors && this.state.errors.postalCode ? this.renderFormErrorRequired(this.state.errors.postalCode) : ''}
            </div>

            <h4 className="font-graphic text-caps wfs-app__form-subheading">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-contact-details-label')}</h4>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="cellPhoneNumber" data-js="enhance-label" className={`${applyCardData.primaryContact ? 'form-field__label--enhanced is-active' : 'form-field__label--enhanced'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-cellphone-number-label')}</label>
              <input minLength="10" maxLength="10" data-validate-required="true" data-js="validate-field" name="cellPhoneNumber" id="cellPhoneNumber" type="tel" className="input" value={applyCardData.primaryContact} disabled />
              {this.state.errors && this.state.errors.cellPhoneNumber ? this.renderFormErrorRequired(this.state.errors.cellPhoneNumber) : ''}
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label">
              <label htmlFor="work" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-work-telephone-label')}</label>
              <input
                maxLength="10" name="work" id="work" type="tel" className="input" onFocus={this.handleFocus} onBlur={this.handleBlur} value={this.state.work} onChange={evt => this.setState({ work: evt.target.value })}
              />
              {this.state.errors && this.state.errors.work ? this.renderFormErrorRequired(this.state.errors.work) : ''}
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label">
              <label htmlFor="home" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-home-telephone-label')}</label>
              <input
                maxLength="10" name="home" id="home" type="tel" className="input" onFocus={this.handleFocus} onBlur={this.handleBlur} value={this.state.home} onChange={evt => this.setState({ home: evt.target.value })}
              />
              {this.state.errors && this.state.errors.home ? this.renderFormErrorRequired(this.state.errors.home) : ''}
            </div>

            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="emailAddress" data-js="enhance-label" className={`${applyCardData.emailAddress ? 'form-field__label--enhanced is-active' : 'form-field__label--enhanced'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-email-address-label')}</label>
              <input data-validate-type="email" data-validate-required="true" data-js="validate-field" name="emailAddress" id="emailAddress" type="email" className="input" value={applyCardData.emailAddress} disabled />
              {this.state.errors && this.state.errors.emailAddress ? this.renderFormErrorRequired(this.state.errors.emailAddress) : ''}
            </div>

          </div>
        </div>
        <div className="grid grid--space-y text-medium">
          <h4>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-please-indicate-label')}</h4>
          <div id="spousalRequired" className="form-field hidden" data-js="form-field">
            <input name="spouseConsent" id="spouseConsent" type="checkbox" value="true" className="input enhanced-checkbox is-enhanced" />
            <label htmlFor="spouseConsent" className="label-checkbox">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-spouse-consent-label')}</label>
          </div>
          <div className="form-field">
            <input name="woolworthsStaffMebmer" id="woolworthsStaffMebmer" type="checkbox" value="true" className="input enhanced-checkbox is-enhanced" onChange={this.handlewoolworthsStaffMebmer} />
            <label htmlFor="woolworthsStaffMebmer" className={`${this.state.woolworthsStaffMebmer ? 'label-checkbox is-checked' : 'label-checkbox'}`} >{ServiceUtil.getLabel(this.props.labels, 'global-wfs-woolworths-staff-mebmer-label')}</label>
          </div>
        </div>
        <p className="text-small"><em>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-indicates-required-label')}</em></p>
        <hr className="wfs-app__divider" />
        <button type="submit" id="" className="input input--submit btn--primary wfs-app__button-next pos--rel">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-next-label')}</button>

        {this.state.suburbSearch && suburbSearchData.inputValue === this.state.suburb ?
          <SuburbSearch labels={this.props.labels} onSearchClose={this.onSearchClose} suburbSearchData={suburbSearchData.resultList} />
          : null}
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    applyNowData: _.get(state, 'applyNowReducer', {})
  };
};
export default connect(mapStateToProps, { getSuburbSearch, postPersonalInfoData })(SubmitPersonalInfoForm);
