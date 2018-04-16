import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import _ from 'lodash';

import ServiceUtil from '../../services/serviceUtil';
import { getWrewardsTierStatus } from './actions';
import SideMenu from '../../components/sections/SideMenu';

class WrewardsTierStatus extends Component {
  static need = [];
  constructor(props) {
    super(props);

    this.primaryComponent = this.primaryComponent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.renderFormErrorElm = this.renderFormErrorElm.bind(this);
    this.renderFormFieldErrorElm = this.renderFormFieldErrorElm.bind(this);

    this.state = {
      tierID: '',
      fieldHavingFocus: '',
      formErrors: '',
      formErrorMessage: ''
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.tierID !== '') {
      this.setState({ formErrors: '' });
      this.props.getWrewardsTierStatus(this.state.tierID).then(() => {
        const tierResponse = this.props.wrewardsTierStatus;
        if (tierResponse.hasOwnProperty('errorMessage')) {
          this.setState({ formErrors: '1', formErrorMessage: tierResponse.errorMessage });
        } else {
          this.setState({ formErrors: '' });
          browserHistory.push('/wrewards/tier-status-transactions');
        }
      });
    } else {
      this.setState({ formErrors: '1', formErrorMessage: 'This is a required field.' });
    }
  }
  handleFocus(evt, field) {
    if (evt) evt.preventDefault();
    this.setState({ fieldHavingFocus: field });
  }
  handleBlur(evt) {
    if (evt) evt.preventDefault();
    this.setState({ fieldHavingFocus: '' });
  }
  renderFormErrorElm() {
    return (
      <div className="text-small message message--error">
        <span>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-errors-input')}</span>
      </div>
    );
  }

  renderFormFieldErrorElm() {
    return (
      <span className="form-field__msg form-field__msg--error">{this.state.formErrorMessage}</span>
    );
  }
  primaryComponent(wrewards) {
    return (
      <div className="main-page">
        <nav className="breadcrumb empty" />
        <div className="grid  ">
          <div className="page-layout__aside">
            <SideMenu pageType={this.props.route.pageCode} />
          </div>
          <div className="page-layout__content">
            <section className="grid grid--space-y">
              <h1 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-check-tier')}</h1>
              <div className="grid__half--medium">
                <p className="text-small">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-view-summary-label')}</p>
                {this.state.formErrors === 1 ? this.renderFormErrorElm() : null}
                <form name="tripleRegisterForm" id="frmTripleRegisterForm" className="" onSubmit={this.handleSubmit}>
                  <div id="idPassport" className="form-field idMethod form-field--enhanced-label" data-js="form-field">
                    <label className={classnames('form-field__label form-field__label--enhanced', { 'is-active': !_.isEmpty(this.state.tierID) || this.state.fieldHavingFocus === 'tierID' })}>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-id-text')}</label>
                    <input
type="text" id="fldIdPassport" name="idNumber" className="stdFld" maxLength="13"
                      value={this.state.tierID}
                      onBlur={this.handleBlur}
                      onFocus={e => this.handleFocus(e, 'tierID')}
                      onChange={e => (this.setState({ tierID: e.target.value }))}
                    />
                    {this.state.formErrors ? this.renderFormFieldErrorElm() : null}
                  </div>
                  <div className="grid--space-y">
                    <div className="formErrors">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-enter-id-text')}</div>
                  </div>
                  <input name="fetchCustomerDetails" id="fetchCustomerDetails" type="submit" value="Fetch details" className="btn btn--primary btn--right" />
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <main className="grid grid--space-y site-main">
        {this.primaryComponent()}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wrewardsTierStatus: state.wrewardsReducer.wrewardsTierStatusReducer.wrewardsTierData,
    labels: _.get(state, 'labels.labelsAndErrorMessages.wRewards', {}),
  };
};


export default connect(mapStateToProps, { getWrewardsTierStatus })(WrewardsTierStatus);
