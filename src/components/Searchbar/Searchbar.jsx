import css from './Searchbar.module.css';
import React, { Component } from 'react';
import searchIcon from '../icons/search.svg';

class Searchbar extends Component {
  state = { query: '' };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('Handling form submission with query:', this.state.query);
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonSpun}>
              <img src={searchIcon} alt="Search Icon" />
            </span>
          </button>

          <input
            className={css.input}
            id="myField"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export { Searchbar };
