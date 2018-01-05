import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class DropdownFlyOutList extends Component {
  constructor(props) {
    super(props);
    this.state = {
          flyOutClass: ''
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
    }

    handleMouseEnter() {
        this.setState({isHovering: true, flyOutClass: 'is-open'});
    }
    handleMouseLeave() {
        this.setState({isListHovering: false, flyOutClass: ''});
    }

  renderListItems() {
    const { listItems } = this.props;

    return listItems.map((item, i) => (
      <li className="nav-list__item" key={i}>
        <Link to={item.url} title={item.title} className="nav-list__link link--silent">
          {item.displayName}
        </Link>
      </li>
    ));
  }

  render() {
    const { listLabel, listTitle, rootClassName } = this.props;

    return (
      <div className={`${rootClassName} fly-out ${this.state.flyOutClass}`} onClick={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <span className="enhanced-select fly-out__toggle" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <span className="enhanced-select__label" title={listTitle}>{listLabel}</span>
          <span className="icon enhanced-select__icon" />
        </span>
        <ul className="nav-list fly-out__content fly-out__content--chrome" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={{marginTop: 0}}>
          {this.renderListItems()}
        </ul>

      </div>
    );
  }
}

export default DropdownFlyOutList;
