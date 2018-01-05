import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';


export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
        <main className="grid grid--space-y site-main">
        
        <div className="main-page">
          
          <div className="grid grid--space-y">
            <div className="page-layout__aside">
              <div className="accordion accordion--chrome" data-js="accordion" data-accordion-start="first-open" data-accordion-type="open-single" data-accordion-active="true">
                <div className="accordion__segment--chrome accordion__segment" data-js="accordion-segment">
                  <h4 className="text-caps accordion__toggle--chrome accordion__toggle--line accordion__toggle" data-js="accordion-toggle">Shopping list:</h4>
                  <ul className="list--silent text-small accordion__content--chrome accordion__content" data-js="accordion-content">
                    <li>
                      <Link to="" className="nav-list__link--filter is-current"> My Shopping List</Link>
                    </li>
                    <li>
                      <hr className="hr--light" />
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Help</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Contact Us</Link>
                    </li>
                    <li>
                      <Link to="" className="nav-list__link--filter"> Log out</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="page-layout__content">
              <h1 className="font-graphic text-caps">Shopping List</h1>
              <p className="text-medium">This is your space to create shopping lists for different purposes, i.e. monthly shop or start-of-term shop etc.</p>
              <p className="text-small">No Saved Shopping Lists</p>
              <div className="panel panel-card__shopping-list grid__two-fourths--medium panel--flex">
                <section className="panel-card__body">
                  <h2 className="font-graphic heading heading--2 text-caps">
                    Homeware
                  </h2>
                  <p className="text-medium">0 Items</p>
                </section>
                <footer className="panel-card__footer">
                  <strong>
                    <Link className="arrow-link--forward link--silent text-small" to="">Manage</Link>
                    <Link className="arrow-link--forward link--silent text-small" to="">Delete</Link>
                  </strong>
                </footer>
              </div>
              <div className="panel panel-card__shopping-list grid__two-fourths--medium panel--flex">
                <section className="panel-card__body">
                  <h2 className="font-graphic heading heading--2 text-caps">
                    Homeware
                  </h2>
                  <p className="text-medium">0 Items</p>
                </section>
                <footer className="panel-card__footer">
                  <strong>
                    <Link className="arrow-link--forward link--silent text-small" to="">Manage</Link>
                    <Link className="arrow-link--forward link--silent text-small" to="">Delete</Link>
                  </strong>
                </footer>
              </div>
              <div className="panel panel-card__shopping-list grid__two-fourths--medium panel--flex">
                <section className="panel-card__body">
                  <h2 className="font-graphic heading heading--2 text-caps">
                    Homeware
                  </h2>
                  <p className="text-medium">0 Items</p>
                </section>
                <footer className="panel-card__footer">
                  <strong>
                    <Link className="arrow-link--forward link--silent text-small" to="">Manage</Link>
                    <Link className="arrow-link--forward link--silent text-small" to="">Delete</Link>
                  </strong>
                </footer>
              </div>
              <div className="grid__three-fourths">
                <Link to="shopping-list-create.html" className="btn btn--primary btn--right">Create a new list</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    );
  }
}
