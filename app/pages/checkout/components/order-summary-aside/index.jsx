import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import AriaModal from 'react-aria-modal';
import OtpModel from '../../../../pages/otp/otpModel';
import ServiceUtil from '../../../../services/serviceUtil';
import ProductPrice from '../../../../components/basic/product-price';

export class OrderSummaryAside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false
    };
    this.renderModal = this.renderModal.bind(this);
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
  renderModal() {
    const user = _.get(this.props, 'user.isLoggedIn', '');
    if (user) {
      return <OtpModel pagetype="cart" deactivateModal={this.deactivateModal} />;
    }
    return (<AriaModal
        titleText="otpfancybox"
        className="fancybox-wrap fancybox-desktop fancybox-type-ajax"
        initialFocus="#otpfancybox"
        verticallyCenter
        onExit={this.deactivateModal}
    > <div className="modal__box modal__box--panel modal__box--size-w-large" tabIndex="-1">
      <Link className="icon icon--close-circ-dark modal__close" onClick={this.deactivateModal}>close
          </Link>
      <div className="modal__content">
        <div id="otpfancybox" className="modal-target is-open">
          <section className="checkout-fancybox">
            <h2>Why Get <strong>W</strong>Rewards?</h2>
            <hr />
            <p className="intro">Every day you'll <strong>save 10% instantly on over 1000 items</strong> throughout the store - from food and fashion, to homeware and beauty.<br />Pay with a Woolies Store or Credit Card and <strong>save an extra 5%</strong>.</p>
            <p><Link to="/registration">Register</Link> now to create your profile or <Link to="/login">login</Link> to your account.</p>
          </section>
        </div>
      </div>
    </div>
    </AriaModal>);
  }
  render() {
    const labels = this.props.labels;
    const miniCartData = this.props.miniCartData.orderSummary;
    const user = _.get(this.props, 'user.isLoggedIn', '');
    const synchronizeStatus = _.get(this.props, 'currentUser.synchronizeStatus', '');
    return (
      <aside>
        <div id="basket-summary-widget">
          <section>
            <h3>{ServiceUtil.getLabel(labels, 'global-minicartpopup-total-label')}</h3>
            <table cellSpacing={0} cellPadding={0} border={0} width="0%">
              <tbody>
                <tr>
                  <td>{miniCartData.totalItemsCount} {ServiceUtil.getLabel(labels, 'global-minicartpopup-items-label')}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>{ServiceUtil.getLabel(labels, 'global-minicartpopup-total-basket-label')}</td>
                  <td>
                    <ProductPrice price={miniCartData.basketTotal} />
                  </td>
                </tr>
                <tr>
                  <td>{ServiceUtil.getLabel(labels, 'global-minicartpopup-est-delivery-label')}</td>
                  {this.props.activeStep === 'deliverySlot' ? (<td>TBC</td>) : ''}
                  {this.props.activeStep !== 'deliverySlot' ? (<td>{miniCartData.estimateDelivery === 0 ? 'FREE' : miniCartData.estimateDelivery}</td>) : ''}
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>{ServiceUtil.getLabel(labels, 'global-minicartpopup-total-label')}</td>
                  <td>
                    <ProductPrice price={miniCartData.total} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>
        </div>
        <span className="estimatedDiscount hidden">10%</span>
        {/* <section className="wrewards">
          <h3 className="margB">Join <strong className="wrewards">W</strong>Rewards now for instant savings on over 1000 items every day.</h3>
          <p>
            <strong>Already a member?</strong>
            <br />
            <Link rel="fancybox" className="hide-on-mobi">Add your card to your profile</Link>
            <Link className="show-on-mobi">Add your card to your profile</Link>
          </p>
        </section> */}
        { user && !synchronizeStatus ? <section className="wrewards">
          <h3 className="margB">Join <strong className="wrewards">W</strong>Rewards now for instant savings on over 1000 items every day.</h3>
          <p>
            <strong>Already a member?</strong>
            <br />
            <Link rel="fancybox" className="hide-on-mobi" onClick={this.activateModal}>Add your card to your profile</Link>
            <Link className="show-on-mobi">Add your card to your profile</Link>
          </p>
        </section> : ''}
        { user && synchronizeStatus ? <section className="wrewards">
          <h3>WRewards members get instant savings on selected items.</h3>
          <h3>Pay with your Woolies Store or Credit Card and get an extra 5% off.</h3>
        </section> : ''}
        { !user ? <section className="wrewards">
          <h3 className="margB">Join <strong className="wrewards">W</strong>Rewards now for instant savings on over 1000 items every day.</h3>
          <Link rel="fancybox" className="hide-on-mobi" onClick={this.activateModal}>More info</Link>
        </section> : ''}
        <div className="hide-on-mobi">
          <section>
            <p> {ServiceUtil.getLabel(labels, 'global-minicartpopup-price-and-delivery-cost-label')}</p>
            <p>
              <strong>{ServiceUtil.getLabel(labels, 'global-minicartpopup-is-it-a-gift-label')}</strong>
              <br />
              {ServiceUtil.getLabel(labels, 'global-minicartpopup-able-to-choose-gift-label')}
            </p>
          </section>
        </div>
        {
          this.state.modalActive ? this.renderModal() : ''
        }
      </aside>
    );
  }
}

export default OrderSummaryAside;
