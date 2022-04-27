import React from 'react';
import Header from '../../components/Header/index';

function DrinksScreen() {
  const pageTitle = 'Drinks';
  const hasSearch = true;
  return (
    <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
  );
}

export default DrinksScreen;
