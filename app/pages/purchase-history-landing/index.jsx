import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';


export default class PurchaseHistoryLanding extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
         <main className="grid grid--space-y site-main">
        <div className="main-page">
          <div className="grid grid--space-y">
            <div className="page-layout__aside">
              <div className="accordion accordion--chrome" data-js="accordion" data-accordion-start="first-open" data-accordion-type="open-single" data-accordion-active="true">
                <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                  <h4 className="text-caps accordion__toggle--chrome accordion__toggle--line accordion__toggle" data-js="accordion-toggle">Online Purchases:</h4>
                  <ul className="list--silent text-small accordion__content--chrome accordion__content" data-js="accordion-content">
                    <li>
                      <Link to="" className="nav-list__link--filter is-current"> My Online Purchases</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Apply For Loyalty Card</Link>
                    </li>
                    <li>
                      <hr className="hr--light" />
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Help</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Contact Us</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Log out</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="page-layout__content">
              <h1 className="font-graphic text-caps">Purchase History</h1>
              <p>Click on the purchase ID to view the full details of your purchase:</p>
              <div className="table-scroll table-scroll--x">
                <table className="table table-scroll__table table--border-rows" cellPadding={0} cellSpacing={0}>
                  <thead className="table__head">
                    <tr className="table-scroll__row">
                      <th>PURCHASE ID</th>
                      <th>PURCHASE DATE</th>
                      <th>VALUE</th>
                      <th>DELIVERY DATE</th>
                      <th>TAX INVOICE</th>
                      <th className="text-align-right">CANCEL ORDER</th>
                    </tr>
                  </thead>
                  <tbody className="table-scroll__body">
                    <tr className="table-scroll__row" data-to="dashboard-index.jsp?content=purchases/purchase">
                      <td>
                        <Link to="/store/ww-store-pages/purchase-history-product.html">o36080005</Link>
                      </td>
                      <td>2017-02-16</td>
                      <td>R 34.95</td>
                      <td>Order Placed</td>
                      <td />
                      <td className="text-align-right">
                        <Link title="cancel order" onclick="cancelOrder('o36080005');" to="javascript:;">
                          <span className="icon icon--cancel-dark" />
                        </Link>
                      </td>
                    </tr>
                    <tr className="table-scroll__row" data-to="dashboard-index.jsp?content=purchases/purchase">
                      <td>
                        <Link to="/store/ww-store-pages/purchase-history-product.html">o36080005</Link>
                      </td>
                      <td>2017-02-16</td>
                      <td>R 34.95</td>
                      <td>Order Placed</td>
                      <td />
                      <td className="text-align-right">
                        <Link title="cancel order" onclick="cancelOrder('o36080005');" to="javascript:;">
                          <span className="icon icon--cancel-dark" />
                        </Link>
                      </td>
                    </tr>
                    <tr className="table-scroll__row" data-to="dashboard-index.jsp?content=purchases/purchase">
                      <td>
                        <Link to="/store/fragments/dashboard/dashboard-index.jsp?content=purchases/purchase&deliveryDate=&orderStatus=SUBMITTED&id=o36080005">o36080005</Link>
                      </td>
                      <td>2017-02-16</td>
                      <td>R 34.95</td>
                      <td>Order Placed</td>
                      <td />
                      <td className="text-align-right">
                        <Link title="cancel order" onclick="cancelOrder('o36080005');" to="javascript:;">
                          <span className="icon icon--cancel-dark" />
                        </Link>
                      </td>
                    </tr>
                    <tr className="table-scroll__row" data-to="dashboard-index.jsp?content=purchases/purchase">
                      <td>
                        <Link to="/store/fragments/dashboard/dashboard-index.jsp?content=purchases/purchase&deliveryDate=&orderStatus=SUBMITTED&id=o36080005">o36080005</Link>
                      </td>
                      <td>2017-02-16</td>
                      <td>R 34.95</td>
                      <td>Order Placed</td>
                      <td />
                      <td className="text-align-right">
                        <Link title="cancel order" onclick="cancelOrder('o36080005');" to="javascript:;">
                          <span className="icon icon--cancel-dark" />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    );
  }
}
