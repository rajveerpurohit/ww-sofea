import React from 'react';
import { Link } from 'react-router';

const CountryRoadBaby = () => {
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
      <div id="baby" className="cardFormWrapper grid-visible">
        <aside>
          <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
              <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                <span className="icon-text grid-hidden--medium">How to measure</span>
              </h4>
              <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                <div className="grid size-guide-measurements">
                    <h3 className="font-graphic text-caps grid-visible--medium">How to measure</h3>
                    <div className="grid counter">
                      <h4 className="font-graphic text-caps counter__increment counter__increment--black">Height</h4>
                      <p className="text-small">While your child is lying down, measure her from to top of her head to the bottom of her heel with her legs straight.</p>
                      <h4 className="font-graphic text-caps counter__increment counter__increment--black">Chest</h4>
                      <p className="text-small">Measured at the widest part of the chest. Pass the tape over the nipples, under the arms and around the neck.</p>
                      <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                      <p className="text-small">This is the natural waist (usually above the nappy line). Measure just above the hip bones.</p>
                      <h4 className="font-graphic text-caps counter__increment counter__increment--black">Hip</h4>
                      <p className="text-small">Measure at the fullest part of the lower body, over the buttocks (remember to measure with nappy on)</p>
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
              
              <h3 className="text-caps font-graphic">Babywear</h3>
              <div className="table-scroll table-scroll--x">
                <table className="table table-scroll__table table--border-cells table--center table--zebra" cellPadding="0" cellSpacing="0">
                    <thead className="table__head table__head--dark text-caps">
                      <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th className="no-wrap--ellipsis">Age Range (Months)</th>
                          <th>Height Range (cm)</th>
                          <th>Weight (kg)</th>
                          <th>Bust (cm)</th>
                          <th>Waist (cm)</th>
                          <th>Hip @ widest (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>PREM</th>
                          <td>Up to 50</td>
                          <td>Up to 2.5</td>
                          <td>34</td>
                          <td>33</td>
                          <td>33</td>
                      </tr>
                      <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>NEW BORN</th>
                          <td>51-56</td>
                          <td>2.5-4.5</td>
                          <td>37</td>
                          <td>36</td>
                          <td>36</td>
                      </tr>
                      <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>1-3</th>
                          <td>57-63</td>
                          <td>4-5.6</td>
                          <td>41</td>
                          <td>40</td>
                          <td>40</td>
                      </tr>
                      <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>3-6</th>
                          <td>64-70</td>
                          <td>6-8</td>
                          <td>44</td>
                          <td>43</td>
                          <td>44</td>
                      </tr>
                      <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>6-12</th>
                          <td>71-77</td>
                          <td>8-10</td>
                          <td>48</td>
                          <td>46</td>
                          <td>48</td>
                      </tr>
                      <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>12-18</th>
                          <td>78-83</td>
                          <td>10-12</td>
                          <td>50</td>
                          <td>48</td>
                          <td>50</td>
                      </tr>
                      <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>18-24</th>
                          <td>84-89</td>
                          <td>12-14</td>
                          <td>51</td>
                          <td>49</td>
                          <td>51</td>
                      </tr>
                    </tbody>
                </table>
              </div>
          </div>
          <div className="grid grid--space-y">
              <div className="grid grid__half--medium">
                
                <h3 className="text-caps font-graphic">Shoes</h3>
                <table className="table table--center table--border-cells table--zebra table--2-col" cellPadding="0" cellSpacing="0">
                    <thead className="table__head table__head--dark text-caps">
                      <tr>
                          <th>Size</th>
                          <th>Measurement (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td>1</td>
                          <td>9.8</td>
                      </tr>
                      <tr>
                          <td>2</td>
                          <td>10.6</td>
                      </tr>
                      <tr>
                          <td>3</td>
                          <td>11.4</td>
                      </tr>
                      <tr>
                          <td>4</td>
                          <td>12.2</td>
                      </tr>
                      <tr>
                          <td>5</td>
                          <td>13</td>
                      </tr>
                      <tr>
                          <td>6</td>
                          <td>13.8</td>
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

export default CountryRoadBaby;
