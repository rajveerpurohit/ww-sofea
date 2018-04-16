import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import SideBarComponent from '../../components/basic/SideBarContent';
import StoreByGeoLocation from '../../components/basic/store-by-geo-location';
import StoreList from '../../components/basic/store-list';
import Dropdown from '../../components/basic/Dropdown';
import { getStoreLocator } from './actions';

import {
  getStoreList,
  getLocationStoreList,
  getEmptyStoreList
} from '../../components/basic/store-list/actions';
import './storelocator.scss';

class StoreLocator extends Component {
  static need = [getStoreLocator];

  constructor(props) {
    super(props);
    this.state = {
      data: 'none',
      radius: '5',
      firstProv: 'Select a Province',
      firstSuburb: 'Select a Suburb',
      firstProvValue: '',
      firstSuburbValue: '',
      showStoreNearMeSection: false
    };

    this.updateState = this.updateState.bind(this);
    this.updateRadius = this.updateRadius.bind(this);
    this.primeComponent = this.primeComponent.bind(this);
    this.hideList = this.hideList.bind(this);
    this.displayList = this.displayList.bind(this);
    this.initGeolocation = this.initGeolocation.bind(this);
    this.success = this.success.bind(this);
    this.fail = this.fail.bind(this);

    this.renderSelectProvienceDropdown = this.renderSelectProvienceDropdown.bind(this);
    this.onProvienceSelect = this.onProvienceSelect.bind(this);
    this.renderSelectSuburbDropdown = this.renderSelectSuburbDropdown.bind(this);
    this.onSuburbSelect = this.onSuburbSelect.bind(this);
    this.makeLinkActive = this.makeLinkActive.bind(this);
  }

  onSuburbSelect(e) {
    e.preventDefault();
    const { value } = e.target;

    if (value === 'Select a Suburb') {
      this.setState({ firstSuburbValue: value });
      return;
    }

    const options = [...this.props.DeliverAreaData];
    const selectProvience = options.find(
      provData => provData.name === this.state.firstProvValue
    );
    const selectSuburb = selectProvience.suburbs.find(
      suburb => suburb.name === e.target.value
    );

    this.setState({ data: selectSuburb.id, firstSuburbValue: e.target.value });
  }

  onProvienceSelect(e) {
    e.preventDefault();
    this.setState({ firstProvValue: e.target.value });
  }

  updateState(selectedSuburb) {
    this.setState({ data: selectedSuburb });
  }

  updateRadius(rad) {
    this.setState({ radius: rad });
  }

  hideList() {
    this.firstEntryNode.value = '-1';
    this.exitNode.value = 'true';

    this.setState({ data: 'none', radius: '5' });

    this.props.getEmptyStoreList();
    this.searchListSectionNode.hidden = true;
    this.searchSectionNode.hidden = false;
    document.getElementById('storeListMap').style.visibility = 'hidden';
    document.getElementById('storeListSection').hidden = false;
  }

  makeLinkActive(radius) {
    const linkIds = {
      1: 'linkOne',
      5: 'linkFive',
      10: 'linkTen',
      15: 'linkFifteen',
      25: 'linkTwentyFive',
      50: 'linkFifty'
    };

    _.map(linkIds, (id, rad) => {
      const cls = (rad === radius) ? 'active' : 'none';

      if (id === 'linkFifty') {
        const _cls = (cls === 'active') ? 'last-child active' : 'last-child';

        document.getElementById(id).className = _cls;
      } else {
        document.getElementById(id).className = cls;
      }
    });
  }

  displayList(event, search) {
    event.preventDefault();
    const { radius } = this.state;

    if (search === 'area') {
      if (this.state.data === 'none') return;

      const suburbParams = {
        suburbId: this.state.data,
        distance: '50'
      };

      this.exitNode.value = 'false';
      this.firstEntryNode.value = '-1';
      this.makeLinkActive(radius);
      this.setState({ firstSuburbValue: '', firstProvValue: '' });
      this.props.getStoreList(suburbParams);
    } else if (search === 'geo') {
      const geoLocationParams = {
        latitude: this.latitudeNode.value,
        longitude: this.longitudeNode.value,
        distance: '50'
      };

      this.exitNode.value = 'false';
      this.firstEntryNode.value = '-1';
      this.makeLinkActive(radius);
      this.props.getLocationStoreList(geoLocationParams);
    }

    // filter params
    this.filterKMSNode.value = this.state.radius;
    this.filterDaysNode.value = '';
    this.filterDeptsNode.value = '';
    this.filterBrandsNode.value = '';
    this.searchListSectionNode.hidden = false;
    this.searchSectionNode.hidden = true;
    document.getElementById('storeListMap').style.visibility = 'hidden';
    document.getElementById('storeListSection').hidden = false;
    document.getElementById('listLink').className = 'list active';
    document.getElementById('mapLink').className = 'map';
  }

  initGeolocation() {
    if (typeof navigator !== 'undefined') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.success, this.fail);
      } else {
        // this.findAStoreNearMeNode.hidden = true;
        this.orNode.hidden = true;
        this.setState({ showStoreNearMeSection: false });
      }
    }
  }

  fail() {
    // this.findAStoreNearMeNode.hidden = true;
    this.orNode.hidden = true;
    this.setState({ showStoreNearMeSection: false });
  }

  success(position) {
    this.longitudeNode.value = position.coords.longitude;
    this.latitudeNode.value = position.coords.latitude;
    // this.findAStoreNearMeNode.hidden = false;
    this.orNode.hidden = false;
    this.setState({ showStoreNearMeSection: true });
  }

  primeComponent() {
    return (
      <div>
        <input type="hidden" id="filterBrands" ref={n => (this.filterBrandsNode = n)} default="" />
        <input type="hidden" id="filterKMS" ref={n => (this.filterKMSNode = n)} default="5" />
        <input type="hidden" id="filterDays" ref={n => (this.filterDaysNode = n)} default="" />
        <input type="hidden" id="filterDepts" ref={n => (this.filterDeptsNode = n)} default="" />
        <input type="hidden" id="longitude" ref={n => (this.longitudeNode = n)} default="" />
        <input type="hidden" id="latitude" ref={n => (this.latitudeNode = n)} default="" />
        <input type="hidden" id="firstEntry" ref={n => (this.firstEntryNode = n)} default="-1" />
        <input type="hidden" id="exit" ref={n => (this.exitNode = n)} default="false" />
        <div className="site-page content--centered">
          <main className="grid grid--space-y site-main">
            <div className="main-page ">
              <nav className="breadcrumb empty" />
              <input type="hidden" defaultValue="#" id="referer_url" />
              <div className="grid grid--space-y page-layout">
                <div className="page-layout__aside">
                  {this.props.contentAside && (
                    <SideBarComponent
                      leftData={this.props.contentAside}
                      isActive={this.props.location.pathname}
                    />
                  )}
                </div>
                <div className="page-layout__content">
                  <div id="searchSection" ref={n => (this.searchSectionNode = n)} >
                    <div className="grid grid--space-y">
                      <header>
                        <h1 className="text-caps font-graphic">
                          Store Locator
                        </h1>
                      </header>
                      <article className="findAStore grid">
                        <div className="grid grid__half--medium">
                          {this.state.showStoreNearMeSection && (
                            <section
                              ref={n => (this.findAStoreNearMeNode = n)}
                              className="findAStoreNearMe"
                              style={{ width: '100%' }}
                              id="findAStoreNearMe"
                            >
                              {<StoreByGeoLocation radius={this.updateRadius} />}

                              <div
                                className="form-field storeRadiusButton"
                                data-js="form-field"
                              >
                                <Link
                                  className="button btn btn--primary"
                                  id="findKMSubmit"
                                  onClick={e => this.displayList(e, 'geo')}
                                >
                                  show nearby Store
                                </Link>{' '}
                              </div>
                            </section>
                          )}
                        </div>
                        <section className="or grid grid__fourth--medium display-none--mobi-max" id="or" ref={n => (this.orNode = n)}>
                          <strong>Or</strong>
                          <span />
                        </section>
                        <div className="grid grid__fourth--medium">
                          <section
                            className="findAStoreByArea"
                            style={{ width: '100%' }}
                            id="findAStoreByArea"
                          >
                            <div>
                              <h2 className="text-caps font-graphic">
                                Find a Store by area
                              </h2>
                              {this.renderSelectProvienceDropdown()}
                              {this.state.firstProvValue &&
                                this.renderSelectSuburbDropdown()}

                              <div className="storeInMyAreaButton">
                                <Link
                                  className="button btn btn--primary"
                                  id="findStoresSubmit"
                                  onClick={e => this.displayList(e, 'area')}
                                >
                                  show Store by area
                                </Link>
                              </div>
                            </div>
                          </section>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div id="searchListSection" hidden ref={n => (this.searchListSectionNode = n)} >
                    <StoreList
                      storeLocatorDisplay={this.hideList}
                      subId={this.state.data}
                      radius={this.state.radius}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  renderSelectProvienceDropdown() {
    const options = [{ id: 'default', name: 'Select a Province' }, ...this.props.DeliverAreaData];
    const optionList = options.map(({ id, name }) => ({
      id,
      value: name,
      label: name
    }));

    return (
      <Dropdown
        id="provience"
        name="productId"
        options={optionList}
        selectedValue={this.state.firstProvValue || this.state.firstProv}
        classNames="quantitySelected"
        onChange={this.onProvienceSelect}
      />
    );
  }

  renderSelectSuburbDropdown() {
    const options = [...this.props.DeliverAreaData];
    const selectProvience = options.find(
      provData => provData.name === this.state.firstProvValue
    );

    const allSuburbs = selectProvience.suburbs;
    const optionList = [{ id: 'default', name: 'Select a Suburb' }, ...allSuburbs].map(({ id, name }) => ({
      id,
      value: name,
      label: name
    }));

    return (
      <Dropdown
        id="suburb"
        name="suburb"
        options={optionList}
        selectedValue={this.state.firstSuburbValue || this.state.firstSuburb}
        classNames="quantitySelected"
        onChange={this.onSuburbSelect}
      />
    );
  }

  render() {
    return (
      <div className="store-locator">
        {this.primeComponent()}
        {this.initGeolocation()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentAside: state.storeLocatorReducer.contentAside,
    // DeliverAreaData: state.deliveryDetails.deliveryArea
    DeliverAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', [])
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    getStoreList: suburbParams => dispatch(getStoreList(suburbParams)),
    getLocationStoreList: geoLocationParams => dispatch(getLocationStoreList(geoLocationParams)),
    getEmptyStoreList: () => dispatch(getEmptyStoreList())
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(StoreLocator);
