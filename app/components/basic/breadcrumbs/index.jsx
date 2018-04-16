import React from 'react';
import { Link } from 'react-router';

const BreadCrumb = ({ breadCrumbs }) => {
  if (breadCrumbs) {
    return (
      <nav>
        <ol className="breadcrumb">
          <div>
            {breadCrumbs.map((bread, index) => (
              <li className="breadcrumb__crumb" key={index} >
                <Link to={bread.navigationURL} title={bread.label}>{bread.label}</Link>
              </li>
            ))}
          </div>
        </ol>
      </nav>
    );
  }

  return null;
};

export default BreadCrumb;
