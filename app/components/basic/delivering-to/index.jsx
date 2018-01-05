import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import DeleveryModel from '../delevery-model';
import ServiceUtil from '../../../services/serviceUtil';
import { bindActionCreators } from 'redux';
import { getDeliveryArea } from '../../compound/deliveryDetails/actions';

class DeliveryTo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updateVal: this.getLocalStorage(),
            modalActive: false
        };
        this.updateValuefun = this.updateValuefun.bind(this);
        this.activateModal = this.activateModal.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
        this.getLocalStorage = this.getLocalStorage.bind(this);
    }

    getLocalStorage() {
        if (typeof window !== 'undefined' && window) {
            return localStorage.getItem('SelectedOption') || 'Delivery Area ';
        }
    }
    updateValuefun(getVal) {
        this.setState({
            updateVal: getVal
        });
    }
    activateModal() {
        this.setState({
            modalActive: true
        });
        // this.props.getDeliveryArea();
    }
    deactivateModal() {
        this.setState({
            modalActive: false
        });
    }

    renderDeleveryModel() {
        if (this.state.modalActive && this.props.DeliverAreaData) {
            return <DeleveryModel updateProps={this.updateValuefun} modalActive deactivateModal={this.deactivateModal} updateVal={this.state.updateVal} provienceData={this.props.DeliverAreaData} deliveryDetails={this.props.deliveryDetails} />;
        }
    }

    render() {
        const deliveryLocation = this.props.deliveryDetails.deliveryLocation;

            if (!deliveryLocation.suburbId) {
                return (
                    <li className="nav-list-x__item main-header-nav__item main-header-nav__item--foot-mobi main-header-nav__item-address">
                        <span className="text-xsmall main-header-nav__label" >{ServiceUtil.getLabel(this.props.labels, 'global-header-delivering-to')}</span>
                        <Link to="" className="nav-list-x__link link--silent aria-modal-link" data-js="modal-toggle">
                            <strong className="font-graphic text-small main-header-nav__title" >Delivery Area &nbsp;
                <span className="icon icon--down-circ-darkest test" onClick={this.activateModal} />
                            </strong>
                        </Link>
                        {this.renderDeleveryModel()}
                    </li>

                );
            } else {
                return (
                    <li className="nav-list-x__item main-header-nav__item main-header-nav__item--foot-mobi main-header-nav__item-address">
                        <span className="text-xsmall main-header-nav__label" >{ServiceUtil.getLabel(this.props.labels, 'global-header-delivering-to')}</span>
                        <Link to="" className="nav-list-x__link link--silent aria-modal-link" data-js="modal-toggle">
                            <strong className="font-graphic text-small main-header-nav__title" >{this.state.updateVal} &nbsp;
                <span className="icon icon--down-circ-darkest test" onClick={this.activateModal} />
                            </strong>
                        </Link>
                        {this.renderDeleveryModel()}
                    </li>

                );
            }
    }
}
const mapStateToProps = (state) => {
    return {
        DeliverAreaData: state.deliveryDetails.deliveryArea
    };
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ getDeliveryArea }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(DeliveryTo);

