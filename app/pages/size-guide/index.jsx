import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import SideBarComponent from '../../components/basic/SideBarContent';
import { getLeftNav } from './actions';
import sizeGuideImage from './img/size-guide-men.jpg';


class SizeGuide extends Component {
  static need = [
    getLeftNav
  ]
  constructor(props) {
    super(props);
    this.content = this.content.bind(this);
  }
  content = () => {
    return (
      <div className="page-layout__content">
        <header>
          <h1 className="font-graphic text-caps">Size Guides</h1>
        </header>
      <section className="contentBlock">
        <section className="contentBlock">
          <div className="articleContainer sizeGuides">
            <Link to="/sizeGuides/woolworths/women" border="0">
              <article className="articleBlock" >
                <header>
                  <h3>Men</h3>
                </header>
                <section className="articleContent">
                  <img src={sizeGuideImage} alt="Men" border="0" />
                </section>
                <footer />
              </article>
            </Link>
            <Link to="/sizeGuides/woolworths/women" border="0">
              <article className="articleBlock">
                <header>
                  <h3>Women</h3>
                </header>
                <section className="articleContent">
                  <img src={sizeGuideImage} alt="women" border="0" />
                </section>
                <footer />
              </article>
            </Link>
            <Link to="/sizeGuides/woolworths/women" border="0">
              <article className="articleBlock">
                <header>
                  <h3>Kids</h3>
                </header>
                <section className="articleContent">
                  <img src={sizeGuideImage} alt="kids" border="0" />
                </section>
                <footer />
              </article>
            </Link>
            <Link to="/sizeGuides/woolworths/women" border="0">
              <article className="articleBlock" >
                <header>
                  <h3>Baby</h3>
                </header>
                <section className="articleContent">
                  <img src={sizeGuideImage} alt="baby" border="0" />
                </section>
                <footer />
              </article>
            </Link>
          </div>
        </section>
      </section>
     </div>
    );
  }
  render() {
    return (
      <main className="grid grid--space-y site-main">
        <div className="main-page ">
          <nav className="breadCrumbs" />
          <div className="grid grid--space-y page-layout">
            <div className="page-layout__aside">
              {this.props.contentAside && <SideBarComponent leftData={this.props.contentAside} isActive={this.props.location.pathname} />}
            </div>
            {this.props.location.pathname === '/sizeGuides' ? this.content() : this.props.children}
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    contentAside: state.sizeGuideReducer.LeftNavReducer.leftNav
  };
};

export default connect(mapStateToProps)(SizeGuide);
