import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getStoreList} from './actions';
import {getLocationStoreList} from './actions';
import {getEmptyStoreList} from './actions';
import {getDayList} from './actions';
import { bindActionCreators } from 'redux';

class StoreList extends Component {
  
  constructor(props) {
    super(props);
 	this.state = {
		 	data: 'none'
	}
	this.daysList = this.daysList.bind(this); 
	this.departmentsList = this.departmentsList.bind(this);
	this.drawForKM = this.drawForKM.bind(this);
	this.declareUiClass = this.declareUiClass.bind(this);
	this.declareUiEndClass = this.declareUiEndClass.bind(this);
	this.selectBrand = this.selectBrand.bind(this);
	this.selectDept = this.selectDept.bind(this);
	this.selectDay = this.selectDay.bind(this);
	this.checkForBrand = this.checkForBrand.bind(this);
	this.checkForDept = this.checkForDept.bind(this);
	this.checkForDay = this.checkForDay.bind(this);
  }
	
	componentDidMount(){
	//	this.props.getStoreList();
	//	this.props.getLocationStoreList();
	}
 	daysList(list){
		//console.log('day,list--------------->'+JSON.stringify(list))
		var days = [];
		 for(let i=0; i<list.length;i++) {
				var listOpeningHours = list[i].openingHours
				for(let j=0; j<listOpeningHours.length;j++) {
	
					days.push(listOpeningHours[j].day);
				}
		 }				
		var myArray = days;
		let uniqueDays = [...new Set(myArray)]; 
		return uniqueDays
	}
	
	departmentsList(list){
		//console.log('department.list--------------->'+JSON.stringify(list))
		var departments = [];
		var brands = [];
		departments.push('All');
		for(let i=0; i<list.length;i++) {
				var listDepartments = list[i].departments
				for(let j=0; j<listDepartments.length;j++) {
					let temp = listDepartments[j];
					if(temp =='Mimco' || temp=='Witchery' || temp=='Trenery'){
						brands.push(temp);
					}else if(temp=='Country Road'){
						brands.push('CountryRoad');
					}
					else {
						departments.push(temp);
					}
						
				}
		 }				
		var mydeptArray = departments;
		let uniqueDepartment = [...new Set(mydeptArray)]; 
		
		var mybrandArray = brands;
		let uniqueBrands = [...new Set(mybrandArray)]; 
		
		//console.log('department.uniqueDepartment--------------->'+JSON.stringify(uniqueDepartment))
		//console.log('department.uniqueBrands--------------->'+JSON.stringify(uniqueBrands))
		var deptBrand = new Array(2);
		deptBrand[0] = uniqueDepartment;
		deptBrand[1] = uniqueBrands;
		return deptBrand;
	}	

	
	declareUiClass(i){
		if(i==0){
			return ('<ul className="lists">')
		}else if(i==4){
			return ('<ul className="lists lastFilterList">')
		}
	}
	declareUiEndClass(i){
		if(i==3 || i==(this.state.listOfDays.length-1)){
				return ('</ul>')
			}
	}
	drawDays(){
				if(this.props.stateStoreList!=null && this.props.stateStoreList!='undefined') {
				const list = this.daysList(this.props.stateStoreList.stores)
				if(list!=null && list!='undefined') {
				return list.map((item,i) => {
	                    return (
		                              <li className="form-field" data-js="form-field"><input type="checkbox" id={item} name={item} onClick={(e)=>{this.selectDay(e, {item})}} /><label htmlFor={item}>{item}</label></li>
								)
					})	
				}
		}					
	}
	
	drawDepartment(){
				if(this.props.stateStoreList!=null && this.props.stateStoreList!='undefined') {
				const list = this.departmentsList(this.props.stateStoreList.stores)
				if(list!=null && list!='undefined') {
				return list[0].map((item,i) => {
	                    return (
	<li className="form-field" data-js="form-field"><input type="checkbox" id={item} name={item}  onClick={(e)=>{this.selectDept(e, {item})}}/><label htmlFor={item}>{item}</label></li>
								)
					})	
				}
		}					
	}

	drawBrand(){
				if(this.props.stateStoreList!=null && this.props.stateStoreList!='undefined') {
				const list = this.departmentsList(this.props.stateStoreList.stores)
				if(list!=null && list!='undefined') {
				return list[1].map((item,i) => {
	                    return (
	<li className="form-field" data-js="form-field"><input type="checkbox" id={item} name={item}  onClick={(e)=>{this.selectBrand(e, {item})}}/><label htmlFor={item}>{item}</label></li>
								)
					})	
				}
		}					
	}

	drawList(){
		if(this.props.stateStoreList==null || this.props.stateStoreList=='undefined' || this.props.stateStoreList.stores==null || this.props.stateStoreList.stores.length<=0) {	
			//return (<h2 className="noResults">No stores found within 5km from you.</h2>)
			
				let noresultsString = "<h2 class='noResults'>No stores found within 5"+
				"km from you.</h2>";
				if(document.getElementById("storeListSection")!=null) {
					document.getElementById("storeListSection").innerHTML = noresultsString;
				}
				return;
		}
				let found = false;
				let htmlData = "";
				for(let i=0 ;i<this.props.stateStoreList.stores.length;i++) {
				let recordData = "";
				let item = this.props.stateStoreList.stores[i];
					let tempPhone = item.phoneNumber;
					let tempAddress = item.storeAddress;
					let tempStoreName = item.storeName;
					let tempDistance = item.distance;
					
				if(5>= item.distance) {
					found = true;
		
			 recordData = 	
	"<div class='branchDetails grid All Clothing Foods Homeware Beauty CountryRoad Trenery "+ "Wednesday Thursday Friday Saturday Sunday Tuesday' >"+
		"<h2>"+tempStoreName+"<span>"+tempDistance+"</span></h2>"+
		"<section class='listAddress grid grid__fourth--medium text-small' >"+
			"<ul class='lists'>"+
				"<li>"+tempPhone+"</li>"+
				"<li>"+tempAddress+"</li>"+
				"<li><a class='viewOnMap arrow-link--forward link--silent text-small' href='#'"+ "onclick='showOnMap("+tempStoreName+")'>View on map</a></li>"+
			"</ul>"+
		"</section>"+

	
	
			"<section class='listTradingHours grid grid__fourth--medium text-small' >"+
			"<ul class='lists'>"
				{	for(let j=0;j<item.openingHours.length;j++)
					{	let tempDay = item.openingHours[j].day
						let	tempHours = item.openingHours[j].hours
						recordData = recordData + 		"<li>"+tempDay
						+"<span>"+tempHours+"</span></li>"
					}
				}
				
				recordData = recordData + 		
			"</ul>"+
		"</section>"+
		"<section "+
		"class='listDepartments grid grid__fourth--medium text-small' ><strong>Departments</strong>:"+
			"<ul class='lists'>"
				{	for(let j=0;j<item.departments.length;j++) {
						let tempDept = item.departments[j]
						if(tempDept!='Mimco' && tempDept!='Witchery' && tempDept!='CountryRoad' && tempDept!='Trenery') {
						recordData = recordData + 		"<li>"+tempDept+
						"</li>"
						}
					}
				}
				recordData = recordData + 
			"</ul>"+
		"</section>"+
		"<section class='listBrands grid grid__fourth--medium text-small'><strong>Brands</strong>:"+
			"<ul class='lists'>"
				{	for(let j=0;j<item.departments.length;j++) {
						let tempDept = item.departments[j]
						if(tempDept=='Mimco' || tempDept=='Witchery' || tempDept=='CountryRoad' || tempDept=='Trenery') {
						recordData = recordData + 		"<li>"+tempDept+
						"</li>"
						}
					}
				}
				recordData = recordData + 
			"</ul>"+
		"</section>"+
		"<section class='listDepartments-mobile show-on-mobi'><a class='listDepartments-mobile-toggle' href='#'>Departments <span></span></a>"+
			"<ul class='lists listDepartments-mobile-dropDown' >"
				{	for(let j=0;j<item.departments.length;j++) {
						let tempDept = item.departments[j]
						if(tempDept!='Mimco' && tempDept!='Witchery' && tempDept!='CountryRoad' && tempDept!='Trenery') {
						recordData = recordData + 		"<li>"+tempDept+
						"</li>"
						}
					}
				}
				recordData = recordData + 
			"</ul>"+
		"</section>"+
		"<section class='listBrands-mobile show-on-mobi'><a class='listBrands-mobile-toggle' href='#'>Brands <span></span></a>"+
			"<ul class='lists listBrands-mobile-dropDown' >"
				{	for(let j=0;j<item.departments.length;j++) {
						let tempDept = item.departments[j]
						if(tempDept=='Mimco' || tempDept=='Witchery' || tempDept=='CountryRoad' || tempDept=='Trenery') {
						recordData = recordData + 		"<li>"+tempDept+
						"</li>"
						}
					}
				}
				recordData = recordData + 
			"</ul>"+
		"</section>"+
		"<a class='viewOnMap-mobile' href='#' onclick='showOnMap("+tempStoreName+")'>View on map</a>"+

			"</div>"
					}// end of if for distance

					htmlData = htmlData + recordData
				}// end of for

				if(!found){
					htmlData = htmlData+"<h2 class='noResults'>No stores found within "+document.getElementById("filterKMS").value+"km from you.</h2>"
					document.getElementById("storeListSection").innerHTML = htmlData;
					return;
				} 
				document.getElementById("storeListSection").innerHTML = htmlData;
				return;
	}
	
	drawForKM(event,param){
		document.getElementById("filterKMS").value = param
		if(this.props.stateStoreList!=null && this.props.stateStoreList!='undefined' && this.props.stateStoreList.stores.length>0) {
			document.getElementById("storeListSection").innerHTML = this.drawForOneSection(this.props.stateStoreList.stores);
		}
		else {
				return "<h2 class='noResults'>No stores found within "+param+"km from you.</h2>"
		} // end of else for distance
	}


	selectBrand(event,param){
		if(event.target.checked){
			document.getElementById("filterBrands").value = document.getElementById("filterBrands").value+",brand="+event.target.name;
		}else{
			let filterString = document.getElementById("filterBrands").value
				//console.log('filterString='+filterString)
			if(filterString!=null && filterString.indexOf(",brand")>=0){
				let tempString = filterString.replace(",brand="+event.target.id,"")
				//console.log('tempString='+tempString)
				document.getElementById("filterBrands").value = tempString
			}
		}

		if(this.props.stateStoreList!=null && this.props.stateStoreList!='undefined' && this.props.stateStoreList.stores.length>0) {
			document.getElementById("storeListSection").innerHTML = 
			this.drawForOneSection(this.props.stateStoreList.stores);
		}
		else {
				let noresultsString = "<h2 class='noResults'>No stores found within "+
				document.getElementById("filterKMS").value+
				"km from you.</h2>";
				document.getElementById("storeListSection").innerHTML = noresultsString;
		} // end of else for distance
		
		//console.log('document.getElementById(filterBrands).value='+document.getElementById("filterBrands").value)
	}
	
		selectDay(event,param){
		if(event.target.checked){
			document.getElementById("filterDays").value = document.getElementById("filterDays").value+",day="+event.target.name;
		}else{
			let filterString = document.getElementById("filterDays").value
			if(filterString!=null && filterString.indexOf(",day")>=0){
				let tempString = filterString.replace(",day="+event.target.id,"")
				document.getElementById("filterDays").value = tempString
			}
		}
		if(this.props.stateStoreList!=null && this.props.stateStoreList!='undefined' && this.props.stateStoreList.stores.length>0) {
			document.getElementById("storeListSection").innerHTML = 
			this.drawForOneSection(this.props.stateStoreList.stores);
		}
		else {
				let noresultsString = "<h2 class='noResults'>No stores found within "+
				document.getElementById("filterKMS").value+
				"km from you.</h2>";
				document.getElementById("storeListSection").innerHTML = noresultsString;
		} // end of else for distance
		
		//console.log('document.getElementById("filterDays").value='+document.getElementById("filterDays").value)
	}

	selectDept(event,param){
		if(event.target.checked){
			document.getElementById("filterDepts").value = document.getElementById("filterDepts").value+",dept="+event.target.name;
		}else{
			let filterString = document.getElementById("filterDepts").value
			if(filterString!=null && filterString.indexOf(",dept")>=0){
				let tempString = filterString.replace(",dept="+event.target.id,"")
				document.getElementById("filterDepts").value = tempString
			}
		}
		if(this.props.stateStoreList!=null && this.props.stateStoreList!='undefined' && this.props.stateStoreList.stores.length>0) {
			document.getElementById("storeListSection").innerHTML = 
			this.drawForOneSection(this.props.stateStoreList.stores);
		}
		else {
				let noresultsString = "<h2 class='noResults'>No stores found within "+
				document.getElementById("filterKMS").value+
				"km from you.</h2>";
				document.getElementById("storeListSection").innerHTML = noresultsString;
		} // end of else for distance
		
		//console.log('document.getElementById("filterDepts").value='+document.getElementById("filterDepts").value)
	}


	checkForDept(list,deptSearchArray){
		let deptExists = false; 
		for(let j=0;j<list.departments.length;j++) {
			let tempDept = list.departments[j]
			
			for(let k=1;k<deptSearchArray.length;k++) {
				if(tempDept==deptSearchArray[k]){
					deptExists = true
					return deptExists
				} 
			}
		}
		return deptExists
	}
	checkForBrand(list,brandSearchArray){
		let brandExists = false; 
		for(let j=0;j<list.departments.length;j++) {
			let tempBrand = list.departments[j]
			
			for(let k=1;k<brandSearchArray.length;k++) {
				if(tempBrand==brandSearchArray[k]){
					brandExists = true
					return brandExists
				} 
			}
		}
		return brandExists
	}
	checkForDay(list,daySearchArray){
		let dayExists = false; 
		for(let j=0;j<list.openingHours.length;j++) {
			let tempDay = list.openingHours[j].day
			
			for(let k=1;k<daySearchArray.length;k++) {
				if(tempDay==daySearchArray[k]){
					dayExists = true
					return dayExists
				} 
			}
		}
		return dayExists
	}	
	
	drawForOneSection(list){
	let htmlData = "";
	let found = false;
	let distance = document.getElementById("filterKMS").value;
	let days = document.getElementById("filterDays").value;
	let departments = document.getElementById("filterDepts").value;
	let brands = document.getElementById("filterBrands").value;
	
	let daySearchExists = false;
	let daySearchCount = 0;
	let daySearchArray = [];
	if(days!=null && days.trim().length>3){
		daySearchExists = true;
		daySearchCount = days.match(/,day=/g).length
		daySearchArray = days.split(",day=");
	}

	let deptSearchExists = false;
	let deptSearchCount = 0;
	let deptSearchArray = [];
	if(departments!=null && departments.trim().length>3){
		deptSearchExists = true;
		deptSearchCount = departments.match(/,dept=/g).length
		deptSearchArray = departments.split(",dept=");
	}

	let brandSearchExists = false;
	let brandSearchCount = 0;
	let brandSearchArray = [];
	if(brands!=null && brands.trim().length>3){
		brandSearchExists = true;
		brandSearchCount = brands.match(/,brand=/g).length
		brandSearchArray = brands.split(",brand=");
	}
	
	//console.log('distance='+distance+',brand='+brands+",dept="+departments+",days="+days)
	
	
	
				for(let i=0;i<list.length;i++)
				{	let recordData = "";
					let tempPhone = list[i].phoneNumber;
					let tempAddress = list[i].storeAddress;
					let tempStoreName = list[i].storeName;
					let tempDistance = list[i].distance;
					if(eval(distance)>= eval(tempDistance)){ 
					
					if((!daySearchExists && !deptSearchExists && !brandSearchExists) || 
					(daySearchExists && deptSearchExists && brandSearchExists && this.checkForDay(list[i],daySearchArray) && this.checkForDept(list[i],deptSearchArray) && this.checkForBrand(list[i],brandSearchArray)) || 
					(daySearchExists && deptSearchExists && this.checkForDay(list[i],daySearchArray) && this.checkForDept(list[i],deptSearchArray)) || 
					(daySearchExists && brandSearchExists && this.checkForDay(list[i],daySearchArray) && this.checkForBrand(list[i],brandSearchArray)) ||
					(deptSearchExists && brandSearchExists && this.checkForDept(list[i],deptSearchArray) && this.checkForBrand(list[i],brandSearchArray)) ||
					(daySearchExists && this.checkForDay(list[i],daySearchArray)) ||
					(deptSearchExists && this.checkForDept(list[i],deptSearchArray)) ||
					(brandSearchExists && this.checkForBrand(list[i],brandSearchArray))) {
					found = true;
		recordData = recordData + 	
	"<div class='branchDetails grid All Clothing Foods Homeware Beauty CountryRoad Trenery "+ "Wednesday Thursday Friday Saturday Sunday Tuesday' >"+
		"<h2>"+tempStoreName+"<span>"+tempDistance+"</span></h2>"+
		"<section class='listAddress grid grid__fourth--medium text-small' >"+
			"<ul class='lists'>"+
				"<li>"+tempPhone+"</li>"+
				"<li>"+tempAddress+"</li>"+
				"<li><a class='viewOnMap arrow-link--forward link--silent text-small' href='#'"+ "onclick='showOnMap("+tempStoreName+")'>View on map</a></li>"+
			"</ul>"+
		"</section>"+

	
	
			"<section class='listTradingHours grid grid__fourth--medium text-small' >"+
			"<ul class='lists'>"
				{	for(let j=0;j<list[i].openingHours.length;j++)
					{	let tempDay = list[i].openingHours[j].day
						let	tempHours = list[i].openingHours[j].hours
						recordData = recordData + 		"<li>"+tempDay
						+"<span>"+tempHours+"</span></li>"
					}
				}
				
				recordData = recordData + 		
			"</ul>"+
		"</section>"+
		"<section "+
		"class='listDepartments grid grid__fourth--medium text-small' ><strong>Departments</strong>:"+
			"<ul class='lists'>"
				{	for(let j=0;j<list[i].departments.length;j++) {
						let tempDept = list[i].departments[j]
						if(tempDept!='Mimco' && tempDept!='Witchery' && tempDept!='CountryRoad' && tempDept!='Trenery') {
						recordData = recordData + 		"<li>"+tempDept+
						"</li>"
						}
					}
				}
				recordData = recordData + 
			"</ul>"+
		"</section>"+
		"<section class='listBrands grid grid__fourth--medium text-small'><strong>Brands</strong>:"+
			"<ul class='lists'>"
				{	for(let j=0;j<list[i].departments.length;j++) {
						let tempDept = list[i].departments[j]
						if(tempDept=='Mimco' || tempDept=='Witchery' || tempDept=='CountryRoad' || tempDept=='Trenery') {
						recordData = recordData + 		"<li>"+tempDept+
						"</li>"
						}
					}
				}
				recordData = recordData + 
			"</ul>"+
		"</section>"+
		"<section class='listDepartments-mobile show-on-mobi'><a class='listDepartments-mobile-toggle' href='#'>Departments <span></span></a>"+
			"<ul class='lists listDepartments-mobile-dropDown' >"
				{	for(let j=0;j<list[i].departments.length;j++) {
						let tempDept = list[i].departments[j]
						if(tempDept!='Mimco' && tempDept!='Witchery' && tempDept!='CountryRoad' && tempDept!='Trenery') {
						recordData = recordData + 		"<li>"+tempDept+
						"</li>"
						}
					}
				}
				recordData = recordData + 
			"</ul>"+
		"</section>"+
		"<section class='listBrands-mobile show-on-mobi'><a class='listBrands-mobile-toggle' href='#'>Brands <span></span></a>"+
			"<ul class='lists listBrands-mobile-dropDown' >"
				{	for(let j=0;j<list[i].departments.length;j++) {
						let tempDept = list[i].departments[j]
						if(tempDept=='Mimco' || tempDept=='Witchery' || tempDept=='CountryRoad' || tempDept=='Trenery') {
						recordData = recordData + 		"<li>"+tempDept+
						"</li>"
						}
					}
				}
				recordData = recordData + 
			"</ul>"+
		"</section>"+
		"<a class='viewOnMap-mobile' href='#' onclick='showOnMap("+tempStoreName+")'>View on map</a>"+

			"</div>"
					  } // end of if if(!daySearchExists && !deptSearchExists && !brandSearchExists)
					}// end of if for distance
					htmlData = htmlData + recordData
				}// end of for
				
				if(!found){
					htmlData = htmlData+"<h2 class='noResults'>No stores found within "+document.getElementById("filterKMS").value+"km from you.</h2>"
				} 
				return htmlData;
	}


	

	callStoreLocatorDisplay = () => {
        this.props.storeLocatorDisplay();
    }


	

	
	renderBrandNames() {
		const brands = ['Trenery', 'ASD'];
		return brands.map(brand => {
			const classes = classnames('label-checkbox', {'is-checked': this.state.selectedBrand === brand})
			//console.log('classes='+JSON.stringify(classes));
			return (
			<li className="form-field" data-js="form-field" ><
								   input type="checkbox" id={brand} name={brand} onClick={() => { this.selectBrand(brand)}}
								   className="customCheck enhanced-checkbox is-enhanced selected" data-js="validate-field" />
								   <label className={classes} htmlFor={brand}>{brand}</label></li>
								   ) 
		});
	}
	

  render() {
	//console.log('render()---this.props.stateStoreList--------------->'+JSON.stringify(this.props.stateStoreList))
			//console.log('render()---subId subId--------------->'+this.props.subId);
			//console.log('render()---subId state--------------->'+this.state.data);
    return (
              <div className="grid grid--space-y">
                <article>
                  <header>
                    <h1 className="text-caps font-graphic"> Near You</h1>
                    <p className="floatR noMargT searchByAreaLink">
                      <a href="#" onClick={this.callStoreLocatorDisplay} className="moreLink arrow-link--forward link--silent text-small">Search by area</a>
                    </p>
                    <p className="intro resultDetails">
                      <span className="searchingWrapper hidden">Searching for  in this area</span>
                      <span className="resultsWrapper"><span className="numResults">2</span>  found within <span className="dist">5km</span> from you.</span>
                    </p>
                  </header>
                  <section className="storesNearYouFilter">
                    <div className="filters">
                      <a className="filterSelector active" href="#">Choose Filter</a>
                      <div className="filterSelection" >
                        <form className="wForm" method="post" action="#" name="storeFilter" id="frmStoreFilter">
                          <div className="dayFilters noBorder">
                            <strong>Days:</strong>
							<ul className="lists">
  								{ this.drawDays() }
							</ul>
						  </div>
                          <div className="filters">
                            <strong>Departments:</strong>
                            <ul className="lists">
								{ this.drawDepartment() }
							</ul></div>
                          <div className="brandFilters">
                            <strong>Brands:</strong>
                            <ul className="lists">
								{ this.drawBrand()}
 							</ul>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="filterDisplay">
                      <a href="/store/fragments/customer-service/customer-service-index.jsp?content=store-results" className="list active">List</a>
                      <a href="/store/fragments/customer-service/customer-service-index.jsp?content=store-results-area-map" className="map">Map</a>
                    </div>
                    <div className="filterDistance">
                      <a href="#" onClick={(e)=>{this.drawForKM(e,1)}}>1km</a>
                      <a className="active" href="#" onClick={(e)=>{this.drawForKM(e,5)}}>5km</a>
                      <a href="#" onClick={(e)=>{this.drawForKM(e,10)}}>10km</a>
                      <a href="#" onClick={(e)=>{this.drawForKM(e,15)}}>15km</a>
                      <a href="#" onClick={(e)=>{this.drawForKM(e,25)}}>25km</a>
                      <a href="#" className="last-child" onClick={(e)=>{this.drawForKM(e,50)}}>50km</a>
                    </div>
                  </section>
                 
                  <section className="mapWrapper" style={{height: 0, display: 'none'}}>
                    <div id="googleMap" style={{height: 350, width: '100%', position: 'relative', overflow: 'hidden'}}><div style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: 'rgb(229, 227, 223)'}}><div className="gm-style" style={{position: 'absolute', zIndex: 0, left: 0, top: 0, height: '100%', width: '100%', padding: 0, borderWidth: 0, margin: 0}}><div tabIndex={0} style={{position: 'absolute', zIndex: 0, left: 0, top: 0, height: '100%', width: '100%', padding: 0, borderWidth: 0, margin: 0, cursor: 'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur") 8 8, default'}}><div style={{zIndex: 1, position: 'absolute', top: 0, left: 0, width: '100%', transformOrigin: '0px 0px 0px', transform: 'matrix(1, 0, 0, 1, 0, 0)'}}><div style={{position: 'absolute', left: 0, top: 0, zIndex: 100, width: '100%'}}><div style={{position: 'absolute', left: 0, top: 0, zIndex: 0}}><div aria-hidden="true" style={{position: 'absolute', left: 0, top: 0, zIndex: 1, visibility: 'inherit'}}><div style={{width: 256, height: 256, position: 'absolute', left: '-62px', top: '-43px'}} /></div></div></div><div style={{position: 'absolute', left: 0, top: 0, zIndex: 101, width: '100%'}} /><div style={{position: 'absolute', left: 0, top: 0, zIndex: 102, width: '100%'}} /><div style={{position: 'absolute', left: 0, top: 0, zIndex: 103, width: '100%'}}><div style={{position: 'absolute', left: 0, top: 0, zIndex: -1}}><div aria-hidden="true" style={{position: 'absolute', left: 0, top: 0, zIndex: 1, visibility: 'inherit'}}><div style={{width: 256, height: 256, overflow: 'hidden', position: 'absolute', left: '-62px', top: '-43px'}}><canvas draggable="false" height={256} width={256} style={{userSelect: 'none', position: 'absolute', left: 0, top: 0, height: 256, width: 256}} /></div></div></div></div><div style={{position: 'absolute', zIndex: 0, left: 0, top: 0}}><div style={{overflow: 'hidden'}} /></div><div style={{position: 'absolute', left: 0, top: 0, zIndex: 0}}><div aria-hidden="true" style={{position: 'absolute', left: 0, top: 0, zIndex: 1, visibility: 'inherit'}} /></div></div><div className="gm-style-pbc" style={{zIndex: 2, position: 'absolute', height: '100%', width: '100%', padding: 0, borderWidth: 0, margin: 0, left: 0, top: 0, opacity: 0}}><p className="gm-style-pbt" /></div><div style={{zIndex: 3, position: 'absolute', height: '100%', width: '100%', padding: 0, borderWidth: 0, margin: 0, left: 0, top: 0}}><div style={{zIndex: 1, position: 'absolute', height: '100%', width: '100%', padding: 0, borderWidth: 0, margin: 0, left: 0, top: 0}} /></div><div style={{zIndex: 4, position: 'absolute', top: 0, left: 0, width: '100%', transformOrigin: '0px 0px 0px', transform: 'matrix(1, 0, 0, 1, 0, 0)'}}><div style={{position: 'absolute', left: 0, top: 0, zIndex: 104, width: '100%'}} /><div style={{position: 'absolute', left: 0, top: 0, zIndex: 105, width: '100%'}} /><div style={{position: 'absolute', left: 0, top: 0, zIndex: 106, width: '100%'}} /><div style={{position: 'absolute', left: 0, top: 0, zIndex: 107, width: '100%'}} /></div></div><div style={{marginLeft: 5, marginRight: 5, zIndex: 1000000, position: 'absolute', left: 0, bottom: 0}}><a target="_blank" href="https://maps.google.com/maps?ll=-29.08813,26.212664&z=12&t=m&hl=en-US&gl=US&mapclient=apiv3" title="Click to see this area on Google Maps" style={{position: 'static', overflow: 'visible', float: 'none', display: 'inline'}}><div style={{width: 66, height: 26, cursor: 'pointer'}}><img src="https://maps.gstatic.com/mapfiles/api-3/images/google4.png" draggable="false" style={{position: 'absolute', left: 0, top: 0, width: 66, height: 26, userSelect: 'none', border: 0, padding: 0, margin: 0}} /></div></a></div><div style={{backgroundColor: 'white', padding: '15px 21px', border: '1px solid rgb(171, 171, 171)', fontFamily: 'Roboto, Arial, sans-serif', color: 'rgb(34, 34, 34)', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 16px', zIndex: 10000002, display: 'none', width: 0, height: 0, position: 'absolute', left: 5, top: 5}}><div style={{padding: '0px 0px 10px', fontSize: 16}}>Map Data</div><div style={{fontSize: 13}} /><div style={{width: 13, height: 13, overflow: 'hidden', position: 'absolute', opacity: '0.7', right: 12, top: 12, zIndex: 10000, cursor: 'pointer'}}><img src="https://maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png" draggable="false" style={{position: 'absolute', left: '-2px', top: '-336px', width: 59, height: 492, userSelect: 'none', border: 0, padding: 0, margin: 0, maxWidth: 'none'}} /></div></div><div className="gmnoprint" style={{zIndex: 1000001, position: 'absolute', right: 0, bottom: 0, width: 12}}><div draggable="false" className="gm-style-cc" style={{userSelect: 'none', height: 14, lineHeight: 14}}><div style={{opacity: '0.7', width: '100%', height: '100%', position: 'absolute'}}><div style={{width: 1}} /><div style={{backgroundColor: 'rgb(245, 245, 245)', width: 'auto', height: '100%', marginLeft: 1}} /></div><div style={{position: 'relative', paddingRight: 6, paddingLeft: 6, fontFamily: 'Roboto, Arial, sans-serif', fontSize: 10, color: 'rgb(68, 68, 68)', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right', verticalAlign: 'middle', display: 'inline-block'}}><a style={{color: 'rgb(68, 68, 68)', textDecoration: 'none', cursor: 'pointer', display: 'none'}}>Map Data</a><span style={{display: 'none'}} /></div></div></div><div className="gmnoscreen" style={{position: 'absolute', right: 0, bottom: 0}}><div style={{fontFamily: 'Roboto, Arial, sans-serif', fontSize: 11, color: 'rgb(68, 68, 68)', direction: 'ltr', textAlign: 'right', backgroundColor: 'rgb(245, 245, 245)'}} /></div><div className="gmnoprint gm-style-cc" draggable="false" style={{zIndex: 1000001, userSelect: 'none', height: 14, lineHeight: 14, position: 'absolute', right: 0, bottom: 0}}><div style={{opacity: '0.7', width: '100%', height: '100%', position: 'absolute'}}><div style={{width: 1}} /><div style={{backgroundColor: 'rgb(245, 245, 245)', width: 'auto', height: '100%', marginLeft: 1}} /></div><div style={{position: 'relative', paddingRight: 6, paddingLeft: 6, fontFamily: 'Roboto, Arial, sans-serif', fontSize: 10, color: 'rgb(68, 68, 68)', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right', verticalAlign: 'middle', display: 'inline-block'}}><a href="https://www.google.com/intl/en-US_US/help/terms_maps.html" target="_blank" style={{textDecoration: 'none', cursor: 'pointer', color: 'rgb(68, 68, 68)'}}>Terms of Use</a></div></div><div style={{cursor: 'pointer', width: 25, height: 25, overflow: 'hidden', display: 'none', margin: '10px 14px', position: 'absolute', top: 0, right: 0}}><img src="https://maps.gstatic.com/mapfiles/api-3/images/sv9.png" draggable="false" className="gm-fullscreen-control" style={{position: 'absolute', left: '-52px', top: '-86px', width: 164, height: 175, userSelect: 'none', border: 0, padding: 0, margin: 0}} /></div><div draggable="false" className="gm-style-cc" style={{userSelect: 'none', height: 14, lineHeight: 14, display: 'none', position: 'absolute', right: 0, bottom: 0}}><div style={{opacity: '0.7', width: '100%', height: '100%', position: 'absolute'}}><div style={{width: 1}} /><div style={{backgroundColor: 'rgb(245, 245, 245)', width: 'auto', height: '100%', marginLeft: 1}} /></div><div style={{position: 'relative', paddingRight: 6, paddingLeft: 6, fontFamily: 'Roboto, Arial, sans-serif', fontSize: 10, color: 'rgb(68, 68, 68)', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right', verticalAlign: 'middle', display: 'inline-block'}}><a target="_new" title="Report errors in the road map or imagery to Google" href="https://www.google.com/maps/@-29.08813,26.2126642,12z/data=!10m1!1e1!12b1?source=apiv3&rapsrc=apiv3" style={{fontFamily: 'Roboto, Arial, sans-serif', fontSize: 10, color: 'rgb(68, 68, 68)', textDecoration: 'none', position: 'relative'}}>Report a map error</a></div></div></div></div></div>
                  </section>
                  <section className="branchDetailsWrapper" id="storeListSection">
						{this.drawList()}
				  </section>
                 
                </article>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
	stateStoreList: state.storeListReducer.stateStoreList,
	stateDayList: state.storeListReducer.stateDayList
    };
};

const matchDispatchToProps = (dispatch) => {
  return {
		getStoreList: () => {dispatch(getStoreList())},
		getLocationStoreList: () => {dispatch(getLocationStoreList())},
		getEmptyStoreList: () => {dispatch(getEmptyStoreList())},
		getDayList: (stateStoreList) => {dispatch(getDayList(stateStoreList))}
		}
};

export default connect(mapStateToProps, matchDispatchToProps)(StoreList);



