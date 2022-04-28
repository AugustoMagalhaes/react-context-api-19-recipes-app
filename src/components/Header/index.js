import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../../images/profileIcon.svg';
import search from '../../images/searchIcon.svg';
import './Header.css';

function Header({ pageTitle, hasSearch }) {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  useEffect(() => {
    document.title = pageTitle;
  });

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
                <input
                  type="text"
                  data-testid="search-input"
                  placeholder="Pesquise uma comida ou bebida"
                  size="30"
                />
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
