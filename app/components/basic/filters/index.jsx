import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';


export default class Filters extends Component {
constructor(props) {
    super(props);
    this.state = {

    };
}
render() {
    return (
      <div className="product-list__filters">
        {/* CATEGORY LIST */}
        {/* CATEGORY LIST */}
        <div className="accordion accordion--chrome" data-js="accordion" data-accordion-start="first-open" data-accordion-type="open-single" data-accordion-active="true">
          <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
            <h4 className="text-caps accordion__toggle--chrome accordion__toggle--line accordion__toggle" data-js="accordion-toggle">
            Shop Milk, Dairy &amp; Eggs
         </h4>
            <ul className="list--silent text-small accordion__content--chrome accordion__content" data-js="accordion-content">
              <li>
                <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_On_Promotion" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZxtznwk'; return true;" />
                <label htmlFor="fldLabelFilter_On_Promotion" className="on-promotion nav-list__link--filter label-checkbox"><span className="nav-list__qnty">(109)</span>On Promotion</label>
              </li>
              <li><a href="/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/Cheese/_/N-1z13sif" className="nav-list__link--filter"><span className="nav-list__qnty">(191)</span>Cheese</a></li>
              <li><a href="/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/Yoghurt/_/N-1z13si0" className="nav-list__link--filter"><span className="nav-list__qnty">(90)</span>Yoghurt</a></li>
              <li><a href="/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/Milk/_/N-1mgbfmf" className="nav-list__link--filter"><span className="nav-list__qnty">(38)</span>Milk</a></li>
              <li><a href="/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/Dairy-Drinks/_/N-1z13shs" className="nav-list__link--filter"><span className="nav-list__qnty">(54)</span>Dairy Drinks</a></li>
              <li><a href="/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/Butter-Margarine/_/N-1z13sig" className="nav-list__link--filter"><span className="nav-list__qnty">(28)</span>Butter &amp; Margarine</a></li>
              <li><a href="/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/Dairy-Alternatives-Lactose-Free/_/N-1z13sht" className="nav-list__link--filter"><span className="nav-list__qnty">(27)</span>Dairy Alternatives &amp; Lactose Free</a></li>
              <li><a href="/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/Eggs/_/N-1z13si7" className="nav-list__link--filter"><span className="nav-list__qnty">(13)</span>Eggs</a></li>
              <li><a href="/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/Cream/_/N-1z13si6" className="nav-list__link--filter"><span className="nav-list__qnty">(13)</span>Cream</a></li>
              <li><a href="/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/Buttermilk-Maas/_/N-16oqfxp" className="nav-list__link--filter"><span className="nav-list__qnty">(3)</span>Buttermilk &amp; Maas</a></li>
            </ul>
          </div>
        </div>
        {/* END CATEGORY LIST */}
        {/* FILTERS */}
        {/* CATEGORY FILTER COLOURS LIST */}
        <div className="accordion accordion--chrome accordion--group" data-js="accordion" data-accordion-start="all-closed" data-accordion-type="open-single" data-accordion-group="filter-results" data-accordion-active="true">
          <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
            <h4 className="accordion__toggle--chrome accordion__toggle is-collapsed" data-js="accordion-toggle">Lifestyle and Dietary</h4>
            <div className="accordion__content--chrome accordion__content is-collapsed" data-js="accordion-content">
              <ul className="list--silent text-small">
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Woolies_Brand" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ2bhk52'; return true;" />
                  <label htmlFor="fldLabelFilter_Woolies_Brand" className="label-checkbox">Woolies Brand</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Halaal" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ1lhf3g5'; return true;" />
                  <label htmlFor="fldLabelFilter_Halaal" className="label-checkbox">Halaal</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Vegetarian_with_Milk" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZegsycd'; return true;" />
                  <label htmlFor="fldLabelFilter_Vegetarian_with_Milk" className="label-checkbox">Vegetarian with Milk</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Kosher" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ22j34t'; return true;" />
                  <label htmlFor="fldLabelFilter_Kosher" className="label-checkbox">Kosher</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Low_Fat,_Reduced_Fat_and_Lean" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZc8gayz'; return true;" />
                  <label htmlFor="fldLabelFilter_Low_Fat,_Reduced_Fat_and_Lean" className="label-checkbox">Low Fat, Reduced Fat and Lean</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Full_Cream" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZtoib5o'; return true;" />
                  <label htmlFor="fldLabelFilter_Full_Cream" className="label-checkbox">Full Cream</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Brands" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZmiq5ul'; return true;" />
                  <label htmlFor="fldLabelFilter_Brands" className="label-checkbox">Brands</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Vitality" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZmnrhcl'; return true;" />
                  <label htmlFor="fldLabelFilter_Vitality" className="label-checkbox">Vitality</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Fat_Free" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZcleryq'; return true;" />
                  <label htmlFor="fldLabelFilter_Fat_Free" className="label-checkbox">Fat Free</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Organic" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ7wy3p5'; return true;" />
                  <label htmlFor="fldLabelFilter_Organic" className="label-checkbox">Organic</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_kJ_Controlled" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ1bllk9d'; return true;" />
                  <label htmlFor="fldLabelFilter_kJ_Controlled" className="label-checkbox">kJ Controlled</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Free_Range" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZf15zln'; return true;" />
                  <label htmlFor="fldLabelFilter_Free_Range" className="label-checkbox">Free Range</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Vegan" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZczv6t0'; return true;" />
                  <label htmlFor="fldLabelFilter_Vegan" className="label-checkbox">Vegan</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Gluten_Free" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ3qnqdh'; return true;" />
                  <label htmlFor="fldLabelFilter_Gluten_Free" className="label-checkbox">Gluten Free</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Lactose_Free" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ2anbb6'; return true;" />
                  <label htmlFor="fldLabelFilter_Lactose_Free" className="label-checkbox">Lactose Free</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Vegetarian" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZsiypnp'; return true;" />
                  <label htmlFor="fldLabelFilter_Vegetarian" className="label-checkbox">Vegetarian</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Portion_Controlled" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ1m5zcy3'; return true;" />
                  <label htmlFor="fldLabelFilter_Portion_Controlled" className="label-checkbox">Portion Controlled</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_High_Protein" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ17sfyq3'; return true;" />
                  <label htmlFor="fldLabelFilter_High_Protein" className="label-checkbox">High Protein</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Vegetarian_with_Eggs" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ14nr6yt'; return true;" />
                  <label htmlFor="fldLabelFilter_Vegetarian_with_Eggs" className="label-checkbox">Vegetarian with Eggs</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_Vegetarian_with_Milk_and_Honey" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZ14ik364'; return true;" />
                  <label htmlFor="fldLabelFilter_Vegetarian_with_Milk_and_Honey" className="label-checkbox">Vegetarian with Milk and Honey</label>
                </li>
                <li className="nav-list__item">
                  <input type="checkbox" className="enhanced-checkbox is-enhanced" name="checkbox-set" id="fldLabelFilter_No_Sugar_Added" onClick="window.location='/store/cat/Food/Fresh-Food/Milk-Dairy-Eggs/_/N-1z13sihZb51ih3'; return true;" />
                  <label htmlFor="fldLabelFilter_No_Sugar_Added" className="label-checkbox">No Sugar Added</label>
                </li>
              </ul>
            </div>
          </div>
          {/* /.accordion__segment--chrome */}
        </div>
        {/* /.accordion */}
        {/* END CATEGORY FILTER COLOURS LIST */}
        {/* END FILTERS */}
      </div>
);
}
}
