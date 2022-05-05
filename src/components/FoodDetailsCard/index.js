import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import Meal from '../Meal';
import './DetailsCard.css';

const FoodDetailsCard = ({ food }) => {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const foodKeys = Object.keys(food);
    const ingredientsList = foodKeys
      .reduce((acc, key) => {
        if (key.includes('strIngredient') && food[key]) {
          acc = [...acc, { ingredient: food[key] }];
        }
        return acc;
      }, []);
    const measuresList = foodKeys
      .reduce((acc, key) => {
        if (key.includes('strMeasure') && food[key]) {
          acc = [...acc, { measure: food[key] }];
        }
        return acc;
      }, []);
    setIngredients(ingredientsList);
    setMeasures(measuresList);
  }, []);

  const fetchRecipeDrinks = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    const { drinks } = data;
    return drinks;
  };

  useEffect(() => {
    const getSixDrinks = async () => {
      const recommendedList = await fetchRecipeDrinks();
      const amount = 6;
      const recommendedDrinks = recommendedList.slice(0, amount);
      setRecommended(recommendedDrinks);
    };
    getSixDrinks();
  }, []);

  const checkIsDone = () => {
    const getDoneRecipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const findRecipeInStorage = getDoneRecipesFromStorage
      .some((recipe) => recipe.id.includes(id));
    setIsDoneRecipe(findRecipeInStorage);
  };

  const checkIsInProgress = () => {
    const getInProgressRecipesFromStorage = JSON
      .parse(localStorage.getItem('doneRecipes'));
    if (getInProgressRecipesFromStorage) {
      const mealsKeys = getInProgressRecipesFromStorage.meals;
      const findRecipeInStorage = Object.keys(mealsKeys)
        .some((recipe) => recipe.includes(id));
      setIsInProgressRecipe(findRecipeInStorage);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      checkIsDone();
    }
    if (localStorage.getItem('inProgressRecipes')) {
      checkIsInProgress();
    }
    console.log('isDone', isDoneRecipe);
    console.log('isProg', isInProgressRecipe);
  }, []);

  return (
    <section className="container-details">
      <Meal
        food={ food }
        titleTestId="recipe-title"
        imgTestId="recipe-photo"
      />

      <p data-testid="recipe-category">
        {food.strCategory}
      </p>
      <div className="buttons">
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
      </div>
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

      <section>
        <h4>Instructions</h4>

        <article data-testid="instructions">
          {food.strInstructions}
        </article>
      </section>

      <section>
        <h4>Video</h4>
        <iframe
          data-testid="video"
          width={ 600 }
          height={ 400 }
          title={ `${food.strMeal}'s video` }
          src={ food.strYoutube }
          frameBorder="0"
          allowFullScreen
        />
      </section>

      <section className="carosel">
        {
          recommended && recommended.map((rec, index) => (
            <section
              key={ uuidv4() }
              data-testid={ `${index}-recomendation-card` }
            >
              <h4
                data-testid={ `${index}-recomendation-title` }
              >
                {rec.strDrink}
              </h4>
              <img src={ rec.strDrinkThumb } alt="oi" />
            </section>

          ))
        }

      </section>

      {
        !isDoneRecipe
        && (
          <button
            className="startBtn"
            type="button"
            data-testid="start-recipe-btn"
          >
            {
              !isInProgressRecipe
                ? (
                  'Start Recipe'
                )
                : (
                  'Continue Recipe'
                )
            }

          </button>
        )
      }

    </section>
  );
};

FoodDetailsCard.propTypes = {
  food: PropTypes.shape(PropTypes.shape).isRequired,
};

export default FoodDetailsCard;
