import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, openModal }) => {
  console.log('Image Gallery Item Props:', { src, alt });
  const handleImageClick = () => {
    openModal({ src, alt });
  };

  return (
    <li className={css.ImageGalleryItem} onClick={handleImageClick}>
      <img src={src} alt={alt} />
    </li>
  );
};

export { ImageGalleryItem };
