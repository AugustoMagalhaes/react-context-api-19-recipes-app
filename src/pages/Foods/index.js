import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Context from '../../context/Context';
import FoodCards from '../../components/FoodCards';

function FoodsScreen() {
  const pageTitle = 'Foods';
  const hasSearch = true;
  const { receivedFoods } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (receivedFoods.length === 1) {
      history.push(`/foods/${receivedFoods[0].idMeal}`);
    }
  }, [receivedFoods, history]);

  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
      <FoodCards />
      <Footer />
    </div>
  );
}

export default FoodsScreen;
