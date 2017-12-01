import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import DeleverySlotModel from '../delivery-slot-modal';


export default class DeliverySlotTo extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalActive: false     
        }       
        this.activateModal = this.activateModal.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
        this.callback = this.callback.bind(this);
    }
    activateModal(){
        
        this.setState({
            modalActive : true
        });
    }
    deactivateModal(){
        this.setState({
                modalActive : false
            });
    }

    callback(event){
    }

    renderDeleveryModel() {
        if (this.state.modalActive) {
            return <DeleverySlotModel updateProps={this.updateValuefun} modalActive deactivateModal={this.deactivateModal} updateVal={this.state.updateVal} /> 
        } 
    }
    render() {
        return(
            <li className="nav-list-x__item main-header-nav__item main-header-nav__item--foot-mobi main-header-nav__item-delivery">
                <span className="text-xsmall main-header-nav__label">Reserve a</span>
                <a href="#" className="nav-list-x__link link--silent" >
                <strong className="font-graphic text-small main-header-nav__title">Delivery Slot&nbsp;&nbsp;
                    <span className="icon icon--down-circ-darkest" onClick={()=>{this.activateModal();}}/>
                </strong>
                </a>
                <input type="hidden" defaultValue="false" id="hasReservation" />
                <input type="hidden" defaultValue="false" id="mustRemind" />
                <input type="hidden" defaultValue="false" id="mustAutoRemind" />
                {this.renderDeleveryModel()}
            </li>
        );
    }
}   
  