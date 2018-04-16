import React, { Component } from 'react';
import { Link } from 'react-router';

const TerneryWomen = () => {
    return (
      <div className="page-layout__content">
          <header>
              <h1 className="font-graphic text-caps">Size Guides</h1>
            </header>
          <div className="grid grid--space-y">
              <nav className="nav-list nav-list--tabbed nav-list--tabbed-boxed">
              <Link to="/sizeGuides/woolworths" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Woolworths
                </Link>
              <Link to="/sizeGuides/countryroad" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Country Road</Link>
              <Link to="/sizeGuides/trenery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed is-current">Trenery</Link>
              <Link to="/sizeGuides/witchery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Witchery</Link>
            </nav>
            </div>
          <div className="grid grid--space-y">
              <ul className="nav-list nav-list--tabbed nav-list--tabbed-underlined">
              <Link to="/sizeGuides/trenery/men" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Men</Link>
              <Link to="/sizeGuides/trenery/women" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Women</Link>
            </ul>
            </div>
          <div className="grid accordion--max-medium" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="size-guide-table" data-accordion-active="true">
          <div id="women" className="grid-visible">
            <aside>
                <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
                    <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                        <span className="icon-text grid-hidden--medium">How to measure</span>
                    </h4>
                    <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                        <div className="grid size-guide-measurements">
                        <h3 className="font-graphic text-caps grid-visible--medium">How to measure</h3>
                        <img alt="sizing guides measurement" src="/images/content/size_guides/tr_women.gif" width="100%" />
                        <div className="grid counter">
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Bust</h4>
                            <p className="text-small">Measure at the fullest part of your bust, by placing the tape measure under your arms and across your shoulder blades. Remember to breathe out when taking 
                                this measurement.
                            </p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                            <p className="text-small">Measure around your natural waist. Find it by bending sideways. Note the position and measure standing up straight and relaxed.</p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Hip</h4>
                            <p className="text-small">Measure around the fullest part of your bottom, about 20cm below your natural waist, at the top of your legs.</p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Inside Leg</h4>
                            <p className="text-small">Measure from the crutch to the bottom of the ankle bone.</p>
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
                <div data-js="accordion-content" className="accordion__content--chrome accordion__content">
                    
                    <h3 className="text-caps font-graphic">Womenswear</h3>
                    <div className="table-scroll table-scroll--x">
                        <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>Size</th>
                                <th>Bust (cm)</th>
                                <th>Waist (cm)</th>
                                <th>Hip (cm)</th>
                                <th>Inside Leg (cm)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>6/XXS</th>
                                <td>82</td>
                                <td>62</td>
                                <td>89</td>
                                <td>80</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>8/XS</th>
                                <td>85</td>
                                <td>65</td>
                                <td>92</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>10/S</th>
                                <td>90</td>
                                <td>70</td>
                                <td>97</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>12/M</th>
                                <td>95</td>
                                <td>75</td>
                                <td>102</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>14/L</th>
                                <td>100</td>
                                <td>80</td>
                                <td>107</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>16/XL</th>
                                <td>107</td>
                                <td>87</td>
                                <td>114</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>18/XXL</th>
                                <td>114</td>
                                <td>94</td>
                                <td>122</td>
                                <td>82</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid grid--space-y">
                    <div className="grid grid__half--medium">
                        
                        <h3 className="text-caps font-graphic">Shoe Size Conversion</h3>
                        <table className="table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>UK</th>
                                <th>Australia</th>
                                <th>US</th>
                                <th>Europe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>3</th>
                                <td>5</td>
                                <td>5</td>
                                <td>36</td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>6</td>
                                <td>6</td>
                                <td>37</td>
                            </tr>
                            <tr>
                                <th>5</th>
                                <td>7</td>
                                <td>7</td>
                                <td>38</td>
                            </tr>
                            <tr>
                                <th>6</th>
                                <td>8</td>
                                <td>8</td>
                                <td>39</td>
                            </tr>
                            <tr>
                                <th>7</th>
                                <td>9</td>
                                <td>9</td>
                                <td>40</td>
                            </tr>
                            <tr>
                                <th>8</th>
                                <td>10</td>
                                <td>10</td>
                                <td>41</td>
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
export default TerneryWomen;
