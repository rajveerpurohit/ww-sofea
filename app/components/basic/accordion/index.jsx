import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import { logOut } from '../../compound/signin/actions';
import { resetAccordianStatus } from '../../../actions/common';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.display = this.display.bind(this);
    this.liClass = this.liClass.bind(this);
    this.Item = this.Item.bind(this);
    this.collpsedClass = this.collpsedClass.bind(this);
  }

  handleClick(i, d, data) {
    return () => {
      const active = this.props.active === i ? null : i;
      if (data.name === 'Logout') {
        const logout = this.props.logOut;
        Promise.resolve()
          .then(x => logout()) // resolve func[0]
          .then((x) => {
            if (typeof window !== 'undefined' && window) {
              localStorage.setItem('SelectedOption', 'Delivery Area ');
              localStorage.setItem('logout', true);
            }
          });
      }

      if (d) {
        this.props.resetAccordianStatus(active);
      }
    };
  }

  display(i) {
    // return this.props.active === i ? 'block' : 'none';
    return this.props.active === i ? '' : 'is-collapsed';
  }

  collpsedClass(i) {
    return this.props.active === i ? '' : 'is-collapsed';
  }

  liClass(i) {
    return this.props.active === i ? 'active' : 'inactive';
  }

  Item(props, i) {
    const toggleClasses = classnames(
      'text-caps', 'accordion__toggle--chrome', 'accordion__toggle--line',
      'accordion__toggle', this.collpsedClass(i),
      { 'toggle-icon': props.details }
    );

    return (
      <div className="accordion__segment--chrome accordion__segment" key={i}>
        <h4 className={toggleClasses} onClick={this.handleClick(i, props.details, props)}>
          {props.url ? <Link to={props.url} style={{ textDecoration: 'none' }}>{props.name}</Link> : props.name}
        </h4>
        {props.subNav && props.subNav.length > 0
          ? <div className={`grid accordion__content--chrome text-small accordion__content--animated accordion__content ${this.display(i)}`} >{/* style={{ display: this.display(i) }} */}
            {props.subNav.map(i => <Link to={i.url} style={{ textDecoration: 'none', display: 'inline-block' }}>{i.name}</Link>)}
          </div>
          : props.isReactNode ?
            <div className={`grid accordion__content--chrome text-small accordion__content--animated accordion__content ${this.display(i)}`}>
              {props.details}
            </div>
            : <div className={`grid accordion__content--chrome text-small accordion__content--animated accordion__content ${this.display(i)}`} dangerouslySetInnerHTML={{ __html: props.details }} />
        }
      </div>
    );
  }

  render() {
    const { refinedData } = this.props;
    return (
      <div className="accordion accordion--chrome accordion--group">
        {refinedData.map(this.Item)}
      </div>
    );
  }
}

function mapStateToProps({ common }) {
  return {
    active: common.AccordianStatus
  };
}

export default connect(mapStateToProps, { resetAccordianStatus, logOut })(Accordion);
