import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';

export default class DeleverySlotModel extends Component {
  
  render() {  
    return (
            <div>
              <AriaModal titleText="deliverySlot" onExit={this.props.deactivateModal}> 
                <div className="modal__box modal__box--panel modal__box--size-w-large" data-js="modal-box" tabIndex="0" style={{marginBottom: "20px", top: "20px"}}>
                <a href="#" className="icon icon--close-circ-dark modal__close" onClick={this.props.deactivateModal}>close</a>
                    <div className="heading heading--3 font-graphic modal__head" data-js="modal-head">Select your delivery location</div>  
                    <div className="modal__content">
                      <form>
                          <div className="form-field">
                            <input type="text" placeholder="Address nickname*" />
                          </div>
                          <div className="form-field">
                            <input type="text" placeholder="Recipient name*" />
                          </div>
                          <div className="form-field">
                            <input type="text" placeholder="Address line 1*" />
                          </div>
                          <div className="form-field">
                            <input type="text" placeholder="Address line 2" />
                          </div>
                          <div className="form-field">
                            <span className="enhanced-select"><select id="select-example" name="select-example" data-js="enhance-select">
                                <option value={1}>Western Cape</option>
                                <option value={2}>Gauteng</option>
                                <option value={3}>Eastern Cape</option>
                              </select><span className="enhanced-select__label">Western Cape&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                          </div>
                          <div className="form-field">
                            <span className="enhanced-select"><select id="select-example-2" name="select-example-2" data-js="enhance-select">
                                <option value={1}>Tamboerskloof</option>
                                <option value={2}>Gardens</option>
                                <option value={3}>Vredehoek</option>
                              </select><span className="enhanced-select__label">Tamboerskloof&nbsp;</span><span className="icon enhanced-select__icon" /></span>
                          </div>
                          <div className="form-field">
                            <input type="tel" placeholder="Post code" />
                          </div>
                          <div className="form-field">
                            <input type="text" placeholder="Additional contact" />
                          </div>
                          <div className="form-field">
                            <p className="text-small strong">* Required fields</p>
                            <hr />
                          </div>
                          <div className="form-field">
                            <button type="submit" className="btn btn--primary btn--right">Save new address</button>
                          </div>
                        </form>
                        <p className="text-small">
                          Your delivery time slot will be reserved for 60 minutes once you have chosen to reserve it.
                        </p>  
                    </div>
                </div>  
              </AriaModal>
            </div>
    )
  }
}
