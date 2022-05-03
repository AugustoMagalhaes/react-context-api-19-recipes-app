import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Context from '../../context/Context';
import FoodCards from '../../components/FoodCards';

function FoodsScreen() {
  const pageTitle = 'Foods';
  const hasSearch = true;
  const { receivedFoods, setReceivedFoods } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (receivedFoods.length === 1) {
      history.push(`/foods/${receivedFoods[0].idMeal}`);
    }
  }, [receivedFoods, history]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      const { meals } = data;
      setReceivedFoods(meals);
    };
    fetchRecipe();
  }, []);

  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
      <FoodCards />
      <Footer />
    </div>
  );
}

export default FoodsScreen;
