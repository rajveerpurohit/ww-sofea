import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { browserHistory, Link } from 'react-router';
import { getSwitchStatementDetails, updateStatementPreferences } from './../actions';
import ServiceUtil from '../../../services/serviceUtil';

class WfsSwitchEstatements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeCardStatus: false,
      personalLoanStatus: false,
      emailID: '',
      recieveEstatements: false,
      customerID: ''
    };
  }
  componentWillMount() {
    this.props.getSwitchStatementDetails();
  }
  componentWillReceiveProps(nextProps) {
    const { switchStatementDetails } = nextProps;
    if (switchStatementDetails) {
      switchStatementDetails.storeCardPortFolio && switchStatementDetails.storeCardPortFolio.statementPreference.value === 'EMAIL' ? this.setState({ storeCardStatus: true }) : '';
      switchStatementDetails.personalLoanPortFolio && switchStatementDetails.personalLoanPortFolio.statementPreference.value === 'EMAIL' ? this.setState({ storeCardStatus: true }) : '';
      this.setState({ emailID: switchStatementDetails.emailStatementPreference, customerID: switchStatementDetails.customerID });
    }
  }
  handleEmail(e) {
    e.preventDefault();
    e.target.parentNode.style.display = 'none';
    document.getElementById('emailID').classList.remove('hidden');
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.updateStatementPreferences(this.state);
  }
  renderStoreCard() {
    return (<div>
      <input name="storeCard" checked="checked" id="storeCardStatus" type="checkbox" value="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.setState({ storeCardStatus: !this.state.storeCardStatus }); }} />
      <label htmlFor="storeCardStatus" className={`${this.state.storeCardStatus ? 'label-checkbox is-checked' : 'label-checkbox'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-st-card')} </label>
    </div>);
  }
  renderPersonalCard() {
    return (<div>
      <input name="personalCard" checked="checked" id="personalLoanStatus" type="checkbox" value="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.setState({ personalLoanStatus: !this.state.personalLoanStatus }); }} />
      <label htmlFor="personalLoanStatus" className={`${this.state.personalLoanStatus ? 'label-checkbox is-checked' : 'label-checkbox'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-pers-loan')} </label>
    </div>);
  }
  renderCreditCard() {
    return (
      <div className="grid">
        <p className="text-intro">
        {ServiceUtil.getLabel(this.props.labels, 'global-wfs-credit-note')} <Link to="mailto:creditcard@wfs.co.za">creditcard@wfs.co.za</Link>)
        </p>
      </div>);
  }
  render() {
    const switchStatementDetails = _.get(this.props, 'switchStatementDetails', []);
    const updateStatement = _.get(this.props, 'updateStatement', []);
    updateStatement.errors === '' ? browserHistory.push({ pathname: '/dashboard/wfs/switch-estatements-thanks' }) : '';
    return (
      <div className="page-layout__content">
        <div className="grid">
          <p className="float-r">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-need-help')} <span><a href="tel:0861 50 20 05" className="link-silent"><strong>0861 50 20 05</strong></a></span></p>
          <h1 className="text-caps flush font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-switch-estat')}</h1>
          <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-monthly-stat')}</p>
          <h3 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-receive-estat')}</h3>
          <div className="grid">
            <form onSubmit={e => this.handleSubmit(e)} name="frmEstatementsForm" id="frmEstatementsForm" className="contactForm statementsForm">
              {
                    switchStatementDetails.isStoreCardValid ? this.renderStoreCard() : ''
              }
              {
                    switchStatementDetails.isPersonalLoanValid ? this.renderPersonalCard() : ''
              }
              {
                    switchStatementDetails.isCreditCardValid ? this.renderCreditCard() : ''
              }
              <div className="grid">
                <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-estat-sent-to')} {this.state.emailID} <Link onClick={(e) => { this.handleEmail(e); }} className="icon-text text-small link--silent arrow-link--forward" rel="changeEmailAddress" href="#">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-change-mail')}</Link></p>
                <input
                    value={this.state.emailID}
                    onChange={evt => this.setState({ emailID: evt.target.value })} className="stdFld hidden" type="text" id="emailID" name="estatementsEmail"
                />
                <p className="formErrors text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-enter-valid-mail')}</p>
                <p className="form-field__msg form-field__msg--error" />
              </div>
              <div className="grid">
                <input name="statementsAcknowledge" checked="checked" id="recieveEstatements" type="checkbox" value="true" className="input enhanced-checkbox is-enhanced" onChange={(e) => { this.setState({ recieveEstatements: !this.state.recieveEstatements }); }} />
                <label htmlFor="recieveEstatements" className={`${this.state.recieveEstatements ? 'label-checkbox is-checked' : 'label-checkbox'}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-ack-mail-receive')}</label>
                <p className="form-field__msg form-field__msg--error">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-conf-mail-recieve')} </p>
                <p className="form-field__msg form-field__msg--error" />
              </div>
              <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-req-field')}</p>
              <div className="various">
                <input name="submit" id="fldUpdate" type="submit" value="Submit" className="btn btn--primary btn--right" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    switchStatementDetails: state.financialServicesReducer.switchStatementDetails,
    updateStatement: state.financialServicesReducer.updateStatement,
    labels: _.get(state, 'labels.labelsAndErrorMessages.WFS', {}),
  };
};

export default connect(mapStateToProps, { getSwitchStatementDetails, updateStatementPreferences })(WfsSwitchEstatements);
