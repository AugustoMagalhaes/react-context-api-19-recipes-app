import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DoneRecipeCard.css';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

const DoneRecipeCard = ({ recipe, index }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyShareLink = () => {
    const urlLink = window.location.href
      .replace('done-recipes', `${recipe.type}s/${recipe.id}`);
    clipboardCopy(urlLink);
    setIsCopied(true);
    const threeSeconds = 3000;
    const intervalId = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(intervalId);
    }, threeSeconds);
  };

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
          data-testid={ `${index}-horizontal-share-btn` }
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
      </div>

      <h4
        data-testid={ `${index}-horizontal-name` }
      >
        {recipe.name}
      </h4>
      <img
        src={ recipe.image }
        alt={ `${recipe.name}'s card` }
        data-testid={ `${index}-horizontal-image` }
        className="card-img"
      />
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
