import React from 'react';
import Header from '../../components/Header/index';

function DoneRecipesScreen() {
  const pageTitle = 'Done Recipes ';
  const hasSearch = false;
  return (
    <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
  );
}

export default DoneRecipesScreen;
