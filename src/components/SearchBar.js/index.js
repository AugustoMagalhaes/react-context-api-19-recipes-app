import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getFoodsByIngredient, getFoodsByName, getFoodsByFirsLetter }
from '../../services/fetchFoods';

export default function SearchBar({ displaySearchBar }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('ingredient');
  const getFoods = async () => {
    // tentar otimizar esses if's; o return é temporario por enquanto
    if (searchRadio === 'name') {
      return getFoodsByName(searchInput);
    }
    if (searchRadio === 'ingredient') {
      return getFoodsByIngredient(searchInput);
    }
    if (searchRadio === 'firstLetter') {
      return getFoodsByFirsLetter(searchInput);
    }
  };

  return (
    displaySearchBar && (
      <section>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Pesquise uma comida ou bebida"
          size="30"
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ getFoods }
        >
          Search
        </button>
        <label htmlFor="search-radio">
          Ingrediente:
          <input
            type="radio"
            name="search-radio"
            id="search-radio"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ (e) => setSearchRadio(e.target.value) }
            checked={ searchRadio === 'ingredient' }
          />
        </label>

        <label htmlFor="search-radio">
          Name:
          <input
            type="radio"
            name="search-radio"
            id="search-radio"
            data-testid="name-search-radio"
            value="name"
            onChange={ (e) => setSearchRadio(e.target.value) }
          />
        </label>

        <label htmlFor="search-radio">
          First Letter:
          <input
            type="radio"
            name="search-radio"
            id="search-radio"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            onChange={ (e) => setSearchRadio(e.target.value) }
          />
        </label>
      </section>
    )
  );
}

SearchBar.propTypes = {
  displaySearchBar: PropTypes.bool.isRequired,
};
