import React from 'react';
import Header from '../../components/Header/index';
import DoneAndFavoriteRecipes from '../../components/DoneAndFavoriteRecipes';

function DoneRecipesScreen() {
  const pageTitle = 'Done Recipes ';
  const hasSearch = false;
  return (
    <main>
      <section>
        <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
        <DoneAndFavoriteRecipes />
      </section>
    </main>
  );
}

export default DoneRecipesScreen;
