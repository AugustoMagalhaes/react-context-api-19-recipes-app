import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../../images/profileIcon.svg';
import search from '../../images/searchIcon.svg';
import './Header.css';
import { getFoodsByIngredient, getFoodsByName, getFoodsByFirsLetter }
from '../../services/fetchFoods';

function Header({ pageTitle, hasSearch }) {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('ingredient');

  console.log('search Radio ', searchRadio);

  useEffect(() => {
    document.title = pageTitle;
  });

  const getFoods = async () => {
    /* const refObj = {
      ingredient: () => getFoodsByIngredient(searchInput),
      name: async () => getFoodsByName(searchInput),
      firstLetter: async () => getFoodsByFirsLetter(searchInput),
    }; */
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

  const cursorStyle = window.location.pathname === '/profile' ? 'auto' : 'pointer';

  return (
    <header>
      <Link
        style={ { cursor: cursorStyle } }
        to="/profile"
      >
        <img
          src={ profile }
          alt="Icone do Perfil"
          data-testid="profile-top-btn"
        />
      </Link>

      <h1 data-testid="page-title">{ pageTitle }</h1>
      {hasSearch
        ? (
          <>
            <button
              type="button"
              className="teste"
              onClick={ () => setDisplaySearchBar(!displaySearchBar) }
            >
              <img
                src={ search }
                alt="Icone do Perfil"
                data-testid="search-top-btn"
              />
            </button>
            {
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

                  <button
                    type="button"
                    data-testid="exec-search-btn"
                    onClick={ getFoods }
                  >
                    Search
                  </button>
                </section>
              )
            }
          </>
        ) : null }

      {/*
        profile não tem lupa
        done recipes não tem lupa
        Favorite Recipes não tem lupa

        tem lupa:
        Foods
        Drinks
        Explore Nationalities
      */}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  hasSearch: PropTypes.bool.isRequired,
};

export default Header;
