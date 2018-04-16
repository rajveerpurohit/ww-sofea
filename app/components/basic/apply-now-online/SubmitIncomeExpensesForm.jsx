import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import ServiceUtil from '../../../services/serviceUtil';
import { postIncomeExpensesData } from '../../../pages/apply-now/actions';

class SubmitIncomeExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employmentStatus: 'Employment status*',
      industry: 'Industry*',
      sourceOfIncome: 'Source of income*',
      grossMonthly: '',
      netMonthly: '',
      additionalIncome: '',
      homeOwnerStatus: 'Homeowner status*',
      monthlyBond: '',
      monthlyRental: '',
      maintenance: '',
      totalCreditPayments: '',
      otherExpenses: '',
      applicantConfirmedDetails: false,
      termsAndCondtions: false,
      woolworthsPromotionalInformation: false,
      wfsPromotionalInformation: false,
      bubble: true,
      errors: {}
    };
    this.renderFormErrorRequired = this.renderFormErrorRequired.bind(this);
    this.handleWFSPromotionalInformation = this.handleWFSPromotionalInformation.bind(this);
    this.handleWoolworthsPromotionalInformation = this.handleWoolworthsPromotionalInformation.bind(this);
    this.handleApplicantConfirmedDetails = this.handleApplicantConfirmedDetails.bind(this);
    this.handleTermsAndCondtions = this.handleTermsAndCondtions.bind(this);
    this.renderFormErrorElm = this.renderFormErrorElm.bind(this);
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
  handleApplicantConfirmedDetails() {
    this.setState({ applicantConfirmedDetails: !this.state.applicantConfirmedDetails });
  }
  handleTermsAndCondtions() {
    this.setState({ termsAndCondtions: !this.state.termsAndCondtions });
  }
  handleWoolworthsPromotionalInformation() {
    this.setState({ woolworthsPromotionalInformation: !this.state.woolworthsPromotionalInformation });
  }
  handleWFSPromotionalInformation() {
    this.setState({ wfsPromotionalInformation: !this.state.wfsPromotionalInformation });
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    const errors = {};
    let flag = 0;
    if (this.state.employmentStatus === 'Employment status*') {
      errors.employmentStatus = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.industry === 'Industry*') {
      errors.industry = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.sourceOfIncome === 'Source of income*') {
      errors.sourceOfIncome = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.grossMonthly === '') {
      errors.grossMonthly = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    } else if (this.state.grossMonthly && (isNaN(Number(this.state.grossMonthly)) || (Number(this.state.grossMonthly) <= 0) || (Number(this.state.grossMonthly) - Math.floor(Number(this.state.grossMonthly))) !== 0)) {
      errors.grossMonthly = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-whole-numbers-greater-than-zero-error');
    }
    if (this.state.netMonthly === '') {
      errors.netMonthly = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    } else if (this.state.netMonthly && (isNaN(Number(this.state.netMonthly)) || (Number(this.state.netMonthly) <= 0) || (Number(this.state.netMonthly) - Math.floor(Number(this.state.netMonthly))) !== 0)) {
      errors.netMonthly = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-whole-numbers-greater-than-zero-error');
    }
    if (this.state.homeOwnerStatus === 'Homeowner status*') {
      errors.homeOwnerStatus = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.otherExpenses === '') {
      errors.otherExpenses = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    } else if (this.state.otherExpenses && (isNaN(Number(this.state.otherExpenses)) || (Number(this.state.otherExpenses) <= 0) || (Number(this.state.otherExpenses) - Math.floor(Number(this.state.otherExpenses))) !== 0)) {
      errors.otherExpenses = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-whole-numbers-greater-than-zero-error');
    }
    if (this.state.applicantConfirmedDetails === false) {
      errors.applicantConfirmedDetails = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.termsAndCondtions === false) {
      errors.termsAndCondtions = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.additionalIncome && (isNaN(Number(this.state.additionalIncome)) || (Number(this.state.additionalIncome) - Math.floor(Number(this.state.additionalIncome))) !== 0)) {
      errors.additionalIncome = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-whole-numbers-error');
    }
    if (this.state.monthlyBond && (isNaN(Number(this.state.monthlyBond)) || (Number(this.state.monthlyBond) - Math.floor(Number(this.state.monthlyBond))) !== 0)) {
      errors.monthlyBond = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-whole-numbers-error');
    }
    if (this.state.monthlyRental && (isNaN(Number(this.state.monthlyRental)) || (Number(this.state.monthlyRental) - Math.floor(Number(this.state.monthlyRental))) !== 0)) {
      errors.monthlyRental = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-whole-numbers-error');
    }
    if (this.state.maintenance && (isNaN(Number(this.state.maintenance)) || (Number(this.state.maintenance) - Math.floor(Number(this.state.maintenance))) !== 0)) {
      errors.maintenance = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-whole-numbers-error');
    }
    if (this.state.totalCreditPayments && (isNaN(Number(this.state.totalCreditPayments)) || (Number(this.state.totalCreditPayments) - Math.floor(Number(this.state.totalCreditPayments))) !== 0)) {
      errors.totalCreditPayments = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-whole-numbers-error');
    }
    this.setState({
      errors
    });
    if (flag === 0) {
      this.setState({ isFormHasErrors: false });
      const formObj = Object.assign({}, this.state);
      this.props.postIncomeExpensesData(formObj);
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
  handleBubbleClick(evt) {
    const grpelements = document.getElementsByClassName('icon icon--info-bubble circle');
    Array.from(grpelements).forEach((el) => {
      if (evt.target.parentNode.nextSibling.id === el.parentNode.nextSibling.id) {
        if (evt.target.parentNode.nextSibling.className === 'wfs-app__info-bubble font-graphic text-intro hidden') {
          evt.target.parentNode.nextSibling.classList.remove('hidden');
        } else {
          evt.target.parentNode.nextSibling.classList.add('hidden');
        }
      } else if (el.parentNode.nextSibling.className === 'wfs-app__info-bubble font-graphic text-intro') {
        el.parentNode.nextSibling.classList.add('hidden');
      }
    });
    // this.setState({ bubble: !this.state.bubble });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderFormErrorElm()}
        <div className="grid grid--space-y">
          <div className="wfs-app__form-column">
            <h4 className="font-graphic text-caps wfs-app__form-subheading">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-employment-label')}</h4>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <div data-js="validate-field" data-validate-required="true">
                <span className="enhanced-select">
                  <select data-js="enhance-select" onChange={evt => this.setState({ employmentStatus: evt.target.value })} name="employmentStatus" id="employmentStatus">
                    <option data-validate-unselected="true" value="Employment status*">Employment status*</option>
                    <option value="Casual Worker">Temporary</option>
                    <option value="Housewife">Housewife</option>
                    <option value="Other">Contractor</option>
                    <option value="Part Time Employed">Part Time Employed</option>
                    <option value="Professional">Permanent</option>
                    <option value="Professional Self-Employed">Self-Employed</option>
                    <option value="Retired">Pensioner</option>
                    <option value="Student">Student</option>
                    <option value="Unemployed">Unemployed</option>
                  </select><span className="enhanced-select__label">{this.state.employmentStatus}&nbsp;</span>
                  <span className="icon enhanced-select__icon" /></span>
              </div>
              {this.state.errors && this.state.errors.employmentStatus ? this.renderFormErrorRequired(this.state.errors.employmentStatus) : ''}
            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <div data-js="validate-field" data-validate-required="true">
                <span className="enhanced-select">
                  <select data-js="enhance-select" onChange={evt => this.setState({ industry: evt.target.value })} name="industry" id="industry">
                    <option data-validate-unselected="true" value="Industry*">Industry*</option>
                    <option value="AGRICULTURE">AGRICULTURE</option>
                    <option value="CATERING AND ENTERTAINMENT">CATERING AND ENTERTAINMENT</option>
                    <option value="CIVIL SERVICE">CIVIL SERVICE</option>
                    <option value="CLERICAL">CLERICAL</option>
                    <option value="CONSTRUCTION">CONSTRUCTION</option>
                    <option value="EDUCATION">EDUCATION</option>
                    <option value="FINANCE">FINANCE</option>
                    <option value="HEALTH">HEALTH</option>
                    <option value="INDUSTRY">INDUSTRY</option>
                    <option value="LEGAL">LEGAL</option>
                    <option value="MEDIA">MEDIA</option>
                    <option value="NATURE RESOURCES">NATURE RESOURCES</option>
                    <option value="ARMED FORCE">ARMED FORCE</option>
                    <option value="SCIENCE / COMPUTING (DOCT)">SCIENCE / COMPUTING (DOCT)</option>
                    <option value="SECURITY">SECURITY</option>
                    <option value="SELLING RETAILING">SELLING RETAILING</option>
                    <option value="TRANSPORTATION">TRANSPORTATION</option>
                    <option value="WELFARE">WELFARE</option>
                    <option value="UNCLASSIFIED">UNCLASSIFIED</option>
                    <option value="UNEMPLOYED">UNEMPLOYED</option>
                    <option value="NO INFORMATION">NO INFORMATION</option>
                  </select><span className="enhanced-select__label">{this.state.industry}&nbsp;</span>
                  <span className="icon enhanced-select__icon" /></span>
              </div>
              {this.state.errors && this.state.errors.industry ? this.renderFormErrorRequired(this.state.errors.industry) : ''}
            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <div data-js="validate-field" data-validate-required="true">
                <span className="enhanced-select">
                  <select name="sourceOfIncome" onChange={evt => this.setState({ sourceOfIncome: evt.target.value })} id="sourceOfIncome" data-js="enhance-select">
                    <option value="Source of income*" data-validate-unselected="true">Source of income*</option>
                    <option value="ALLOWANCE">ALLOWANCE</option>
                    <option value="BONUS">BONUS</option>
                    <option value="COMMISSION">COMMISSION</option>
                    <option value="DONATION/GIFT">DONATION/GIFT</option>
                    <option value="INHERITANCE">INHERITANCE</option>
                    <option value="INSURANCE CLAIM">INSURANCE CLAIM</option>
                    <option value="INVESTMENTS">INVESTMENTS</option>
                    <option value="MAINTENANCE/ ALIMONY">MAINTENANCE/ ALIMONY</option>
                    <option value="PENSION">PENSION</option>
                    <option value="RETIREMENT ANNUITY">RETIREMENT ANNUITY</option>
                    <option value="SALARY/WAGES">SALARY/WAGES</option>
                    <option value="SOCIAL GRANT">SOCIAL GRANT</option>
                  </select>
                  <span className="enhanced-select__label">{this.state.sourceOfIncome}&nbsp;</span>
                  <span className="icon enhanced-select__icon" /></span>
              </div>
              {this.state.errors && this.state.errors.sourceOfIncome ? this.renderFormErrorRequired(this.state.errors.sourceOfIncome) : ''}
            </div>
            <h4 className="font-graphic text-caps wfs-app__form-subheading">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-income-label')}</h4>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="grossMonthly" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-gross-monthly-label')}</label>
              <input
                id="grossMonthly" name="grossMonthly" type="text" label="Gross monthly*" onChange={evt => this.setState({ grossMonthly: evt.target.value })} onFocus={this.handleFocus} onBlur={this.handleBlur}
              />
              <div className="wfs-app__field-info">
                <span className="wfs-app__info-trigger target-is-closed" data-toggle="">
                  <span className="icon icon--info-bubble circle" onClick={evt => this.handleBubbleClick(evt)}>?</span>
                </span>
                <span className="wfs-app__info-bubble font-graphic text-intro hidden" id="gross-monthly-bubble">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-personal-income-label')}</span>
              </div>
              {this.state.errors && this.state.errors.grossMonthly ? this.renderFormErrorRequired(this.state.errors.grossMonthly) : ''}
            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="netMonthly" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-net-monthly-label')}</label>
              <input
                id="netMonthly" name="netMonthly" type="text" label="Net monthly*" onChange={evt => this.setState({ netMonthly: evt.target.value })} onFocus={this.handleFocus} onBlur={this.handleBlur}
              />
              <div className="wfs-app__field-info">
                <span className="wfs-app__info-trigger target-is-closed" data-toggle="">
                  <span className="icon icon--info-bubble circle" onClick={evt => this.handleBubbleClick(evt)}>?</span>
                </span>
                <span className="wfs-app__info-bubble font-graphic text-intro hidden" data-toggle-content="" id="net-monthly-bubble">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-personal-income-payslip-label')}
                </span>
              </div>
              {this.state.errors && this.state.errors.netMonthly ? this.renderFormErrorRequired(this.state.errors.netMonthly) : ''}
            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="additionalIncome" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-additional-income-label')}</label>
              <input
                id="additionalIncome" name="additionalIncome" type="text" label="Additional income" onChange={evt => this.setState({ additionalIncome: evt.target.value })} onFocus={this.handleFocus} onBlur={this.handleBlur}
              />
              <div className="wfs-app__field-info" data-toggle-group="1" data-click-away="" data-class-closed="hidden">
                <span className="wfs-app__info-trigger target-is-closed" data-toggle="">
                  <span className="icon icon--info-bubble circle" onClick={evt => this.handleBubbleClick(evt)}>?</span>
                </span>
                <span className="wfs-app__info-bubble font-graphic text-intro hidden" data-toggle-content="" id="additional-income-bubble">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-personal-income-above-your-salary-label')}</span>
              </div>
              {this.state.errors && this.state.errors.additionalIncome ? this.renderFormErrorRequired(this.state.errors.additionalIncome) : ''}
            </div>
          </div>
          <div className="wfs-app__form-column" >
            <h4 className="font-graphic text-caps wfs-app__form-subheading">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-expenses-label')}</h4>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <div data-js="validate-field" data-validate-required="true">
                <span className="enhanced-select">
                  <select data-js="enhance-select" name="homeOwnerStatus" onChange={evt => this.setState({ homeOwnerStatus: evt.target.value })}>
                    <option data-validate-unselected="true" value="Homeowner status*">Homeowner status*</option>
                    <option value="Home owner">Home owner</option>
                    <option value="Tenant">Tenant</option>
                    <option value="Living with parents">Living with parents</option>
                    <option value="Other">Other</option>
                  </select><span className="enhanced-select__label">{this.state.homeOwnerStatus}&nbsp;</span><span className="icon enhanced-select__icon" /></span>
              </div>
              {this.state.errors && this.state.errors.homeOwnerStatus ? this.renderFormErrorRequired(this.state.errors.homeOwnerStatus) : ''}
            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="monthlyBond" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-monthly-bond-label')}</label>
              <input
                id="monthlyBond" name="monthlyBond" type="text" label="Monthly bond" onChange={evt => this.setState({ monthlyBond: evt.target.value })} onFocus={this.handleFocus} onBlur={this.handleBlur}
              />
              <div className="wfs-app__field-info" data-toggle-group="1" data-click-away="" data-class-closed="hidden">
                <span className="wfs-app__info-trigger target-is-closed" data-toggle="">
                  <span className="icon icon--info-bubble circle" onClick={evt => this.handleBubbleClick(evt)}>?</span>
                </span>
                <span className="wfs-app__info-bubble font-graphic text-intro hidden" data-toggle-content="" id="monthly-bond-bubble">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-monthly-home-loan-repayment-label')}</span>
              </div>
              {this.state.errors && this.state.errors.monthlyBond ? this.renderFormErrorRequired(this.state.errors.monthlyBond) : ''}
            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="monthlyRental" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-monthly-rental-label')}</label>
              <input
                id="monthlyRental" name="monthlyRental" type="text" label="Monthly rental" onChange={evt => this.setState({ monthlyRental: evt.target.value })} onFocus={this.handleFocus} onBlur={this.handleBlur}
              />
              <div className="wfs-app__field-info" data-toggle-group="1" data-click-away="" data-class-closed="hidden">
                <span className="wfs-app__info-trigger target-is-closed" data-toggle="">
                  <span className="icon icon--info-bubble circle" onClick={evt => this.handleBubbleClick(evt)}>?</span>
                </span>
                <span className="wfs-app__info-bubble font-graphic text-intro hidden" data-toggle-content="" id="monthly-rent-bubble">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-cost-of-renting-accommodation-label')}</span>
              </div>
              {this.state.errors && this.state.errors.monthlyRental ? this.renderFormErrorRequired(this.state.errors.monthlyRental) : ''}
            </div>
            <h4 className="font-graphic text-caps wfs-app__form-subheading">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-other-monthly-expenses-label')}</h4>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="maintenance" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-maintenance-label')}</label>
              <input
                id="maintenance" name="maintenance" type="text" label="Maintenance" onChange={evt => this.setState({ maintenance: evt.target.value })} onFocus={this.handleFocus} onBlur={this.handleBlur}
              />
              <div className="wfs-app__field-info" data-toggle-group="1" data-click-away="" data-class-closed="hidden">
                <span className="wfs-app__info-trigger target-is-closed" data-toggle="">
                  <span className="icon icon--info-bubble circle" onClick={evt => this.handleBubbleClick(evt)}>?</span>
                </span>
                <span className="wfs-app__info-bubble font-graphic text-intro hidden" data-toggle-content="" id="maintenance-bubble">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-monthly-obligation-label')}</span>
              </div>
              {this.state.errors && this.state.errors.maintenance ? this.renderFormErrorRequired(this.state.errors.maintenance) : ''}
            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="totalCreditPayments" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-total-credit-payments-label')}</label>
              <input
                id="totalCreditPayments" name="totalCreditPayments" type="text" label="Total credit payments" onChange={evt => this.setState({ totalCreditPayments: evt.target.value })} onFocus={this.handleFocus} onBlur={this.handleBlur}
              />
              <div className="wfs-app__field-info" data-toggle-group="1" data-click-away="" data-class-closed="hidden">
                <span className="wfs-app__info-trigger target-is-closed" data-toggle="">
                  <span className="icon icon--info-bubble circle" onClick={evt => this.handleBubbleClick(evt)}>?</span>
                </span>
                <span className="wfs-app__info-bubble font-graphic text-intro hidden" data-toggle-content="" id="total-credit-bubble">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-total-credit-repayments-excluding-mortgage-label')}</span>
              </div>
              {this.state.errors && this.state.errors.totalCreditPayments ? this.renderFormErrorRequired(this.state.errors.totalCreditPayments) : ''}
            </div>
            <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
              <label htmlFor="other" data-js="enhance-label" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-all-other-expenses-label')}</label>
              <input
                id="other" name="other" type="text" label="All other expenses*" onChange={evt => this.setState({ otherExpenses: evt.target.value })} onFocus={this.handleFocus} onBlur={this.handleBlur}
              />
              <div className="wfs-app__field-info" data-toggle-group="1" data-click-away="" data-class-closed="hidden">
                <span className="wfs-app__info-trigger target-is-closed" data-toggle="">
                  <span className="icon icon--info-bubble circle" onClick={evt => this.handleBubbleClick(evt)}>?</span>
                </span>
                <span className="wfs-app__info-bubble font-graphic text-intro hidden" data-toggle-content="" id="expense-other-bubble">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-all-other-expenses-bubble-label')}</span>
              </div>
              {this.state.errors && this.state.errors.otherExpenses ? this.renderFormErrorRequired(this.state.errors.otherExpenses) : ''}
            </div>
          </div>
        </div>
        <div className="grid grid--space-y text-medium">
          <h4>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-promotional-information-label')}</h4>
          <div className="form-field" data-js="form-field">
            <input name="woolworthsPromotionalInformation" id="woolworthsPromotionalInformation" type="checkbox" value="true" className="input enhanced-checkbox is-enhanced" onChange={this.handleWoolworthsPromotionalInformation} />
            <label htmlFor="woolworthsPromotionalInformation" className={`${this.state.woolworthsPromotionalInformation ? 'label-checkbox is-checked' : 'label-checkbox'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-woolworths-label')}</label>
          </div>
          <div className="form-field" data-js="form-field">
            <input name="wfsPromotionalInformation" id="wfsPromotionalInformation" type="checkbox" value="true" className="input enhanced-checkbox is-enhanced" onChange={this.handleWFSPromotionalInformation} />
            <label htmlFor="wfsPromotionalInformation" className={`${this.state.wfsPromotionalInformation ? 'label-checkbox is-checked' : 'label-checkbox'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-woolworths-financial-services-label')}</label>
          </div>
        </div>
        <div className="grid grid--space-y text-medium">
          <div className="form-field" data-js="form-field">
            <input data-validate-required="true" data-js="validate-field" name="termsAndCondtions" id="termsAndCondtions" type="checkbox" value="true" onChange={this.handleTermsAndCondtions} className="input enhanced-checkbox is-enhanced" />
            <label htmlFor="termsAndCondtions" className={`${this.state.termsAndCondtions ? 'label-checkbox is-checked' : 'label-checkbox'}`} dangerouslySetInnerHTML={{ __html: ServiceUtil.getLabel(this.props.labels, 'global-wfs-terms-and-conditions-label') }} />
            {this.state.errors && this.state.errors.termsAndCondtions ? this.renderFormErrorRequired(this.state.errors.termsAndCondtions) : ''}
          </div>
        </div>
        <div className="grid grid--space-y text-medium">
          <div className="form-field" data-js="form-field">
            <input data-validate-required="true" data-js="validate-field" name="applicantConfirmedDetails" id="applicantConfirmedDetails" type="checkbox" value="true" onChange={this.handleApplicantConfirmedDetails} className="input enhanced-checkbox is-enhanced" />
            <label htmlFor="applicantConfirmedDetails" className={`${this.state.applicantConfirmedDetails ? 'label-checkbox is-checked' : 'label-checkbox'}`} dangerouslySetInnerHTML={{ __html: ServiceUtil.getLabel(this.props.labels, 'global-wfs-applicant-confirmed-details-label') }} />
            {this.state.errors && this.state.errors.applicantConfirmedDetails ? this.renderFormErrorRequired(this.state.errors.applicantConfirmedDetails) : ''}
          </div>
        </div>
        <p className="text-small"><em>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-indicates-required-label')}</em></p>
        <hr className="wfs-app__divider" />
        <button type="submit" id="" className="input input--submit btn--primary wfs-app__button-next pos--rel">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-submit-label')}</button>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    applyNowData: _.get(state, 'applyNowReducer', {}),
  };
};
export default connect(mapStateToProps, { postIncomeExpensesData })(SubmitIncomeExpensesForm);
