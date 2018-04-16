import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { getUserShoppingList, deleteShoppingList } from './actions';
import { getdashboarddetails } from '../my-account/actions';


class ShoppingListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comfirmationBoxClass: false,
      isFetching: true
    };
    this.renderEmptyListDetail = this.renderEmptyListDetail.bind(this);
  }
  componentWillMount() {
    // this.props.getUserShoppingList();
    // const shoppingLists = _.get(this.props, 'shoppingLists', []);
    this.props.getdashboarddetails().then(() => {
      this.setState({ isFetching: false });
    });
  }
  confirmDelete = (evt, listId) => {
    evt.preventDefault();
    // const shoppingLists = _.get(this.props, 'currentUser.shoppingLists', []);
    const shoppingLists = _.get(this.props, 'shoppingLists', []);
    const { comfirmationBoxClass } = this.state;
    this.setState({ comfirmationBoxClass: !comfirmationBoxClass });
    shoppingLists.map((list) => {
      if (list.id === listId) {
        list.manageBoxClass = comfirmationBoxClass ? '' : 'hidden';
        return null;
      }
      return null;
    });
  }
  handleShoppingListDelete = (evt, listId) => {
    evt.preventDefault();
    this.props.deleteShoppingList({ GiftlistId: String(listId) });
  }
  renderEmptyListDetail() {
    return (<p className="text-small">No Saved Shopping Lists</p>);
  }
  render() {
    const shoppingLists = _.get(this.props, 'shoppingLists', []); // _.get(this.props, 'currentUser.shoppingLists', []);
    return (
      <div className="page-layout__content">
        {/* END SHOPPINGS LIST INDEX */}
        <div className="grid">
          <h1 className="font-graphic text-caps">
            Shopping Lists &nbsp;
            <span className="icon icon--shopping-list-dark" style={{ 'margin-top': -5 }} />
          </h1>
          <p className="text-medium">This is your space to create shopping lists for different purposes, i.e. monthly shop or start-of-term shop etc.</p>
          <div className="flex-parent">
            {
              !_.isEmpty(shoppingLists) ? shoppingLists.map((list) => {
                const manageBoxClass = list.manageBoxClass && list.manageBoxClass !== '' ? list.manageBoxClass : '';
                const deleteBoxClass = manageBoxClass === '' ? 'hidden' : '';
                return (
                  <form method="post" name="_frm" action="" key={list.id}>
                    <div className="panel panel-card__shopping-list panel--flex">
                      <section className="panel-card__body">
                        <h2 className="font-graphic heading heading--2 text-caps no-wrap--ellipsis">{list.description}</h2>
                        <p className="text-intro">{list.itemCount ? list.itemCount : 0} Items</p>
                      </section>
                      <footer className="panel-card__footer">
                        <div className={`cardDetailsAction strong ${manageBoxClass}`}>
                          <Link to={`/dashboard/shopping-lists/shoppinglist/${list.id}`} className="shoppingListActions arrow-link--forward link--silent text-small strong">
                            Manage
                          </Link>
                          <Link to="" onClick={evt => this.confirmDelete(evt, list.id)} className="arrow-link--forward link--silent text-small strong deleteCard text-space">
                            Delete
                          </Link>
                        </div>
                        <div className={`grid--space-y confirm_actions ${deleteBoxClass}`}>
                          <span className="text-intro">Confirm delete :</span>
                          <Link to="" onClick={evt => this.handleShoppingListDelete(evt, list.id)} className="confirmLinkNo btn btn--silent">Yes</Link>
                          <span>|</span>
                          <Link to="" onClick={evt => this.confirmDelete(evt, list.id)} className="confirmLinkNo btn btn--silent">No</Link>
                        </div>
                      </footer>
                    </div>
                  </form>
                );
              }) : (!this.state.isFetching) ? this.renderEmptyListDetail() : null
            }


          </div>
          <div className="grid"><Link to="/dashboard/shopping-lists/create-list" className="btn btn--primary btn--right">Create new list</Link></div>
        </div>
        {/* END SHOPPINGS LIST INDEX */}
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
  return bindActionCreators({ getdashboarddetails, getUserShoppingList, deleteShoppingList }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ShoppingListDetails);
