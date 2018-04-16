import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ServiceUtil from '../../services/serviceUtil';
import SubmitApplyForm from '../../components/basic/apply-now-online/SubmitApplyForm';

class ApplyNow extends Component {
  render() {
    return (
      <div className="grid-wrapper">
        <main className="grid grid--space-y site-main">
          <div className="grid grid--space-y wfs-app">
            <div className="heading-group text-align-center">
              <h1 className="heading-group__title text-caps text-largest font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-online-application-label')}</h1>
              <p className="heading-group__subtitle text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-less-than-minutes-label')}</p>
            </div>
            <ul className="nav-list-x progress">
              <li className="progress__step progress__step--current"><span className="icon icon--wfs-app-step-current" /><span className="progress__label text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-apply-label')}</span></li>
              <li className="progress__step"><span className="icon icon--wfs-app-step" /><span className="progress__label text-medium"> {ServiceUtil.getLabel(this.props.labels, 'global-wfs-personal-info-label')}</span></li>
              <li className="progress__step"><span className="icon icon--wfs-app-step" /><span className="progress__label text-medium"> {ServiceUtil.getLabel(this.props.labels, 'global-wfs-income-expenses-label')}</span></li>
              <li className="progress__step"><span className="icon icon--wfs-app-step" /><span className="progress__label text-medium">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-results-label')}</span></li>
            </ul>
            <h4 className="text-align-center font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-please-note-you-must-label')}</h4>
            <ul className="wfs-app__requirements text-medium">
              <li className="wfs-app__requirement">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-be-at-least-years-old-label')}</li>
              <li className="wfs-app__requirement">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-have-a-valid-south-african-id-label')}</li>
              <li className="wfs-app__requirement">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-earn-at-least-label')}</li>
              <li className="wfs-app__requirement">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-have-a-bank-account-label')}</li>
              <li className="wfs-app__requirement">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-sa-physical-address-label')}</li>
              <li className="wfs-app__requirement">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-sa-telephone-number-label')}</li>
            </ul>
            <SubmitApplyForm labels={this.props.labels} />
          </div></main></div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    labels: _.get(state, 'labels.labelsAndErrorMessages.WFS', {}),
  };
};
export default connect(mapStateToProps)(ApplyNow);
