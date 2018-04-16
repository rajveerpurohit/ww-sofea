import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dropdown from '../Dropdown';
import DeliveryModal from './modal';
import DeleverySlotModel from '../delivery-slot-modal';
import DeliverySlotUpdateModal from './delivery-slot-update-modal';

import { tagAddToCart, tagRemoveFromCart } from '../../../gtm/gtmActions';
import {
  getUserAddresses, changeLocation, reserveDeliverySlots,
  changeDeliveryAddress, showAddressForm, addNewAddress,
  setCurrentAddress
} from '../../compound/deliveryDetails/actions';

import {
  DEFAULT_ITEM_QUANTITY_LABEL,
  ALLOWED_ITEM_QUANTITY_LIST,
  DEFAULT_ITEM_QUANTITY
} from '../../../Constants';

class AddItemToCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.selectedValue || DEFAULT_ITEM_QUANTITY,
      modalActive: false,
      hasDeliverySlotModal: false,
      isAddCartButtonClicked: false,
      showDeleverySlotModel: false,
      provinceId: '',
      suburbId: '',
      postalCode: '',
      error: false,
      errorMessage: ''
    };

    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onQuantityClick = this.onQuantityClick.bind(this);

    this.addItemToCart = this.addItemToCart.bind(this);
    this.getProductItems = this.getProductItems.bind(this);
    this.trackAddToCart = this.trackAddToCart.bind(this);
    this.trackRemoveFromCart = this.trackRemoveFromCart.bind(this);

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.continueOption = this.continueOption.bind(this);
    this.performInventoryCheck = this.performInventoryCheck.bind(this);

    this.renderRemoveItemElm = this.renderRemoveItemElm.bind(this);
    this.renderDeliveryModal = this.renderDeliveryModal.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
    this.renderProductErrors = this.renderProductErrors.bind(this);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddNewSlot = this.handleAddNewSlot.bind(this);
    this.handleCancelSlot = this.handleCancelSlot.bind(this);
    this.deactivateDeliverySlotModal = this.deactivateDeliverySlotModal.bind(this);
    this.renderDeliverySlotModal = this.renderDeliverySlotModal.bind(this);

    this.deactivateDeliverySlotUpdateModal = this.deactivateDeliverySlotUpdateModal.bind(this);
    this.renderDeliverySlotUpdateModal = this.renderDeliverySlotUpdateModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedValue, nonDelieverable, cartDetails } = nextProps;

    const nextState = {
      selectedValue: selectedValue || this.state.selectedValue || DEFAULT_ITEM_QUANTITY,
      errorMessage: nonDelieverable || '',
      error: !!nonDelieverable
    };

    if (!_.isEmpty(cartDetails) && _.isArray(cartDetails.reservedDeliverySlots) && !_.isEmpty(cartDetails.reservedDeliverySlots)) {
      nextState.hasDeliverySlotModal = true;
    }

    this.setState(nextState);
  }

  onQuantityChange(evt) {
    evt.preventDefault();

    const suburbId = _.get(this.props, 'currentUser.suburb.id', null);

    if (suburbId || this.props.fromCLP) {
      const selectedValue = Number(evt.target.value);
      this.setState({ selectedValue });
    } else {
      this.setState({ modalActive: true });
    }
  }

  onQuantityClick(evt) {
    evt.preventDefault();

    const { onOptionClick } = this.props;

    if (onOptionClick) {
      const suburbId = _.get(this.props, 'currentUser.suburb.id', null);

      if (suburbId) {
        onOptionClick(evt);
      } else {
        this.setState({ modalActive: true });
      }
    }
  }

  handleEdit(evt) {
    if (evt) evt.preventDefault();

    this.setState({ hasDeliverySlotModal: false, isAddCartButtonClicked: false });
    this.props.loader(true);
    this.props.getUserAddresses(this.props.deliveryDetails)
      .then(() => {
        this.props.loader(false);
        this.setState({ showDeleverySlotModel: true });
      });
  }

  handleAddNewSlot(evt) {
    this.handleEdit(evt);
  }

  handleCancelSlot(evt) {
    this.deactivateDeliverySlotModal(evt);
  }

  deactivateDeliverySlotModal(evt) {
    if (evt) evt.preventDefault();

    this.props.loader(false);
    this.setState({
      hasDeliverySlotModal: false,
      isAddCartButtonClicked: false,
      showDeleverySlotModel: false
    });
  }

  deactivateDeliverySlotUpdateModal(evt) {
    if (evt) evt.preventDefault();

    this.setState({ hasDeliverySlotModal: false, isAddCartButtonClicked: false });
  }

  addItemToCart(evt) {
    evt.preventDefault();

    const suburbId = _.get(this.props, 'currentUser.suburb.id', null);
    const { Type } = this.props.productInfo;

    if (suburbId) {
      if (
        (Type === 'Food' && !this.state.selectedValue)
        || (Type !== 'Food' && (!this.props.qtyList && (this.state.selectedValue === DEFAULT_ITEM_QUANTITY_LABEL || !this.props.enableQuantity)))
      ) {
        this.setState({ error: true, errorMessage: 'Please select the quantity.' });
        return;
      }

      this.continueOption({ suburbId });
    } else {
      this.setState({ modalActive: true });
    }
  }

  activateModal() {
    this.setState({ modalActive: true });
  }

  deactivateModal() {
    this.setState({ modalActive: false });
  }

  continueOption({ suburbId }) {
    const { selectedValue } = this.state;
    if (suburbId && selectedValue === DEFAULT_ITEM_QUANTITY_LABEL) {
      this.props.postDeliveryArea({ suburbId, addSuburbToOrder: true });
      return;
    }

    const data = {
      inputSuburb: String(suburbId),
      fromDeliverySelectionPopup: 'true',
      items: this.getProductItems()
    };

    const deliveryLocation = this.props.DeliveryLocation;

    if (deliveryLocation && deliveryLocation.suburbId === '') {
      this.props.postDeliveryArea({ suburbId, addSuburbToOrder: true });
    }

    if (this.props.loader) this.props.loader(true);

    this.trackAddToCart();
    this.props.addItemToCart(data);
    this.setState({ isAddCartButtonClicked: true });
  }

  getProductItems() {
    const { productInfo } = this.props;
    const { selectedValue } = this.state;

    if (productInfo.constructor === Object) {
      return [{
        productId: String(productInfo.productId),
        catalogRefId: String(productInfo.skuId),
        quantity: selectedValue
      }];
    }

    if (productInfo.constructor === Array) {
      return _.map(productInfo, product => ({
        productId: String(product.productId),
        catalogRefId: String(product.skuId),
        quantity: product.quantity
      }));
    }

    return [];
  }

  trackAddToCart() {
    if (this.props.trackAddToCart) {
      const products = this.props.trackAddToCart({
        quantity: this.state.selectedValue
      });

      this.props.tagAddToCart(products);
    }
  }

  trackRemoveFromCart() {
    if (this.props.trackRemoveFromCart) {
      const { productInfo, cartDetails } = this.props;
      const productId = _.get(productInfo, 'productId');
      const totalItemsCount = _.get(cartDetails, `productCountMap.productItemCountMap[${productId}]`, 0);

      const products = this.props.trackRemoveFromCart({
        quantity: totalItemsCount
      });

      this.props.tagRemoveFromCart(products);
    }
  }

  performInventoryCheck({ suburbId }) {
    const { productInfo } = this.props;
    const { selectedValue } = this.state;

    if (!this.props.performInventoryCheck) return;

    if (productInfo.constructor === Object) {
      const data = {
        suburbId,
        productId: String(productInfo.productId),
        catalogRefId: String(productInfo.skuId)
      };

      if (selectedValue === DEFAULT_ITEM_QUANTITY_LABEL || selectedValue === '') {
        data.requestedQty = 1;
      } else {
        data.requestedQty = Number(selectedValue);
      }

      this.props.performInventoryCheck(data);
    }
  }

  removeItemFromCart(evt) {
    evt.preventDefault();

    const productId = _.get(this.props, 'productInfo.productId', null);

    if (productId) {
      const data = {
        productId: String(productId)
      };

      this.trackRemoveFromCart();
      this.props.removeItemFromCart(data);
    }
  }

  renderDeliverySlotUpdateModal(slot) {
    const { description, hourFrom, hourTo } = slot;

    // TODO: This is required to hide the currently open QuickView modal before showing delivery slot modal.
    const pdpQV = document.getElementsByClassName('modal__box modal__box--panel modal__box--size-w-large pdp-quick-view');
    if (!_.isEmpty(pdpQV)) pdpQV[0].style.display = 'none';

    return (
      <DeliverySlotUpdateModal
        focusDialog
        hourTo={hourTo}
        hourFrom={hourFrom}
        description={description}

        handleEdit={this.handleEdit}
        handleAddNewSlot={this.handleAddNewSlot}
        handleCancelSlot={this.handleCancelSlot}
        deactivateModal={this.deactivateDeliverySlotUpdateModal}
      />
    );
  }

  renderDeliverySlotModal() {
    return <DeleverySlotModel modalActive deactivateModal={this.deactivateDeliverySlotModal} {...this.props} />;
  }

  renderDeliveryModal() {
    return (
      <DeliveryModal
        modalActive
        focusDialog
        deactivateModal={this.deactivateModal}
        updateVal={this.state.updateVal}
        provienceData={this.props.DeliveryAreaData}
        continueOption={this.continueOption}
        performInventoryCheck={this.performInventoryCheck}
        nonDelieverable={this.state.errorMessage}
      />
    );
  }

  renderRemoveItemElm() {
    const { productInfo, currentUser, removeItemBtnClasses, cartDetails } = this.props;
    const productId = _.get(productInfo, 'productId');
    const totalItemsCount = _.get(cartDetails, `productCountMap.productItemCountMap[${productId}]`, 0);
    const classes = classnames('btn btn--secondary', removeItemBtnClasses);

    if (totalItemsCount > 0) {
      return (
        <span className={`${productId}_basketQuantity atc-remove`}>
          <button onClick={this.removeItemFromCart} className={classes} >
            <span className="icon-text">{totalItemsCount}</span>
            <span className="icon icon--cart-dark" />
            <span className="icon icon--x-dark product-atc__x" />
          </button>
        </span>
      );
    }

    return null;
  }

  renderProductErrors() {
    const { productId } = this.props.productInfo;
    if (this.state.error && this.state.errorMessage) {
      return (
        <span>
          <div
            id={`${productId}_cartErrors`}
            className="formErrors details grid grid--space-y text-error quantityErrors"
          >
            {this.state.errorMessage}
          </div>
        </span>
      );
    }

    return null;
  }

  render() {
    const { productInfo, selectOptions, qtyList, addItemBtnClasses, cartDetails } = this.props;
    const { productId } = productInfo;
    const btnClasses = classnames('btn btn--primary btn--right btn--align-left btn--atc no-wrap', addItemBtnClasses);
    let reservedDeliverySlots = {};

    if (this.state.hasDeliverySlotModal && this.state.isAddCartButtonClicked && !_.isEmpty(cartDetails)) {
      reservedDeliverySlots = _.first(cartDetails.reservedDeliverySlots) || {};
    }

    return (
      <div>
        {!qtyList ? (
          <div className="product-qty">
            <input
              type="hidden"
              id="catalogRefIds"
              name="catalogRefIds"
              value={productId}
            />
            <input type="hidden" name={`prod_${productId}`} value={productId} />
            <Dropdown
              id={productId}
              name={productId}
              options={selectOptions || ALLOWED_ITEM_QUANTITY_LIST}
              selectedValue={this.state.selectedValue}
              classNames="quantitySelected"
              onChange={this.onQuantityChange}
              onOptionClick={this.onQuantityClick}
              disabled={this.props.enableQuantity === false}
            />
          </div>
        ) : ''}
        <div className="product-atc">
          <button onClick={this.addItemToCart} className={btnClasses} >
            Add to Cart
          </button>
          {this.renderRemoveItemElm()}
        </div>
        {/* this.renderProductErrors() */}
        {this.state.modalActive && this.renderDeliveryModal()}
        {this.state.showDeleverySlotModel && this.renderDeliverySlotModal()}
        {!_.isEmpty(reservedDeliverySlots) && this.renderDeliverySlotUpdateModal(reservedDeliverySlots)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DeliveryAreaData: _.get(state, 'headerReducer.headerDetailsReducer.headerDetailsData.regions.regions', []),
    deliveryDetails: state.deliveryDetails,
    clp: state.clp
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserAddresses,
    changeLocation,
    reserveDeliverySlots,
    changeDeliveryAddress,
    showAddressForm,
    setCurrentAddress,
    addNewAddress,

    tagAddToCart,
    tagRemoveFromCart
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(AddItemToCart);
