import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function ExploreNationalitiesScreen() {
  const pageTitle = 'Explore Nationalities';
  const hasSearch = true;
  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
      <Footer />
    </div>
  );
}

export default ExploreNationalitiesScreen;
