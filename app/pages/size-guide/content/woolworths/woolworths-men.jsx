import React, {Component} from 'react';
import { Link } from 'react-router';

class WoolworthsMen extends Component {
  render() {
    return(
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
            <div id="men" className="grid-visible">
            <aside>
                <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
                <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                    <span className="icon-text grid-hidden--medium">How to measure</span>
                  </h4>
                <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                    <div className="grid size-guide-measurements">
                        <h3 className="font-graphic text-caps grid-visible--medium">How to measure</h3>
                        <img alt="sizing guides measurement" src="/images/content/size_guides/ww_men.gif" width="100%" />
                        <div className="grid counter">
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Neck</h4>
                            <p className="text-small">Measure all the way around the neck with the tape resting just above the nape (bone at the top of the spine), and under the Adam's apple.</p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Chest</h4>
                            <p className="text-small">Measure across the widest part of the chest, under the armpits, and around the back. Ensure that the tape
                  is horizontal all the way around the body. (Do not allow it to dip at the back).
              </p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                            <p className="text-small">Decide where you want your trousers to sit (on the hips, above the hips) and measure at this position. Ensure that
                  the tape is horizontal to the ground.
              </p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Inside Leg</h4>
                            <p className="text-small">Measure from the top of the inside leg (crotch) to the bottom of the ankle bone. Make sure the trouser crotch is sitting comfortably against
                  the body and is not sagging.
              </p>
                          </div>
                      </div>
                  </div>
              </div>
              </aside>
            <div className="grid grid__two-thirds--large">
                <div className="">
                <p className="text-small">Please use the following as a guide to help you decide which size to buy.</p>
                <p className="text-small">Note: Values given are body measurements. To help you choose the best size, we recommend that you compare the measurements below with your own.</p>
              </div>
                <div className="grid grid--space-y">
                <div className="grid grid__half--medium">
                    <h3 className="text-caps font-graphic">Alpha Sized Tops</h3>
                    <table className="table table--center table--border-cells table--zebra table--2-col" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>Size</th>
                                <th>To Fit Chest</th>
                              </tr>
                          </thead>
                        <tbody>
                            <tr>
                                <th>X-SMALL</th>
                                <td>81-84cm</td>
                              </tr>
                            <tr>
                                <th>SMALL</th>
                                <td>87-94cm</td>
                              </tr>
                            <tr>
                                <th>MEDIUM</th>
                                <td>97-104cm</td>
                              </tr>
                            <tr>
                                <th>LARGE</th>
                                <td>107-114cm</td>
                              </tr>
                            <tr>
                                <th>X-LARGE</th>
                                <td>117-124cm</td>
                              </tr>
                            <tr>
                                <th>XX-LARGE</th>
                                <td>127-134cm</td>
                              </tr>
                            <tr>
                                <th>XXX-LARGE</th>
                                <td>137-144cm</td>
                              </tr>
                            <tr>
                                <th>XXXX-LARGE</th>
                                <td>147-149cm</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                <div className="grid grid__half--medium">
                    <h3 className="text-caps font-graphic">Alpha Sized Bottoms</h3>
                    <table className="table table--center table--border-cells table--zebra table--2-col" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>Size</th>
                                <th>To Fit Waist (Inches/cm)</th>
                              </tr>
                          </thead>
                        <tbody>
                            <tr>
                                <th>X-SMALL</th>
                                <td>26-27/66-69cm</td>
                              </tr>
                            <tr>
                                <th>SMALL</th>
                                <td>28-31/71-79cm</td>
                              </tr>
                            <tr>
                                <th>MEDIUM</th>
                                <td>32-35/81-89cm</td>
                              </tr>
                            <tr>
                                <th>LARGE</th>
                                <td>36-39/92-99cm</td>
                              </tr>
                            <tr>
                                <th>X-LARGE</th>
                                <td>40-43/102-109cm</td>
                              </tr>
                            <tr>
                                <th>XX-LARGE</th>
                                <td>44-47/112-119cm</td>
                              </tr>
                            <tr>
                                <th>XXX-LARGE</th>
                                <td>48-51/122-129cm</td>
                              </tr>
                            <tr>
                                <th>XXXX-LARGE</th>
                                <td>52-53/132-134cm</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
                <div className="grid grid--space-y">
                <div className="grid grid__half--medium">
                    <h3 className="text-caps font-graphic">Formal Shirts</h3>
                    <table className="table table--center table--border-cells table--zebra table--2-col" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>Size</th>
                                <th>To Fit Chest</th>
                              </tr>
                          </thead>
                        <tbody>
                            <tr>
                                <th>37/14½</th>
                                <td>92cm</td>
                              </tr>
                            <tr>
                                <th>38/15</th>
                                <td>94cm</td>
                              </tr>
                            <tr>
                                <th>39/15½</th>
                                <td>97cm</td>
                              </tr>
                            <tr>
                                <th>41/16</th>
                                <td>102cm</td>
                              </tr>
                            <tr>
                                <th>42/16½</th>
                                <td>107cm</td>
                              </tr>
                            <tr>
                                <th>43/17</th>
                                <td>109cm</td>
                              </tr>
                            <tr>
                                <th>44/17½</th>
                                <td>112cm</td>
                              </tr>
                            <tr>
                                <th>46/18</th>
                                <td>117cm</td>
                              </tr>
                            <tr>
                                <th>47/18½</th>
                                <td>117cm</td>
                              </tr>
                            <tr>
                                <th>48/19</th>
                                <td>127cm</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                <div className="grid grid__half--medium">
                    <h3 className="text-caps font-graphic">Formal Jackets</h3>
                    <table className="table table--center table--border-cells table--zebra table--2-col" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>Size</th>
                                <th>To Fit Chest</th>
                              </tr>
                          </thead>
                        <tbody>
                            <tr>
                                <th>87/34</th>
                                <td>87cm</td>
                              </tr>
                            <tr>
                                <th>92/36</th>
                                <td>92cm</td>
                              </tr>
                            <tr>
                                <th>97/38</th>
                                <td>97cm</td>
                              </tr>
                            <tr>
                                <th>102/40</th>
                                <td>102cm</td>
                              </tr>
                            <tr>
                                <th>107/42</th>
                                <td>107cm</td>
                              </tr>
                            <tr>
                                <th>112/44</th>
                                <td>112cm</td>
                              </tr>
                            <tr>
                                <th>117/46</th>
                                <td>117cm</td>
                              </tr>
                            <tr>
                                <th>122/48</th>
                                <td>122cm</td>
                              </tr>
                            <tr>
                                <th>127/50</th>
                                <td>127cm</td>
                              </tr>
                          </tbody>
                      </table>
                    <p className="text-small">*(R,L,S) - Regular, Long, Short (for items that are available in multiple lengths)</p>
                  </div>
              </div>
                <div className="grid grid--space-y">
                <div className="grid grid__half--medium">
                    <h3 className="text-caps font-graphic">Trousers and Jeans</h3>
                    <table className="table table--center table--border-cells table--zebra table--2-col" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>Size</th>
                                <th>To Fit Waist (CM)</th>
                              </tr>
                          </thead>
                        <tbody>
                            <tr>
                                <th>28</th>
                                <td>71cm</td>
                              </tr>
                            <tr>
                                <th>30</th>
                                <td>76cm</td>
                              </tr>
                            <tr>
                                <th>32</th>
                                <td>81cm</td>
                              </tr>
                            <tr>
                                <th>34</th>
                                <td>87cm</td>
                              </tr>
                            <tr>
                                <th>36</th>
                                <td>92cm</td>
                              </tr>
                            <tr>
                                <th>38</th>
                                <td>97cm</td>
                              </tr>
                            <tr>
                                <th>40</th>
                                <td>102cm</td>
                              </tr>
                            <tr>
                                <th>42</th>
                                <td>107cm</td>
                              </tr>
                            <tr>
                                <th>44</th>
                                <td>112cm</td>
                              </tr>
                            <tr>
                                <th>46</th>
                                <td>117cm</td>
                              </tr>
                          </tbody>
                      </table>
                    <p className="text-small">Inside leg (in cm) 74, 79, 81, 84 (for items that are available in multiple leg lengths).</p>
                    <p className="text-small">For example 97/84 - this is size 97 with an inside leg measurement of 84cm.</p>
                  </div>
                <div className="grid grid__half--medium">
                    <h3 className="text-caps font-graphic">Shorts</h3>
                    <table className="table table--center table--border-cells table--zebra table--2-col" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>Size</th>
                                <th>To Fit Waist (cm)</th>
                              </tr>
                          </thead>
                        <tbody>
                            <tr>
                                <th>28</th>
                                <td>71cm</td>
                              </tr>
                            <tr>
                                <th>30</th>
                                <td>76cm</td>
                              </tr>
                            <tr>
                                <th>32</th>
                                <td>81cm</td>
                              </tr>
                            <tr>
                                <th>34</th>
                                <td>87cm</td>
                              </tr>
                            <tr>
                                <th>36</th>
                                <td>92cm</td>
                              </tr>
                            <tr>
                                <th>38</th>
                                <td>97cm</td>
                              </tr>
                            <tr>
                                <th>40</th>
                                <td>102cm</td>
                              </tr>
                            <tr>
                                <th>42</th>
                                <td>107cm</td>
                              </tr>
                            <tr>
                                <th>44</th>
                                <td>112cm</td>
                              </tr>
                            <tr>
                                <th>46</th>
                                <td>117cm</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
                <div className="grid grid--space-y">
                <div className="grid grid__half--medium">
                    <h3 className="text-caps font-graphic">Shoe Size Conversion</h3>
                    <table className="table table--center table--border-cells table--zebra table--3-col" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>UK/AUS</th>
                                <th>US</th>
                                <th>Europe</th>
                              </tr>
                          </thead>
                        <tbody>
                            <tr>
                                <th>6</th>
                                <td>7</td>
                                <td>40</td>
                              </tr>
                            <tr>
                                <th>7</th>
                                <td>8</td>
                                <td>41</td>
                              </tr>
                            <tr>
                                <th>8</th>
                                <td>9</td>
                                <td>42</td>
                              </tr>
                            <tr>
                                <th>9</th>
                                <td>10</td>
                                <td>43</td>
                              </tr>
                            <tr>
                                <th>9.5</th>
                                <td>10.5</td>
                                <td>44</td>
                              </tr>
                            <tr>
                                <th>10</th>
                                <td>11</td>
                                <td>45</td>
                              </tr>
                            <tr>
                                <th>11</th>
                                <td>12</td>
                                <td>46</td>
                              </tr>
                          </tbody>
                      </table>
                    <p className="text-small">Please use the European sizes as a guide to help you decide which size to buy</p>
                  </div>
              </div>
              </div>
          </div>
          </div>
      </div>
    );
  }
}
export default WoolworthsMen;
