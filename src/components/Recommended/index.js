import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { fetchRecipeDrinks } from '../../services/fetchCocktails';
import { fetchRecipeFoods } from '../../services/fetchFoods';

const Recommended = ({ recipeKind }) => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const getSixDrinks = async () => {
      const recommendedList = await fetchRecipeDrinks();
      const amount = 6;
      const recommendedDrinks = recommendedList.slice(0, amount);
      setRecommended(recommendedDrinks);
    };
    const getSixFoods = async () => {
      const recommendedList = await fetchRecipeFoods();
      const amount = 6;
      const recommendedFoods = recommendedList.slice(0, amount);
      setRecommended(recommendedFoods);
    };
    if (recipeKind === 'food') {
      getSixDrinks();
    } else {
      getSixFoods();
    }
  }, [recipeKind]);

  return (
    recommended && recommended.map((rec, index) => (
      <section
        key={ uuidv4() }
        data-testid={ `${index}-recomendation-card` }
      >
        <h4
          data-testid={ `${index}-recomendation-title` }
        >
          {recipeKind === 'food' ? rec.strDrink : rec.strMeal}
        </h4>
        <img
          src={ recipeKind === 'food' ? rec.strDrinkThumb : rec.strMealThumb }
          alt={ recipeKind === 'food' ? rec.strDrink : rec.strMeal }
        />
      </section>

    ))

  );
};

Recommended.propTypes = {
  recipeKind: PropTypes.string.isRequired,
};

export default Recommended;
