import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import FoodsIngredients from '../../components/FoodsIngredients/index';

function ExploreFoodsIngScreen() {
  const pageTitle = 'Explore Ingredients';
  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ false } />
      <FoodsIngredients />
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngScreen;
