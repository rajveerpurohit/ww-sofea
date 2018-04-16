import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import { getStoreCardSummary } from './../actions';
import ServiceUtil from '../../../services/serviceUtil';

class WfsMyWfs extends Component {
  componentWillMount() {
    this.props.getStoreCardSummary();
  }
  render() {
    console.log("props",this.props.labels);
    const serviceCards = _.get(this.props.cardSummary, 'serviceCards', []);
    return (
      <div className="page-layout__content">
        <div className="grid">
          <div className="leftCol wfsGreeting">
            <h1 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-welcome-text')} {this.props.user.userName}</h1>
            <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-switch-statements-text')}</p>
          </div>
          <div className="rightCol" />
        </div>
        <div className="grid">
          <h2 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-account-summary-text')}</h2>
          {
            serviceCards.map((card) => {
              return (<div>
                <div className="grid">
                  <h3 className="text-caps font-graphic">{card.description}</h3>
                  <div className="grid__two-thirds--medium">
                    <p className="text-caps"><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-account-num-label')}</strong>{card.accountNumber}</p>
                    <table cellSpacing="0" cellPadding="0" width="100%" className="table table--border-rows grid--space-y">
                      <tbody>
                        <tr>
                          <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-avail-funds-label')}</strong></td>
                          <td>{card.description === 'Credit Card' ? card.limit : card.OpenToBuy }</td>
                        </tr>
                        <tr>
                          <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-curr-bal-label')}</strong></td>
                          <td>{card.description === 'Credit Card' ? card.balance : card.MemoBalance}</td>
                        </tr>
                        {
                        card.description === 'Credit Card' ? <tr>
                          <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wfs-budg-bal-label')}</strong></td>
                          <td>{card.currentBudgetBalance}</td>
                        </tr> : ''
                      }
                      </tbody>
                    </table>
                  </div>
                  <div className="grid__third--medium text-align-right flush-m">
                    <div className="grid">
                      <img src={card.cardImage} alt="" />
                    </div>
                  </div>
                </div>
                <div className="grid grid--space-y">
                  <Link to={`/dashboard/wfs/product-details/isCreditCard=${card.creditCard}&accountNumber=${card.accountNumber}`} className="arrow-link--forward link--silent text-small strong">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-view-info-label')}</Link>
                </div>
              </div>);
            })
          }
          {/* { cardSummary.creditCard ?
            <div className="grid">
              <h3 className="text-caps font-graphic">{cardSummary.creditCard['0'].description}</h3>
              <div className="grid__two-thirds--medium">
                <p className="text-caps"><strong>Account number:</strong>{cardSummary.creditCard['0'].accountNumber}</p>
                <table cellSpacing="0" cellPadding="0" width="100%" className="table table--border-rows grid--space-y">
                  <tbody>
                    <tr>
                      <td><strong>Available Funds:</strong></td>
                      <td>{cardSummary.creditCard['0'].limit}</td>
                    </tr>
                    <tr>
                      <td><strong>Current Balance:</strong></td>
                      <td>{cardSummary.creditCard['0'].balance}</td>
                    </tr>
                    <tr>
                      <td><strong>Budget Balance:</strong></td>
                      <td>{cardSummary.creditCard['0'].currentBudgetBalance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="grid__third--medium text-align-right flush-m">
                <div className="grid">
                  <img src={cardSummary.creditCard['0'].cardImage} alt="" />
                </div>
              </div>
            </div> : ''
          }
          { cardSummary.creditCard ?
            <div className="grid grid--space-y">
              <Link to="/dashboard/wfs/product-details/isCreditCard" className="arrow-link--forward link--silent text-small strong">View more info </Link>
            </div> : ''
          }
          { cardSummary.serviceCards ?
            <div className="grid">
              <h3 className="text-caps font-graphic">{cardSummary.serviceCards['0'].description}</h3>
              <div className="grid__two-thirds--medium">
                <p className="text-caps"><strong>Account number:</strong>{cardSummary.serviceCards['0'].accountNumber}</p>
                <table cellSpacing="0" cellPadding="0" width="100%" className="table table--border-rows grid--space-y">
                  <tbody>
                    <tr>
                      <td><strong>Available Funds:</strong></td>
                      <td>{cardSummary.serviceCards['0'].OpenToBuy}</td>
                    </tr>
                    <tr>
                      <td><strong>Current Balance:</strong></td>
                      <td>{cardSummary.serviceCards['0'].MemoBalance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="grid__third--medium text-align-right flush-m">
                <div className="grid">
                  <img src={cardSummary.serviceCards['0'].cardImage} alt="" />
                </div>
              </div>
            </div> : ''
          }
          { cardSummary.serviceCards ?
            <div className="grid grid--space-y">
              <Link to="/dashboard/wfs/product-details/isServiceCards" className="arrow-link--forward link--silent text-small strong">View more info </Link>
            </div> : ''
          } */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    cardSummary: state.financialServicesReducer.cardSummary,
    labels: _.get(state, 'labels.labelsAndErrorMessages.WFS', {}),
  };
};

export default connect(mapStateToProps, { getStoreCardSummary })(WfsMyWfs);
