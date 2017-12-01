import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import DeleveryModel from '../delevery-model';

class DeliveryTo extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateVal: this.getLocalStorage(),
            modalActive: false            
        }
        this.updateValuefun  = this.updateValuefun.bind(this);
        this.activateModal = this.activateModal.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
        this.callback = this.callback.bind(this);
        this.getLocalStorage = this.getLocalStorage.bind(this);
    }
    getLocalStorage(){
        if (typeof window !== 'undefined' && window){
        return localStorage.getItem( 'SelectedOption' ) || "Delivery Area "
      }
    }
    updateValuefun(getVal) {
        this.setState({
            updateVal : getVal
        });
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
            return <DeleveryModel updateProps={this.updateValuefun} modalActive deactivateModal={this.deactivateModal} updateVal={this.state.updateVal} /> 
        }
        
    }
    render() {
        return(
            <li className="nav-list-x__item main-header-nav__item main-header-nav__item--foot-mobi main-header-nav__item-address">
                    <span className="text-xsmall main-header-nav__label">Delivering to</span>
                    <a href="#" className="nav-list-x__link link--silent" data-js="modal-toggle" >
                        <strong className="font-graphic text-small main-header-nav__title">{this.state.updateVal} &nbsp;
                            <span className="icon icon--down-circ-darkest test" onClick={this.activateModal}></span>
                        </strong>                        
                    </a>                  
                {this.renderDeleveryModel()}                   
            </li>
        
        );
    }
}   


export default DeliveryTo;                    