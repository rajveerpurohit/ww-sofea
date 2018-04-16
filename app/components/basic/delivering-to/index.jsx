import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'lodash';

import DeleveryModel from '../delevery-model';
import ServiceUtil from '../../../services/serviceUtil';

class DeliveryTo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
  }

  activateModal() {
    this.setState({ modalActive: true });
  }

  deactivateModal() {
    this.setState({
      modalActive: false
    });
  }

  renderDeleveryModel() {
    if (this.state.modalActive && this.props.DeliverAreaData) {
      return (
        <DeleveryModel
          modalActive
          deactivateModal={this.deactivateModal}
          provienceData={this.props.DeliverAreaData}
          deliveryDetails={this.props.deliveryDetails}
        />
      );
    }
    return null;
  }

  render() {
    const deliveryLocation = this.props.deliveryDetails.deliveryLocation;
    return (
      <li className="nav-list-x__item main-header-nav__item main-header-nav__item--foot-mobi main-header-nav__item-address">
        <span className="text-xsmall main-header-nav__label">{deliveryLocation.suburbName ? ServiceUtil.getLabel(this.props.labels, 'global-header-delivering-to-label') : 'Select' }</span>
        <Link onClick={this.activateModal} className="nav-list-x__link link--silent aria-modal-link">
          <strong className="font-graphic text-small main-header-nav__title">
            {deliveryLocation.suburbName ? deliveryLocation.suburbName : 'Delivery Area' } &nbsp;
            <span className="icon icon--down-circ-darkest test" />
          </strong>
        </Link>
        {this.renderDeleveryModel()}
      </li>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    DeliverAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', []),
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(DeliveryTo);
