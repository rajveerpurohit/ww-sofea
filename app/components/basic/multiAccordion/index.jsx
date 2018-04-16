import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import { logOut } from '../../compound/signin/actions';
import { resetAccordianStatus, collapseAccordian } from '../../../actions/common';
import DeliveryTo from '../../basic/delivering-to';

class MultiAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      activeIndex: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.display = this.display.bind(this);
    this.liClass = this.liClass.bind(this);
    this.Item = this.Item.bind(this);
    this.collpsedClass = this.collpsedClass.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  componentDidMount() {
    this.setState({ active: null, activeIndex: null });
  }

  handleLogout(e, data) {
    if (data.name === 'Logout') {
      e.preventDefault();
      const logout = this.props.logOut;
      Promise.resolve()
        .then(() => logout()) // resolve func[0]
        .then(() => {
          if (typeof window !== 'undefined' && window) {
            localStorage.setItem('SelectedOption', 'Delivery Area');
            localStorage.setItem('logout', true);
          }
        });
    } else {
      this.props.collapseAccordian();
      this.setState({ active: null, activeIndex: data.lvl });
    }
  }
  handleClick(i, data) {
    const itemP = data.lvl;
    const activeIndex = this.state.active === data.lvl ?
      itemP.split('.').length === 1 ? null : itemP.split('.').splice(0, (itemP.split('.').length - 1)).join('.') : itemP;
    this.setState({ active: activeIndex });
    this.props.resetAccordianStatus(activeIndex);
  }

  getIndexArray(str) {
    if (str) {
      const arr = str.split('.');
      return arr.map((a, i) => arr.slice(0, i + 1).join('.'));
    }
    str;
  }

  display(i) {
    const arr = this.getIndexArray(this.state.active);
    // console.log(arr, i)
    return (arr && arr.indexOf(i) >= 0) ? 'block' : 'none';
  }

  collpsedClass(i) {
    const arr = this.getIndexArray(this.state.active);
    return (arr && arr.indexOf(i) >= 0) ? 'target-is-open' : 'target-is-closed';
  }

  getContent(props, i) {
    const contentClassName = 'grid accordion__content--chrome text-small accordion__content--animated accordion__content';
    const linkStyles = { textDecoration: 'none', display: 'inline-block' };
    if (props.subNav) {
      return (<ul className={contentClassName} style={{ display: this.display(props.lvl) }} data-item={props.name}>
        {props.subNav.length > 0 ?
        props.subNav.map(this.Item) :
        <Link to={props.url} style={linkStyles} className="">{props.name}</Link>}
      </ul>);
    }
  }

  liClass(i) {
    return this.props.active === i ? 'active' : 'inactive';
  }

  Item(props, i) {
    const toggleClasses = classnames(
      'text-caps', props.subNav && props.subNav.length > 0 ? 'nav-accordion__toggle icon' : 'icon', 'icon--down-dark', this.collpsedClass(props.lvl),
      { 'toggle-icon': props.details }
    );// 'accordion__toggle--chrome
 
    const accordionClassName = 'nav-accordion__list-segment nav-accordion__list-item';
    const showSynchronizeLink = this.props.synchronizeStatus && props.display === "synchronize" ||
                                !this.props.synchronizeStatus && props.display === "non-synchronize" ||
                                props.display === "all"
    if(showSynchronizeLink){
      return (
        <li className={props.lvl === (parseInt(props.lvl, 10)).toString() ? accordionClassName : 'nav-accordion__list-item'} key={i}>
          {props.url ?
          <Link
          onClick={(e) => { this.handleLogout(e, props); }}
          className={`${props.lvl === (parseInt(props.lvl, 10)).toString() ? 'nav-accordion__link heading heading--4' : 'nav-accordion__link'} ${props.lvl ===this.state.activeIndex ? 'heading' : ''}`}
          to={props.name === 'Logout' ? '' : props.url}
          >{props.name}</Link> : props.name}

          {props.subNav && props.subNav.length > 0 ?
            <span data-toggle="" className={toggleClasses} onClick={() => this.handleClick(i, props)} /> : ''}
          {props.subNav && props.subNav.length > 0 ?
            this.getContent(props, i) : null}
        </li>
      ); 
    }else{
      return null
    }
    }

  render() {
    const { refinedData } = this.props;
    return (
      <ul className="list--silent text-small nav-accordion__list">

        {refinedData && refinedData.length > 0 && refinedData.map(this.Item)}
      </ul>
    );
  }
}

function mapStateToProps({ common }) {
  return {
    active: common.AccordianStatus
  };
}

export default connect(mapStateToProps, { resetAccordianStatus, collapseAccordian, logOut })(MultiAccordion);
