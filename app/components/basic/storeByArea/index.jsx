import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import SearchByArea from '../searchByArea';
//import ServiceUtil from '../../../services/serviceUtil';
import { bindActionCreators } from 'redux';
import { getDeliveryArea } from '../../compound/deliveryDetails/actions';

class StoreByArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
			firstSuburb : 'default'
            //updateVal: this.getLocalStorage(),
          //  modalActive: false
        };
   }

    renderDeleveryModel() {
        if (this.props.DeliverAreaData) {
            return <SearchByArea provienceData={this.props.DeliverAreaData} update={this.props.update}/>;
        }
    }

    render() {
                return (
                    <div>
						<h2 className="text-caps font-graphic">Find a Store by area</h2>
                        {this.renderDeleveryModel()}
						{console.log('this.state.firstSuburb======'+this.state.firstSuburb)}
                    </div>
				)

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
export default connect(mapStateToProps, matchDispatchToProps)(StoreByArea);

