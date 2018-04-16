import React, { Component } from 'react';
import { Link } from 'react-router';

const WitcheryBoys = () => {
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
            <div id="boys" className="grid-visible">
                <aside>
                    <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
                        <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                            <span className="icon-text grid-hidden--medium">How to measure</span>
                        </h4>
                        <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                            <div className="grid size-guide-measurements">
                            <h3 className="font-graphic text-caps grid-visible--medium">How to measure</h3>
                            <img alt="sizing guides measurement" src="/images/content/size_guides/wt_boys.gif" width="100%" />
                            <div className="grid counter">
                                <h4 className="font-graphic text-caps counter__increment counter__increment--black">Height</h4>
                                <p className="text-small">Measure without shoes, feet together, flat on the floor. Measure from the ground to the top of the head.</p>
                                <h4 className="font-graphic text-caps counter__increment counter__increment--black">Chest</h4>
                                <p className="text-small">Measure over the nipples, under the arms and around the back, keeping it horizontal to the ground all the way around.</p>
                                <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                                <p className="text-small">This is the natural waist. Measured at the narrowest point of the waist curve, above the hip bones, keeping the tape 
                                    horizontal to the ground all the way around.
                                </p>
                                <h4 className="font-graphic text-caps counter__increment counter__increment--black">Seat</h4>
                                <p className="text-small">Measured at the fullest part of the lower body, over the buttocks, keeping the tape horizontal to the ground all the way around.</p>
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
                        
                        <h3 className="text-caps font-graphic">Boyswear</h3>
                        <div className="text-small message message--general"><span className="icon icon--info-dark"></span><span className="icon-text">This table can be<span className="touch-hidden strong"> scrolled right</span><span className="no-touch-hidden strong"> swiped left</span> for more info</span></div>
                        <div className="table-scroll table-scroll--x">
                            <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                            <thead className="table__head table__head--dark text-caps">
                                <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                    <th>AU 4-14</th>
                                    <th>Age(years)</th>
                                    <th>AU XS-L</th>
                                    <th>Height (cm)</th>
                                    <th>Chest (cm)</th>
                                    <th>Waist (cm)</th>
                                    <th>Hip (cm)</th>
                                    <th>Inside Leg (cm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                    <th>4</th>
                                    <td>4</td>
                                    <td>XS</td>
                                    <td>108</td>
                                    <td>60</td>
                                    <td>56</td>
                                    <td>62</td>
                                    <td>45</td>
                                </tr>
                                <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                    <th>5</th>
                                    <td>5</td>
                                    <td>XS</td>
                                    <td>115</td>
                                    <td>62</td>
                                    <td>57</td>
                                    <td>64</td>
                                    <td>49</td>
                                </tr>
                                <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                    <th>6</th>
                                    <td>6</td>
                                    <td>S</td>
                                    <td>120</td>
                                    <td>64</td>
                                    <td>58</td>
                                    <td>66</td>
                                    <td>52</td>
                                </tr>
                                <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                    <th>7</th>
                                    <td>7</td>
                                    <td>S</td>
                                    <td>125</td>
                                    <td>66</td>
                                    <td>59</td>
                                    <td>68</td>
                                    <td>55</td>
                                </tr>
                                <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                    <th>8</th>
                                    <td>8</td>
                                    <td>M</td>
                                    <td>132</td>
                                    <td>71</td>
                                    <td>60</td>
                                    <td>75</td>
                                    <td>61</td>
                                </tr>
                                <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                    <th>10</th>
                                    <td>10</td>
                                    <td>M</td>
                                    <td>140</td>
                                    <td>74</td>
                                    <td>62</td>
                                    <td>78</td>
                                    <td>64</td>
                                </tr>
                                <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                    <th>12</th>
                                    <td>12</td>
                                    <td>L</td>
                                    <td>148</td>
                                    <td>77</td>
                                    <td>65</td>
                                    <td>81</td>
                                    <td>67</td>
                                </tr>
                                <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                    <th>14</th>
                                    <td>14</td>
                                    <td>L</td>
                                    <td>156</td>
                                    <td>80</td>
                                    <td>68</td>
                                    <td>84</td>
                                    <td>70</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid grid--space-y">
                        <div className="grid grid__half--medium">
                            
                            <h3 className="text-caps font-graphic">Shoes</h3>
                            <div className="text-small message message--general"><span className="icon icon--info-dark"></span><span className="icon-text">This table can be<span className="touch-hidden strong"> scrolled right</span><span className="no-touch-hidden strong"> swiped left</span> for more info</span></div>
                            <div className="table-scroll table-scroll--x">
                            <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                                <thead className="table__head table__head--dark text-caps">
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>Size</th>
                                        <th>Age</th>
                                        <th>Length (cm)</th>
                                        <th>Width (cm)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>27</th>
                                        <td>4-5</td>
                                        <td>18.5</td>
                                        <td>6.1</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>28</th>
                                        <td>4-5</td>
                                        <td>19.1</td>
                                        <td>6.3</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>29</th>
                                        <td>5-6</td>
                                        <td>19.8</td>
                                        <td>6.5</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>30</th>
                                        <td>6-7</td>
                                        <td>20.5</td>
                                        <td>6.7</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>31</th>
                                        <td>6-7</td>
                                        <td>21.1</td>
                                        <td>6.9</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>32</th>
                                        <td>7-8</td>
                                        <td>21.8</td>
                                        <td>7.1</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>33</th>
                                        <td>7-8</td>
                                        <td>22.4</td>
                                        <td>7.3</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>34</th>
                                        <td>8-9</td>
                                        <td>23.1</td>
                                        <td>7.5</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>35</th>
                                        <td>8-9</td>
                                        <td>23.8</td>
                                        <td>7.7</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>36</th>
                                        <td>9-10</td>
                                        <td>24.4</td>
                                        <td>7.9</td>
                                    </tr>
                                    <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                                        <th>37</th>
                                        <td>9-10</td>
                                        <td>25.1</td>
                                        <td>8.1</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        <div className="grid grid__half--medium">
                            
                            <h3 className="text-caps font-graphic">Shoe Size Conversion</h3>
                            <table className="table table--center table--border-cells table--zebra table--3-col" cellPadding="0" cellSpacing="0">
                            <thead className="table__head table__head--dark text-caps">
                                <tr>
                                    <th>AU/NZ/SA/UK</th>
                                    <th>US</th>
                                    <th>Europe</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>9</th>
                                    <td>9.5</td>
                                    <td>27</td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td>10.5</td>
                                    <td>28</td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td>11.5</td>
                                    <td>29</td>
                                </tr>
                                <tr>
                                    <th>12</th>
                                    <td>12.5</td>
                                    <td>30</td>
                                </tr>
                                <tr>
                                    <th>13</th>
                                    <td>13.5</td>
                                    <td>31</td>
                                </tr>
                                <tr>
                                    <th>1</th>
                                    <td>1.5</td>
                                    <td>33</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>2.5</td>
                                    <td>34</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>3.5</td>
                                    <td>36</td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td>4.5</td>
                                    <td>37</td>
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
export default WitcheryBoys;
