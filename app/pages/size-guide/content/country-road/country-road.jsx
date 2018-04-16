import React, { Component } from 'react';
import { Link } from 'react-router';
import CountryRoadMen from './country-road-men';
import CountryRoadWomen from './country-road-women';
import CountryRoadKids from './country-road-kids';
import CountryRoadBaby from './country-road-baby';
import CountryRoadHomeware from './country-road-homeware';

class CountryRoad extends Component {
  constructor(props) {
    super(props);
    // this.renderContent = this.renderContent.bind(this);
  }
//   renderContent() {

//   }
  render() {
    let cat = this.props.routeParams.type;
    switch (cat) {
      case 'men': return <CountryRoadMen />;
      case 'women': return <CountryRoadWomen />;
      case 'boys': return <CountryRoadKids />;
      case 'baby': return <CountryRoadBaby />;
      case 'homeware': return <CountryRoadHomeware />;
      default: return <CountryRoadWomen />;
    }
  }
}
export default CountryRoad;
