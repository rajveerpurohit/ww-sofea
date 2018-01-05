import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import DeleverySlotModel from '../delivery-slot-modal';
import ServiceUtil from '../../../services/serviceUtil';

export default class DeliverySlotTo extends Component {
    constructor(props){
        super(props);       
        this.activateModal = this.activateModal.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
    }
    activateModal(){
        this.props.loader(true);
        this.props.getUserAddresses()
        .then(() => {
            this.props.loader(false);
            this.props.modal(true);
        });
    }
    deactivateModal(){
        this.props.modal(false);
    }

    renderDeleveryModel() {
        if (this.props.common.modal) {
            return <DeleverySlotModel modalActive deactivateModal={this.deactivateModal} {...this.props} /> 
        } 
    }
    render() {
        return (
            <li className="nav-list-x__item main-header-nav__item main-header-nav__item--foot-mobi main-header-nav__item-delivery">
                <span className="text-xsmall main-header-nav__label">{ServiceUtil.getLabel(this.props.logoLabel, 'global-header-reserve')}</span>
                <Link to="" className="nav-list-x__link link--silent" >
                <strong className="font-graphic text-small main-header-nav__title">Delivery Slot&nbsp;&nbsp;
                    <span className="icon icon--down-circ-darkest" onClick={()=>{this.activateModal();}}/>
                </strong>
                </Link>
                <input type="hidden" defaultValue="false" id="hasReservation" />
                <input type="hidden" defaultValue="false" id="mustRemind" />
                <input type="hidden" defaultValue="false" id="mustAutoRemind" />
                {this.renderDeleveryModel()}
            </li>
        );
    }
}   
  