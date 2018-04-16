import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStoreList } from './actions';
import { getLocationStoreList } from './actions';
import { getEmptyStoreList } from './actions';
import { getDayList } from './actions';
import { bindActionCreators } from 'redux';
import { compose, withProps, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import StoreMap from '../store-map';

class StoreList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: 'none',
			selectedKM: '0',
			countOfRecords: 0,

			chooseDistance: this.props.radius,
			totalNoOfRecords: 0
		}
		this.daysList = this.daysList.bind(this);
		this.departmentsList = this.departmentsList.bind(this);
		this.drawForKM = this.drawForKM.bind(this);
		this.selectBrand = this.selectBrand.bind(this);
		this.selectDept = this.selectDept.bind(this);
		this.selectDay = this.selectDay.bind(this);
		this.checkForBrand = this.checkForBrand.bind(this);
		this.checkForDept = this.checkForDept.bind(this);
		this.checkForDay = this.checkForDay.bind(this);
		this.displayMapSection = this.displayMapSection.bind(this);
		this.callStoreLocatorDisplay = this.callStoreLocatorDisplay.bind(this);
		this.displayMapSectionThroughLink = this.displayMapSectionThroughLink(this);
	}

	componentDidMount() {
		//	this.props.getStoreList();
		//	this.props.getLocationStoreList();
		if (typeof document === "undefined") {
			document.getElementById('firstEntry').value = "100";
			document.getElementById('exit').value = "false";
			return;
		}

	}
	daysList(list) {
		//console.log('day,list--------------->'+JSON.stringify(list))
		var days = [];
		for (let i = 0; i < list.length; i++) {
			var listOpeningHours = list[i].openingHours
			for (let j = 0; j < listOpeningHours.length; j++) {

				days.push(listOpeningHours[j].day);
			}
		}
		var myArray = days;
		let uniqueDays = [...new Set(myArray)];
		//	console.log('daysList.uniqueDays--------------->'+JSON.stringify(uniqueDays))
		return uniqueDays
	}

	departmentsList(list) {
		//console.log('department.list--------------->'+JSON.stringify(list))
		var departments = [];
		var brands = [];
		departments.push('All');
		for (let i = 0; i < list.length; i++) {
			var listDepartments = list[i].departments
			for (let j = 0; j < listDepartments.length; j++) {
				let temp = listDepartments[j];
				if (temp == 'Mimco' || temp == 'Witchery' || temp == 'Trenery' || temp == 'Country Road') {
					brands.push(temp);
				}
				/*else if(temp=='Country Road'){
					brands.push('Country Road');
				}*/
				else {
					departments.push(temp);
				}

			}
		}
		if (departments.length == 1) {
			departments.pop();
		}
		var mydeptArray = departments;
		let uniqueDepartment = [...new Set(mydeptArray)];

		var mybrandArray = brands;
		let uniqueBrands = [...new Set(mybrandArray)];

		//	console.log('department.uniqueDepartment--------------->'+JSON.stringify(uniqueDepartment))
		//	console.log('department.uniqueBrands--------------->'+JSON.stringify(uniqueBrands))
		var deptBrand = new Array(2);
		deptBrand[0] = uniqueDepartment;
		deptBrand[1] = uniqueBrands;
		return deptBrand;
	}

	drawDays(start, end) {
		if (this.props.stateStoreList != null && this.props.stateStoreList != 'undefined') {
			const list = this.daysList(this.props.stateStoreList.stores)
			if (list != null && list != 'undefined') {

				return list.map((item, i) => {
					if (i >= start && i <= end) {
						return (
							<li className="form-field"><input type="checkbox" id={item} name={item} onClick={(e) => { this.selectDay(e, { item }) }} /><label htmlFor={item}>{item}</label></li>
						)
					}
				})
			}
		}
	}

	drawDepartment(param) {
		if (this.props.stateStoreList != null && this.props.stateStoreList != 'undefined') {
			const list = this.departmentsList(this.props.stateStoreList.stores)
			if (list != null && list != 'undefined') {
				let count = Math.ceil(parseFloat(list[0].length / 2));
				if (param == 'firstHalf') {
					return list[0].map((item, i) => {
						if (i <= count) {
							return (
								<li className="form-field"><input type="checkbox" id={item} name={item} onClick={(e) => { this.selectDept(e, { item }) }} /><label htmlFor={item}>{item}</label></li>
							)
						}
					})
				} else if (param == 'secondHalf') {
					return list[0].map((item, i) => {
						if (i >= count) {
							return (
								<li className="form-field"><input type="checkbox" id={item} name={item} onClick={(e) => { this.selectDept(e, { item }) }} /><label htmlFor={item}>{item}</label></li>
							)
						}
					})
				}
			}
		}
	}

	drawBrand() {
		if (this.props.stateStoreList != null && this.props.stateStoreList != 'undefined') {
			const list = this.departmentsList(this.props.stateStoreList.stores)
			if (list != null && list != 'undefined') {
				return list[1].map((item, i) => {
					return (
						<li className="form-field"><input type="checkbox" id={item} name={item} onClick={(e) => { this.selectBrand(e, { item }) }} /><label htmlFor={item}>{item}</label></li>
					)
				})
			}
		}
	}

	firstTimeCount() {
		if (typeof window !== 'undefined') {

			if (document.getElementById("firstEntry") != null && document.getElementById("firstEntry").value != "-1") {
				return this.state.totalNoOfRecords;
			}
			let defaultDistance = 5;
			if (this.props.radius != 5) {
				defaultDistance = this.props.radius;
			}
			if (this.props.stateStoreList == null || this.props.stateStoreList == 'undefined' || this.props.stateStoreList.stores == null || this.props.stateStoreList.stores.length <= 0) {
				if (document.getElementById("storeListSection") != null) {
					document.getElementById("countOfRecords").value = 0;
				}
				return 0;
			}
			let found = false;
			let count = 0;
			for (let i = 0; i < this.props.stateStoreList.stores.length; i++) {
				let recordData = "";
				let item = this.props.stateStoreList.stores[i];

				if (defaultDistance >= item.distance) {
					found = true;
					count = count + 1;
				}// end of if for distance
			}// end of for
			document.getElementById("countOfRecords").value = count;
			return count;
		}
	}

	firstTimeRadius() {
		if (typeof window !== 'undefined') {
			if (document.getElementById("firstEntry") != null && document.getElementById("firstEntry").value != "-1") {
				return this.state.chooseDistance;
			} else {
				return this.props.radius;
			}
		}
	}

	drawList() {

		if (typeof window !== 'undefined') {

			if (document.getElementById('storeListMap') != null && document.getElementById('storeListMap').style.visibility == 'hidden' && document.getElementById('firstEntry') != null && document.getElementById('firstEntry').value != "-1") {
				//console.log('Inside drawList 1');
				return;
			}
			if (document.getElementById('exit') != null && document.getElementById('exit').value == "true") {
				document.getElementById("storeListSection").innerHTML = "";
				return;
			}

			//console.log('this.props.radius...='+this.props.radius);
			let defaultDistance = 5;
			if (this.props.radius != '5') {
				defaultDistance = this.props.radius;
				document.getElementById("filterKMS").value = this.props.radius;
			}

			//console.log('defaultDistance...='+defaultDistance);
			if (this.props.stateStoreList == null || this.props.stateStoreList == 'undefined' || this.props.stateStoreList.stores == null || this.props.stateStoreList.stores.length <= 0) {
				//console.log('drawList is called...inside store... no records...');
				//return (<h2 className="noResults">No stores found within 5km from you.</h2>)

				let noresultsString = "<h2 class='noResults'>No stores found within " + defaultDistance +
					"km from you.</h2>";
				if (document.getElementById("storeListSection") != null) {
					document.getElementById("storeListSection").innerHTML = noresultsString;
					document.getElementById("countOfRecords").value = 0;
				}
				return;
			}
			//console.log('drawList is called...inside store...defaultDistance='+defaultDistance);
			//console.log('drawList is called...inside store...this.props.stateStoreList.stores.length='+this.props.stateStoreList.stores.length);
			let found = false;
			let htmlData = "";
			let count = 0;
			for (let i = 0; i < this.props.stateStoreList.stores.length; i++) {
				let recordData = "";
				let item = this.props.stateStoreList.stores[i];
				let tempPhone = item.phoneNumber;
				let tempAddress = item.storeAddress;
				let tempStoreName = item.storeName;
				let tempDistance = item.distance ;

				//console.log('drawList is called...defaultDistance='+defaultDistance+",item.distance="+item.distance);

				if (defaultDistance >= item.distance) {
					found = true;
					count = count + 1;
					let onClickString = "document.getElementById('storeListMap').style.visibility='visible';" +
						"document.getElementById('storeListSection').hidden=true;"
					//"document.getElementById('listLink').className='list';"
					let anotherClickString = "document.getElementById('mapLink').class='" + "\"map active\"" + "';"
					recordData =
						"<div class='branchDetails grid All Clothing Foods Homeware Beauty CountryRoad Trenery " + "Wednesday Thursday Friday Saturday Sunday Tuesday' >" +
						"<h2>" + tempStoreName + "<span>" + tempDistance + "KM" + "</span></h2>" +
						"<section class='listAddress grid grid__fourth--medium text-small' style='border-right:solid 1px #e5e5e5' >" +
						"<ul class='lists'>" +
						"<li>" + tempPhone + "</li>" +
						"<li>" + tempAddress + "</li>" +

						"<li><a class='viewOnMap arrow-link--forward link--silent text-small' href='#'  onclick=" + onClickString + ">View on map</a></li>" +
						"</ul>" +
						"</section>" +



						"<section class='listTradingHours grid grid__fourth--medium text-small' style='border-right:solid 1px #e5e5e5' >" +
						"<ul class='lists'>"
					{
						let seasonal = false;
						for (let j = 0; j < item.openingHours.length; j++) {
							let tempDay = item.openingHours[j].day
							let tempHours = item.openingHours[j].hours

							if (tempHours == 'undefined' || tempHours == '') {
								tempHours = 'N/A';
							}

							if (item.exception == 'true') {
								recordData = recordData + '<li class="highlightPink">' + tempDay + '* <span>' + tempHours + '</span></li>';
								seasonal = true;
							} else {
								if (j == 0)
									recordData = recordData + '<li><strong>Today <span>' + tempHours + '</span></strong></li>';
								else
									recordData = recordData + '<li>' + tempDay + ' <span>' + tempHours + '</span></li>';
							}
						}
						if (seasonal) {
							recordData = recordData + '<li><span class="highlightPink seasonalHours">*Seasonal hours</span></li>'
						}
					}
					recordData = recordData +
						"</ul>" +
						"</section>" +
						"<section " +
						"class='listDepartments grid grid__fourth--medium text-small' style='border-right:solid 1px #e5e5e5'><strong>Departments</strong>:" +
						"<ul class='lists'>"
					{
						for (let j = 0; j < item.departments.length; j++) {
							let tempDept = item.departments[j]
							if (tempDept != 'Mimco' && tempDept != 'Witchery' && tempDept != 'Country Road' && tempDept != 'Trenery') {
								recordData = recordData + "<li>" + tempDept +
									"</li>"
							}
						}
					}
					recordData = recordData +
						"</ul>" +
						"</section>" +
						"<section class='listBrands grid grid__fourth--medium text-small'><strong>Brands</strong>:" +
						"<ul class='lists'>"
					{
						for (let j = 0; j < item.departments.length; j++) {
							let tempDept = item.departments[j]
							if (tempDept == 'Mimco' || tempDept == 'Witchery' || tempDept == 'Country Road' || tempDept == 'Trenery') {
								recordData = recordData + "<li>" + tempDept +
									"</li>"
							}
						}
					}
					recordData = recordData +
						"</ul>" +
						"</section>" +
						"<section class='listDepartments-mobile show-on-mobi'><a class='listDepartments-mobile-toggle' href='#'>Departments <span></span></a>" +
						"<ul class='lists listDepartments-mobile-dropDown' >"
					{
						for (let j = 0; j < item.departments.length; j++) {
							let tempDept = item.departments[j]
							if (tempDept != 'Mimco' && tempDept != 'Witchery' && tempDept != 'Country Road' && tempDept != 'Trenery') {
								recordData = recordData + "<li>" + tempDept +
									"</li>"
							}
						}
					}
					recordData = recordData +
						"</ul>" +
						"</section>" +
						"<section class='listBrands-mobile show-on-mobi'><a class='listBrands-mobile-toggle' href='#'>Brands <span></span></a>" +
						"<ul class='lists listBrands-mobile-dropDown' >"
					{
						for (let j = 0; j < item.departments.length; j++) {
							let tempDept = item.departments[j]
							if (tempDept == 'Mimco' || tempDept == 'Witchery' || tempDept == 'Country Road' || tempDept == 'Trenery') {
								recordData = recordData + "<li>" + tempDept +
									"</li>"
							}
						}
					}
					recordData = recordData +
						"</ul>" +
						"</section>" +
						"<a class='viewOnMap-mobile' href='#' onclick='showOnMap(" + tempStoreName + ")'>View on map</a>" +

						"</div>"
				}// end of if for distance

				htmlData = htmlData + recordData
			}// end of for

			document.getElementById("countOfRecords").value = count;
			if (!found) {
				htmlData = htmlData + "<h2 class='noResults'>No stores found within " + defaultDistance + "km from you.</h2>"
				document.getElementById("storeListSection").innerHTML = htmlData;
				return;
			}
			document.getElementById("storeListSection").innerHTML = htmlData;
			return;
		}
	}

	drawForKM(event, param) {
		event.preventDefault();
		if (typeof window !== 'undefined') {
			this.changeHighlight(event);
			if (param != 0) {
				//display list
				this.setState({ chooseDistance: param });
				document.getElementById("filterKMS").value = param
				document.getElementById("distanceSelected").value = param;
			} else {
				//display Map
				document.getElementById('storeListMap').style.visibility = 'hidden';
				document.getElementById('storeListSection').hidden = false;
			}

			//if(this.props.stateStoreList!=null && this.props.stateStoreList!='undefined' && this.props.stateStoreList.stores.length>0) {
			document.getElementById("storeListSection").innerHTML = this.drawForOneSection(this.props.stateStoreList.stores);
			//}
			//	else {
			//			return "<h2 class='noResults'>No stores found within "+document.getElementById("filterKMS").value+"km from you.</h2>"
			//	} // end of else for distance
		}
	}


	selectBrand(event, param) {
		//event.preventDefault();
		if (typeof window !== 'undefined') {
			if (event.target.checked) {
				document.getElementById("filterBrands").value = document.getElementById("filterBrands").value + ",brand=" + event.target.name;
			} else {
				let filterString = document.getElementById("filterBrands").value
				//console.log('filterString='+filterString)
				if (filterString != null && filterString.indexOf(",brand") >= 0) {
					let tempString = filterString.replace(",brand=" + event.target.id, "")
					//console.log('tempString='+tempString)
					document.getElementById("filterBrands").value = tempString
				}
			}
			if (this.props.stateStoreList != null && this.props.stateStoreList != 'undefined' && this.props.stateStoreList.stores.length > 0) {
				document.getElementById("storeListSection").innerHTML =
					this.drawForOneSection(this.props.stateStoreList.stores);
			}
			else {
				let noresultsString = "<h2 class='noResults'>No stores found within " +
					document.getElementById("filterKMS").value +
					"km from you.</h2>";
				document.getElementById("storeListSection").innerHTML = noresultsString;
			} // end of else for distance

			//console.log('document.getElementById(filterBrands).value='+document.getElementById("filterBrands").value)
		}
	}

	selectDay(event, param) {
		//event.preventDefault();
		if (typeof window !== 'undefined') {
			if (event.target.checked) {
				document.getElementById("filterDays").value = document.getElementById("filterDays").value + ",day=" + event.target.name;
			} else {
				let filterString = document.getElementById("filterDays").value
				if (filterString != null && filterString.indexOf(",day") >= 0) {
					let tempString = filterString.replace(",day=" + event.target.id, "")
					document.getElementById("filterDays").value = tempString
				}
			}
			if (this.props.stateStoreList != null && this.props.stateStoreList != 'undefined' && this.props.stateStoreList.stores.length > 0) {
				document.getElementById("storeListSection").innerHTML =
					this.drawForOneSection(this.props.stateStoreList.stores);
			}
			else {
				let noresultsString = "<h2 class='noResults'>No stores found within " +
					document.getElementById("filterKMS").value +
					"km from you.</h2>";
				document.getElementById("storeListSection").innerHTML = noresultsString;
			} // end of else for distance

			//console.log('document.getElementById("filterDays").value='+document.getElementById("filterDays").value)
		}
	}

	selectDept(event, param) {
		//event.preventDefault();
		if (typeof window !== 'undefined') {
			//console.log('selectDept, '+event.target.checked);
			if (event.target.checked) {
				document.getElementById("filterDepts").value = document.getElementById("filterDepts").value + ",dept=" + event.target.name;
			} else {
				let filterString = document.getElementById("filterDepts").value
				if (filterString != null && filterString.indexOf(",dept") >= 0) {
					let tempString = filterString.replace(",dept=" + event.target.id, "")
					document.getElementById("filterDepts").value = tempString
				}
			}
			if (this.props.stateStoreList != null && this.props.stateStoreList != 'undefined' && this.props.stateStoreList.stores.length > 0) {
				document.getElementById("storeListSection").innerHTML =
					this.drawForOneSection(this.props.stateStoreList.stores);
			}
			else {
				let noresultsString = "<h2 class='noResults'>No stores found within " +
					document.getElementById("filterKMS").value +
					"km from you.</h2>";
				document.getElementById("storeListSection").innerHTML = noresultsString;
			} // end of else for distance
		}

	}


	checkForDept(list, deptSearchArray) {
		let deptExists = false;
		for (let j = 0; j < list.departments.length; j++) {
			let tempDept = list.departments[j]

			if (deptSearchArray[0] == 'All') {
				deptExists = false;
				return deptExists;
			}

			for (let k = 0; k < deptSearchArray.length; k++) {
				if (tempDept == deptSearchArray[k]) {
					deptExists = true
					return deptExists
				}
			}
		}
		return deptExists
	}
	checkForBrand(list, brandSearchArray) {
		let brandExists = false;
		for (let j = 0; j < list.departments.length; j++) {
			let tempBrand = list.departments[j]

			for (let k = 0; k < brandSearchArray.length; k++) {
				if (tempBrand == brandSearchArray[k]) {
					brandExists = true
					return brandExists
				}
			}
		}
		return brandExists
	}
	checkForDay(list, daySearchArray) {
		let dayExists = false;
		for (let j = 0; j < list.openingHours.length; j++) {
			let tempDay = list.openingHours[j].day
			let tempHours = list.openingHours[j].hours
			for (let k = 0; k < daySearchArray.length; k++) {
				if (tempDay == daySearchArray[k] && tempHours != 'CLOSED' && tempHours != 'N/A' && tempHours != '' && tempHours != 'undefined') {
					dayExists = true
					return dayExists
				}
			}
		}
		return dayExists
	}



	drawForOneSection(list) {
		if (typeof window !== 'undefined') {
			document.getElementById('firstEntry').value = "100";
			let htmlData = "";
			let found = false;
			let distance = document.getElementById("filterKMS").value;
			let days = document.getElementById("filterDays").value;
			let departments = document.getElementById("filterDepts").value;
			let brands = document.getElementById("filterBrands").value;

			let daySearchExists = false;
			let daySearchCount = 0;
			let daySearchArray = [];
			if (days != null && days.trim().length > 3) {
				daySearchExists = true;
				let countObj = days.match(/,day=/g);
				if (countObj != null) {
					daySearchCount = countObj.length
				}
				daySearchArray = days.split(",day=");
			}


			let deptSearchExists = false;
			let deptSearchCount = 0;
			let deptSearchArray = [];
			let allCount = 0;
			if (departments != null && departments.trim().length > 3) {
				let countObj = departments.match(/,dept=All/g);
				if (countObj != null) {
					allCount = countObj.length
				}
				if (allCount == 1) {

				} else {
					deptSearchExists = true;
					countObj = departments.match(/,dept=/g).length
					if (countObj != null) {
						deptSearchCount = countObj.length
					}
					deptSearchArray = departments.split(",dept=");
				}
			}

			let brandSearchExists = false;
			let brandSearchCount = 0;
			let brandSearchArray = [];
			if (brands != null && brands.trim().length > 3) {
				brandSearchExists = true;
				let countObj = brands.match(/,brand=/g).length
				if (countObj != null) {
					brandSearchCount = countObj.length
				}
				brandSearchArray = brands.split(",brand=");
			}

			let count = 0;
			
			for (let i = 0; i < list.length; i++) {
				let recordData = "";
				let tempPhone = list[i].phoneNumber;
				let tempAddress = list[i].storeAddress;
				let tempStoreName = list[i].storeName;
				let tempDistance = list[i].distance;
				
				if (parseInt(distance) >= eval(tempDistance)) {

					if ((!daySearchExists && !deptSearchExists && !brandSearchExists) ||
						(daySearchExists && deptSearchExists && brandSearchExists && this.checkForDay(list[i], daySearchArray) && this.checkForDept(list[i], deptSearchArray) && this.checkForBrand(list[i], brandSearchArray)) ||
						(daySearchExists && deptSearchExists && this.checkForDay(list[i], daySearchArray) && this.checkForDept(list[i], deptSearchArray)) ||
						(daySearchExists && brandSearchExists && this.checkForDay(list[i], daySearchArray) && this.checkForBrand(list[i], brandSearchArray)) ||
						(deptSearchExists && brandSearchExists && this.checkForDept(list[i], deptSearchArray) && this.checkForBrand(list[i], brandSearchArray)) ||
						(daySearchExists && this.checkForDay(list[i], daySearchArray)) ||
						(deptSearchExists && this.checkForDept(list[i], deptSearchArray)) ||
						(brandSearchExists && this.checkForBrand(list[i], brandSearchArray))) {
						count = count + 1;
						found = true;
						let onClickString = "document.getElementById('storeListMap').style.visibility='visible';" +
							"document.getElementById('storeListSection').hidden=true;"
						//"document.getElementById('listLink').className='list';"
						let anotherClickString = "document.getElementById('mapLink').class='" + "\"map active\"" + "';"

						recordData = recordData +
							"<div class='branchDetails grid All Clothing Foods Homeware Beauty CountryRoad Trenery " + "Wednesday Thursday Friday Saturday Sunday Tuesday' >" +
							"<h2>" + tempStoreName + "<span>" + tempDistance + "KM" + "</span></h2>" +
							"<section class='listAddress grid grid__fourth--medium text-small' >" +
							"<ul class='lists'>" +
							"<li>" + tempPhone + "</li>" +
							"<li>" + tempAddress + "</li>" +

							"<li><a class='viewOnMap arrow-link--forward link--silent text-small' href='#'" + "onclick=" + onClickString + ">View on map</a></li>" +
							"</ul>" +
							"</section>" +



							"<section class='listTradingHours grid grid__fourth--medium text-small' >" +
							"<ul class='lists'>"
						{
							let seasonal = false;
							let item = list[i];
							for (let j = 0; j < item.openingHours.length; j++) {
								let tempDay = item.openingHours[j].day
								let tempHours = item.openingHours[j].hours

								if (tempHours == 'undefined' || tempHours == '') {
									tempHours = 'N/A';
								}

								if (item.exception == 'true') {
									recordData = recordData + '<li class="highlightPink">' + tempDay + '* <span>' + tempHours + '</span></li>';
									seasonal = true;
								} else {
									if (j == 0)
										recordData = recordData + '<li><strong>Today <span>' + tempHours + '</span></strong></li>';
									else
										recordData = recordData + '<li>' + tempDay + ' <span>' + tempHours + '</span></li>';
								}
							}
							if (seasonal) {
								recordData = recordData + '<li><span class="highlightPink seasonalHours">*Seasonal hours</span></li>'
							}
						}

						recordData = recordData +
							"</ul>" +
							"</section>" +
							"<section " +
							"class='listDepartments grid grid__fourth--medium text-small' ><strong>Departments</strong>:" +
							"<ul class='lists'>"
						{
							for (let j = 0; j < list[i].departments.length; j++) {
								let tempDept = list[i].departments[j]
								if (tempDept != 'Mimco' && tempDept != 'Witchery' && tempDept != 'Country Road' && tempDept != 'Trenery') {
									recordData = recordData + "<li>" + tempDept +
										"</li>"
								}
							}
						}
						recordData = recordData +
							"</ul>" +
							"</section>" +
							"<section class='listBrands grid grid__fourth--medium text-small'><strong>Brands</strong>:" +
							"<ul class='lists'>"
						{
							for (let j = 0; j < list[i].departments.length; j++) {
								let tempDept = list[i].departments[j]
								if (tempDept == 'Mimco' || tempDept == 'Witchery' || tempDept == 'Country Road' || tempDept == 'Trenery') {
									recordData = recordData + "<li>" + tempDept +
										"</li>"
								}
							}
						}
						recordData = recordData +
							"</ul>" +
							"</section>" +
							"<section class='listDepartments-mobile show-on-mobi'><a class='listDepartments-mobile-toggle' href='#'>Departments <span></span></a>" +
							"<ul class='lists listDepartments-mobile-dropDown' >"
						{
							for (let j = 0; j < list[i].departments.length; j++) {
								let tempDept = list[i].departments[j]
								if (tempDept != 'Mimco' && tempDept != 'Witchery' && tempDept != 'Country Road' && tempDept != 'Trenery') {
									recordData = recordData + "<li>" + tempDept +
										"</li>"
								}
							}
						}
						recordData = recordData +
							"</ul>" +
							"</section>" +
							"<section class='listBrands-mobile show-on-mobi'><a class='listBrands-mobile-toggle' href='#'>Brands <span></span></a>" +
							"<ul class='lists listBrands-mobile-dropDown' >"
						{
							for (let j = 0; j < list[i].departments.length; j++) {
								let tempDept = list[i].departments[j]
								if (tempDept == 'Mimco' || tempDept == 'Witchery' || tempDept == 'Country Road' || tempDept == 'Trenery') {
									recordData = recordData + "<li>" + tempDept +
										"</li>"
								}
							}
						}
						recordData = recordData +
							"</ul>" +
							"</section>" +
							"<a class='viewOnMap-mobile' href='#' onclick='showOnMap(" + tempStoreName + ")'>View on map</a>" +

							"</div>"
					} // end of if if(!daySearchExists && !deptSearchExists && !brandSearchExists)
				}// end of if for distance
				htmlData = htmlData + recordData
			}// end of for
			//	document.getElementById("countOfRecords").value=count;
			this.setState({ totalNoOfRecords: count })
			//console.log('count='+count);
			if (!found) {
				htmlData = htmlData + "<h2 class='noResults'>No stores found within " + document.getElementById("filterKMS").value + "km from you.</h2>"
			}
			return htmlData;
		}
	}


	callStoreLocatorDisplay() {
		if (typeof window !== 'undefined') {
			this.props.storeLocatorDisplay();
			this.setState({ chooseDistance: 5 });
			if (document.getElementById('fieldSuburb') != null) {
				document.getElementById('fieldSuburb').value = "";
			}
			if (document.getElementById('fldProvince') != null) {
				document.getElementById('fldProvince').value = "";
			}
		}
	}

	displayFilterSection() {
		if (typeof window !== 'undefined') {
			document.getElementById('searchListSection').hidden = false;
			document.getElementById('searchSection').hidden = true;
		}
	}
	displayMapSection(e) {
		e.preventDefault();
		if (typeof window !== 'undefined') {
			this.changeHighlight(e);
			document.getElementById('storeListMap').style.visibility = 'visible';
			//document.getElementById('storeListMap').hidden=false;
			document.getElementById('storeListSection').hidden = true;
		}
	}
	displayMapSectionThroughLink() {
		if (typeof window !== 'undefined') {
			if (document.getElementById('storeListMap') != null) {
				document.getElementById('storeListMap').hidden = false;
			}
			if (document.getElementById('storeListSection') != null) {
				document.getElementById('storeListSection').hidden = true;
			}
		}
	}
	displayListSection() {
		if (typeof window !== 'undefined') {
			//document.getElementById('storeListMap').hidden=false;
			document.getElementById('storeListMap').style.visibility = 'visible';
			document.getElementById('storeListSection').hidden = true;
		}
	}

	changeClassFilter(event) {
		event.preventDefault();
		if (typeof window !== 'undefined') {
			let filterName = event.target.className
			if (filterName == "filterSelector active") {
				event.target.className = "filterSelector"
				document.getElementById("filterBoard").style.cssText = "display: none;"

			} else {
				event.target.className = "filterSelector active"
				document.getElementById("filterBoard").style.cssText = "display: block;"
			}
		}
	}

	changeHighlight(event) {
		event.preventDefault();
		if (event.target.className.indexOf('last-child') >= 0) {
			event.target.className = 'last-child active';
		} else if (event.target.className.indexOf('map') >= 0) {
			event.target.className = 'map active';
		} else if (event.target.className.indexOf('list') >= 0) {
			event.target.className = 'list active';
		}
		else {
			event.target.className = 'active';
		}

		this.setForPreviousSibling(event.target.previousSibling);
		this.setForNextSibling(event.target.nextSibling);
	}

	setForPreviousSibling(event) {
		//event.preventDefault();
		if (event != null) {
			if (event.className.indexOf('list') >= 0) {
				event.className = 'list';
				return
			}
			else
				event.className = "none";
		}
		else
			return;

		this.setForPreviousSibling(event.previousSibling)
	}

	setForNextSibling(event) {
		//event.preventDefault();
		if (event != null) {
			if (event.className.indexOf('last-child') >= 0) {
				event.className = 'last-child';
				return
			} else if (event.className.indexOf('map') >= 0) {
				event.className = 'map';
				return
			}
			else
				event.className = "none";

		}
		else
			return;

		this.setForNextSibling(event.nextSibling)
	}

	render() {
		return (
			<div className="grid grid--space-y">
				<article>
					<header>
						<h1 className="text-caps font-graphic"> Near You</h1>
						<p className="floatR noMargT searchByAreaLink">

							<Link to="/storelocator" onClick={(e) => { this.callStoreLocatorDisplay(e) }} className="moreLink arrow-link--forward link--silent text-small">Search by area</Link>

						</p>
						<p className="intro resultDetails">
							<span className="searchingWrapper hidden">Searching for  in this area</span>
							<span className="resultsWrapper"><span className="numResults">
								<span type="label" id="countOfRecords" />{this.firstTimeCount()}</span>  found within <span className="dist"><span type="label" id="distanceSelected" />{this.firstTimeRadius()} km</span> from you.</span>
						</p>
					</header>
					<section className="storesNearYouFilter">
						<div className="filters">
							<Link to="" className="filterSelector" href="#" onClick={(e) => { this.changeClassFilter(e) }}>Choose Filter</Link>
							<div className="filterSelection" style={{ display: 'none' }} id="filterBoard">
								<form className="wForm" method="post" action="#" name="storeFilter" id="frmStoreFilter">
									<div className="dayFilters noBorder">
										<strong>Days:</strong>
										<ul className="lists">
											{this.drawDays(0, 3)}
										</ul>
										<ul className="lists lastFilterList">
											{this.drawDays(4, 6)}
										</ul>
									</div>
									<div className="filters">
										<strong>Departments:</strong>
										<ul className="lists">
											{this.drawDepartment('firstHalf')}
										</ul>
										<ul className="lists lastFilterList">
											{this.drawDepartment('secondHalf')}
										</ul>
									</div>
									<div className="brandFilters">
										<strong>Brands:</strong>
										<ul className="lists">
											{this.drawBrand()}
										</ul>
									</div>
								</form>
							</div>
						</div>
						<div className="filterDisplay">
							<Link to="" id="listLink" className="list active" onClick={(e) => { this.drawForKM(e, 0) }}>List</Link>
							<Link to="" id="mapLink" onClick={(e) => { this.displayMapSection(e) }} className="map">Map</Link>
						</div>
						<div className="filterDistance">
							<Link to="" className="none" id="linkOne" onClick={(e) => { this.drawForKM(e, 1) }}>1km</Link>
							<Link to="" className="active" id="linkFive" onClick={(e) => { this.drawForKM(e, 5) }}>5km</Link>
							<Link to="" className="none" id="linkTen" onClick={(e) => { this.drawForKM(e, 10) }}>10km</Link>
							<Link to="" className="none" id="linkFifteen" onClick={(e) => { this.drawForKM(e, 15) }}>15km</Link>
							<Link to="" className="none" id="linkTwentyFive" onClick={(e) => { this.drawForKM(e, 25) }}>25km</Link>
							<Link to="" className="last-child" id="linkFifty" onClick={(e) => { this.drawForKM(e, 50) }}>50km</Link>
						</div>
					</section>


					<section className="branchDetailsWrapper" id="storeListSection">
						{this.drawList()}
					</section>
					<section className="mapWrapper" id="storeListMap">
						<div id="googleMap" >
							{
								this.props.stateStoreList ? <StoreMap storedata={this.props.stateStoreList.stores} chooseDistance={this.state.chooseDistance} distance={this.distance} days={this.days} departments={this.departments} brands={this.brands} /> : <div></div>
							}
						</div>
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
		getStoreList: () => { dispatch(getStoreList()) },
		getLocationStoreList: () => { dispatch(getLocationStoreList()) },
		getEmptyStoreList: () => { dispatch(getEmptyStoreList()) },
		getDayList: (stateStoreList) => { dispatch(getDayList(stateStoreList)) }
	}
};

export default connect(mapStateToProps, matchDispatchToProps)(StoreList);



