import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Ingredients = ({ recipe }) => {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const recipeKeys = Object.keys(recipe);
    const ingredientsList = recipeKeys
      .reduce((acc, key) => {
        if (key.includes('strIngredient') && recipe[key]) {
          acc = [...acc, { ingredient: recipe[key] }];
        }
        return acc;
      }, []);
    const measuresList = recipeKeys
      .reduce((acc, key) => {
        if (key.includes('strMeasure')) {
          acc = [...acc, { measure: recipe[key] }];
        }
        return acc;
      }, []);
    setIngredients(ingredientsList);
    setMeasures(measuresList);
  }, [recipe]);

  return (
    <ul>
      {
        ingredients
            && ingredients.map((item, index) => (
              <li
                key={ uuidv4() }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item.ingredient} - ${measures[index].measure}`}
              </li>
            ))
      }
    </ul>
  );
};

Ingredients.propTypes = {
  recipe: PropTypes.shape(PropTypes.shape).isRequired,
};

export default Ingredients;