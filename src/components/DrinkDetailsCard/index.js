import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import Cocktail from '../Cocktail';
import './DetailsCard.css';
import { checkIsDone, checkIsInProgress,
  checkIsFavorite } from '../../helpers/checkLocalStorage';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Ingredients from '../Ingredients';
import Recommended from '../Recommended';
import handleFavorites from '../../helpers/handleFavorites';

const DrinkDetailsCard = ({ drink }) => {
  /* const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]); */
/*   const [recommended, setRecommended] = useState([]); */
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  /*   useEffect(() => {
    const getTwoFoods = async () => {
      const recommendedList = await fetchRecipeFoods();
      const amount = 6;
      const recommendedFoods = recommendedList.slice(0, amount);
      setRecommended(recommendedFoods);
    };
    getTwoFoods();
  }, []); */

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      checkIsDone(id, setIsDoneRecipe);
    }
    if (localStorage.getItem('inProgressRecipes')) {
      checkIsInProgress(id, setIsInProgressRecipe, 'cocktails');
    }
    if (localStorage.getItem('favoriteRecipes')) {
      checkIsFavorite(id, setIsFavorite);
    }
  }, [id]);

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

  /*   useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const checkIsFavorite = getFavorites.some((recipe) => recipe.id === id);
      setIsFavorite(checkIsFavorite);
    }
  }, []); */

  /*   const handleFavorites = () => {
    const actualRecipe = {
      id: drink.idDrink,
      type: 'drink',
      nationality: drink.strArea || '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };
    console.log('actual ', actualRecipe);
    const favoriteRecipes = localStorage.getItem('favoriteRecipes') || '[]';
    const parsedFavoriteRecipes = JSON.parse(favoriteRecipes);
    const hasFavorite = parsedFavoriteRecipes
      .some((recipe) => recipe.id === actualRecipe.id);
    if (!hasFavorite) {
      const newFavoriteRecipes = JSON.stringify([...parsedFavoriteRecipes, actualRecipe]);
      localStorage.setItem('favoriteRecipes', newFavoriteRecipes);
    } else {
      const newFavoriteRecipes = parsedFavoriteRecipes
        .filter((recipe) => recipe.id !== actualRecipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setIsFavorite(!hasFavorite);
  }; */

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
          onClick={ () => handleFavorites(drink, setIsFavorite) }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt={ isFavorite ? 'Não favoritado' : 'Favoritado' }
          />
        </button>
      </div>
      <Ingredients recipe={ drink } />

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
        <Recommended recipeKind="drink" />
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
