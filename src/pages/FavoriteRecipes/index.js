import React from 'react';
import Header from '../../components/Header/index';

function FavoriteRecipesScreen() {
  const pageTitle = 'Favorite Recipes';
  return (
    <Header pageTitle={ pageTitle } hasSearch={ false } />
  );
}

export default FavoriteRecipesScreen;
