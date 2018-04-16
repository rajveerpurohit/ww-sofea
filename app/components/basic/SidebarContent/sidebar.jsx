import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
    this.contentAside = this.contentAside.bind(this);
    this.generateLi = this.generateLi.bind(this);
    this.getChildren = this.getChildren.bind(this);
    this.chilNavigation = this.chilNavigation.bind(this);

  }

  handleClick(i) {
    return (e) => {
      const active = this.state.active === i ? null : i;
      this.setState({ active });
    };
  }

  collpsedClass(i) {
    return this.state.active === i ? 'target-is-open' : 'target-is-closed';
  }

  liClass(i) {
    return this.state.active === i ? 'active' : 'inactive';
  }

  display(i) {
    return this.state.active === i ? 'block' : 'none';
  }
  // isActive(link){
  //   switch (link) {
  //     case 'contactUs':
  //       return 'strong';
  //     default:
  //       return '';
  //   }
  // }
  getChildren(){

  }
  contentAside(leftData) {
    console.log('leftData', leftData);
    return leftData.map((item, i) => {
      console.log('ITEM',item);
      return (
        <li key={i} className="nav-accordion__list-segment nav-accordion__list-item">
          <a className={'nav-accordion__link heading heading--4 target-is-closed  $'}>{item.name}</a>
          <span data-toggle className={`nav-accordion__toggle icon icon--down-dark  ${this.collpsedClass(i)}`} onClick={this.handleClick(i)} />
          <ul data-toggle-content className="list--silent hidden" style={{ height: 'auto', display: this.display(i) }}>
            {this.props.leftData && this.generateLi(item)}
          </ul>
        </li>
      );
    });
  }
  chilNavigation(leftData) {
    //console.log('leftData', leftData);
    return leftData.map((item, i) => {
      //console.log('ITEM',item);
      return (
        <li key={i} className="nav-accordion__list-segment nav-accordion__list-item">
          <a className={'nav-accordion__link heading heading--4 target-is-closed  $'}>{item.name}</a>
          <span data-toggle className={`nav-accordion__toggle icon icon--down-dark`} />
          <ul data-toggle-content className="list--silent hidden" style={{ height: 'auto', display: this.display(i) }}>
            {this.props.leftData && this.generateLi(item)}
          </ul>
        </li>
      );
    });
  }
  generateLi(generateData) {
    //console.log(generateData.subNav.length);
    let childNav = generateData.subNav;
    if (childNav.length > 0) {
      return childNav.map((item, i) => {
        console.log(item);
        if (item.subNav.length > 0){
          console.log('>>>>>',item.subNav)
          return this.chilNavigation(item.subNav)
        } else {
          return <li key={i} className={'nav-accordion__list-item ' + (this.props.isActive === item.url ? 'strong ' : '')}><Link to={item.url} className="nav-accordion__link">{item.name}</Link></li>
        }
      });
    }
    // const keyValue = Object.keys(generateData)[0];
    // return Object.keys(generateData).map((item, index) => {
    //   console.log('IIIIIIIIIIIIII',item);
    //   return item.subNav.length ? 'yes' : 'no';
    //   // return (

    //   //   <li key={index} className={'nav-accordion__list-item ' + (this.props.isActive === item.url ? 'strong ' : '')}><Link to={item.url} className="nav-accordion__link">{item.name}</Link></li>
    //   // );
    // });
  }
  render() {
    var test = [
                  {
                      "name": "Store Card",
                      "subNav": [
                          {
                              "name": "Features & Benefits",
                              "url": "/store/fragments/wfs/wfs-index.jsp?content=store-card-benefits",
                              "subNav": [{
                                "name": "feature-1",
                                "url": "/store/fragments/wfs/wfs-index.jsp?content=store-card-benefits",
                                "subNav": []
                              },
                              {
                                "name": "feature-2",
                                "url": "/store/fragments/wfs/wfs-index.jsp?content=store-card-benefits",
                                "subNav": []
                              },
                              {
                                "name": "feature-3",
                                "url": "/store/fragments/wfs/wfs-index.jsp?content=store-card-benefits",
                                "subNav": []
                              }
                            ]
                          },
                          {
                              "name": "Pricing",
                              "url": "/store/fragments/wfs/wfs-index.jsp?content=store-card-pricing",
                              "subNav": []
                          },
                          {
                              "name": "Terms & Conditions",
                              "url": "/store/fragments/corporate/corporate-index.jsp?content=corporate-landing&contentId=fol110052",
                              "subNav": []
                          },
                          {
                              "name": "Apply Now",
                              "url": "/store/fragments/wfs/wfs-application-details.jsp",
                              "subNav": []
                          },
                          {
                              "name": "View My Account",
                              "url": "/store/fragments/dashboard/dashboard-index.jsp?content=wfs/wfs-index",
                              "subNav": []
                          },
                          {
                              "name": "Payment Options",
                              "url": "/store/fragments/wfs/wfs-index.jsp?content=store-card-payment-options",
                              "subNav": []
                          }
                      ],
                      "url": "/store/fragments/wfs/wfs-index.jsp?content=store-card-benefits"
                  }
              ]
          
    return (
      <nav className="page-layout__aside nav-accordion">
        <ul className="list--silent text-small nav-accordion__list">
          {this.props.leftData && this.contentAside(test)}
          {/* <h1>Sidebar</h1> */}
        </ul>
      </nav>
    );
  }
}
