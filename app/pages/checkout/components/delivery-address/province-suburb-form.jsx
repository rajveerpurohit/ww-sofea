import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class ProvinceSuburbForm extends Component {
  constructor(props) {
    super(props);

    this.getProvinceLabel = this.getProvinceLabel.bind(this);
    this.getSuburbLabel = this.getSuburbLabel.bind(this);
    this.getProvinceOptions = this.getProvinceOptions.bind(this);
    this.getSuburbOptions = this.getSuburbOptions.bind(this);

    this.onProvinceChange = this.onProvinceChange.bind(this);
    this.onSuburbChange = this.onSuburbChange.bind(this);
    this.onGoBackClick = this.onGoBackClick.bind(this);
    this.onSaveContinueClick = this.onSaveContinueClick.bind(this);

    this.state = {
      selectedSuburbId: ''
    };
  }

  onProvinceChange(e) {
    e.preventDefault();
    const provinceId = e.target.value;
    this.props.changeLocation(provinceId);

    return false;
  }

  onSuburbChange(e) {
    e.preventDefault();
    const suburbId = e.target.value;
    this.props.changeLocation(null, suburbId);
    this.setState({ selectedSuburbId: suburbId });

    return false;
  }

  onGoBackClick(evt) {
    const { hideProvinceSuburbForm } = this.props;

    if (hideProvinceSuburbForm) hideProvinceSuburbForm(evt);
    else evt.preventDefault();
  }

  onSaveContinueClick(evt) {
    const { hideProvinceSuburbForm, postDeliveryArea } = this.props;
    const { selectedSuburbId } = this.state;

    if (!_.isEmpty(selectedSuburbId) && postDeliveryArea) {
      postDeliveryArea({
        suburbId: selectedSuburbId,
        addSuburbToOrder: true
      }).then(
        () => {
          if (hideProvinceSuburbForm) hideProvinceSuburbForm(evt);
          else evt.preventDefault();
        },
        () => evt.preventDefault()
      );
    }
  }

  getProvinceLabel(pid) {
    const deliveryArea = this.props.DeliverAreaData;
    const area = deliveryArea.filter(a => a.id === pid);

    return area.length ? area[0].name : '';
  }

  getSuburbLabel(pid, sid) {
    const deliveryArea = this.props.DeliverAreaData;
    const area = deliveryArea.filter(a => a.id === pid);
    const suburbs = area.length ? area[0].suburbs : [];
    const suburbData = suburbs.filter(s => s.id === sid);

    return suburbData.length ? suburbData[0].name : '';
  }

  getProvinceOptions() {
    return _.map(this.props.DeliverAreaData, (ele) => {
      return (<option key={ele.id} value={ele.id}>{ele.name}</option>);
    });
  }

  getSuburbOptions(provinceId = 0) {
    if (!provinceId) return [];

    const deliveryArea = this.props.DeliverAreaData;
    const area = deliveryArea.filter(a => a.id === provinceId);
    const suburbsArr = area.length ? area[0].suburbs : [];
    const suburbOptions = [];
    suburbsArr.forEach((ele) => {
      suburbOptions.push(<option key={ele.id} value={ele.id}>{ele.name}</option>);
    });

    return suburbOptions;
  }

  render() {
    const selectLocation = this.props.deliveryDetails.selectCurrentLocation;
    const provinceLabel = this.getProvinceLabel(selectLocation.provinceId);
    const suburbLabel = this.getSuburbLabel(selectLocation.provinceId, selectLocation.suburbId);

    return (
      <section className="contentBlock">
        <section className="dashboardBlock">
          <span id="provinceSuburbContainer" name="provinceSuburbContainer">
            <h3>Confirm your delivery address</h3>
            <fieldset>
              <div className="customSelect enhanced-select" id="uniform-fldAddressProvince">
                <select id="fldAddressProvince" name="addressProvince" onChange={this.onProvinceChange} style={{ opacity: 0 }}>
                  <option value="selectProvince">Select a Province</option>
                  {this.getProvinceOptions(selectLocation.provinceId)}
                </select>
                <span className="enhanced-select__label">{ provinceLabel || 'Select a Province'}&nbsp;</span>
                <span className="icon enhanced-select__icon" />
                <div className="formErrors">Select a Province</div>
              </div>
            </fieldset>
            <fieldset>
              <div className="customSelect enhanced-select" id="uniform-fldSuburb">
                <select name="suburbId" id="fldSuburb" onChange={this.onSuburbChange} style={{ opacity: 0 }}>
                  <option value="selectProvince">Select a Suburb</option>
                  {this.getSuburbOptions(selectLocation.provinceId)}
                </select>
                <span className="enhanced-select__label">{ suburbLabel || 'Select a Suburb' }&nbsp;</span>
                <span className="icon enhanced-select__icon" />
                <div className="formErrors">Select a Suburb</div>
              </div>
            </fieldset>
          </span>
          <section className="fieldsetFooter">
            <p className="floatL noMargT">
              <Link onClick={this.onGoBackClick} className="moreLink prevLink">Go back</Link>
            </p>
            <input type="button" id="btnContinue" name="btnContinue" className="button floatR" value="save &amp; continue" onClick={this.onSaveContinueClick} />
          </section>
        </section>
      </section>
    );
  }
}

export default ProvinceSuburbForm;
