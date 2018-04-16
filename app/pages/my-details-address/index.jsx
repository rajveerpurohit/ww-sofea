import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { updateC2addressDetails, getProvince, deleteaddress, updateaddressDetails, getaddressDetails, addNewAddress, getC2addressDetails } from './actions';
import AddressForm from '../../components/basic/delivery-slot-modal/address-form';
import AddressFormUpdate from './address-form';
import { changeLocation } from '../../components/compound/deliveryDetails/actions';



class MyDetailsAddress extends Component {

  constructor(props) {
    super(props);
    const { c2address } = this.props;
    this.state = {
      toggleDivName: '',
      addressid: null,
      c2EditForm: '',
      c2address: {
        address2: c2address && c2address.address2 || '',
        address1: c2address && c2address.address1 || '',
        postalCode: c2address && c2address.postalCode || '',
        cityID: c2address && c2address.cityID || '',
        province: c2address && c2address.province || '',
        cityName: c2address && c2address.cityName || '',
        countryCode: c2address && c2address.countryCode || '',
        suburb: c2address && c2address.suburb || '',
        addressResidenceTypeID: c2address && c2address.addressResidenceTypeID || '',
        provinceName: c2address && c2address.provinceName || '',
      }
    }
    this.primeComponent = this.primeComponent.bind(this);
    this.addressPanel = this.addressPanel.bind(this);
    this.toggleDiv = this.toggleDiv.bind(this);
    this.toggleCloseDiv = this.toggleCloseDiv.bind(this);
  }
  componentDidMount() {
    if (this.props.synchronizeStatus && this.props.corporateNumber) {
      this.props.getC2addressDetails();
      this.props.getaddressDetails();
    }else{
      this.props.getaddressDetails();
    }
  }
  toggleDiv(e, addressid) {
    const attrValue = e.target.attributes['data-toggle-target'] && e.target.attributes['data-toggle-target'].value;
    this.setState({
      toggleDivName: attrValue !== this.state.toggleDivName ? attrValue : '',
      addressid
    });
  }
  toggleCloseDiv() {
    this.setState({
      toggleDivName: '',
    });
  }
  toggleDivC2(e, addressID) {
    const attrValue = e.target.attributes['data-toggle-target'] && e.target.attributes['data-toggle-target'].value;
    this.setState({
      c2EditForm: attrValue !== this.state.toggleDivName ? attrValue : '',
    });
    if(addressID) this.props.getProvince(addressID);
  }

  handleInputChange(e, formObj, inputPropName) {
    const newState = Object.assign({}, this.state);
    newState[formObj][inputPropName] = e.target.value;
    this.setState(newState);
  }
  handleFieldChanged(field) {
    return (e) => {
      const newState = { ...this.state };
      newState['c2address'][field] = e.target.value;
      this.setState(newState);
    };
  }
  primeComponent(addresses) {
    const { toggleDivName, addressid } = this.state;
    delete addresses['links'];
    const charStyles = { display: 'inline', marginLeft: 20, fontSize: 12 };
    const instClass = 'text-small text-dampen';
    return (
        <section className="contentBlock">
        <p className="text-intro">This is not your billing address, but delivery addresses you've saved during previous checkouts. Add as many addresses as you need to make your checkout process as easy as possible.
        </p>
        <div id="removeAddressID" className="flex-parent" key={addresses.recipientName}>
          {Object.keys(addresses) && Object.keys(addresses).length > 0 ? Object.keys(addresses).reverse().map((address, index)=>this.addressPanel(addresses[address], index)) : null}
        </div>
        <p>
          <button className="btn btn--right btn--primary link--silent" data-toggle-target="content-edit-form" onClick={(e)=>this.toggleDiv(e,null)} >Add a New Delivery Address</button>
        </p>
        <div className="contactFormBlock formBlockFull formBlock" id="editAddressWrapper" />
        {toggleDivName ?
          <div className='grid__two-thirds--large addressForm'>
          { addressid ?
            <AddressFormUpdate charStyles={charStyles} instClass={instClass} toggleCloseDiv={this.toggleCloseDiv} activeAddress={addressid} closeForm={this.toggleDiv} {...this.props}/> :
            <AddressForm charStyles={charStyles} instClass={instClass} toggleCloseDiv={this.toggleCloseDiv} {...this.props} closeForm={this.toggleDiv} count/>
          }
          </div>
        : null}
        </section>
      );
  }
  addressPanel(address, index) {
    return (
        <article className="panel panel-card panel--flex" key={address.id}>
          <header className="panel-card__header">
            <h3 className="text-caps no-wrap--ellipsis font-graphic" id="nicknameDisplay">{address.nickname}</h3>
          </header>
          <section className="panel-card__body">
          <p>{address.recipientName}<br/>
          {address.address1}<br/>
          {address.address2}<br/>
          {address.address3}<br/>
          {address.suburb}<br/>
          {address.postalCode}<br/>
          {address.city}<br/></p>
          <p><strong>Contact Numbers</strong>:<br />{address.primaryContactNo}<br />{address.secondaryContactNo}</p>
          </section>
          <footer className="panel-card__footer">
            <p><span className="icons-text text-small link--silent arrow-link--forward" data-toggle-target="content-create-form" onClick={(e)=>this.toggleDiv(e, address.nickname)}>Edit this address</span><br /></p>
            { index !== 0 ?
            <button type="submit" className="cancel-btn flush btn btn--silent text-small" onClick={()=>this.props.deleteaddress(address)}>
              <span>Delete this address</span>
              <span className="icon"></span>
            </button>
            : null}
          </footer>
        </article>
    );
  }

  renderC2Address(address) {
    const { ficaUser, suburb, provinceMap, cityMap } = this.props;
    return (
      <section className="" key={address.addressID}>
        <article className="panel panel-card panel--flex">
          <header className="panel-card__header">
            <h3 className="text-caps no-wrap__ellipsis font-graphic" id="nicknameDisplay">{address.addressTypeID === 1 ? 'Postal' : 'PHYSICAL'} </h3>
          </header>
          <section className="panel-card__body physical">
            <p>{address.address1}<br /><br />{address.cityName}<br />{address.provinceName}<br /></p>
          </section>
          {(ficaUser && ficaUser.ficaUser) ? <footer className="panel-card__footer">
            <p><span className="icons-text text-small link--silent arrow-link--forward" data-toggle-target="c2-edit-form" onClick={(e)=>this.toggleDivC2(e, address.addressID)}>Edit this address</span><br /></p>
          </footer>: null}
        </article>
        {this.state.c2EditForm ==='c2-edit-form' ?
          <section>
            <div className="grid" id="editPhysicalAddressWrapper">
              <div className="grid">
                <div className="grid__two-thirds--large">
                    <form method="post" data-reveal="true" name="updatePhysicalAddressForm" className="updatePhysicalAddressForm">
                        <div className="form-field">
                            <input maxlength="50" name="address1" id="fldaddress1" placeholder="Address line 1*" type="text" className="stdFld" value={address.address1} onChange={ this.handleFieldChanged('address1') } />
                        </div>
                        <div className="form-field">
                            <input maxlength="50" name="address2" id="fldaddress2" placeholder="Address line 2" type="text" className="stdFld" value={address.address2} onChange={ this.handleFieldChanged('address2') } />
                        </div>
                        <div className="form-field">
                            <div>
                              <span className="enhanced-select">
                                  <select data-js="enhance-select" name="suburbSelect" id="suburbSelect" value={address.suburbSelect} onChange={ this.handleFieldChanged('suburbSelect') } >
                                    <option data-validate-unselected="true" disabled="disabled">Please select Suburb</option>
                                    {suburb && suburb.map((item,index)=><option value={item} key={index}>{item}</option>)}
                                    {/*_.forOwn(suburb, (value, key) => <option value={key} key={key}>{value}</option>)*/}
                                  </select>
                                  <span className="enhanced-select__label"> {address.suburbSelect || 'Please select Suburb'}&nbsp;</span><span className="icon enhanced-select__icon"></span>
                              </span>
                            </div>
                        </div>
                        <div className="form-field">
                            <div>
                              <span className="enhanced-select">
                            <select data-js="enhance-select" name="city" id="provinceSelect" value={address.city} onChange={ this.handleFieldChanged('city') } >
                              <option data-validate-unselected="true" disabled="disabled">Please select City</option>
                              {/*_.forOwn(cityMap, (value, key) => <option value={key} key={key}>{value}</option>)*/}
                              {/*{_.map(_.toPairs(cityMap), d => _.fromPairs([d])).map((item, index) => <option value={index} key={index}>{Object.keys(item)[0]}</option>)}*/}
                              </select>
                              <span className="enhanced-select__label"> {address.city || 'Please select City'}&nbsp;</span>
                              <span className="icon enhanced-select__icon"></span></span>
                            </div>
                        </div>
                        <div className="form-field">
                            <div>
                              <span className="enhanced-select">
                                  <select data-js="enhance-select" name="provinceSelect" id="provinceSelect" value={address.provinceSelect} onChange={ this.handleFieldChanged('provinceSelect') } >
                                    <option data-validate-unselected="true" disabled="disabled">Please select Province</option>
                                    {/*_.forOwn(provinceMap, (value, key) => <option value={key} key={key}>{value}</option>)*/}
                                    {/*{_.map(_.toPairs(provinceMap), d => _.fromPairs([d])).map((item, index) => <option value={index} key={index}>{Object.keys(item)[0]}</option>)}*/}
                                  </select>
                                  <span className="enhanced-select__label">{address.provinceSelect || 'Please select Province'}&nbsp;</span><span className="icon enhanced-select__icon"></span>
                              </span>
                            </div>
                        </div>
                        <div className="form-field">
                            <input type="text" id="fldNewPostal" name="fldNewPostal" placeholder="Postal code" disabled="true" value={address.fldNewPostal} onChange={ this.handleFieldChanged('fldNewPostal') } />
                        </div>
                        <p className="information">*Required fields</p>
                        <div className="submitField">
                            <input name="submit" id="fldSubmit" type="button" value="Update" className="btn btn--primary" onClick={(e)=>this.props.updateC2addressDetails(this.state.c2address).then(()=>this.toggleDivC2())}/>
                            <button type="reset" className="btn btn--silent cancel-btn" id="fldCancelEdit" data-toggle-target="c2-edit-form" onClick={(e)=>this.toggleDivC2(e, null)}>Cancel<span className="icon"></span></button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          :null
        }
    </section>
    )
  }

  render() {
    const { c2address, addresses } = this.props;
    return (
      <div className="page-layout__content">
      { c2address && c2address.length > 0 ? c2address.map((address)=>this.renderC2Address(address)) : null }
        <h2 className="font-graphic heading--3 text-caps">My Online Delivery Addresses</h2>
        {this.primeComponent(addresses)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addresses: state.addressDetailsReducer.addressDetails.address,
    c2address: state.addressDetailsReducer.addressDetails.c2address.c2AddressBean,
    ficaUser: state.addressDetailsReducer.addressDetails.c2address.ficaUser,
    resetForm: state.addressDetailsReducer.addressDetails.resetForm,
    deliveryDetails: state.deliveryDetails,
    synchronizeStatus: state.clp.currentUser.synchronizeStatus,
    DeliverAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', {}),
    corporateNumber: _.get(state, 'clp.currentUser.corporateNumber', {}),
    cityMap: _.get(state, 'addressDetailsReducer.addressDetails.cityMap', {}),
    provinceMap: _.get(state, 'addressDetailsReducer.addressDetails.provinceMap', {}),
    suburb: _.get(state, 'addressDetailsReducer.addressDetails.suburb', {}),
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateC2addressDetails, getProvince, addNewAddress, changeLocation, deleteaddress, updateaddressDetails, getaddressDetails, getC2addressDetails }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(MyDetailsAddress);