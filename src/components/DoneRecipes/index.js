import React, { useEffect, useState } from 'react';
import './DoneRecipes.css';
import DoneRecipeCard from '../DoneRecipeCard';

const DoneRecipes = () => {
  const [foodState, setFoodState] = useState([]);
  const [drinkState, setDrinkState] = useState([]);
  const [allState, setAllState] = useState([]);

  useEffect(() => {
    const storagedDoneRecipes = localStorage.getItem('doneRecipes');
    if (storagedDoneRecipes) {
      const parsedStorage = JSON.parse(storagedDoneRecipes);
      const filterFoods = parsedStorage.filter((el) => el.type.includes('meal'));
      const filterDrinks = parsedStorage.filter((el) => el.type.includes('drink'));
      setFoodState(filterFoods);
      setDrinkState(filterDrinks);
      setAllState([filterFoods, filterDrinks]);
      console.log(foodState, drinkState, allState);
    }
  }, []);

  return (
    <>
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </nav>
      <section>
        {
          allState.map((recipe, index) => (
            <DoneRecipeCard key={ recipe.name } recipe={ recipe } index={ index } />
          ))
        }
      </section>
    </>
  );
};

export default DoneRecipes;
