import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function ExploreFoodsIngScreen() {
  const pageTitle = 'Explore Ingredients';
  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ false } />
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngScreen;
