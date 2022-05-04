import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Meal from '../Meal';
import { getFoodsByIngredient } from '../../services/fetchFoods';

const DetailsCard = ({ food }) => {
  const [ingredients, setIngredients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    const foodEntries = Object.entries(food);
    console.log('eh entries ', foodEntries);
    const filterIngredients = foodEntries
      .filter((ingredient) => ingredient[0].includes('strIngredient')
      && ingredient[1]);
    const filterMeasures = foodEntries
      .filter((measure) => measure[0].includes('strMeasure')
      && measure[1]);
    const recipeIngredients = filterMeasures.reduce((final, curr, index) => {
      final = [
        ...final,
        {
          ingredient: filterIngredients[index][1],
          measure: curr[1],
        },
      ];
      return final;
    }, []);
    setIngredients(recipeIngredients);
  }, []);

  useEffect(() => {
    const getTwoDrinks = async () => {
      const recommendedList = await getFoodsByIngredient('milk');
      console.log('oi', recommendedList);
      const [one, two] = recommendedList;
      const recTwoDrinks = [one, two];
      setRecommended(recTwoDrinks);
    };
    getTwoDrinks();
  }, []);

  console.log('lintin', recommended);

  return (
    <section>
      <Meal
        food={ food }
        titleTestId="recipe-title"
        imgTestId="recipe-photo"
      />

      <p data-testid="recipe-category">
        {food.strCategory}
      </p>
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

      <ul>
        {
          ingredients
            && ingredients.map((item, index) => (
              <li
                key={ uuidv4() }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item.ingredient} - ${item.measure}`}
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

      <section>
        {
          recommended.length > 0
          && recommended.map((rec, index) => (
            <section
              key={ uuidv4() }
              data-testid={ `${index}-recomendation-card` }
            >
              <h4>{rec.strMeal}</h4>
              <img src={ rec.strMealThumb } alt="" />
            </section>

          ))
        }
      </section>
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>

    </section>
  );
};

DetailsCard.propTypes = {
  food: PropTypes.shape(PropTypes.shape).isRequired,
};

export default DetailsCard;
