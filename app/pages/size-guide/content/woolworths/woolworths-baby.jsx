import React from 'react';
import { Link } from 'react-router';

const WoolworthsBaby = () => {
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
      <div id="baby" className="grid-visible">
        <aside>
            <div className="accordion__segment--chrome accordion__segment is-collapsed" data-js="accordion-segment">
              <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">
                  <span className="icon-text grid-hidden--medium">How to measure</span>
              </h4>
              <div data-js="accordion-content" className="accordion__content--chrome accordion__content is-collapsed">
                  <div className="grid size-guide-measurements">
                    <h3 className="font-graphic text-caps grid-visible--medium">How to measure</h3>
                    <div className="grid counter">
                        <h4 className="font-graphic text-caps counter__increment counter__increment--black">Height (Length)</h4>
                        <p className="text-small">While your child is lying down, measure her from to top of her head to the bottom of her heel with her legs straight.</p>
                        <h4 className="font-graphic text-caps counter__increment counter__increment--black">Bust (Chest)</h4>
                        <p className="text-small">Measured at the widest part of the chest. Pass the tape over the nipples, under the arms and around the back.</p>
                        <h4 className="font-graphic text-caps counter__increment counter__increment--black">Waist</h4>
                        <p className="text-small">This is the natural waist (usually above the nappy line). Measure just above the hip bones.</p>
                        <h4 className="font-graphic text-caps counter__increment counter__increment--black">Hip</h4>
                        <p className="text-small">Measure at the fullest part of the lower body, over the buttocks</p>
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
                  <table className="table table-scroll__table table--border-cells table--center table--zebra" cellpadding="0" cellspacing="0">
                    <thead className="table__head table__head--dark text-caps">
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>Age Range</th>
                          <th>Height Range (cm)</th>
                          <th>Weight (kg)</th>
                          <th>Bust (cm)</th>
                          <th>Waist (cm)</th>
                          <th>Hip @ Widest (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>PREM</th>
                          <td>UP to 50</td>
                          <td>UP to 2.5</td>
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
                          <th>1-3 (MONTHS)</th>
                          <td>57-63</td>
                          <td>4.5-6</td>
                          <td>41</td>
                          <td>40</td>
                          <td>40</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>3-6 (MONTHS)</th>
                          <td>64-70</td>
                          <td>6-8</td>
                          <td>44</td>
                          <td>43</td>
                          <td>44</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>6-12 (MONTHS)</th>
                          <td>71-79</td>
                          <td>8-10</td>
                          <td>48</td>
                          <td>47</td>
                          <td>49</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>12-18 (MONTHS)</th>
                          <td>80-86</td>
                          <td>10-12</td>
                          <td>50</td>
                          <td>49</td>
                          <td>52</td>
                        </tr>
                        <tr className="table-scroll__row table-scroll__row--sticky table-scroll__row--sticky-narrow">
                          <th>18-24 (MONTHS)</th>
                          <td>87-89</td>
                          <td>12-13</td>
                          <td>52</td>
                          <td>51</td>
                          <td>54</td>
                        </tr>
                    </tbody>
                  </table>
              </div>
            </div>
            <div className="grid grid--space-y">
              <div className="grid grid__half--medium">
                  
                  <h3 className="text-caps font-graphic">Baby Footwear</h3>
                  <table cellpadding="0" cellspacing="0" className="table table--center table--border-cells table--zebra table--2-col">
                    <thead className="table__head table__head--dark text-caps text-caps">
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

export default WoolworthsBaby;
