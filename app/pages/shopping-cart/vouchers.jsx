import React, { Component } from 'react';
import _ from 'lodash';

class Vouchers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: this.props.appliedVouchersError || []
    };
    this.applyVoucher = this.applyVoucher.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.appliedVouchersError });
  }
  revokeInvalidVoucher = (voucher) => {
    const { errors } = this.state;
    if (document && document !== undefined) {
      document.querySelector(`#chk_lbl_${voucher.barcode}`).classList.remove('is-checked');
    }
    errors.map((err) => {
      if (err.barcode === voucher.barcode) {
        this.setState({ errors: [] });
        return null;
      }
    });
  }
  applyVoucher(evt, voucher) {
    const { voucherTypeId, barcode } = voucher;
    const { errors } = this.state;
    let invalidVoucher = false;
    errors.map((error) => {
      if (error.barcode === barcode) {
        invalidVoucher = true;
        return null;
      }
    });
    const data = {
      couponClaimCode: String(voucherTypeId),
      barcode
    };

    if (evt.target.checked && invalidVoucher === false) {
      if (document && document !== undefined) {
        _.map(document.querySelectorAll('.is-invalid'), (invalidNode) => {
          invalidNode.classList.remove('is-checked', 'is-invalid');
        });
      }
      this.props.applyVoucher(data);
    } else if (invalidVoucher) {
      this.revokeInvalidVoucher(data);
      invalidVoucher = false;
    } else {
      this.props.revokeVoucher(data);
    }
  }
  renderErrors(barcode) {
    const { errors } = this.state;
    return errors.map((error) => {
      if (error.barcode === barcode) {
        if (document && document !== undefined) {
          document.querySelector(`#chk_lbl_${error.barcode}`).classList.add('is-checked', 'is-invalid');
        }
        return error.formexceptions.map(err => (
          <div className={`formErrors_${barcode}`} style={{ color: 'red', fontSize: 10 }}>
            {err.message}
          </div>
        ));
      }
      return null;
    });
  }

  render() {
    const { vouchers } = this.props;
    return (
      <span>
        {
          _.map(vouchers, voucher => (
            <div className="customCheckboxes" id={`uniform-chk_${voucher.barcode}`}>
              <CheckboxInput applyVoucher={this.applyVoucher} voucher={voucher} />
              {this.renderErrors(voucher.barcode)}
            </div>
          ))
        }
      </span>
    );
  }
}
const CheckboxInput = (props) => {
  const { voucher, applyVoucher } = props;
  const labelCheckedClass = voucher.voucherApplied ? 'is-checked' : '';

  return (
    <p>
      <input
        type="checkbox"
        className="customCheck enhanced-checkbox is-enhanced"
        id={`chk_${voucher.barcode}`}
        name="vouchers"
        defaultValue={voucher.barcode}
        checked={voucher.voucherApplied}
        onChange={evt => applyVoucher(evt, voucher)}
      />
      <label
        htmlFor={`chk_${voucher.barcode}`}
        id={`chk_lbl_${voucher.barcode}`}
        className={`label-checkbox ${labelCheckedClass}`}
      >{voucher.description}</label>
    </p>
  );
};
export default Vouchers;
