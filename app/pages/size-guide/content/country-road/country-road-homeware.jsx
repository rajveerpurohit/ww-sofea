import React from 'react';
import { Link } from 'react-router';

const CountryRoadHomeware = () => {
  return (
    <div className="page-layout__content">
      <header>
          <h1 className="font-graphic text-caps">Size Guides</h1>
        </header>
      <div className="grid grid--space-y">
          <nav className="nav-list nav-list--tabbed nav-list--tabbed-boxed">
          <Link to="/sizeGuides/woolworths" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Woolworths
            </Link>
          <Link to="/sizeGuides/countryroad" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed is-current">Country Road</Link>
          <Link to="/sizeGuides/trenery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Trenery</Link>
          <Link to="/sizeGuides/witchery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Witchery</Link>
        </nav>
        </div>
      <div className="grid grid--space-y">
          <ul className="nav-list nav-list--tabbed nav-list--tabbed-underlined">
          <Link to="/sizeGuides/countryroad/men" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Men</Link>
          <Link to="/sizeGuides/countryroad/women" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Women</Link>
          <Link to="/sizeGuides/countryroad/kids" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Kids</Link>
          <Link to="/sizeGuides/countryroad/baby" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Baby</Link>
          <Link to="/sizeGuides/countryroad/homeware" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Homeware</Link>
        </ul>
        </div>
      <div className="grid accordion--max-medium" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="size-guide-table" data-accordion-active="true">
      <div id="homeware" className="grid-visible">
        <div className="grid">
            <p className="text-small">Please use the European sizes as a guide to help you decide which size to buy</p>
            <div className="grid grid--space-y">
              <div className="grid grid__third--medium">
                  
                  <h3 className="text-caps font-graphic">Bath towels &amp; mats</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                          <th>Bath Sheet (cm)</th>
                          <td>L 167 x W 91</td>
                        </tr>
                        <tr>
                          <th>Bath Towel (cm)</th>
                          <td>L 137 x W 69</td>
                        </tr>
                        <tr>
                          <th>Hand Towel (cm)</th>
                          <td>L 64 x W 45</td>
                        </tr>
                        <tr>
                          <th>Bath Mat (cm)</th>
                          <td>L 90 x W 60</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
              <div className="grid grid__third--medium">
                  
                  <h3 className="text-caps font-graphic">Beach towels</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                          <th>Adult (cm)</th>
                          <td>L 180 x W 100</td>
                        </tr>
                        <tr>
                          <th>Children's (cm)</th>
                          <td>L 150 x W 75</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
              <div className="grid grid__third--medium">
                  
                  <h3 className="text-caps font-graphic">Bedcovers &amp; Blankets</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                          <th>Bedcovers (cm)</th>
                          <td>230 x 230</td>
                        </tr>
                        <tr>
                          <th>Blankets (cm)</th>
                          <td>L 230 x W 250</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
        </div>
        <div className="grid grid--space-y">
            <div className="grid">
              
              <h3 className="text-caps font-graphic">Bed Linen</h3>
              <div className="table-scroll table-scroll--x">
                  <table className="table table--center table--border-cells table--zebra text-caps" cellPadding="0" cellSpacing="0">
                    <thead className="table__head table__head--dark">
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Size</th>
                          <th>Quilt covers (cm)</th>
                          <th>Standard Pillowcase (cm)</th>
                          <th>European Pillowcase (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Single</th>
                          <td>L 210 x W 140</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Double</th>
                          <td>L 210 x W 180</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Queen (cm)</th>
                          <td>L 210 x W 210</td>
                          <td>L 73 x W 48</td>
                          <td>L 65 x W 65</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>King (cm)</th>
                          <td>L 245 x W 210</td>
                          <td></td>
                          <td></td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
        </div>
        <div className="grid grid--space-y">
            
            <h3 className="text-caps font-graphic">Sheeting</h3>
            <div className="table-scroll table-scroll--x">
              <table className="table table-scroll__table table--border-cells table--center table--zebra text-caps" cellPadding="0" cellSpacing="0">
                  <thead className="table__head table__head--dark">
                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                        <th>Size</th>
                        <th>Flat Sheet (cm)</th>
                        <th>Fitted Sheet (cm)</th>
                        <th>Pillowcase (cm)</th>
                        <th>European Pillowcase (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                        <th>Single</th>
                        <td>L 180 x W 260</td>
                        <td>L 91 x W 190</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                        <th>Double</th>
                        <td>L 230 x W 260</td>
                        <td>L 137 x W 190</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                        <th>Queen</th>
                        <td>L 280 x W 265</td>
                        <td>L 203 x W 152 x D 37</td>
                        <td>L 73 x W 48</td>
                        <td>L 65 x W 65</td>
                    </tr>
                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                        <th>King</th>
                        <td>L 280 x W 265</td>
                        <td>L 203 x W 152 x D 37</td>
                        <td></td>
                        <td></td>
                    </tr>
                  </tbody>
              </table>
            </div>
        </div>
        <div className="grid grid--space-y">
            <div className="grid grid__half--medium">
              
              <h3 className="text-caps font-graphic">Throw rugs</h3>
              <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                        <th>Size</th>
                        <td>L 180 x W 130cm</td>
                    </tr>
                  </tbody>
              </table>
            </div>
            <div className="grid grid__half--medium">
              
              <h3 className="text-caps font-graphic">Table Linen</h3>
              <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                        <th>Tablecloths (cm)</th>
                        <td>L 250 x W 150</td>
                    </tr>
                  </tbody>
              </table>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CountryRoadHomeware;
