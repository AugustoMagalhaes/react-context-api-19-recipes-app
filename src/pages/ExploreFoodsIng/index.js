import React from 'react';
import Header from '../../components/Header/index';

function ExploreFoodsIngScreen() {
  const pageTitle = 'Explore Ingredients';
  return (
    <Header pageTitle={ pageTitle } hasSearch={ false } />
  );
}

export default ExploreFoodsIngScreen;
