import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { getWrewards } from './actions';
import Content from './content';
// import SideMenu from '../../components/sections/SideMenu';

class Wrewards extends Component {
  // static need = [getWrewards];
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.getWrewards(this.props.params.contentId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.contentId !== this.props.params.contentId) {
      this.props.getWrewards(nextProps.params.contentId);
    }
  }
  render() {
    const pageCode = _.get(this.props.route, 'pageCode', '');
    const wrewardsData = _.get(this.props, 'wrewards', {});
    const contentType = wrewardsData && wrewardsData.contents && wrewardsData.contents.type;
    const dynType = wrewardsData && wrewardsData.contents && wrewardsData.contents.type && wrewardsData.contents[contentType].content;
    if (contentType != 'LookBook') {
      return <Content contentData={dynType} pageType={pageCode} />;
    } else if (contentType == 'LookBook') {
      return <Content contentData={wrewardsData && wrewardsData.contents && wrewardsData.contents.type && wrewardsData.contents.LookBook.looks[0].content} pageType={pageCode} />;
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    wrewards: state.wrewardsReducer.wrewardsContentReducer.wrewardsData,
    wrewardsLeftNav: state.wrewardsReducer.wrewardsLeftNavReducer.leftNav
  };
};


export default connect(mapStateToProps, { getWrewards })(Wrewards);
