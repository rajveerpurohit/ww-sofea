import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const DeliveryProvince = ({ deliveryArea, deliveryLocation}) => {
    return (<div id="provinceSuburbContainer" name="provinceSuburbContainer" className="form-field">
                <div className="form-field">
                    <span className="enhanced-select">
                        <select id="select-example" name="select-example" data-js="enhance-select">
                            <option value={1}>Western Cape</option>
                            <option value={2}>Gauteng</option>
                            <option value={3}>Eastern Cape</option>
                        </select>
                    <span className="enhanced-select__label">{ deliveryLocation.province || 'Select a Province'}&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                </div>
            <div className="form-field">
                <span className="enhanced-select">
                <select id="select-example-2" name="select-example-2" data-js="enhance-select">
                    <option value={1}>Tamboerskloof</option>
                    <option value={2}>Gardens</option>
                    <option value={3}>Vredehoek</option>
                </select>
                <span className="enhanced-select__label">{ deliveryLocation.suburb }&nbsp;</span>
                <span className="icon enhanced-select__icon" /></span>
        </div>
        <section id="delivery-location-message"></section>
    </div>)
};