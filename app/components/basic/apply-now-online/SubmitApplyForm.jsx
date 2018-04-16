import React, { Component } from 'react';
import { connect } from 'react-redux';
import ServiceUtil from '../../../services/serviceUtil';
import { postApplyNowData } from '../../../pages/apply-now/actions';

class SubmitApplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      surName: '',
      idNumber: '',
      cellPhoneNumber: '',
      email: '',
      wfscardgroup: '',
      bureauConsent: false,
      debtCounseling: false,
      isFormHasErrors: false,
      errors: {}
    };
    this.handleBureauConsent = this.handleBureauConsent.bind(this);
    this.renderFormErrorRequired = this.renderFormErrorRequired.bind(this);
    this.handleDebtCounseling = this.handleDebtCounseling.bind(this);
    this.handleWFSCardGroup = this.handleWFSCardGroup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderFormErrorElm = this.renderFormErrorElm.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  // this.handleSubmit = this.handleSubmit.bind(this);
  handleFocus(e) {
    e.target.previousSibling.classList.add('is-active');
  }
  handleBlur(e) {
    if (!e.target.value) {
      e.target.previousSibling.classList.remove('is-active');
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    let flag = 0;
    if (this.state.wfscardgroup === '') {
      errors.wfscardgroup = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.fullName === '') {
      errors.fullName = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.surName === '') {
      errors.surName = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.cellPhoneNumber) {
      if (isNaN(Number(this.state.cellPhoneNumber))) {
        errors.cellPhoneNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-numbers-error');
        flag = 1;
      } else if (this.state.cellPhoneNumber.length < 10) {
        errors.cellPhoneNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-characters-error', [10]);
        flag = 1;
      } else if (!/^((06)|(07)|(08))[0-9]{8}$/i.test(this.state.cellPhoneNumber)) {
        errors.cellPhoneNumber = 'A valid Cellphone number is Required Must be 10 numeric characters';
        flag = 1;
      }
    } else if (this.state.cellPhoneNumber === '') {
      errors.cellPhoneNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.idNumber) {
      if (isNaN(Number(this.state.idNumber))) {
        errors.idNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-numbers-error');
        flag = 1;
      } else if (this.state.idNumber.length < 13) {
        errors.idNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-characters-error', [13]);
        flag = 1;
      } else {
        // Valid SA ID Number
        let ParseIdString = this.state.idNumber;
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
          flag = 1;
        }
      }
    } else if (this.state.idNumber === '') {
      errors.idNumber = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    if (this.state.email === '') {
      errors.email = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      errors.email = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-email-address-error');
      flag = 1;
    }
    if (this.state.bureauConsent === false) {
      errors.bureauConsent = ServiceUtil.getLabel(this.props.labels, 'global-wfs-invalid-requiredfield-error');
      flag = 1;
    }
    this.setState({
      errors
    });
    if (flag === 0) {
      this.setState({ isFormHasErrors: false });
      const formObj = Object.assign({}, this.state);
      document.getElementsByClassName('loading')[0].style.marginLeft = '-45px';
      document.getElementsByClassName('loading')[0].style.display = 'inline-block';
      this.props.postApplyNowData(formObj, () => {
        document.getElementsByClassName('loading')[0].style.display = 'none';
      });
    } else {
      this.setState({ isFormHasErrors: true });
    }
  }
  handleBureauConsent() {
    this.setState({ bureauConsent: !this.state.bureauConsent });
  }
  handleDebtCounseling() {
    this.setState({ debtCounseling: !this.state.debtCounseling });
  }
  handleWFSCardGroup(evt) {
    this.setState({ wfscardgroup: evt.target.value });
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
  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="on" className="wfs-app__form">
        {this.renderFormErrorElm()}
        <h4 className="text-align-center font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-what-product-would-you-like-to-apply-for-label')}</h4>
        <div className="form-field" data-js="form-field">
          <ul className="nav-list-x wfs-app__card-type grid grid--space-y" data-validate-type="radio-group" data-js="validate-field" data-validate-required="true">
            <li className="grid__third--small text-align-center text-intro">
              <input name="wfs-card-group" id="creditCard" onChange={evt => this.handleWFSCardGroup(evt)} type="radio" value="creditCard" className="input enhanced-radio is-enhanced" />
              <label htmlFor="creditCard" className={`${this.state.wfscardgroup === 'creditCard' ? 'label-radio is-checked' : 'label-radio'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-credit-card-label')}</label><br /><br />
              <label htmlFor="creditCard" >
                <img src="https://www.woolworths.co.za/images/wfs/wfs-creditcard.png" alt="Credit card" width="150" height="95" />
              </label>
            </li>
            <li className="grid__third--small text-align-center text-intro">
              <input name="wfs-card-group" id="storeCard" type="radio" value="storeCard" className="input enhanced-radio is-enhanced" onChange={evt => this.handleWFSCardGroup(evt)} />
              <label htmlFor="storeCard" className={`${this.state.wfscardgroup === 'storeCard' ? 'label-radio is-checked' : 'label-radio'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-store-card-label')}</label><br /><br />
              <label htmlFor="storeCard" >
                <img src="https://www.woolworths.co.za/images/wfs/wfs-storecard.png" alt="Store card" width="150" height="95" />
              </label>
            </li>
            <li className="grid__third--small text-align-center text-intro">
              <input name="wfs-card-group" id="personalLoan" type="radio" value="personalLoan" className="input enhanced-radio is-enhanced" onChange={evt => this.handleWFSCardGroup(evt)} />
              <label htmlFor="personalLoan" className={`${this.state.wfscardgroup === 'personalLoan' ? 'label-radio is-checked' : 'label-radio'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-personal-loan-label')}</label><br /><br />
              <label htmlFor="personalLoan" >
                <img src="https://www.woolworths.co.za/images/wfs/wfs-loan.png" alt="Personal loan" width="150" height="95" />
              </label>
            </li>
            {this.state.errors && this.state.errors.wfscardgroup ? this.renderFormErrorRequired(this.state.errors.wfscardgroup) : ''}
          </ul>
        </div>
        <h4 className="text-align-center font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-please-enter-your-details-below-to-continue-label')}</h4>
        <div className="grid" >
          <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
            <label htmlFor="fullName" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-full-names-label')}</label>
            <input
              value={this.state.fullName}
              onChange={evt => this.setState({ fullName: evt.target.value })} maxLength="35" className="input" type="text" id="fullName" name="fullName"
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {this.state.errors && this.state.errors.fullName ? this.renderFormErrorRequired(this.state.errors.fullName) : ''}
          </div>
          <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
            <label htmlFor="surname" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-surname-label')}</label>
            <input
              maxLength="60" value={this.state.surName} onChange={evt => this.setState({ surName: evt.target.value })} className="input" type="text" id="surname" name="surname" onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {this.state.errors && this.state.errors.surName ? this.renderFormErrorRequired(this.state.errors.surName) : ''}
          </div>
          <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
            <label htmlFor="idNumber" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-south-african-id-number-label')}</label>
            <input
              maxLength="13" value={this.state.idNumber} onChange={evt => this.setState({ idNumber: evt.target.value })} className="input" type="text" id="idNumber" name="idNumber" onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {this.state.errors && this.state.errors.idNumber ? this.renderFormErrorRequired(this.state.errors.idNumber) : ''}
          </div>
          <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
            <label htmlFor="cellPhoneNumber" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-cellphone-number-label')}</label>
            <input
              maxLength="10" value={this.state.cellPhoneNumber} onChange={evt => this.setState({ cellPhoneNumber: evt.target.value })} className="input" type="text" id="cellPhoneNumber" name="cellPhoneNumber" onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {this.state.errors && this.state.errors.cellPhoneNumber ? this.renderFormErrorRequired(this.state.errors.cellPhoneNumber) : ''}
          </div>
          <div className="form-field wfs-app__form-field form-field--enhanced-label" data-js="form-field">
            <label htmlFor="emailAddress" className="form-field__label--enhanced">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-email-address-label')}</label>
            <input
              value={this.state.email}
              onChange={evt => this.setState({ email: evt.target.value })} maxLength="255" className="input" type="text" id="emailAddress" name="emailAddress"
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {this.state.errors && this.state.errors.email ? this.renderFormErrorRequired(this.state.errors.email) : ''}
          </div>
          <div className="grid grid--space-y text-medium">
            <h4>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-please-confirm-that-label')}</h4>
            <div className="form-field" data-js="form-field">
              <input data-validate-required="true" data-js="validate-field" name="bureauConsent" id="bureauConsent" type="checkbox" value="" onChange={this.handleBureauConsent} className="input enhanced-checkbox is-enhanced" />
              <label htmlFor="bureauConsent" className={`${this.state.bureauConsent ? 'label-checkbox is-checked' : 'label-checkbox'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-bureau-consent-label')}</label>
              {this.state.errors && this.state.errors.bureauConsent ? this.renderFormErrorRequired(this.state.errors.bureauConsent) : ''}
            </div>
            <div className="form-field" data-js="form-field">
              <input name="debtCounseling" id="debtCounseling" onChange={this.handleDebtCounseling} type="checkbox" value="true" className="input enhanced-checkbox is-enhanced" />
              <label htmlFor="debtCounseling" className={`${this.state.debtCounseling ? 'label-checkbox is-checked' : 'label-checkbox'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-debt-counseling-label')}</label>
            </div>
            <p className="text-small"><em>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-indicates-required-label')}</em></p>
            <hr className="wfs-app__divider" />
            <button type="submit" id="" className="input input--submit btn--primary wfs-app__button-next pos--rel">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-next-label')}</button>
            <span style={{ display: 'none' }}className="loading loading--dark loading--medium" />
            
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};
export default connect(mapStateToProps, { postApplyNowData })(SubmitApplyForm);
