import React, { Component } from 'react';
import { Link } from 'react-router';

const CountryRoadWomen = () => {
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
              <Link to="/sizeGuides/countryroad/boys" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Kids</Link>
              <Link to="/sizeGuides/countryroad/baby" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Baby</Link>
              <Link to="/sizeGuides/countryroad/homeware" activeClassName="is-current" className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-underlined">Homeware</Link>
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
                        <img alt="sizing guides measurement" src="/images/content/size_guides/cr_women.gif" width="100%" />
                        <div className="grid counter">
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Bust</h4>
                            <p className="text-small">Measure at the fullest part of your bust, by placing the tape measure under your arms and across your shoulder blades. Remember to breathe out 
                                when taking this measurement.
                            </p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                            <p className="text-small">Decide where you want your trousers to sit (on the hips, above the hips) and measure at this position. Ensure that the tape is horizontal to the ground.</p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Hip</h4>
                            <p className="text-small">Measure around the fullest part of your bottom, about 20cm below your natural waist, at the top of your legs.</p>
                            <h4 className="font-graphic text-caps counter__increment counter__increment--black">Inside Leg</h4>
                            <p className="text-small">Measure from the top of the inside leg (crotch) to the bottom of the ankle bone. Make sure the trouser crotch is sitting comfortably against the 
                                body and is not sagging.
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
                    
                    <h3 className="text-caps font-graphic">Womenswear</h3>
                    <div className="table-scroll table-scroll--x">
                        <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>Size</th>
                                <th>Bust (cm)</th>
                                <th>Waist (cm)</th>
                                <th>Hip (cm)</th>
                                <th>Inside leg (cm)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>4/XXS</th>
                                <td>80</td>
                                <td>60</td>
                                <td>87</td>
                                <td>77</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>6/XS</th>
                                <td>84</td>
                                <td>64</td>
                                <td>91</td>
                                <td>80</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>8</th>
                                <td>87</td>
                                <td>67</td>
                                <td>93</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>10/S</th>
                                <td>89</td>
                                <td>69</td>
                                <td>96</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>12/M</th>
                                <td>94</td>
                                <td>74</td>
                                <td>101</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>14/L</th>
                                <td>99</td>
                                <td>79</td>
                                <td>106</td>
                                <td>82</td>
                            </tr>
                            <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                <th>16/XL</th>
                                <td>104</td>
                                <td>84</td>
                                <td>111</td>
                                <td>82</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid--space-y">
                    <div className="grid grid__half--medium">
                        
                        <h3 className="text-caps font-graphic">Shoe Size Conversion</h3>
                        <table className="table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                        <thead className="table__head table__head--dark text-caps">
                            <tr className="">
                                <th>UK</th>
                                <th>Australia</th>
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
export default CountryRoadWomen;
