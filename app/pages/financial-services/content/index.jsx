import React, { Component } from 'react';
import _ from 'lodash';
import SideMenu from '../../../components/sections/SideMenu';

class Content extends Component {
  
  render() {
    return (
      <main className="grid grid--space-y site-main" >
        <div className="main-page">
          <div className="grid grid--space-y">
            <div className="page-layout__aside">
              <SideMenu pageType={this.props.pageType} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: this.props.contentData.content }} />
          </div>
        </div>
      </main>
    );
  }
}

export default Content;
