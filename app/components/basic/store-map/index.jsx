import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
 
const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
    let startLatitude = -33.92919833;
  let startLongitude = 18.41091111;
let mapDataList;

  if(props.markers!=null && props.markers[0]!=null) {
  				mapDataList = props.markers;
				startLatitude = mapDataList[0].latitude;
				startLongitude = mapDataList[0].longitude;

				var found = false;
				var distance = props.distance;
				var days = props.days;
				var departments = props.departments;
				var brands = props.brands;
				
				var daySearchExists = false;
				var daySearchCount = 0;
				var daySearchArray = [];
				if(days!=null && days.trim().length>3){
					daySearchExists = true;
					let countObj = days.match(/,day=/g);
					if(countObj!=null) {
						daySearchCount = countObj.length
					}
					daySearchArray = days.split(",day=");
				}


				var deptSearchExists = false;
				var deptSearchCount = 0;
				var deptSearchArray = [];
				var allCount = 0;
				if(departments!=null && departments.trim().length>3){
					let countObj = departments.match(/,dept=All/g);
					if(countObj!=null) {
						allCount = countObj.length
					}
					if(allCount==1){
					
					} else{
						deptSearchExists = true;
						countObj = departments.match(/,dept=/g).length
						if(countObj!=null) {
							deptSearchCount = countObj.length
						}
						deptSearchArray = departments.split(",dept=");
					}
				}

				var brandSearchExists = false;
				var brandSearchCount = 0;
				var brandSearchArray = [];
				if(brands!=null && brands.trim().length>3){
					brandSearchExists = true;
					let countObj = brands.match(/,brand=/g).length
					if(countObj!=null) {
						brandSearchCount = countObj.length
					}
					brandSearchArray = brands.split(",brand=");
				}
				
							var count = 0;
	
  }
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: -33.92919833, lng: 18.41091111 }} mapTypeId= {google.maps.MapTypeId.ROADMAP}>
      {props.markers.map(marker => {
         // console.log('this.props.chooseDistance='+props.chooseDistance+',marker.distance='+marker.distance)
        if(eval(props.chooseDistance)>=eval(marker.distance)){
           // console.log('this.props.chooseDistance='+props.chooseDistance+',marker.distance='+marker.distance)
            if((!daySearchExists && !deptSearchExists && !brandSearchExists) || 
                (daySearchExists && deptSearchExists && brandSearchExists && this.checkForDay(item,daySearchArray) && this.checkForDept(item,deptSearchArray) && this.checkForBrand(item,brandSearchArray)) || 
                (daySearchExists && deptSearchExists && this.checkForDay(item,daySearchArray) && this.checkForDept(item,deptSearchArray)) || 
                (daySearchExists && brandSearchExists && this.checkForDay(item,daySearchArray) && this.checkForBrand(item,brandSearchArray)) ||
                (deptSearchExists && brandSearchExists && this.checkForDept(item,deptSearchArray) && this.checkForBrand(item,brandSearchArray)) ||
                (daySearchExists && this.checkForDay(item,daySearchArray)) ||
                (deptSearchExists && this.checkForDept(item,deptSearchArray)) ||
                (brandSearchExists && this.checkForBrand(item,brandSearchArray))) {
                    const onClick = props.onClick.bind(this, marker)
                    return (
                    <Marker
                        key={marker.storeId}
                        onClick={onClick}
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                        icon = {new google.maps.MarkerImage("https://www.woolworths.co.za/images/icons/map_marker.png", new google.maps.Size(35, 50), new google.maps.Point(0, 0))}
                    >
                        {props.selectedMarker === marker &&
                        <InfoWindow>
                            <div>
                            {   
                                props.storeLabelDetails("longLat" , marker)
                            }
                            </div>
                        </InfoWindow>}
                        }
                    </Marker>
                    )//end of return
            }// end of if for search
         }// end of if
      })}
    </GoogleMap>
  )
})
 
class StoreMap extends Component {
  constructor(props) {
    super(props)
   // console.log('Inside StoreMap..............................chooseDistance='+this.props.chooseDistance)
    this.state = {
      shelters: [],
      selectedMarker: false,
      chooseDistance: 5
    }
  }

storeLabelDetails(searchType , item) {
            if(item.storeAddress == "" || typeof item.storeAddress == "undefined" )	{
            var storeAddress = "N/A"; 
            }
            else {
            var storeAddress = item.storeAddress;
            
            storeAddress = storeAddress.replace(/TBC/g,'');
            storeAddress = storeAddress.replace(/null/g,'');
            storeAddress = storeAddress.replace(/,,/g,',');
            
            if(item.phoneNumber == "" || typeof item.phoneNumber == "undefined" )	{
                var phoneNumber = "N/A"; 
            }
            else {
                var phoneNumber = item.phoneNumber;
            }
            

            if(item.openingHours == "" || typeof item.openingHours == "undefined" )	{
                var openingHours = "N/A"; 
            }
            else {
                var openingHours = item.openingHours; 

            }

            if(item.departments == "" || typeof item.departments == "undefined" )	{
                var departments = "N/A"; 
            }
            else {
                var departments = item.departments; 
            }
            
            if(item.distance == "" || typeof item.distance == "undefined" )	{
                var distance = "N/A"; 
            }
            else {
                var distance = item.distance + "km"; 
            }
            var storeHTML = this.createStoreHTML (item.storeName, phoneNumber, storeAddress, openingHours, departments, distance);
            return storeHTML;
            }
}
	
 createStoreHTML ( storeName, storePhone, storeAddress, openingHours, departments, storeDistance) {
            var allStoreFilter = "All";
            if ( openingHours != "N/A" ) {
                var allOpeningHours = '';
                var todayHours = '';
                var seasonal = false;
                for(let i=0;i<openingHours.length;i++) {
                    var item = openingHours[i];
                    var hours = item.hours;
                    var day = item.day;
                    //console.log('Inside opening hours 1a');
                    if (hours == 'undefined' || hours == '') {
                        hours = 'N/A';
                    }

                    if (hours != 'CLOSED' && hours != 'N/A' && hours != '' && hours != 'undefined')
                    {
                        
                    }
                    if (item.exception == 'true') {
                        allOpeningHours = allOpeningHours + '<li class="highlightPink">' + day + '* <span>' + hours + '</span></li>';
                        seasonal = true;
                    } else{
                        if (i == 0)
                            todayHours = 'Today ' + hours + ' ';
                        else
                            allOpeningHours = allOpeningHours + ' ' +day + ' ' + hours ;
                    }
                }
                if (seasonal) {
                    //console.log('Inside opening hours 4');
                    allOpeningHours = allOpeningHours + '<li><span class="highlightPink seasonalHours">*Seasonal hours</span></li>'
                }

            }	

            if ( departments != "N/A" ) {
            
                var alldepartments= "";
                var allBrands = "";
                var deptExists = false;
                var brandExists = false;
                for(let j=0;j<departments.length;j++) {
                    var item = departments[j];

                    if (item == 'Mimco' || item == 'Witchery' || item == 'Country Road' || item == 'Trenery' ) {
                        allBrands = allBrands + ' '+item+' ';
                        brandExists = true;
                    }
                    else {
                        alldepartments = alldepartments + ' '+item+' ';
                        deptExists = true;
                    }
                    if(item!=null){
                    //	allStoreFilter = allStoreFilter + " " + item.replace(" ","");
                    }
                }
            }
            else {

                var alldepartments= "N/A";
                var allBrands = "N/A";
            }

            if(!brandExists){
                allBrands = "N/A";
            }
            if(!deptExists){
                alldepartments= "N/A";
            }
            

            var mapLinkName = "'" + storeName + "'";
            return (<div class="branchDetails " >
                        <h2>  {storeName}  <span>  {storeDistance}  </span></h2>
                        <div class="listAddress">
                            <ul class="lists">
                            <li>  {storePhone}  </li>
                        <li> { storeAddress} </li>
                        <li><a class="viewOnMap arrow-link--forward link--silent text-small" href="#" onclick="showOnMap('+{mapLinkName}+')">View on map</a></li>'
                        </ul>				  </div>

                        <div class="listTradingHours">	
                        <strong>{todayHours}</strong>		  
                        <ul class="lists">
                        {allOpeningHours} 
                        </ul>
                        </div>

                        <div class="listDepartments">
                        <strong>Departments</strong>:
                        <ul class="lists">
                        {alldepartments}
                        </ul>
                        </div>
                        
                        <div class="listBrands">
                        <strong>Brands</strong>:
                        <ul class="lists">
                        {allBrands}
                        </ul>
                        </div>
			  </div>
            
                        );
}

  componentDidMount() {
       this.setState(
           {   shelters: this.props.storedata,  
               chooseDistance: this.props.chooseDistance,         
               distance:this.distance,
               days:this.days,
               departments:this.departments,
               brands:this.brands
    })
  }
  handleClick = (marker, event) => {
    this.setState({ selectedMarker: marker })
  }
  render() {
     // console.log('chooseDistance='+this.props.chooseDistance)
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        chooseDistance={this.props.chooseDistance}
        distance={this.distance} 
        days={this.days} 
        departments={this.departments}
        brands={this.brands}
        markers={this.state.shelters}
        onClick={this.handleClick}
        storeLabelDetails={this.storeLabelDetails}
        createStoreHTML={this.createStoreHTML}
        googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAYA1eCg1ToFOxVfVxqZHzqNnNJFgnLNYw"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default StoreMap;