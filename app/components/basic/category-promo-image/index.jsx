import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CategoryPromoImage = ({payload}) => {
  return (
    <Link className="main-nav__link--promo" to={payload.link}>                                
        <img src={payload.imgSrc} />
    </Link>
  );
};

CategoryPromoImage.propTypes = {
  payload: PropTypes.object.isRequired
};

export default CategoryPromoImage;