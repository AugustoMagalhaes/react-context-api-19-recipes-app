import React from 'react';
import Header from '../../components/Header/index';
import DoneAndFavoriteRecipes from '../../components/DoneAndFavoriteRecipes';

function FavoriteRecipesScreen() {
  const pageTitle = 'Favorite Recipes';
  return (
    <main>
      <section>
        <Header pageTitle={ pageTitle } hasSearch={ false } />
        <DoneAndFavoriteRecipes />
      </section>
    </main>
  );
}

export default FavoriteRecipesScreen;
