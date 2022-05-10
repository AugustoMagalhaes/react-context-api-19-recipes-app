import React from 'react';
import PropTypes from 'prop-types';
import './DoneRecipeCard.css';

const DoneRecipeCard = ({ recipe, index }) => {
  console.log('done recipe card');
  return (
    <section className="card-container">
      <h3
        data-testid={ `${index}-horizontal-top-text` }
      >
        {recipe.category}
      </h3>
      <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
        Share
      </button>
      <h4
        data-testid={ `${index}-horizontal-name` }
      >
        {recipe.name}
      </h4>
      <img
        src={ recipe.image }
        alt={ `${recipe.name}'s card` }
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {recipe.doneDate}
      </p>
      {
        recipe.tags
          && (
            recipe.tags.map((tag, tagIndex) => (
              <p
                key={ tag }
                data-testid={ `${tagIndex}-${tag}-horizontal-tag` }
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
