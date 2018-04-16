import React, { Component } from 'react';
import { Link } from 'react-router';

const WoolworthsWomen = () => {
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
          <div id="women" className="grid-visible">
            <aside>
                <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
                    <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                        <span className="icon-text grid-hidden--medium">How to measure</span>
                    </h4>
                    <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                        <div className="grid size-guide-measurements">
                        <h3 className="font-graphic text-caps grid-visible--medium">How to measure</h3>
                        <img alt="sizing guides measurement" src="/images/content/size_guides/ww_women.gif" width="100%" />
                        <div className="grid counter">
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Bust</h4>
                            <p className="text-small">Measure at the fullest part of your bust, by placing the tape measure under your arms and across your shoulder blades. 
                                Remember to breathe out when taking this measurement.
                            </p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                            <p className="text-small">Decide where you want your trousers to sit (on the hips, above the hips) and measure at this position. Ensure that the tape is horizontal to the ground.</p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Hip</h4>
                            <p className="text-small">Measure around the fullest part of your bottom, about 20cm below your natural waist, at the top of your legs.</p>
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
                    
                    <h3 className="font-graphic text-caps">Bra Size Guide</h3>
                    <div className="text-small message message--general"><span className="icon icon--info-dark"></span><span className="icon-text">This table can be<span className="touch-hidden strong"> scrolled right</span><span className="no-touch-hidden strong"> swiped left</span> for more info</span></div>
                    <div className="table-scroll table-scroll--x">
                        <table className="table table-scroll__table table--center table--border-cells table--zebra" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr className="table-scroll__row">
                                <th colSpan="2">Under Bust</th>
                                <th colSpan="9">Cup Size (measured over fullest part of breast)</th>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>Band Size (Inches)</th>
                                <th>CM</th>
                                <th>AA</th>
                                <th>A</th>
                                <th>B</th>
                                <th>C</th>
                                <th>D</th>
                                <th>DD</th>
                                <th>E</th>
                                <th>F</th>
                                <th>G</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>30</th>
                                <td>63-67</td>
                                <td>Up to 76cm</td>
                                <td>77-78cm</td>
                                <td>78-80cm</td>
                                <td>81-82cm</td>
                                <td>83-84cm</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>32</th>
                                <td>68-72</td>
                                <td>Up to 81cm</td>
                                <td>82-83cm</td>
                                <td>84-85cm</td>
                                <td>86-88cm</td>
                                <td>89-90cm</td>
                                <td>91-93cm</td>
                                <td>94-95cm</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>34</th>
                                <td>73-77</td>
                                <td>Up to 86cm</td>
                                <td>87-88cm</td>
                                <td>89-90cm</td>
                                <td>91-93cm</td>
                                <td>94-95cm</td>
                                <td>96-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>36</th>
                                <td>78-82</td>
                                <td>Up to 91cm</td>
                                <td>92-93cm</td>
                                <td>94-95cm</td>
                                <td>96-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>38</th>
                                <td>83-87</td>
                                <td>Up to 96cm</td>
                                <td>97-98cm</td>
                                <td>99-100cm</td>
                                <td>101-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>40</th>
                                <td>88-92</td>
                                <td></td>
                                <td>102-103cm</td>
                                <td>104-105cm</td>
                                <td>106-108cm</td>
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>42</th>
                                <td>93-97</td>
                                <td></td>
                                <td></td>
                                <td>109-110cm</td>
                                <td>111-113cm</td>
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>44</th>
                                <td>98-102</td>
                                <td></td>
                                <td></td>
                                <td>114-115cm</td>
                                <td>116-118cm</td>
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>46</th>
                                <td>103-107</td>
                                <td></td>
                                <td></td>
                                <td>119-120cm</td>
                                <td>121-123cm</td>
                                <td>124-125cm</td>
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                                <td>131-133cm</td>
                                <td>134-135cm</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-normal">
                                <th>48</th>
                                <td>108-112</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>126-128cm</td>
                                <td>129-130cm</td>
                                <td>131-133cm</td>
                                <td>134-135cm</td>
                                <td>136-138cm</td>
                                <td></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid grid--space-y">
                    <div className="grid grid__half--medium">
                        
                        <h3 className="font-graphic text-caps">Womenswear</h3>
                        <table className="table table--center table--border-cells table--zebra" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th colSpan="2">Size Range</th>
                                <th>Fit to Bust</th>
                                <th>Fit to Hip</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowSpan="2">XS</th>
                                <th>4</th>
                                <td>81cm</td>
                                <td>90cm</td>
                            </tr>
                            <tr>
                                <th>6</th>
                                <td>84cm</td>
                                <td>93cm</td>
                            </tr>
                            <tr>
                                <th rowSpan="2">S</th>
                                <th>8</th>
                                <td>87cm</td>
                                <td>96cm</td>
                            </tr>
                            <tr>
                                <th>10</th>
                                <td>90cm</td>
                                <td>99cm</td>
                            </tr>
                            <tr>
                                <th rowSpan="2">M</th>
                                <th>12</th>
                                <td>95cm</td>
                                <td>104cm</td>
                            </tr>
                            <tr>
                                <th>14</th>
                                <td>100cm</td>
                                <td>109cm</td>
                            </tr>
                            <tr>
                                <th rowSpan="2">L</th>
                                <th>16</th>
                                <td>105cm</td>
                                <td>114cm</td>
                            </tr>
                            <tr>
                                <th>18</th>
                                <td>110cm</td>
                                <td>119cm</td>
                            </tr>
                            <tr>
                                <th rowSpan="2">XL</th>
                                <th>20</th>
                                <td>116cm</td>
                                <td>125cm</td>
                            </tr>
                            <tr>
                                <th>22</th>
                                <td>122cm</td>
                                <td>131cm</td>
                            </tr>
                            <tr>
                                <th rowSpan="2">XXL</th>
                                <th>24</th>
                                <td>128cm</td>
                                <td>137cm</td>
                            </tr>
                            <tr>
                                <th>26</th>
                                <td>134cm</td>
                                <td>143cm</td>
                            </tr>
                        </tbody>
                        </table>
                        <p className="text-small">Our average pants length from natural waist position is 110cm.</p>
                    </div>
                    <div className="grid grid__half--medium">
                        
                        <h3 className="font-graphic text-caps">Shoe Size Conversion</h3>
                        <table className="table table--center table--border-cells table--zebra " cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr className="">
                                <th>UK</th>
                                <th>AUS</th>
                                <th>US</th>
                                <th>Europe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <th>-</th>
                                <td>5</td>
                                <td>5</td>
                                <td>35</td>
                            </tr>
                            <tr className="">
                                <th>3</th>
                                <td>5.5</td>
                                <td>5.5</td>
                                <td>35.5</td>
                            </tr>
                            <tr className="">
                                <th>3.5</th>
                                <td>6</td>
                                <td>6</td>
                                <td>36.5</td>
                            </tr>
                            <tr className="">
                                <th>4</th>
                                <td>6.5</td>
                                <td>6.5</td>
                                <td>37</td>
                            </tr>
                            <tr className="">
                                <th>4.5</th>
                                <td>7</td>
                                <td>7</td>
                                <td>37.5</td>
                            </tr>
                            <tr className="">
                                <th>5</th>
                                <td>7.5</td>
                                <td>7.5</td>
                                <td>38</td>
                            </tr>
                            <tr className="">
                                <th>5.5</th>
                                <td>8</td>
                                <td>8</td>
                                <td>38.5</td>
                            </tr>
                            <tr className="">
                                <th>6</th>
                                <td>8.5</td>
                                <td>8.5</td>
                                <td>39</td>
                            </tr>
                            <tr className="">
                                <th>6.5</th>
                                <td>9</td>
                                <td>9</td>
                                <td>40</td>
                            </tr>
                            <tr className="">
                                <th>7</th>
                                <td>9.5</td>
                                <td>9.5</td>
                                <td>40.5</td>
                            </tr>
                            <tr className="">
                                <th>7.5</th>
                                <td>10</td>
                                <td>10</td>
                                <td>41</td>
                            </tr>
                            <tr className="">
                                <th>8</th>
                                <td>10.5</td>
                                <td>10.5</td>
                                <td>42</td>
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
export default WoolworthsWomen;
