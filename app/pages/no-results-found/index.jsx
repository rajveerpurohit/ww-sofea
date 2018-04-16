import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class NoResultsFound extends Component {
    static need = [

    ];
    constructor(props) {
        super(props);
        this.primeComponent = this.primeComponent.bind(this);
    }
    componentDidMount() {
    }

    primeComponent() {
        return (
          <main className="grid grid--space-y site-main">
            <div className="main-page ">
              {/* CONTENT */}
              <div className="grid grid--tight-y">
                <div className="product-list__list">
                  {/* NO SEARCH RESULTS */}
                  <div className="grid grid--space-y">
                    <div className="grid product-list__srp-info">
                      <br /><br />
                      <span>Sorry we couldn't find anything for your search</span>
                      <hr className="hr--light" />
                    </div>
                    <div className="grid grid--space-y">
                      <h3 className="text-caps font-graphic">HELPFUL TIPS:</h3>
                      <div className="text-small">
                        <ul>
                          <li>Be sure each keyword is correctly spelled</li>
                          <li>The fewer and more general the keywords, the more results you'll get</li>
                        </ul>
                        <p>Want to try again? Or, try these other ways to shop:</p>
                      </div>
                    </div>
                    <hr className="hr--light" />
                  </div>
                  <div className="grid">
                    <h3 className="text-caps font-graphic">Browse Categories</h3>
                    <div className="grid__fourth--medium">
                      <ul className="list--silent text-small">
                        <li className="list__item--chevron"><Link to="/dept/Food/_/N-1z13sk5">Food</Link></li>
                        <li className="list__item--chevron"><Link to="/dept/Men/_/N-1z13s3n">Men</Link></li>
                        <li className="list__item--chevron"><Link to="/dept/Baby/_/N-1z13s1o">Baby</Link></li>
                        <li className="list__item--chevron"><Link to="/dept/Beauty/_/N-1z13rz4">Beauty</Link></li>
                      </ul>
                    </div>
                    <div className="grid__fourth--medium">
                      <ul className="list--silent text-small">
                        <li className="list__item--chevron"><Link to="/dept/Women/_/N-1z13s4t">Women</Link></li>
                        <li className="list__item--chevron"><Link to="/dept/Kids-Baby/_/N-1z13s2t">Kids</Link></li>
                        <li className="list__item--chevron"><Link to="/dept/Homeware/_/N-1z13s0m">Homeware</Link></li>
                        <li className="list__item--chevron"><Link to="/dept/Gifts/_/N-1z13ry8">Gifts</Link></li>
                      </ul>
                    </div>
                    <div className="grid__fourth--medium">
                      <ul className="list--silent text-small">
                        <li className="list__item--chevron"><Link to="/wfs">Financial Services</Link></li>
                        <li className="list__item--chevron"><Link to="/wrewards">WRewards</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid">
                    <hr className="hr--light" />
                    <h3 className="text-caps font-graphic">Get in touch with us</h3>
                    <p className="text-small">
                                    Call us on <Link to="tel:0860022002">0860 022 002</Link><br />
                                    Mail us at <Link to="mailto:custserv@woolworths.co.za">custserv@woolworths.co.za</Link><br />
                      <Link to="/contactus" className="moreLink">Send us an enquiry</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
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
const mapStateToProps = (state) => {
    return {
        // aboutUsData: state.aboutUsReducer.aboutUsData,
        // contentAside: state.aboutUsReducer.contentAside
    };
};

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({getUsingWoolworthsOnline}, dispatch);
// };

export default connect(mapStateToProps)(NoResultsFound);
