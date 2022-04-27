import React from 'react';
import Header from '../../components/Header/index';

function ExploreNationalitiesScreen() {
  const pageTitle = 'Explore Nationalities';
  const hasSearch = true;
  return (
    <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
  );
}

export default ExploreNationalitiesScreen;
