import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import DeliveryTo from '../../basic/delivering-to';
import ServiceUtil from '../../../services/serviceUtil';

class AccountsList extends Component {
    constructor(props){
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseListEnter = this.handleMouseListEnter.bind(this);
        this.handleMouseListLeave = this.handleMouseListLeave.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.state = {
          isHovering: false,
          isListHovering :  false
        };
    }
    handleMouseEnter() {
        this.setState({isHovering : true});
    }
    handleMouseListEnter() {
        this.setState({isListHovering : true});   
    }
    handleMouseListLeave() {
            this.setState({isListHovering: false})
    }
    handleMouseLeave() {
        setTimeout(() =>
            this.setState({
                isHovering : false
            })  
        , 500); 
    }
    onLogout(e) {
        e.preventDefault();
        this.props.logOut();
        if (typeof window !== 'undefined' && window){
            const setItem = localStorage.setItem( 'SelectedOption', 'Delivery Area ' );
             localStorage.setItem("logout", true);
            <DeliveryTo labels={this.props.labels} />
            // localStorage.removeItem("logout");
        }       
    }
    render() {
        const { user } = this.props;
        let liClass = 'fly-out fly-out--toggle-overlay-medium';
        let loginHeader = 
            <div className={ liClass }>
                <span className="text-xsmall main-header-nav__label"> {ServiceUtil.getLabel(this.props.labels, 'global-header-hello-signin')}</span>
                <Link data-js="fly-out-toggle" to="/login" className="fly-out__toggle nav-list-x__link link--silent">
                    <span className="icon icon--user-white inline-block-visible--mobi-max"></span>
                        <strong className="font-graphic text-small main-header-nav__title">{ServiceUtil.getLabel(this.props.labels, 'global-header-account-lists')}&nbsp;&nbsp;<span className="icon icon--down-circ-darkest"></span></strong>           
                </Link>
            </div>

        if(user.isLoggedIn) {
            if(this.state.isListHovering || this.state.isHovering)
                liClass += ' is-open child-is-open';
            loginHeader =                 
                <div className={ liClass } onMouseEnter={ this.handleMouseEnter } onMouseLeave={ this.handleMouseLeave }>
                    <span className="text-xsmall main-header-nav__label">Hello {user.userName}</span>
                    <Link to="" className="fly-out__toggle nav-list-x__link link--silent">
                        <span className="icon icon--user-white inline-block-visible--mobi-max"></span>
                        <strong className="font-graphic text-small main-header-nav__title">{ServiceUtil.getLabel(this.props.labels, 'global-header-account-lists')}&nbsp;&nbsp;<span className="icon icon--down-circ-darkest"></span></strong>
                    </Link>
                    <ul className="nav-list fly-out__content main-header-nav__profile-nav" onMouseEnter={this.handleMouseListEnter} onMouseLeave={this.handleMouseListLeave}>
                        <li className="nav-list__item">
                            <Link to="" className="nav-list__link link--silent">{ServiceUtil.getLabel(this.props.labels, 'global-header-account-details')}</Link>
                        </li>
                        <li className="nav-list__item">
                            <Link to="" className="nav-list__link link--silent">{ServiceUtil.getLabel(this.props.labels, 'global-header-my-orders')}</Link>
                        </li>
                        <li className="nav-list__item">
                            <Link to="" className="nav-list__link link--silent">{ServiceUtil.getLabel(this.props.labels, 'global-header-my-shopping-lists')}</Link>
                        </li>
                        <li className="nav-list__item">
                            <Link to="" className="nav-list__link link--silent" onClick={(e)=> this.onLogout(e) }>{ServiceUtil.getLabel(this.props.labels, 'global-header-signout')}</Link>
                        </li>
                    </ul>
                </div>
        }
        return(
            <li className={`nav-list-x__item main-header-nav__item main-header-nav__profile`}>
                {loginHeader}
            </li>
        );
    }
}

export default AccountsList;