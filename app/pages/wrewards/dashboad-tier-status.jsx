import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { getDashbordTierStatus } from './actions';
import SideMenu from '../../components/sections/SideMenu';


class DashboardTierStatus extends Component {
  static need = [];
  constructor(props) {
    super(props);

    //this.primaryComponent = this.primaryComponent.bind(this);
  }
  componentDidMount() {
    this.props.getDashbordTierStatus();
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
            <td>R 0.00</td>
            <td>{row.monthDiscount}</td>
            <td><span className="openArrow" /></td>
          </tr>,
          <tr>
            <td colSpan="10">
              <div className="grid">
                <div className="grid"><strong>{`WRewards summary for ${row.financialMonthAndYear}`}</strong></div>
                <div className="grid">
                  <div className="grid grid__fourth--small">{`${startDate} to ${endDate}`}</div>
                  <div className="grid grid__half--small"><span className=""><b>W</b>Rewards total instant savings: </span><span className="">R 0.00</span></div>
                </div>
              </div>
            </td>
          </tr>
        ];
      });
    };
    const content = (transactionData) => {
      return [
        <div className="grid grid--space-y">
          <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="first-open" data-accordion-type="open-single" data-accordion-active="true">
            <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
              <div className="accordion__toggle accordion__toggle--chrome heading heading--4" data-js="accordion-toggle">Current Loyalty Period: &nbsp;<span>{transactionData.tierDetails[0].recent.wClubMonthlyDetails[0].financialMonthAndYear} to now</span> </div>
              <div className="accordion__content accordion__content--chrome" data-js="accordion-content">
                <div className="table-scroll table-scroll--x">
                  <table cellSpacing="0" cellPadding="0" border="0" className="table table--border-rows table-scroll__table">
                    <thead>
                      <tr>
                        <th className=""><strong>Loyalty Period</strong></th>
                        <th><strong>Monthly Spend</strong></th>
                        <th className="">&nbsp;</th>
                        <th><strong className="">Wrewards Green Earned</strong></th>
                        <th>&nbsp;</th>
                        <th><strong>Monthly Tier Value</strong></th>
                        <th><strong>Year To Date Tier Value</strong></th>
                        <th><strong>Tier</strong></th>
                        <th><strong>Wrewards Earned</strong></th>
                        <th><strong>Instant Savings</strong></th>
                        <th><span className="openArrow">&nbsp;</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionData.tierDetails[0].recent.wClubMonthlyDetails && tableRows(transactionData.tierDetails[0].recent.wClubMonthlyDetails)}
                      <tr>
                        <td><strong>For the year to date:</strong></td>
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
        </div>,
        <div className="grid grid--space-y">
          <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="first-open" data-accordion-type="open-single" data-accordion-active="true">
            <div className="accordion__segment accordion__segment--chrome" data-js="accordion-segment">
            <div className="accordion__toggle accordion__toggle--chrome heading heading--4" data-js="accordion-toggle">Current Loyalty Period: &nbsp;<span>{transactionData.tierDetails[1].previous.wClubMonthlyDetails[0].financialMonthAndYear} to {transactionData.tierDetails[1].previous.wClubMonthlyDetails[transactionData.tierDetails[1].previous.wClubMonthlyDetails.length - 1].financialMonthAndYear}</span> </div>
            <div className="accordion__content accordion__content--chrome" data-js="accordion-content">
              <div className="table-scroll table-scroll--x">
                <table cellSpacing="0" cellPadding="0" border="0" className="table table--border-rows table-scroll__table">
                  <thead>
                    <tr>
                      <th className=""><strong>Loyalty Period</strong></th>
                      <th><strong>Monthly Spend</strong></th>
                      <th className="">&nbsp;</th>
                      <th><strong className="">Wrewards Green Earned</strong></th>
                      <th>&nbsp;</th>
                      <th><strong>Monthly Tier Value</strong></th>
                      <th><strong>Year To Date Tier Value</strong></th>
                      <th><strong>Tier</strong></th>
                      <th><strong>Wrewards Earned</strong></th>
                      <th><strong>Instant Savings</strong></th>
                      <th><span className="openArrow">&nbsp;</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.tierDetails[1].previous.wClubMonthlyDetails && tableRows(transactionData.tierDetails[1].previous.wClubMonthlyDetails)}
                    <tr>
                      <td><strong>For the year to date:</strong></td>
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
        </div>
      ];
    };
    return (
      <div className="main-page">
        <nav className="breadcrumb empty" />
        <div className="grid  ">
          {this.props.route.pageType !== 'myAccount' ? <div className="page-layout__aside"><SideMenu pageType={this.props.route.pageCode} /></div> : null}
          <div className="page-layout__content">
            <div className="grid grid--space-y">
              <h1 className="heading heading--1 font-graphic text-caps">My current tier: <span data-hj-masked=""> {transactionData.tierValue} </span></h1>
              <p className="text-intro">Your spend updates are refreshed on the 12th day after each specified month end date.<br />Your WRewards tier status is updated at the end of each month.</p>
              {transactionData.tierDetails ? content(transactionData) : 'Service is currently off-line.'}
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const dashboardTierData = _.get(this.props, 'dashboardTierStatus', {});
    console.log('DDDD', dashboardTierData);
    return (
      <main className="grid grid--space-y site-main">
        {dashboardTierData.tierDetails && this.primaryComponent(dashboardTierData)}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dashboardTierStatus: state.wrewardsReducer.dashboardTierStatusReducer.dashboardTierData
  };
};


export default connect(mapStateToProps, { getDashbordTierStatus })(DashboardTierStatus);
