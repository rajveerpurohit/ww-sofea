import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export default class Panels extends Component {
  constructor(props) {
    super(props);

    this.panelSection = this.panelSection.bind(this);
  }

  panelSection() {
    const createPanels = this.props.panelData;
    const link = (panelType) => {
      if (panelType.type === 'folder') {
        return 'VIEW MORE';
      } else if (panelType.type === 'content') {
        return 'READ MORE';
      } else if (panelType.type === 'static') {
        return panelType.linkText;
      }
      return 'VIEW MORE';
    };

    return _.map(createPanels, (item, index) => {
      return (
        <div className="grid__third--large" key={index}>
          <div className="panel" key={index}>
            <h3 className="font-graphic text-caps">{item.panelHeading}</h3>
            <Link to={item.url} className="btn btn--secondary btn--block btn--right btn--align-left" >{link(item)}</Link>
          </div>
        </div>);
    });
  }
  render() {
    return (
      <div>
        {this.panelSection()}</div>
    );
  }
}

