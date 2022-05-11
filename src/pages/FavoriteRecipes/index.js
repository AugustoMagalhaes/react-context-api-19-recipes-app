import React from 'react';
import Header from '../../components/Header/index';
import DoneRecipes from '../../components/DoneRecipes';

function FavoriteRecipesScreen() {
  const pageTitle = 'Favorite Recipes';
  return (
    <>
      <Header pageTitle={ pageTitle } hasSearch={ false } />
      <DoneRecipes />
    </>
  );
}

export default FavoriteRecipesScreen;
