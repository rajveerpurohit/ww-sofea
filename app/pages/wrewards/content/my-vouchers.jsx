import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import AriaModal from 'react-aria-modal';
import { getVouchers } from '../actions';
import { modal } from '../../../actions/common';

class MyVouchers extends Component {

  constructor(props) {
    super(props);
    this.onVoucherClick = this.onVoucherClick.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.state = {
      showModal: false,
      voucherId: 0
    };
  }

  componentDidMount() {
    this.props.getVouchers();
  }

  onVoucherClick(voucherId = 0) {
    return (e) => {
      e.preventDefault();
      this.setState({
        showModal: true,
        voucherId
      });
    };
  }

  deactivateModal(e) {
    e.preventDefault();
    this.setState({
      showModal: false
    });
  }

  static getVoucherCards(vouchers = []) {
    if (vouchers.length === 0) return (<div />);
    const totalCards = vouchers.length > 3 ? 3 : vouchers.length;
    const cardArray = [];
    for (let i = 0; i < totalCards; i++) {
      const voucher = vouchers[i];
      const content = (
        <div className="grid__third--medium panel panel--padded">
          <div id="description">
            <p className="ellipsis text-small swatch-nav">
              <strong>{voucher.description}</strong>
              <span className="swatch-toggle" data-height="6" />
            </p>
          </div>
          <div>
            <p className="text-small">
              <strong>Valid:&nbsp;</strong>{ voucher.validFrom }<br /><strong>To:&nbsp;</strong>{ voucher.validTo }
            </p>
          </div>
        </div>
      );
      cardArray.push(content);
    }
    const res = (
      <div className="flex-parent grid grid--space-y">
        {cardArray}
      </div>
    );
    return res;
  }

  getVoucherTable(vouchers = []) {
    if (vouchers.length === 0) return (<div />);
    const tableArr = [];
    for (let i = 0; i < vouchers.length; i++) {
      const voucher = vouchers[i];
      const content = (
        <tr>
          <td>
            <p>{voucher.description}</p>
            <p>{ (voucher.status === 'Active') ? (<Link onClick={this.onVoucherClick(i)} >{voucher.barcode}</Link>) : voucher.barcode}</p>
          </td>
          <td>
            <p>{ voucher.status }</p>
          </td>
          <td>
            <p>{voucher.validTo}</p>
					</td>
          <td>
            <p>{ voucher.details }</p>
          </td>
        </tr>
      );
      tableArr.push(content);
    }
    return (
      <table cellSpacing="0" cellPadding="0" border="0" className="table table--border-rows table-scroll__table">
        <thead className="font-graphic--light text-caps">
          <tr>
            <th width="50%">Voucher</th>
            <th width="10%">Status</th>
            <th width="10%">Expires</th>
            <th width="10%">Amount / % Off</th>
          </tr>
        </thead>
        <tbody>
          { tableArr }
        </tbody>
      </table>
    );
  }

  showVoucher() {
    const voucherId = this.state.voucherId;
    const voucher = this.props.vouchers[voucherId];
    const customer = this.props.customerDetails;

    return (
      <AriaModal titleText="voucherModal" dialogStyle={{ display: 'block', textAlign: 'center' }} onExit={this.deactivateModal}>
        <div className="modal__box modal__box--panel modal__box--size-w-large" style={{ marginBottom: '184px', top: '184px', width: '100%' }}>
          <Link to="" className="icon icon--close-circ-dark modal__close" onClick={this.deactivateModal} >close</Link>
          <article className="grid">
            <div id="Voucher-Overlay-Section" className="grid pos--rel">
            <div className="grid">
              <div className="grid__three-fourths">
                  <img className="img-fill-responsive" alt="voucher image" src={voucher.printVoucherImage} />
              </div>
              <div className="grid__fourth">
                <div className="barcodeImg" >
                  <img src={voucher.printBarcodeImage} width="65" height="200" />
                </div>
              </div>
            </div>
            { voucher.voucherTypeId === 68 && (
              <section>
                <div className="voucherType68">
                  <div>Customer Name : {customer.firstName}</div>
                  <div>Account Number : </div>
                  <div>Expiry Date : {voucher.validTo}</div>
                </div>

                <div className="title">WVOUCHER<br /><span>HAPPY SHOPPING</span></div>
                <div className="price">{voucher.details}</div>
              </section>
            )}
            {
              voucher.voucherTypeId !== 68 && (
                <div className="voucherTypeNot68 grid--space-y">
                  <div className="text-small">VALID FROM {voucher.validFrom} TO ${voucher.validTo}</div>
                </div>
              )
            }
            </div>
            <p className="text-small">
              To receive this voucher, select an email address and click the "Email Voucher" button.<br /> If the email is incorrect or missing, it must be updated by the Woolworths Call Centre 0861 50 20 50. <br />To print this voucher click the "Print Voucher" button.
            </p>
            <div className="grid">
              <div>{ customer.email }</div>
            </div>
            <div className="grid--space-y">
              <Link className="btn btn--primary">Email Voucher</Link>
              <Link className="btn btn--primary">Print Voucher</Link>
              <Link className="btn btn--primary">Terms & Conditions</Link>
            </div>
          </article>
        </div>
      </AriaModal>
    );
  }

  render() {
    return (<div className="page-layout__content">
      <section className="grid">
        <h1 className="text-caps font-graphic">YOUR CURRENT VOUCHERS</h1>
        <p className="text-intro font-graphic--light">Just click on the voucher number to view, email or print your voucher.</p>
        { MyVouchers.getVoucherCards(this.props.vouchers) }
        <h4 className="font-graphic text-caps">All Vouchers</h4>
        <section className="table-scroll table-scroll--x">
          { this.getVoucherTable(this.props.vouchers) }
        </section>
        <section>
	        	<div className="grid">
              <a href="/help/faqs" className="btn btn--primary btn--right grid--space-y" target="_blank" rel="noopener noreferrer">View WRewards T&amp;Cs</a>
              <span>&nbsp;</span>	
              <a href="/help/faqs" className="btn btn--primary btn--right grid--space-y" target="_blank" rel="noopener noreferrer">View WVouchers T&amp;Cs</a>
          </div> 
        </section>
      </section>
      {
        this.state.showModal &&
        this.showVoucher()
      }
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    vouchers: state.wrewardsReducer.vouchers,
    customerDetails: state.clp.currentUser
  };
};

export default connect(mapStateToProps, { getVouchers })(MyVouchers);
