import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Context from '../../context/Context';
import DrinkCards from '../../components/DrinkCards';
import FilterDrinks from '../../components/FilterDrinks';

function DrinksScreen() {
  const pageTitle = 'Drinks';
  const hasSearch = true;
  const {
    receivedDrinks,
    setReceivedDrinks,
    searchDrinksByCategory,
  } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (searchDrinksByCategory === false && receivedDrinks.length === 1) {
      history.push(`/drinks/${receivedDrinks[0].idDrink}`);
    }
  }, [receivedDrinks, history]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      const { drinks } = data;
      setReceivedDrinks(drinks);
    };
    fetchRecipe();
  }, []);

  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
      <FilterDrinks />
      <DrinkCards />
      <Footer />
    </div>
  );
}

export default DrinksScreen;
