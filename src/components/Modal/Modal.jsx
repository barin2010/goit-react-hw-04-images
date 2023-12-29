import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, onOverlayClick } = this.props;

    return (
      <div className={css.Overlay} onClick={onOverlayClick}>
        <div className={css.Modal}>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export { Modal };
