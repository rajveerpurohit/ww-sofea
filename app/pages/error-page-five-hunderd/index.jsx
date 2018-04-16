import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ErrorPageFiveHunderd extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  primeComponent() {
    return (
      <div>
        <section className="contentBlock seperator">
          <h1 className="errorUnavailHeader">Woolworths Online is temporarily unavailable.<span>We'll be back shortly.</span></h1>
        </section>
        <section className="contentBlock errorCol">
          <article className="leftCol">
            <p className="intro">In the meantime, you can visit us on.</p>
            <ul className="errorSocial">
              <li><Link className="shareFacebook" href="http://www.facebook.com/WoolworthsSA" target="_blank">www.facebook.com/WoolworthsSA</Link></li>
              <li><Link className="shareTwitter" href="http://twitter.com/woolworths_SA" target="_blank">twitter.com/woolworths_SA</Link></li>
              <li><Link className="shareYoutube" href="http://www.youtube.com/user/woolworthssa" target="_blank">www.youtube.com/woolworthssa</Link></li>
              <li><Link className="sharePinterest" href="http://www.pinterest.com/woolworthssa" target="_blank">www.pinterest.com/woolworthssa</Link></li>
              <li><Link className="shareInstagram" href="http://www.instagram.com/woolworths_sa" target="_blank">www.instagram.com/woolworths_sa</Link></li>
            </ul>
          </article>
          <article className="rightCol">
            <div className="leftColSml">
              <p>
                <strong>Woolworths Online</strong><br />
                    0860 100 987<br />
                <Link href="mailto:shop@woolworths.co.za">shop@woolworths.co.za</Link>
              </p>
              <p>
                <strong>Financial Services</strong><br />
                    0860 100 987<br />
                <Link href="mailto:queries@wfs.co.za">queries@wfs.co.za</Link>
              </p>
            </div>
            <div className="rightColSml">
              <p>
                <strong>General Enquiries</strong><br />
                    0860 022 002<br />
                <Link href="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</Link>
              </p>
              <p>
                <strong>International Enquiries</strong><br />
                    +27(0)21 407 6137<br />
                <Link href="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</Link>
              </p>
            </div>
          </article>
        </section>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.primeComponent()}
      </div>
    );
  }
}


export default ErrorPageFiveHunderd;
