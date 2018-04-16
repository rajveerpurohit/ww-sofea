import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import ServiceUtil from '../../services/serviceUtil';

// import {  } from './actions';
import SideMenu from '../../components/sections/SideMenu';


class WrewardsTierStatusTransactions extends Component {
  static need = [];
  constructor(props) {
    super(props);

    this.primaryComponent = this.primaryComponent.bind(this);
  }
  primaryComponent(transactionData) {
    const tableRows = (rowData) => {
      return rowData.map((row, i) => {
        const startDate = row.monthStartDate.substr(0, row.monthStartDate.indexOf(' '));
        const endDate = row.monthStartDate.substr(0, row.monthStartDate.indexOf(' '));
        return [
          <tr>
            <td>{row.financialMonthAndYear}</td>
            <td>{row.monthSpend}</td>
            <td><strong>+</strong></td>
            <td>{row.monthlyGreenValue}</td>
            <td><strong>=</strong></td>
            <td>{row.monthlyTierValue}</td>
            <td>{row.ytdTierValue}</td>
            <td>{row.tierName}</td>
            <td>{row.ytdGreenValue}</td>
            <td>R 0.00</td>
            <td><span className="openArrow" /></td>
          </tr>,
          <tr>
            <td colSpan="10">
              <div className="grid">
                <div className="grid"><strong>{`WRewards summary for ${row.financialMonthAndYear}`}</strong></div>
                <div className="grid">
                  <div className="grid grid__fourth--small">{`${startDate} to ${endDate}`}</div>
                  <div className="grid grid__half--small"><span className=""><b>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-w-title')}</b>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-insta-saving')} </span><span className="">R 0.00</span></div>
                </div>
              </div>
            </td>
          </tr>
        ];
      });
    };
    const content = (transactionData) => {
      return (
        <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="first-open" data-accordion-type="open-single" data-accordion-active="true">
          <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
            <div className="accordion__toggle accordion__toggle--chrome heading heading--4" data-js="accordion-toggle">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-curr-loyalty')} &nbsp;<span>July 2017 to now</span> </div>
            <div className="accordion__content accordion__content--chrome" data-js="accordion-content">
              <div className="table-scroll table-scroll--x">
                <table cellSpacing="0" cellPadding="0" border="0" className="table table--border-rows table-scroll__table">
                  <thead>
                    <tr>
                      <th className=""><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-loyalty-period')}</strong></th>
                      <th><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-monthly-spend')}</strong></th>
                      <th className="">&nbsp;</th>
                      <th><strong className="">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-green-earned')}</strong></th>
                      <th>&nbsp;</th>
                      <th><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-monthly-earned')}</strong></th>
                      <th><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-year-to-date')}</strong></th>
                      <th><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-tier-label')}</strong></th>
                      <th><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-rewards-earned')}</strong></th>
                      <th><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-instant-savings')}</strong></th>
                      <th><span className="openArrow">&nbsp;</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.tierDetails[0].recent.wClubMonthlyDetails && tableRows(transactionData.tierDetails[0].recent.wClubMonthlyDetails)}
                    <tr>
                      <td><strong>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-year-to-date')}</strong></td>
                      <td><strong>R1059.37</strong></td>
                      <td>+</td>
                      <td><strong>R0.00</strong></td>
                      <td>=</td>
                      <td><strong>R1059.37</strong></td>
                      <td><strong>&nbsp;</strong></td>
                      <td><strong>&nbsp;</strong></td>
                      <td><strong>R 0.00</strong></td>
                      <td><strong>R38.46</strong></td>
                      <td>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div className="main-page">
        <nav className="breadcrumb empty" />
        <div className="grid  ">
          {this.props.route.pageType !== 'myAccount' ? <div className="page-layout__aside"><SideMenu pageType={this.props.route.pageCode} /></div> : null}
          <div className="page-layout__content">
            <div className="grid grid--space-y">
              <h1 className="heading heading--1 font-graphic text-caps">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-curr-tier')} <span data-hj-masked=""> {transactionData.currentTiering} </span></h1>
              <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-update-loyal-text')}</p>
              <div className="grid grid--space-y">
                {transactionData.tierDetails ? content(transactionData) : 'Service is currently off-line.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const wrewardsTransactionData = _.get(this.props, 'wrewardsTierStatus', {});
    return (
      <main className="grid grid--space-y site-main">
        {wrewardsTransactionData && this.primaryComponent(wrewardsTransactionData)}
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


export default connect(mapStateToProps)(WrewardsTierStatusTransactions);

