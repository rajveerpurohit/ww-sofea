import React, { Component } from 'react';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';

export default class DeliverySlotUpdateModal extends Component {
  constructor(props) {
    super(props);

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
  }

  activateModal() {
    this.props.activateModal();
  }

  deactivateModal() {
    this.props.deactivateModal();
  }

  render() {
    const { description, hourFrom, hourTo } = this.props;

    const modalProps = {
      titleText: 'DeliverySlotUpdateModal',
      verticallyCenter: true,
      focusdialog: true,
      onExit: this.deactivateModal
    };

    return (
      <AriaModal {...modalProps} >
        <div className="modal__box modal__box--panel modal__box--size-w-medium delivery-slot-update-modal">
          <Link className="icon icon--close-circ-dark modal__close" onClick={this.deactivateModal}>
            Close
          </Link>
          <div className="modal__content">
            <div className="suburbSelectedTimeSlot grid text-small">
              <h2>Your reserved time slot</h2>
              <hr className="hr--light" />
              <div className="intro">Your reserved time slot is :
                <strong id="deliveryDate">{description}</strong>
                <strong>, {hourFrom} - {hourTo}*</strong>
              </div>
              <div className="intro">Please note: you have added an item* to your basket that cannot be delivered within your reserved time slot. Please choose
                one of the options below to reserve a later timeslot for joint delivery or reserve an additional timeslot for split delivery.
              </div>
              <p>*Clothing, home and beauty items have a longer delivery lead-time than foods.</p>
              <hr className="hr--light" />
              <div className="intro">Would you like to:</div>
              <p>
                <strong>1. Reserve a later time slot so everything in my basket arrives together.</strong>
              </p>
              <Link onClick={this.props.handleEdit} className="btn btn--primary btn--right dee">
                Edit time slot
              </Link>
              <br />
              <hr className="hr--light" />
              <p>
                <strong>2. Reserve an additional time slot so that this item(s) is delivered at a later stage.</strong>
              </p>
              <Link onClick={this.props.handleAddNewSlot} className="btn btn--primary btn--right">
                Reserve another time slot
              </Link>
              <br />
              <hr className="hr--light" />
              <p>
                <strong>3. Cancel your delivery time slot and select another delivery option when you checkout.</strong>
              </p>
              <Link
                onClick={this.props.handleCancelSlot}
                id="cancelReservedDeliveryLink"
                className="btn btn--primary btn--right"
              >Cancel time slot & continue shopping</Link>
              <br />
            </div>
          </div>
        </div>
      </AriaModal>
    );
  }
}
