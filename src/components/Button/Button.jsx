import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className={css.button} type="button" onClick={handleClick}>
      <span className={css.title}>Load more</span>
    </button>
  );
};

export { Button };
