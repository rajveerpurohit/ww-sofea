import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

export default class PurchaseHistoryProduct extends Component {
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
              <table className="table purchases__header-table">
                <tbody>
                  <tr>
                    <td className="grid__fourth">
                      <strong>Purchase ID:</strong>
                    </td>
                    <td className="grid__three-fourths">o36080005</td>
                  </tr>
                  <tr>
                    <td className="grid__fourth">
                      <strong>Purchase date:</strong>
                    </td>
                    <td className="grid__three-fourths">08/10/2017</td>
                  </tr>
                  <tr>
                    <td className="grid__fourth">
                      <strong>Delivery:</strong>
                    </td>
                    <td className="grid__three-fourths">Order Processing</td>
                  </tr>
                </tbody>
              </table>
              {/* example item type: home */}
              <table className="purchases__table table table--border-rows grid--space-y" cellPadding={0} cellSpacing={0}>
                <thead>
                  <tr>
                    <th className="no-wrap text-caps">Your Home Items</th>
                    <th className="no-wrap text-caps">QTY</th>
                    <th className="no-wrap text-caps">Colour/ Size</th>
                    <th className="no-wrap text-caps">Unit Price</th>
                    <th className="no-wrap text-caps">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="purchases__table-item">
                      <figure className="flush-m">
                        <Link rel={501506242} id={501506242} to="" className="border--colour-grey">
                          <img src="//images.woolworthsstatic.co.za/Cotton-Facecloth-MAUVE-6009173460592.jpg?o=xP5ZN@DuuuKKExFGSwgaPx51LRMj&V=OKih&w=350" title="Cotton Facecloth" alt="Cotton Facecloth" className="border--weight-thin" />
                        </Link>
                      </figure>
                      <div>
                        <Link to="">
                          <strong>Cotton Facecloth</strong>
                        </Link>
                        <br />
                        <span>Product Code:
                          <br />6009173460592</span>
                      </div>
                    </td><td>2</td>
                    <td>
                      <img className="colour-swatch" src="//images.woolworthsstatic.co.za/swatch-MAUVE-6009173460592.jpg?o=TuxRzY7tGcLlEW0k1givLstLjFMj&V=Svif&w=16" title="mauve" alt="mauve" />
                    </td>
                    <td>
                      <strong>R 20.00</strong>
                    </td>
                    <td>R 40.00</td>
                  </tr>
                </tbody>
                <tfoot className="purchases__table-foot">
                  <tr>
                    <td colSpan={5}>
                      <span>TOTAL: R40.00</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <button className="btn text-dampen-slight arrow-link--forward link--silent purchases__table-button">Add to basket</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
              {/* example item type: foods */}
              <table className="purchases__table table table--border-rows grid--space-y" cellPadding={0} cellSpacing={0}>
                <thead>
                  <tr>
                    <th className="no-wrap text-caps">Your Home Items</th>
                    <th className="no-wrap text-caps">QTY</th>
                    <th className="no-wrap text-caps">Colour/ Size</th>
                    <th className="no-wrap text-caps">Unit Price</th>
                    <th className="no-wrap text-caps">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="purchases__table-item">
                      <figure className="flush-m">
                        <Link rel={501506242} id={501506242} to="" className="border--colour-grey">
                          <img src="//images.woolworthsstatic.co.za/Coca-Cola-Original-2L-Limited-to-8-bottles-per-person-5449000009067.jpg?o=@DhhruHxbCSN9iMnUVkQdGb9@icj&V=7fiR&w=350" title="Coca-Cola Original 2L" alt="Coca-Cola Original 2L" className="border--weight-thin" />
                        </Link>
                      </figure>
                      <div>
                        <Link to="">
                          <strong>Coca-Cola Original 2L</strong>
                        </Link>
                        <br />
                        <span>Product Code:
                          <br />5449000009067</span>
                      </div>
                    </td><td>2</td>
                    <td />
                    <td>
                      <strong>R 16.95</strong>
                    </td>
                    <td className="purchases__table-price">
                      R 9.75
                      <br />
                      <span className="purchases__table-price--save font-graphic text-save text-small">YOU SAVED:
                        <br /> R 7.20</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot className="purchases__table-foot">
                  <tr>
                    <td colSpan={5}>
                      <span>TOTAL: R9.75</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <button className="btn text-dampen-slight arrow-link--forward purchases__table-button">Add to basket</button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="flush">
                      <button className="btn text-dampen-slight arrow-link--forward purchases__table-button">Create list</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </main>
      </div>
    );
  }
}
