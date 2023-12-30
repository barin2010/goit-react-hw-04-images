import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ imageUrl, onClose, onOverlayClick }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.Overlay} onClick={onOverlayClick}>
      <div className={css.Modal}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export { Modal };
