import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import localeInfoUtil from '../../../services/localeInfoUtil';
import { getCardDetails } from './../actions';
import ServiceUtil from '../../../services/serviceUtil';

class WfsProductDetails extends Component {
  constructor(props) {
    super(props);
    const type = this.props.params.type;
    const corporateNumber = this.props.corporateNumber;
    const creditCard = type !== undefined && type.indexOf('true&') >= 0 ? 'true' : 'false';
    const accountNumber = localeInfoUtil.getParameterByName('accountNumber', this.props.params.type);
    this.state = {
      cardDetails: {
        corporateNumber,
        creditCard,
        accountNumber
      }
    };
  }
  componentWillMount() {
    this.props.getCardDetails(this.state.cardDetails);
  }
  render() {
    const cardDetails = _.get(this.props, 'cardDetails', {});
    const customerInfoBean = _.get(this.props, 'cardDetails.customerInfoBean', {});
    const displayDate = cardDetails.displayDate ? new Date(cardDetails.displayDate.replace(/[CAT] */g, '')) : new Date();
    return (
      <div className="page-layout__content">
        <div className="grid">
          <div className="grid__half--medium">
            <h1 className="text-caps font-graphic">{customerInfoBean.description}</h1>
          </div>
          <div className="grid__half--medium text-align-right">
            <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-need-help')}<span><a href="tel:0861 50 20 05"><strong>0861 50 20 05</strong></a></span>
            </p>
          </div>
          <div className="grid">
            <div className="grid__two-thirds--medium">
              <table cellSpacing="0" cellPadding="0" width="100%" className="table table--border-rows grid--space-y">
                <tbody>
                  <tr>
                    <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-account-num-label')}</strong></td>
                    <td className="text-align-right">{customerInfoBean.accountNumber}</td>
                  </tr>
                  <tr>
                    <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-avail-funds-label')}</strong></td>
                    <td className="text-align-right">{cardDetails.cardType !== 'serviceCard' ? customerInfoBean.limit : customerInfoBean.openToBuy}</td>
                  </tr>
                  <tr>
                    <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-curr-bal-label')}</strong></td>
                    <td className="text-align-right">{cardDetails.cardType !== 'serviceCard' ? customerInfoBean.balance : customerInfoBean.memoBalance}</td>
                  </tr>
                  { cardDetails.cardType !== 'serviceCard' ?
                    <tr>
                      <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-budg-bal-label')}</strong></td>
                      <td className="text-align-right">{customerInfoBean.currentBudgetBalance}</td>
                    </tr> : ''
                  }
                </tbody>
              </table>
            </div>
            <div className="grid__third--medium text-align-right">
              <img src={customerInfoBean.cardImage} alt="" className="img-responsive" />
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="grid__half--medium grid--space-y">
            <h3 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-acc-status-at')} {displayDate.getDate()} {displayDate.toLocaleString('en-us', { month: 'long' })} {displayDate.getFullYear()}</h3></div>
          <div className="grid__half--medium text-align-right">
            <Link className="btn btn--primary btn--right" to={`/dashboard/wfs/transaction-history/accountNumber=${customerInfoBean.accountNumber}`}>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-trans-history')}</Link>
          </div>
          <div className="grid">
            <table cellSpacing="0" cellPadding="0" width="100%" className="table table--border-rows grid--space-y">
              <tbody>
                <tr>
                  <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-min-pay-amt')}</strong>:</td>
                  <td className="text-align-right">{customerInfoBean.paymentTotalAmountDue}</td>
                </tr>
                { cardDetails.cardType !== 'serviceCard' ?
                  <tr>
                    <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-min-pay-due-date')}</strong>:</td>
                    <td className="text-align-right">{customerInfoBean.datePaymentDue}</td>
                  </tr> : ''
                  }
                <tr>
                  <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-min-pay-due-date')}</strong>:</td>
                  <td className="text-align-right">{ cardDetails.cardType !== 'serviceCard' ? customerInfoBean.limit : customerInfoBean.currentCreditLine}</td>
                </tr>
                <tr>
                  <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-min-last-pay-amt')}</strong>:</td>
                  <td className="text-align-right">{customerInfoBean.lastPaymentAmount}</td>
                </tr>
                <tr>
                  <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-min-last-pay-date')}</strong>:</td>
                  <td className="text-align-right">{customerInfoBean.dateLastPayment}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        { cardDetails.cardType !== 'serviceCard' ?
          <div className="grid grid--space-y">
            <h3 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-min-detail-quarter')}</h3>
            <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-min-offline')}</p>
          </div> : ''
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    corporateNumber: _.get(state, 'clp.currentUser.corporateNumber', {}),
    cardDetails: state.financialServicesReducer.cardDetails,
    labels: _.get(state, 'labels.labelsAndErrorMessages.WFS', {}),
  };
};

export default connect(mapStateToProps, { getCardDetails })(WfsProductDetails);
