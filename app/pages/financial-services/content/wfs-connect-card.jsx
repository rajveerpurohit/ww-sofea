import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Otp from '../../../pages/otp';
import _ from 'lodash';
import { getUserCardDetails } from '../../../pages/registration/actions';
import ServiceUtil from '../../../services/serviceUtil';

class WfsConnectCard extends Component {
  constructor(props) {
    super(props);
    this.state = { tripleRegisterForm: { idNumber: '' }, showErrMsg: false };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
  }

  getUserCardDetails() {
    const { showErrMsg, tripleRegisterForm } = this.state;
    if (tripleRegisterForm.idNumber) {
      this.props.getUserCardDetails(tripleRegisterForm.idNumber);
      this.setState({ showErrMsg: false });
    } else {
      this.setState({ showErrMsg: true });
    }
  }
  render() {
    const { customer, otpSuccess } = this.props;
    const { tripleRegisterForm, showErrMsg } = this.state;
    if (otpSuccess && otpSuccess.customerId) {
      return (
        <div className="page-layout__content">
          <div>
            <h1 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-details-saved')}</h1>
            <p className="text-intro"><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-success-msg')}</strong></p>
            <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-link-card-with-dashboard-text')}</p>
          </div>
          <hr className="hr--light" />
          <div className="grid--space-y">
            <a href="/dashboard" className="btn btn--primary btn--right">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-continue-msg')}</a>
          </div>
        </div>
      );
    } else if (customer && customer.contactNumber) {
      return <div className="page-layout__content"> <Otp pagetype="wfs" /> </div>;
    }
    return (
      <div className="page-layout__content">

        <header>
          <h1 className="font-graphic text-caps">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-online-profile-header')}</h1>
          <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-link-profile-details-text')}</p>
        </header>

        <div className="grid connect-card">
          <div className="grid grid__three-fourths--large grid__half--medium">
            <form method="post" name="tripleRegisterForm" id="tripleRegisterForm">
              <div className="text-small">
                <p>
                {ServiceUtil.getLabel(this.props.labels, 'global-wfs-enter-id')}
                </p>
              </div>
              <div className="form-field" data-js="form-field">
                <input
                  id="fldIdPassport"
                  name="idNumber"
                  type="text"
                  value={tripleRegisterForm.idNumber}
                  onChange={event => this.handleInputChange(event, 'tripleRegisterForm', 'idNumber')} placeholder="Please enter your ID/Passport number" className="stdFld"
                />
                {showErrMsg ? <span className="form-field__msg form-field__msg--error">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-no-records')} </span> :  <span className="form-field__msg form-field__msg--error">{customer.formexceptions && customer.formexceptions[0].message}</span>}
              </div>
              <div>
                <input name="listSubmit" id="fldListSubmit" onClick={() => this.getUserCardDetails()} type="button" value="Fetch details" className="btn btn--primary btn--right" />
              </div>
            </form>
          </div>
          <div className="grid__fourth--large grid__half--medium">
            <div className="panel">
              <div className="panel-card__body">
                <p><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-which-card')}</strong></p>
                <ul>
                  <li>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-store-card-text')}</li>
                  <li>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-credit-card-text')}</li>
                  <li>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-rewardcard-text')}</li><li>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-school-card-text')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    customer: state.createUserReducer.createUser.createUser,
    otpSuccess: state.createUserReducer.createUser.otpSuccess,
    labels: _.get(state, 'labels.labelsAndErrorMessages.WFS', {}),
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserCardDetails }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(WfsConnectCard);
