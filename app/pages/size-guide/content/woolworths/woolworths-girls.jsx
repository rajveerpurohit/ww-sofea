import React from 'react';
import { Link } from 'react-router';

const WoolworthsGirls = () => {
  return (
    <div className="page-layout__content">
      <header>
          <h1 className="font-graphic text-caps">Size Guides</h1>
        </header>
      <div className="grid grid--space-y">
          <nav className="nav-list nav-list--tabbed nav-list--tabbed-boxed">
          <Link to="/sizeGuides/woolworths"  className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed is-current">Woolworths
            </Link>
          <Link to="/sizeGuides/countryroad"  className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Country Road</Link>
          <Link to="/sizeGuides/trenery"  className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Trenery</Link>
          <Link to="/sizeGuides/witchery"  className="nav-list__link nav-list__link--tabbed nav-list__link--tabbed-boxed">Witchery</Link>
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
      <div id="girls" className="grid-visible">
   <aside>
      <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
         <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
            <span className="icon-text grid-hidden--medium">How to measure</span>
         </h4>
         <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
            <div className="grid size-guide-measurements">
               <h3 className="font-graphic text-caps grid-visible--medium">How to measure</h3>
               <img alt="sizing guides measurement" src="/images/content/size_guides/ww_girls.gif" width="100%"/>
               <div className="grid counter">
                  <h4 className="font-graphic text-caps counter__increment counter__increment--black">Height</h4>
                  <p className="text-small">Measure without shoes, feet together, flat on the floor. Measure from the ground to the top of the head.</p>
                  <h4 className="font-graphic text-caps counter__increment counter__increment--black">Bust</h4>
                  <p className="text-small">Measured at the widest part of the chest. Pass the tape over the nipples, under the arms and around the back, keeping it horizontal 
                     to the ground all the way around.
                  </p>
                  <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                  <p className="text-small">This is the natural waist. Measured at the narrowest point of the waist curve, above the hip bones, keeping the tape horizontal to the 
                     ground all the way around.
                  </p>
                  <h4 className="font-graphic text-caps counter__increment counter__increment--black">Hip</h4>
                  <p className="text-small">Measured at the fullest part of the lower body, over the buttocks, keeping the tape horizontal to the ground all the way around.</p>
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
              
              <h3 className="text-caps font-graphic">Girlswear</h3>
              <div className="table-scroll table-scroll--x">
                  <table className="table table-scroll__table table--border-cells table--center table--zebra" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark text-caps">
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Age Range </th>
                          <th>Height Range (cm)</th>
                          <th>Bust (cm)</th>
                          <th>Waist (cm)</th>
                          <th>Hip (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>2</th>
                          <td>87-89</td>
                          <td>52</td>
                          <td>51</td>
                          <td>54</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>3</th>
                          <td>90-100</td>
                          <td>54</td>
                          <td>52</td>
                          <td>57</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>4</th>
                          <td>101-107</td>
                          <td>56</td>
                          <td>53</td>
                          <td>60</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>5</th>
                          <td>108-114</td>
                          <td>58</td>
                          <td>54</td>
                          <td>63</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>6</th>
                          <td>115-119</td>
                          <td>60</td>
                          <td>55</td>
                          <td>66</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>7</th>
                          <td>120-125</td>
                          <td>62</td>
                          <td>56</td>
                          <td>69</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>8</th>
                          <td>126-131</td>
                          <td>64</td>
                          <td>57</td>
                          <td>72</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>9</th>
                          <td>132-137</td>
                          <td>67</td>
                          <td>58.5</td>
                          <td>75</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>10</th>
                          <td>138-142</td>
                          <td>70</td>
                          <td>60</td>
                          <td>78</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>11</th>
                          <td>143-147</td>
                          <td>73</td>
                          <td>61.5</td>
                          <td>81</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>12</th>
                          <td>148-154</td>
                          <td>76</td>
                          <td>63</td>
                          <td>84</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>13</th>
                          <td>155-161</td>
                          <td>79</td>
                          <td>64.5</td>
                          <td>87</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>14</th>
                          <td>162-165</td>
                          <td>82</td>
                          <td>66</td>
                          <td>90</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>15</th>
                          <td>166-168</td>
                          <td>85.5</td>
                          <td>68</td>
                          <td>93</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
            <div className="grid grid--space-y">
              <div className="grid grid__half--medium">
                  
                  <h3 className="text-caps font-graphic">Girls Footwear</h3>
                  <table className="table table--center table--border-cells table--zebra table--2-col" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark text-caps">
                        <tr>
                          <th>Size</th>
                          <th>Measurement (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <th>1</th>
                          <td>9.8</td>
                        </tr>
                        <tr>
                          <th>2</th>
                          <td>10.6</td>
                        </tr>
                        <tr>
                          <th>3</th>
                          <td>11.4</td>
                        </tr>
                        <tr>
                          <th>4</th>
                          <td>12.2</td>
                        </tr>
                        <tr>
                          <th>5</th>
                          <td>13</td>
                        </tr>
                        <tr>
                          <th>6</th>
                          <td>13.8</td>
                        </tr>
                        <tr>
                          <th>7</th>
                          <td>14.6</td>
                        </tr>
                        <tr>
                          <th>8</th>
                          <td>15.4</td>
                        </tr>
                        <tr>
                          <th>9</th>
                          <td>16.2</td>
                        </tr>
                        <tr>
                          <th>10</th>
                          <td>17</td>
                        </tr>
                        <tr>
                          <th>11</th>
                          <td>17.8</td>
                        </tr>
                        <tr>
                          <th>12</th>
                          <td>18.6</td>
                        </tr>
                        <tr>
                          <th>13</th>
                          <td>19.4</td>
                        </tr>
                        <tr>
                          <th>1</th>
                          <td>20.2</td>
                        </tr>
                        <tr>
                          <th>2</th>
                          <td>21.2</td>
                        </tr>
                        <tr>
                          <th>3</th>
                          <td>22</td>
                        </tr>
                        <tr>
                          <th>4</th>
                          <td>22.8</td>
                        </tr>
                        <tr>
                          <th>5</th>
                          <td>23.6</td>
                        </tr>
                        <tr>
                          <th>6</th>
                          <td>22.4</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
              <div className="grid grid__half--medium">
                  
                  <h3 className="text-caps font-graphic">Shoe Size Conversion</h3>
                  <table className="table table--center table--border-cells table--zebra table--3-col" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark text-caps">
                        <tr>
                          <th>UK/AUS</th>
                          <th>US</th>
                          <th>Europe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <th>8</th>
                          <td>9</td>
                          <td>25</td>
                        </tr>
                        <tr>
                          <th>8.5</th>
                          <td>9.5</td>
                          <td>26</td>
                        </tr>
                        <tr>
                          <th>9</th>
                          <td>10</td>
                          <td>27</td>
                        </tr>
                        <tr>
                          <th>10</th>
                          <td>11</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <th>11</th>
                          <td>12</td>
                          <td>29</td>
                        </tr>
                        <tr>
                          <th>11.5</th>
                          <td>12.5</td>
                          <td>30</td>
                        </tr>
                        <tr>
                          <th>12</th>
                          <td>13</td>
                          <td>31</td>
                        </tr>
                        <tr>
                          <th>13</th>
                          <td>1</td>
                          <td>32</td>
                        </tr>
                        <tr>
                          <th>1</th>
                          <td>2</td>
                          <td>33</td>
                        </tr>
                        <tr>
                          <th>2</th>
                          <td>2.5</td>
                          <td>34</td>
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
};

export default WoolworthsGirls;
