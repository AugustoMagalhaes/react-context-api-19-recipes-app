import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Context from '../../context/Context';
import DrinkCards from '../../components/DrinkCards';

function DrinksScreen() {
  const pageTitle = 'Drinks';
  const hasSearch = true;
  const { receivedDrinks } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (receivedDrinks.length === 1) {
      history.push(`/drinks/${receivedDrinks[0].idDrink}`);
    }
  }, [receivedDrinks, history]);

  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
      <DrinkCards />
      <Footer />
    </div>
  );
}

export default DrinksScreen;
