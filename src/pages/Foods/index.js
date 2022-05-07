import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Context from '../../context/Context';
import FoodCards from '../../components/FoodCards';
import FilterFoods from '../../components/FilterFoods';

function FoodsScreen() {
  const pageTitle = 'Foods';
  const hasSearch = true;
  const { receivedFoods,
    setReceivedFoods,
    searchFoodsByCategory,
  } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (searchFoodsByCategory === false && receivedFoods.length === 1) {
      history.push(`/foods/${receivedFoods[0].idMeal}`);
    }
  }, [receivedFoods, history, searchFoodsByCategory]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      const { meals } = data;
      setReceivedFoods(meals);
    };
    fetchRecipe();
  }, [setReceivedFoods]);

  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
      <FilterFoods />
      <FoodCards />
      <Footer />
    </div>
  );
}

export default FoodsScreen;
