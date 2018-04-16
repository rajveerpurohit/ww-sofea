import React from 'react';
import SlickCarousel from 'react-slick';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}


// nextArrow={<NextArrow />}
// prevArrow={<PrevArrow />}

const Carousel = (props) => {
  const itemsLength = props.children.length > 1 ?
    props.children.reduce((acc, curr) => acc.length + curr.length)
    : props.children[0].length <= props.minSlides ? props.children.length : props.children[0].length;

  if (itemsLength <= props.minSlides) {
    return <div>{props.children}</div>;
  }
  const slides = props.children.reduce((acc, curr) => acc.concat(curr));
  return (
    <SlickCarousel
      className={props.className}
      {...props.settings}
    >
      {slides}
    </SlickCarousel>
  );
};
export default Carousel;
