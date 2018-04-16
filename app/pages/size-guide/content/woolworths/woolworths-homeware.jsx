import React from 'react';
import { Link } from 'react-router';

const WoolworthsHomeware = () => {
  return (
    <div className="page-layout__content">
      <header>
          <h1 className="font-graphic text-caps">Size Guides</h1>
        </header>
      <div className="grid grid--space-y">
          <nav className="nav-list nav-list--tabbed nav-list--tabbed-boxed">
          <Link to="/sizeGuides/woolworths" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed is-current">Woolworths
            </Link>
          <Link to="/sizeGuides/countryroad" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Country Road</Link>
          <Link to="/sizeGuides/trenery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Trenery</Link>
          <Link to="/sizeGuides/witchery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Witchery</Link>
        </nav>
        </div>
      <div className="grid grid--space-y">
          <ul className="nav-list nav-list--tabbed nav-list--tabbed-underlined">
          <Link to="/sizeGuides/woolworths/men" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Men</Link>
          <Link to="/sizeGuides/woolworths/women" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Women</Link>
          <Link to="/sizeGuides/woolworths/boys" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Boys</Link>
          <Link to="/sizeGuides/woolworths/girls" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Girls</Link>
          <Link to="/sizeGuides/woolworths/baby" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Baby</Link>
          <Link to="/sizeGuides/woolworths/homeware" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Homeware</Link>
        </ul>
        </div>
      <div className="grid accordion--max-medium" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="size-guide-table" data-accordion-active="true">
      <div id="homeware" className="grid-visible">
        <p className="text-small">Please use the European sizes as a guide to help you decide which size to buy</p>
        <div id="" className="grid">
            <div className="grid grid--space-y">
              <h3 className="text-caps font-graphic">Bath Towels</h3>
              <div className="table-scroll table-scroll--x">
                  <table className="table table-scroll__table table--border-cells table--center table--zebra text-caps" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark text-caps">
                        <tr className="table-scroll__row">
                          <th>Size</th>
                          <th>Face (cm)</th>
                          <th>Guest (cm)</th>
                          <th>Hand (cm)</th>
                          <th>Bath (cm)</th>
                          <th>Sheet (cm)</th>
                          <th>King Bath Sheet (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-scroll__row">
                          <th>Everyday Towel Range</th>
                          <td>W 30 x L 30</td>
                          <td>W 30 x L 55</td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 90 X L 150</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>Textured Towel Range</th>
                          <td>W 30 x L 30</td>
                          <td>W 30 x L 50</td>
                          <td>W 50 x L 90</td>
                          <td>W 70 X L 130</td>
                          <td>W 85 X L 160</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>Hotel Towel Range</th>
                          <td>W 30 x L 30</td>
                          <td></td>
                          <td>W 50 x L 90</td>
                          <td>W 70 X L 135</td>
                          <td>W 85 X L 160</td>
                          <td>W 100 x L 175</td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>Dobby Rib</th>
                          <td></td>
                          <td></td>
                          <td>W 50 x L 90</td>
                          <td>W 70 X L 130</td>
                          <td>W 85 X L 150</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>Textured Diamond Range</th>
                          <td>W 30 x L 30</td>
                          <td>W 30 x L 50</td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 85 x L 160</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>Studio.w Bamboo Cotton Range</th>
                          <td>W 30 x L 30</td>
                          <td>W 30 x L 50</td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 86 x L 160</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>Studio.w Pinktuck Zero Twist</th>
                          <td></td>
                          <td>W 30 x L 50</td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 90 x L 160</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>Studio.w Vertical Rib</th>
                          <td>W 30 x L 30</td>
                          <td></td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 86 x L 180</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>Studio.w Super Soft</th>
                          <td>W 30 x L 30</td>
                          <td>W 30 x L 50</td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 90 x L 180</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>David Jones Premium Collection - Zero Twist Range</th>
                          <td>W 30 x L 30</td>
                          <td>W 30 x L 50</td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 86 x L 160</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>David Jones Premium Collection - Pleated Border</th>
                          <td>W 30 x L 30</td>
                          <td></td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 85 x L 150</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>David Jones Premium Collection - Modal Towel</th>
                          <td></td>
                          <td>W 30 x L 50</td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 86 x L 160</td>
                          <td></td>
                        </tr>
                        <tr className="table-scroll__row">
                          <th>David Jones Premium Collection - Egyptian Cotton Range</th>
                          <td>W 30 x L 30</td>
                          <td>W 30 x L 50</td>
                          <td>W 50 x L 90</td>
                          <td>W 70 x L 130</td>
                          <td>W 86 x L 160</td>
                          <td></td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
            <div className="grid grid--space-y">
              <div className="grid grid__half--medium">
                  <h3 className="text-caps font-graphic">Beach Towels</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                          <th>Children</th>
                          <td>W 70 x L 130CM</td>
                        </tr>
                        <tr>
                          <th>Adult</th>
                          <td>W 90 x L 150CM</td>
                        </tr>
                        <tr>
                          <th>Extra Large</th>
                          <td>W 100 x L 180CM</td>
                        </tr>
                        <tr>
                          <th>Beach Blanket</th>
                          <td>W 180 X L 200CM</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
              <div className="grid grid__half--medium">
                  <h3 className="text-caps font-graphic">Bed Covers</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark">
                        <tr>
                          <th>Size</th>
                          <th>Throws (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <th>Fleece</th>
                          <td>W 130 x L 150</td>
                        </tr>
                        <tr>
                          <th>Medium</th>
                          <td>W 150 x L 180</td>
                        </tr>
                        <tr>
                          <th>Large</th>
                          <td>W 200 x L 200</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
            <div className="grid grid--space-y">
              <div className="grid grid__half--medium">
                  
                  <h3 className="font-graphic text-caps">Bed Linen</h3>
                  <table className="table table--center table--border-cells table--zebra table--3-col text-caps" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark">
                        <tr>
                          <th>Size</th>
                          <th>Duvet Covers (cm)</th>
                          <th>Duvet Covers Extra Length (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <th>Single (cm)</th>
                          <td>W 130 x L 200</td>
                          <td>W 130 x L 220</td>
                        </tr>
                        <tr>
                          <th>3/4</th>
                          <td>W 150 x L 200</td>
                          <td>W 150 x L 220</td>
                        </tr>
                        <tr>
                          <th>Double</th>
                          <td>W 200 x L 200</td>
                          <td>W 200 x L 220</td>
                        </tr>
                        <tr>
                          <th>Queen</th>
                          <td>W 230 x L 200</td>
                          <td>W 230 x L 220</td>
                        </tr>
                        <tr>
                          <th>King (cm)</th>
                          <td>W 230 x L 220</td>
                          <td>W 230 x L 230</td>
                        </tr>
                        <tr>
                          <th>Superking</th>
                          <td>W 260 x L 230</td>
                          <td></td>
                        </tr>
                    </tbody>
                  </table>
              </div>
              <div className="grid grid__half--medium">
                  
                  <h3 className="font-graphic text-caps">Curtains</h3>
                  <table className="table table--center table--border-cells table--zebra table--3-col text-caps" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark text-caps">
                        <tr>
                          <th>Size</th>
                          <th>Standard Length (cm)</th>
                          <th>Longer Length (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <th>Taped</th>
                          <td>W 230 x L 218</td>
                          <td>W 230 x L 250</td>
                        </tr>
                        <tr>
                          <th>Eyelet</th>
                          <td>W 140 x L 223</td>
                          <td>W 140 x L 250</td>
                        </tr>
                        <tr>
                          <th>Sheer Taped</th>
                          <td>W 230 x L 218</td>
                          <td></td>
                        </tr>
                        <tr>
                          <th>Sheer Eyelet</th>
                          <td>W 140 x L 223</td>
                          <td></td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
            <div className="grid grid--space-y">
              
              <h3 className="font-graphic text-caps">Sheeting</h3>
              <div className="table-scroll table-scroll--x">
                  <table className="table table-scroll__table table--border-cells table--center table--zebra text-caps" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark">
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Size</th>
                          <th>Fitted Sheets (cm)</th>
                          <th>Fitted Sheets Extra Length/Extra Depth (cm)</th>
                          <th>Flat Sheets (cm)</th>
                          <th>Base Covers (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Single</th>
                          <td>W 92 x L 188 x D 28</td>
                          <td>W 92 x L 200 x D 35</td>
                          <td>W180 x L 250</td>
                          <td>W 92 x L 200 x D 35</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>3/4</th>
                          <td>W 107 x L 188 x D 28</td>
                          <td>W 107 x L 200 x D 35</td>
                          <td>W180 x L 250</td>
                          <td>W 107 x L 200 x D 35</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Double</th>
                          <td>W 137 x L 188 x D 28</td>
                          <td>W 137 x L 200 x D 35</td>
                          <td>W230 x L 250</td>
                          <td>W 137 x L 200 x D 35</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Queen</th>
                          <td>W 152 x L 188 x D 28</td>
                          <td>W 152 x L 200 x D 35</td>
                          <td>W230 x L 250</td>
                          <td>W 152 x L 200 x D 35</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>King</th>
                          <td>W 183 x L 188 x D 28</td>
                          <td>W 183 x L 200 x D 35</td>
                          <td>W270 x L 250</td>
                          <td>W 183 x L 200 x D 35</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
            <div className="grid grid--space-y">
              <div className="grid grid__half--medium">
                  
                  <h3 className="font-graphic text-caps">Pillow Cases</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                          <th>Standard</th>
                          <td>W 45 x L 70cm</td>
                        </tr>
                        <tr>
                          <th>Continental</th>
                          <td>W 70 x L 70cm</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
              <div className="grid grid__half--medium">
                  
                  <h3 className="font-graphic text-caps">Pillow Inners</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                          <th>Standard</th>
                          <td>W 45 x L 70cm</td>
                        </tr>
                        <tr>
                          <th>King</th>
                          <td>W 50 x L 90cm</td>
                        </tr>
                        <tr>
                          <th>Continental</th>
                          <td>W 70 x L 70cm</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
            <div className="grid grid--space-y">
              <div className="grid grid__half--medium">
                  
                  <h3 className="font-graphic text-caps">Duvet Inners</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                          <th>Single</th>
                          <td>W 130 x L 200cm</td>
                        </tr>
                        <tr>
                          <th>3/4</th>
                          <td>W 150 x L 200cm</td>
                        </tr>
                        <tr>
                          <th>Double</th>
                          <td>W 200 x L 200cm</td>
                        </tr>
                        <tr>
                          <th>Queen</th>
                          <td>W 230 x L 200cm</td>
                        </tr>
                        <tr>
                          <th>King</th>
                          <td>W 230 x L 220cm</td>
                        </tr>
                        <tr>
                          <th>Superking</th>
                          <td>W 260 x L 230cm</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
              <div className="grid grid__half--medium">
                  
                  <h3 className="font-graphic text-caps">Table Linen</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col text-caps" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark">
                        <tr>
                          <th>Size</th>
                          <th>Tablecloth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <th>Medium</th>
                          <td>W 140 x L 180cm</td>
                        </tr>
                        <tr>
                          <th>Large</th>
                          <td>W 180 x L 230cm</td>
                        </tr>
                        <tr>
                          <th>X Large</th>
                          <td>W 180 x L 360cm</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default WoolworthsHomeware;
