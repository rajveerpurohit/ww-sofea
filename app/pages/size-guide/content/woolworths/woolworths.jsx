import React, { Component } from 'react';
import { Link } from 'react-router';
import WoolworthsMen from './woolworths-men';
import WoolworthsWomen from './woolworths-women';
import WoolworthsBoys from './woolworths-boys';
import WoolworthsGirls from './woolworths-girls';
import WoolworthsBaby from './woolworths-baby';
import WoolworthsHomeware from './woolworths-homeware';

class Woolworths extends Component {
  constructor(props) {
    super(props);
    // this.renderContent = this.renderContent.bind(this);
  }
//   renderContent() {

//   }
  render() {
    let cat = this.props.routeParams.type;
    switch (cat) {
      case 'men': return <WoolworthsMen />;
      case 'women': return <WoolworthsWomen />;
      case 'boys': return <WoolworthsBoys />;
      case 'girls': return <WoolworthsGirls />;
      case 'baby': return <WoolworthsBaby />;
      case 'homeware': return <WoolworthsHomeware />;
      default: return <WoolworthsWomen />;
    }
  }
}
export default Woolworths;
