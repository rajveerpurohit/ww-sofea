import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import SideBarComponent from '../../components/basic/SideBarContent';
import StoreByArea from '../../components/basic/storeByArea';
import StoreByGeoLocation from '../../components/basic/storeByGeoLocation';
import StoreList from '../../components/basic/storeList';
import Panels from '../../components/basic/panels';
import {getStoreLocator} from './actions';
import {getStoreList, getLocationStoreList, getEmptyStoreList} from '../../components/basic/storeList/actions';
import './storelocator.scss';

class StoreLocator extends Component {

  static need = [
    getStoreLocator
  ]
  
  constructor(props) {
    super(props);
	this.state = {
      data: 'none'
    }
    this.updateState = this.updateState.bind(this);
    this.primeComponent = this.primeComponent.bind(this);
	this.hideList = this.hideList.bind(this);
	this.displayList = this.displayList.bind(this);
	this.initGeolocation = this.initGeolocation.bind(this);
	this.success = this.success.bind(this);
	this.fail = this.fail.bind(this);
  }

  updateState(who) {
    this.setState({data: `${who}`})
  }
  
  
  componentDidMount() {
  }
  	 initGeolocation()
     {
        if( navigator.geolocation )
        {
           // Call getCurrentPosition with success and failure callbacks
           navigator.geolocation.getCurrentPosition( this.success, this.fail );
        }
        else
        {
			//console.log(' your browser does not support geolocation services.');
           alert("Sorry, your browser does not support geolocation services.");
        }
     }
	 fail()
     {

		   console.log(' your browser does not support geolocation services.');
           alert("Sorry, your browser does not support geolocation services.");
     }
	 
	success(position)
     {

         document.getElementById('longitude').value = position.coords.longitude;
         document.getElementById('latitude').value = position.coords.latitude;
		// console.log('longitude='+document.getElementById('longitude').value);
		// console.log('latitude='+document.getElementById('latitude').value);
     }
	 
	hideList(){
		this.setState({...this.state,data:'none'})
		this.props.getEmptyStoreList();
		document.getElementById('searchListSection').hidden=true;
		document.getElementById('searchSection').hidden=false;
	}
	displayList(event,search){
		const suburbParams = {
          suburbId: this.state.data,
		  distance: "50"
		};
		
		
		
		const geoLocationParams = {
          //latitude: "-29.08813",
          //longitude: "26.21266417",
		  latitude: document.getElementById('latitude').value,
          longitude: document.getElementById('longitude').value,
          distance: "50"
		};

		// filter params 
		document.getElementById('filterKMS').value="5";
		document.getElementById('filterDays').value="";
		document.getElementById('filterDepts').value="";
		document.getElementById('filterBrands').value="";
		
		if(search == 'area'){
			this.props.getStoreList(suburbParams);
		}else if(search == 'geo'){
			this.props.getLocationStoreList(geoLocationParams);
		}
		
		document.getElementById('searchListSection').hidden=false;
		document.getElementById('searchSection').hidden=true;

	}
    
	primeComponent() {
    return (
      <div>
				<input type="hidden" id="filterBrands" default="" />
				<input type="hidden" id="filterKMS" default="5" />	
				<input type="hidden" id="filterDays" default="" />	
				<input type="hidden" id="filterDepts" default="" />				
      <div className="grid-wrapper site-page content--centered">
        <main className="grid grid--space-y site-main">
          <div className="main-page ">
           
            <nav className="breadcrumb empty" />
            <input type="hidden" defaultValue="#" id="referer_url" />
            <div className="grid grid--space-y page-layout">
                <div className="page-layout__aside">
					{ this.props.contentAside && <SideBarComponent leftData={this.props.contentAside} />}
				</div>
               <div className="page-layout__content">					
						<div id="searchSection">
							<div className="grid grid--space-y">
							  <header>
								<h1 className="text-caps font-graphic">Store Locator</h1>
							  </header>
									 <article className="findAStore grid">  
										<div className="grid grid__half--medium">
											<section className="findAStoreNearMe" style={{width: '60%'}}>
												{	<StoreByGeoLocation /> }

														<div className="form-field storeRadiusButton" data-js="form-field">
																				<a className="button btn btn--primary" id="findKMSubmit" href="#" onClick={(e)=>{this.displayList(e,'geo')}}>show nearby Store</a> </div>		
														
											</section>
										</div>
											<section className="or">
												<strong>Or</strong>
												<span></span>
											</section>
										<div className="grid grid__fourth--medium">
											<section className="findAStoreByArea" style={{width: '100%'}}>		
												{	<StoreByArea update={this.updateState} /> }
													<div className="storeInMyAreaButton">
														<a className="button btn btn--primary" id="findStoresSubmit" href="#" onClick={(e)=>{this.displayList(e,'area')}}>show Store by area</a> 
													</div> 
											</section>
										</div>
									</article>
							</div>
						</div>
						<div id="searchListSection" hidden={true}>		
												<StoreList storeLocatorDisplay={this.hideList} subId = {this.state.data}/>
						</div>
				</div>
        </div>
		</div>
      </main>
  		</div>
		</div>
    );
  }
    render() {
    return (
      <div>
        {this.primeComponent()}
		 {this.initGeolocation()}
      </div>
	  );
  }
 }

const mapStateToProps = (state) => {
  return {
	contentAside: state.storeLocatorReducer.contentAside
    };
};

const matchDispatchToProps = (dispatch) => {
  return {
		getStoreList: (suburbParams) => {dispatch(getStoreList(suburbParams))},
		getLocationStoreList: (geoLocationParams) => {dispatch(getLocationStoreList(geoLocationParams))},
		getEmptyStoreList: () => {dispatch(getEmptyStoreList())}
		}
};

export default connect(mapStateToProps, matchDispatchToProps)(StoreLocator);