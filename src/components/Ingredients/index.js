import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './Ingredients.css';
import { useLocation } from 'react-router-dom';
import IngredientCheckbox from '../IngredientCheckbox';

const Ingredients = ({ recipe }) => {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const location = useLocation();
  console.log(location.pathname.includes('in-progress'));

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
    <section>
      {
        !location.pathname.includes('in-progress')
          ? (
            <ul>
              {
                ingredients
          && ingredients.map((item, index) => (
            <li
              key={ uuidv4() }
              data-testid={ `${index}-ingredient-name-and-measure` }
              className="ingredient-item"
            >
              {`- ${item.ingredient} - ${measures[index].measure}`}
            </li>
          ))
              }
            </ul>
          )
          : (
            ingredients
          && ingredients.map((item, index) => (
            <p
              key={ uuidv4() }
              /* data-testid={ `${index}-ingredient-name-and-measure` } */
              data-testid={ `${index}-ingredient-step` }
              className="ingredient-item"
            >
              <IngredientCheckbox />
              { ` ${item.ingredient} x ${measures[index].measure}`}
            </p>
          ))
          )
      }
    </section>
  );
};

Ingredients.propTypes = {
  recipe: PropTypes.shape(PropTypes.shape).isRequired,
};

export default Ingredients;
