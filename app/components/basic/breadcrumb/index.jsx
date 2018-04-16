import React, { Component } from 'react';
import { Link } from 'react-router';
import localeInfoUtil from '../../../services/localeInfoUtil';
import RenderNavLink from './render-nav-link';

export default class BreadCrumb extends Component {
  constructor() {
    super();
    this.catDimensionCreateAncestors = this.catDimensionCreateAncestors.bind(this);
    this.createsearchCrumbs = this.createsearchCrumbs.bind(this);
  }
  catDimensionCreateAncestors(catDimData) {
    const catDim = catDimData;

    if (catDim && catDim.ancestors) {
      return (catDim.ancestors.map((ancester, i) => {
        return (<li key={i} className="breadcrumb__crumb">
          <RenderNavLink ancesterData={ancester} />
        </li>);
      }));
    }

    return null;
  }
  createsearchCrumbs(catDimData) {
    const linkText = catDimData.label ? catDimData.label.substring(0, catDimData.label.indexOf('_')) : '';
    if (catDimData.breadcrumbs && catDimData.breadcrumbs.length === 1 && typeof window !== 'undefined' && window) {
      if (window.location.href.indexOf('Ntt') !== -1) {
        const getNttValue = localeInfoUtil.getParameterByName('Ntt', window.location.href);
        const getNsValue = localeInfoUtil.getParameterByName('Ns', window.location.href);
        const getNrppValue = localeInfoUtil.getParameterByName('Nrpp', window.location.href);
        const getNrValue = localeInfoUtil.getParameterByName('Nr', window.location.href);
        let LinkPath = '/cat';
        if (getNrppValue !== null && getNrValue !== null && getNsValue !== null) {
          LinkPath = LinkPath + '?Nr=' + getNrValue + '&Nrpp=' + getNrppValue + '&Ns=' + getNsValue + '&Ntt=' + getNttValue;
        } else if (getNrValue !== null && getNsValue !== null) {
          LinkPath = LinkPath + '?Nr=' + getNrValue + '&Ns=' + getNsValue + '&Ntt=' + getNttValue;
        } else if (getNrValue !== null && getNrppValue !== null) {
          LinkPath = LinkPath + '?Nr=' + getNrValue + '&Nrpp=' + getNrppValue + '&Ntt=' + getNttValue;
        } else {
          LinkPath = LinkPath + '?Ntt=' + getNttValue;
        }
        return (<li className="breadcrumb__crumb"><Link to={LinkPath}>{linkText}</Link></li>);
      }
    } else {
      return (<li className="breadcrumb__crumb">{linkText}</li>);
    }
  }
  render() {
    const breadCrumbsData = this.props.breadcrumbs && this.props.breadcrumbs.categoryDimensions ? this.props.breadcrumbs : [];

    if (breadCrumbsData.categoryDimensions || breadCrumbsData.rangeFilterCrumbs || (breadCrumbsData.searchCrumbs && breadCrumbsData.categoryDimensions)) {
      return (
        <div className={`grid grid--tight-y ${!breadCrumbsData.rangeFilterCrumbs ? 'product-list__breadcrumb' : ''} `} >
          <nav>
            <ol className="breadcrumb" >
              {
                        breadCrumbsData.categoryDimensions.map((catDim, index) => {
                          return (
                            <div key={index}>
                              {catDim.ancestors ? this.catDimensionCreateAncestors(catDim, index) : ''
                                    }{this.createsearchCrumbs(catDim)}
                            </div>
                          );
                        })
                    }
            </ol>
          </nav>
        </div>
      );
    }
    return null;
  }
}
