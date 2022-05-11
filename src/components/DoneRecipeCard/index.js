import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DoneRecipeCard.css';
import clipboardCopy from 'clipboard-copy';
import { Link, useLocation } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { checkIsFavorite } from '../../helpers/checkLocalStorage';
import handleFavorites from '../../helpers/handleFavorites';

const DoneRecipeCard = ({ recipe, index }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const location = useLocation();
  const FAVORITE_RECIPES = 'favorite-recipes';

  const copyShareLink = () => {
    const urlLink = location.pathname.includes('done-recipes') ? window.location.href
      .replace('done-recipes', `${recipe.type}s/${recipe.id}`) : window.location.href
      .replace(FAVORITE_RECIPES, `${recipe.type}s/${recipe.id}`);
    clipboardCopy(urlLink);
    setIsCopied(true);
    const threeSeconds = 3000;
    const intervalId = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(intervalId);
    }, threeSeconds);
  };

  useEffect(() => {
    if (location.pathname.includes(FAVORITE_RECIPES)
      && localStorage.getItem(FAVORITE_RECIPES)) {
      checkIsFavorite(recipe.id, setIsFavorite);
    }
  }, []);

  return (
    <section className="card-container">
      <h3
        data-testid={ `${index}-horizontal-top-text` }
      >
        {
          recipe.type === 'food'
            ? `${recipe.nationality} - ${recipe.category}`
            : `${recipe.alcoholicOrNot}`
        }

      </h3>
      <div>
        <button
          type="button"
          onClick={ () => copyShareLink() }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share Recipe"
          />
        </button>
        {
          isCopied && <p>Link copied!</p>
        }
        {
          location.pathname.includes('favorite-recipes')
          && (
            <button
              type="button"
              onClick={ () => handleFavorites(recipe, setIsFavorite) }
            >
              <img
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt={ isFavorite ? 'Favoritado' : 'Não Favoritado' }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>)
        }
      </div>

      <Link
        to={ `/${recipe.type}s/${recipe.id}` }
      >
        <h4
          data-testid={ `${index}-horizontal-name` }
        >
          {recipe.name}
        </h4>
      </Link>

      <Link
        to={ `/${recipe.type}s/${recipe.id}` }
      >
        <img
          src={ recipe.image }
          alt={ `${recipe.name}'s card` }
          data-testid={ `${index}-horizontal-image` }
          className="card-img"
        />
      </Link>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {recipe.doneDate}
      </p>
      {
        recipe.tags
          && (
            recipe.tags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>
            ))
          )
      }
    </section>
  );
};

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
