import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {getUtility} from './actions';
import { getTokenConfirmation } from '../../compound/get-token/actions';

class TopHeader extends Component {

    constructor(props) {
      super(props);
      this.createNavData = this.createNavData.bind(this);
    }

    componentDidMount() {
      this.props.getUtility();
      // Checks if the session object is present or not in Redux store
  
    }

    createNavData(getLinkData) {
        return getLinkData.map((item, index) => {
           return (
             <Link key={index} to={item.targetUrl} title={item.name} className="wfs-nav-item">
               <span className={`icon ${item.categoryCSS}`} />
               <span className="text-space">{item.name}</span>
             </Link>
           );
        });
    }

    render() {
        const stateData = this.props.topHeaderData;
        return (
          <div className="site-header__wfs" >
            <div className="grid content--centered">
              <nav className="wfs-nav wfs-nav--links float-l">
                {stateData ? this.createNavData(stateData.left) : null }
              </nav>
              <div className="wfs-nav wfs-nav--values float-r">
                {stateData ? this.createNavData(stateData.right) : null}
              </div>
            </div>
          </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        topHeaderData: state.utilityReducer.utilityData,
        sessConf: state.sessConf
      };
};

  const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({getUtility, getTokenConfirmation}, dispatch);
  };

  export default connect(mapStateToProps, matchDispatchToProps)(TopHeader);
