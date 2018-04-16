import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { bindActionCreators } from 'redux';

import { createNewShoppingList } from '../../components/compound/cart-action-panel/actions';
import { getUserShoppingList } from './actions';
import { getdashboarddetails } from '../my-account/actions';

const NON_ALLOWED_CHARS = /^[^(!|@|#|$|%|^|&)]*$/;

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errormsg: false,
      listName: ''
    };
    this.renderErrorElm = this.renderErrorElm.bind(this);
    this.renderSuccessElm = this.renderSuccessElm.bind(this);
    this.renderCreateList = this.renderCreateList.bind(this);
  }
  componentWillMount() {
    // this.props.getUserShoppingList();
    this.props.getdashboarddetails();
  }
  onKeyUp = (evt) => {
    if (!NON_ALLOWED_CHARS.test(evt.target.value)) {
      this.setState({
        error: true,
        errormsg: true
      });
    } else if (this.state.error) {
      this.setState({
        error: false,
        errormsg: false
      });
    }
  }

  handleCreateNewList = (evt) => {
    evt.preventDefault();
    const shoppingLists = _.get(this.props, 'shoppingLists', []);
    const listName = this.listNameNode.value.trim();

    if (listName === '') {
      this.setState({ error: true });
    } else if (!NON_ALLOWED_CHARS.test(listName)) {
      this.setState({
        error: true,
        errormsg: true
      });
    } else if (
      shoppingLists.filter(({ description }) => {
        return description === listName;
      }).length !== 0
    ) {
      if (this.state.error) {
        this.setState({ error: false });
      }

      this.setState({ errormsg: true });
    } else {
      this.props.createNewShoppingList(listName);
      this.setState({ error: false, listName });
      if (this.state.errormsg) {
        this.setState({ errormsg: false });
      }
    }
  }
  renderErrorElm() {
    if (this.state.error || this.state.errormsg) {
      return (
        <p className="form-field__msg form-field__msg--error" id="listError">
          {this.state.error
            ? 'Please use only alphanumeric characters in list names.'
            : 'List already exists Please select different name.'
          }
        </p>
      );
    }

    return null;
  }
  renderSuccessElm() {
    return (
      <div className="grid">
        <h1 className="font-graphic text-caps">Your list has been created!</h1>
        <p className="text-intro">Great, your new list, {this.state.listName} , has been created. You can add items to it as you browse the online store.</p>
        <Link to="/dashboard/shopping-lists/shopping-lists-index" className="btn btn--primary btn--right grid--space-y">Go there now</Link>
      </div>
    );
  }
  renderCreateList() {
    return (
      <div className="grid">
        <h1 className="font-graphic text-caps">Create New Shopping List</h1>
        <form method="post" name="createShoppingList" action="" id="createShoppingList" onSubmit={this.handleCreateNewList}>
          <input
            ref={listNameNode => (this.listNameNode = listNameNode)}
            maxLength={50}
            name="newListName"
            id="fldNewListName"
            placeholder="Shopping list name*"
            type="text"
            className="stdFld"
            onKeyUp={this.onKeyUp}
          />
          {this.renderErrorElm()}
          <input name="listSubmit" id="fldListSubmit" type="submit" defaultValue="Create List" className="btn btn--primary btn--right grid--space-y" />
        </form>
      </div>
    );
  }
  render() {
    let listCreationSuccess = false;
    const shoppingLists_ = _.get(this.props, 'shoppingLists', []);
    if (shoppingLists_.filter(({ description }) => {
      return description === this.state.listName;
    }).length !== 0) {
      listCreationSuccess = true;
    }
    return (
      <div className="page-layout__content">
        {listCreationSuccess ? this.renderSuccessElm() : this.renderCreateList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.clp.currentUser,
    user: state.user,
    shoppingLists: state.dashboardReducer.dashboard.dashboard.shoppingLists
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getdashboarddetails, createNewShoppingList, getUserShoppingList }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ShoppingList);

