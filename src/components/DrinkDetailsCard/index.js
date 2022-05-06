import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import Cocktail from '../Cocktail';
import './DetailsCard.css';
import { fetchRecipeFoods } from '../../services/fetchFoods';
import { checkIsDone, checkIsInProgress } from '../../helpers/checkLocalStorage';

const DrinkDetailsCard = ({ drink }) => {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    const drinkKeys = Object.keys(drink);
    const ingredientsList = drinkKeys
      .reduce((acc, key) => {
        if (key.includes('strIngredient')) {
          acc = [...acc, { ingredient: drink[key] }];
        }
        return acc;
      }, []);
    const measuresList = drinkKeys
      .reduce((acc, key) => {
        if (key.includes('strMeasure')) {
          acc = [...acc, { measure: drink[key] }];
        }
        return acc;
      }, []);
    setIngredients(ingredientsList);
    setMeasures(measuresList);
  }, []);

  useEffect(() => {
    const getTwoFoods = async () => {
      const recommendedList = await fetchRecipeFoods();
      const amount = 6;
      const recommendedFoods = recommendedList.slice(0, amount);
      setRecommended(recommendedFoods);
    };
    getTwoFoods();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      checkIsDone(id, setIsDoneRecipe);
    }
    if (localStorage.getItem('inProgressRecipes')) {
      checkIsInProgress(id, setIsInProgressRecipe, 'cocktails');
    }
    console.log('isDone', isDoneRecipe);
  }, []);

  const headToProgress = () => history.push(`/drinks/${id}/in-progress`);

  const copyShareLink = () => {
    clipboardCopy(window.location.href);
    setIsCopied(true);
    const threeSeconds = 3000;
    const intervalId = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(intervalId);
    }, threeSeconds);
  };

  return (
    <section className="container-details">
      <Cocktail
        drink={ drink }
        titleTestId="recipe-title"
        imgTestId="recipe-photo"
        className="cocktail"
      />

      <p data-testid="recipe-category">
        {drink.strCategory}
        {' '}
        {'('}
        {drink.strAlcoholic}
        {')'}
      </p>
      <div className="buttons">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => copyShareLink() }
        >
          <img src={ shareIcon } alt="Share Recipe" />
        </button>
        {
          isCopied && <p>Link copied!</p>
        }
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite
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
                {rec.strMeal}
              </h4>
              <img src={ rec.strMealThumb } alt="" />
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
            onClick={ () => headToProgress() }
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

DrinkDetailsCard.propTypes = {
  drink: PropTypes.shape(PropTypes.shape).isRequired,
};

export default DrinkDetailsCard;
