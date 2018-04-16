import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import ServiceUtil from '../../../services/serviceUtil';

class WfsSwitchEstatementsThanks extends Component {
 
  render() {
    const updateStatement = _.get(this.props, 'updateStatement', []);
    return (
      <div className="page-layout__content">
        <div className="grid seperator">
          <h1 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-great')}</h1>
          <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-estat-submitted')}</p>
        </div>
        <hr className="hr--light" />
        <div className="grid">
          <h2 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-on-acc')}</h2>
          <p> {updateStatement.storeCardStatus ? 'Store Card' : ''} <br /> </p>
          <p> {updateStatement.personalLoanStatus ? 'Store Card' : ''} <br /> </p>
          <h3 className="text-caps font-graphic">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-on-email')}</h3>
          <div className="grid">
            {updateStatement.emailID} <Link className="arrow-link--forward link--silent text-small" to="/dashboard/wfs/switch-estatements">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-update-add')}</Link>
          </div>
          <p className="text-intro">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-please')} <Link to="/contactus">{ServiceUtil.getLabel(this.props.labels, 'global-wfs-contact-ss')}</Link> {ServiceUtil.getLabel(this.props.labels, 'global-wfs-any-ques')}</p>
        </div>
      </div>);
  }
}
const mapStateToProps = (state) => {
  return {
    updateStatement: state.financialServicesReducer.updateStatement,
    labels: _.get(state, 'labels.labelsAndErrorMessages.WFS', {}),
  };
};

export default connect(mapStateToProps, { })(WfsSwitchEstatementsThanks);
