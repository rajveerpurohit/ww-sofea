import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ServiceUtil from '../../services/serviceUtil';
import SubmitIncomeExpensesForm from '../../components/basic/apply-now-online/SubmitIncomeExpensesForm';

class IncomeExpenses extends Component {
  render() {
    // Personal Info page Data
    return (
      <div className="grid-wrapper">
        <main className="grid grid--space-y site-main">
          <div className="grid grid--space-y wfs-app">
            <div className="heading-group text-align-center">
              <h1 className="heading-group__title text-caps text-largest font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-online-application-label')}</h1>
              <p className="heading-group__subtitle text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-less-than-minutes-label')}</p>
            </div>
            <ul className="nav-list-x progress">
              <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-apply-label')}</span></li>
              <li className="progress__step progress__step--complete"><span className="icon icon--wfs-app-step-complete" /><span className="progress__label text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-personal-info-label')}</span></li>
              <li className="progress__step progress__step--current"><span className="icon icon--wfs-app-step-current" /><span className="progress__label text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-income-expenses-label')}</span></li>
              <li className="progress__step"><span className="icon icon--wfs-app-step" /><span className="progress__label text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-results-label')}</span></li>
            </ul>
            <h4 className="text-align-center font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-please-enter-your-details-below-to-continue-label')}</h4>
            <hr className="wfs-app__divider" />
            <SubmitIncomeExpensesForm labels={this.props.labels} />
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    labels: _.get(state, 'labels.labelsAndErrorMessages.WFS', {}),
  };
};
export default connect(mapStateToProps)(IncomeExpenses);
