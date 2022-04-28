import React from 'react';
import PropTypes from 'prop-types';
import profile from '../../images/profileIcon.svg';
import search from '../../images/searchIcon.svg';
import './Header.css';

function Header({ pageTitle, hasSearch }) {
  return (
    <header>
      <img
        src={ profile }
        alt="Icone do Perfil"
        data-testid="profile-top-btn"
      />
      <h1 data-testid="page-title">{ pageTitle }</h1>
      {hasSearch
        ? (
          <img
            src={ search }
            alt="Icone do Perfil"
            data-testid="search-top-btn"
          />
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
