import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
    this.contentAside = this.contentAside.bind(this);
    this.generateLi = this.generateLi.bind(this);
  }

  handleClick(i) {
    return (e) => {
      const active = this.state.active === i ? null : i;
      this.setState({ active });
    };
  }

  collpsedClass(i) {
    return this.state.active === i ? 'target-is-open' : 'target-is-closed';
  }

  liClass(i) {
    return this.state.active === i ? 'active' : 'inactive';
  }

  display(i) {
    return this.state.active === i ? 'block' : 'none';
  }
  // isActive(link){
  //   switch (link) {
  //     case 'contactUs':
  //       return 'strong';
  //     default:
  //       return '';
  //   }
  // }
  contentAside() {
    const sidebarName = this.props.leftData && this.props.isActive && this.props.isActive == '/storelocator' ? this.props.leftData.Help[3].displayName : Object.keys(this.props.leftData)[0];
    return (
      <nav className="page-layout__aside nav-accordion">
        <ul className="list--silent text-small nav-accordion__list">
          <li className="nav-accordion__list-segment nav-accordion__list-item">
            <a className={`nav-accordion__link heading heading--4 target-is-closed  $`}>{sidebarName}</a>
            <span data-toggle className={`nav-accordion__toggle icon icon--down-dark  ${this.collpsedClass(0)}`} onClick={this.handleClick(0)} />
            <ul data-toggle-content className="list--silent hidden" style={{ height: 'auto', display: this.display(0) }}>
              { this.props.leftData && this.generateLi(this.props.leftData)}
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
  generateLi(generateData) {
    const keyValue = Object.keys(generateData)[0];
    if (generateData[keyValue]) {
      return generateData[keyValue].map((item, index) => {
        return (
          <li key={index} className={'nav-accordion__list-item ' + (this.props.isActive === item.url ? 'strong ' : '')}><Link to={item.url} className="nav-accordion__link">{item.displayName}</Link></li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        {this.contentAside()}
      </div>
    );
  }
}
