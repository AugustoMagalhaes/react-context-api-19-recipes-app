import React from 'react';
import Header from '../../components/Header/index';

function ExploreDrinksIngScreen() {
  const pageTitle = 'Explore Ingredients';
  return (
    <Header pageTitle={ pageTitle } hasSearch={ false } />
  );
}

export default ExploreDrinksIngScreen;
