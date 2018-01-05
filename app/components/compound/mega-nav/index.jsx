import React, {Component} from 'react';
import { Link } from 'react-router';

import Search from '../search';
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
        this.onNavClick = this.onNavClick.bind(this);
    }

    generateRootCategories(rootCategories) {
        return rootCategories.map((rootCategory, index) => {
          let dptRout = rootCategory.categoryURL; // .replace('/dept', '');
          return (
            <li className="main-nav__list-item main-nav__list-item--primary has-descendant" key={index} onClick={(e)=> { this.handleMouseLeave; this.checkMobileSubCat(e)}}>
              <Link className="main-nav__link main-nav__link--primary link--parent-has-descendant" to={dptRout} >{rootCategory.categoryName}</Link>
              {this.generateSubCategories(rootCategory.subCategories, rootCategory.categoryImageURL, rootCategory.footerLinkCategories)}
            </li>
        );
        });
    }
    checkMobileSubCat(event){
      //event.preventDefault();
     // alert(event.target.className)
      // if(event.target.className !== ' hover'){
      //   event.target.className += ' hover';
      //   event.target.nextSibling.className+= ' is-open';
      //   event.target.parentElement.parentElement.className += ' child-is-open';
      // }

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
                              <li onClick={this.handleMouseLeave} key={index} className={`main-nav__list-item main-nav__column-${subCategory.columnIndex} main-nav__list-item--column-start ${subCategory.categoryCSS}   main-nav__list-item--secondary`}>
                                <Link className="main-nav__link link--parent-has-descendant" to=""><span className={`main-nav__promo--${spanClass}`}>{subCategory.categoryName}</span></Link>
                                {this.generateChildCategories(subCategory.subCategories)}
                              </li>
                            );
                        } else {
                            cols.col_1.push(
                              <li onClick={this.handleMouseLeave} key={index} className={`main-nav__list-item main-nav__column-${subCategory.columnIndex}   main-nav__list-item--secondary`}>
                                <Link className="main-nav__link link--parent-has-descendant" to="">{subCategory.categoryName}</Link>
                                {this.generateChildCategories(subCategory.subCategories)}
                              </li>
                            );
                        }
                        break;
                    case 2:
                        cols.col_2.push(
                          <li onClick={this.handleMouseLeave} key={index} className={`main-nav__list-item main-nav__column-${subCategory.columnIndex}   main-nav__list-item--secondary`}>
                            <Link className="main-nav__link link--parent-has-descendant" to="">{subCategory.categoryName}</Link>
                            {this.generateChildCategories(subCategory.subCategories)}
                          </li>
                        );
                        break;
                    case 3:
                        cols.col_3.push(
                          <li onClick={this.handleMouseLeave} key={index} className={`main-nav__list-item main-nav__column-${subCategory.columnIndex}   main-nav__list-item--secondary`}>
                            <Link className="main-nav__link link--parent-has-descendant" to="">{subCategory.categoryName}</Link>
                            {this.generateChildCategories(subCategory.subCategories)}
                          </li>
                        );
                        break;
                    default:
                        cols.col_4.push(
                          <li onClick={this.handleMouseLeave} key={index} className={'main-nav__list-item main-nav__list-item--secondary'}>
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
              <li onClick={this.handleMouseLeave} className="main-nav__list-item main-nav__list-item--promo block-hidden--mobi-max main-nav__list-item--secondary">
                <CategoryPromoImage payload={categoryPromoImageData} />
              </li>
              <li onClick={this.handleMouseLeave} className="main-nav__list-item main-nav__list-item--footer block-hidden--mobi-max main-nav__list-item--secondary has-descendant">
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
                      <li onClick={this.handleMouseLeave} key={index} className="main-nav__list-item  main-nav__list-item--tertiary">
                        <Link to={childCategory.categoryURL} className="main-nav__link">{childCategory.categoryName}</Link>
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
	onNavClick(event) {
        const navToggle = document.getElementsByClassName('nav-toggle')[0];
        const navUL = document.getElementById('main-nav').getElementsByTagName('ul')[0];
        if (navToggle.className.indexOf('active') > -1) {
            document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className.replace(/\bnav-is-open\b/g, '');
            document.getElementById('main-nav').className = document.getElementById('main-nav').className.replace(/\bis-open\b/g, '');
            navToggle.className = navToggle.className.replace(/\b active\b/g, '');
            navUL.className = navUL.className.replace(/\b is-open\b/g, '');
            document.getElementsByClassName('main-nav__list hover-ready main-nav__list--primary')[0].style.backgroundColor = 'none';
           
           
        } else {
            
            document.getElementsByClassName('nav-toggle')[0].className += ' active';
            navUL.className += ' is-open';
            document.getElementById('main-nav').className += 'is-open';
            document.getElementsByTagName('body')[0].className += 'nav-is-open';
            document.getElementsByClassName('main-nav__list hover-ready main-nav__list--primary')[0].style.backgroundColor = '#FFFFFF';

            let links = document.getElementsByClassName('main-nav__link main-nav__link--primary link--parent-has-descendant');
            Array.prototype.forEach.call(links, data => {
               data.setAttribute('href','javascript:void(0)');
            });
        }

        if(document.getElementsByClassName('main-nav__link main-nav__link--primary link--parent-has-descendant hover')){
          document.getElementsByClassName('main-nav__link main-nav__link--primary link--parent-has-descendant').className = document.getElementsByClassName('main-nav__link main-nav__link--primary link--parent-has-descendant hover').className.replace(/\bhover\b/g, '');
          document.getElementsByClassName('main-nav__list main-nav__list--secondary main-nav__list--is-descendant').className = document.getElementsByClassName('main-nav__list main-nav__list--secondary main-nav__list--is-descendant is-open').className.replace(/\bis-open\b/g, '');
          document.getElementsByClassName('/main-nav__list no-hover main-nav__list--primary is-open').className = document.getElementsByClassName('/main-nav__list no-hover main-nav__list--primary is-open').className.replace(/\bchild-is-open\b/g, '');
          //main-nav__list no-hover main-nav__list--primary is-open child-is-open
        }
    }


  render() {
    return (
      <section className="site-header__wrapper site-header__wrapper--navigation">
        <div className="site-search">
          <span className="search-toggle">
            <span className="icon icon--search-white inline-block-visible--mobi-max" />
          </span>
          <Search />
        </div>
        <nav id="main-nav" className="main-nav__list " onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <Link className="nav-toggle" onClick={e => {this.onNavClick(e)}}>
            <span className="icon icon--menu inline-block-visible--mobi-max" />
          </Link>
          <ul className={`main-nav__list ${this.state.onHoverClass} main-nav__list--primary`}>
            {this.props.rootCategories ? this.generateRootCategories(this.props.rootCategories) : null}
            <li className="width-marker" />
          </ul>
        </nav>
      </section>
    );
  }
}