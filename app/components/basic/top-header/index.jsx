import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';

class TopHeader extends Component {
   
    constructor(props){
        super(props);
        this.state = { 
            topHeaderData : []
        };
        this.createNavData = this.createNavData.bind(this);
    }

    componentDidMount(){ 
        axios.get("http://172.21.40.151:8180/public/v1/global/utilityLinks ") 
        .then((response)=>{
           this.setState({
                topHeaderData : response.data
           });
        });
    }

    createNavData(getLinkData) {    
        return getLinkData.map((item,index)=>{
           return (
            <Link key={index} to={item.targetUrl} title={item.name} className="wfs-nav-item">
                <span className={`icon ${item.categoryCSS}`}></span>
                <span className="text-space">{item.name}</span>
            </Link> 
           )
       });
    }
   
    render() { 
        let stateData = this.state.topHeaderData;
        return (
        <div className="site-header__wfs" >
            <div className="grid content--centered">
                <nav className="wfs-nav wfs-nav--links float-l">
                    {stateData.left ? this.createNavData(stateData.left) : null }
                </nav> 
                <div className="wfs-nav wfs-nav--values float-r">
                    {stateData.right ? this.createNavData(stateData.right) : null}
                </div>
            </div>
        </div>
        );
    }
    
    
}

export default TopHeader;