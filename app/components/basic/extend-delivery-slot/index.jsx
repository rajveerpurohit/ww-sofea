import React, { Component } from 'react';
import AriaModal from 'react-aria-modal';
import { Link } from 'react-router';

export default class ExtendDeliverySlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: true
    }
    this.extendSlot = this.extendSlot.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(e) {
    e.preventDefault();
    return this.props.extendDeliverySlot(false);
  }

  extendSlot(e, shouldExtend = 0) {
    e.preventDefault();
    const req = {
      action: "cancel"
    };
    if (shouldExtend === 1) req.action = "extend";
    return this.props.extendDeliverySlotApi(req)
      .then((res) => {
        return this.props.deliverySlotSession();
      })
      .then((res) => {
        return this.props.extendDeliverySlot(false);
      })
      .catch((error) => {
        return this.props.extendDeliverySlot(false);
      });
  }

  render() {
    if (this.props.deliveryDetails.extendDeliverySlot === 0)
      return (<AriaModal titleText="extendSlots" >
        <div className="modal__box modal__box--panel modal__box--size-w-large" style={{ marginBottom: "184px", top: "184px", width: "100%" }}>
          <Link className="icon icon--close-circ-dark modal__close" onClick={this.closeModal}>close</Link>
          <div className="modal__content">
            <section className="suburbSelectedTimeSlot">
              <section>
                <h2>Your delivery time slot</h2>
                <hr />
              </section>
              <section>
                <div id="timePara">Your reserved time slot is about to expire as you have not checked out within 60 minutes of reserving it.</div>
                <hr />
              </section>
              <section>
                <p>
                  <strong>Reserve your slot for an additional 60 minutes if you're still shopping.</strong></p>
                <Link onClick={(e) => this.extendSlot(e, 1)} id="extendReservedDeliveryLink" className="button primaryButton">Extend reserved time slot</Link>
                <p>
                  <strong><Link to="#" id="cancelReservedDeliveryLink" className="" onClick={(e) => this.extendSlot(e, 0)}>Cancel time slot</Link></strong>
                </p>
              </section>
            </section>
          </div>
        </div>
      </AriaModal>);
    return (<span />);
  }
}
