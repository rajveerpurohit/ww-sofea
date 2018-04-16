import React from 'react';
import { Link } from 'react-router';
import Image from '../Image';

const CategoryPromoImage = ({ payload }) => {
  const imageData = {
    url: payload.imageUrl
  };

  return (
    <Link className="main-nav__link--promo" to={payload.link}>
      <Image payload={imageData} />
    </Link>
  );
};

export default CategoryPromoImage;
