import React from 'react';
import Header from '../../components/Header/index';

function ExploreScreen() {
  const pageTitle = 'Explore';
  return (
    <Header pageTitle={ pageTitle } hasSearch={ false } />
  );
}

export default ExploreScreen;
