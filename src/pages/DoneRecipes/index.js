import React from 'react';
import Header from '../../components/Header/index';
import DoneRecipes from '../../components/DoneRecipes';

function DoneRecipesScreen() {
  const pageTitle = 'Done Recipes ';
  const hasSearch = false;
  return (
    <main>
      <section>
        <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
        <DoneRecipes />
      </section>
    </main>
  );
}

export default DoneRecipesScreen;
