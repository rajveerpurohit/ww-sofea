import React from 'react';
import AriaModal from 'react-aria-modal';
import { Link } from 'react-router';

import Image from '../Image';

const ProductImageFullView = (props) => {
  const { urls, product, onClose } = props;
  const { externalLargeImage, internalLargeImage, externalImageUrlReference } = urls;
  const payload = {
    id: product.productId,
    alt: product.displayName,
    title: product.displayName,
    url: internalLargeImage,
    externalUrl: externalLargeImage && `${externalImageUrlReference}o=${externalLargeImage}`,
    className: 'img-responsive modal__image'
  };

  return (
    <AriaModal
      titleText="ProductImageFullView"
      className="product-image-full-view"
      verticallyCenter
      onExit={onClose}
    >
      <div className="modal__box modal__box--panel modal__box--image" data-js="modal-box" tabIndex="0" style={{ marginBottom: '29.5px', top: '29.5px' }} >
        <Link onClick={onClose} className="icon icon--close-circ-dark modal__close" data-js="modal-close">close</Link>
        <div className="modal__content" data-js="modal-content">
          <Image payload={payload} />
        </div>
      </div>
    </AriaModal>
  );
};

export default ProductImageFullView;
