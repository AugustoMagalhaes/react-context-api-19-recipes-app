import React from 'react';
import PropTypes from 'prop-types';
import ImageNotFound from '../../images/ImageNotFound.png';

const Cocktail = ({ drink, titleTestId, imgTestId }) => (
  <section>
    <img
      data-testid={ imgTestId }
      src={ drink.strDrinkThumb || ImageNotFound }
      alt={ `Imagem de ${drink.strDrink}` }
      className="cocktail-img"
    />
    <h3 data-testid={ titleTestId }>
      {drink.strDrink}
    </h3>
  </section>
);

Cocktail.propTypes = {
  drink: PropTypes.shape(PropTypes.shape).isRequired,
  titleTestId: PropTypes.string.isRequired,
  imgTestId: PropTypes.string.isRequired,
};

export default Cocktail;
