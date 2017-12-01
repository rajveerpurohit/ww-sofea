import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import * as Cartridge from '../../components/cartridges';

import {getHomePageData} from './actions';


class HomePage extends Component {

   static need = [
    getHomePageData
  ]


  constructor(props) {
        super(props);
        this.state = {
          atgUrl: 'http://www-win-qa.woolworths.co.za/'
        };

        this.rowGenerator = this.rowGenerator.bind(this);
        this.renderLinkRow = this.renderLinkRow.bind(this);
        this.renderContentBlock = this.renderContentBlock.bind(this);
      }
rowGenerator(rows) {
    const type = '@type';
    return rows.map((row, index) => {
      const compType = row[type];
      const ReturnComp = Cartridge[compType];
      const imageBannerData = {
        ...row,
        atgUrl: this.state.atgUrl,
        key: index
      };
      return <ReturnComp contentData={imageBannerData} key={index} />;
    });
  }

  renderLinkRow(row, index, columnMaker, type) {
     const imageBannerData = {
        ...row,
        atgUrl: this.state.atgUrl
      };
    const Template = Cartridge[type];
    if (columnMaker) {
      return (
        <div className=" lazyload-container" key={index}>
          <Template contentData={imageBannerData} />
        </div>
      );
    }
    return (
      <div className="grid landing__row" key={index}>
        <div className="landing__block lazyload-container">
          <Template contentData={imageBannerData} />
        </div>
      </div>
    );
  }
  renderContentBlock(contentBlockImages, index, type) {
    let columnMaker = true;
    return (
      <div className="grid landing__row" key={index}>
        {contentBlockImages.map((row, key) => this.renderLinkRow(row, key, columnMaker, type))}{columnMaker = !columnMaker}
      </div>
    );
  }

  render() {
    return (
      <div className="grid grid--homepage main-page">
        <nav className="homeNav">
          {/* <Link id="banner_link_home-1-s1" className rel="Homepage ,home-1-s1" href="#">
            <img sizes="(min-width: 768px) 94vw, 99vw" data-srcset=" //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=220 220w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=420 420w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=620 620w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=820 820w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=1420 1420w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=1640 1640w" data-src="//images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?" alt className=" lazyloaded" srcSet=" //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=220 220w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=420 420w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=620 620w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=820 820w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=1420 1420w, //images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?w=1640 1640w" src="//images.woolworthsstatic.co.za/HbBUWTE9MhnAAYly5FCGl3LGUtkj?" />
          </Link>*/}
        </nav>
        <div className="landing-page-wrapper">
          <div className="grid grid--space-y">
            {this.props.homeData.length ? this.rowGenerator(this.props.homeData[0].mainHeader) : null}
            {this.props.homeData.length ? this.rowGenerator(this.props.homeData[0].mainSubHeader) : null}
            {this.props.homeData.length ? this.rowGenerator(this.props.homeData[0].subHeader) : null}
          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    homeData: state.home.homeData
  };
};
export default connect(mapStateToProps)(HomePage);
