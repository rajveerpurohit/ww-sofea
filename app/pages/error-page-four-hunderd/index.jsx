import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ErrorPageFourHunderd extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  primeComponent() {
    return (
      <div className="contentContainer">
        <header>
          <h1 className="errorFoundHeader"><span className="mainHeading">OH NO!</span> <span className="subHeading">That Page can't<br />be found.</span></h1>
          <p className="intro">You might have followed a broken link, or an old link, but we can't find that to.
              <br />
                        You can use the <strong>search bar</strong> to find any product on our site, or use the main navigation to shop at Woolworths, or <Link to="/">click here</Link> to go to the home to.
           </p>
        </header>
        <section className="dashboardBlock fullwidth">
          <div className="shoppingListBlocks noMargT">
            <h2>Popular links</h2>
            <article className="listBlock noDecoration">
              <h3>Food &amp; Household</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">Shop Food &amp; Household</Link></li>
              </ul>
              <h3>Women</h3>
              <ul className="arrowList">
                <li><Link className="">Shop Women's Fashion</Link></li>
              </ul>
              <h3>Men</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">Shop Men's Fashion</Link></li>
              </ul>
              <h3>Kids</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">Shop Kid's Clothing</Link></li>
              </ul>
              <h3>Baby</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">Shop Baby Clothing</Link></li>
              </ul>
            </article>
            <article className="listBlock noDecoration">
              <h3>Homeware</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">Shop Homeware</Link></li>
              </ul>
              <h3>Beauty</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">Shop Beauty</Link></li>
              </ul>
              <h3>Gifts</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">Shop Gifts</Link></li>
              </ul>
              <h3>Financial Services</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">View Financial Services Products</Link></li>
                <li>
                  
                </li>
              </ul>
              <h3>WRewards</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">View Special Lower Prices</Link></li>
                <li><Link className="list__item--chevron" to="">Join WRewards</Link></li>
              </ul>
            </article>
            <article className="listBlock noDecoration">
              <h3>My Account</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">View your online profile</Link></li>
              </ul>
              <h3>Customer Service</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="/fragments/help/help-index.jsp">View help</Link></li>
                <li><Link className="list__item--chevron" to="">Contact Woolworths</Link></li>
                <li><Link className="list__item--chevron" to="">Store Locator</Link></li>
              </ul>
              <h3>About Woolworths</h3>
              <ul className="arrowList">
                <li><Link className="list__item--chevron" to="">Woolworths Careers</Link></li>
                <li><Link className="list__item--chevron" to="">Woolworths in Schools</Link></li>
                <li><Link className="list__item--chevron" to="">Sustainability</Link></li>
              </ul>
            </article>
          </div>
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


export default ErrorPageFourHunderd;
