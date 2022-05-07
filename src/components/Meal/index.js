import React from 'react';
import PropTypes from 'prop-types';
import ImageNotFound from '../../images/ImageNotFound.png';

const Meal = ({ food, titleTestId, imgTestId }) => (
  <section>
    <img
      data-testid={ imgTestId }
      src={ food.strMealThumb || ImageNotFound }
      alt={ `Imagem de ${food.strMeal}` }
      className="meal-img"
    />
    <h3 data-testid={ titleTestId }>
      {food.strMeal}
    </h3>
  </section>
);

Meal.propTypes = {
  food: PropTypes.shape(PropTypes.shape).isRequired,
  titleTestId: PropTypes.string.isRequired,
  imgTestId: PropTypes.string.isRequired,
};

export default Meal;
