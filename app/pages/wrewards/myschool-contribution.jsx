import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { schoolContributions } from './actions';
// import Content from './content';
// import SideMenu from '../../components/sections/SideMenu';
import ServiceUtil from '../../services/serviceUtil';

class MySchoolContribution extends Component {
  static need = [schoolContributions];
  constructor(props) {
    super(props);
    this.createContributedSections = this.createContributedSections.bind(this);
    this.nonContributedSection = this.nonContributedSection.bind(this);
    this.contriTableData = this.contriTableData.bind(this);
  }
  componentDidMount() {
    // this.props.schoolContributions();
  }
  contriTableData(contribution) {
    return contribution.map((contri, item) => {
        return (
          <tr>
              <td><p>{contri.key}</p></td>
              <td><p>{'R' + contri.element} </p></td>
            </tr>
        );
      });
  }
  createContributedSections(getSchoolContriData) {
    const contribution = getSchoolContriData.contribution;
    const dispplayDate = getSchoolContriData.displayDate;
    return (
      <div>
        <section className="creditCards">
          <p className="intro">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-support-text')}
	      </p>
        </section>
        <section className="contentBlock spacerTop">
          <div id="february2012" className="balanceDetail">
            <h3>{dispplayDate}</h3>
            <table cellSpacing="0" cellPadding="0" border="0" width="100%" className="transactionTable detailsTable statusTable inactiveTable">
              <thead>
                <tr>
                  <th><p>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-beneficiary-label')}</p></th>
                  <th><p>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-amt-raised-label')}</p></th>
                </tr>
              </thead>
              <tbody>
                {
                   this.contriTableData(contribution)
                }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
  nonContributedSection() {
    return (<div>
      <section className="contentBlock">
        <p className="intro">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-myschool-descr-text')}</p>
      </section>
      <section>
        <p>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-myschool-card-descr-text')}</p>
      </section>
      <section className="contentBlock">
        <p><Link to="/fragments/wrewards/wrewards-index.jsp?content=my-school" className="btn btn--primary btn--right">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-find-more')}</Link></p>

      </section>
    </div>);
  }
  render() {
    const getSchoolContriData = _.get(this.props, 'schoolContriData', []);
    return (
      <div className="page-layout__content">
        <section className="contentBlock">
          <h1 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-my-school-header')}</h1>
          <p>
            <img width="111" height="68" src="https://www.woolworths.co.za/images/dashboard/ww_cards_8.jpg" />
          </p>
        </section>
        { getSchoolContriData.servicestatus == 'online' && getSchoolContriData.contribution != null
            ? this.createContributedSections(getSchoolContriData) : null
        }
        { getSchoolContriData.servicestatus == 'online' && getSchoolContriData.supporterValid == false
            ? this.nonContributedSection() : null
        }
        <div className="leftCol">
          <h2>{ServiceUtil.getLabel(this.props.labels, 'global-wrs-service-offline')} </h2>
          <p className="intro">{ServiceUtil.getLabel(this.props.labels, 'global-wrs-restore-text')}</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    schoolContriData: state.wrewardsReducer.schoolContributionReducer.schoolData,
    labels: _.get(state, 'labels.labelsAndErrorMessages.wRewards', {}),
  };
};


export default connect(mapStateToProps, { schoolContributions })(MySchoolContribution);
