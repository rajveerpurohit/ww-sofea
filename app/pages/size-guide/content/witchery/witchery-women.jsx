import React, { Component } from 'react';
import { Link } from 'react-router';

const WitcheryWomen = () => {
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
              <Link to="/sizeGuides/trenery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Trenery</Link>
              <Link to="/sizeGuides/witchery" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed is-current">Witchery</Link>
            </nav>
            </div>
          <div className="grid grid--space-y">
              <ul className="nav-list nav-list--tabbed nav-list--tabbed-underlined">
              <Link to="/sizeGuides/witchery/women" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Women</Link>
              <Link to="/sizeGuides/witchery/boys" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Boys</Link>
              <Link to="/sizeGuides/witchery/girls" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Girls</Link>
              
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
                        <img alt="sizing guides measurement" src="/images/content/size_guides/wt_women.gif" width="100%" />
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
                <div className="grid grid--space-y">
                    
                    <h3 className="text-caps font-graphic">Womenswear</h3>
                    <div className="table-scroll table-scroll--x">
                        <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>AU 4 - 16</th>
                                <th>AU XXS - XL</th>
                                <th>AU S - L</th>
                                <th>One Size</th>
                                <th>Bust</th>
                                <th>Waist</th>
                                <th>Hip</th>
                                <th>Inside Leg</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>4</th>
                                <td></td>
                                <td rowSpan="3">S</td>
                                <td rowSpan="7"></td>
                                <td>76 - 78</td>
                                <td>56 - 58</td>
                                <td>84 - 86</td>
                                <td>77</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>6</th>
                                <td>XXS</td>
                                <td>79 - 83</td>
                                <td>59 - 63</td>
                                <td>87 - 91</td>
                                <td>80</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>8</th>
                                <td>XS</td>
                                <td>84 - 88</td>
                                <td>64 - 68</td>
                                <td>92 - 96</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>10</th>
                                <td>S</td>
                                <td rowSpan="2">M</td>
                                <td>89 - 93</td>
                                <td>69 - 73</td>
                                <td>97 - 101</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>12</th>
                                <td>M</td>
                                <td>94 - 98</td>
                                <td>74 - 78</td>
                                <td>102 - 106</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>14</th>
                                <td>L</td>
                                <td rowSpan="2">L</td>
                                <td>99 - 103</td>
                                <td>79 - 83</td>
                                <td>107 - 111</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>16</th>
                                <td>XL</td>
                                <td>104 - 108</td>
                                <td>84 - 88</td>
                                <td>112 - 116</td>
                                <td>82</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid grid--space-y">
                    
                    <h3 className="text-caps font-graphic">Womenswear Size Conversion</h3>
                    <div className="table-scroll table-scroll--x">
                        <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>AU/NZ</th>
                                <th>US</th>
                                <th>UK/SA</th>
                                <th>Italy</th>
                                <th>Rest of Europe</th>
                                <th>Japan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>4</th>
                                <td>0</td>
                                <td>4</td>
                                <td>37</td>
                                <td>33</td>
                                <td>4</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>6</th>
                                <td>2</td>
                                <td>5</td>
                                <td>38</td>
                                <td>34</td>
                                <td>5</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>8</th>
                                <td>4</td>
                                <td>6</td>
                                <td>40</td>
                                <td>36</td>
                                <td>7</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>10</th>
                                <td>6</td>
                                <td>8</td>
                                <td>42</td>
                                <td>38</td>
                                <td>9</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>12</th>
                                <td>8</td>
                                <td>10</td>
                                <td>44</td>
                                <td>40</td>
                                <td>10</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>14</th>
                                <td>10</td>
                                <td>12</td>
                                <td>46</td>
                                <td>42</td>
                                <td>13</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>16</th>
                                <td>12</td>
                                <td>14</td>
                                <td>48</td>
                                <td>44</td>
                                <td>15</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <p className="text-small">Our average pants length from natural waist position is 110cm.</p>
                </div>
                <div className="grid grid--space-y">
                    <div className="grid grid__half--medium">
                        
                        <h3 className="text-caps font-graphic">Shoes</h3>
                        <table className="table table--center table--border-cells table--zebra table--3-col" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>Shoe Size</th>
                                <th>Average Length (cm)</th>
                                <th>Average Width (cm)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>36</th>
                                <td>22.1</td>
                                <td>7.8</td>
                            </tr>
                            <tr>
                                <th>37</th>
                                <td>22.9</td>
                                <td>7.95</td>
                            </tr>
                            <tr>
                                <th>38</th>
                                <td>23.7</td>
                                <td>8.1</td>
                            </tr>
                            <tr>
                                <th>39</th>
                                <td>24.5</td>
                                <td>8.35</td>
                            </tr>
                            <tr>
                                <th>40</th>
                                <td>25.3</td>
                                <td>8.4</td>
                            </tr>
                            <tr>
                                <th>41</th>
                                <td>26.1</td>
                                <td>8.45</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className="grid grid__half--medium">
                        
                        <h3 className="text-caps font-graphic">Shoe Size Conversion</h3>
                        <table className="table table--center table--border-cells table--zebra table--3-col" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr>
                                <th>AU/NZ/SA/US</th>
                                <th>UK</th>
                                <th>Europe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>5.5</th>
                                <td>3.5</td>
                                <td>36</td>
                            </tr>
                            <tr>
                                <th>6.5</th>
                                <td>4</td>
                                <td>37</td>
                            </tr>
                            <tr>
                                <th>7.5</th>
                                <td>5</td>
                                <td>38</td>
                            </tr>
                            <tr>
                                <th>8.5</th>
                                <td>6</td>
                                <td>39</td>
                            </tr>
                            <tr>
                                <th>9.5</th>
                                <td>6.5</td>
                                <td>40</td>
                            </tr>
                            <tr>
                                <th>10.5</th>
                                <td>7</td>
                                <td>41</td>
                            </tr>
                        </tbody>
                        </table>
                        <p className="text-small">Above are measurements and international conversions to help you decide which Witchery shoe size to buy.</p>
                    </div>
                </div>
            </div>
            </div>
          </div>
        </div>
    );
}
export default WitcheryWomen;
