import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { browserHistory, Link } from 'react-router';
import moment from 'moment';
import { getStoreCardSummary, getTransactionHistory } from './../actions';
import { DEFAULT_DATE_PICKER_DATE_FORMAT } from '../../../Constants';
import DatePicker from '../../../components/basic/datepicker';
import ServiceUtil from '../../../services/serviceUtil';

class WfsTransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fldAccountSelect: '',
      startDate: '',
      endDate: ''
    };
    this.renderCreditCardData = this.renderCreditCardData.bind(this);
    this.renderOtherCardData = this.renderOtherCardData.bind(this);
  }
  componentWillMount() {
    this.props.getStoreCardSummary();
    if (this.props.routeParams.accountNumber) {
      const formData = {
        accountNumber: this.props.routeParams.accountNumber
      };
      this.props.getTransactionHistory(formData);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { cardSummary } = nextProps;
    if (cardSummary) {
      if (this.props.routeParams.accountNumber) {
        const getCardSummary = _.get(cardSummary, 'serviceCards', []);
        getCardSummary.map((card) => {
          if (card.accountNumber === this.props.routeParams.accountNumber) {
            return this.setState({ fldAccountSelect: card.accountNumber + ' - ' + card.description });
          }
          return this.setState({ fldAccountSelect: cardSummary.serviceCards[0].accountNumber + ' - ' + cardSummary.serviceCards[0].description });
        });
      } else {
        const getCardSummary = _.get(cardSummary, 'serviceCards[0]', []);
        _.compact(_.values(getCardSummary)).length !== 0 ? this.setState({ fldAccountSelect: getCardSummary.accountNumber + ' - ' + getCardSummary.description }) : '';
      }
    }
  }
  formatDate(date) {
    try {
      let _date = date;

      if (typeof date === 'string') {
        _date = moment(new Date(date.split(' ')[0]));
      }

      return _date.format(DEFAULT_DATE_PICKER_DATE_FORMAT);
    } catch (e) {
      return '';
    }
  }
  handleChange(evt) {
    evt.preventDefault();
    this.setState({ fldAccountSelect: evt.target.value });
    const formData = {
      accountNumber: this.state.fldAccountSelect.substring(0, this.state.fldAccountSelect.indexOf('-')).trim(),
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.props.getTransactionHistory(formData);
    browserHistory.push({ pathname: '/dashboard/wfs/transaction-history/accountNumber=' + formData.accountNumber });
  }
  handleGo(evt) {
    evt.preventDefault();
    this.setState({ fldAccountSelect: evt.target.value });
    const formData = {
      accountNumber: this.state.fldAccountSelect.substring(0, this.state.fldAccountSelect.indexOf('-')).trim(),
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.props.getTransactionHistory(formData);
    browserHistory.push({ pathname: '/dashboard/wfs/transaction-history/accountNumber=' + formData.accountNumber });
  }
  renderCreditCardData(transactionHistory) {
    return transactionHistory.transactionHistory.length === 0 ?
      <div className="grid__two-thirds--medium">
        <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-st-card')}</p>
      </div> :
      <div className="grid">
        <table cellSpacing="0" cellPadding="0" border="0" width="100%" className="transactionTable detailsTable inactiveTable table table--border-rows">
          <thead>
            <tr>
              <th><p>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-st-card')}</p></th>
              <th><p>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-st-card')}</p></th>
              <th><p>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-st-card')}</p></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><p>2017-12-27</p></td>
              <td><p>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-st-card')}</p></td>
              <td><p>R 56.95</p></td>
            </tr>
          </tbody>
        </table>
      </div>;
  }
  renderOtherCardData(transactionHistory) {
    return transactionHistory.transactionHistory.length === 0 ?
      <div className="grid__two-thirds--medium">
        <p className="text-intro">T{ServiceUtil.getLabel(this.props.labels, 'global-wfs-st-card')}</p>
      </div> :
      <div className="grid">
        <table cellSpacing="0" cellPadding="0" border="0" width="100%" className="transactionTable detailsTable inactiveTable table table--border-rows">
          <thead>
            <tr>
              <th><p>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-date-label')}</p></th>
              <th><p>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-descr-label')}</p></th>
              <th><p>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-deb-label')}</p></th> <th><p>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-cred-label')}</p></th>
            </tr>
          </thead> <tbody>
            <tr>
              <td><p>2018-01-01</p></td>
              <td><p>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-payment-label')}</p></td>
              <td />
              <td><p>R 100.00</p></td>
            </tr>
          </tbody>
        </table>
        <div className="grid__two-thirds--medium">
          <p className="text-intro">
            <strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-prefer-monthly-trans')}</strong>? <Link className="btn btn--primary btn--right" to="/dashboard/wfs/switch-estatements">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-switch-estat')}</Link>
          </p>
        </div>
      </div>;
  }
  render() {
    const getCardSummary = _.get(this.props.cardSummary, 'serviceCards', []);
    const transactionHistory = _.get(this.props, 'transactionHistory', []);
    if (this.props.routeParams.accountNumber && _.keys(transactionHistory).length > 0) {
      return (<div className="page-layout__content">
        <div className="grid">
          <h1 className="text-caps font-graphic">{transactionHistory.cardDescription}</h1>
          <div className="text-align-right">
            <h4 className="text-thin">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-need-help')} <span><a href="tel:0861 50 20 05"><strong>0861 50 20 05</strong></a></span></h4>
          </div>
          <div className="grid__two-thirds--large grid--space-y">
            <p htmlFor="fldAccountSelect" className="text-intro"><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-account-num-label')}</strong></p>
            <div className="grid grid--space-y">
              <span className="enhanced-select">
                <select data-js="enhance-select" name="accountSelect" id="fldAccountSelect" className="customSelectFull" onChange={evt => this.handleChange(evt)}>
                  {
                        getCardSummary.map((card, index) => {
                          return <option key={`${card}${index}`} value={`${card.accountNumber} - ${card.description}`}>{card.accountNumber} - {card.description}</option>;
                        })
                    }
                </select>
                <span className="enhanced-select__label">{this.state.fldAccountSelect}&nbsp;</span>
                <span className="icon enhanced-select__icon" />
              </span>
            </div>
          </div>
          { transactionHistory.isCreditCard ? '' : <form name="periodSelect" id="frmPeriodSelect" className="periodSelectForm" onSubmit={evt => this.handleGo(evt)}>
            <div className="grid__two-thirds--large grid--space-y">
              <div className="grid__half--medium">
                <div className="grid__fourth--medium">
                  <div className="grid--space-y"><p><strong className="text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-trans-period')}</strong></p></div>
                </div>
                <div className="grid__three-fourths--medium ">
                  <DatePicker
                            startDate={this.state.fromDate}
                            handleChange={evt => this.setState({ fromDate: evt })}
                            placeholder="From"
                  />
                </div>
              </div>
              <div className="grid__half--medium">
                <div className="grid__three-fourths--medium ">
                  <DatePicker
                            startDate={this.state.toDate}
                            handleChange={evt => this.setState({ toDate: evt })}
                            placeholder="To"
                  />
                  {/* <span className="datepicker-btn grid--space-y"><i /></span> */}
                </div>
                <div className="grid__fourth--medium">
                  <input name="submit" id="goSubmit" type="submit" value="Go" className="btn btn--primary btn--right grid--space-y" />
                </div>
              </div>
            </div>
          </form> }
          { transactionHistory.isCreditCard ?
            this.renderCreditCardData(transactionHistory) : this.renderOtherCardData(transactionHistory)
          }
        </div>
      </div>);
    }
    return (
      <div className="page-layout__content">
        <div className="grid">
          <div className="text-align-right">
            <h4 className="text-thin">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-need-help')}<span><a href="tel:0861 50 20 05"><strong>0861 50 20 05</strong></a></span></h4>
          </div>
          <div className="grid__two-thirds--large grid--space-y">
            <p htmlFor="fldAccountSelect" className="text-intro"><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-account-num-label')}</strong></p>
            <div className="grid grid--space-y">
              <span className="enhanced-select">
                <select data-js="enhance-select" name="accountSelect" id="fldAccountSelect" className="customSelectFull" onChange={evt => this.handleChange(evt)}>
                  {
                    getCardSummary.map((card) => {
                      return <option value={`${card.accountNumber} - ${card.description}`}>{card.accountNumber} - {card.description}</option>;
                    })
                }
                </select>
                <span className="enhanced-select__label">{this.state.fldAccountSelect}&nbsp;</span>
                <span className="icon enhanced-select__icon" />
              </span>
            </div>
          </div>
          <form onSubmit={evt => this.handleGo(evt)} name="periodSelect" id="frmPeriodSelect" className="periodSelectForm">
            <div className="grid__two-thirds--large grid--space-y">
              <div className="grid__half--medium">
                <div className="grid__fourth--medium">
                  <div className="grid--space-y"><p><strong className="text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-trans-period')}</strong></p></div>
                </div>
                <div className="grid__three-fourths--medium ">
                  <DatePicker
                    startDate={this.state.startDate}
                    handleChange={evt => this.setState({ startDate: evt })}
                    placeholder="From"
                  />
                </div>
              </div>
              <div className="grid__half--medium">
                <div className="grid__three-fourths--medium ">
                  <DatePicker
                    startDate={this.state.endDate}
                    handleChange={evt => this.setState({ endDate: evt })}
                    placeholder="To"
                  />
                  {/* <span className="datepicker-btn grid--space-y"><i /></span> */}
                </div>
                <div className="grid__fourth--medium">
                  <input name="submit" id="goSubmit" type="submit" value="Go" className="btn btn--primary btn--right grid--space-y" />
                </div>
              </div>
            </div>
            <div className="formErrors">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-salect-date')}</div>
          </form>
          <div className="grid__two-thirds--medium">
            <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-need-help')}</p>
          </div>
          <div className="grid__two-thirds--medium">
            <p className="text-intro">
              <strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-prefer-monthly-trans')}</strong>? <Link className="btn btn--primary btn--right" to="/dashboard/wfs/switch-estatements">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-switch-estat')}</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cardSummary: state.financialServicesReducer.cardSummary,
    transactionHistory: state.financialServicesReducer.transactionHistory,
    labels: _.get(state, 'labels.labelsAndErrorMessages.WFS', {}),
  };
};

export default connect(mapStateToProps, { getStoreCardSummary, getTransactionHistory })(WfsTransactionHistory);
