import React, { useEffect, useState } from 'react';
import './DoneRecipes.css';
import { useLocation } from 'react-router-dom';
import DoneAndFavoriteRecipeCard from '../DoneAndFavoriteRecipeCard';

const DoneAndFavoriteRecipes = () => {
  const [foodState, setFoodState] = useState([]);
  const [drinkState, setDrinkState] = useState([]);
  const [allState, setAllState] = useState([]);
  const location = useLocation();

  const handleDoneRecipes = () => {
    const storagedDoneRecipes = localStorage.getItem('doneRecipes');
    if (storagedDoneRecipes) {
      const parsedStorage = JSON.parse(storagedDoneRecipes);
      const filterFoods = parsedStorage.filter((el) => el.type.includes('food'));
      const filterDrinks = parsedStorage.filter((el) => el.type.includes('drink'));
      setFoodState(filterFoods);
      setDrinkState(filterDrinks);
      setAllState([...filterFoods, ...filterDrinks]);
    }
  };

  const handleFavoriteRecipes = () => {
    const storagedFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (storagedFavoriteRecipes) {
      const parsedStorage = JSON.parse(storagedFavoriteRecipes);
      const filterFoods = parsedStorage.filter((el) => el.type.includes('food'));
      const filterDrinks = parsedStorage.filter((el) => el.type.includes('drink'));
      setFoodState(filterFoods);
      setDrinkState(filterDrinks);
      setAllState([...filterFoods, ...filterDrinks]);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('done-recipes')) {
      handleDoneRecipes();
    } else {
      handleFavoriteRecipes();
    }
  }, []);

  return (
    <>
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setAllState([...foodState, ...drinkState]) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setAllState([...foodState]) }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setAllState([...drinkState]) }
        >
          Drinks
        </button>
      </nav>
      <section>
        {
          allState && allState.map((recipe, index) => (
            <DoneAndFavoriteRecipeCard
              key={ recipe.name }
              recipe={ recipe }
              index={ index }
              setAllState={ setAllState }
            />
          ))
        }
      </section>
    </>
  );
};

export default DoneAndFavoriteRecipes;
