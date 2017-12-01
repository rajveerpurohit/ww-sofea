import React, { Component } from 'react';
import {connect} from 'react-redux';


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
                      <a href="#" className="nav-list__link--filter is-current"> My Shopping List</a>
                    </li>
                    <li>
                      <hr className="hr--light" />
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Help</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Contact Us</a>
                    </li>
                    <li>
                      <a href="#" className="nav-list__link--filter"> Log out</a>
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
                    <a className="arrow-link--forward link--silent text-small" href="#">Manage</a>
                    <a className="arrow-link--forward link--silent text-small" href="#">Delete</a>
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
                    <a className="arrow-link--forward link--silent text-small" href="#">Manage</a>
                    <a className="arrow-link--forward link--silent text-small" href="#">Delete</a>
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
                    <a className="arrow-link--forward link--silent text-small" href="#">Manage</a>
                    <a className="arrow-link--forward link--silent text-small" href="#">Delete</a>
                  </strong>
                </footer>
              </div>
              <div className="grid__three-fourths">
                <a href="shopping-list-create.html" className="btn btn--primary btn--right">Create a new list</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    );
  }
}
