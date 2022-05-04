import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Cocktail from '../Cocktail';
import { getFoodsByIngredient } from '../../services/fetchFoods';
/* import './DetailsCard.css'; */

const DrinkDetailsCard = ({ drink }) => {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    const drinkKeys = Object.keys(drink);
    const ingredientsList = drinkKeys
      .reduce((acc, key) => {
        if (key.includes('strIngredient') && drink[key]) {
          acc = [...acc, { ingredient: drink[key] }];
        }
        return acc;
      }, []);
    const measuresList = drinkKeys
      .reduce((acc, key) => {
        if (key.includes('strMeasure') && drink[key]) {
          acc = [...acc, { measure: drink[key] }];
        }
        return acc;
      }, []);
    setIngredients(ingredientsList);
    setMeasures(measuresList);
  }, []);

  useEffect(() => {
    const getTwoDrinks = async () => {
      const recommendedList = await getFoodsByIngredient('sage');
      console.log('oi', recommendedList);
      const [one, two] = recommendedList;
      const recTwoDrinks = [one, two];
      setRecommended(recTwoDrinks);
    };
    getTwoDrinks();
  }, []);

  console.log('lintin', recommended);

  return (
    <section className="container-details">
      <Cocktail
        drink={ food }
        titleTestId="recipe-title"
        imgTestId="recipe-photo"
      />

      <p data-testid="recipe-category">
        {drink.strCategory}
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
          {drink.strInstructions}
        </article>
      </section>

      <section>
        <h4>Video</h4>
        <iframe
          data-testid="video"
          width={ 600 }
          height={ 400 }
          title={ `${drink.strDrink}'s video` }
          src={ drink.strYoutube }
          frameBorder="0"
          allowFullScreen
        />
      </section>

      <section>
        {
          recommended && recommended.map((rec, index) => (
            <section
              key={ uuidv4() }
              data-testid={ `${index}-recomendation-card` }
            >
              <h4>{rec.strDrink}</h4>
              <img src={ rec.strDrinkThumb } alt="" />
            </section>

          ))
        }
      </section>
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>

    </section>
  );
};

DrinkDetailsCard.propTypes = {
  drink: PropTypes.shape(PropTypes.shape).isRequired,
};

export default DrinkDetailsCard;
