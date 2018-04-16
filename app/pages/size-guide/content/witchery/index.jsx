import React, { Component } from 'react';
import { Link } from 'react-router';
import WitcheryWomen from './witchery-women';
import WitcheryBoys from './witchery-boys';
import WitcheryGirls from './witchery-girls';

class Witchery extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let cat = this.props.routeParams.type;
    switch (cat) {
      case 'women': return <WitcheryWomen />;
      case 'boys': return <WitcheryBoys />;
      case 'girls': return <WitcheryGirls />;
      default: return <WitcheryWomen />;
    }
  }
}
export default Witchery;
