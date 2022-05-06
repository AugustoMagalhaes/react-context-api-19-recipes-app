import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Meal from '../Meal';
import './DetailsCard.css';
import shareIcon from '../../images/shareIcon.svg';
import { checkIsDone, checkIsInProgress } from '../../helpers/checkLocalStorage';
import { fetchRecipeDrinks } from '../../services/fetchCocktails';
import Ingredients from '../Ingredients';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const FoodDetailsCard = ({ food }) => {
  const [recommended, setRecommended] = useState([]);
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getSixDrinks = async () => {
      const recommendedList = await fetchRecipeDrinks();
      const amount = 6;
      const recommendedDrinks = recommendedList.slice(0, amount);
      setRecommended(recommendedDrinks);
    };
    getSixDrinks();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      checkIsDone(id, setIsDoneRecipe);
    }
    if (localStorage.getItem('inProgressRecipes')) {
      checkIsInProgress(id, setIsInProgressRecipe, 'meals');
    }
    console.log('isDone', isDoneRecipe);
    console.log('isProg', isInProgressRecipe);
  }, []);

  const headToProgress = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  const copyShareLink = () => {
    clipboardCopy(window.location.href);
    setIsCopied(true);
    const threeSeconds = 3000;
    const intervalId = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(intervalId);
    }, threeSeconds);
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log('getF', getFavorites);
      const checkIsFavorite = getFavorites.some((recipe) => recipe.id === id);
      setIsFavorite(checkIsFavorite);
    }
  }, []);

  const handleFavorites = () => {
    const date = new Date();
    const obj = {
      id: food.idMeal,
      type: 'food',
      nationality: food.strArea,
      category: food.strCategory,
      alcooholicOrNot: '',
      name: food.strMeal,
      image: food.strMealThumb,
      doneDate: date, // talvez altere
      tags: food.strTags,
    };
    const favoriteRecipes = localStorage.getItem('favoriteRecipes') || '[]';
    const parsedFavoriteRecipes = JSON.parse(favoriteRecipes);
    const hasFavorite = parsedFavoriteRecipes.some((recipe) => recipe.id === obj.id);
    if (!hasFavorite) {
      const newFavoriteRecipes = JSON.stringify([...parsedFavoriteRecipes, obj]);
      localStorage.setItem('favoriteRecipes', newFavoriteRecipes);
    } else {
      const newFavoriteRecipes = parsedFavoriteRecipes
        .filter((recipe) => recipe.id !== obj.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setIsFavorite(!hasFavorite);
    console.log(localStorage.getItem('favoriteRecipes'));
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
          onClick={ () => handleFavorites() }
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

    </section>
  );
};

FoodDetailsCard.propTypes = {
  food: PropTypes.shape(PropTypes.shape).isRequired,
};

export default FoodDetailsCard;
