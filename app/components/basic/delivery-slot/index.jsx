import React, { Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import _ from 'lodash';

import { connect } from 'react-redux';
import DeleverySlotModel from '../delivery-slot-modal';
import ServiceUtil from '../../../services/serviceUtil';
import { setReservedTime } from '../../compound/deliveryDetails/actions';

class DeliverySlotTo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flyOut: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.extendTimeout = null;
  }

  componentWillReceiveProps(nextProps) {
    // const reservedSlots = _.get(nextProps, 'deliveryDetails.deliverySlotSession.reservedDeliverySlots', []);
    // if (Array.isArray(reservedSlots) && reservedSlots.length > 0 && !this.extendTimeout) {
    //   const timeOutTime = 5;
    //   this.extendTimeout = window.setTimeout(() => {
    //     this.props.extendDeliverySlot(true);
    //     this.extendTimeout = null;
    //   }, timeOutTime * 60 * 1000);
    // }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') window.clearTimeout(this.extendTimeout);
  }

  activateModal(isSlotReserved = false) {
    if (isSlotReserved) {
      this.setState({ flyOut: true });
    } else {
      this.setState({ flyOut: false });
      this.props.loader(true);
      this.props.getUserAddresses(this.props.deliveryDetails)
        .then(() => {
          this.props.loader(false);
          this.props.modal(true);
        });
    }
  }

  handleMouseLeave(event) {
    if (event) event.preventDefault();

    if (this.state.flyOut) {
      setTimeout(() => this.setState({ flyOut: false }), 3000);
    }
  }

  deactivateModal() {
    this.props.modal(false);
  }

  renderDeleveryModel() {
    if (this.props.common.modal) {
      return <DeleverySlotModel modalActive deactivateModal={this.deactivateModal} {...this.props} />;
    }

    return null;
  }

  render() {
    const reservedSlots = _.get(this.props, 'deliveryDetails.deliverySlotSession.reservedDeliverySlots', []);
    const isSlotReserved = reservedSlots.length;

    const liclass = cx('nav-list-x__item main-header-nav__item main-header-nav__item--foot-mobi main-header-nav__item-delivery', {
      'fly-out': isSlotReserved,
      'is-open': isSlotReserved && this.state.flyOut,
    });

    return (
      <li className={liclass} onMouseLeave={this.handleMouseLeave}>
        <span className="text-xsmall main-header-nav__label">{!isSlotReserved ? ServiceUtil.getLabel(this.props.logoLabel, 'global-header-reserve-label') : 'Delivery'}</span>
        <Link onClick={() => this.activateModal(isSlotReserved)} className="nav-list-x__link link--silent" >
          <strong className="font-graphic text-small main-header-nav__title">{!isSlotReserved ? 'Delivery Slot' : 'Reserved'}&nbsp;&nbsp;
            <span className="icon icon--down-circ-darkest" />
          </strong>
        </Link>
        {isSlotReserved === 1 && (
          <ul className="nav-list fly-out__content main-header-nav__profile-nav main-header-nav__delivery-nav">
            <li className="nav-list__item"><p>Delivery date: <strong id="deliveryDate" className="font-graphic">{reservedSlots[0].description}</strong></p></li>
            <li className="nav-list__item"><p>Delivery time: <strong className="font-graphic">{reservedSlots[0].hourFrom} - {reservedSlots[0].hourTo}</strong></p></li>
            <li className="nav-list__item" id="expirationTime_1">
              <p>Reserved time slot expires in: <strong className="font-graphic">{reservedSlots[0].reservationExpiration} mins</strong></p>
            </li>
            <hr />
            <li className="nav-list__item">
              <Link id="reserveDeliveryLink" className=" link--silent" onClick={() => { this.activateModal(false); }}>
                <span className="icon-text">Edit</span><span className="icon icon--right-circ-dark" />
              </Link>
            </li>
          </ul>
        )}
        {isSlotReserved === 2 && (
          <ul className="nav-list fly-out__content main-header-nav__profile-nav main-header-nav__delivery-nav">
            <li className="nav-list__item"><p className="intro"><strong>Food</strong></p>
            </li>
            <li className="nav-list__item"><p>Delivery date: <strong id="deliveryDate" className="font-graphic">{reservedSlots[0].description}</strong></p></li>
            <li className="nav-list__item"><p>Delivery time: <strong className="font-graphic">{reservedSlots[0].hourFrom} - {reservedSlots[0].hourTo}</strong></p></li>
            <li className="nav-list__item" id="expirationTime_">
              <p>Reserved time slot expires in: <strong className="font-graphic">{reservedSlots[0].reservationExpiration} mins</strong></p></li>
            <hr />
            <li>
              <p className="intro"><strong>Other</strong></p>
            </li>
            <li>
              <p>Delivery date: <strong id="deliveryDate" className="font-graphic">{reservedSlots[1].description}</strong></p>
            </li>
            <li><p>Delivery time: <strong className="font-graphic">{reservedSlots[1].hourFrom} - {reservedSlots[1].hourTo}</strong></p></li>
            <li id="expirationTime_">
              <p>Reserved time slot expires in: <strong className="font-graphic">{reservedSlots[1].reservationExpiration} mins</strong></p>
            </li>
            <hr />
            <li className="nav-list__item">
              <Link id="reserveDeliveryLink" className=" link--silent" onClick={() => { this.activateModal(false); }}>
                <span className="icon-text">Edit</span><span className="icon icon--right-circ-dark" />
              </Link>
            </li>
          </ul>
        )}
        {this.renderDeleveryModel()}
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { setReservedTime })(DeliverySlotTo);