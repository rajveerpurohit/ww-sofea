import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import commonUtil from '../../../../../app/services/commonUtil';

class PaymentPortal extends Component {
  componentDidMount() {
    this.frmLaunchNode.submit();
  }

  render() {
    const { threedsIframe, threedsPareq, threedsAccessUrl, termUrl, threedsTransactionId } = this.props.orderConfirmation;
    const jsessionId = commonUtil.readCookie('TOKEN');

    return (
      <article className="mainColCheckout">
        <h2>PAYMENT DETAILS - 3D SECURE VERIFICATION</h2>
        <form name="frmLaunch" id="frmLaunch" ref={n => (this.frmLaunchNode = n)} target={threedsIframe} method="POST" action={threedsAccessUrl}>
          <input type="hidden" name="PaReq" value={threedsPareq} />
          <input type="hidden" name="TermUrl" value={termUrl} />
          <input type="hidden" name="MD" value={jsessionId} />
        </form>
        <p>Credit card payments are now with 3D Secure. <Link rel="fancybox" to="/checkout/what-is-3d-secure" >What's 3D Secure?</Link></p>
        <section className="threeDSecureIframe">
          <iframe id={threedsIframe} name={threedsIframe} src="" scrolling="no" width="500" height="500" />
        </section>
        <br />
        <p className="floatL noMargT">
          <Link iclass="moreLink prevLink" page="/fragments/checkout/checkout-index.jsp?content=payment">Go back</Link>
        </p>
      </article>
    );
  }
}

const mapStateToProps = state => ({
  payAndCheckout: state.checkout.payAndCheckout,
  orderConfirmation: state.checkout.orderConfirmation
});

export default connect(mapStateToProps)(PaymentPortal);
