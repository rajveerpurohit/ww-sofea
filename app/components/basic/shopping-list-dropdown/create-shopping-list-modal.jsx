import React, { Component } from 'react';
import { Link } from 'react-router';
import AriaModal from 'react-aria-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { createNewShoppingList } from '../../compound/cart-action-panel/actions';

const NON_ALLOWED_CHARS = /^[^(!|@|#|$|%|^|&)]*$/;

class CreateShoppingListModal extends Component {
  constructor(props) {
    super(props);

    this.state = { modalActive: true, error: false, errormsg: false };

    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
  }

  onClick(e) {
    const shoppingLists = _.get(this.props, 'currentUser.shoppingLists', []);
    const listName = this.listNameNode.value.trim();

    e.preventDefault();

    if (listName === '') {
      this.setState({ error: true });
    } else if (!NON_ALLOWED_CHARS.test(listName)) {
      this.setState({
        error: true,
        errormsg: true
      });
    } else if (
      shoppingLists.filter((shoppingList) => {
        return shoppingList.description === listName;
      }).length !== 0
    ) {
      if (this.state.error) {
        this.setState({ error: false });
      }

      this.setState({ errormsg: true });
    } else {
      this.deactivateModal();
      const { onCreateListClick } = this.props;
      if (onCreateListClick) onCreateListClick(listName);
      this.setState({ error: false });
      if (this.state.errormsg) {
        this.setState({ errormsg: false });
      }
    }
  }

  onKeyUp(evt) {
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

  activateModal() {
    this.setState({ modalActive: true });
  }

  deactivateModal(e) {
    this.setState({ modalActive: false });

    if (this.props.deactivateModal) {
      this.props.deactivateModal(e);
    } else {
      e.preventDefault();
    }
  }

  renderErrorElm() {
    if (this.state.error || this.state.errormsg) {
      return (
        <div className="text-error text-small form-field" id="listError">
          {this.state.error
            ? 'Please use only alphanumeric characters in list names.'
            : 'List already exists Please select different name.'
          }
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <AriaModal
          titleText="shoppingListName"
          className="shopping--list"
          verticallyCenter
          onExit={this.deactivateModal}
        >
          <div className={`modal__box modal__box--panel modal__box--size-w-large shopping--list-modal ${typeof document !== 'undefined' && document.getElementById('pdp-link') ? 'pdp-page' : 'cart-page'}`}>
            <Link
              className={` ${typeof document !== 'undefined' && document.getElementById('pdp-link') ? 'icon icon--close-circ-dark modal__close' : 'fancybox-item fancybox-close'}`}
              onClick={this.deactivateModal}
            >
             
            </Link>
      
            <div className="heading heading--3 font-graphic modal__head">create new shopping list</div>
            <div className="modal__content" style={{ overflowY: 'none!important' }}>
              <section className="createList actionOverlay">
                <h2 className="pdpPage--h2">CREATE A NEW LIST</h2>
                <p className="intro">
                  {"Enter a list name click on 'save list'."}
                </p>
                <form
                  name="shoppingListForm"
                  id="shoppingListForm"
                  onSubmit={e => e.preventDefault()}
                >
                  <fieldset>
                    {/* <label htmlFor="fldListName">List name:</label> */}
                    <input
                      name="newListName"
                      id="fldlistName"
                      placeholder="List name"
                      type="text"
                      className="stdFld"
                      onKeyUp={this.onKeyUp}
                      ref={node => (this.listNameNode = node)}
                      autoComplete="off"
                    />
                    {this.renderErrorElm()}
                  </fieldset>
                </form>
              </section>
              <div className="form-field">
                <button
                  id="btnSaveList"
                  type="button"
                  onClick={this.onClick}
                  className={`btn ${typeof document !== 'undefined' && document.getElementById('pdp-link') ? 'btn--secondary btn--right' : 'secondaryButton'}`}
                >
                  Save list
                </button>
              </div>
            </div>
          </div>
        </AriaModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.clp.currentUser
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ createNewShoppingList }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(CreateShoppingListModal);
