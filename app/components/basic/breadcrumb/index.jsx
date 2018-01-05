import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import RenderNavLink from './render-nav-link';

export default class BreadCrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.catDimensionCreateAncestors = this.catDimensionCreateAncestors.bind(this);
        this.createremoveAction = this.createremoveAction.bind(this);
        this.createsearchCrumbs = this.createsearchCrumbs.bind(this);
    }
    catDimensionCreateAncestors(catDimData) {
        const catDim = catDimData;
        return (catDim.ancestors.map((ancester, i) => {
            if (catDim.ancestors.length === 1 && catDim.searchCrumbs && !catDim.isContentBreadCrumb) {
                const linkText = this.props.ancesterData.label ? this.props.ancesterData.label.substring(0, this.props.ancesterData.label.indexOf('_')) : '';
                const linkDataNotDeptSeoDisplayName = `${this.props.ancesterData.siteState.contentPath}`;
                const linkDataDeptSeoDisplayName = `${this.props.ancesterData.contentPath}/${this.props.ancesterData.label}`;
                const anchorLink = this.props.ancesterData.label ? { linkDataDeptSeoDisplayName } : { linkDataNotDeptSeoDisplayName };
                return (<li key={i} className="breadcrumb__crumb">
                    <Link to={anchorLink} title={linkText}>{linkText}</Link>
                </li>);
            }
            return (<li key={i} className="breadcrumb__crumb">
                <RenderNavLink ancesterData={ancester} />
            </li>);
        })
        );
    }
    createremoveAction(catDimData) {
        const catDim = catDimData;
        return (
            <li className="breadcrumb__crumb">
                <RenderNavLink ancesterData={catDim.removeAction} />
            </li>
        );
    }
    createsearchCrumbs(catDimData) {
        const catDim = catDimData;
        const linkText = catDimData.label ? catDimData.label.substring(0, catDimData.label.indexOf('_')) : '';
        if (catDim.searchCrumbs) {
            return (
                <li className="breadcrumb__crumb">
                    <RenderNavLink ancesterData={catDim.removeAction} />
                </li>
            );
        } else {
            return (<li className="breadcrumb__crumb">{linkText}</li>)
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

                                            }{
                                                // catDim.ancestors ? this.createremoveAction(catDim) : ''
                                            }{
                                               this.createsearchCrumbs(catDim) 
                                            }
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
