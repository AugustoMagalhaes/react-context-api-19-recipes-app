import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Meal from '../Meal';
import './DetailsCard.css';
import shareIcon from '../../images/shareIcon.svg';
import { checkIsDone, checkIsFavorite,
  checkIsInProgress } from '../../helpers/checkLocalStorage';
import Ingredients from '../Ingredients';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Recommended from '../Recommended';
import handleFavorites from '../../helpers/handleFavorites';

const FoodDetailsCard = ({ food }) => {
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const IN_PROGRESS = 'in-progress';

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      checkIsDone(id, setIsDoneRecipe);
    }
    if (localStorage.getItem('inProgressRecipes')) {
      checkIsInProgress(id, setIsInProgressRecipe, 'meals');
    }
    if (localStorage.getItem('favoriteRecipes')) {
      checkIsFavorite(id, setIsFavorite);
    }
  }, [id]);

  const headToProgress = () => {
    setIsInProgressRecipe(true);
    history.push(`/foods/${id}/${IN_PROGRESS}`);
  };

  const copyShareLink = () => {
    const urlLink = window.location.href.replace(`/${IN_PROGRESS}`, '');
    clipboardCopy(urlLink);
    setIsCopied(true);
    const threeSeconds = 3000;
    const intervalId = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(intervalId);
    }, threeSeconds);
  };

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
          onClick={ copyShareLink }
        >
          <img src={ shareIcon } alt="Share Recipe" />
        </button>
        {
          isCopied && <p>Link copied!</p>
        }
        <button
          type="button"
          onClick={ () => handleFavorites(food, setIsFavorite) }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt={ isFavorite ? 'Não favoritado' : 'Favoritado' }
          />
        </button>
      </div>
      <Ingredients recipe={ food } />

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
        <Recommended recipeKind="food" />
      </section>

      {
        !isDoneRecipe && !location.pathname.includes(IN_PROGRESS)
          && (
            <button
              className="startBtn"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ headToProgress }
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
      {
        location.pathname.includes(IN_PROGRESS)
        && (
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="finishBtn"
          >
            Finish Recipe
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
