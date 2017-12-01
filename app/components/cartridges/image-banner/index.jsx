import React from 'react';
import { Link } from 'react-router';

const ImageBanner = ({contentData}) => {

    let type = "@type";

    const withLink = (contentData) => {
         if(contentData[type] === "FreeDeliveryMessageImageBanner"){
            return (
                <Link className={`landing__link ${contentData.imageCSS}`} to={contentData.link.path} key={contentData.key}>
                    <img className={`landing__image lazyloaded `} src={`${contentData.atgUrl}images/elasticera/content/landing_pages/home/${contentData.media.uri}`} />
                </Link>
            )
        } else {
            return (
                <Link className={`landing__link ${contentData.imageCSS}`} to={contentData.link.path} key={contentData.key}>
                    <img className={`landing__image lazyloaded `} src={`${contentData.atgUrl}${contentData.media.uri}`} />
                </Link>
            )
        }
        
    }
    const withoutLink = () => {
        
        if(contentData[type] === "FreeDeliveryMessageImageBanner"){
            return <img className={`landing__image lazyloaded `} src={`${contentData.atgUrl}images/elasticera/content/landing_pages/home/${contentData.media.uri}`} key={contentData.key}/>
        } else {
            return <img className={`landing__image lazyloaded `} src={`${contentData.atgUrl}${contentData.media.uri}`} key={contentData.key}/>
        }

    }

    return (
        contentData.link.path ? withLink(contentData) : withoutLink()
    )
}
export default ImageBanner;

//grid-visible--medium   style={{width:`${contentData.media.contentWidth}px`, height:`${contentData.media.contentHeight}px`}}