import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getFoodsByIngredient, getFoodsByName, getFoodsByFirsLetter }
from '../../services/fetchFoods';
import { getCocktailsByName, getCocktailsByIngredient, getCocktailsByFirstLetter }
from '../../services/fetchCocktails';
import Context from '../../context/Context';
import './SearchBar.css';

export default function SearchBar({ displaySearchBar }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('ingredient');

  const {
    setReceivedDrinks,
    setReceivedFoods,
    setSearchDrinksByCategory,
    setSearchFoodsByCategory,
  } = useContext(Context);

  const location = useLocation();

  const getFoods = async () => {
    if (searchRadio === 'name') {
      const receivedProducts = await getFoodsByName(searchInput);
      setReceivedFoods(receivedProducts);
    }
    if (searchRadio === 'ingredient') {
      const receivedProducts = await getFoodsByIngredient(searchInput);
      setReceivedFoods(receivedProducts);
    }
    if (searchRadio === 'firstLetter') {
      const receivedProducts = await getFoodsByFirsLetter(searchInput);
      setReceivedFoods(receivedProducts);
    }
  };

  const getDrinks = async () => {
    if (searchRadio === 'name') {
      const receivedProducts = await getCocktailsByName(searchInput);
      if (receivedProducts.length > 0) {
        setReceivedDrinks(receivedProducts);
      }
    }
    if (searchRadio === 'ingredient') {
      const receivedProducts = await getCocktailsByIngredient(searchInput);
      if (receivedProducts.length > 0) {
        setReceivedDrinks(receivedProducts);
      }
    }
    if (searchRadio === 'firstLetter') {
      const receivedProducts = await getCocktailsByFirstLetter(searchInput);
      if (receivedProducts.length > 0) {
        setReceivedDrinks(receivedProducts);
      }
    }
  };

  const getProducts = async () => {
    const { pathname } = location;
    if (pathname === '/drinks') {
      await getDrinks();
      setSearchDrinksByCategory(false);
    }
    if (pathname === '/foods') {
      await getFoods();
      setSearchFoodsByCategory(false);
    }
  };

  return (
    displaySearchBar && (
      <section className="main-section">
        <div className="input-search">
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
            onClick={ getProducts }
          >
            Search
          </button>
        </div>
        <div className="radio-bottom">
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
              checked={ searchRadio === 'name' }
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
              checked={ searchRadio === 'firstLetter' }
            />
          </label>
        </div>
      </section>
    )
  );
}

SearchBar.propTypes = {
  displaySearchBar: PropTypes.bool.isRequired,
};
