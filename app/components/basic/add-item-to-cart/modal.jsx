import React, { Component } from 'react';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';
import classnames from 'classnames';
import _ from 'lodash';

// TODO: Need to merge this modal with existing delivery modal.

class DeleveryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstProv: 'Select a Province',
      firstSuburb: 'Select a Suburb',
      firstProvValue: '',
      firstSuburbValue: '',
      nonDelieverable: '',
      suburbsData: [],
      inventoryCheckSucceeded: !props.performInventoryCheck
    };

    this.renderProvienceMenu = this.renderProvienceMenu.bind(this);
    this.renderSuburbMenu = this.renderSuburbMenu.bind(this);
    this.provienceSelect = this.provienceSelect.bind(this);
    this.suburbsSelect = this.suburbsSelect.bind(this);
    this.continueOption = this.continueOption.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.renderContinueShoppingButton = this.renderContinueShoppingButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { nonDelieverable } = nextProps;

    this.setState({ nonDelieverable, inventoryCheckSucceeded: !nonDelieverable });
  }

  continueOption(evt) {
    evt.preventDefault();

    if (typeof window !== 'undefined' && window) {
      localStorage.setItem('SelectedOption', this.state.firstSuburb);
    }

    const locDetails = {
      provinceId: this.state.firstProvValue,
      suburbId: this.state.firstSuburbValue
    };

    this.props.continueOption(locDetails);
    this.deactivateModal();
  }

  deactivateModal() {
    this.props.deactivateModal();
  }

  provienceSelect(event) {
    event.preventDefault();

    const { value, options, selectedIndex } = event.target;

    if (value === '') {
      this.setState({
        firstProv: 'Select a Province',
        firstProvValue: ''
      });
    } else {
      const suburbs = this.props.provienceData.find(provData => provData.id === value);

      this.setState({
        firstProv: _.get(options, `[${selectedIndex}].text`, ''),
        firstProvValue: value,
        firstSuburb: 'Select a Suburb',
        firstSuburbValue: '',
        suburbsData: suburbs || []
      });
    }
  }

  suburbsSelect(event) {
    event.preventDefault();

    const { value, options, selectedIndex } = event.target;

    if (value === '') {
      this.setState({
        firstSuburb: 'Select a Suburb',
        firstSuburbValue: ''
      });
    } else {
      this.setState({
        firstSuburb: _.get(options, `[${selectedIndex}].text`, ''),
        firstSuburbValue: value
      });
    }

    if (this.props.performInventoryCheck) this.props.performInventoryCheck({ suburbId: value });
  }

  renderContinueShoppingButton() {
    const classes = classnames('btn', 'btn--secondary', 'btn--right', { hidden: this.state.firstSuburbValue === '' });

    return (
      <div className="grid grid--space-y intro productOrder">
        <button
          id="btnContinue"
          type="button"
          onClick={this.continueOption}
          className={classes}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  renderProvienceMenu() {
    if (this.props.provienceData) {
      return (
        <div className="is-loading" id="provinceContainer">
          <span className="enhanced-select">
            <select
              id="fldProvince"
              name="province"
              className="customSelect"
              onChange={this.provienceSelect}
            >
              <option value="">Select a Province</option>
              {this.renderProvienceMenuOptions()}
            </select>
            <span className="enhanced-select__label">
              {this.state.firstProvValue === '' ? 'Select a Province' : this.state.firstProv}
            </span>
            <span className="icon enhanced-select__icon" />
          </span>
          <span id="province-loader" className="loading--dark" />
        </div>
      );
    }

    return null;
  }

  renderProvienceMenuOptions() {
    if (this.props.provienceData) {
      return this.props.provienceData.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        );
      });
    }

    return null;
  }

  renderSuburbMenu() {
    const classes = classnames('form-field', 'is-loading', { hidden: this.state.firstProvValue === '' });
    return (
      <div id="selSuburb" className={classes}>
        <span className="enhanced-select">
          <select
            name="suburbId"
            id="fieldSuburb"
            className="customSelect"
            onChange={this.suburbsSelect}
          >
            <option value="">Select a Suburb</option>
            {this.renderSuburbMenuOptions()}
          </select>
          <span className="enhanced-select__label">
            {this.state.firstSuburbValue === '' ? 'Select a Suburb' : this.state.firstSuburb}
          </span>
          <span className="icon enhanced-select__icon" />
        </span>
      </div>
    );
  }

  renderSuburbMenuOptions() {
    if (this.state.suburbsData && !_.isEmpty(this.state.suburbsData.suburbs)) {
      return this.state.suburbsData.suburbs.map((item, index) => {
        return (
          <option key={index} data-name={item.name} value={item.id}>
            {item.name}
          </option>
        );
      });
    }

    return null;
  }

  render() {
    return (
      <div>
        <AriaModal titleText="deliveryArea" verticallyCenter focusDialog onExit={this.props.deactivateModal}>
          <div className="modal__box modal__box--panel modal__box--size-w-large">
            <Link
              className="icon icon--close-circ-dark modal__close"
              onClick={this.props.deactivateModal}
            >
              close
            </Link>
            <div className="heading heading--3 font-graphic modal__head" data-js="modal-head">
              Select your delivery location
            </div>
            <div className="modal__content">
              <form id="deliverylocform">
                <div className="form-field">
                  <label htmlFor="select-example" className="form-field__label text-small">
                    Select a province to see a list of suburbs that we deliver this product to:
                  </label>
                  {this.renderProvienceMenu()}
                </div>

                {this.renderSuburbMenu()}

                <span id="delivery-location-message" className="form-field__msg form-field__msg--error">
                  {this.state.nonDelieverable}
                </span>

                <div id="suburbSelect" className="grid grid--space-y">
                  {!this.state.nonDelieverable && this.renderContinueShoppingButton()}
                </div>

                {this.state.nonDelieverable && (<div className="grid grid--space-y hidden" id="suburbSelectNoFFCentre">
                  <button
                    id="btnCancel"
                    type="button"
                    className="btn btn--secondary btn--right hidden"
                  >
                    Cancel
                  </button>
                </div>)}
              </form>
            </div>
          </div>
        </AriaModal>
      </div>
    );
  }
}

export default DeleveryModal;
