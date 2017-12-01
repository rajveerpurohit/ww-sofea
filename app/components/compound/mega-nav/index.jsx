import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';

import CategoryPromoImage from '../../basic/category-promo-image';

export default class MegaNav extends Component {

    constructor() {
        super();
        this.state = {
            onHoverClass: 'no-hover',
            searchOpenClass: ''
        };
        this.generateRootCategories = this.generateRootCategories.bind(this);
        this.generateSubCategories = this.generateSubCategories.bind(this);
        this.generateChildCategories = this.generateChildCategories.bind(this);
        this.generateCol = this.generateCol.bind(this);
        this.generateMegaNavFooterLinks = this.generateMegaNavFooterLinks.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleSearchFocus = this.handleSearchFocus.bind(this);
        this.handleSearchBlur = this.handleSearchBlur.bind(this);
		this.onNavClick = this.onNavClick.bind(this);
    }

    generateRootCategories(rootCategories) {
        return rootCategories.map((rootCategory, index) => (
          <li className="main-nav__list-item main-nav__list-item--primary has-descendant" key={index}>
            <Link className="main-nav__link main-nav__link--primary link--parent-has-descendant" to="">{rootCategory.categoryName}</Link>
            {this.generateSubCategories(rootCategory.subCategories, rootCategory.categoryImageURL, rootCategory.footerLinkCategories)}
          </li>
        ));
    }

    generateCol(colX) {
       if (colX.length) {
            return (
              <li className="main-nav__column">
                <ul className="list--silent">
                  {colX.map(col => col)}
                </ul>
              </li>
        );
       }
    }
    generateSubCategories(subCategories, categoryImage, footerlinks) {
        const cols = {
            col_1: [],
            col_2: [],
            col_3: [],
            col_4: []
        };

        if (subCategories) {
            subCategories.map((subCategory, index) => {
                switch (subCategory.columnIndex) {
                    case 1:
                        if (subCategory.categoryCSS) {
                            const spanClass = subCategory.categoryCSS.split('--')[1];
                            cols.col_1.push(
                              <li key={index} className={`main-nav__list-item main-nav__column-${subCategory.columnIndex} main-nav__list-item--column-start ${subCategory.categoryCSS}   main-nav__list-item--secondary`}>
                                <Link className="main-nav__link link--parent-has-descendant" to=""><span className={`main-nav__promo--${spanClass}`}>{subCategory.categoryName}</span></Link>
                                {this.generateChildCategories(subCategory.subCategories)}
                              </li>
                            );
                        } else {
                            cols.col_1.push(
                              <li key={index} className={`main-nav__list-item main-nav__column-${subCategory.columnIndex}   main-nav__list-item--secondary`}>
                                <Link className="main-nav__link link--parent-has-descendant" to="">{subCategory.categoryName}</Link>
                                {this.generateChildCategories(subCategory.subCategories)}
                              </li>
                            );
                        }
                        break;
                    case 2:
                        cols.col_2.push(
                          <li key={index} className={`main-nav__list-item main-nav__column-${subCategory.columnIndex}   main-nav__list-item--secondary`}>
                            <Link className="main-nav__link link--parent-has-descendant" to="">{subCategory.categoryName}</Link>
                            {this.generateChildCategories(subCategory.subCategories)}
                          </li>
                        );
                        break;
                    case 3:
                        cols.col_3.push(
                          <li key={index} className={`main-nav__list-item main-nav__column-${subCategory.columnIndex}   main-nav__list-item--secondary`}>
                            <Link className="main-nav__link link--parent-has-descendant" to="">{subCategory.categoryName}</Link>
                            {this.generateChildCategories(subCategory.subCategories)}
                          </li>
                        );
                        break;
                    default:
                        cols.col_4.push(
                          <li key={index} className={'main-nav__list-item main-nav__list-item--secondary'}>
                            <Link className="main-nav__link link--parent-has-descendant" to="">{subCategory.categoryName}</Link>
                            {this.generateChildCategories(subCategory.subCategories)}
                          </li>
                        );
                        break;

                }
            });

            const atgUrl = 'http://172.21.40.151:8180/store';
            const categoryPromoImageData = {
                imgSrc: `${atgUrl}${categoryImage}`,
                link: ''
            };

            return (<ul className="main-nav__list main-nav__list--secondary main-nav__list--is-descendant">
              {this.generateCol(cols.col_1)}
              {this.generateCol(cols.col_2)}
              {this.generateCol(cols.col_3)}
              {this.generateCol(cols.col_4)}
              <li className="main-nav__list-item main-nav__list-item--promo block-hidden--mobi-max main-nav__list-item--secondary">
                <CategoryPromoImage payload={categoryPromoImageData} />
              </li>
              <li className="main-nav__list-item main-nav__list-item--footer block-hidden--mobi-max main-nav__list-item--secondary has-descendant">
                <ul className="main-nav__list main-nav__list--footer main-nav__list--tertiary main-nav__list--is-descendant">
                  {this.generateMegaNavFooterLinks(footerlinks)}
                </ul>
              </li>

            </ul>);
        }
    }

    generateMegaNavFooterLinks(footerLinks) {
        if (footerLinks) {
            return footerLinks.map((footerlink, index) => {
                        if (footerlink.categoryCSS) {
                            return (
                              <li className="main-nav__list-item main-nav__list--footer-item main-nav__list-item--tertiary" key={index}>
                                <Link to="" className={`main-nav__link main-nav__link--footer ${footerlink.categoryCSS}`}>{footerlink.categoryName}</Link>
                              </li>
                            );
                        }
                            return (
                              <li className="main-nav__list-item main-nav__list--footer-item main-nav__list-item--tertiary" key={index}>
                                <span className="main-nav__link main-nav__link--footer">{footerlink.categoryName}</span>
                              </li>
                            );
            });
        }
    }

    generateChildCategories(childCategories) {
        if (childCategories) {
            return (
              <ul className="main-nav__list main-nav__list--tertiary main-nav__list--is-descendant">
                {
                    childCategories.map((childCategory, index) => (
                      <li key={index} className="main-nav__list-item  main-nav__list-item--tertiary">
                        <Link to="" className="main-nav__link">{childCategory.categoryName}</Link>
                      </li>
                    ))
                }
              </ul>
            );
        }
    }

    handleMouseEnter() {
        this.setState({onHoverClass: 'hover-ready' });
    }
    handleMouseLeave() {
        this.setState({onHoverClass: 'no-hover' });
    }
    handleSearchFocus() {
        this.setState({searchOpenClass: 'is-open'});
    }
    handleSearchBlur() {
        this.setState({searchOpenClass: ''});
    }
	onNavClick() {
        const navToggle = document.getElementsByClassName('nav-toggle')[0];
        const navUL = document.getElementById('main-nav').getElementsByTagName('ul')[0];
        if (navToggle.className.indexOf('active') > -1) {
            alert('test');
            document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className.replace(/\bnav-is-open\b/g, '');
            document.getElementById('main-nav').className = document.getElementById('main-nav').className.replace(/\bis-open\b/g, '');
            navToggle.className = navToggle.className.replace(/\b active\b/g, '');
            navUL.className = navUL.className.replace(/\b is-open\b/g, '');
        } else {
            alert('none');
            document.getElementsByClassName('nav-toggle')[0].className += ' active';
            navUL.className += ' is-open';
            document.getElementById('main-nav').className += ' is-open';
            document.getElementsByTagName('body')[0].className += ' nav-is-open';
        }
    }


  render() {
    return (
      <section className="site-header__wrapper site-header__wrapper--navigation">
        <div className="site-search">
          <span className="search-toggle">
            <span className="icon icon--search-white inline-block-visible--mobi-max" />
          </span>
          <form className={`search-bar fly-out ${this.state.searchOpenClass}`} action="" method="post" onFocus={this.handleSearchFocus} onBlur={this.handleSearchBlur} >
            <input type="search" className={`search-bar__input ${this.state.searchOpenClass}`} onFocus={this.handleSearchFocus} onBlur={this.handleSearchBlur} placeholder="Search..." />
            <input className="search-bar__submit icon icon--search-grey" type="submit" />
            <div className="search-bar__suggestions fly-out__content" />
          </form>
        </div>
        <nav id="main-nav" className="main-nav__list no-hover" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <Link className="nav-toggle" onClick={this.onNavClick.bind(this)}>
            <span className="icon icon--menu inline-block-visible--mobi-max" />
          </Link>
          <ul className={`main-nav__list ${this.state.onHoverClass}`}>
            {this.props.rootCategories ? this.generateRootCategories(this.props.rootCategories) : null}
            <li className="width-marker" />
          </ul>
        </nav>
      </section>
    );
  }
}
