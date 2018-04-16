import React, { Component } from 'react';
import { Link } from 'react-router';
import TreneryMen from './trenery-men';
import TreneryWomen from './trenery-women';

class Trenery extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let cat = this.props.routeParams.type;
    switch (cat) {
      case 'men': return <TreneryMen />;
      case 'women': return <TreneryWomen />;
      default: return <TreneryWomen />;
    }
  }
}
export default Trenery;
