import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function ExploreScreen() {
  const pageTitle = 'Explore';
  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ false } />
      <Footer />
    </div>
  );
}

export default ExploreScreen;
