import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import _ from 'lodash';

import DropdownFlyOutList from '../dropdown-fly-out-list';
import CreateShoppingListModal from './create-shopping-list-modal';

class ShoppingListDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: props.productInfo.productId,
      recentShoppingList: '',
      recentlyCreatedShoppingList: '',
      displayCreateShoppingListModal: false
    };

    this.addItemToShoppingList = this.addItemToShoppingList.bind(this);
    this.renderShoppingListElm = this.renderShoppingListElm.bind(this);
    this.renderListWithLoginPath = this.renderListWithLoginPath.bind(this);
    this.renderChangeShoppingListElm = this.renderChangeShoppingListElm.bind(this);
    this.onCreateNewShoppingList = this.onCreateNewShoppingList.bind(this);
    this.onShoppingListChangeClick = this.onShoppingListChangeClick.bind(this);
    this.createNewShoppingList = this.createNewShoppingList.bind(this);
    this.renderCreateShoppingListModal = this.renderCreateShoppingListModal.bind(this);
    this.onHideCreateNewShoppingListModal = this.onHideCreateNewShoppingListModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { recentlyCreatedShoppingList } = this.state;
    const shoppingLists = _.get(nextProps, 'currentUser.shoppingLists', []);

    if (recentlyCreatedShoppingList !== '') {
      const shoppingList = shoppingLists.find(sl => (sl.description === recentlyCreatedShoppingList));

      if (shoppingList) this.setState({ recentShoppingList: shoppingList.id });
    }
  }

  onCreateNewShoppingList(evt) {
    this.setState({ displayCreateShoppingListModal: true });

    const { onCreateNewShoppingList } = this.props;

    if (onCreateNewShoppingList) {
      onCreateNewShoppingList(evt);
    } else {
      evt.preventDefault();
    }
  }

  onHideCreateNewShoppingListModal(evt) {
    if (evt) evt.preventDefault();
    this.setState({ displayCreateShoppingListModal: false });
  }

  onShoppingListChangeClick(e) {
    this.setState({ recentShoppingList: '', recentlyCreatedShoppingList: '' });

    const { onShoppingListChangeClick } = this.props;
    if (onShoppingListChangeClick) {
      onShoppingListChangeClick(e);
    } else {
      e.preventDefault();
    }
  }

  addItemToShoppingList(evt) {
    const { addItemToShoppingList, addGroupOfItemsToShoppingList, hasInvalidProperties, showInvalidPropertiesError, addOrderedItemsToShoppingList } = this.props;

    if (!hasInvalidProperties) {
      const listId = evt.target.id;
      const listName = evt.target.innerHTML;
      this.setState({ recentShoppingList: listId });
      if (addItemToShoppingList) {
        addItemToShoppingList(listId);
      } else if (addGroupOfItemsToShoppingList) {
        const { currentCommerceItemGroupType, shoppingList } = addGroupOfItemsToShoppingList;
        evt.preventDefault();
        addGroupOfItemsToShoppingList.addGroupOfItemsToShoppingList(listId, currentCommerceItemGroupType, shoppingList);
      } else if (addOrderedItemsToShoppingList) {
        const { orderId } = addOrderedItemsToShoppingList;
        evt.preventDefault();
        addOrderedItemsToShoppingList.addOrderedItemsToShoppingList(orderId, listId); // shoppingListName (we will fix it.)
      } else {
        evt.preventDefault();
      }
    } else {
      evt.preventDefault();
      if (showInvalidPropertiesError) showInvalidPropertiesError();
    }
  }

  createNewShoppingList(listName) {
    this.setState({ displayCreateShoppingListModal: false, recentlyCreatedShoppingList: listName });

    const { createNewShoppingList } = this.props;
    if (createNewShoppingList) {
      createNewShoppingList(listName);
    }
  }

  renderCreateShoppingListModal() {
    return (<CreateShoppingListModal onCreateListClick={this.createNewShoppingList} deactivateModal={this.onHideCreateNewShoppingListModal} />);
  }

  renderChangeShoppingListElm(productId, shoppingList) {
    // if (!productId || !shoppingList) {
    //   return null;
    // }

    const { rootClasses, listRootClasses } = this.props;
    const baseClasses = classnames('product-atl', { [`shoppingList_${productId}`]: productId }, rootClasses);
    const listClasses = classnames('product-atl fly-out', listRootClasses);

    return (
      <div className={baseClasses}>
        <div className={listClasses}>
          <span className={`enhanced-select editShoppingList_${shoppingList.id}`}>
            <span className="enhanced-select__label no-wrap--ellipsis">
              <span className="icon icon--shopping-list-dark" />
              <span className="icon-text">{`Added to ${shoppingList.description}`}</span>
            </span>
          </span>
          <p className={`changeList shoppingListChangeLis_${shoppingList.id}`}>
            <Link className="link" onClick={this.onShoppingListChangeClick}>Change List</Link>
          </p>
        </div>
      </div>
    );
  }

  renderListWithLoginPath() {
    const { rootClasses, listRootClasses } = this.props;
    const { productId } = this.state;
    const baseClasses = classnames('product-atl', { [`shoppingList_${productId}`]: productId }, rootClasses);
    const listClasses = classnames('product-atl fly-out', listRootClasses);

    return (
      <div className={baseClasses}>
        <div className={listClasses}>
          <Link to="/login" className="product-atl">
            <span className="enhanced-select fly-out__toggle">
              <span className="enhanced-select__label" title="add to shopping list">Add to list</span>
              <span className="icon enhanced-select__icon" />
            </span>
          </Link>
        </div>
      </div>
    );
  }

  renderShoppingListElm() {
    const shoppingLists = _.get(this.props, 'currentUser.shoppingLists', []);
    const listItems = [
      { displayName: 'Create List', onClick: this.onCreateNewShoppingList },
      ...shoppingLists.map(list => ({
        displayName: list.description,
        id: list.id,
        onClick: this.addItemToShoppingList
      }))
    ];

    const { rootClasses } = this.props;
    const { productId } = this.state;
    const baseClasses = classnames('product-atl', { [`shoppingList_${productId}`]: productId }, rootClasses);

    return (
      <div className={baseClasses}>
        <DropdownFlyOutList listLabel={'Add to list'} rootClassName={'product-atl'} listItems={listItems} />
      </div>
    );
  }

  render() {
    const shoppingLists = _.get(this.props, 'currentUser.shoppingLists', []);
    const { productInfo, user } = this.props;
    const productId = productInfo.productId;

    if (this.state.recentShoppingList !== '') {
      const shoppingList = shoppingLists.find(sl => (sl.id === this.state.recentShoppingList));

      return this.renderChangeShoppingListElm(productId, shoppingList);
    }

    return (
      <div>
        {user.isLoggedIn ? this.renderShoppingListElm() : this.renderListWithLoginPath()}
        {this.state.displayCreateShoppingListModal && this.renderCreateShoppingListModal()}
      </div>
    );
  }
}

export default ShoppingListDropdown;
