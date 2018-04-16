import React from 'react';
import Image from '../../components/basic/Image';
import { Link } from 'react-router';
import SideBarComponent from '../../components/basic/SideBarContent';
import Panels from '../../components/basic/panels';

const ContentFolder = ({ contentData,contentAside,isActive }) => {
    const primaryComponent = ()=>{
        return (
            <div className="main-page ">
                <nav className="breadCrumbs empty" />
                <div className="grid page-layout">
                    <div className="page-layout__aside">
                        {contentAside && <SideBarComponent leftData={contentAside} isActive={isActive}/>}
                    </div>
                    {contentData && pageContent(contentData)}
                </div>
            </div>
        );
    }
    const pageContent = (corporateData) => {
        const heading = (data) => {
            const imageData = {
                url: data.contents.image ? data.contents.image.internalImage : '',
                alt: data.contents.image ? data.contents.name : '',
                className: 'img-fill-responsive',
            };
            if (data.contents.image) {
                return (
                    <div>
                        <header>
                        </header>
                        <div className="grid">
                            <Image payload={imageData} />
                            <p className="text-intro"></p>
                        </div>
                    </div>
                );
            } else if(data.contents.displayName)  {
                return (
                    <header>
                        <h1 className="text-caps font-graphic">{data.contents.displayName}</h1>
                    </header>
                );
            }
        }
        const content = (data)=>{
            let panels = [];
            panels = data.contents.ContentFolder.childItems;
            panels.map((panel, i) => {
                panel.panelHeading = panel.displayName;
                panel.url = '/corporate/' + panel.contentId;
            });
            return data ? <article className="grid grid--space-y"><Panels panelData={panels} /></article> : null
        }
        return (
            <div className="grid">
                <div className="page-layout__content">
                    {heading(corporateData)}
                    {content(corporateData)}
                </div>
            </div>
        );
    }
    return (
    <div>
        <main className="grid grid--space-y site-main">
        {primaryComponent()}
        </main>
    </div>
  )
};
export default ContentFolder;
