import React from 'react';
import { Link } from 'react-router-dom';
import DrinksIcon from '../../images/drinkIcon.svg';
import ExploreIcon from '../../images/exploreIcon.svg';
import FoodsIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link
        to="/drinks"
        data-testid="drinks-bottom-btn"
        src={ DrinksIcon }
      >
        <img
          src={ DrinksIcon }
          alt="Bebidas"
        />
      </Link>
      <Link to="/explore" src={ ExploreIcon } data-testid="explore-bottom-btn">
        <img
          src={ ExploreIcon }
          alt="Icone de Explorar"
        />
      </Link>
      <Link to="/foods" src={ FoodsIcon } data-testid="food-bottom-btn">
        <img
          src={ FoodsIcon }
          alt="Icone de Comida"
        />
      </Link>
    </footer>
  );
}

export default Footer;
