import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import _ from 'lodash';

import Search from '../search';
import CategoryPromoImage from '../../basic/category-promo-image';
import {
  VIEW_PORT_TYPE_MOBILE,
  VIEW_PORT_TYPE_DESKTOP,
  MOBILE_HEADER_OPTION_MEGANAV,
  MOBILE_HEADER_OPTION_SEARCH
} from '../../../Constants';

export default class MegaNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onHoverClass: 'no-hover',
      viewportType: props.viewportType || '',

      showSearchBar: false,
      isMainNavOpen: false,
      isSubCategoryOpen: false,
      openSubCategory: '',
      isChildSubCategoryOpen: false,
      openChildSubCategory: ''
    };

    this.onHamburgerClick = this.onHamburgerClick.bind(this);
    this.generateCol = this.generateCol.bind(this);
    this.handleSearchToggle = this.handleSearchToggle.bind(this);
    this.generateSubCategories = this.generateSubCategories.bind(this);
    this.generateRootCategories = this.generateRootCategories.bind(this);
    this.generateChildCategories = this.generateChildCategories.bind(this);
    this.generateMegaNavFooterLinks = this.generateMegaNavFooterLinks.bind(this);

    this.resetMegaNavStates = this.resetMegaNavStates.bind(this);
    this.getSearchBarWidth = this.getSearchBarWidth.bind(this);
    this.generateSubCategoriesCell = this.generateSubCategoriesCell.bind(this);
    this.onSubCategoryLinkClick = this.onSubCategoryLinkClick.bind(this);
    this.onLinkBackElmClick = this.onLinkBackElmClick.bind(this);
    this.onChildSubCategoryLinkClick = this.onChildSubCategoryLinkClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.addViewportClassToHtmlElm = this.addViewportClassToHtmlElm.bind(this);
    this.renderCategoryPromoImage = this.renderCategoryPromoImage.bind(this);
  }

  componentDidMount() {
    const { viewportType } = this.state;
    if (!_.isEmpty(viewportType)) this.addViewportClassToHtmlElm(viewportType);
  }

  componentWillReceiveProps(nextProps) {
    const { viewportType } = this.state;
    const { mobileNavHeaderStatus } = nextProps;
    const resetState = {
      showSearchBar: false,
      isMainNavOpen: false,
      isSubCategoryOpen: false,
      openSubCategory: '',
      isChildSubCategoryOpen: false,
      openChildSubCategory: ''
    };

    if (viewportType !== nextProps.viewportType) {
      this.addViewportClassToHtmlElm(nextProps.viewportType);
      this.setState({ viewportType: nextProps.viewportType });
    }

    if (nextProps.viewportType === VIEW_PORT_TYPE_MOBILE) {
      if (mobileNavHeaderStatus === MOBILE_HEADER_OPTION_MEGANAV) {
        if (this.bodyElement) this.bodyElement.classList.add('nav-is-open');
        this.setState({ ...resetState, isMainNavOpen: true });
      } else if (mobileNavHeaderStatus === MOBILE_HEADER_OPTION_SEARCH) {
        if (this.bodyElement) this.bodyElement.classList.remove('nav-is-open');
        this.setState({ ...resetState, showSearchBar: true });
      } else {
        if (this.bodyElement) this.bodyElement.classList.remove('nav-is-open');
        this.setState(resetState);
      }
    }
  }


  onHamburgerClick(event) {
    if (event) event.preventDefault();

    const { isMainNavOpen } = this.state;
    const { mobileNavHeaderStatus } = this.props;

    if (isMainNavOpen && mobileNavHeaderStatus === MOBILE_HEADER_OPTION_MEGANAV) {
      this.props.setMobileNavHeaderOption('null');
    } else {
      this.props.setMobileNavHeaderOption(MOBILE_HEADER_OPTION_MEGANAV);
    }
  }

  onSubCategoryLinkClick(evt, categoryId) {
    if (evt) evt.preventDefault();

    this.setState({ isSubCategoryOpen: true, openSubCategory: categoryId });
  }

  onLinkBackElmClick(evt) {
    if (evt) evt.preventDefault();

    this.setState({ isSubCategoryOpen: false, openSubCategory: '' });
  }

  onChildSubCategoryLinkClick(evt, category) {
    if (evt) evt.preventDefault();

    const { openChildSubCategory } = this.state;

    if (openChildSubCategory === category) {
      this.setState({
        isChildSubCategoryOpen: false,
        openChildSubCategory: ''
      });
    } else {
      this.setState({
        isChildSubCategoryOpen: true,
        openChildSubCategory: category
      });
    }
  }

  getSearchBarWidth() {
    const { widthMarkerNode, siteHeaderWrapperNode } = this;

    if (widthMarkerNode && siteHeaderWrapperNode) {
      const navWidth = widthMarkerNode.offsetLeft;
      const searchFormWidth = siteHeaderWrapperNode.offsetWidth;
      const searchWidth = searchFormWidth - navWidth - 10;

      return (searchWidth + 'px');
    }

    return '0px';
  }

  get bodyElement() {
    return (typeof document !== 'undefined' && document.body);
  }

  get documentElement() {
    return (typeof document !== 'undefined' && document.documentElement);
  }

  get isMobile() {
    return (this.state.viewportType === VIEW_PORT_TYPE_MOBILE);
  }

  get isDesktop() {
    return (this.state.viewportType === VIEW_PORT_TYPE_DESKTOP);
  }

  addViewportClassToHtmlElm(viewportType) {
    const root = this.documentElement;
    const { classList } = root;

    const htmlClasses = _.uniq([
      ...classList,
      'svg', 'csscalc', 'cssanimations', 'csstransforms', 'csstransitions', 'objectfit',
      'object-fit', 'flexbox', 'js-ready', viewportType && `meganav--${viewportType}`,
      classnames({
        'no-touchevents': viewportType === VIEW_PORT_TYPE_DESKTOP,
        touchevents: viewportType === VIEW_PORT_TYPE_MOBILE,
      })
    ]);

    root.setAttribute('class', htmlClasses.join(' '));
  }

  resetMegaNavStates() {
    this.setState({
      showSearchBar: false,
      isMainNavOpen: false,
      isSubCategoryOpen: false,
      openSubCategory: '',
      isChildSubCategoryOpen: false,
      openChildSubCategory: ''
    });
  }

  handleSearchToggle(evt) {
    if (evt) evt.preventDefault();

    const { showSearchBar } = this.state;
    const { mobileNavHeaderStatus } = this.props;

    if (showSearchBar && mobileNavHeaderStatus === MOBILE_HEADER_OPTION_SEARCH) {
      this.props.setMobileNavHeaderOption(null);
    } else {
      this.props.setMobileNavHeaderOption(MOBILE_HEADER_OPTION_SEARCH);
    }
  }

  generateCol(colX) {
    if (colX.length) {
      if (this.state.viewportType === VIEW_PORT_TYPE_DESKTOP) {
        return (
          <li className="main-nav__column">
            <ul className="list--silent">{colX.map(col => col)}</ul>
          </li>
        );
      }

      return colX.map(col => col);
    }

    return null;
  }

  generateMegaNavFooterLinks(footerLinks) {
    if (footerLinks) {
      return footerLinks.map((footerlink, index) => {
        const { categoryCSS, categoryName, categoryURL } = footerlink;
        const linkClasses = classnames('main-nav__link', 'main-nav__link--footer', categoryCSS);

        return (
          <li className="main-nav__list-item main-nav__list--footer-item main-nav__list-item--tertiary" key={index}>
            { this.state.viewportType !== VIEW_PORT_TYPE_DESKTOP ? categoryCSS
              ? (<Link to={categoryURL} className={linkClasses}>{categoryName}</Link>)
              : (<span className={linkClasses}>{categoryName}</span>)
              : <Link to={categoryURL} className={linkClasses}>{categoryName}</Link>
            }
          </li>
        );
      });
    }

    return null;
  }

  generateChildCategories(childCategories, parentName, parentLink) {
    const { openChildSubCategory, isChildSubCategoryOpen } = this.state;

    const tertiaryItemClasses = classnames(
      'main-nav__list', 'main-nav__list--tertiary', 'main-nav__list--is-descendant',
      { 'is-open': isChildSubCategoryOpen && parentName === openChildSubCategory });

    if (childCategories) {
      return (
        <ul className={tertiaryItemClasses}>
          {this.isMobile && (
            <li className="main-nav__list-item" onClick={this.onHamburgerClick} >
              <Link
                className="main-nav__link link--parent-has-descendant is-linked link--home"
                to={parentLink}
                data-url={parentLink}
              >
                {parentName}
              </Link>
            </li>
          )}
          {childCategories.map(({ categoryName, categoryURL }, index) => {
            const itemProps = {
              key: index,
              className: 'main-nav__list-item main-nav__list-item--tertiary',
              onClick: this.isMobile ? this.onHamburgerClick : this.handleMouseLeave
            };

            return (
              <li {...itemProps}>
                <Link
                  className="main-nav__link"
                  to={categoryURL}
                  data-url={categoryURL}
                >
                  {categoryName}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }

    return null;
  }

  generateSubCategoriesCell(subCategory) {
    const { columnIndex, categoryCSS, categoryURL, categoryName, subCategories, categoryId } = subCategory;
    const listItemClasses = classnames(
      'main-nav__list-item', 'main-nav__list-item--secondary',
      { [`main-nav__column-${columnIndex}`]: _.includes([1, 2, 3], columnIndex) },
      { 'main-nav__list-item--column-start': columnIndex === 1 },
      { [categoryCSS]: columnIndex === 1 && categoryCSS }
    );
    const listItemProps = {
      key: categoryId,
      className: listItemClasses
    };

    const listItemLinkClasses = classnames('main-nav__link', { 'link--parent-has-descendant': _.isArray(subCategories) });
    const linkProps = {
      className: listItemLinkClasses,
      'data-url': categoryURL
    };

    if (this.isMobile && _.isArray(subCategories)) {
      linkProps.onClick = e => this.onChildSubCategoryLinkClick(e, categoryName);
    } else {
      linkProps.to = categoryURL;
      linkProps.onClick = this.isMobile ? this.onHamburgerClick : this.handleMouseLeave;
    }

    switch (columnIndex) {
      case 1: {
        if (categoryCSS) {
          const spanClass = _.last(categoryCSS.split('--'));

          return (
            <li {...listItemProps}>
              <Link {...linkProps}>
                <span className={`main-nav__promo--${spanClass}`}>{categoryName}</span>
              </Link>
              {this.generateChildCategories(subCategories, categoryName, categoryURL)}
            </li>
          );
        }
      }
      default: { // eslint-disable-line no-fallthrough
        return (
          <li {...listItemProps}>
            <Link {...linkProps}>
              {categoryName}
            </Link>
            {this.generateChildCategories(subCategories, categoryName, categoryURL)}
          </li>
        );
      }
    }
  }

  generateSubCategories(category) {
    const { subCategories, footerLinkCategories, categoryURL, categoryId, categoryName } = category;
    const { openSubCategory, openChildSubCategory, isSubCategoryOpen } = this.state;

    if (subCategories) {
      const cols = {
        col_1: [],
        col_2: [],
        col_3: [],
        col_4: []
      };

      subCategories.map((subCategory) => {
        switch (subCategory.columnIndex) {
          case 1:
            return cols.col_1.push(this.generateSubCategoriesCell(subCategory));
          case 2:
            return cols.col_2.push(this.generateSubCategoriesCell(subCategory));
          case 3:
            return cols.col_3.push(this.generateSubCategoriesCell(subCategory));
          default:
            return cols.col_4.push(this.generateSubCategoriesCell(subCategory));
        }
      });

      const classes = classnames(
        'main-nav__list', 'main-nav__list--secondary', 'main-nav__list--is-descendant',
        { 'is-open': categoryId === openSubCategory },
        { 'child-is-open': categoryId === openSubCategory && openChildSubCategory }
      );

      const footerItemProps = {
        className: 'main-nav__list-item main-nav__list-item--footer block-hidden--mobi-max main-nav__list-item--secondary has-descendant'
      };

      if (this.isDesktop) {
        footerItemProps.onClick = this.handleMouseLeave;
      }

      return (
        <ul className={classes}>
          {this.isMobile && isSubCategoryOpen && categoryId === openSubCategory && (
            <li className="link-back" onClick={this.onLinkBackElmClick} >{categoryName}</li>
          )}
          {this.isMobile && (
            <li className="main-nav__list-item">
              <Link
                className="main-nav__link main-nav__link--primary link--parent-has-descendant is-linked link--home"
                to={categoryURL}
                data-url={categoryURL}
                onClick={this.onHamburgerClick}
              >
                FEATURED
              </Link>
            </li>
          )}
          {_.map(cols, this.generateCol)}
          {this.isDesktop && this.renderCategoryPromoImage(category)}
          <li {...footerItemProps}>
            {footerLinkCategories && (
              <ul className="main-nav__list main-nav__list--footer main-nav__list--tertiary main-nav__list--is-descendant">
                {this.generateMegaNavFooterLinks(footerLinkCategories)}
              </ul>
            )}
          </li>
        </ul>
      );
    }

    return null;
  }

  generateRootCategories(rootCategories) {
    return rootCategories.map((rootCategory) => {
      const { categoryName, categoryURL, categoryId } = rootCategory;
      const linkProps = {
        className: 'main-nav__link main-nav__link--primary link--parent-has-descendant',
      };

      if (this.isMobile) {
        linkProps.onClick = evt => this.onSubCategoryLinkClick(evt, categoryId);
      } else {
        linkProps['data-url'] = categoryURL;
        linkProps.to = categoryURL;
        linkProps.onClick = () => this.setState({ onHoverClass: 'no-hover' });
      }

      return (
        <li className="main-nav__list-item main-nav__list-item--primary has-descendant" key={categoryId}>
          <Link {...linkProps}>
            {categoryName}
          </Link>
          {this.generateSubCategories(rootCategory)}
        </li>
      );
    });
  }

  handleMouseEnter() {
    this.hoverTimer = setTimeout(() => {
      this.setState({ onHoverClass: 'hover-ready' });
    }, 1000);
  }

  handleMouseLeave() {
    clearTimeout(this.hoverTimer);
    this.setState({ onHoverClass: 'no-hover' });
  }

  renderCategoryPromoImage({ categoryImageURL, imageNavigationURL }) {
    const promoItemProps = {
      className: 'main-nav__list-item main-nav__list-item--promo block-hidden--mobi-max main-nav__list-item--secondary',
      onClick: this.handleMouseLeave
    };

    const categoryPromoImageData = {
      imageUrl: categoryImageURL,
      link: imageNavigationURL
    };

    return (
      <li {...promoItemProps}>
        <CategoryPromoImage payload={categoryPromoImageData} />
      </li>
    );
  }

  render() {
    const { showSearchBar, isMainNavOpen, isSubCategoryOpen, onHoverClass } = this.state;
    const rootClasses = classnames('site-search', { 'suggest-is-open': showSearchBar });
    const searchBtnClasses = classnames('search-toggle', { active: showSearchBar });

    const mainNavClasses = classnames('main-nav', { 'is-open': isMainNavOpen });
    const hamburgerClasses = classnames('nav-toggle', { active: isMainNavOpen });

    const mainNavListRootClasses = classnames(
      'main-nav__list', 'main-nav__list--primary', onHoverClass,
      { 'is-open': isMainNavOpen },
      { 'child-is-open': isSubCategoryOpen }
    );
    const mainNavProps = {
      id: 'main-nav',
      className: mainNavClasses,
      ref: node => (this.mainNavNode = node)
    };

    if (this.isDesktop) {
      mainNavProps.onMouseEnter = this.handleMouseEnter;
      mainNavProps.onMouseLeave = this.handleMouseLeave;
    }

    return (
      <section className="site-header__wrapper site-header__wrapper--navigation" id="search-container" ref={node => (this.siteHeaderWrapperNode = node)}>
        <div className={rootClasses}>
          <span className={searchBtnClasses} onClick={this.handleSearchToggle}>
            <span className="icon icon--search-white inline-block-visible--mobi-max" />
          </span>
          <Search
            searchOpenClass={showSearchBar ? 'is-open' : ''}
            getSearchBarWidth={this.getSearchBarWidth}
            resultItemClick={this.handleSearchToggle}
            viewportType={this.props.viewportType}
            mobileNavHeaderStatus={this.props.mobileNavHeaderStatus}
          />
        </div>
        <nav {...mainNavProps} >
          {this.isMobile && (
            <Link
              className={hamburgerClasses}
              onClick={this.onHamburgerClick}
            >
              <span className="icon icon--menu inline-block-visible--mobi-max" />
            </Link>
          )}
          <ul className={mainNavListRootClasses}>
            {this.props.rootCategories && this.generateRootCategories(this.props.rootCategories)}
            <li className="width-marker" ref={node => (this.widthMarkerNode = node)} />
          </ul>
        </nav>
      </section>
    );
  }
}
