import React from 'react';
import Header from '../../components/Header/index';

function ExploreDrinksScreen() {
  const pageTitle = 'Explore Drinks';
  return (
    <Header pageTitle={ pageTitle } hasSearch={ false } />
  );
}

export default ExploreDrinksScreen;
