import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'lodash';
import MultiAccordion from '../../basic/multiAccordion';
import { getleftNavPageData, getwfsLeftNav, getWrewardsLeftNav } from './actions';


class SideMenu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.pageType === 'wrewards') {
      this.props.getWrewardsLeftNav();
    } else if (this.props.pageType === 'woolFinance') {
      this.props.getwfsLeftNav();
    } else {
      this.props.getleftNavPageData();
    }
  }

  render() {
    const { SideNavData, leftNavLinks, synchronizeStatus } = this.props;
    const addSubIndex = (item, l) => {
      return item.map((a, i) => {
        a.lvl = l ? `${l}.${i}` : `${i}`;
        return a;
      });
    };
    const refineData = leftNavLinks && leftNavLinks.links && leftNavLinks.links.length > 0 && addSubIndex(leftNavLinks.links).map((item) => {
      if (item.subNav && item.subNav.length > 0) {
        item.subNav = addSubIndex(item.subNav, item.lvl).map((a) => {
          if (a.subNav && a.subNav.length > 0) {
            a.subNav = addSubIndex(a.subNav, a.lvl);
          }
          return a;
        });
      }
      return item;
    });
    return (
      <nav className="subCategoryNav toggled dashboardNav">
        <h4 className="heading heading--4 text-caps nav-accordion__heading">
          {
            leftNavLinks && leftNavLinks.title ? leftNavLinks.title : ''
          }
        </h4>
        <MultiAccordion refinedData={refineData} synchronizeStatus={synchronizeStatus} headerAsLink />
      </nav>);
  }
}

function mapStateToProps(state) {
  return {
    leftNavLinks: _.get(state, 'leftNavReducer.leftNavData.leftNavLinks', {}),
    //leftNavtitle: state.leftNavReducer.leftNavData.leftNavLinks
    synchronizeStatus: _.get(state, 'clp.currentUser.synchronizeStatus', {})
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getleftNavPageData,
      getwfsLeftNav,
      getWrewardsLeftNav
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
