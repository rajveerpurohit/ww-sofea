import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { getCorporate, getLeftNav } from './actions';
import Image from '../../components/basic/Image';
import SideBarComponent from '../../components/basic/SideBarContent';
import Panels from '../../components/basic/panels';

import FiveWays from '../content/FiveWays';
import Article from '../content/Article';
import Howto from '../content/Howto';
import Look from '../content/Look';
import Lookbook from '../content/Lookbook';
import Recipe from '../content/Recipe';
import ContentFolder from '../content/ContentFolder';
import SimpleHtml from '../content/SimpleHtml';

class Corporate extends Component {
    static need = [getCorporate, getLeftNav];
    constructor(props) {
        super(props);

        // this.primaryComponent = this.primaryComponent.bind(this);
        // this.pageContent = this.pageContent.bind(this);
    }
    // componentDidMount() {
    //     if (this.props.routeParams.contentId) {
    //         this.props.getCorporate(this.props.routeParams.contentId);
    //     }
    // }
    // primaryComponent() {
    //     return (
    //         <div className="main-page ">
    //             <nav className="breadCrumbs empty" />
    //             <div className="grid page-layout">
    //                 <div className="page-layout__aside">
    //                     {this.props.contentAside && <SideBarComponent leftData={this.props.contentAside} />}
    //                 </div>
    //                 {this.props.corporate && this.pageContent(this.props.corporate)}
    //             </div>
    //         </div>
    //     );
    // }
    // pageContent(corporateData) {
    //     const heading = (data) => {
    //         const imageData = {
    //             url: data.contents.image ? data.contents.image.internalImage : '',
    //             alt: data.contents.image ? data.contents.name : '',
    //             className: 'img-fill-responsive',
    //         };
    //         if (data.contents.image) {
    //             return (
    //                 <div>
    //                     <header>
    //                     </header>
    //                     <div className="grid">
    //                         <Image payload={imageData} />
    //                         <p className="text-intro"></p>
    //                     </div>
    //                 </div>
    //             );
    //         } else if (data.contents.displayName) {
    //             return (
    //                 <header>
    //                     <h1 className="text-caps font-graphic">{data.contents.displayName}</h1>
    //                 </header>
    //             );
    //         }
    //     }
    //     const content = (data) => {
    //         if (data.contents.ContentFolder.childItems) {
    //             let panels = [];
    //             panels = data.contents.ContentFolder.childItems;
    //             panels.map((panel, i) => {
    //                 panel.panelHeading = panel.displayName;
    //                 panel.url = '/corporate/' + panel.contentId;
    //             });
    //             return data ? <article className="grid grid--space-y"><Panels panelData={panels} panelLink={getCorporate} /></article> : null
    //         } else if (data.contents.SimpleHTML) {
    //             return <article>
    //                 <h1 className="heading heading--1 text-caps font-graphic">{data.contents.displayName}</h1>
    //                 <div className="text-small" dangerouslySetInnerHTML={{ __html: data.contents.SimpleHTML.content }} />
    //             </article>
    //         }
    //     }
    //     return (
    //         <div className="grid">
    //             <div className="page-layout__content">
    //                 {heading(corporateData)}
    //                 {content(corporateData)}
    //             </div>
    //         </div>
    //     );
    // }
    render() {
        // return (
        //     <div>
        //         <main className="grid grid--space-y site-main">
        //             {this.primaryComponent()}
        //         </main>
        //     </div>
        // );
        const corporateData = _.get(this.props, 'corporate', {});
        const contentAside = _.get(this.props, 'contentAside', {});
        // const contentType = _.get(this.props, 'corporateData.contents.type', '');
        //<ContentFolder contentData={corporateData} contentAside={contentAside}/>;
        if ( corporateData && corporateData.contents && corporateData.contents.type) {
            console.log('contentType %%%%----', corporateData.contents.type);
            switch (corporateData.contents.type) {
                case 'ContentFolder': return <ContentFolder contentData={corporateData} contentAside={contentAside} />;
                case 'SimpleHTML': return <SimpleHtml contentData={corporateData} contentAside={contentAside} />;
                default: return <ContentFolder contentData={corporateData} contentAside={contentAside} />;
            }
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        corporate: state.corporateReducer.corporateContentReducer.corporateData,
        contentAside: state.corporateReducer.LeftNavReducer.leftNav
    };
};

export default connect(mapStateToProps, { getCorporate })(Corporate);